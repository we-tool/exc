#!/usr/bin/env node
var exec = require('child_process').exec
//var BufferHelper = require('bufferhelper')
var spawnbin = require('../lib/spawn')
var toutf8 = require('../lib/toutf8')
var args = process.argv.slice(2)

var bin = args[0]
if (!bin) {
  console.error(new Error('no bin path specified'))
  process.exit(1)
}

// todo: cli color loss like `gulp`
// but except `serve`
spawnbin(bin, args.slice(1), function(err, prc){
  //if (err) {
  //  console.error(err)
  //  process.exit(1)
  //}

  // hack: spawn fallback: exec
  if (err) {
    exec2(args)
    return
  }

  prc.stdout.pipe(process.stdout)
  prc.stderr.pipe(process.stderr)
  prc.on('close', function(code){
    if (code !== 0) {
      //console.error(new Error('exit with code ' + code))
    }
  })
})


function exec2(args){
  exec(args.join(' '), {
    // note: against gbk encoding on win
    encoding: null
  }, function(err, outbuf, errbuf){
    // encoding gbk to utf8
    var outstr = toutf8(outbuf)
    var errstr = toutf8(errbuf)

    if (outstr) {
      process.stdout.write(outstr)
    }
    if (errstr) {
      process.stderr.write(errstr)
    }
    if (err) {
      // fixme: err.message in gbk
      //console.error(err)
    }
  })
}

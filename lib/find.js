var resolve = require('path').resolve
var extname = require('path').extname
var exists = require('fs').exists
var readFile = require('fs').readFile
var which = require('shelljs').which
var detectSeries = require('async').detectSeries

module.exports = findbin

var win_ext = [
  '.exe',
  '.cmd',
  '.bat'
]

// fn: search for the actual bin file
// todo: more intellegent matching
function findbin(bin, cb){
  var is_win = process.platform === 'win32'
  var bins = []

  // todo: which with `dir`, `cd`
  // note: global which matches first
  // note: find full path from command
  var whichbin = which(bin)
  if (whichbin) {
    bins.push(resolve(whichbin))
  }

  // note: absolute path, for windows
  var absbin = resolve(bin)
  bins.push(absbin)

  // todo: other platforms
  // note: windows extension matching
  if (is_win) {
    bins = bins.map(function(bin){
      if (contains(win_ext, extname(bin))) {
        return bin
      }
      return win_ext.map(function(ext){
        return bin + ext
      })
    })
    bins = flatten(bins)
    //console.log(bins)
  }

  bins = uniq(bins)

  // note: async.detectSeries
  // returns the first bin that exists
  // https://github.com/caolan/async#detect
  detectSeries(bins, exists, function(bin){
    if (!bin) {
      cb(new Error('bin file not found'))
      return
    }

    cb(null, bin)
  })
}

// hack: implements an _.uniq
// fn: drop duplcated elements from array
function uniq(arr){
  var obj = {}
  arr.forEach(function(v){
    obj[v] = 1
  })
  return Object.keys(obj)
}

// hack: implements an _.flatten
// fn: elimate one-level inner [] from array
function flatten(arr){
  return Array.prototype.concat.apply([], arr)
}

// hack: implements an _.contains
// fn: detects element in array
function contains(arr, el){
  return arr.indexOf(el) !== -1
}

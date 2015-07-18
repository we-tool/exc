var spawn = require('child_process').spawn
var findbin = require('../lib/find')

module.exports = spawnBin

// fn: spawn a process from bin & argv
function spawnBin(bin, argv, cb){
  findbin(bin, function(err, bin){
    if (err) {
      cb(new Error('bin file not found'))
      return
    }

    cb(null, spawn(bin, argv))
  })
}

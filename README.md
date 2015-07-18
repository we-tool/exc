# exc

> Tool to Execute Commands

## Features

- Cross-Platform, via node.js
- Realtime native stdio, via `spawn` & `pipe`
- Auto-fetch fullpaths for `spawn`, via `path.resolve` & `shelljs.which`
- Support for built-in win commands like `dir`, via `exec` fallback
- Resolve `gbk` to `utf8`, via `iconv-lite`

## Todo

- Better module division
- Unix alias support

## CLI (Terminal) Usage

```plain
npm install -g exc
```

```plain
$ exc gulp -v
$ exc serve .
$ exc ls
$ exc dir  # windows
$ exc "cd some/folder && ls"  # &&-join
$ exc exc exc ls  # funny
```

## Nodejs Library Usage

```plain
npm install exc
```

```js
var exc = require('exc')
exc('gulp', ['-v'], function(err, prc){
  // (same as:)
  // var spawn = require('child_process').spawn
  // var fullpath = find_fullpath('gulp')
  // var prc = spawn(fullpath, ['-v'])
})
```

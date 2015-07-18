# exc

> Tool to Execute Commands

## Features

- Auto-fetch fullpaths for `child_process.spawn`
- Realtime stdio piping
- Support for built-in win commands like `dir`, via `child_process.exec` fallback
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
var prc = exc('gulp', ['-v'])
// (same as:)
// var spawn = require('child_process').spawn
// var fullpath = find_fullpath('gulp')
// var prc = spawn(fullpath, ['-v'])
```

# generator-jslib [![Build Status](https://secure.travis-ci.org/stephanebachelier/generator-jslib.png?branch=master)](https://travis-ci.org/stephanebachelier/generator-jslib)

This is another generator to build javascript library, mainly for the browser with the usage of UMD wrapper.

## Usage

To install generator-jslib from npm, run:

```bash
$ npm install -g generator-jslib
```

Make a new directory and cd into it:
```bash
$ mkdir mylib
```

Finally, initiate the generator:

```bash
$ yo jslib
```

## Layout

Clearly inspired by [generator-microlib](https://github.com/asbjornenge/generator-microlib/blob/master/README.md#included)

```
	|- mylib
	   |- .editorconfig      // Example .editorconfig (http://editorconfig.org/)
	   |- .gitignore         // Basic .gitignore
	   |- .jshintrc          // Example JSHint configuration (http://www.jshint.com/docs/)
	   |- .travis.yml        // Example Travis configuration (http://www.travis-ci.org/)
	   |- Grunfile.js        // Basic Grunt configuration
	   |- README.md          // Empty README file
	   |- bower.json         // Basic Bower configuration
	   |- package.json       // Basic Npm configuration
	   |- dist               // Folder for your distributables
          |- <lib>.min.js
	   |- lib                // Folder for your library !!
          |- <lib>.js
	   |- tests              // Folder for your tests
          |- <test>.js
	   |- tasks              // Folder for your tasks
          |- aliases.yaml  // Tasks aliases
          |- <task>.js     // task description
```

## Why

### others generators

Another yeoman generator ? And for a library ? Other options I know of :
 - [generator-microlib](https://github.com/asbjornenge/generator-microlib): A  generator for browser microlibs.
 - [generator-lib](https://github.com/matthewtoast/generator-lib): A generator for a basic JavaScript library.

Both are great and `generator-lib` seems to be inspired a lot from `generator-microlib`.

This generator, is closer to `generator-microlib`.

### motivation

My motivation to create another generator is because I always use:
 - grunt with a split configuration which gives me a small Gruntfile with short tasks
 - bower
 - linting with jshint and jscs
 - karma + mocha for testing
 - and have fun with new generator API :)
 - UMD wrapper


### Grunt configuration

No more tasks description in `Gruntfile.js` which leads IMHO to unmaintainable grunt tasks. All the tasks are defined in their own files and tasks aliases are created and maintained in one file.
I've used this workflow for near one year for multiple projects and it works really well.

Inspired from [Thomas Boyt's "More Maintainable Gruntfiles"](http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html) blog post which led to the `load-grunt-config` task. Use with `jit-grunt` which give you Just In Time task loading, Grunt is really speedy. Probably not as speedy than gulp but with the power of a world of powerful plugins.

So this project use at his heart:

* [load-grunt-config](http://firstandthird.github.io/load-grunt-config)
* [jit-grunt](https://github.com/shootaroo/jit-grunt)

## TODO

 * add karma tests
 * add some other stuff from previous works

## Contributing

Contributions are welcome. Simply fork and send a PR.

## License

MIT

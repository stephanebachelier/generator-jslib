/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('jslib generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('jslib:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.jshintrc',
      '.editorconfig',
      '.gitignore',
      '.jscs.json',
      '.travis.yml',
      'Gruntfile.js',
      'dist',
      'lib/jslib.js',
      'tasks/aliases.yaml',
      'tasks/concat.js',
      'tasks/jscs.js',
      'tasks/jshint.js',
      'tasks/uglify.js',
      'tasks/watch.js'
    ];

    var expectedContent = [
      ['bower.json', /"name": "jslib"/],
      ['package.json', /"name": "jslib"/],
      // author name
      ['bower.json', /"name": "Obi Wan Kenobi"/],
      ['package.json', /"name": "Obi Wan Kenobi"/],
      // author email
      ['bower.json', /"email": "obi@theforce.stars"/],
      ['package.json', /"email": "obi@theforce.stars"/],
      // license
      ['bower.json', /"license": "WTFL"/],
      ['package.json', /"license": "WTFL"/],
      // description
      ['bower.json', /"description": "foo"/],
      ['package.json', /"description": "foo"/],
      // repository url
      ['bower.json', /"url": "https:\/\/github.com\/bar\/jslib\.git"/],
      ['package.json', /"url": "https:\/\/github.com\/bar\/jslib\.git"/],
      // repository type
      ['bower.json', /"type": "git"/],
      ['package.json', /"type": "git"/],
      // README
      ['README.md', /https:\/\/secure.travis-ci.org\/foobar\/jslib/]
    ];

    helpers.mockPrompt(this.app, {
      libname: 'jslib',
      description: 'foo',
      authorName: 'Obi Wan Kenobi',
      authorEmail: 'obi@theforce.stars',
      license: 'WTFL',
      username: 'foobar',
      repositoryUrl: 'https://github.com/bar/jslib.git',
      repositoryType: 'git',
    });

    this.app.options['skip-install'] = true;

    this.app.run({}, function () {
      assert.file(expected);
      assert.fileContent(expectedContent);
      done();
    });
  });

  it('validate library name ending in .js', function (done) {
    var expected = [
      'lib/jslib.js'
    ];

    var expectedContent = [
      // library name
      ['bower.json', /"name": "jslib.js"/],
      ['package.json', /"name": "jslib.js"/],
      // main entry file
      ['bower.json', /"main": "dist\/jslib.js"/],
      ['package.json', /"main": "dist\/jslib.js"/],
    ];

    helpers.mockPrompt(this.app, {
      libname: 'jslib.js',
    });

    this.app.options['skip-install'] = true;

    this.app.run({}, function () {
      assert.file(expected);
      assert.fileContent(expectedContent);
      done();
    });
  });

  it('library name sanitization should works', function (done) {
    var expected = [
      'lib/lib-_0123456789.js'
    ];

    var expectedContent = [
      // library name
      ['bower.json', /"name": "lib-_0123456789.js"/],
      ['package.json', /"name": "lib-_0123456789.js"/],
      // main entry file
      ['bower.json', /"main": "dist\/lib-_0123456789.js"/],
      ['package.json', /"main": "dist\/lib-_0123456789.js"/],
    ];

    helpers.mockPrompt(this.app, {
      libname: 'lib"·$%&()/\=¿?¡!^`+*ñ¨Ç´ç;,:-_0123456789.js',
    });

    this.app.options['skip-install'] = true;

    this.app.run({}, function () {
      assert.file(expected);
      assert.fileContent(expectedContent);
      done();
    });
  });
});

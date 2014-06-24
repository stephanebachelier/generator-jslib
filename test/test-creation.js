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
      'dist',
      'lib/jslib.js'
    ];

    var expectedContent = [
      ['bower.json', /"name": "jslib"/],
      ['bower.json', /"name": "Obi Wan Kenobi"/],
      ['bower.json', /"email": "obi@theforce.stars"/],
      ['package.json', /"name": "jslib"/],
      ['package.json', /"name": "Obi Wan Kenobi"/],
      ['package.json', /"email": "obi@theforce.stars"/]
    ];

    helpers.mockPrompt(this.app, {
      'libname': 'jslib',
      'authorName': 'Obi Wan Kenobi',
      'authorEmail': 'obi@theforce.stars',
    });
    this.app.options['skip-install'] = true;

    this.app.run({}, function () {
      assert.file(expected);
      assert.fileContent(expectedContent);
      done();
    });
  });

  it('should work without author informations specified', function (done) {
    helpers.mockPrompt(this.app, {
      'libname': 'jslib'
    });
    this.app.options['skip-install'] = true;

    this.app.run({}, function () {
      done();
    });
  });

  it('should work with only author name specified', function (done) {
    var expectedContent = [
      ['bower.json', /"author": {\n\s+"name": "Obi Wan Kenobi"/],
      ['package.json', /"author": {\n\s+"name": "Obi Wan Kenobi"/i],
    ];

    helpers.mockPrompt(this.app, {
      'libname': 'jslib',
      'authorName': 'Obi Wan Kenobi',
    });
    this.app.options['skip-install'] = true;

    this.app.run({}, function () {
      assert.fileContent(expectedContent);
      done();
    });
  });

  it('should work with only author email specified', function (done) {
    var expectedContent = [
      ['bower.json', /"email": "obi@theforce.stars"/],
      ['package.json', /"email": "obi@theforce.stars"/],
    ];

    helpers.mockPrompt(this.app, {
      'libname': 'jslib',
      'authorEmail': 'obi@theforce.stars',
    });
    this.app.options['skip-install'] = true;

    this.app.run({}, function () {
      assert.fileContent(expectedContent);
      done();
    });
  });
});

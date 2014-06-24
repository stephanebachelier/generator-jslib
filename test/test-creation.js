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
      ['bower.json', /"name": "Obi Wan Kenobi"/],
      ['bower.json', /"email": "obi@theforce.stars"/],
      ['bower.json', /"license": "WTFL"/],
      ['bower.json', /"description": "foo"/],
      ['package.json', /"name": "jslib"/],
      ['package.json', /"name": "Obi Wan Kenobi"/],
      ['package.json', /"email": "obi@theforce.stars"/],
      ['package.json', /"license": "WTFL"/],
      ['package.json', /"description": "foo"/]
    ];

    helpers.mockPrompt(this.app, {
      'libname': 'jslib',
      'description': 'foo',
      'authorName': 'Obi Wan Kenobi',
      'authorEmail': 'obi@theforce.stars',
      'license': 'WTFL'
    });

    this.app.options['skip-install'] = true;

    this.app.run({}, function () {
      assert.file(expected);
      assert.fileContent(expectedContent);
      done();
    });
  });
});

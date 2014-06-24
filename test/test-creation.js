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
      // description
      ['bower.json', /"repository": "bar\/jslib"/],
      ['package.json', /"repository": "bar\/jslib"/],
      // README
      ['README.md', /https:\/\/secure.travis-ci.org\/foobar\/jslib/]
    ];

    helpers.mockPrompt(this.app, {
      'libname': 'jslib',
      'description': 'foo',
      'authorName': 'Obi Wan Kenobi',
      'authorEmail': 'obi@theforce.stars',
      'license': 'WTFL',
      'username': 'foobar',
      'repository': 'bar/jslib'
    });

    this.app.options['skip-install'] = true;

    this.app.run({}, function () {
      assert.file(expected);
      assert.fileContent(expectedContent);
      done();
    });
  });
});

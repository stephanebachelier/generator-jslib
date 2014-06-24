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
      '.editorconfig'
    ];

    var expectedContent = [
      ['bower.json', /"name": "jslib"/],
      ['package.json', /"name": "jslib"/]
    ];

    helpers.mockPrompt(this.app, {
      'libname': 'jslib'
    });
    this.app.options['skip-install'] = true;

    this.app.run({}, function () {
      assert.file(expected);
      assert.fileContent(expectedContent);
      done();
    });
  });
});

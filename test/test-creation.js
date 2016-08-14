/*global describe, beforeEach, it */
'use strict'
var path = require('path')
var helpers = require('yeoman-test')
var assert = require('yeoman-assert')
var fs = require('fs')

describe('jslib generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err)
      }

      this.app = helpers.createGenerator('jslib:app', ['../../app'], null, {skipInstall: true})
      done()
    }.bind(this))
  })

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.editorconfig',
      '.gitignore',
      '.travis.yml',
      'Gruntfile.js',
      'dist',
      'lib/main.js',
      'tasks/aliases.yaml',
      'tasks/concat.js',
      'tasks/standard.js',
      'tasks/uglify.js',
      'tasks/watch.js'
    ]

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
    ]

    helpers.mockPrompt(this.app, {
      libname: 'jslib',
      description: 'foo',
      authorName: 'Obi Wan Kenobi',
      authorEmail: 'obi@theforce.stars',
      license: 'WTFL',
      username: 'foobar',
      repositoryUrl: 'https://github.com/bar/jslib.git',
      repositoryType: 'git'
    })

    this.app.options['skip-install'] = true

    this.app.run(function () {
      assert.file(expected)
      assert.fileContent(expectedContent)
      done()
    })
  })

  it('validate library name ending in .js', function (done) {
    var expectedContent = [
      // library name
      ['bower.json', /"name": "jslib.js"/],
      ['package.json', /"name": "jslib.js"/],
      // main entry file
      ['bower.json', /"main": "dist\/main.js"/],
      ['package.json', /"main": "dist\/main.js"/]
    ]

    helpers.mockPrompt(this.app, {
      libname: 'jslib.js'
    })

    this.app.options['skip-install'] = true

    this.app.run(function () {
      assert.fileContent(expectedContent)
      done()
    })
  })

  it('library name sanitization should works', function (done) {
    var expectedContent = [
      // library name
      ['bower.json', /"name": "lib-n-c-c-0123456789.js"/],
      ['package.json', /"name": "lib-n-c-c-0123456789.js"/],
      // main entry file
      ['bower.json', /"main": "dist\/main.js"/],
      ['package.json', /"main": "dist\/main.js"/]
    ]

    helpers.mockPrompt(this.app, {
      libname: 'lib"·$%&()/\=¿?¡!^`+*ñ¨Ç´ç;,:-_0123456789.js'
    })

    this.app.options['skip-install'] = true

    this.app.run(function () {
      assert.fileContent(expectedContent)
      done()
    })
  })

  it('should create valid json files', function (done) {
    helpers.mockPrompt(this.app, {
      libname: 'lib"·$%&()/\=¿?¡!^`+*ñ¨Ç´ç;,:-_0123456789.js'
    })

    this.app.options['skip-install'] = true

    this.app.run(function () {
      require(path.join(__dirname, 'temp', 'package.json'))
      require(path.join(__dirname, 'temp', 'bower.json'))
      done()
    })
  })
})

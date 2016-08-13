'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var validator = require('validator');
var mkdirp = require('mkdirp');

var JslibGenerator = yeoman.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // dirname
    var splitPath = process.cwd().split('/');
    var dirname   = splitPath[splitPath.length - 1];

    // username
    if (process.env != undefined && process.env.USER != undefined) {
      this.username = process.env.USER;
    }

    var prompts = [{
      name: 'libname',
      message: 'What is the name of your library?',
      default: dirname
    },
    {
      name: 'description',
      message: 'A description for your library',
      default: 'The awesome javascript library'
    },
    {
      name: 'authorName',
      message: 'Author name ?',
      store: true,
      default: this.user.git.username || ''
    },
    {
      name: 'authorEmail',
      message: 'Author email ?',
      store: true,
      default: this.user.git.email || ''
    },
    {
      name: 'license',
      message: 'License',
      default: 'MIT'
    },
    {
      name: 'username',
      message: 'Git username',
      store: true,
      default: this.username || ''
    },
    {
      name: 'repositoryUrl',
      message: 'repository url',
      default: this.username ? 'https://github.com/' + this.username + '/' + dirname + '.git': ''
    },
    {
      name: 'repositoryType',
      message: 'repository type',
      default: 'git'
    }];

    this.prompt(prompts, function (props) {
      // whitelist all chars in [a-zA-Z0-9\-_\.] range.
      this.libname = validator.whitelist(validator.trim(props.libname), 'a-zA-Z0-9\-_\.');
      this.name = this.libname.replace(/\.js$/g, '');
      this.description = props.description;
      this.authorName = props.authorName;
      this.authorEmail = props.authorEmail;
      this.license =  validator.trim(props.license);
      this.username =  validator.trim(props.username);
      this.repositoryUrl =  validator.trim(props.repositoryUrl);
      this.repositoryType =  validator.trim(props.repositoryType);
      done();
    }.bind(this));
  },

  app: function () {

    this.template('_package.json',  'package.json');
    this.template('_bower.json',    'bower.json');
    this.template('README.md',      'README.md');
    this.template('lib.js',         'lib/' + this.name + '.js');
  },

  projectfiles: function () {
    this.copy('_editorconfig', '.editorconfig');
    this.copy('_gitignore', '.gitignore');
    this.copy('_jshintrc', '.jshintrc');
    this.copy('_jscs.json', '.jscs.json');
    this.copy('_travis.yml', '.travis.yml');
    this.copy('Gruntfile.js', 'Gruntfile.js');
    this.directory('tasks', 'tasks');
  }
});

module.exports = JslibGenerator;

'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var JslibGenerator = yeoman.generators.Base.extend({
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

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Jslib generator!'));

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
      default: this.user.git.username || ''
    },
    {
      name: 'authorEmail',
      message: 'Author email ?',
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
      default: this.username || ''
    },
    {
      name: 'repository',
      message: 'Git repository',
      default: this.username ? this.username + '/' + dirname : ''
    }];

    this.prompt(prompts, function (props) {
      this.libname = props.libname.replace(/\s+/g, '');
      this.description = props.description;
      this.authorName = props.authorName;
      this.authorEmail = props.authorEmail;
      this.license = props.license.replace(/\s+/g, '');
      this.username = props.username.replace(/\s+/g, '');
      this.repository = props.repository.replace(/\s+/g, '');

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('lib');
    this.mkdir('dist');

    this.template('_package.json',  'package.json');
    this.template('_bower.json',    'bower.json');
    this.template('README.md',      'README.md');
    this.template('lib.js',         'lib/' + this.libname + '.js');
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

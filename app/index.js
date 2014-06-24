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
    var dirname   = splitPath[splitPath.length-1];

    var prompts = [{
      name: 'libname',
      message: 'What is the name of your library?',
      default: dirname
    }];

    this.prompt(prompts, function (props) {
      this.libname = props.libname.replace(/\s+/g, '');

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('lib');
    this.mkdir('dist');


    this.template('_package.json',  'package.json');
    this.template('_bower.json',    'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = JslibGenerator;

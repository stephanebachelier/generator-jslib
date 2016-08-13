'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
var _s = require('underscore.string');

var JslibGenerator = yeoman.Base.extend({
  init: function () {
    var prompts = [{
      name: 'libname',
      message: 'What is the name of your library?',
      default: this.appname.replace(/\s/g, '-'),
      filter: (x) => _s.slugify(x)
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

    return this.prompt(prompts).then(function (props) {
      var name = _s.slugify(props.libname);

      var tpl = {
        libname: name,
        name: name.replace(/\-js$/g, ''),
        description: props.description,
        authorName: props.authorName,
        authorEmail: props.authorEmail,
        license: _s.trim(props.license),
        username: _s.trim(props.username),
        repositoryUrl: _s.trim(props.repositoryUrl),
        repositoryType: _s.trim(props.repositoryType)
      };

      mkdirp('lib');
      mkdirp('dist');

      this.template('_package.json',  'package.json', tpl);
      this.template('_bower.json',    'bower.json', tpl);
      this.template('README.md',      'README.md', tpl);
      this.template('main.js',         'lib/main.js', tpl);

      this.copy('_editorconfig', '.editorconfig');
      this.copy('_gitignore', '.gitignore');
      this.copy('_jshintrc', '.jshintrc');
      this.copy('_jscs.json', '.jscs.json');
      this.copy('_travis.yml', '.travis.yml');

      // yeah no templating here !
      this.bulkCopy('Gruntfile.js', 'Gruntfile.js');
      this.bulkDirectory('tasks', 'tasks');

    }.bind(this));
  },

  git: function () {
    this.spawnCommandSync('git', ['init'])
  },

  install: function () {
    this.installDependencies()
  }
});

module.exports = JslibGenerator;

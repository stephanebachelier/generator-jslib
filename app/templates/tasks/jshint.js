module.exports = {
  options: {
    jshintrc: '.jshintrc',
    reporter: require('jshint-stylish')
  },
  gruntfile: {
    src: 'Gruntfile.js'
  },
  lib: {
    src: ['lib/<%= pkg.name %>.js']
  },
  test: {
    src: ['test/**/*.js']
  }
};

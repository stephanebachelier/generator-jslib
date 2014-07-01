module.exports = {
  options: {
    editorconfig: '.editorconfig'
  },
  gruntfile: {
    src: ['Gruntfile.js', 'tasks/{,*/}*.js']
  },
  lib: {
    src: ['lib/<%%= pkg.name %>.js']
  },
  test: {
    src: ['test/spec/**/*.js']
  }
};

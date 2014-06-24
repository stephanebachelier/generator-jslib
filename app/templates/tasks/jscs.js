module.exports = {
  options: {
    preset: 'google',
    config: '.jscs.json'
  },
  lib: ['lib/<%= pkg.name %>.js'],
  test: ['test/spec/{,*/}*.js'],
  grunt: ['Gruntfile.js'],
}

module.exports = {
  lib: {
    template: 'umd',
    indent: '  ',
    src: 'lib/main.js',
    dest: 'dist/main.js',
    returnExportsGlobal: '<%= name %>',
    deps: {
      default: [],
      amd: [],
      cjs: [],
      global: []
    }
  }
}

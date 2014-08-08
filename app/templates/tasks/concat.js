module.exports = {
  options: {
    banner: '<%%= banner %>',
    stripBanners: true
  },
  dist: {
    src: ['lib/<%%= pkg.name.replace(/\.js$/, '') %>.js'],
    dest: 'dist/<%%= pkg.name.replace(/\.js$/, '') %>.js'
  }
};

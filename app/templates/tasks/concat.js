module.exports = {
  options: {
    banner: '<%= banner %>',
    stripBanners: true
  },
  dist: {
    src: ['lib/<%= pkg.name %>.js'],
    dest: 'dist/<%= pkg.name %>.js'
  }
};

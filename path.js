var path = require('path');

module.exports = {
  resolve: {
    root: [
      path.resolve('./source/js')
    ],
    alias: {
      'styles': path.resolve('./source/sass'),
      'compass': path.resolve('./node_modules/compass-mixins/lib'),
      'images': path.resolve('./source/images'),
      'font': path.resolve('./source/font')
    }
  }
};

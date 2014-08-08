(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return factory();
    });
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    root.<%= name %> = factory();
  }

}(this, function () {
  'use strict';

  // code goes here
  var <%= name %> = function (options) {

  };

  return <%= name %>;
}));

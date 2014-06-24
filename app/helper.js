'use strict';

module.exports.addProperty = function (properties, name, value) {
  properties.push('  "'+ name +'": "' + value + '"');
};

module.exports.stringifyProp = function (properties) {
  return properties.length ? properties.join(',\n  ') : null;
};

module.exports.formatAuthor = function (props) {
  var properties = [];

  if (props.authorName) {
    this.addProperty(properties, 'name', props.authorName);
  }
  if (props.authorEmail) {
    this.addProperty(properties, 'email', props.authorEmail);
  }

  return this.stringifyProp(properties);
};

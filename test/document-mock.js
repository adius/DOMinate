var document = {};

document.createElementNS = function createElementNS(namespace, tagName) {
  var element = {};
  element.__ns = namespace;
  element.__tag = tagName;

  element.children = [];
  element.className = '';

  element.appendChild = function (child) {
    element.children.push(child);
  };
  element.setAttribute = function (name, value) {
    if (name === 'class') return element.className = value;
    element[name] = value;
  };
  return element;
};

document.createTextNode = function (text) {
  return { text: text };
};

global.document = document;
exports.document = document;
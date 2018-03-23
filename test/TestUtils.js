function getHimilayaText(text) {
  return {
    type: 'text',
    content: text
  };
}

function getHimilayaObject(tagName, content, attributes, additionalHimilayanChildren) {
  const children = ((content !== undefined) ? [getHimilayaText(content)] : [])
    .concat((additionalHimilayanChildren !== undefined) ? additionalHimilayanChildren : []);

  return {
    type: 'element',
    tagName,
    attributes: (attributes !== undefined) ? attributes : [],
    children,
  };
}

function getHimilayaAttribute(key, value) {
  return {
    key,
    value,
  };
}

module.exports = {
  getHimilayaAttribute,
  getHimilayaObject,
  getHimilayaText,
};

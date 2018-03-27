const os = require('os');

function getHimilayaAttribute(himilayaObject, attribute) {
  const attr = himilayaObject.attributes.filter(attr => attr.key === attribute)[0];
  return (attr !== undefined) ? attr.value : '';
}

function prependNonEmptyString(string, prefix) {
  return (string !== '') ? `${prefix}${string}` : '';
}

function appendNonEmptyString(string, suffix) {
  return (string !== '') ? `${string}${suffix}` : '';
}

function wrapNonEmptyString(string, wrapping) {
  return (string !== '') ? `${wrapping}${string}${wrapping}` : '';
}

function generateListRenderer(tagName) {
  return (himilayaObject, renderProperties) => {
    const innerMarkdown = himilayaObject.children
      .map((child, index) => {
        const childRenderProperties = {
          list: {
            type: tagName,
            index,
          },
        };
        return (renderComponent[child.tagName] !== undefined) ? renderComponent[child.tagName](child, childRenderProperties) : '';
      })
      .join('');
    return `${os.EOL}${innerMarkdown}`;
  };
}

function generateHeaderRenderer(frequency) {
  return (himilayaObject, renderProperties) => {
    return appendNonEmptyString(
      prependNonEmptyString(renderComponents(himilayaObject.children, renderProperties), `${'#'.repeat(frequency)} `)
      , os.EOL.repeat(2)
    );
  };
};

function a(himilayaObject, renderProperties) {
  const href = getHimilayaAttribute(himilayaObject, 'href');
  return `[${renderComponents(himilayaObject.children, renderProperties)}](${href})`;
}

function area(himilayaObject, renderProperties) {
  const alt = getHimilayaAttribute(himilayaObject, 'alt');
  const href = getHimilayaAttribute(himilayaObject, 'href');

  return `[${alt}](${href})`;
}

function b(himilayaObject, renderProperties) {
  return wrapNonEmptyString(renderComponents(himilayaObject.children, renderProperties), '**');
}

function del(himilayaObject, renderProperties) {
  return wrapNonEmptyString(renderComponents(himilayaObject.children, renderProperties), '~~');
}

function div(himilayaObject, renderProperties) {
  const indentedMarkdown = himilayaObject.children
    .map(himilayaChild => renderHimilayaObject(himilayaChild, renderProperties))
    .join(os.EOL)
    .split(os.EOL)
    .map(markdown => `  ${markdown}`)
    .join(os.EOL);
  return `${os.EOL}${indentedMarkdown}`;
}

function i(himilayaObject, renderProperties) {
  return wrapNonEmptyString(renderComponents(himilayaObject.children, renderProperties), '_');
}

function input(himilayaObject, renderProperties) {
  return `TO BE IMPLEMENTED: input${os.EOL.repeat(2)}`;
}

function img(himilayaObject, renderProperties) {
  const alt = getHimilayaAttribute(himilayaObject, 'alt');
  const src = getHimilayaAttribute(himilayaObject, 'src');
  let title = getHimilayaAttribute(himilayaObject, 'title');
  title = (title !== '') ? ` "${title}" ` : title;
  return `![${alt}](${src}${title})`;
}

function li(himilayaObject, renderProperties) {
  const prefix = (renderProperties.list.type === 'ul') ? '* ': `${renderProperties.list.index + 1}. `;
  return `${prefix}${renderComponents(himilayaObject.children, renderProperties)}${os.EOL}`;
}

function p(himilayaObject, renderProperties) {
  return `${os.EOL}${renderComponents(himilayaObject.children, renderProperties)}`;
}

function title(himilayaObject, renderProperties) {
  return `# ${renderComponents(himilayaObject.children, renderProperties)}`;
}

const renderComponent = {
  a,
  area,
  b,
  del,
  div,
  em: i,
  h1: generateHeaderRenderer(1),
  h2: generateHeaderRenderer(2),
  h3: generateHeaderRenderer(3),
  h4: generateHeaderRenderer(4),
  h5: generateHeaderRenderer(5),
  h6: generateHeaderRenderer(6),
  i,
  img,
  input,
  li,
  ol: generateListRenderer('ol'),
  p,
  strike: del,
  strong: b,
  title: generateHeaderRenderer(1),
  ul: generateListRenderer('ul'),
};

function renderHimilayaObject(himilayaObject, renderProperties) {
  if(himilayaObject.type === 'text') {
    return himilayaObject.content !== '\n' ? himilayaObject.content : '';
  } else {
    const markdown = (renderComponent[himilayaObject.tagName] !== undefined) ?
      renderComponent[himilayaObject.tagName](himilayaObject, renderProperties) :
      (himilayaObject.children !== undefined) ?
        renderComponents(himilayaObject.children, renderProperties) :
        '';
    return markdown;
  }
}

function renderComponents(himilayaArray, renderProperties) {
  return himilayaArray
    .map(himilayaChild => renderHimilayaObject(himilayaChild, renderProperties))
    .join('');
}

module.exports = {
  renderComponent,
  renderComponents,
  renderHimilayaObject,
};

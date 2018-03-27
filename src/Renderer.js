const os = require('os');

function getHimilayaAttribute(himilayaObject, attribute) {
  const attr = himilayaObject.attributes.filter(attr => attr.key === attribute)[0];
  return (attr !== undefined) ? attr.value : '';
}

function title(himilayaObject, renderProperties) {
  return `# ${renderComponents(himilayaObject.children, renderProperties)}${os.EOL.repeat(2)}`;
}

function b(himilayaObject, renderProperties) {
  const nestedMarkdown = renderComponents(himilayaObject.children, renderProperties);
  return (nestedMarkdown !== '') ? `**${nestedMarkdown}**` : '';
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

function a(himilayaObject, renderProperties) {
  const href = getHimilayaAttribute(himilayaObject, 'href');
  return `[${renderComponents(himilayaObject.children, renderProperties)}](${href})`;
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

function p(himilayaObject, renderProperties) {
  return `${os.EOL}${renderComponents(himilayaObject.children, renderProperties)}`;
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

function li(himilayaObject, renderProperties) {
  const prefix = (renderProperties.list.type === 'ul') ? '* ': `${renderProperties.list.index + 1}. `;
  return `${prefix}${renderComponents(himilayaObject.children, renderProperties)}${os.EOL}`;
}

function area(himilayaObject, renderProperties) {
  const alt = getHimilayaAttribute(himilayaObject, 'alt');
  const href = getHimilayaAttribute(himilayaObject, 'href');

  return `[${alt}](${href})`;
}

const renderComponent = {
  a,
  area,
  b,
  div,
  img,
  input,
  li,
  ol: generateListRenderer('ol'),
  p,
  strong: b,
  title,
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

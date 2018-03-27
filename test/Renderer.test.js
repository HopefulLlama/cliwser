const { getHimilayaAttribute, getHimilayaObject }  = require('./TestUtils');

const { renderComponent, renderComponents } = require('../src/Renderer');

const renderedTags = [
  'a',
  'area',
  'b',
  'img',
  'input',
  'li',
  'ol',
  'p',
  'strong',
  'title',
  'ul',
];

const unrenderedTags = [
  '!DOCTYPE',
  'abbr',
  'acronym',
  'address',
  'applet',
  'article',
  'aside',
  'audio',
  'base',
  'basefont',
  'bdi',
  'bdo',
  'big',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'center',
  'cite',
  'code',
  'col',
  'colgroup',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'dir',
  'dl',
  'dt',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'font',
  'footer',
  'form',
  'frame',
  'frameset',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hr',
  'html',
  'iframe',
  'ins',
  'kbd',
  'label',
  'legend',
  'link',
  'main',
  'map',
  'mark',
  'menu',
  'menuitem',
  'meta',
  'meter',
  'nav',
  'noframes',
  'noscript',
  'object',
  'optgroup',
  'option',
  'output',
  'param',
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'script',
  'section',
  'select',
  'small',
  'source',
  'span',
  'strike',
  'style',
  'sub',
  'summary',
  'sup',
  'svg',
  'table',
  'tbody',
  'td',
  'template',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'tr',
  'track',
  'tt',
  'u',
  'var',
  'video',
  'wbr',
];

const alt = getHimilayaAttribute('alt', 'Google');
const href = getHimilayaAttribute('href', 'http://www.google.com');
const src = getHimilayaAttribute('src', 'http://www.cdn.com/img?=google-logo');
const title = getHimilayaAttribute('title', 'Google Logo');

function renderTestName(tagName, properties) {
  return `should render '${tagName}'`;
}

unrenderedTags.forEach(tag => {
  test(`${tag} does not have a renderer`, () => {
    expect(renderComponent[tag]).toBe(undefined);
  });
});

describe('a', () => {
  test(renderTestName('a'), () => {
    const himilayaObject = getHimilayaObject('a', 'Google', [href]);
    const markdown = renderComponent.a(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });
});

describe('area', () => {
  test(renderTestName('area'), () => {
    const himilayaObject = getHimilayaObject('area', undefined, [alt, href]);
    const markdown = renderComponent.area(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });
});

describe('b', () => {
  test(`${renderTestName('b')} without content`, () => {
    const himilayaObject = getHimilayaObject('b');
    const markdown = renderComponent.b(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('b')} with content`, () => {
    const himilayaObject = getHimilayaObject('b', 'Bold me fam');
    const markdown = renderComponent.b(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('b')} with nested content`, () => {
    const a = getHimilayaObject('a', 'Google', [href]);
    const b = getHimilayaObject('b', undefined, undefined, [a]);
    const markdown = renderComponent.b(b);

    expect(markdown).toMatchSnapshot();
  });
});

describe('div', () => {
  test(renderTestName('div'), () => {
    const div = getHimilayaObject('div', 'Test content');
    const markdown = renderComponent.div(div);

    expect(markdown).toMatchSnapshot();
  });

  test('Nested divs should indent even further', () => {
    const nestedDiv = getHimilayaObject('div', 'Child div');
    const parentDiv = getHimilayaObject('div', 'Parent div', undefined, [nestedDiv]);

    const markdown = renderComponent.div(parentDiv);

    expect(markdown).toMatchSnapshot();
  });

  test('Content should all be nested', () => {
    const a = getHimilayaObject('a', 'Google', [href]);
    const p1 = getHimilayaObject('p', 'Click here to go to ', undefined, [a]);
    const p2 = getHimilayaObject('p', 'Google will let you search the web.');

    const nestedDiv = getHimilayaObject('div', undefined, undefined, [p2]);
    const parentDiv = getHimilayaObject('div', undefined, undefined, [p1, nestedDiv]);

    const markdown = renderComponent.div(parentDiv);

    expect(markdown).toMatchSnapshot();
  });
});

describe('em', () => {
  test(`${renderTestName('em')} without content`, () => {
    const himilayaObject = getHimilayaObject('em');
    const markdown = renderComponent.em(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('em')} with content`, () => {
    const himilayaObject = getHimilayaObject('em', 'Bold me fam');
    const markdown = renderComponent.em(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('em')} with nested content`, () => {
    const a = getHimilayaObject('a', 'Google', [href]);
    const em = getHimilayaObject('em', undefined, undefined, [a]);
    const markdown = renderComponent.em(em);

    expect(markdown).toMatchSnapshot();
  });
});

describe('i', () => {
  test(`${renderTestName('i')} without content`, () => {
    const himilayaObject = getHimilayaObject('i');
    const markdown = renderComponent.i(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('i')} with content`, () => {
    const himilayaObject = getHimilayaObject('i', 'Bold me fam');
    const markdown = renderComponent.i(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('i')} with nested content`, () => {
    const a = getHimilayaObject('a', 'Google', [href]);
    const i = getHimilayaObject('i', undefined, undefined, [a]);
    const markdown = renderComponent.i(i);

    expect(markdown).toMatchSnapshot();
  });
});

describe('img', () => {
  test(renderTestName('img'), () => {
    const himilayaObject = getHimilayaObject('src', undefined, [alt, src, title]);
    const markdown = renderComponent.img(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });
});

describe('input', () => {
  test(renderTestName('input'), () => {
    const markdown = renderComponent.input(undefined);

    expect(markdown).toMatchSnapshot();
  });
});

describe('li', () => {
  [0, 1, 2].forEach(index => {
    test(`should render 'li' with '*' with {list.type: 'ul', list.index: ${index}}`, () => {
      const properties = {
        list: {
          type: 'ul',
          index,
        }
      };
      const himilayaObject = getHimilayaObject('li', 'Content');
      const markdown = renderComponent.li(himilayaObject, properties);

      expect(markdown).toMatchSnapshot();
    });

    test(`should render 'li' with '${index}.' with {list.type: 'ol', list.index: ${index}}`, () => {
      const properties = {
        list: {
          type: 'ol',
          index,
        }
      };

      const himilayaObject = getHimilayaObject('li', 'Content');
      const markdown = renderComponent.li(himilayaObject, properties);

      expect(markdown).toMatchSnapshot();
    });
  });
});

describe('ol', () => {
  beforeEach(() => {
    renderComponent.li = jest.fn();
  });

  test(`should call renderComponent.li(... {list.type: 'ol', index: ...}`, () => {
    const li0 = getHimilayaObject('li', 'Content 0');
    const li1 = getHimilayaObject('li', 'Content 1');
    const li2 = getHimilayaObject('li', 'Content 2');
    const ol = getHimilayaObject('ol', undefined, undefined, [li0, li1, li2]);

    renderComponent.ol(ol);

    expect(renderComponent.li.mock.calls.length).toBe(3);
    expect(renderComponent.li).toBeCalledWith(li0, {list: {type: 'ol', index: 0}});
    expect(renderComponent.li).toBeCalledWith(li1, {list: {type: 'ol', index: 1}});
    expect(renderComponent.li).toBeCalledWith(li2, {list: {type: 'ol', index: 2}});
  });
});

describe('p', () => {
  test(renderTestName('p'), () => {
    const himilayaObject = getHimilayaObject('p', 'This is a paragraph');
    const markdown = renderComponent.p(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });
});

describe('strong', () => {
  test(`${renderTestName('strong')} without content`, () => {
    const himilayaObject = getHimilayaObject('strong');
    const markdown = renderComponent.strong(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('strong')} with content`, () => {
    const himilayaObject = getHimilayaObject('strong', 'Strong me fam');
    const markdown = renderComponent.strong(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('strong')} with nested content`, () => {
    const a = getHimilayaObject('a', 'Google', [href]);
    const strong = getHimilayaObject('strong', undefined, undefined, [a]);
    const markdown = renderComponent.strong(strong);

    expect(markdown).toMatchSnapshot();
  });
});

describe('title', () => {
  test(renderTestName('title'), () => {
    const himilayaObject = getHimilayaObject('title', 'Title');
    const markdown = renderComponent.title(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });
});

describe('ul', () => {
  beforeEach(() => {
    renderComponent.li = jest.fn();
  });

  test(`should call renderComponent.li(... {list.type: 'ol', index: ...}`, () => {
    const li0 = getHimilayaObject('li', 'Content 0');
    const li1 = getHimilayaObject('li', 'Content 1');
    const li2 = getHimilayaObject('li', 'Content 2');
    const ul = getHimilayaObject('ul', undefined, undefined, [li0, li1, li2]);

    renderComponent.ul(ul);

    expect(renderComponent.li.mock.calls.length).toBe(3);
    expect(renderComponent.li).toBeCalledWith(li0, {list: {type: 'ul', index: 0}});
    expect(renderComponent.li).toBeCalledWith(li1, {list: {type: 'ul', index: 1}});
    expect(renderComponent.li).toBeCalledWith(li2, {list: {type: 'ul', index: 2}});
  });
});
const { getHimilayaAttribute, getHimilayaObject }  = require('./TestUtils');

const { renderComponent, renderComponents } = require('../src/Renderer');

const intentionallyUnrenderedTags = [
  '!DOCTYPE',
  'applet',
  'param',
];

const unrenderedTags = [
  'aside',
  'audio',
  'base',
  'basefont',
  'bdi',
  'bdo',
  'big',
  'blockquote',
  'body',
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

unrenderedTags
  .concat(intentionallyUnrenderedTags)
  .forEach(tag => {
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

describe('abbr', () => {
  test(renderTestName('abbr'), () => {
    const himilayaObject = getHimilayaObject('abbr', 'www');
    const markdown = renderComponent.abbr(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('abbr')} with title`, () => {
    const himilayaObject = getHimilayaObject('abbr', 'www', [getHimilayaAttribute('title', 'World Wide Web')]);
    const markdown = renderComponent.abbr(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('abbr')} with no content`, () => {
    const himilayaObject = getHimilayaObject('abbr');
    const markdown = renderComponent.abbr(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });
});

describe('acronym', () => {
  test(renderTestName('acronym'), () => {
    const himilayaObject = getHimilayaObject('acronym', 'www');
    const markdown = renderComponent.acronym(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('acronym')} with title`, () => {
    const himilayaObject = getHimilayaObject('acronym', 'www', [getHimilayaAttribute('title', 'World Wide Web')]);
    const markdown = renderComponent.acronym(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('acronym')} with no content`, () => {
    const himilayaObject = getHimilayaObject('acronym');
    const markdown = renderComponent.acronym(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });
});

describe('address', () => {
  test(renderTestName('address'), () => {
    const address = getHimilayaObject('address', 'Test content');
    const markdown = renderComponent.address(address);

    expect(markdown).toMatchSnapshot();
  });

  test('Content should all be nested', () => {
    const a = getHimilayaObject('a', 'Google', [href]);
    const p1 = getHimilayaObject('p', 'Click here to go to ', undefined, [a]);
    const p2 = getHimilayaObject('p', 'Google will let you search the web.');

    const parentaddress = getHimilayaObject('address', undefined, undefined, [p1, p2]);

    const markdown = renderComponent.address(parentaddress);

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

describe('article', () => {
  test(renderTestName('article'), () => {
    const article = getHimilayaObject('article', 'Test content');
    const markdown = renderComponent.article(article);

    expect(markdown).toMatchSnapshot();
  });

  test('Nested articles should indent even further', () => {
    const nestedarticle = getHimilayaObject('article', 'Child article');
    const parentarticle = getHimilayaObject('article', 'Parent article', undefined, [nestedarticle]);

    const markdown = renderComponent.article(parentarticle);

    expect(markdown).toMatchSnapshot();
  });

  test('Content should all be nested', () => {
    const a = getHimilayaObject('a', 'Google', [href]);
    const p1 = getHimilayaObject('p', 'Click here to go to ', undefined, [a]);
    const p2 = getHimilayaObject('p', 'Google will let you search the web.');

    const nestedarticle = getHimilayaObject('article', undefined, undefined, [p2]);
    const parentarticle = getHimilayaObject('article', undefined, undefined, [p1, nestedarticle]);

    const markdown = renderComponent.article(parentarticle);

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

describe('br', () => {
  test(renderTestName('br'), () => {
    const himilayaObject = getHimilayaObject('br');
    const markdown = renderComponent.br(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('br')} with content should be ignored`, () => {
    const himilayaObject = getHimilayaObject('br', 'Dab on the haters');
    const markdown = renderComponent.br(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });
});

describe('del', () => {
  test(`${renderTestName('del')} without content`, () => {
    const himilayaObject = getHimilayaObject('del');
    const markdown = renderComponent.del(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('del')} with content`, () => {
    const himilayaObject = getHimilayaObject('del', 'Del me fam');
    const markdown = renderComponent.del(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('del')} with nested content`, () => {
    const a = getHimilayaObject('a', 'Google', [href]);
    const del = getHimilayaObject('del', undefined, undefined, [a]);
    const markdown = renderComponent.del(del);

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

describe('h1', () => {
  test(`${renderTestName('h1')} without content`, () => {
    const himilayaObject = getHimilayaObject('h1');
    const markdown = renderComponent.h1(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('h1')} with content`, () => {
    const himilayaObject = getHimilayaObject('h1', 'Bold me fam');
    const markdown = renderComponent.h1(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('h1')} with nested content`, () => {
    const a = getHimilayaObject('a', 'Google', [href]);
    const h1 = getHimilayaObject('h1', undefined, undefined, [a]);
    const markdown = renderComponent.h1(h1);

    expect(markdown).toMatchSnapshot();
  });
});

describe('h2', () => {
  test(`${renderTestName('h2')} without content`, () => {
    const himilayaObject = getHimilayaObject('h2');
    const markdown = renderComponent.h2(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('h2')} with content`, () => {
    const himilayaObject = getHimilayaObject('h2', 'Bold me fam');
    const markdown = renderComponent.h2(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('h2')} with nested content`, () => {
    const a = getHimilayaObject('a', 'Google', [href]);
    const h2 = getHimilayaObject('h2', undefined, undefined, [a]);
    const markdown = renderComponent.h2(h2);

    expect(markdown).toMatchSnapshot();
  });
});

describe('h3', () => {
  test(`${renderTestName('h3')} without content`, () => {
    const himilayaObject = getHimilayaObject('h3');
    const markdown = renderComponent.h3(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('h3')} with content`, () => {
    const himilayaObject = getHimilayaObject('h3', 'Bold me fam');
    const markdown = renderComponent.h3(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('h3')} with nested content`, () => {
    const a = getHimilayaObject('a', 'Google', [href]);
    const h3 = getHimilayaObject('h3', undefined, undefined, [a]);
    const markdown = renderComponent.h3(h3);

    expect(markdown).toMatchSnapshot();
  });
});

describe('h4', () => {
  test(`${renderTestName('h4')} without content`, () => {
    const himilayaObject = getHimilayaObject('h4');
    const markdown = renderComponent.h4(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('h4')} with content`, () => {
    const himilayaObject = getHimilayaObject('h4', 'Bold me fam');
    const markdown = renderComponent.h4(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('h4')} with nested content`, () => {
    const a = getHimilayaObject('a', 'Google', [href]);
    const h4 = getHimilayaObject('h4', undefined, undefined, [a]);
    const markdown = renderComponent.h4(h4);

    expect(markdown).toMatchSnapshot();
  });
});

describe('h5', () => {
  test(`${renderTestName('h5')} without content`, () => {
    const himilayaObject = getHimilayaObject('h5');
    const markdown = renderComponent.h5(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('h5')} with content`, () => {
    const himilayaObject = getHimilayaObject('h5', 'Bold me fam');
    const markdown = renderComponent.h5(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('h5')} with nested content`, () => {
    const a = getHimilayaObject('a', 'Google', [href]);
    const h5 = getHimilayaObject('h5', undefined, undefined, [a]);
    const markdown = renderComponent.h5(h5);

    expect(markdown).toMatchSnapshot();
  });
});

describe('h6', () => {
  test(`${renderTestName('h6')} without content`, () => {
    const himilayaObject = getHimilayaObject('h6');
    const markdown = renderComponent.h6(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('h6')} with content`, () => {
    const himilayaObject = getHimilayaObject('h6', 'Bold me fam');
    const markdown = renderComponent.h6(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('h6')} with nested content`, () => {
    const a = getHimilayaObject('a', 'Google', [href]);
    const h6 = getHimilayaObject('h6', undefined, undefined, [a]);
    const markdown = renderComponent.h6(h6);

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

describe('strike', () => {
  test(`${renderTestName('strike')} without content`, () => {
    const himilayaObject = getHimilayaObject('strike');
    const markdown = renderComponent.strike(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('strike')} with content`, () => {
    const himilayaObject = getHimilayaObject('strike', 'Strike me fam');
    const markdown = renderComponent.strike(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('strike')} with nested content`, () => {
    const a = getHimilayaObject('a', 'Google', [href]);
    const strike = getHimilayaObject('strike', undefined, undefined, [a]);
    const markdown = renderComponent.strike(strike);

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
  test(`${renderTestName('title')} without content`, () => {
    const himilayaObject = getHimilayaObject('title');
    const markdown = renderComponent.title(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('title')} with content`, () => {
    const himilayaObject = getHimilayaObject('title', 'Bold me fam');
    const markdown = renderComponent.title(himilayaObject);

    expect(markdown).toMatchSnapshot();
  });

  test(`${renderTestName('title')} with nested content`, () => {
    const a = getHimilayaObject('a', 'Google', [href]);
    const title = getHimilayaObject('title', undefined, undefined, [a]);
    const markdown = renderComponent.title(title);

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
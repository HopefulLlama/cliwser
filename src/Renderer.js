const os = require('os');

function getHimilayaAttribute(himilayaObject, attribute) {
	const attr = himilayaObject.attributes.filter(attr => attr.key === attribute)[0];
	return attr !== undefined ? attr.value : '';
}

function prependNonEmptyString(string, prefix) {
	return string !== '' ? `${prefix}${string}` : '';
}

function appendNonEmptyString(string, suffix) {
	return string !== '' ? `${string}${suffix}` : '';
}

function wrapNonEmptyString(string, wrapping) {
	return string !== '' ? `${wrapping}${string}${wrapping}` : '';
}

function generateListRenderer(tagName) {
	return himilayaObject => {
		const innerMarkdown = himilayaObject.children
			.map((child, index) => {
				const childRenderProperties = {
					list: {
						type: tagName,
						index,
					},
				};
				return renderComponent[child.tagName] !== undefined
					? renderComponent[child.tagName](child, childRenderProperties)
					: '';
			})
			.join('');
		return `${os.EOL}${innerMarkdown}`;
	};
}

function generateHeaderRenderer(frequency) {
	return (himilayaObject, renderProperties) => {
		return appendNonEmptyString(
			prependNonEmptyString(renderComponents(himilayaObject.children, renderProperties), `${'#'.repeat(frequency)} `),
			os.EOL.repeat(2)
		);
	};
}

function renderLink(text, link) {
	const wrappedLink = link !== undefined ? `(${link})` : '';
	return `[${text}]${wrappedLink}`;
}

function a(himilayaObject, renderProperties) {
	const href = getHimilayaAttribute(himilayaObject, 'href');
	return renderLink(renderComponents(himilayaObject.children, renderProperties), href);
}

function abbr(himilayaObject, renderProperties) {
	const abbreviation = renderComponents(himilayaObject.children, renderProperties);

	const title = getHimilayaAttribute(himilayaObject, 'title');
	const titleSuffix = appendNonEmptyString(prependNonEmptyString(title, ' ('), ')');

	return `${abbreviation}${titleSuffix}`;
}

function address(himilayaObject, renderProperties) {
	return renderComponentLines(himilayaObject.children, renderProperties)
		.map(markdown => wrapNonEmptyString(markdown, '_'))
		.join(os.EOL);
}

function area(himilayaObject) {
	const alt = getHimilayaAttribute(himilayaObject, 'alt');
	const href = getHimilayaAttribute(himilayaObject, 'href');

	return `[${alt}](${href})`;
}

function audio(himilayaObject) {
	const sources = [getHimilayaAttribute(himilayaObject, 'src')]
		.concat(
			himilayaObject.children
				.filter(child => child.tagName === 'source')
				.map(child => getHimilayaAttribute(child, 'src'))
		)
		.filter(source => source !== '');

	return sources.length > 0 ? sources.map(source => `${renderLink(`audio: ${source}`, source)} `).join('') : '';
}

function b(himilayaObject, renderProperties) {
	return wrapNonEmptyString(renderComponents(himilayaObject.children, renderProperties), '**');
}

function br() {
	return os.EOL;
}

function button(himilayaObject, renderProperties) {
	return renderLink(`Button: ${renderComponents(himilayaObject.children, renderProperties)}`);
}

function del(himilayaObject, renderProperties) {
	return wrapNonEmptyString(renderComponents(himilayaObject.children, renderProperties), '~~');
}

function div(himilayaObject, renderProperties) {
	const indentedMarkdown = renderComponentLines(himilayaObject.children, renderProperties)
		.map(markdown => `  ${markdown}`)
		.join(os.EOL);
	return `${os.EOL}${indentedMarkdown}`;
}

function i(himilayaObject, renderProperties) {
	return wrapNonEmptyString(renderComponents(himilayaObject.children, renderProperties), '_');
}

function input() {
	return `TO BE IMPLEMENTED: input${os.EOL.repeat(2)}`;
}

function img(himilayaObject) {
	const alt = getHimilayaAttribute(himilayaObject, 'alt');
	const src = getHimilayaAttribute(himilayaObject, 'src');
	const title = wrapNonEmptyString(wrapNonEmptyString(getHimilayaAttribute(himilayaObject, 'title'), '"'), ' ');
	const link = `${src}${title}`;
	return `!${renderLink(alt, link)}`;
}

function li(himilayaObject, renderProperties) {
	const prefix = renderProperties.list.type === 'ul' ? '* ' : `${renderProperties.list.index + 1}. `;
	return `${prefix}${renderComponents(himilayaObject.children, renderProperties)}${os.EOL}`;
}

function p(himilayaObject, renderProperties) {
	return `${os.EOL}${renderComponents(himilayaObject.children, renderProperties)}`;
}

const renderComponent = {
	a,
	abbr,
	acronym: abbr,
	address,
	area,
	article: div,
	audio,
	b,
	br,
	button,
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
	if (himilayaObject.type === 'text') {
		return himilayaObject.content !== '\n' ? himilayaObject.content : '';
	} else {
		const markdown =
			renderComponent[himilayaObject.tagName] !== undefined
				? renderComponent[himilayaObject.tagName](himilayaObject, renderProperties)
				: himilayaObject.children !== undefined ? renderComponents(himilayaObject.children, renderProperties) : '';
		return markdown;
	}
}

function renderComponents(himilayaArray, renderProperties) {
	return himilayaArray.map(himilayaChild => renderHimilayaObject(himilayaChild, renderProperties)).join('');
}

function renderComponentLines(himilayaArray, renderProperties) {
	return renderComponents(himilayaArray, renderProperties).split(os.EOL);
}

module.exports = {
	renderComponent,
	renderComponents,
	renderHimilayaObject,
};

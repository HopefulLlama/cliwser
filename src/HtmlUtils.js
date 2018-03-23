const { parse } = require('himalaya');

const os = require('os');

const Renderer = require('./Renderer');

function stripScriptTags(string) {
  return string.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

function stripStyleTags(string) {
  return string.replace(/<style\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/style>/gi, '');
}

function sanitiseMarkdown(markdown) {
  return markdown
    .replace(/^\s*$(?:\r\n?|\n)/gm, os.EOL)
    .replace(/[\r?\n|\r]{3,}/g, os.EOL);
}

function prettyPrintHtml(html) {
  const strippedHtml = stripScriptTags(stripStyleTags(html));
  const himilayaArray = parse(strippedHtml);
  const markdown = sanitiseMarkdown(Renderer.renderComponents(himilayaArray, {indentation: 0}));
  console.log(markdown);
}

module.exports = {
  stripScriptTags,
  stripStyleTags,
  prettyPrintHtml,
}
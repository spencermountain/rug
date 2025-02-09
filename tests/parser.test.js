import { test } from 'node:test';
import assert from 'node:assert';
import { parseRug } from '../src/index.js';

test('basic text parsing', async (t) => {
  const input = `Hello world!

This is a second paragraph.`;

  const expected = '<p>Hello world!</p>\n<p>This is a second paragraph.</p>';
  assert.equal(parseRug(input), expected);
});

test('class-based div syntax', async (t) => {
  const input = `.container.mx-4 Hello world`;
  const expected = '<div class="container mx-4">Hello world</div>';
  assert.equal(parseRug(input), expected);
});

test('nested class-based divs', async (t) => {
  const input = `.container.mx-4
  .card.p-2
    Hello world`;

  const expected =
    '<div class="container mx-4">\n' +
    '<div class="card p-2">\n' +
    'Hello world\n' +
    '</div>\n' +
    '</div>';
  assert.equal(parseRug(input), expected);
});

test('html passthrough', async (t) => {
  const input = `Some text

<div class="manual">
  <h1>Hello</h1>
</div>

More text`;

  const expected =
    '<p>Some text</p>\n' +
    '<div class="manual">\n' +
    '  <h1>Hello</h1>\n' +
    '</div>\n' +
    '<p>More text</p>';
  assert.equal(parseRug(input), expected);
});

test('shorthand attributes', async (t) => {
  const input = `.card#main[data-role=button][disabled]
    .title.text-lg Hello`;

  const expected =
    '<div class="card" id="main" data-role="button" disabled>\n' +
    '<div class="title text-lg">Hello</div>\n' +
    '</div>';
  assert.equal(parseRug(input), expected);
});

test('mixed content', async (t) => {
  const input = `Hello world

.container.mx-4
  This is some text
  .card.p-2
    <span>HTML content</span>
    More text`;

  const expected =
    '<p>Hello world</p>\n' +
    '<div class="container mx-4">\n' +
    'This is some text\n' +
    '<div class="card p-2">\n' +
    '<span>HTML content</span>\n' +
    'More text\n' +
    '</div>\n' +
    '</div>';
  assert.equal(parseRug(input), expected);
});

test('empty lines between content', async (t) => {
  const input = `First paragraph

Second paragraph

.container
  Hello

  .card
    World`;

  const expected =
    '<p>First paragraph</p>\n' +
    '<p>Second paragraph</p>\n' +
    '<div class="container">\n' +
    'Hello\n' +
    '<div class="card">\n' +
    'World\n' +
    '</div>\n' +
    '</div>';
  assert.equal(parseRug(input), expected);
});

test('complex attributes', async (t) => {
  const input = `.card#main[data-role="button with spaces"][class="external-class"]
  .content[style="color: red"]
    Hello`;

  const expected =
    '<div class="card" id="main" data-role="button with spaces" class="external-class">\n' +
    '<div class="content" style="color: red">\n' +
    'Hello\n' +
    '</div>\n' +
    '</div>';
  assert.equal(parseRug(input), expected);
});

test('preserves newlines in content', async (t) => {
  const input = `This is a paragraph
with multiple lines
that should preserve
line breaks.

.container
  This content has
  multiple lines
  inside a div

This is another paragraph
with line breaks.`;

  const expected =
    '<p>This is a paragraph\n' +
    'with multiple lines\n' +
    'that should preserve\n' +
    'line breaks.</p>\n' +
    '<div class="container">\n' +
    'This content has\n' +
    'multiple lines\n' +
    'inside a div\n' +
    '</div>\n' +
    '<p>This is another paragraph\n' +
    'with line breaks.</p>';

  assert.equal(parseRug(input), expected);
});

test('preserves newlines in nested content', async (t) => {
  const input = `.card
  This is some text
  that spans multiple
  lines
  .inner
    And this is
    nested content
    with breaks`;

  const expected =
    '<div class="card">\n' +
    'This is some text\n' +
    'that spans multiple\n' +
    'lines\n' +
    '<div class="inner">\n' +
    'And this is\n' +
    'nested content\n' +
    'with breaks\n' +
    '</div>\n' +
    '</div>';

  assert.equal(parseRug(input), expected);
});

test('wraps output in pre-wrap container', async (t) => {
  const input = `This is a paragraph
with natural line breaks
  and some indentation


and multiple blank lines above.

.container
  This content has
  natural line breaks
    and indentation

  and spaces between`;

  const expected =
    '<div style="white-space: pre-wrap">\n' +
    '<p>This is a paragraph\n' +
    'with natural line breaks\n' +
    '  and some indentation\n\n\n' +
    'and multiple blank lines above.</p>\n' +
    '<div class="container">\n' +
    'This content has\n' +
    'natural line breaks\n' +
    '  and indentation\n\n' +
    'and spaces between\n' +
    '</div>\n' +
    '</div>';

  assert.equal(parseRug(input), expected);
});

test('handles mixed content with preserved whitespace', async (t) => {
  const input = `Here's some text
with breaks.

.alert.warning
  This is a warning
  that spans multiple
  lines

And back to text
  with indentation.`;

  const expected =
    '<p style="white-space: pre-wrap">Here\'s some text\n' +
    'with breaks.</p>\n' +
    '<div class="alert warning" style="white-space: pre-wrap">\n' +
    'This is a warning\n' +
    'that spans multiple\n' +
    'lines\n' +
    '</div>\n' +
    '<p style="white-space: pre-wrap">And back to text\n' +
    '  with indentation.</p>';

  assert.equal(parseRug(input), expected);
});

test('uses span elements for class containers', async (t) => {
  const input = `This is a paragraph
with natural line breaks.

.container.mx-4
  This content has
  natural line breaks
  .card.p-2
    Nested content
    should flow naturally`;

  const expected =
    '<div style="white-space: pre-wrap">\n' +
    '<p>This is a paragraph\n' +
    'with natural line breaks.</p>\n' +
    '<span class="container mx-4">\n' +
    'This content has\n' +
    'natural line breaks\n' +
    '<span class="card p-2">\n' +
    'Nested content\n' +
    'should flow naturally\n' +
    '</span>\n' +
    '</span>\n' +
    '</div>';

  assert.equal(parseRug(input), expected);
});

test('handles complex nested spans', async (t) => {
  const input = `.alert.warning
  Warning message
  .icon.small
    ⚠️
  More warning text`;

  const expected =
    '<div style="white-space: pre-wrap">\n' +
    '<span class="alert warning">\n' +
    'Warning message\n' +
    '<span class="icon small">\n' +
    '⚠️\n' +
    '</span>\n' +
    'More warning text\n' +
    '</span>\n' +
    '</div>';

  assert.equal(parseRug(input), expected);
}); 
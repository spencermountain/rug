// import { parseRug } from './builds/index.js';
import parseRug from './builds/index.js';
// Test cases
const txt = `
okay line one
okay line two

okay line three

.container.mx-4.p-2
  .card#main-card[data-role=button][disabled]
    .text-xl.font-bold Hello
    #special-item.flex.items-center.gap-2[data-test=true]
      Some content here

.alert.bg-red-500.text-white[role=alert]
  Warning message

Hello world!

This is a second paragraph.
With multiple lines
that should be joined.

.container.mx-4
  .card.p-2
    Hello from a nested card
    .button.primary Click me
  .card.p-2
    Another card
    with multiple lines

Here's some text.

.alert.warning
  This is a warning message
  that spans multiple
  indented lines

And here's a Vue component:
<MyComponent :value="123" />

Back to plain text.

<div class="manual-html">
  <h1>Hello</h1>
  <p>This is raw HTML</p>
</div>`;

console.log('\n=== Output ===');
console.log(parseRug(txt));
// import parseRug from './builds/index.js';
import parseRug from './src/index.js';

const txt = `
:prop="val" foo

:foo and also here

#id and here
`;

console.log('\n=== Output ===');
console.log(parseRug(txt));
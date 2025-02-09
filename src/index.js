import { RugParser } from './parser.js';

function parseRug(input, options = {}) {
  const parser = new RugParser(options);
  return parser.parse(input);
}

export default parseRug; 
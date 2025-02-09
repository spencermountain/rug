interface RugOptions {
  // Add any future configuration options here
}

declare class RugParser {
  constructor(options?: RugOptions);
  parse(input: string): string;
}

declare function parseRug(input: string, options?: RugOptions): string;

export { RugParser, RugOptions };
export default parseRug; 
export class RugParser {
  constructor(options = {}) {
    this.result = [];
    this.currentIndentLevel = 0;
    this.options = {
      ...options
    };
  }

  parse(input) {
    const lines = input.split('\n');
    let buffer = [];
    let indentStack = []; // Stack to track nested divs
    let currentNestLevel = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const indent = this.getIndentLevel(line);
      const trimmedLine = line.trim();

      // Skip empty lines
      if (!trimmedLine) {
        if (buffer.length) {
          this.processParagraphs(buffer);
          buffer = [];
        }
        continue;
      }

      // Handle class-based div syntax
      if (trimmedLine.startsWith('.') || trimmedLine.startsWith('#')) {
        if (buffer.length) {
          this.processParagraphs(buffer);
          buffer = [];
        }

        // Close any divs that are ending based on indent
        while (indentStack.length > 0 && indent <= indentStack[indentStack.length - 1].indent) {
          this.result.push(indentStack.pop().closeTag);
        }

        const { openTag, closeTag, content } = this.parseClassLine(trimmedLine);

        this.result.push(`${openTag}${content}`);
        indentStack.push({ indent, closeTag });
        continue;
      }

      // Handle indented content under a class-based div
      if (indent > 0 && indentStack.length > 0) {
        if (indent > indentStack[indentStack.length - 1].indent) {
          // Preserve the line as-is, don't trim
          this.result.push(line.slice(indent));
          continue;
        }
      }

      // Handle HTML passthrough
      if (trimmedLine.includes('<')) {
        if (buffer.length) {
          this.processParagraphs(buffer);
          buffer = [];
        }
        this.result.push(line);
        continue;
      }

      // Accumulate plain text lines
      buffer.push(line);
    }

    // Process any remaining text in buffer
    if (buffer.length) {
      this.processParagraphs(buffer);
    }

    // Close any remaining open divs
    while (indentStack.length > 0) {
      this.result.push(indentStack.pop().closeTag);
    }

    // Wrap the entire result in a pre-wrap div, without pretty printing
    const innerResult = this.result.join('\n');
    return `<div style="white-space: pre-wrap">\n${innerResult}\n</div>`;
  }

  getIndentLevel(line) {
    const match = line.match(/^(\s*)/);
    return match ? match[1].length : 0;
  }

  parseClassLine(line) {
    const parts = line.trim().split(' ');
    const firstPart = parts[0];
    const content = parts.slice(1).join(' ');

    // Parse the element definition (first part)
    const attrs = {
      tag: 'span',
      classes: [],
      id: null,
      attributes: {}
    };

    // Match different parts of the element definition
    const elementParts = firstPart.match(/([.#][^.#\[]+|\[[^\]]+\])/g) || [];

    for (const part of elementParts) {
      if (part.startsWith('.')) {
        attrs.classes.push(part.slice(1));
      } else if (part.startsWith('#')) {
        attrs.id = part.slice(1);
      } else if (part.startsWith('[') && part.endsWith(']')) {
        const attrContent = part.slice(1, -1);
        const [name, ...valueParts] = attrContent.split('=');
        const value = valueParts.join('=');
        attrs.attributes[name] = value.replace(/^["']|["']$/g, '');
      }
    }

    // Build the opening tag
    let tag = `<${attrs.tag}`;

    if (attrs.classes.length > 0) {
      tag += ` class="${attrs.classes.join(' ')}"`;
    }

    if (attrs.id) {
      tag += ` id="${attrs.id}"`;
    }

    for (const [name, value] of Object.entries(attrs.attributes)) {
      tag += ` ${name}="${value}"`;
    }

    tag += '>';

    return {
      openTag: tag,
      closeTag: `</${attrs.tag}>`,
      content
    };
  }

  processParagraphs(lines) {
    // Split text into paragraphs based on empty lines
    const paragraphs = [];
    let currentParagraph = [];

    for (const line of lines) {
      if (line.trim() === '') {
        if (currentParagraph.length) {
          paragraphs.push(currentParagraph.join('\n'));
          currentParagraph = [];
        }
      } else {
        currentParagraph.push(line);
      }
    }

    if (currentParagraph.length) {
      paragraphs.push(currentParagraph.join('\n'));
    }

    // Convert paragraphs to HTML (no need for style attribute now)
    for (const paragraph of paragraphs) {
      if (paragraph.trim()) {
        this.result.push(`<p>${paragraph}</p>`);
      }
    }
  }
} 
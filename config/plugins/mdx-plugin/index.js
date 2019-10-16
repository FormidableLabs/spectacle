import { extname } from 'path';

import parse from './parse';

export default function mdx() {
  return {
    name: 'mdx',
    transform(code, id) {
      const ext = extname(id);
      if (ext !== '.mdx') {
        // this is not an mdx file - move onto
        // next plugin
        return code;
      }
      // parse + return the mdx file content
      const parsedCode = parse(code);
      return parsedCode;
    }
  };
}

import { extname } from 'path';

import parse from './parse';

export default function mdx() {
  return {
    name: 'mdx',

    transform(code, id) {
      const ext = extname(id);
      if (ext !== '.mdx') {
        return code;
      }
      const parsedCode = parse(code);
      return parsedCode;
    }
  };
}

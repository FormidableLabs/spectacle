import { extname } from 'path';

import parse from './parse';

export default function mdx(options = {}) {
  return {
    name: 'mdx',
    transform(data, id) {
      const ext = extname(id);
      if (ext !== '.mdx') {
        return null;
      }

      const code = parse(data);

      return code;
    }
  };
}

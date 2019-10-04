const fs = require('fs');
const { walk } = require('estree-walker');
const readPkg = require('read-pkg');
const MagicString = require('magic-string');

const pkgJSON = readPkg.sync();

const parseImport = input => {
  // https://github.com/egoist/parse-package-name/blob/master/index.js
  const RE_SCOPED = /^(@[^/]+\/[^/@]+)(?:\/([^@]+))?(?:@([\s\S]+))?/;
  const RE_NORMAL = /^([^/@]+)(?:\/([^@]+))?(?:@([\s\S]+))?/;
  const matched =
    input.charAt(0) === '@' ? input.match(RE_SCOPED) : input.match(RE_NORMAL);

  if (!matched) {
    return {};
  }
  return {
    name: matched[1],
    path: matched[2] || ''
  };
};

const transformToUnpkgUrl = (name, version, subPackagePath) =>
  `https://unpkg.com/${name}@${version}${
    subPackagePath ? `/${subPackagePath}` : ''
  }?module`;

export default function UnpkgBehaviour() {
  let dependencies = {};

  return {
    name: 'unpkg-behaviour',
    options(opts) {
      const isExternal = id => {
        if (Array.isArray(opts.external)) {
          return opts.external.includes(id);
        }
        if (typeof opts.external === 'function') {
          return opts.external(id);
        }
        return false;
      };

      dependencies = Object.keys(pkgJSON.dependencies).reduce((acc, dep) => {
        const manifestLocation = require.resolve(`${dep}/package.json`);
        const rawManifest = fs.readFileSync(manifestLocation);
        const manifest = JSON.parse(rawManifest);

        if (manifest.module && isExternal(manifest.name)) {
          acc[manifest.name] = manifest;
        }
        return acc;
      }, {});

      if (Array.isArray(opts.external)) {
        return Object.assign({}, opts, {
          external: id =>
            opts.external.includes(id) || id.startsWith('https://unpkg.com')
        });
      }
      if (typeof opts.external === 'function') {
        return Object.assign({}, opts, {
          external: id =>
            opts.external(id) || id.startsWith('https://unpkg.com')
        });
      }
      return opts;
    },

    transform(code) {
      const ast = this.parse(code);
      const magicString = new MagicString(code);

      walk(ast, {
        enter(node, parent) {
          if (node.type === 'Literal' && parent.type === 'ImportDeclaration') {
            const importLiteral = node.value;
            const pkg = parseImport(importLiteral);
            const manifest = dependencies[pkg.name];

            if (manifest) {
              const unpkgUrl = transformToUnpkgUrl(
                manifest.name,
                manifest.version,
                pkg.path
              );

              magicString.overwrite(node.start, node.end, `'${unpkgUrl}'`, {
                storeName: false
              });
            }
            return node;
          }
        }
      });
      return {
        code: magicString.toString(),
        map: magicString.generateMap()
      };
    }
  };
}

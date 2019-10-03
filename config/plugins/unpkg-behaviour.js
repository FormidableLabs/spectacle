const fs = require('fs');
const { walk } = require('estree-walker');
const readPkg = require('read-pkg');
const MagicString = require('magic-string');

const pkgJSON = readPkg.sync();

const transformToUnpkgUrl = (name, version, subPackagePath) =>
  `https://unpkg.com/${name}@${version}${
    subPackagePath ? `/${subPackagePath}` : ''
  }?module`;

export default function UnpkgBehaviour() {
  let dependencies = {};

  return {
    name: 'unpkg-behaviour',
    options(opts) {
      dependencies = Object.keys(pkgJSON.dependencies).reduce((acc, dep) => {
        const manifestLocation = require.resolve(`${dep}/package.json`);
        const rawManifest = fs.readFileSync(manifestLocation);
        const manifest = JSON.parse(rawManifest);

        if (manifest.module && opts.external(manifest.name)) {
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
            const [basePackage, subPackagePath] = importLiteral.split(/\/(.+)/);
            const manifest = dependencies[basePackage];

            if (manifest) {
              const unpkgUrl = transformToUnpkgUrl(
                manifest.name,
                manifest.version,
                subPackagePath
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

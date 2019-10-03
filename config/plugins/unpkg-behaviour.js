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
      const isExternal = id => {
        return opts.external(id);
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

      const depNames = Object.values(dependencies);
      if (Array.isArray(opts.external)) {
        return Object.assign({}, opts, {
          external: Array.from(new Set(opts.external.concat(depNames)))
        });
      }
      // if (typeof opts.external === 'function') {
      //   return Object.assign({}, opts, {
      //     external: id => {
      //       // console.log('external function', id, dependencies);

      //       // console.log(id);
      //       // if (id === 'styled-components') {
      //       //   console.log('hi');
      //       // }
      //       const key = Object.keys(dependencies).find(
      //         _key => dependencies[_key] === id
      //       );
      //       if (key) {
      //         if (opts.external(key)) {
      //           console.log(key);
      //         }

      //         return opts.external(key);
      //       }

      //       return opts.external(id);
      //     }
      //   });
      // }
      if (!opts.external) {
        return Object.assign({}, opts, {
          external: depNames
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

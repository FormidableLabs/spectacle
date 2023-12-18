import { onePageTemplate } from '../templates/one-page';

const spectaclePackage = require(`${__dirname}/../../spectacle-package.json`);
const REACT_VERSION = spectaclePackage.devDependencies.react.replace('^', '');
const ESM_SH_VERSION = 'v121';

export const generateImportMap = () => {
  const importMap = new Map<string, string>();
  const { dependencies, peerDependencies } = spectaclePackage;

  importMap.set('htm', importUrl('htm', '^3'));
  importMap.set('spectacle', 'https://esm.sh/spectacle@10?bundle');

  const sortedDeps = <[string, string][]>Object.entries({
    ...dependencies,
    ...peerDependencies
  }).sort(([a], [b]) => a.localeCompare(b));

  for (const [pkg, version] of sortedDeps) {
    if (importMap.has(pkg)) continue;
    importMap.set(pkg, importUrl(pkg, version));
    handlePackageExceptions(pkg, version, importMap);
  }

  return importMap;
};

export const createOnePage = (name: string, lang: string) => {
  const importMap = generateImportMap();
  return onePageTemplate({ importMap, name, lang });
};

const importUrl = (pkg: string, version: string, extra = '') => {
  if (pkg === 'react') version = REACT_VERSION;
  return `https://esm.sh/${ESM_SH_VERSION}/${pkg}@${version}${extra}?deps=react@${REACT_VERSION}`;
};

const handlePackageExceptions = (
  pkg: string,
  version: string,
  importMap: Map<string, string>
) => {
  if (pkg === 'react')
    importMap.set(
      `${pkg}/jsx-runtime`,
      importUrl(pkg, version, '/jsx-runtime')
    );
  else if (pkg === 'react-syntax-highlighter') {
    importMap.set(
      `${pkg}/dist/cjs/styles/prism/vs-dark.js`,
      importUrl(pkg, version, '/dist/esm/styles/prism/vs-dark.js')
    );
    importMap.set(
      `${pkg}/dist/cjs/styles/prism/index.js`,
      importUrl(pkg, version, '/dist/esm/styles/prism/index.js')
    );
  }
};

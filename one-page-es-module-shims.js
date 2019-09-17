/* ES Module Shims 0.4.2 */
/* eslint-disable */
/**
 * TODO(ONE-PAGE): For debugging only. REMOVE later
 * From: https://unpkg.com/es-module-shims@0.4.2/dist/es-module-shims.js
 */
(function () {
  'use strict';

  let baseUrl;

  function createBlob (source) {
    return URL.createObjectURL(new Blob([source], { type: 'application/javascript' }));
  }

  const hasDocument = typeof document !== 'undefined';

  if (hasDocument) {
    const baseEl = document.querySelector('base[href]');
    if (baseEl)
      baseUrl = baseEl.href;
  }

  if (!baseUrl && typeof location !== 'undefined') {
    baseUrl = location.href.split('#')[0].split('?')[0];
    const lastSepIndex = baseUrl.lastIndexOf('/');
    if (lastSepIndex !== -1)
      baseUrl = baseUrl.slice(0, lastSepIndex + 1);
  }

  let esModuleShimsSrc;
  if (hasDocument) {
    esModuleShimsSrc = document.currentScript && document.currentScript.src;
  }

  const backslashRegEx = /\\/g;
  function resolveIfNotPlainOrUrl (relUrl, parentUrl) {
    // strip off any trailing query params or hashes
    parentUrl = parentUrl && parentUrl.split('#')[0].split('?')[0];
    if (relUrl.indexOf('\\') !== -1)
      relUrl = relUrl.replace(backslashRegEx, '/');
    // protocol-relative
    if (relUrl[0] === '/' && relUrl[1] === '/') {
      return parentUrl.slice(0, parentUrl.indexOf(':') + 1) + relUrl;
    }
    // relative-url
    else if (relUrl[0] === '.' && (relUrl[1] === '/' || relUrl[1] === '.' && (relUrl[2] === '/' || relUrl.length === 2 && (relUrl += '/')) ||
        relUrl.length === 1  && (relUrl += '/')) ||
        relUrl[0] === '/') {
      const parentProtocol = parentUrl.slice(0, parentUrl.indexOf(':') + 1);
      // Disabled, but these cases will give inconsistent results for deep backtracking
      //if (parentUrl[parentProtocol.length] !== '/')
      //  throw new Error('Cannot resolve');
      // read pathname from parent URL
      // pathname taken to be part after leading "/"
      let pathname;
      if (parentUrl[parentProtocol.length + 1] === '/') {
        // resolving to a :// so we need to read out the auth and host
        if (parentProtocol !== 'file:') {
          pathname = parentUrl.slice(parentProtocol.length + 2);
          pathname = pathname.slice(pathname.indexOf('/') + 1);
        }
        else {
          pathname = parentUrl.slice(8);
        }
      }
      else {
        // resolving to :/ so pathname is the /... part
        pathname = parentUrl.slice(parentProtocol.length + (parentUrl[parentProtocol.length] === '/'));
      }

      if (relUrl[0] === '/')
        return parentUrl.slice(0, parentUrl.length - pathname.length - 1) + relUrl;

      // join together and split for removal of .. and . segments
      // looping the string instead of anything fancy for perf reasons
      // '../../../../../z' resolved to 'x/y' is just 'z'
      const segmented = pathname.slice(0, pathname.lastIndexOf('/') + 1) + relUrl;

      const output = [];
      let segmentIndex = -1;
      for (let i = 0; i < segmented.length; i++) {
        // busy reading a segment - only terminate on '/'
        if (segmentIndex !== -1) {
          if (segmented[i] === '/') {
            output.push(segmented.slice(segmentIndex, i + 1));
            segmentIndex = -1;
          }
        }

        // new segment - check if it is relative
        else if (segmented[i] === '.') {
          // ../ segment
          if (segmented[i + 1] === '.' && (segmented[i + 2] === '/' || i + 2 === segmented.length)) {
            output.pop();
            i += 2;
          }
          // ./ segment
          else if (segmented[i + 1] === '/' || i + 1 === segmented.length) {
            i += 1;
          }
          else {
            // the start of a new segment as below
            segmentIndex = i;
          }
        }
        // it is the start of a new segment
        else {
          segmentIndex = i;
        }
      }
      // finish reading out the last segment
      if (segmentIndex !== -1)
        output.push(segmented.slice(segmentIndex));
      return parentUrl.slice(0, parentUrl.length - pathname.length) + output.join('');
    }
  }

  /*
   * Import maps implementation
   *
   * To make lookups fast we pre-resolve the entire import map
   * and then match based on backtracked hash lookups
   *
   */
  const emptyImportMap = { imports: {}, scopes: {} };

  function resolveUrl (relUrl, parentUrl) {
    return resolveIfNotPlainOrUrl(relUrl, parentUrl) || (relUrl.indexOf(':') !== -1 ? relUrl : resolveIfNotPlainOrUrl('./' + relUrl, parentUrl));
  }

  function objectAssign (to, from) {
    for (let p in from)
      to[p] = from[p];
    return to;
  }

  function resolveAndComposePackages (packages, outPackages, baseUrl, parentMap, parentUrl, stdModules) {
    outer: for (let p in packages) {
      let target = packages[p];
      if (typeof target === 'string')
        target = [target];
      else if (!Array.isArray(target))
        continue;

      for (const rhs of target) {
        if (typeof rhs !== 'string')
          continue;
        const mapped = resolveImportMap(parentMap, resolveIfNotPlainOrUrl(rhs, baseUrl) || rhs, parentUrl);
        if (mapped && (!mapped.startsWith('std:') || stdModules.has(mapped))) {
          outPackages[p] = mapped;
          continue outer;
        }
      }
      targetWarning(p, packages[p], 'bare specifier did not resolve');
    }
  }

  function resolveAndComposeImportMap (json, baseUrl, parentMap, stdModules) {
    const outMap = { imports: objectAssign({}, parentMap.imports), scopes: objectAssign({}, parentMap.scopes) };

    if (json.imports)
      resolveAndComposePackages(json.imports, outMap.imports, baseUrl, parentMap, null, stdModules);

    if (json.scopes)
      for (let s in json.scopes) {
        const resolvedScope = resolveUrl(s, baseUrl);
        resolveAndComposePackages(json.scopes[s], outMap.scopes[resolvedScope] || (outMap.scopes[resolvedScope] = {}), baseUrl, parentMap, resolvedScope, stdModules);
      }

    return outMap;
  }

  function getMatch (path, matchObj) {
    //console.log("TODO HERE getMatch", { path, matchObj })
    if (matchObj[path])
      return path;
    let sepIndex = path.length;
    do {
      const segment = path.slice(0, sepIndex + 1);
      if (segment in matchObj)
        return segment;
    } while ((sepIndex = path.lastIndexOf('/', sepIndex - 1)) !== -1)
  }

  function applyPackages (id, packages) {
    const pkgName = getMatch(id, packages);
    if (pkgName) {
      const pkg = packages[pkgName];
      if (pkg === null) return;
      if (id.length > pkgName.length && pkg[pkg.length - 1] !== '/')
        targetWarning(pkgName, pkg, "should have a trailing '/'");
      else
        return pkg + id.slice(pkgName.length);
    }
  }

  function targetWarning (match, target, msg) {
    console.warn("Package target " + msg + ", resolving target '" + target + "' for " + match);
  }

  function resolveImportMap (importMap, resolvedOrPlain, parentUrl) {
    // TODO(ONE-PAGE): Find unpkg react strings
    if (
      resolvedOrPlain.indexOf("/stylis-rule-sheet@") !== -1
    ) {
      console.log("TODO HERE resolveImportMap", { resolvedOrPlain, parentUrl });
    }

    let scopeUrl = parentUrl && getMatch(parentUrl, importMap.scopes);
    while (scopeUrl) {
      const packageResolution = applyPackages(resolvedOrPlain, importMap.scopes[scopeUrl]);
      if (packageResolution)
        return packageResolution;
      scopeUrl = getMatch(scopeUrl.slice(0, scopeUrl.lastIndexOf('/')), importMap.scopes);
    }
    return applyPackages(resolvedOrPlain, importMap.imports) || resolvedOrPlain.indexOf(':') !== -1 && resolvedOrPlain;
  }

  /* es-module-lexer 0.3.13 */
  function parse(Q,B="@"){if(!A)return init.then(()=>parse(Q));const C=(A.__heap_base.value||A.__heap_base)+4*Q.length+-A.memory.buffer.byteLength;if(C>0&&A.memory.grow(Math.ceil(C/65536)),function(A,Q){const B=A.length;let C=0;for(;C<B;)Q[C]=A.charCodeAt(C++);}(Q,new Uint16Array(A.memory.buffer,A.sa(Q.length),Q.length+1)),!A.parse())throw Object.assign(new Error(`Parse error ${B}:${Q.slice(0,A.e()).split("\n").length}:${A.e()-Q.lastIndexOf("\n",A.e()-1)}`),{idx:A.e()});const E=[],g=[];for(;A.ri();)E.push({s:A.is(),e:A.ie(),d:A.id()});for(;A.re();)g.push(Q.slice(A.es(),A.ee()));return [E,g]}let A;const init=WebAssembly.compile((A=>"function"==typeof atob?Uint8Array.from(atob(A),A=>A.charCodeAt(0)):Buffer.from(A,"base64"))("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")).then(WebAssembly.instantiate).then(({exports:Q})=>{A=Q;});

  class WorkerShim {
    constructor(aURL, options = {}) {
      if (options.type !== 'module')
        return new Worker(aURL, options);

      if (!esModuleShimsSrc)
        throw new Error('es-module-shims.js must be loaded with a script tag for WorkerShim support.');

      options.importMap = options.importMap || emptyImportMap;

      const workerScriptUrl = createBlob(
        `importScripts('${esModuleShimsSrc}');importShim.map=${JSON.stringify(options.importMap)};importShim('${new URL(aURL, baseUrl).href}').catch(e=>setTimeout(()=>{throw e}))`
      );

      return new Worker(workerScriptUrl, Object.assign({}, options, { type: undefined }));
    }
  }

  let id = 0;
  const registry = {};

  // support browsers without dynamic import support (eg Firefox 6x)
  let dynamicImport;
  try {
    dynamicImport = (0, eval)('u=>import(u)');
  }
  catch (e) {
    if (hasDocument) {
      self.addEventListener('error', e => importShim.e = e.error);
      dynamicImport = blobUrl => {
        const topLevelBlobUrl = createBlob(
          `import*as m from'${blobUrl}';self.importShim.l=m;self.importShim.e=null`
        );
        const s = document.createElement('script');
        s.type = 'module';
        s.src = topLevelBlobUrl;
        document.head.appendChild(s);
        return new Promise((resolve, reject) => {
          s.addEventListener('load', () => {
            document.head.removeChild(s);
            importShim.e ? reject(importShim.e) : resolve(importShim.l, baseUrl);
          });
        });
      };
    }
  }

  async function loadAll (load, seen) {
    //console.log("TODO HERE loadAll", { load, seen });
    if (load.b || seen[load.u])
      return;
    seen[load.u] = 1;
    await load.L;
    return Promise.all(load.d.map(dep => loadAll(dep, seen)));
  }

  async function topLevelLoad (url, source) {
    await init;
    const load = getOrCreateLoad(url, source);
    const seen = {};
    await loadAll(load, seen);
    lastLoad = undefined;
    resolveDeps(load, seen);
    const module = await dynamicImport(load.b);
    // if the top-level load is a shell, run its update function
    if (load.s)
      (await dynamicImport(load.s)).u$_(module);
    return module;
  }

  async function importShim (id, parentUrl) {
    return topLevelLoad(await resolve(id, parentUrl || baseUrl));
  }

  self.importShim = importShim;

  const meta = {};
  const wasmModules = {};

  const edge = navigator.userAgent.match(/Edge\/\d\d\.\d+$/);

  Object.defineProperties(importShim, {
    map: { value: emptyImportMap, writable: true },
    m: { value: meta },
    w: { value: wasmModules },
    l: { value: undefined, writable: true },
    e: { value: undefined, writable: true }
  });

  let lastLoad;
  function resolveDeps (load, seen) {
    if (load.b || !seen[load.u])
      return;
    seen[load.u] = 0;

    for (const dep of load.d)
      resolveDeps(dep, seen);

    // "execution"
    const source = load.S;
    // edge doesnt execute sibling in order, so we fix this up by ensuring all previous executions are explicit dependencies
    let resolvedSource = edge && lastLoad ? `import '${lastLoad}';` : '';

    const [imports] = load.a;

    if (!imports.length) {
      resolvedSource += source;
    }
    else {
      // once all deps have loaded we can inline the dependency resolution blobs
      // and define this blob
      let lastIndex = 0, depIndex = 0;
      for (const { s: start, e: end, d: dynamicImportIndex } of imports) {
        // dependency source replacements
        if (dynamicImportIndex === -1) {
          const depLoad = load.d[depIndex++];
          let blobUrl = depLoad.b;
          if (!blobUrl) {
            // circular shell creation
            if (!(blobUrl = depLoad.s)) {
              blobUrl = depLoad.s = createBlob(`export function u$_(m){${
                depLoad.a[1].map(
                  name => name === 'default' ? `$_default=m.default` : `${name}=m.${name}`
                ).join(',')
              }}${
                depLoad.a[1].map(name =>
                  name === 'default' ? `let $_default;export{$_default as default}` : `export let ${name}`
                ).join(';')
              }\n//# sourceURL=${depLoad.r}?cycle`);
            }
          }
          // circular shell execution
          else if (depLoad.s) {
            resolvedSource += source.slice(lastIndex, start - 1) + '/*' + source.slice(start - 1, end + 1) + '*/' + source.slice(start - 1, start) + blobUrl + source[end] + `;import*as m$_${depIndex} from'${depLoad.b}';import{u$_ as u$_${depIndex}}from'${depLoad.s}';u$_${depIndex}(m$_${depIndex})`;
            lastIndex = end + 1;
            depLoad.s = undefined;
            continue;
          }
          resolvedSource += source.slice(lastIndex, start - 1) + '/*' + source.slice(start - 1, end + 1) + '*/' + source.slice(start - 1, start) + blobUrl;
          lastIndex = end;
        }
        // import.meta
        else if (dynamicImportIndex === -2) {
          meta[load.r] = { url: load.r };
          resolvedSource += source.slice(lastIndex, start) + 'importShim.m[' + JSON.stringify(load.r) + ']';
          lastIndex = end;
        }
        // dynamic import
        else {
          resolvedSource += source.slice(lastIndex, dynamicImportIndex + 6) + 'Shim(' + source.slice(start, end) + ', ' + JSON.stringify(load.r);
          lastIndex = end;
        }
      }

      resolvedSource += source.slice(lastIndex);
    }

    const lastNonEmptyLine = resolvedSource.slice(resolvedSource.lastIndexOf('\n') + 1);
    load.b = lastLoad = createBlob(resolvedSource + (lastNonEmptyLine.startsWith('//# sourceMappingURL=') ? '\n//# sourceMappingURL=' + resolveUrl(lastNonEmptyLine.slice(21), load.r) : '') + '\n//# sourceURL=' + load.r);
    load.S = undefined;
  }

  function getOrCreateLoad (url, source) {
    let load = registry[url];
    if (load)
      return load;

    load = registry[url] = {
      // url
      u: url,
      // response url
      r: undefined,
      // fetchPromise
      f: undefined,
      // source
      S: undefined,
      // linkPromise
      L: undefined,
      // analysis
      a: undefined,
      // deps
      d: undefined,
      // blobUrl
      b: undefined,
      // shellUrl
      s: undefined,
    };

    load.f = (async () => {
      if (!source) {
        const res = await fetch(url);
        if (!res.ok)
          throw new Error(`${res.status} ${res.statusText} ${res.url}`);

        load.r = res.url;

        const contentType = res.headers.get('content-type');
        if (contentType.match(/^(text|application)\/(x-)?javascript(;|$)/)) {
          source = await res.text();
        }
        else if (contentType.match(/^application\/json(;|$)/)) {
          source = `export default JSON.parse(${JSON.stringify(await res.text())})`;
        }
        else if (contentType.match(/^text\/css(;|$)/)) {
          source = `const s=new CSSStyleSheet();s.replaceSync(${JSON.stringify(await res.text())});export default s`;
        }
        else if (contentType.match(/^application\/wasm(;|$)/)) {
          const module = wasmModules[url] = await WebAssembly.compile(await res.arrayBuffer());
          let deps = WebAssembly.Module.imports ? WebAssembly.Module.imports(module).map(impt => impt.module) : [];

          const aDeps = [];
          load.a = [aDeps, WebAssembly.Module.exports(module).map(expt => expt.name)];

          const depStrs = deps.map(dep => JSON.stringify(dep));

          let curIndex = 0;
          load.S = depStrs.map((depStr, idx) => {
              const index = idx.toString();
              const strStart = curIndex + 17 + index.length;
              const strEnd = strStart + depStr.length - 2;
              aDeps.push({
                s: strStart,
                e: strEnd,
                d: -1
              });
              curIndex += strEnd + 3;
              return `import*as m${index} from${depStr};`
            }).join('') +
            `const module=importShim.w[${JSON.stringify(url)}],exports=new WebAssembly.Instance(module,{` +
            depStrs.map((depStr, idx) => `${depStr}:m${idx},`).join('') +
            `}).exports;` +
            load.a[1].map(name => name === 'default' ? `export default exports.${name}` : `export const ${name}=exports.${name}`).join(';');
          return deps;
        }
        else {
          throw new Error(`Unknown Content-Type "${contentType}"`);
        }
      }
      try {
        load.a = parse(source, load.u);
      }
      catch (e) {
        console.warn(e);
        load.a = [[], []];
      }
      load.S = source;
      return load.a[0].filter(d => d.d === -1).map(d => source.slice(d.s, d.e));
    })();

    load.L = load.f.then(async deps => {
      load.d = await Promise.all(deps.map(async depId => {
        const depLoad = getOrCreateLoad(await resolve(depId, load.r || load.u));
        await depLoad.f;
        return depLoad;
      }));
    });

    return load;
  }

  let importMapPromise;

  if (hasDocument) {
    // preload import maps
    for (const script of document.querySelectorAll('script[type="importmap-shim"][src]'))
      script._f = fetch(script.src);
    // load any module scripts
    for (const script of document.querySelectorAll('script[type="module-shim"]'))
      topLevelLoad(script.src || `${baseUrl}?${id++}`, script.src ? null : script.innerHTML);
  }

  async function resolve (id, parentUrl) {
    if (!importMapPromise) {
      const stdModules = new Set();
      importMapPromise = (async () => {
        // check which standard modules are available
        for (const m of ['std:kv-storage']) {
          try {
            await dynamicImport(m);
            stdModules.add(m);
          }
          catch (e) {}
        }
      })();
      if (hasDocument)
        for (const script of document.querySelectorAll('script[type="importmap-shim"]')) {
          importMapPromise = importMapPromise.then(async () => {
            importShim.map = resolveAndComposeImportMap(script.src ? await (await (script._f || fetch(script.src))).json() : JSON.parse(script.innerHTML), script.src || baseUrl, importShim.map, stdModules);
          });
        }
    }
    await importMapPromise;
    return resolveImportMap(importShim.map, resolveIfNotPlainOrUrl(id, parentUrl) || id, parentUrl) || throwUnresolved(id, parentUrl);
  }

  function throwUnresolved (id, parentUrl) {
    throw Error("Unable to resolve specifier '" + id + (parentUrl ? "' from " + parentUrl : "'"));
  }

  self.WorkerShim = WorkerShim;

}());

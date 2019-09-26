# One Page Support

This directory contains all of our production and development support files for `one-page.html`, the modern "no-build" ESM way to create a Spectacle presentation!

## Support

### `adapters`

Contains either extensions of ESM libraries that need more support or full implementations manually ported over from CJS or another format. They provide the **full functionality** of the adapted source.

### `shims`

Contains shims of dependencies that basically replaces real functionality with no-ops. For example, `prop-types` shim does nothing, while the `object-assign` shim just re-exports the native `Object.assign`.

### Local Development

Local development uses the following files:

- `server.js`: A [`micro`](https://github.com/zeit/micro)-based localdev static file server that performs some useful `require.resolve`-like transforms of file requests just like `unpkg.com` does.
- `debug/`: A directory of things that should only be useful to folks actively crafting the underpinnings of `one-page.html` itelf.
    - `debug/es-module-shims.js`: A temporary copy-and-paste replacement for [`es-module-shims`](https://github.com/guybedford/es-module-shims) so that we can log out and debug things that are going wrong during module loading. Often if a transitive dependency is failing, it's hard to get visibility into what file is being requested from `unpkg.com` and this substitute can show it.

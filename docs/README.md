# Spectacle Documentation Site

Now built with react-static!

## Getting Started

To install and run the docs site locally:

```bash
$ cd docs
$ yarn install
$ yarn start
```

Note that paths in local development are based on a root of "/" but be careful when defining relative and absolute paths
inline or doing url parsing, as the production output root will be "open-source/spectacle."

## Building the site for deployment

### Build and check the staging site

The staging build is served from a root path, e.g. `http://example/com`. This is typically used for CI / per-PR previews.

```bash
$ cd docs
$ yarn stage:build
$ yarn stage:serve
```

This build creates `dist/open-source/spectacle` simulating the directory style output.

Then visit: http://localhost:3000/open-source/spectacle/

### Build and check the production site

The production site is served from a nested path, e.g. `https://formidable.com/open-source/spectacle`.

```bash
$ cd docs
$ yarn prod:build
$ yarn prod:serve
```

This build creates `dist` but the `serve` dev server remaps paths to make it appear at `open-source/spectacle`. This build **is** the appropriate, full production build.

Then visit: http://localhost:3000/open-source/spectacle/

Both of these steps are important for validating that both the `basePath` used by the static HTML output and the `basename` used
by the client-side router are working as expected. This is also where you'll want to validate that there are no hardcoded, inlined, or malformed asset paths that worked locally but will not resolve correctly in production!

## Deployment

### Staging

_Only for project administrators._

Our CI deploys to staging for each PR using surge.sh at the following URL:

`https://formidable-com-spectacle-staging-${PR_NUMBER}.surge.sh/open-source/spectacle`

To test things out locally find the `Surge.sh` entry in 1password in the IC vault and make up some pretend values for a PR number in `TRAVIS_PULL_REQUEST`:

```bash
$ cd docs
$ yarn clean
$ yarn stage:build
$ SURGE_LOGIN=<SNIPPED> \
  SURGE_TOKEN=<SNIPPED> \
  TRAVIS_PULL_REQUEST=12 \
  yarn stage:deploy
```

### Production

_Only for project administrators._

Our CI is configured to deploy the production build in `dist` to `formidable.com/open-source/spectacle`. This section discusses kicking the tires locally:

First, install the AWS CLI:

```bash
$ brew install awscli
```

Then, set up `aws-vault` with the AWS access and secret keys for "CI" in the `AWS IAM (spectacle-ci)` entry in the IC vault:

```bash
$ brew cask install aws-vault
$ aws-vault add fmd-spectacle-ci
# Enter AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY values for AWS `spectacle-ci` user titled "CI"
```

Then build for production and deploy with dry run to check things:

```bash
$ cd docs
$ yarn clean
$ yarn prod:build
$ aws-vault exec fmd-spectacle-ci --no-session -- \
  yarn prod:deploy --dryrun
```

## Tips for developing

- Almost all of your code will be executed in two contexts: first in node for server-side rendering and static html generation, then client-side as a PWA. In addition to writing [node-safe code](https://github.com/nozzle/react-static/blob/master/docs/concepts.md#writing-universal-node-safe-code), this also means that it's necessary to validate that both contexts are working as expected.

- In addition to two execution contexts, there are three stages: development, staging, and production. `yarn start` uses a local dev server with live reload that takes about one second to rebuild. This is a good choice for most local development, but it's important to keep in mind that **the development server does not build the static html.** For that, you will want to use `yarn stage:build && yarn stage:serve`.

- When debugging an issue with the static html output, don't be shy about cracking open the `dist` folder and looking at the output!

- When debugging an issue with the PWA or SSR-PWA coordination, consider using `yarn stage-debug` -- this builds the staging output without minification/uglification and propagates warnings/errors.

- We have seen errors related to minification, uglification, and codesplitting before, please do not treat the debug build or the local dev server as 1:1 with production output!

## Tips for getting the most out of react-static + webpack tooling

We are on react-static v5 due to painful upgrade issues with v7, which means...

- You'll want to make sure that when you refer to the docs you're in the v5 branch.

- When you install the react-static CLI tool globally, you'll want to use the v5 version (`npm install -g react-static@^5.9.12`) which currently has a wider selection of working templates that can be very useful as executable canonical references.

- If you're looking for the client-side router documentation for react-static to see how to implement a certain behavior, the best place to start is in the [react-router docs](https://reacttraining.com/react-router/web/api/), which react-static v5 uses under the hood. There are a few additional react-static specific properties for [Router](https://github.com/nozzle/react-static/blob/v5/docs/components.md#router), [Routes](https://github.com/nozzle/react-static/blob/v5/docs/components.md#routes), and [Link](https://github.com/nozzle/react-static/blob/v5/docs/components.md#link), but if you need something from the routing that doesn't seem to covered in the react-static api, the react-router docs are pretty likely to have you covered.

- You'll ~~want~~ need to use Webpack 3 plugins. Webpack has an [interesting approach](https://github.com/webpack/webpack.js.org/issues/1854) to documenting old versions. The existing documentation is broadly usable but you may want to familiarize yourself with this [introductory v3 to v4 migration guide](https://webpack.js.org/migrate/4/) and the relevant [react-static docs](https://github.com/nozzle/react-static/blob/v5/docs/config.md#webpack).

- Interestingly, some webpack v4 loaders still work with v3, while some webpack v3 loaders _don't_ work with webpack v3. Version-twiddling or using a different loader for reasons that are unclear may be required. When tweaking webpack, it's extra-important to validate both PWA and static html output and clear out cached files.

## Using this project as a template:

This lander is designed to be easily re-used as a template for other projects.

What to change:

- Docs Content
  - markdown content lives in `/docs/content`
  - _Note:_ Any markdown files placed here will be rendered as separate pages, and header tags will be rendered into a hierarchical sidebar. Please make sure header tags do not include any special symbols as they will be used to create anchor tags and hashes.
- Main Page Content
  - `src/screens/home/_content.js` includes section titles, descriptions, and assets urls
  - `src/screens/home/hero.js`
- Constants
  - client constants live in `src/constants.js`
  - static constants live in `static-config-parts/constants.js`
- Assets
  - Logos, sidebar svgs and favicons (TODO: These are all very similar svgs, and could some day live in a separate repo, and take props like color, name etc)

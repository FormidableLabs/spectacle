# Spectacle Documentation Site

Now built with react-static!

## Getting Started

To install and run the docs site locally:

```bash
$ cd docs
$ yarn install
$ yarn start
```

Then visit: http://localhost:3000/open-source/spectacle/

## Building the site for deployment

### Build and check the production site

The staging and production sites are served from a nested path, e.g. `https://formidable.com/open-source/spectacle`.

```bash
$ cd docs
$ yarn build
$ yarn serve
```

Then visit: http://localhost:4000/open-source/spectacle/

Both of these steps are important for validating that both the `basePath` used by the static HTML output and the `basename` used by the client-side router are working as expected. This is also where you'll want to validate that there are no hardcoded, inlined, or malformed asset paths that worked locally but will not resolve correctly in production!

## Deployment

### Staging

_Only for project administrators._

Our CI deploys to staging for each PR using surge.sh at the following URL:

`https://formidable-com-spectacle-staging-${PR_NUMBER}.surge.sh/open-source/spectacle`

To test things out locally find the `Surge.sh` entry in 1password in the IC vault and make up some pretend values for a PR number in `TRAVIS_PULL_REQUEST`:

```bash
$ cd docs
$ yarn clean && \
  yarn build
$ SURGE_LOGIN=<SNIPPED> \
  SURGE_TOKEN=<SNIPPED> \
  TRAVIS_PULL_REQUEST=12 \
  yarn deploy:stage
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
$ yarn clean && \
  yarn build
$ aws-vault exec fmd-spectacle-ci --no-session -- \
  yarn deploy:prod --dryrun
```

## Tips for developing

- Almost all of your code will be executed in two contexts: first in node for server-side rendering and static html generation, then client-side as a PWA. In addition to writing [node-safe code](https://github.com/nozzle/react-static/blob/main/docs/concepts.md#writing-universal-node-safe-code), this also means that it's necessary to validate that both contexts are working as expected.

- In addition to two execution contexts, there are three stages: development, staging, and production. `yarn start` uses a local dev server with live reload that takes about one second to rebuild. This is a good choice for most local development, but it's important to keep in mind that **the development server does not build the static html.** For that, you will want to use `yarn build && yarn serve` used for staging and production deploys.

- When debugging an issue with the static html output, don't be shy about cracking open the `dist` folder and looking at the output!

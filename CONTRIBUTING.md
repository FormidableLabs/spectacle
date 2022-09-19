# Contributing

Thank you for contributing!

<a href="https://github.com/FormidableLabs/spectacle#maintenance-status">
  <img alt="Maintenance Status" src="https://img.shields.io/badge/maintenance-active-green.svg" />
</a>

Spectacle is actively maintained by @[carlos-kelly][] for [@FormidableLabs][formidable-github].

## Development

### Installing dependencies

We use [`pnpm`][pnpm-docs].

Install all dependencies by running:

```sh
$ pnpm install
```

### Examples

We have various deck scenarios in `examples` in this repository that are part of the development process.

We follow the convention of `start:NAME` to run an in-memory dev server for a specific example, but we also have a `pnpm build` script task to make sure we're actually producing non-broken sample presentations as a CI / assurance test.

- `spectacle`
  - [`examples/js`](https://github.com/FormidableLabs/spectacle/tree/main/examples/js)
  - [`examples/md`](https://github.com/FormidableLabs/spectacle/tree/main/examples/md)
  - [`examples/typescript`](https://github.com/FormidableLabs/spectacle/tree/main/examples/typescript)
  - [`examples/one-page`](https://github.com/FormidableLabs/spectacle/tree/main/examples/one-page)
- `spectacle-mdx-loader`
  - [`examples/mdx`](https://github.com/FormidableLabs/spectacle-mdx-loader/tree/main/examples/mdx)

Here's how you can run the various examples:

```sh
# JavaScript demo app (in two different terminals)
$ pnpm start:js
$ open http://localhost:3000/

# TypeScript demo app (in two different terminals)
$ pnpm start:ts
$ open http://localhost:3100/

# Markdown demo app (in two different terminals)
$ pnpm start:md
$ open http://localhost:3200/

# One-page (no build, HTML page only) demo app (in two different terminals)
$ pnpm start:one-page
$ open examples/one-page/index.html

# Start **ALL** the example watchers at the same time!
$ pnpm start:examples
```

You can also live watch the CLI and execute the built script on command with:

```sh
# Watch create-spectacle code and test out (in two different terminals)
$ pnpm start:create-spectacle
$ node packages/create-spectacle/bin/cli.js -h
```

These run appropriate file watchers, so you can just start developing source files and wait for the various dev servers to pick up the new changes.

### Build and checks

Our task system mostly takes care of all task dependencies and things you need. When you first clone this repo or a new branch, run:

```sh
# Run all checks. Re-run this command for your normal workflow.
$ pnpm run check
# ... or add in a `--watch` to watch & re-run checks for only what you change!
$ pnpm run check --watch

# Build libraries and UMD distributions.
# Really only needed to double-check the webpack build still works.
$ pnpm run build
# ... or add in a `--watch` to watch & re-run the parts of the build that changed!
$ pnpm run build --watch
```

This will do all the build, seeding the task cache so subsequent tasks are fast, and checks that everything is correctly working. Your Spectacle workflow could reasonably just be (1) making some changes to files + tests, and then (2) re-running `pnpm run check`!

Here are some other useful tasks (with or without a `--watch` flag):

```sh
# Quality checks
$ pnpm run prettier
$ pnpm run prettier --watch
$ pnpm run lint
$ pnpm run lint --watch
$ pnpm run types:check
$ pnpm run types:check --watch

# Tests
$ pnpm run test
$ pnpm run test --watch
```

We also have some helper tasks to fix issues that are fixable.

```sh
$ pnpm run prettier:fix
$ pnpm run lint:fix
```

If you have issues with tasks failing erroneously, you can clear our tooling caches:

```sh
# Clean out everything
$ yarn clean:cache

# Individually
$ yarn clean:cache:lint      # eslint cache
$ yarn clean:cache:wireit    # wireit task cache
$ yarn clean:cache:modules   # caches in node_modules (prettier, etc.)
```

### Checking `create-spectacle`

We have slower checks for the outputs created by our `create-spectacle` package that are run in CI, but you generally won't need to run unless you are developing that package.

First, you can install Chromium to use in `puppeteer` or use a local Chrome instance. We only presently have Mac instructions and will get to Windows/Linux support when we get demand. You only need to do the following step once.

```sh
# Option 1 -- Do nothing! If you have the Mac Chrome app, you can skip this step!
# Option 2 -- Install chromium
# Option 2.a -- Normal binary
$ pnpm puppeteer:install
# Option 2.b -- If you are on an M1/2 Mac, do this instead:
$ PUPPETEER_EXPERIMENTAL_CHROMIUM_MAC_ARM=true pnpm puppeteer:install
```

After that, you'll want to either build or watch the `create-spectacle` files:

```sh
$ pnpm run --filter ./packages/create-spectacle build
$ pnpm run --filter ./packages/create-spectacle build --watch
```

From there, here are sample collections of commands to create new example applications from scratch with full installation and ending with firing up a dev server:

```sh
# JavaScript
$ pnpm run --filter ./packages/create-spectacle examples:jsx:clean && \
  pnpm run --filter ./packages/create-spectacle examples:jsx:create && \
  pnpm run --filter ./packages/create-spectacle examples:jsx:install && \
  pnpm run --filter ./packages/create-spectacle examples:jsx:build && \
  pnpm run --filter ./packages/create-spectacle examples:jsx:start

# TypeScript
$ pnpm run --filter ./packages/create-spectacle examples:tsx:clean && \
  pnpm run --filter ./packages/create-spectacle examples:tsx:create && \
  pnpm run --filter ./packages/create-spectacle examples:tsx:install && \
  pnpm run --filter ./packages/create-spectacle examples:tsx:build && \
  pnpm run --filter ./packages/create-spectacle examples:tsx:start

# One Page (HTML-only, no build step)
$ pnpm run --filter ./packages/create-spectacle examples:onepage:clean && \
  pnpm run --filter ./packages/create-spectacle examples:onepage:create && \
  pnpm run --filter ./packages/create-spectacle examples:onepage:start
```

The dev server in each of these examples runs on port 3000 by default, and you can run a simple Puppeteer test against that port with the following:

```sh
$ pnpm run --filter ./packages/create-spectacle examples:test
```

### Before submitting a PR

Thanks for taking the time to help us make Spectacle even better! Before you go ahead and submit a PR, make sure that you have done the following:

- Run all checks using `pnpm run check:ci`.
- Run `pnpm run build` and check + commit changes to `examples/one-page/index.html`
- Add a [changeset](#changeset) if your PR requires a version change for any of the packages in this repo.
- Everything else included in our [pull request checklist](.github/PULL_REQUEST_TEMPLATE.md).

### Changesets

We use [changesets](https://github.com/changesets/changesets) to create package versions and publish them.

If your work contributes changes that require a change in version to any of the packages, add a changeset by running:

```sh
$ pnpm changeset
```

which will open an interactive CLI menu. Use this menu to select which packages need versioning, which semantic version changes are needed, and add appropriate messages accordingly.

After this, you'll see a new uncommitted file in `.changesets` that looks something like:

```
$ git status
# ....
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.changeset/flimsy-pandas-marry.md
```

Review this file, make any necessary adjustments, and commit the file to source. During the next package release, the changes (and changeset notes) will be automatically incorporated based on these changeset files.

### Releasing a new version to NPM

<details>
<summary>
<i>Only for project administrators</i>
</summary>

We use [changesets](https://github.com/changesets/changesets) to create package versions and publish them.

Our official release path is to use automation (via GitHub actions) to perform the actual publishing of our packages. The steps are:

1. Developers add changesets, ideally as part of their PR that have version impacts.
2. On merge of a PR with a changeset file, our automation opens a "Version Packages" PR.
3. On merging the "Version Packages" PR, the automation system publishes the packages.

This streamlines releasing too: ensuring PRs have changeset files added as necessary, and approving the "Version Packages" PR generated from GitHub actions to publish a release to all affected packages.

#### Manual Releases

For exceptional circumstances, here is a quick guide to manually publish from a local machine using changesets.

1. Add a changeset with `pnpm changeset`. Generate the changeset file, review it, and commit it.
2. Make a version. Due to our changelog formatting package you will need to create a personal token and pass it to the environment.

   ```sh
   $ GITHUB_TOKEN=<INSERT TOKEN> pnpm run version
   ```

   Review git changes, tweak, and commit.

3. Publish.

   First, build necessary files:

   ```sh
   $ pnpm run build
   ```

   Then publish:

   ```sh
   # Test things out first
   $ pnpm -r publish --dry-run

   # The real publish
   $ pnpm changeset publish --otp=<insert otp code>
   ```

   Note that publishing multiple pacakges via `changeset` to npm with an OTP code can often fail with `429 Too Many Requests` rate limiting error. Take a 5+ minute coffee break, then come back and try again.

   Then issue the following to also push git tags:

   ```sh
   $ git push && git push --tags
   ```

</details>

## Contributor Covenant Code of Conduct

### Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, gender identity and expression, level of experience,
nationality, personal appearance, race, religion, or sexual identity and
orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment
include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

- The use of sexualized language or imagery and unwelcome sexual attention or
  advances
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or electronic
  address, without explicit permission
- Other conduct which could reasonably be considered inappropriate in a
  professional setting

### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behavior and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned to this Code of Conduct, or to ban temporarily or
permanently any contributor for other behaviors that they deem inappropriate,
threatening, offensive, or harmful.

### Scope

This Code of Conduct applies both within project spaces and in public spaces
when an individual is representing the project or its community. Examples of
representing a project or community include using an official project e-mail
address, posting via an official social media account, or acting as an appointed
representative at an online or offline event. Representation of a project may be
further defined and clarified by project maintainers.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported by contacting the project team at coc@formidable.com. All
complaints will be reviewed and investigated and will result in a response that
is deemed necessary and appropriate to the circumstances. The project team is
obligated to maintain confidentiality with regard to the reporter of an incident.
Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good
faith may face temporary or permanent repercussions as determined by other
members of the project's leadership.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][cc-homepage], version 2.0,
available at [https://www.contributor-covenant.org/version/2/0][cc-latest-version]

<!-- Links -->

[carlos-kelly]: https://www.github.com/carlos-kelly
[cc-homepage]: http://contributor-covenant.org
[cc-latest-version]: https://www.contributor-covenant.org/version/2/0/code_of_conduct
[formidable-github]: https://www.github.com/FormidableLabs
[kale-stew]: https://www.github.com/kale-stew
[mdx]: https://mdxjs.com/
[pnpm-docs]: https://pnpm.io/

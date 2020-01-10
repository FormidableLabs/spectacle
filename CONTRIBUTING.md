# Contributing

Thank you for contributing!

Spectacle is actively maintained by @carlos-kelly and @kale-stew from within @FormidableLabs.

## Development

### Installing dependencies

We use [`yarn`](https://yarnpkg.com/en/docs/getting-started).

Install all dependencies by running:

```sh
$ yarn
```

### Examples

We have various deck scenarios in `examples` that are part of the development process.

We normally just do `start:NAME` to run an in-memory dev server. But we also add a `yarn build-examples` script task to make sure we actually produce non-broken examples as a CI / assurance test.

#### `examples/js`

A basic deck with JSX and JavaScript:

```sh
# In one terminal open dev server
$ yarn start:js

# In another open a browser to 3000
$ open http://localhost:3000/
```

#### `examples/one-page`

A self-contained single web page that uses Spectacle, React, and `htm` for a "no build" presentation!

```sh
# Build the library
$ yarn build

# Open the page in a web browser
$ open examples/one-page.html
```

### Testing

TODO

### Linting and Formatting

To check (and fix) code:

```sh
$ yarn lint
$ yarn lint-fix
```

To check (and fix) formatting of MD, JSON, _and_ code:

```sh
$ yarn prettier-check
$ yarn prettier-fix
```

Note that there is duplication for JS code in `prettier` doing the same style changes, but both should be harmonious and run together.

### Before submitting a PR

Thanks for taking the time to help us make Spectacle even better! Before you go ahead and submit a PR, make sure that you have done the following:

- Run all checks using `yarn run check`.
- Check that both the core library and _all_ examples build: `yarn build && yarn build-examples`.
- Update the [type definitions](./index.d.ts) for anything that modifies the Spectacle API, like breaking changes or new features.
- Everything else included in our [pull request checklist](.github/PULL_REQUEST_TEMPLATE.md).

### Releasing a new version to NPM

_Only for project administrators_.

1. Update `CHANGELOG.md`, following format for previous versions
2. Commit as "Changes for version VERSION"
3. Run `npm version patch` (or `minor|major|VERSION`) to run tests and lint,
   build published directories, then update `package.json` + add a git tag.
4. Run `npm publish` and publish to NPM if all is well.
5. Run `git push && git push --tags`

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

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4,
available at [http://contributor-covenant.org/version/1/4][version]

[homepage]: http://contributor-covenant.org
[version]: http://contributor-covenant.org/version/1/4/

# Contributing

Thanks for contributing!

## Development

### Installing dependencies

We use [`yarn`](https://yarnpkg.com/en/docs/getting-started).

Install all dependencies by running:

```sh
$ yarn
```

### Examples

#### Overview

Our examples are spread out across multiple projects depending on where the core technology lies. We publish most of these to `npm` for use in `spectacle-cli` project to either use with the CLI (`spectacle`) or generate a fresh project boilerplte (`spectacle-boilerplate`).

- `spectacle`
    - [`examples/js`](https://github.com/FormidableLabs/spectacle/tree/main/examples/js)
    - [`examples/md`](https://github.com/FormidableLabs/spectacle/tree/main/examples/md)
    - [`examples/one-page`](https://github.com/FormidableLabs/spectacle/tree/main/examples/one-page.html)
- `spectacle-mdx-loader`
    - [`examples/mdx`](https://github.com/FormidableLabs/spectacle-mdx-loader/tree/main/examples/mdx)
- `spectacle-cli`
    - [`examples/cli-mdx-babel`](https://github.com/FormidableLabs/spectacle-mdx-loader/tree/main/examples/cli-mdx-babel): _Not published_

#### `examples/mdx`

A vanilla webpack build using MDX slides found in `examples/mdx/slides.mdx`.

```sh
# In one terminal open webpack dev server
$ yarn start:mdx

# In another open a browser to 4000
$ open http://localhost:4000/
```

### Examples integration with `spectacle-cli`

`spectacle-cli` uses our `mdx` example in the CLI and boilerplate tools. To check that changes to these files don't break `spectacle-cli` upstream, check with something like the following:

```sh
# In `spectacle-mdx-loader` repo
$ yarn link

# In `spectacle-cli` repo
$ yarn link spectacle-mdx-loader

# Check all MDX examples per https://github.com/FormidableLabs/spectacle-cli/blob/main/CONTRIBUTING.md#examples
$ yarn start:examples

# (In another shell) Check mdx:5000, mdx+babel:5001
$ open http://localhost:5000/ http://localhost:5001/

# Check all MDX boilerplates per https://github.com/FormidableLabs/spectacle-cli/blob/main/CONTRIBUTING.md#boilerplate
$ yarn clean:boilerplate
$ yarn boilerplate:generate
$ yarn boilerplate:install
$ yarn start:boilerplate

# (In another shell) Check mdx:6300
#
# **Note**: These `yarn install` internally so will use latest published
# `spectacle`, so results may be not entirely accurage. You may need to manually
# update the installed contents in generated project `node_modules`.
$ open http://localhost:6300/
```

### Testing

@TODO(1) https://github.com/FormidableLabs/spectacle-mdx-loader/issues/1

### Linting and Formatting

To check (and fix) code:

```sh
$ yarn lint
$ yarn lint --fix
```

### Before submitting a PR

Thanks for taking the time to help us make Spectacle even better! Before you go ahead and submit a PR, make sure that you have done the following:

- Consider if your changes should be incorporated in one or more `examples/*` scenarios. Like a new feature, option, etc. Let's try out everything we add!
- Add an `## UNRELEASED` `CHANGELOG.md` entry for later publishing ease.
- Check that all of the examples build: `yarn build:examples`.
- Run all checks using `yarn run check`

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
reported by contacting the project team at emma.brillhart@formidable.com. All
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

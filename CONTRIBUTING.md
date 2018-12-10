Thanks for contributing!

## Development

### Installing dependencies

```sh
yarn install
```

You will find all building blocks that make up Spectacle in the [`src`](src) folder.

### Testing

You will find tests for files colocated with `*.test.js` suffixes. Whenever making any changes, ensure that all existing tests pass by running `yarn run test`.

If you are adding a new feature or some extra functionality, you should also make sure to accompany those changes with appropriate tests.

### Linting and Formatting

Before committing any changes, be sure to do `yarn run lint`; this will lint all relevant files using [ESLint](http://eslint.org/) and report on any changes that you need to make.

You will also want to ensure your code meets the prettier formatting guidelines by running `yarn run prettier -l <filename>` on a specific file. If there are differences the script errors out. You can also specify a glob `yarn run prettier -l "src/**/*.js"` which will return a list of files that do not conform.

Alternatively, install the Prettier [editor plugin](https://prettier.io/docs/en/editors.html) in your favorite editor. This is the preferred method.

There is also a pre-commit hook in place to lint all staged files. If any of the staged files do not conform to the eslint rules or the [prettier](https://prettier.io/) formatting guidelines, your commit will fail until you resolve all outstanding issues.

To resolve/fix prettier formatting problems from the CLI:

```sh
yarn prettier-fix && yarn lint-fix
```

This will modify your file in place. You will need to `git add` the file again and re-commit.

### Before submitting a PR...

Thanks for taking the time to help us make Spectacle even better! Before you go ahead and submit a PR, make sure that you have done the following:

- Run the tests using `yarn run test`.
- Run lint and flow using `yarn run lint`
- Everything else included in our [pull request checklist](https://github.com/FormidableLabs/spectacle/blob/master/.github/PULL_REQUEST_TEMPLATE.md#checklist-feel-free-to-delete-this-section-upon-completion)

## Releasing a new version to NPM (only for project administrators)

1.  Run `npm version patch` (or `minor`, `major` as appropriate) to run tests and lint, build the `lib` ands `dist` directories, , then update `package.json` and add a git tag.
2.  Run `npm publish` and publish to npm if all is well.
3.  Run `git push && git push --tags`

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

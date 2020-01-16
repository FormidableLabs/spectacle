---
title: Basic Concepts
order: 1
---

<a name="basic-concepts"></a>

# Basic Concepts

<a name="installation"></a>

## Installation

Installing Spectacle is as quick as you'd expect. Install it using your package manager of choice.

```sh
yarn add spectacle

#or
npm install --save spectacle
```

<a name="development"></a>

## Writing your Presentation

After installing Spectacle, all of your presentation and style logic will live in a main file, while your content exists either inline (with JSX) or in a separate markdown file (using MDX).

For complete examples of each presentation type, please see the [`examples/`](../../examples/README.md) dir.

<a name="mdx"></a>

### MDX

This approach involves statically generating your slides from a `.mdx` or .`md` file. This is done using the [`spectacle-cli`](https://github.com/FormidableLabs/spectacle-cli). Complete documentation can be found in the repo, but the high-level overview of slide generation is:

Install `spectacle-cli` globally or locally, and then run `spectacle-boilerplate`. _Or,_ you can just use `npx -p spectacle-cli spectacle-boilerplate` for fully-contained one-line shell commands!

Some examples of CLI usage to generate a new project:

```sh
# Generate a JavaScript deck project
$ spectacle-boilerplate

# ... or an MDX deck project with a custom name + description
$ spectacle-boilerplate \
  --mode mdx \
  --name "very-cool-deck" \
  --description "My generated Spectacle MDX deck"

# ... or a Markdown deck project to a different directory than CWD.
$ spectacle-boilerplate \
  --mode md \
  --dir "./extremely-awesome-project"
```

To see a more complete examples of a presentation generated with MDX or Markdown, please check out our three samples meant to be used with the CLI:

- [`.md` Example](../../examples/md)
- [`.mdx` Example](../../examples/mdx)
- [`.mdx` + Babel Example](../../examples/mdx-babel)

To generate a presentation sourcing one of the examples linked above,

1. `cd` into the example dir you want to test: `cd examples/<example-name>`
2. Run `spectacle -s` to serve up a presentation that sources the CWD's `slides.[md|mdx]`.

<a name="jsx"></a>

### JSX

This approach is where you use the library's tags to compose your presentation. While you can mix in your own JSX syntax here, building your presentation with the supplied tags will allow for out-of-box themeing and layouts to work properly.

The bare minimum you'll want to use to build your presentation are the `Deck` element and a `Slide` element. Each `Slide` represents a slide within your presentation `Deck` (the entire slideshow).

To see a complete example of a presentation written in JSX, please check out our [sample JSX presentation](../../examples/js/index.js).

<a name="presenting"></a>

## Presenting

Spectacle comes with a built-in presenter mode. It shows you a slide lookahead, your current slide, current time (or time elapsed), and any notes you've appended to your slide:

![Screenshot of presenter mode in use](TODO)

To present:

1. Run `yarn start`, which will open up a presentation at [localhost:3000/#](http://localhost:3000/#) by default.
2. Open a second browser window on a different screen.
3. Append [`?presenter`](http://localhost:3000/#/0?presenter) or [`?presenter&timer`](http://localhost:3000/#/0?presenter&timer) immediately after the `/#`
4. Give an amazingly in-sync and stylish presentation.

**Note:** Any windows/tabs in the same browser running Spectacle will sync to one another, even if you aren't in presentation mode.

![Two screens presenting the same Spectacle presentation](TODO)

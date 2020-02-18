---
title: Basic Concepts
order: 1
---

<a name="basic-concepts"></a>

# Basic Concepts

<a name="installation"></a>

## Installation

Installing Spectacle is as quick as you'd expect. Install it using your package manager of choice.

```bash
$ yarn add spectacle
# or
$ npm install --save spectacle
```

<a name="development"></a>

## Getting Started with Development

The `src` directory contains all the source for the Spectacle library. All components designed to be part of the Spectacle API must be exported in `src/index.js`.

#### JavaScript-based Decks

To start the development server at port `3000` against a JavaScript-based deck (found in `examples/js`) use `yarn start:js` or `npm run start:js`.

#### Markdown-based Decks

To start the development server at port `3100` against a Markdown-based deck (found in `examples/md`) use `yarn start:md` or `npm run start:md`.

## Writing your Presentation

After installing Spectacle, all of your presentation and style logic will live in a main file, while your content exists either inline (with JSX) or in a separate markdown file (using MDX).

<a name="mdx-or-markdown"></a>

### MDX/Markdown

This approach involves statically generating your slides from a `.mdx` or .`md` file, which is accomplished with [`spectacle-cli`](https://www.github.com/FormidableLabs/spectacle-cli). With this package, you can either generate a new presentation (with the `spectacle-boilerplate` tool) or you can serve up an existing MDX/Markdown file as a presentation (with `spectacle -s`). It can be installed globally, locally, or used via `npx`.

```bash
# globally install `spectacle` and `spectacle-boilerplate` tools
$ npm install --global spectacle-cli
$ yarn global add spectacle-cli

# serving a presentation using npx
$ npx spectacle-cli

# generating a new presentation using npx
$ npx -p spectacle-cli spectacle-boilerplate
```

To serve a local Markdown or MDX file up as a presentation with the CLI tool:

```bash
# navigate to the directory containing your slides
$ cd my-cool-presentation

# run the CLI (given there is a slides.md or slides.mdx in the CWD)
$ spectacle -s
```

To generate a new MDX or MD presentation using the boilerplate tool:

```bash
$ spectacle-boilerplate -m mdx
$ spectacle-boilerplate -m md
```

To see a more complete examples of a presentation generated with MDX or Markdown, please check out our three samples available for use with the CLI as well as manual builds:

- [`.md` Example](https://github.com/FormidableLabs/spectacle/tree/task/rewrite/examples/md) (`spectacle`)
- [`.mdx` Example](https://github.com/FormidableLabs/spectacle-mdx-loader/tree/master/examples/mdx) (`spectacle-mdx-loader`)
- [`.mdx` + Babel Example](https://github.com/FormidableLabs/spectacle-cli/tree/master/examples/cli-mdx-babel) (`spectacle-cli`)

For a more thorough understanding of the features and flags provided by the CLI, please see its [complete documentation](./extensions#spectacle-cli).

**Note:** If you want to manually create the build infrastructure for MDX support in a Spectacle deck, you can add the [`spectacle-mdx-loader`](https://github.com/FormidableLabs/spectacle-mdx-loader) plugin to your webpack configuration. Straight Markdown just requires the webpack `raw-loader`.

<a name="jsx"></a>

### JSX

This approach is where you use the library's tags to compose your presentation. While you can mix in your own JSX syntax here, building your presentation with the supplied tags will allow for out-of-box themeing and layouts to work properly.

The bare minimum you'll want to use to build your presentation are the `Deck` element and a `Slide` element. Each `Slide` represents a slide within your presentation `Deck` (the entire slideshow).

To see a complete example of a presentation written in JSX, please check out our [sample JSX presentation](https://github.com/FormidableLabs/spectacle/blob/task/rewrite/examples/js/index.js).

You can also bootstrap a fresh JSX project with `spectacle-boilerplate`:

```bash
$ spectacle-boilerplate
```

<a name="one-html-page"></a>

### One HTML Page

To create a Spectacle presentation that lives in a single HTML page, you will only need to add a few scripts to your setup:

```html
<script src="https://unpkg.com/react@16.12.0/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@16.12.0/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/react-is@16.12.0/umd/react-is.production.min.js"></script>
<script src="https://unpkg.com/prop-types@15.7.2/prop-types.min.js"></script>
<script src="https://unpkg.com/spectacle/dist/spectacle.js"></script>
```

... and then wrap your HTML in a declarative `module` script, like so:

```html
<script type="module">
  // import Spectacle elements just like you might in JSX
  const { Deck, Slide, FlexBox, Heading } = Spectacle;

  // bind to the DOM
  import htm from 'https://unpkg.com/htm@^3?module';
  const html = htm.bind(React.createElement);

  // add some content
  const deck = html`
    <${Deck}>
      <${Slide}>
        <${FlexBox} height="100%" flexDirection="column">
          <${Heading} fontSize="150px">SPECTACLE</${Heading}>
          <${Heading} fontSize="h2">A ReactJS Presentation Library</${Heading}>
        </${FlexBox}>
      </${Slide}>
    </${Deck}>
  `;

  ReactDOM.render(
    html`
      <${Presentation} />
    `,
    document.getElementById('root')
  );
</script>
```

To see a complete example of a presentation written as a single HTML page, please check out our [sample one page presentation](https://github.com/FormidableLabs/spectacle/blob/task/rewrite/examples/one-page.html).

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

![Gif of two screens presenting the same Spectacle presentation](TODO)

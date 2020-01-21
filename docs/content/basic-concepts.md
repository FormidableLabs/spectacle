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

## Writing your Presentation

After installing Spectacle, all of your presentation and style logic will live in a main file, while your content exists either inline (with JSX) or in a separate markdown file (using MDX).

For complete examples of each presentation type, please see the [`examples/`](../../examples/README.md) dir.

<a name="mdx"></a>

### MDX

This approach involves statically generating your slides from a `.mdx` or .`md` file, which is accomplished using the [`spectacle-cli`](ttps://www.github.com/FormidableLabs/spectacle-cli). With the CLI, you can either generate a new presentation (`spectacle-cli spectacle-boilerplate`) or you can serve up an existing Markdown/MDX file as a presentation (`spectacle -s`). It can be installed globally, locally, or used via `npx`.

```bash
# global install using yarn
$ yarn global add spectacle-cli

# serving a presentation using npx
$ npx spectacle-cli

# generating a new presentation using npx
$ npx -p spectacle-cli spectacle-boilerplate
```

To serve a local Markdown or MDX file up as a presentation:

```bash
# navigate to the directory containing your slides
$ cd my-cool-presentation

# run the CLI (given there is a slides.md or slides.mdx in the CWD)
$ spectacle -s
```

To generate a new presentation using the CLI's boilerplate feature:

```bash
$ spectacle spectacle-boilerplate
```

To see a more complete examples of a presentation generated with MDX or Markdown, please check out our three samples meant to be used with the CLI:

- [`.md` Example](../../examples/md)
- [`.mdx` Example](../../examples/mdx)
- [`.mdx` + Babel Example](../../examples/mdx-babel)

For a more thorough understanding of the features and flags provided by the CLI, please see its [complete documentation](./extensions#spectacle-cli).

<a name="jsx"></a>

### JSX

This approach is where you use the library's tags to compose your presentation. While you can mix in your own JSX syntax here, building your presentation with the supplied tags will allow for out-of-box themeing and layouts to work properly.

The bare minimum you'll want to use to build your presentation are the `Deck` element and a `Slide` element. Each `Slide` represents a slide within your presentation `Deck` (the entire slideshow).

To see a complete example of a presentation written in JSX, please check out our [sample JSX presentation](../../examples/js/index.js).

<a name="one-html-page"></a>

### One HTML Page

To create a Spectacle presentation that lives in a single HTML page, you will only need to add a few scripts to your setup:

```html
<script src="https://unpkg.com/react@16.10.1/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@16.10.1/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/react-is@16.10.1/umd/react-is.production.min.js"></script>
<script src="https://unpkg.com/prop-types@15.7.2/prop-types.min.js"></script>
<script src="https://unpkg.com/spectacle/dist/spectacle.js"></script>
```

... and then wrap your HTML in a declarative `module` script, like so:

```html
<script type="module">
  // import Spectacle elements just like you might in JSX
  const { Deck, Slide } = Spectacle;

  // bind to the DOM
  import htm from 'https://unpkg.com/htm@2.2.1?module';
  const html = htm.bind(React.createElement);

  // add some content
  const deck = html`
    <${Deck} theme=${customTheme}>
        <${Slide}>
            <${FlexBox} height="100%" flexDirection="column">
              <${Heading} fontSize="150px">SPECTACLE</Heading>
              <${Heading} fontSize="h2">A ReactJS Presentation Library</Heading>
            <//>
          <//>
        <//>
  `;
</script>
```

To see a complete example of a presentation written as a single HTML page, please check out our [sample one page presentation](../../examples/one-page.html).

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

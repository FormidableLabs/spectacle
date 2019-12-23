# Spectacle

[![Travis Status][trav_img]][trav_site]
[![Maintenance Status][maintenance-image]](#maintenance-status)

ReactJS based Presentation Library
`
[Spectacle Boilerplate MDX](https://github.com/FormidableLabs/spectacle-boilerplate-mdx/)
[Spectacle Boilerplate](https://github.com/FormidableLabs/spectacle-boilerplate/)

Looking for a quick preview of what you can do with Spectacle? Check out our live Demo Deck [here](https://raw.githack.com/FormidableLabs/spectacle/master/one-page.html#/).

Have a question about Spectacle? Submit an issue in this repository using the "Question" template.

## Contents

- [Getting Started](#getting-started)
  - [Classic Spectacle](#classic-spectacle)
  - [Spectacle MDX](#spectacle-mdx)
  - [One Page](#one-page)
- [Basic Concepts](./docs/basic-concepts)
  - [Main file](./docs/basic-concepts#main-file)
  - [Themes](./docs/basic-concepts#themes)
    - [createTheme(colors, fonts)](./docs/basic-concepts#createthemecolors-fonts)
  - [Development](./docs/basic-concepts#development)
  - [Build & Deployment](./docs/basic-concepts#build--deployment)
  - [Presenting](./docs/basic-concepts#presenting)
  - [Controls](./docs/basic-concepts#controls)
  - [Fullscreen](./docs/basic-concepts#fullscreen)
  - [PDF Export](./docs/basic-concepts#pdf-export)
- [Tag API](./docs/tag-api)
  - [Main Tags](./docs/tag-api#main-tags)
    - [Deck](./docs/tag-api#deck)
    - [Slide (Base)](./docs/tag-api#slide-base)
    - [Notes](./docs/tag-api#notes)
    - [MarkdownSlides](./docs/tag-api#markdown-slides)
  - [Layout Tags](./docs/tag-api#layout-tags)
    - [Layout](./docs/tag-api#layout)
    - [Fit](./docs/tag-api#fit)
    - [Fill](./docs/tag-api#fill)
  - [Markdown Tag](./docs/tag-api#markdown-tag)
    - [Markdown](./docs/tag-api#markdown)
  - [Magic Tag](./docs/tag-api#magic-tag)
    - [Magic](./docs/tag-api#magic)
  - [Element Tags](./docs/tag-api#element-tags)
    - [Appear](./docs/tag-api#appear)
    - [Anim](./docs/tag-api#anim)
    - [BlockQuote, Quote and Cite (Base)](./docs/tag-api#blockquote-quote-and-cite-base)
    - [CodePane (Base)](./docs/tag-api#codepane-base)
    - [Code (Base)](./docs/tag-api#code-base)
    - [ComponentPlayground](./docs/tag-api#component-playground)
    - [GoToAction (Base)](./docs/tag-api#go-to-action)
    - [Heading (Base)](./docs/tag-api#heading-base)
    - [Image (Base)](./docs/tag-api#image-base)
    - [Link (Base)](./docs/tag-api#link-base)
    - [List & ListItem (Base)](./docs/tag-api#list--listitem-base)
    - [S (Base)](./docs/tag-api#s-base)
    - [Table, TableRow, TableBody, TableHeader, TableHeaderItem and TableItem (Base)](./docs/tag-api#table-tablerow-tableheaderitem-and-tableitem-base)
    - [Text (Base)](./docs/tag-api#text-base)
    - [Typeface](./docs/tag-api#typeface)
  - [Base Props](./docs/tag-api#base-props)
- [Third Party Extensions](./docs/extensions.md)
- [FAQ](#faq)
- [Maintenance Status](#maintenance-status)

<a name="getting-started"></a>

## Getting Started

First, decide whether you want to use [classic Spectacle](#classic-spectacle), [Spectacle MDX](#spectacle-mdx), which has all the same functionality but allows you to write your Spectacle presentation in markdown, or using only [one HTML page](#one-page).

### Classic Spectacle

There are four ways to get started building your presentation.

1.  **Option #1:** Run the following command in your terminal:

    `npx create-react-app my-presentation --scripts-version spectacle-scripts`

2.  **Option #2:** Using the [Spectacle Boilerplate](https://github.com/FormidableLabs/spectacle-boilerplate).

3.  **Option #3:** Following along the [Spectacle Tutorial](./docs/tutorial.md), which also involves downloading the [Spectacle Boilerplate](https://github.com/FormidableLabs/spectacle-boilerplate).

All three of the above ways will give you everything you'll need to get started, including a sample presentation in the `presentation` folder. You can change the props and tags as needed for your presentation or delete everything in `presentation/index.js` to start from scratch. From here you can go to [Development](#development) to get started.

3.  **Option #4:** Run `npm install spectacle` in your terminal and writing your own build configurations. We also provide full UMD builds (with a `Spectacle` global variable) of the library at `dist/spectacle.js` and `dist/spectacle.min.js` for more general use cases. You could, for example, include the library via a script tag with: `https://unpkg.com/spectacle@VERSION/dist/spectacle.min.js`.

### Spectacle MDX

Download the [Spectacle MDX Boilerplate](https://github.com/FormidableLabs/spectacle-boilerplate-mdx).

This repository will give you everything you'll need to get started, including a sample presentation in the `presentation` folder. You can change the props and tags as needed for your presentation or delete everything in the `index.mdx` file to start from scratch. From here you can go to [Development](#development) to get started.

_NOTE: We have webpack externals for `react`, `react-dom`, and `prop-types`, so you will need to provide them in your upstream build or something like linking in via `script` tags in your HTML page for all three libraries. This comports with our project dependencies which place these three libraries in `peerDependencies`._

<a name="one-page"></a>

### One Page

To aid with speedy development we've provided a simple boilerplate HTML page with a bespoke script tag that contains your entire presentation. The rest of the setup will take care of transpiling your React/ESnext code, providing Spectacle, React, and ReactDOM libraries, and being raring to go with a minimum of effort.

We can start with this project's sample at [`one-page.html`](./one-page.html). It's the same presentation as the fully-built-from-source version, with a few notable exceptions:

1.  There are no `import`s or `require`s. Everything must come from the global namespace. This includes `Spectacle`, `React`, `ReactDOM` and all the Spectacle exports from [`./src/index.js`](./src/index.js) -- `Deck`, `Slide`, `themes`, etc.

2.  The presentation must include exactly **one** script tag with the type `text/spectacle` that is a function. Presently, that function is directly inserted inline into a wrapper code boilerplate as a React Component `render` function. The wrapper is transpiled. There should not be any extraneous content around it like outer variables or comments.

    **Good** examples:

    ```html
    <script type="text/spectacle">
      () => (
        <Deck>{/* SLIDES */}</Deck>
      )
    </script>
    ```

    ```html
    <script type="text/spectacle">
      () => {
        // Code-y code stuff in JS...

        return (
          <Deck>{/* SLIDES */}</Deck>
        );
      }
    </script>
    ```

    **Bad** examples of what not to do:

    ```html
    <script type="text/spectacle">
      // Outer comment (BAD)
      const outerVariable = "BAD";

      () => (
        <Deck>{/* SLIDES */}</Deck>
      )
    </script>
    ```

3.  If you want to create your own theme settings, you can use the following code snippet to change the [themes](#createthemecolors-fonts) default settings.

    ```html
    <script type="text/spectacle">
      () => {
        const { themes: { defaultTheme } } = Spectacle;
        const theme = defaultTheme({
          // Change default settings
          primary: "blue",
          secondary: "red"
        },
        {
          primary: "Helvetica",
        });

        return (
          <Deck transition={['zoom']} theme={theme}>
            <Slide>some stuff</Slide>
            <Slide>other stuff</Slide>
            <Slide>some more stuff</Slide>
          </Deck>
        );
      }
    </script>
    ```

... with those guidelines in mind, here's the boilerplate that you can copy-and-paste into an HTML file and start a Spectacle presentation that works from the get go!

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width initial-scale=1 user-scalable=no"
    />
    <title>Spectacle</title>
    <link
      href="https://fonts.googleapis.com/css?family=Lobster+Two:400,700"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://unpkg.com/normalize.css@7/normalize.css"
      rel="stylesheet"
      type="text/css"
    />
  </head>
  <body>
    <div id="root"></div>
    <script src="https://unpkg.com/prop-types@15/prop-types.js"></script>
    <script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.js"></script>
    <script src="https://unpkg.com/spectacle@^5/dist/spectacle.js"></script>
    <script src="https://unpkg.com/spectacle@^5/lib/one-page.js"></script>
    <script type="text/spectacle">
      () => {
        // Your JS Code goes here

        return (
          <Deck>
          {/* Throw in some slides here! */}
          </Deck>
        );
      }
    </script>
  </body>
</html>
```

<a name="faq"></a>

# FAQ

**_How can I easily style the base components for my presentation?_**

Historically, custom styling in Spectacle has meant screwing with a theme file, or using `!important` overrides. We fixed that. Spectacle is now driven by [emotion](https://github.com/emotion-js/emotion), so you can bring your own styling library, whether it's emotion itself, or something like styled-components or glamorous. For example, if you want to create a custom Heading style:

```javascript
import styled from 'react-emotion';
import { Heading } from 'spectacle';

const CustomHeading = styled(Heading)`
  font-size: 1.2em;
  color: papayawhip;
`;
```

<a name="tag-api"></a>

**_Can I write my presentation in TypeScript?_**

Yes, you can! Type definitions are shipped with the library, so you can import Spectacle components into any `.tsx` presentation without additional installation steps.

Updated type definitions for the Spectacle API can be found [at the root of this repository](./index.d.ts).

## Maintenance Status

**Active:** Formidable is actively working on this project, and we expect to continue for work for the foreseeable future. Bug reports, feature requests and pull requests are welcome.

[trav_img]: https://api.travis-ci.org/FormidableLabs/spectacle.svg
[trav_site]: https://travis-ci.org/FormidableLabs/spectacle
[maintenance-image]: https://img.shields.io/badge/maintenance-active-green.svg

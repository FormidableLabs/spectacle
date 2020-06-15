---
title: Getting Started
order: 6
---

# Getting Started with Spectacle: A Tutorial

In this guide, we'll show you a couple of different ways to get started with Spectacle and walk you through the creation and customization of a presentation deck.

## Option One: Using a standard React-based web app

1. Spin up a new React project using [`create-react-app`](https://github.com/facebook/create-react-app):

   ```bash
   npx create-react-app spectacle-tutorial
   ```

2. Install Spectacle by running `yarn add spectacle` or `npm i spectacle`.

3. In `App.js`, replace the boilerplate content with this Spectacle starter:

   ```jsx
   import React from 'react';
   import { Deck, Slide, Heading } from 'spectacle';

   function App() {
     return (
       <Deck>
         <Slide>
           <Heading>Welcome to Spectacle</Heading>
         </Slide>
       </Deck>
     );
   }

   export default App;
   ```

4. And you're good to go! Using `create-react-app`'s built-in `start` script, you can start a hot-reloading server to begin building your Spectacle presentation by running `yarn run start` or `npm run start`.

## Option Two: Using Markdown and the Spectacle CLI

1. Create a new markdown file. You can use `.md` or `.mdx` (MDX lets you mix JSX components inside markdown).

   You can use this as a starter:

   ```md
   # Welcome to Spectacle

   - This is a list item
   - This is another list item

   ---

   # Second Slide

   Text can be **bold** or _italic_!

   Notes: These are presenter notes, only visible in presenter mode to the speaker.
   ```

   **Note:** The triple dash (`---`) is used as a slide delimiter. The `Notes:` keyword is used to embed presenter notes only visible to the speaker in presenter mode.

2. To view your slides, supply your markdown to the Spectacle CLI to start a local web server.

   ```bash
   $ npm install --global spectacle-cli
   $ spectacle -s my-slides.mdx
   ```

3. And you're good to go! The web server you started supports live refreshing and will update your deck as you make changes to the markdown file.

## Option Three: Using One Page

One Page is a single self-contained `HTML` file that lets you build a deck using no build steps, using [htm](https://github.com/developit/htm) over JSX to reduce the dependencies and load time.

As a self-contained entity, it already has references to the dependencies you need to author and launch a deck in a web browser. Since there is no tooling required, One Page is also optimal on tablets. The One Page `HTML` file can be downloaded from the `examples` directory [in this repository](https://unpkg.com/browse/spectacle@latest/examples/one-page.html).

## Next Steps

### Styling your Spectacle Deck

The easiest way to apply consistent styles to your Spectacle deck is using [themes](./themes).

1. Create a theme JS file containing a single object export. Supplied properties will be merged with the default base theme (found in Spectacle at `src/theme/default-theme.js`).

   Here's a sample object:

   ```js
   export default {
     colors: {
       primary: 'red',
       secondary: 'green'
     },
     fonts: {
       header: '"Helvetica Neue", Helvetica, Arial, sans-serif'
     },
     fontSizes: {
       h1: '72px',
       h2: '64px'
     }
   };
   ```

2. Consume the theme using the approach of your choice:

   a. To use a custom theme with a JSX- (Option One) or HTM- (Option Three) Deck, supply the object to the `theme` prop in the `Deck` tag. `<Deck theme={customTheme}>`.

   b. To use a custom theme with the Markdown CLI (Option Two), supply the file using the `-t` argument.

   ```bash
   $ npm install --global spectacle-cli
   $ spectacle -s my-slides.mdx -t custom-theme.js
   ```

### Sharing your Spectacle Deck

For more information on [presenting](./basic-concepts#presenting), [exporting](./advanced-concepts#exporting), [building](./advanced-concepts#build--deployment), or [deploying](./advanced-concepts#build--deployment) your Spectacle deck, please check out [the documentation on advanced concepts](./advanced-concepts).

## Documentation, Contributing, and Source

For more information about Spectacle and its components, check out [the docs](https://formidable.com/open-source/spectacle).

Interested in helping out or seeing what's happening under the hood? Spectacle is maintained [on Github](https://github.com/FormidableLabs/spectacle) and you can [start contributing here](https://github.com/FormidableLabs/spectacle/blob/main/docs/CONTRIBUTING.md).

For any questions, feel free to [open a new question on Github](https://github.com/FormidableLabs/spectacle/issues/new?template=question.md).

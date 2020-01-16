---
title: Basic Concepts
order: 1
---

<a name="basic-concepts"></a>

# Basic Concepts

<a name="installation"></a>

## Installation

```sh
yarn add spectacle
```

<a name="development"></a>

## Development

After installing Spectacle, all of your presentation and style logic will live in a main file, while your content exists either inline (with JSX) or in a separate markdown file (MDX).

To see examples of each presentation type, please see the [`examples/`](../../examples/README.md) dir

<a name="mdx"></a>

### MDX

This approach involves generating semantic tags directly from your own markdown.

```mdx
<!-- index.mdx -->

TODO
```

<a name="jsx"></a>

### JSX

This approach is where you use the library's tags to compose your presentation. While you can mix in your own JSX syntax here, building your presentation with the supplied tags will allow for out-of-box themeing and layouts to work properly.

The bare minimum you'll want to use to build your presentation are the `Deck` element and a `Slide` element. Each `Slide` represents a slide within your presentation `Deck` (the entire slideshow).

```jsx
// index.js
import React, { Component } from 'react';

TODO;
```

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

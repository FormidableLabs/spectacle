# Spectacle

[![Travis Status][trav_img]][trav_site]
[![Maintenance Status][maintenance-image]](#maintenance-status)

A [ReactJS](https://reactjs.org/)-based Presentation Library.

Looking for a quick preview of what you can do with Spectacle? Check out our live Demo Deck [here](https://raw.githack.com/FormidableLabs/spectacle/master/one-page.html#/).

Have a question about Spectacle? Submit an issue in this repository using the "Question" template.

## Contents

- [Getting Started](./docs/getting-started.md)
  - [Classic Spectacle](./docs/getting-started.md#classic-spectacle)
  - [Spectacle MDX](./docs/getting-started.md#spectacle-mdx)
  - [One Page](./docs/getting-started.md#one-page)
- [Basic Concepts](./docs/basic-concepts.md)
  - [Main file](./docs/basic-concepts.md#main-file)
  - [Themes](./docs/basic-concepts.md#themes)
    - [createTheme(colors, fonts)](./docs/basic-concepts.md#createthemecolors-fonts)
  - [Development](./docs/basic-concepts.md#development)
  - [Build & Deployment](./docs/basic-concepts.md#build--deployment)
  - [Presenting](./docs/basic-concepts.md#presenting)
  - [Controls](./docs/basic-concepts.md#controls)
  - [Fullscreen](./docs/basic-concepts.md#fullscreen)
  - [PDF Export](./docs/basic-concepts.md#pdf-export)
- [Tag API](./docs/tag-api.md)
  - [Main Tags](./docs/tag-api.md#main-tags)
    - [Deck](./docs/tag-api.md#deck)
    - [Slide (Base)](./docs/tag-api.md#slide-base)
    - [Notes](./docs/tag-api.md#notes)
    - [MarkdownSlides](./docs/tag-api.md#markdown-slides)
  - [Layout Tags](./docs/tag-api.md#layout-tags)
    - [Layout](./docs/tag-api.md#layout)
    - [Fit](./docs/tag-api.md#fit)
    - [Fill](./docs/tag-api.md#fill)
  - [Markdown Tag](./docs/tag-api.md#markdown-tag)
    - [Markdown](./docs/tag-api.md#markdown)
  - [Magic Tag](./docs/tag-api.md#magic-tag)
    - [Magic](./docs/tag-api.md#magic)
  - [Element Tags](./docs/tag-api.md#element-tags)
    - [Appear](./docs/tag-api.md#appear)
    - [Anim](./docs/tag-api.md#anim)
    - [BlockQuote, Quote and Cite (Base)](./docs/tag-api.md#blockquote-quote-and-cite-base)
    - [CodePane (Base)](./docs/tag-api.md#codepane-base)
    - [Code (Base)](./docs/tag-api.md#code-base)
    - [ComponentPlayground](./docs/tag-api.md#component-playground)
    - [GoToAction (Base)](./docs/tag-api.md#go-to-action)
    - [Heading (Base)](./docs/tag-api.md#heading-base)
    - [Image (Base)](./docs/tag-api.md#image-base)
    - [Link (Base)](./docs/tag-api.md#link-base)
    - [List & ListItem (Base)](./docs/tag-api.md#list--listitem-base)
    - [S (Base)](./docs/tag-api.md#s-base)
    - [Table, TableRow, TableBody, TableHeader, TableHeaderItem and TableItem (Base)](./docs/tag-api.md#table-tablerow-tableheaderitem-and-tableitem-base)
    - [Text (Base)](./docs/tag-api.md#text-base)
    - [Typeface](./docs/tag-api.md#typeface)
  - [Base Props](./docs/tag-api.md#base-props)
- [Third Party Extensions](./docs/extensions.md)
- [FAQ](#faq)
- [Maintenance Status](#maintenance-status)

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

[trav_img]: https://api.travis-ci.com/FormidableLabs/spectacle.svg
[trav_site]: https://travis-ci.com/FormidableLabs/spectacle
[maintenance-image]: https://img.shields.io/badge/maintenance-active-green.svg

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

---
title: Getting Started - A Tutorial
order: 7
---

<a name="tutorial"></a>

In this guide, we'll show you how to get started with Spectacle, and walk you through the creation and customization of a presentation deck.

<a name="step-one"></a>

## 1. Set up a basic React project

Stand up a new React application (_probably easiest achieved using [create-react-app](https://github.com/facebook/create-react-app)_). We will be adding content to an index.js, which should be treated as the main entry point in your application.

<a name="step-two"></a>

## 2. Add Spectacle

Run `yarn add spectacle` to bring Spectacle into your React application.

Almost all Spectacle presentations are comprised of a couple basic components: One `Deck` and typically multiple `Slide`s. For now, let's import these two basic components to get our deck started.

The imports at the top of your main presentation file should look like this:

```js
import React from 'react';
import { Deck, Slide } from 'spectacle';
```

To create our deck, we'll wrap some Slide components into a Deck in our Presentation class, like so:

```js
export default class Presentation extends React.Component {
  render() {
    return (
      <Deck>
        <Slide>Spectacle Boilerplate</Slide>
        <Slide>Typography</Slide>
        <Slide>Standard List</Slide>
        <Slide>Example Quote</Slide>
      </Deck>
    );
  }
}
```

<a name="step-three"></a>

## 3. Add some slide content

To break up our content, we can use the `Heading` and `Text` tags to display varying sizes of text. Every time we want to use a new component from the Spectacle API, we will have to add it to our imports at the top:

```js
import React from 'react';
import { Deck, Heading, Slide, Text } from 'spectacle';
```

Now we can enhance our slides with these components:

```js
export default class Presentation extends React.Component {
  render() {
    return (
      <Deck>
        <Slide>
          <Heading>Spectacle</Heading>
          <Text>a React.js-based presentation library</Text>
        </Slide>
        <Slide>
          <Heading>Typography</Heading>
          <Heading>Heading 1</Heading>
          <Heading>Heading 2</Heading>
          <Heading>Heading 3</Heading>
          <Heading>Heading 4</Heading>
          <Heading>Heading 5</Heading>
          <Text>Standard text</Text>
        </Slide>
        <Slide>
          <Heading>Standard List</Heading>
        </Slide>
        <Slide>
          <Heading>Example Quote</Heading>
        </Slide>
      </Deck>
    );
  }
}
```

We can bring in additional core tags like `List` and `ListItem` to display bulleted lists on your slides:

```js
return (
  ...
    <Slide>
      <List>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
        <ListItem>Item 4</ListItem>
      </List>
    </Slide>
  ...
)
```

<a name="step-four"></a>

## 4. Add images

Create an `assets` directory in the root of your project and save a few of your own images to it. Then, near the top of your file, import your image(s):

<!-- TODO - revise for optimized img loading? -->

```js
const images = {
  formidaLogo: require('../assets/formidable-logo.svg'),
  goodWork: require('../assets/good-work.gif')
};
```

Once you've brought in your images, you can supply them to the `src` prop on the `Image` tag to display within your slides (but don't forget to import the tag!). Now, your presentation file should look like this:

```js
import React from 'react';
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  Image,
  List,
  ListItem,
  Quote,
  Slide,
  Text
} from 'spectacle';

const images = {
  formidaLogo: require('../assets/formidable-logo.svg'),
  goodWork: require('../assets/good-work.gif')
};

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck>
        <Slide>
          <Heading>Spectacle</Heading>
          <Text>a React.js-based presentation library</Text>
        </Slide>
        <Slide>
          <Image src={images.formidaLogo} width={800} />
        </Slide>
        <Slide>
          <Heading>Typography</Heading>
          <Heading>Heading 1</Heading>
          <Heading>Heading 2</Heading>
          <Heading>Heading 3</Heading>
          <Heading>Heading 4</Heading>
          <Heading>Heading 5</Heading>
          <Text>Standard text</Text>
        </Slide>
        <Slide>
          <Heading>Standard List</Heading>
          <List>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
            <ListItem>Item 4</ListItem>
          </List>
        </Slide>
        <Slide>
          <Image src={images.goodWork} width={500} />
        </Slide>
      </Deck>
    );
  }
}
```

<a name="step-five"></a>

## 5. Add charts

<!-- TODO - Victory impl? -->

<a name="step-six"></a>

## 6. Style your slides

<!-- Because the `Text`, `Image`, and `Heading` accept a number of props (like `bold`, `caps`, `fit`, `lineHeight`, and `size`), we can use these props to minimally style our content: -->

<!-- ```js
export default class Presentation extends React.Component {
  render() {
    return (
      <Deck>
        <Slide>
          <Heading size={1} fit caps lineHeight={1}>
            Spectacle Boilerplate
          </Heading>
          <Text margin="10px 0 0" fit bold>
            open the presentation/index.js file to get started
          </Text>
        </Slide>
        <Slide>
          <Image src={images.formidaLogo} width={800} />
        </Slide>
        <Slide>
          <Heading size={6} caps>
            Typography
          </Heading>
          <Heading size={1}>Heading 1</Heading>
          <Heading size={2}>Heading 2</Heading>
          <Heading size={3}>Heading 3</Heading>
          <Heading size={4}>Heading 4</Heading>
          <Heading size={5}>Heading 5</Heading>
          <Text size={6}>Standard text</Text>
        </Slide>
        <Slide>
          <Heading size={6} caps>
            Standard List
          </Heading>
          <List>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
            <ListItem>Item 4</ListItem>
          </List>
        </Slide>
        <Slide>
          <Image src={images.goodWork} width={500} />
        </Slide>
      </Deck>
    );
  }
}
``` -->

<a name="step-seven"></a>

## 7. Create a theme

To style our slides further, we can create a theme to enforce fonts and colors on all of our slides.

<a name="step-eight"></a>

## 8. Add animations

Using the core Spectacle API, we can supply transition props <!-- TODO - like so -->.

Additionally, you could bring in other core components like `Appear` to spice up your slides. `Appear` will delay the rendering of your text or image for one click, so you can have more control over the timing over your content. Just wrap any fragment you would like to delay with the tag to apply the animation. For example:

```js
<Slide>
  <Heading>Animated List</Heading>
  <List>
    <Appear>
      <ListItem>Item 1</ListItem>
    </Appear>
    <Appear>
      <ListItem>Item 2</ListItem>
    </Appear>
    <Appear>
      <ListItem>Item 3</ListItem>
    </Appear>
    <Appear>
      <ListItem>Item 4</ListItem>
    </Appear>
  </List>
</Slide>
```

<a name="step-nine"></a>

## 9. Add code samples

Finally, you have a couple of options for displaying code content.

<!-- TODO - is CodePane the same? -->
<!-- TODO - is ComponentPlayground the same? -->

<!-- `CodePane` and `ComponentPlayground` both offer ways to display code, but they differ in a fundamental way: `CodePane` is a styled, highlighted code preview, while `ComponentPlayground` is a two-paned view with source on the right and a preview pane on the left for showing off custom components. -->

When displaying code using either component, the process is similar to displaying an image. You'll want to start by importing your code examples as assets, like so:

```js
const code = {
  deckSample: require('../assets/code/deck.example');
}
```

<!-- To then display this code content in a `CodePane` component, you'll provide it as a `source`:

```js
<Slide>
  <CodePane
    lang="jsx"
    source={code.deckSample}
    margin="20px auto"
    overflow="overflow"
  />
</Slide>
``` -->

<!-- To display the same code sample in a `ComponentPlayground`, you'll want to provide the code sample to the component in a similar way, as the `code`:

```js
<Slide>
  <ComponentPlayground code={code.deckSample} theme={dark} />
</Slide>
``` -->

<a name="next-steps"></a>

## Next Steps

For more information on [presenting](./basic-concepts#presenting), [exporting](./advanced-concepts#exporting), [building](./advanced-concepts#build--deployment), or [deploying](./advanced-concepts#build--deployment) your Spectacle deck, please check out [the docs](https://formidable.com/open-source/spectacle).

<a name="documentation-contributing-and-source"></a>

## Documentation, Contributing, and Source

For more information about Spectacle and its components, check out [the docs](https://formidable.com/open-source/spectacle).

Interested in helping out or seeing what's happening under the hood? Spectacle is maintained [on Github](https://github.com/FormidableLabs/spectacle) and you can [start contributing here](https://github.com/FormidableLabs/spectacle/blob/master/docs/CONTRIBUTING.md).

For any questions, feel free to [open a new question on Github](https://github.com/FormidableLabs/spectacle/issues/new?template=question.md).

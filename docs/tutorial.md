# Getting Started with Spectacle: A Tutorial

In this guide, we'll show you how to get started with Spectacle and walk you through the creation and customization of a presentation deck. We've created a Github repository with the [completed project](https://github.com/FormidableLabs/spectacle-boilerplate), and will link the corresponding commit where appropriate to help you follow along. If you want, you can [view the completed tutorial here](https://github.com/FormidableLabs/spectacle-boilerplate/blob/master/presentation/index.js).

## 1. Set up a basic React project

You can do this on your own if you'd like, or you can...

- Clone down [this project](https://github.com/FormidableLabs/spectacle-boilerplate) we've started for you using `git clone git@github.com:FormidableLabs/spectacle-boilerplate.git`
- Remove existing version control by running `rm -rf .git`
- `cd spectacle-boilerplate`
- Replace the existing code in the `presentation/index.js` file with:

  ```js
  import React from 'react';

  export default class Presentation extends React.Component {
    render() {
      return (
        <div>
          <h1>Spectacle Tutorial</h1>
        </div>
      );
    }
  }
  ```

- Run `yarn install` to install all necessary dependencies

Once you've completed these steps, you can run the webpack sever with the command `yarn start`, and the project will render at [localhost:3000](http://localhost:3000). All modifications will take place in this `index.js` file.

## 2. Add Spectacle

If you chose to use the [spectacle-boilerplate](https://github.com/FormidableLabs/spectacle-boilerplate) to get started, Spectacle is already in your dependencies and there is no reason to add the library a second time - you can go ahead and skip to the next paragraph. If you chose _not_ to use the boilerplate to get setup, you will need to run `yarn add spectacle`.

Almost all Spectacle presentations are comprised of a couple of basic components: One `Deck` and typically multiple `Slide`s. For now, let's import these two basic components to get our deck started.

The imports at the top of your main JavaScript file should look like this:

```js
import React from 'react';
import { Deck, Slide } from 'spectacle';
```

To create our deck, we'll wrap some Slide components into a Deck in our Presentation class:

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

## 3. Add some slide content

To break up our content, we can use the `Heading` and `Text` tags to display varying sizes of text. Every time we want to use a new component from the Spectacle API, we will have to add it to our imports at the top:

```js
import React from 'react';
import { Deck, Heading, Slide, Text } from 'spectacle';
```

Now we can add these components to our slides:

```js
export default class Presentation extends React.Component {
  render() {
    return (
      <Deck>
        <Slide>
          <Heading>Spectacle Boilerplate</Heading>
          <Text>open the presentation/index.js file to get started</Text>
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

We can bring in additional core tags like `BlockQuote`, `Quote`, and `Cite` to display large quotes with a credited author. Other tags like `List` and `ListItem` will display bulleted lists on your slides:

```js
export default class Presentation extends React.Component {
  render() {
    return (
      <Deck>
        <Slide>
          <Heading>Spectacle Boilerplate</Heading>
          <Text>open the presentation/index.js file to get started</Text>
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
          <List>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
            <ListItem>Item 4</ListItem>
          </List>
        </Slide>
        <Slide>
          <BlockQuote>
            <Quote>Example Quote</Quote>
            <Cite>Author</Cite>
          </BlockQuote>
        </Slide>
      </Deck>
    );
  }
}
```

## 4. Add images

If you used the starter, there are already a few images in the `assets` directory for you to use. If not, create an `assets` directory in the root of your project and save a few images of your own to it.

Then, near the top of your file, import your image(s):

```js
const images = {
  formidagon: require('../assets/formidable-logo.svg'),
  goodWork: require('../assets/good-work.gif')
};
```

Once you've brought in your images, you can supply them to the `src` prop on the `Image` tag to display within your slides (but don't forget to import the tag!). Now, your `index.js` should look like this:

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
  formidagon: require('../assets/formidable-logo.svg'),
  goodWork: require('../assets/good-work.gif')
};

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck>
        <Slide>
          <Heading>Spectacle Boilerplate</Heading>
          <Text>open the presentation/index.js file to get started</Text>
        </Slide>
        <Slide>
          <Image src={images.formidagon} width={800} />
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
          <BlockQuote>
            <Quote>Example Quote</Quote>
            <Cite>Author</Cite>
          </BlockQuote>
        </Slide>
        <Slide>
          <Image src={images.goodWork} width={500} />
        </Slide>
      </Deck>
    );
  }
}
```

## 5. Style your slides

Because the `Text`, `Image`, and `Heading` accept a number of [props](https://github.com/FormidableLabs/spectacle#tag-api) (like `bold`, `caps`, `fit`, `lineHeight`, and `size`), we can use these props to minimally style our content.

```js
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
          <Image src={images.formidagon} width={800} />
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
          <BlockQuote>
            <Quote>Example Quote</Quote>
            <Cite margin="10px 0 0 30px">Author</Cite>
          </BlockQuote>
        </Slide>
        <Slide>
          <Image src={images.goodWork} width={500} />
        </Slide>
      </Deck>
    );
  }
}
```

## 6. Create a theme

To style our slides a little further, we can create a theme to enforce fonts and colors on all of our slides. We'll want to import the `createTheme` function from Spectacle, but we use a direct path (`'spectacle/lib/themes/default'`) instead of grouping it in with the default component exports. Your imports should now look like so:

```js
import React from 'react';
import { Deck, Heading, Slide, Text } from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';
```

And then, using `createTheme`, we can declare values for our theme:

```js
const theme = createTheme(
  {
    primary: 'white',
    secondary: '#1F2022',
    tertiary: '#03A9FC',
    quaternary: '#CECECE'
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica'
  }
);
```

Then, we can supply these values to our slides:

```js
export default class Presentation extends React.Component {
  render() {
    return (
      <Deck theme={theme}>
        <Slide bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Spectacle Boilerplate
          </Heading>
          <Text margin="10px 0 0" fit bold textColor="tertiary">
            open the presentation/index.js file to get started
          </Text>
        </Slide>
        <Slide bgColor="secondary">
          <Image src={images.formidagon} width={800} />
        </Slide>
        <Slide bgColor="tertiary">
          <Heading size={6} caps textColor="primary">
            Typography
          </Heading>
          <Heading size={1} textColor="secondary">
            Heading 1
          </Heading>
          <Heading size={2} textColor="secondary">
            Heading 2
          </Heading>
          <Heading size={3} textColor="secondary">
            Heading 3
          </Heading>
          <Heading size={4} textColor="secondary">
            Heading 4
          </Heading>
          <Heading size={5} textColor="secondary">
            Heading 5
          </Heading>
          <Text size={6} textColor="secondary">
            Standard text
          </Text>
        </Slide>
        <Slide bgColor="primary" textColor="tertiary">
          <Heading size={6} caps textColor="secondary">
            Standard List
          </Heading>
          <List>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
            <ListItem>Item 4</ListItem>
          </List>
        </Slide>
        <Slide bgColor="secondary" textColor="primary">
          <BlockQuote>
            <Quote>Example Quote</Quote>
            <Cite>Author</Cite>
          </BlockQuote>
        </Slide>
        <Slide>
          <Image src={images.goodWork} width={500} />
        </Slide>
      </Deck>
    );
  }
}
```

## 6. Add animations

Using the core Spectacle API, we can supply transition props like `transition` and `transitionDuration` to our `Deck` and `Slide` components to make the presentation more animated, without adding any new imports:

```js
export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        theme={theme}
        transition={['zoom', 'slide']}
        transitionDuration={500}
      >
        <Slide transition={['zoom']} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Spectacle Boilerplate
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" fit bold>
            open the presentation/index.js file to get started
          </Text>
        </Slide>
        <Slide bgColor="secondary">
          <Image src={images.formidagon} width={800} />
        </Slide>
        <Slide transition={['fade']} bgColor="tertiary">
          <Heading size={6} textColor="primary" caps>
            Typography
          </Heading>
          <Heading size={1} textColor="secondary">
            Heading 1
          </Heading>
          <Heading size={2} textColor="secondary">
            Heading 2
          </Heading>
          <Heading size={3} textColor="secondary">
            Heading 3
          </Heading>
          <Heading size={4} textColor="secondary">
            Heading 4
          </Heading>
          <Heading size={5} textColor="secondary">
            Heading 5
          </Heading>
          <Text size={6} textColor="secondary">
            Standard text
          </Text>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>
            Standard List
          </Heading>
          <List>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
            <ListItem>Item 4</ListItem>
          </List>
        </Slide>
        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
          <BlockQuote>
            <Quote>Example Quote</Quote>
            <Cite>Author</Cite>
          </BlockQuote>
        </Slide>
        <Slide>
          <Image src={images.goodWork} width={500} />
        </Slide>
      </Deck>
    );
  }
}
```

Additionally, you could bring in other core components, like `Anim` and `Appear` to animate your slides. `Appear` will delay the rendering of your text or image for one click, so you can have more control over the timing of your content. Just wrap any fragment you would like to delay with the tag to apply the animation. For example:

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

`Anim` allows you extra flexibility with your animations. You can write your own multi-step animations for individual fragments. You can provide it a `transitionDuration`, a `toStyle` and/or `fromStyle` object, an `easing` property that renders a [Victory Animation easing curve](https://formidable.com/open-source/victory/docs/victory-animation/#easing), or a custom `onAnim` function. For example:

```js
<Slide>
  <Anim
    transitionDuration={500}
    fromStyle={{
      opacity: 0,
      transform: 'translate3d(0px, -100px, 0px)  scale(1) rotate(0deg)'
    }}
    toStyle={[
      {
        opacity: 1,
        transform: 'translate3d(0px, 0px, 0px)  scale(1) rotate(0deg)'
      },
      {
        opacity: 1,
        transform: 'translate3d(0px, 0px, 0px) scale(1.6) rotate(-15deg)'
      },
      {
        opacity: 1,
        transform: 'translate3d(0px, 0px, 0px)  scale(0.8) rotate(0deg)'
      },
      {
        opacity: 1,
        transform: 'translate3d(0px, -200px, 0px)  scale(0.8) rotate(0deg)'
      }
    ]}
    easing={'bounceOut'}
    onAnim={(forwards, animIndex) => {
      console.log('forwards ', forwards);
      console.log('animIndex ', animIndex);
    }}
  >
    <div>
      <Heading caps size={6}>
        Flexible
        <br />
        animations
      </Heading>
    </div>
  </Anim>
</Slide>
```

## 7. Add code examples

Finally, you have a couple of options for displaying code content. `CodePane` and `ComponentPlayground` both offer ways to display code, but they differ in a fundamental way: `CodePane` is a styled, highlighted code preview, while `ComponentPlayground` is a two-paned view with source on the right and a preview pane on the left for showing off custom React components.

When displaying code using either component, the process is similar to display an image. You'll want to start by importing your code examples as assets:

```js
const code = {
  deckSample: require('../assets/deck.example')
};
```

To use the `CodePane` component, you'll then provide it as a `source`:

```js
<Slide>
  <CodePane
    lang="jsx"
    source={code.deckSample}
    margin="20px auto"
    overflow="overflow"
  />
</Slide>
```

To use a `ComponentPlayground`, you'll want to provide the code sample to the component in a similar way, as the `code`:

```js
<Slide>
  <ComponentPlayground code={code.deckSample} theme={dark} />
</Slide>
```

## Next Steps

For more information on [Presenting](../README.md#presenting), [Exporting](../README.md#pdf-export), [Building](../README.md#build--deployment), or [Deploying](../README.md#build--deployment) your Spectacle deck, check out the [`README`](../README.md).

## Documentation, Contributing, and Source

For more information about Spectacle and it's components, check out the docs - see [Spectacle](https://formidable.com/open-source/spectacle) to get started. Interested in helping out or seeing what's happening under the hood? Spectacle is maintained at [github.com/FormidableLabs/spectacle](https://github.com/FormidableLabs/spectacle), and you can [start contributing here](../CONTRIBUTING.md).

For any questions, feel free to [open a new question on Github](https://github.com/FormidableLabs/spectacle/issues/new?template=question.md).

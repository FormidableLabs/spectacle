---
title: Base Props
order: 3
---

<a name="base-props"></a>

# Base Props

Every component in the Tag API that has `(Base)` after it has been extended from a common class that includes the following props:

| Name         | PropType                   | Description                                                                  | Default         |
| ------------ | -------------------------- | ---------------------------------------------------------------------------- | --------------- |
| italic       | PropTypes.boolean          | Set `fontStyle` to `italic`                                                  | `false`         |
| bold         | PropTypes.boolean          | Set `fontWeight` to `bold`                                                   | `false`         |
| caps         | PropTypes.boolean          | Set `textTransform` to `uppercase`                                           | `false`         |
| margin       | PropTypes.number or string | Set `margin` value                                                           |                 |
| padding      | PropTypes.number or string | Set `padding` value                                                          |                 |
| textColor    | PropTypes.string           | Set `color` value                                                            |                 |
| textFont     | PropTypes.string           | Set `fontFamily` value                                                       |                 |
| textSize     | PropTypes.string           | Set `fontSize` value                                                         |                 |
| textAlign    | PropTypes.string           | Set `textAlign` value                                                        |                 |
| bgColor      | PropTypes.string           | Set `backgroundColor` value                                                  |                 |
| bgGradient   | PropTypes.string           | Set `backgroundImage` value                                                  |                 |
| bgImage      | PropTypes.string           | Set `backgroundImage` value                                                  |                 |
| bgImageStyle | PropTypes.string           | Set backgroundImage css property value directly                              |                 |
| bgSize       | PropTypes.string           | Set `backgroundSize` value                                                   | `cover`         |
| bgPosition   | PropTypes.string           | Set `backgroundPosition` value                                               | `center center` |
| bgRepeat     | PropTypes.string           | Set `backgroundRepeat` value                                                 |                 |
| bgDarken     | PropTypes.number           | Float value from 0.0 to 1.0 specifying how much to darken the bgImage image  | 0               |
| bgLighten    | PropTypes.number           | Float value from 0.0 to 1.0 specifying how much to lighten the bgImage image | 0               |
| overflow     | PropTypes.string           | Set `overflow` value                                                         |                 |
| height       | PropTypes.string           | Set `height` value                                                           |                 |

_NOTE: When using `bgImage` prop for local images, you must import the file for it to render properly._

```jsx
import myImage from './images/my-image.jpg';

......

<Slide bgImage={myImage}>
  I have an image for a background
</Slide>
```

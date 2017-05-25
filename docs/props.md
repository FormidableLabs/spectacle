<a name="base-props"></a>
# Base Props

Every component in the Tag API that has `(Base)` after it has been extended from a common class that includes the following props:

| Name | PropType | Description |
| ---- | -------- | ----------- |
| italic | PropTypes.boolean | Set `fontStyle` to `italic` |
| bold | PropTypes.boolean | Set `fontWeight` to `bold ` |
| caps | PropTypes.boolean | Set `textTransform` to `uppercase ` |
| margin | PropTypes.number or string | Set `margin` value|
| padding | PropTypes.number or string | Set `padding` value|
| textColor | PropTypes.string | Set `color` value|
| textSize | PropTypes.string | Set `fontSize` value|
| textAlign | PropTypes.string | Set `textAlign` value|
| textFont | PropTypes.string | Set `textFont` value|
| bgColor | PropTypes.string | Set `backgroundColor` value|
| bgImage | PropTypes.string | Set `backgroundImage` value|
| bgDarken | PropTypes.number | Float value from 0.0 to 1.0 specifying how much to darken the bgImage image|

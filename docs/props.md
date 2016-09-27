<a name="base-props"></a>
# Base Props

Every component in the Tag API that has `(Base)` after it has been extended from a common class that includes the following props:

| Name | PropType | Description |
| ---- | -------- | ----------- |
| italic | React.PropTypes.boolean | Set `fontStyle` to `italic` |
| bold | React.PropTypes.boolean | Set `fontWeight` to `bold ` |
| caps | React.PropTypes.boolean | Set `textTransform` to `uppercase ` |
| margin | React.PropTypes.number or string | Set `margin` value|
| padding | React.PropTypes.number or string | Set `padding` value|
| textColor | React.PropTypes.string | Set `color` value|
| textSize | React.PropTypes.string | Set `fontSize` value|
| textAlign | React.PropTypes.string | Set `textAlign` value|
| textFont | React.PropTypes.string | Set `textFont` value|
| bgColor | React.PropTypes.string | Set `backgroundColor` value|
| bgImage | React.PropTypes.string | Set `backgroundImage` value|
| bgDarken | React.PropTypes.number | Float value from 0.0 to 1.0 specifying how much to darken the bgImage image|
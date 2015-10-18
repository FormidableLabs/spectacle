### Markdown code blocks

Chose from `inline code` or code blocks:

```javascript
// We export the default config so people can extend it themselves
export default class Markdown extends React.Component {
  render() {
    const { source, children, mdastConfig } = this.props;
    const content = (isUndefined(source) || source === "") ? children : source;

    return (
      <div>
        {mdast().use(mdastReact, mdastConfig).process(content)}
      </div>
    );
  }
}
```

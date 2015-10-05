## Markdown from a file

Supports code blocks too:

```javascript
CodePane.contextTypes = {
  styles: React.PropTypes.object
};

CodePane.propTypes = {
  lang: React.PropTypes.string,
  source: React.PropTypes.string,
  style: React.PropTypes.object
};

CodePane.defaultProps = {
  lang: "html",
  source: ""
};
```

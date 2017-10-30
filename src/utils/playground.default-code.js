export const defaultCode = `
/**
 * Sample React Component
 * Output domContainerNode is 'mountNode'
 */

const styles = {
  heading: {
    fontSize: "2.25rem",
    fontWeight: "bold"
  },
  copy: {
    fontSize: "1.5rem"
  }
}

const HelloWorld = ({ name }) => (
  <div>
    <h1 style={styles.heading}>
      Create Live Code Examples in {name}!
    </h1>
    <p style={styles.copy}>
      Supports Light and Dark Syntax Themes
    </p>
  </div>
)

render(<HelloWorld name="Spectacle" />)
`;

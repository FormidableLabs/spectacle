---

# Spectacle Presentation (MD) 👋
These slides are bare Markdown with nothing special.

- `one`
- "two"
- 'three'

--- { "layout" : "columns" }

::section

# Write your Spectacle Presentations in Markdown

And use layout primitives to define columns!

::section

## And seamlessly use React Components

**How sweet is that**
**(super sweet)**

--- { "layout" : "center" }

![datboi](https://media.giphy.com/media/xohHbwcnOhqbS/giphy.gif)

---

Typography

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

---

> Example Quote

---

```jsx
import { createClient, Provider } from 'urql';

const client = createClient({ url: 'https://0ufyz.sse.codesandbox.io' });

const App = () => (
  <Provider value={client}>
    <Todos />
  </Provider>
);
```

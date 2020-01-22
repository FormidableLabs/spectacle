<a name="spectacle-sample-presentations"></a>

# Spectacle Sample Presentations

This directory contains a handful of sample presentations, showcasing the various ways you can assemble a Spectacle presentation.

For more detailed documentation, please check out [the docs](https://formidable.com/open-source/spectacle/docs).

<a name="table-of-contents"></a>

## Table of Contents

- [JS](#examplesjs)
- [One Page](#examplesone-page)
- [Markdown](#examplesmd)
- [MDX](#examplesmdx)
- [MDX + Babel](#examplesmdx-babel)

<a name="usage"></a>

### Usage

<a name="examples-js"></a>

#### `examples/js`

A basic deck with JSX and JavaScript:

```bash
# start the dev server
$ yarn start:js

# open the browser
$ open http://localhost:3000/
```

<a name="examples-one-page"></a>

#### `examples/one-page`

A self-contained single web page that uses Spectacle, React, and `htm` for a "no build" presentation!

```bash
# [optional] build the library -
#   comment out the unpkg dependency in
#   one-page.html and use the local dist/
$ yarn build

# open the browser
$ open examples/one-page.html
```

_or_ use the single line:

```bash
$ yarn start:one-page
```

<a name="examples-md"></a>

#### `examples/md`

```bash
# start the dev server using spectacle-cli
$ spectacle -s examples/md/slides.md

# open the browser
$ open http://localhost:3000/
```

_or_ use the single line:

```bash
$ yarn start:md
```

<a name="examples-mdx"></a>

#### `examples/mdx`

```bash
# start the dev server using spectacle-cli
$ spectacle -s examples/mdx/slides.mdx

# open the browser
$ open http://localhost:3000/
```

_or_ use the single line:

```bash
$ yarn start:mdx
```

<a name="examples-mdx-babel"></a>

#### `examples/mdx-babel`

```bash
# start the dev server using spectacle-cli
$ spectacle -s examples/mdx-babel/slides.mdx

# open the browser
$ open http://localhost:3000/
```

_or_ use the single line:

```bash
$ yarn start:mdx-babel
```

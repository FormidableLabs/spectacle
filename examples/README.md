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

A basic deck written in markdown:

```bash
# In one terminal open dev server
$ yarn start:md

# In another open a browser to 3100
$ open http://localhost:3100/
```

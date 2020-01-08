/* eslint-disable func-style */
const fs = require('fs');
const _ = require('lodash');
const frontmatter = require('remark-frontmatter');
const html = require('remark-html');
const klaw = require('klaw');
const path = require('path');
const remark = require('remark');
const remarkPrism = require('gatsby-remark-prismjs'); // gatsby-remark plugins are usable for remark parsing without requiring gatsby.
const select = require('unist-util-select');
const slug = require('remark-slug');
const slugs = require('github-slugger')();
const visit = require('unist-util-visit');
const yaml = require('js-yaml');
const { promisify } = require('util');

function defaultSort(items) {
  return items;
}

function codeHighlightTransformer() {
  return node => remarkPrism({ markdownAST: node });
}

function slugTransformer(ast) {
  slugs.reset();

  function visitor(node) {
    const data = node.data || (node.data = {});
    const props = data.hProperties || (data.hProperties = {});
    if (node.depth) {
      const nodeClass = props.className
        ? `${props.className} doc-hash-link`
        : 'doc-hash-link';
      // This adds GH style links to our md based on existing behaviors by converting mdast heading
      // nodes to html so we can inject the link and svg directly rather than do something like add
      // a marker value to the mdast and let the renderer handle it, in part because our "renderer"
      // is __dangerouslySetHTML on a div.
      const defaultHTML = `
        <h${node.depth}>
          ${node.children[0].value}
        </h${node.depth}>
      `;
      const elInnerHTML =
        node.depth === 1
          ? defaultHTML
          : `
            <h${node.depth}>
              <a class="Anchor"
                aria-hidden="true"
                id="${node.data.id}"
                href="#${node.data.id}"
              >
                <svg viewBox="0 0 16 16" version="1.1" width="16" height="16"aria-hidden="true">
                  <path fill-rule="evenodd"
                    d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
                  />
                </svg>
              </a>
              ${node.children[0].value}
            </h${node.depth}>
          `;
      node.type = `html`;
      node.value = elInnerHTML;
      props.className = nodeClass;
      data.className = nodeClass;
    }
  }
  visit(ast, 'heading', visitor);
}

function slugWithLink() {
  return slugTransformer;
}

const subHeadingRangeDefaults = {
  start: 1,
  end: 3
};

function setYamlToFile(subHeadingRange = subHeadingRangeDefaults) {
  function transformer(ast, file) {
    const yamlObj = select(ast, 'yaml');
    let obj;
    if (yamlObj.length > 0) {
      const { children } = ast;

      obj = yaml.safeLoad(yamlObj[0].value);

      file.data = obj;

      Object.defineProperty(file, 'raw', {
        value: file.contents,
        enumerable: true
      });

      file.data.subHeadings = children
        .filter(
          c =>
            c.type === 'heading' &&
            c.depth >= subHeadingRange.start &&
            c.depth <= subHeadingRange.end
        )
        .map(c => ({
          type: c.type,
          value: c.children[0].value,
          depth: c.depth,
          slug: _.kebabCase(c.children[0].value).toLowerCase()
        }));
    }
  }

  return transformer;
}

// The pattern of renderer-agnosticism that worked well for a less complex project is essentially a fiction here,
// but if there is sufficient will to do so, we could slough off the forced legacy of managing view-rendering concerns
// in a data ingestion layer that has absolutely no business knowing this much about the specifics of it.

const baseConfig = {
  renderer: remark()
    .use(frontmatter, ['yaml', 'toml'])
    .use(setYamlToFile)
    .use(html)
    .use(codeHighlightTransformer)
    .use(slug)
    .use(slugWithLink),
  // converting to an originally grey-matter idiom for all our existing transforms and future interop -- it's not much of a stretch
  // for remark, but who knows what the future (and the past) hold.
  outputHarmonizer: result => ({
    content: result.contents,
    data: result.data,
    raw: result.raw
  })
};

// eslint-disable-next-line max-params
const getMdFiles = async (
  mdPath,
  items,
  mutations = [],
  sort = defaultSort,
  config = baseConfig
) =>
  // eslint-disable-next-line promise/avoid-new
  new Promise((resolve, reject) => {
    if (fs.existsSync(mdPath)) {
      klaw(mdPath)
        .on('data', item => {
          if (path.extname(item.path) === '.md') {
            const data = promisify(fs.readFile);

            const { renderer, outputHarmonizer } = config;
            renderer.process(data, (err, result) => {
              if (err) {
                return reject(err);
              }

              const mdData = outputHarmonizer(result);

              mutations.forEach(m => {
                m(mdData, item.path);
              });

              items.push(mdData);
            });
          }
        })
        .on('error', e => {
          reject(e);
        })
        .on('end', () => {
          resolve(sort(items));
        });
    } else {
      resolve(items);
    }
  });

module.exports = getMdFiles;

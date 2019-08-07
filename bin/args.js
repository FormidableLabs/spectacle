const yargs = require('yargs');
const fs = require('fs');

// Validate and normalize.
const validate = parser => {
  const { argv } = parser;
  const { mdx } = argv;

  return Promise.resolve().then(() =>
    new Promise((resolve, reject) => {
      fs.readFile(mdx, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }).then(buf => buf.toString('utf8'))
  );
};

const args = () =>
  yargs
    .usage(`Usage: spectacle -m <file>`)

    // MDX File
    .option('mdx', {
      alias: 'm',
      describe: 'Path to mdx file from which a presentation will be generated.',
      default: 'slides.mdx',
      required: false,
      type: 'string'
    })

    // Logistical
    .help()
    .alias('help', 'h')
    .version()
    .alias('version', 'v')
    .strict();

module.exports = {
  parse: () => validate(args())
};

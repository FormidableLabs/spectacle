const yargs = require('yargs');

// Validate and normalize.
const validate = parser => {
  const { argv } = parser;
  const { mdx } = argv;

  return Promise.resolve({ mdx });
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

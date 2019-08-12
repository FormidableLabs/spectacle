const yargs = require('yargs');
const validatePresentationMode = require('./validate/presentation-mode');

const validate = async parser => {
  const { argv } = parser;
  const { src } = argv;

  return await validatePresentationMode(src);
};

const args = () =>
  yargs
    .usage(`Usage: spectacle -s <file>`)

    // MDX File
    .option('src', {
      alias: 's',
      describe: 'Path to a file from which a presentation will be generated.',
      default: 'slides.mdx',
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

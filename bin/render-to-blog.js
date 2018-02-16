const program = require('commander');
const pkg = require('../package.json');
const { createPost, writeGatsbyStream } = require('./files');

program
  .version(pkg.version)
  .option('--g, --gatsby', 'Render to Gatsby-style blog')
  .option('--md, --markdown', 'Render to Markdown-style blog')
  .option('--html', 'Render to HTML document')
  .usage('[script] Render your presentation into a blog format of your choosing')
  .parse(process.argv);

const slides = [{
  deckTitle: "Spectacle is Great",
  slideTitle: "simple cool presentations",
  notes: "<li><ul>Things</ul><ul>Things</ul></li>",
  date: "01-16-2018"
},{
  deckTitle: "Spectacle is Great",
  slideTitle: "custom presentations",
  notes: "<li><ul>Other things</ul><ul>Other things</ul></li>",
  date: "01-31-2018"
},{
  deckTitle: "Spectacle is Great",
  slideTitle: "special styles in your presentations",
  notes: "<li><ul>Other things</ul><ul>Other things</ul></li>",
  date: "02-13-2018"
}];

if (program.gatsby) {
  Promise.all(slides.map(slide => createPost(slide).then(() => writeGatsbyStream(slide))))
    .then(console.log(`An index has been written`)).catch(err => console.log(err));
}

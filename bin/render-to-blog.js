const program = require('commander');
const pkg = require('../package.json');
const { createPost } = require('./files');

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
  date: "MM-DD-YYYY"
},{
  deckTitle: "Spectacle is Great",
  slideTitle: "custom presentations",
  notes: "<li><ul>Other things</ul><ul>Other things</ul></li>",
  date: "MM-DD-YYYY"
}]

if (program.gatsby){
  console.log('Gatsby blog comin');
  slides.forEach(function (slide, i) {
    createPost(slide);
  })
};

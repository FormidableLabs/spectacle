const program = require('commander');
const path = require('path');
const pkg = require('../package.json');
const { removeDir, createDir } = require('./files');
const { createGatsbyPosts } = require('./gatsby');

const src = process.cwd(); 
const name = path.basename(src);
const blogPath = `${name}-blog`;

program
  .version(pkg.version)
  .option('--g, --gatsby', 'Render to Gatsby-style blog')
  .option('--md, --markdown', 'Render to markdown document')
  .option('--html', 'Render to HTML document')
  .usage('[script] Render your presentation into a blog format of your choosing')
  .parse(process.argv);

// TODO_REMOVE_THIS_SAMPLE_DATA

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

const runScript = function runScript() {
  if (program.gatsby) {
    console.log('Gatsby blog incoming!')
    return createGatsbyPosts(slides);
  }

  if (program.markdown) {
    console.log('Markdown doc incoming!')
  }

  if (program.html) {
    console.log('HTML doc incoming!')
  }

  throw 'Please specify a program';
}

const init = async function init () {
  try {
    await removeDir(blogPath);
    await createDir(blogPath);
    await runScript();
  } catch (err) {
    console.log(err);
  }
}

return init();


const fs = require('fs');
const path = require('path');
const touch = require('touch');
const { mkDirByPathSync } = require('./utils');

// TODO_REFACTOR 

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

const src = process.cwd(); 
const name = path.basename(src);
const blogPath = path.join(`${name}-blog/pages`);

function createOrReadBase() { 
  return new Promise((fulfill, reject) => {
    mkDirByPathSync(blogPath);
    fulfill();
})};

function getPath(slideTitle, date) {
  return slideTitle.toLowerCase().split(' ', 2).join('-');
}

function getFolderPath(gatsbyPath, date) {
  return `${date}-${gatsbyPath}`; 
}

exports.createPost = function createPost(slide) {
  const gatsbyPath = getPath(slide.slideTitle);
  const gatsbyFolder = getFolderPath(gatsbyPath, slide.date);
  
  return createOrReadBase().then(() => {
    console.log(`A folder has been created at ${blogPath}/${gatsbyFolder}`);
    mkDirByPathSync(`${blogPath}/${gatsbyFolder}`);
    return touch(`${blogPath}/${gatsbyFolder}/index.md`);
  })
}

exports.writeGatsbyStream = function writeGatsbyStream(slide) {
  const { slideTitle, date, notes } = slide;
  const path = getPath(slideTitle);
  const folder = getFolderPath(path, date);
  const stream = fs.createWriteStream(`${blogPath}/${folder}/index.md`);

  stream.once('open', (fd) => {
    stream.write(`----\n`);
    stream.write(`path: ${path}\n`);
    stream.write(`date: ${date}\n`);
    stream.write(`title: ${slideTitle}\n`);
    stream.write(`----\n`);
    stream.write(`${notes}\n`);
    stream.end();
  });

  stream.on('finish', () => {  
    console.log('wrote all data to file!');
  });
}

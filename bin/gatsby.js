const path = require('path');
const fs = require('fs');
const touch = require('touch');
const { createDir } = require('./files');

const src = process.cwd(); 
const name = path.basename(src);
const blogPath = path.join(`${name}-blog/pages`);

function getPath(slideTitle, date) {
  return slideTitle.toLowerCase().split(' ', 2).join('-');
}

function getFolderPath(gatsbyPath, date) {
  return `${date}-${gatsbyPath}`; 
}

function writeGatsbyStream(slide) {
  const { slideTitle, date, notes } = slide;
  const path = getPath(slideTitle);
  const folder = getFolderPath(path, date);

  return new Promise ((resolve, reject) => {
    const stream = fs.createWriteStream(`${blogPath}/${folder}/index.md`);

    stream.once('open', (fd) => {
      stream.write(`----\n`);
      stream.write(`path: "/${path}"\n`);
      stream.write(`date: "${date}"\n`);
      stream.write(`title: "${slideTitle}"\n`);
      stream.write(`----\n`);
      stream.write(`\n${notes}\n`);
      stream.end();
    });

    stream.on('finish', resolve());
  })
}

async function createPostFolder(slide) {
  const gatsbyPath = getPath(slide.slideTitle);
  const gatsbyFolder = getFolderPath(gatsbyPath, slide.date);
  
  await createDir(path.join(blogPath, gatsbyFolder));
  await touch(`${blogPath}/${gatsbyFolder}/index.md`);
  await writeGatsbyStream(slide);
}

exports.createGatsbyPosts = async function createGatsbyPosts (slides) {
  // Create folders for each slide
  await Promise.all(slides.map(slide => createPostFolder(slide)));
  
  console.log('Done!');
};

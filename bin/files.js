const fs = require('fs');
const path = require('path');
const { mkDirByPathSync } = require('./utils');

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
  
  createOrReadBase(slide.date).then(() => {
    console.log(`A folder has been created at ${blogPath}`);
    mkDirByPathSync(`${blogPath}/${gatsbyPath}`, () => {

    })
  }).catch(err => {
    console.log(err);
  })
}

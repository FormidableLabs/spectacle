/* eslint-disable func-style */
// we can switch to single-function lodash deps like the cool kids once we've got feature parity,
// keeping in mind this is naught but the build step.
const _ = require('lodash');
const path = require('path');
const getMdFiles = require('./get-md-files');

const sidebarTitleSlugMutation = (mdData, mdPath) => {
  const { name } = path.parse(mdPath);

  mdData.slug = name.toLowerCase();
  mdData.path = `/${name.toLowerCase()}/`;
  const spacedCappedName = name
    .split('-')
    .map(n => _.upperFirst(n))
    .join(' ');

  mdData.title = spacedCappedName;

  if (spacedCappedName.includes('api')) {
    mdData.title = spacedCappedName.replace(/(api)/, v => v.toUpperCase());
  }
};

const sidebarSort = items => _.orderBy(items, ['data.order'], 'asc');

function getSidebarItems(
  mdPath = 'content/',
  items = [],
  mutations = [sidebarTitleSlugMutation],
  sort = sidebarSort
) {
  return getMdFiles(mdPath, items, mutations, sort);
}

module.exports = {
  getSidebarItems
};

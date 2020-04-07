import React from 'react';
import { getSidebarItems } from './static-config-helpers/md-data-transforms';
import { landerBasePath, title } from './src/constants';

const IS_STAGING = process.env.REACT_STATIC_STAGING === 'true';

export default {
  getSiteData: () => ({
    title: title
  }),
  paths: {
    root: process.cwd(), // The root of your project. Don't change this unless you know what you're doing.
    src: 'src', // The source directory. Must include an index.js entry file.
    // See app.js for how stage is used to make client-side routing resolve correctly by stage.
    dist: IS_STAGING ? `dist/${landerBasePath}` : 'dist', // The production output directory.
    devDist: 'tmp/dev-server', // The development scratch directory.
    public: 'public' // The public directory (files copied to dist during build)
  },

  // @TODO revisit these
  // plugins: [
  //   'react-static-plugin-react-router',
  //   'react-static-plugin-sitemap',
  //   'react-static-plugin-styled-components'
  // ],
  basePath: landerBasePath,
  stagingBasePath: landerBasePath,
  devBasePath: '',
  getRoutes: async () => {
    const sidebarItems = await getSidebarItems();
    const sidebarHeaders = sidebarItems.map(d => ({
      title: d.title,
      path: `/${d.slug}/`,
      slug: d.slug
    }));

    return [
      {
        path: '/',
        template: 'src/screens/home'
      },
      {
        path: '/docs',
        template: 'src/screens/docs',
        getData: () => ({
          title: `${title} | Documentation`,
          markdown: sidebarItems[0].markdown,
          renderedMd: sidebarItems[0].content,
          sidebarHeaders,
          tocArray: sidebarItems[0].data.subHeadings.map(sh => ({
            content: sh.value,
            level: sh.depth
          }))
        }),
        // move slug + path to data in transform, renderedMd to data, and nuke markdown prop
        children: sidebarItems.map(
          ({ slug, path, markdown, content, data }) => ({
            path,
            template: 'src/screens/docs',
            getData: () => ({
              title: data.title,
              markdown,
              path: `/${slug}/`,
              renderedMd: content,
              sidebarHeaders,
              tocArray: data.subHeadings.map(sh => ({
                content: sh.value,
                level: sh.depth
              }))
            })
          })
        )
      }
      // we can totes add lander or project specific 404s, if we ever need/want to
      // { path: "/404", template: "src/screens/404" }
    ];
  }
  // Document
};

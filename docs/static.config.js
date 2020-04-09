import Document from './src/html';
import constants from './src/constants';

const isStaging = process.env.REACT_STATIC_STAGING === 'true';

export default {
  paths: {
    src: 'src',
    dist: isStaging ? `dist/${constants.landerBasePath}` : 'dist',
    buildArtifacts: 'node_modules/.cache/react-static/artifacts/',
    devDist: 'node_modules/.cache/react-static/dist/',
    temp: 'node_modules/.cache/react-static/temp/',
    public: 'public' // The public directory (files copied to dist during build)
  },
  plugins: [
    [
      'react-static-plugin-md-pages',
      {
        location: './content',
        template: './src/screens/docs',
        pathPrefix: 'docs'
      }
    ],
    'react-static-plugin-styled-components',
    'react-static-plugin-sitemap',
    'react-static-plugin-react-router'
  ],
  basePath: constants.landerBasePath,
  stagingBasePath: '',
  devBasePath: '',
  Document,
  getSiteData: () => ({
    title: constants.title
  }),
  getRoutes: async () => [
    {
      path: '/',
      template: require.resolve('./src/screens/home')
    },
    {
      path: '404',
      template: require.resolve('./src/screens/404')
    }
  ]
};

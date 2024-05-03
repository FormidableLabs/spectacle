// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const { romanize } = require('./src/utils/numbers');
const lightTheme = require('./src/utils/prismLight.js');
const darkTheme = require('./src/utils/prismDark.js');

async function createConfig() {
  /** @type {import("@docusaurus/types").Config} */
  const config = {
    title: 'Spectacle',
    tagline:
      'A React.js based library for creating sleek presentations using JSX syntax that gives you the ability to live demo your code.',
    url: 'https://formidable.com',
    baseUrl:
      process.env.VERCEL_ENV === 'preview' ? '/' : '/open-source/spectacle',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'formidablelabs',
    projectName: 'spectacle',

    presets: [
      [
        '@docusaurus/preset-classic',
        /** @type {import("@docusaurus/preset-classic").Options} */
        ({
          docs: {
            breadcrumbs: false,
            editUrl:
              'https://github.com/FormidableLabs/spectacle/tree/main/website',
            path: '../docs',
            sidebarCollapsible: true,
            sidebarCollapsed: true,
            sidebarPath: require.resolve('./sidebars.js'),
            showLastUpdateAuthor: false,
            showLastUpdateTime: false
          },
          googleAnalytics: {
            anonymizeIP: true,
            trackingID: 'UA-43290258-1'
          },
          gtag: {
            anonymizeIP: true,
            trackingID: 'GTM-MD32945'
          },
          theme: {
            customCss: [require.resolve('./src/css/custom.scss')]
          },
          ...(process.env.VERCEL_ENV === 'production' && {
            gtag: {
              trackingID: process.env.GTAG_TRACKING_ID,
              anonymizeIP: true
            },
            googleTagManager: {
              containerId: process.env.GTM_CONTAINER_ID
            }
          })
        })
      ]
    ],

    plugins: [
      'docusaurus-plugin-sass',
      [
        '@docusaurus/plugin-client-redirects',
        {
          redirects: [
            {
              from: '/docs/basic-concepts/',
              to: '/docs/'
            }
          ]
        }
      ]
    ],

    themeConfig:
      /** @type {import("@docusaurus/preset-classic").ThemeConfig} */
      ({
        navbar: {
          title: 'SPECTACLE',
          logo: {
            alt: 'Spectacle Logo',
            src: 'svg/nav-logo.svg'
          },
          items: [
            {
              type: 'doc',
              docId: 'index',
              position: 'left',
              label: 'Documentation'
            },
            {
              href: 'https://github.com/FormidableLabs/spectacle',
              className: 'header-github-link',
              'aria-label': 'GitHub Repository',
              position: 'right',
              label: 'GitHub Repository'
            },
            {
              href: 'https://formidable.com',
              className: 'header-formidable-link',
              'aria-label': 'Formidable Website',
              position: 'right',
              label: 'Formidable Website'
            }
          ]
        },
        footer: {
          logo: {
            alt: 'Formidable Labs Logo',
            src: 'svg/formidable-logo-white.svg',
            href: 'https://formidable.com',
            target: '_blank'
          },
          copyright: `© ${romanize(
            new Date().getFullYear()
          )} Formidable Labs, LLC.`
        },
        prism: {} // Keep empty object so we can add prism themes below
      })
  };

  // @ts-expect-error: we know it exists, right
  config.themeConfig.prism.theme = lightTheme;
  // @ts-expect-error: we know it exists, right
  config.themeConfig.prism.darkTheme = darkTheme;
  return config;
}

module.exports = createConfig;

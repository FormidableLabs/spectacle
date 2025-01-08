// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const lightTheme = require('./src/utils/prismLight.js');
const darkTheme = require('./src/utils/prismDark.js');

const title = 'Spectacle';
const subtitle = `${title} - React library for sleek presentations, using JSX syntax`;
const tagline =
  'A React.js based library for creating sleek presentations using JSX syntax that gives you the ability to live demo your code.';

async function createConfig() {
  /** @type {import("@docusaurus/types").Config} */
  const config = {
    title,
    tagline,
    url: 'https://commerce.nearform.com/',
    baseUrl:
      process.env.VERCEL_ENV === 'preview' ? '/' : '/open-source/spectacle',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'Nearform Commerce',
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
              href: 'https://commerce.nearform.com',
              className: 'header-nearform-link',
              'aria-label': 'Nearform Commerce Website',
              position: 'right',
              label: 'Nearform Commerce Website'
            }
          ]
        },
        footer: {
          logo: {
            alt: 'Nearform logo',
            src: 'img/nearform-logo-white.svg',
            href: 'https://commerce.nearform.com',
            width: 100,
            height: 100
          },
          copyright: `Copyright © ${new Date().getFullYear()} Nearform`
        },
        prism: {}, // Keep empty object so we can add prism themes below
        metadata: [
          {
            name: 'title',
            content: subtitle
          },
          {
            name: 'description',
            content: tagline
          },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1, maximum-scale=1'
          },
          {
            property: 'og:type',
            content: 'website'
          },
          {
            property: 'og:url',
            content: 'https://commerce.nearform.com/open-source/spectacle/'
          },
          {
            property: 'og:title',
            content: subtitle
          },
          {
            property: 'og:description',
            content: tagline
          },
          {
            property: 'og:image',
            content:
              'https://commerce.nearform.com/open-source/spectacle/open-graph.png'
          },
          {
            property: 'twitter:card',
            content: 'summary_large_image'
          },
          {
            property: 'twitter:title',
            content: subtitle
          },
          {
            property: 'twitter:description',
            content: tagline
          },
          {
            property: 'twitter:image',
            content:
              'https://commerce.nearform.com/open-source/spectacle/open-graph.png'
          }
        ]
      })
  };

  // @ts-expect-error: we know it exists, right
  config.themeConfig.prism.theme = lightTheme;
  // @ts-expect-error: we know it exists, right
  config.themeConfig.prism.darkTheme = darkTheme;
  return config;
}
module.exports = createConfig;

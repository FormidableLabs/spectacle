// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

function romanize(num) {
  if (!+num) return false;
  const digits = String(+num).split('');
  const key = [
    '',
    'C',
    'CC',
    'CCC',
    'CD',
    'D',
    'DC',
    'DCC',
    'DCCC',
    'CM',
    '',
    'X',
    'XX',
    'XXX',
    'XL',
    'L',
    'LX',
    'LXX',
    'LXXX',
    'XC',
    '',
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX'
  ];
  let roman = '';
  let i = 3;
  while (i--) roman = (key[+digits.pop() + i * 10] || '') + roman;
  return Array(+digits.join('') + 1).join('M') + roman;
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Spectacle',
  tagline:
    'A React.js based library for creating sleek presentations using JSX syntax that gives you the ability to live demo your code.',
  url: 'https://formidable.com',
  baseUrl: '/open-source/spectacle/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'formidablelabs',
  projectName: 'spectacle',

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
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
          customCss: require.resolve('./src/css/custom.scss')
        }
      })
    ]
  ],

  plugins: ['docusaurus-plugin-sass'],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'SPECTACLE',
        logo: {
          alt: 'Spectacle Logo',
          src: 'svg/nav-logo.svg'
        },
        items: [
          // {
          //   type: 'doc',
          //   docId: 'advanced-concepts',
          //   position: 'left',
          //   label: 'Testing Internal Link'
          // },
          // {
          //   href: 'https://github.com/FormidableLabs/spectacle',
          //   'aria-label': 'GitHub Repository',
          //   label: 'Testing External Link',
          //   position: 'left'
          // },
          {
            href: 'https://github.com/FormidableLabs/spectacle',
            className: 'header-github-link',
            'aria-label': 'GitHub Repository',
            position: 'right'
          },
          {
            href: 'https://formidable.com',
            className: 'header-formidable-link',
            'aria-label': 'Formidable Website',
            position: 'right'
          }
        ]
      },
      footer: {
        logo: {
          alt: 'Formidable Labs Logo',
          src: 'svg/formidable-icon-white.svg'
        },
        copyright: `© ${romanize(
          new Date().getFullYear()
        )} Formidable Labs, LLC.`
        // links: [
        //   {
        //     items: [
        //       {
        //         html: `<img src="./src/img/logo_formidable_white.png" alt="Formidable Labs Logo" />`
        //       }
        //     ]
        //   },
        //   {
        //     items: [
        //       {
        //         label: 'Open Source', //Link text
        //         href: '#' //Link target
        //       },
        //       {
        //         label: 'Contact',
        //         href: '#'
        //       },
        //       {
        //         label: 'Careers',
        //         href: '#'
        //       }
        //     ]
        //   },
        //   {
        //     items: [
        //       {
        //         html: `<p>Formidable is a global design and engineering consultancy and open source software organization, specializing in React.js, React Native, GraphQL, Node.js, and the extended JavaScript ecosystem. We have locations in Seattle, London, Toronto, Denver, and Phoenix with remote consultants worldwide. For more information please visit formidable.com.</p>`
        //       }
        //     ]
        //   }
        // ]
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      }
    })
};

module.exports = config;

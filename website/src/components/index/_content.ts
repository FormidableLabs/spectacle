/* eslint-disable quotes*/
const content = {
  /*
   * HEADER
   * @param {string} meta-theme - Light, Dark, Color
   * @param {boolean} meta-noMargin - true, false
   * @param {boolean} meta-noPadding - true, false
   * @param {boolean} formidableBadge - true, false
   * @param {string} bgImage - path to jpg image for background
   * @param {string} hero-title - section title text
   * @param {string} hero-tagline - longer body copy below title
   * @param {string} hero-installScript - text to display in install script
   * @param {string} hero-featuredButtonText - button label
   * @param {string} hero-featuredButtonUrl - button URL
   * @param {array} hero-navList - list of nav items
   * @param {string} hero-navList-item-text - text label
   * @param {string} hero-navList-item-url - link URL
   */
  header: {
    meta: {
      theme: 'Dark',
      noMargin: false,
      noPadding: true
    },
    formidableBadge: true,
    bgImage: require('@site/static/img/hero-bg.jpg').default,
    hero: {
      title: 'Spectacle',
      tagline:
        'A React.js based library for creating sleek presentations using JSX syntax that gives you the ability to live demo your code.',
      installScript: 'npm install spectacle',
      featureButtonText: 'Documentation',
      featureButtonUrl: 'docs/basic-concepts/',
      navList: [
        {
          text: 'Docs',
          url: 'docs/basic-concepts/'
        },
        {
          text: 'Issues',
          url: 'https://www.github.com/FormidableLabs/spectacle/issues'
        },
        {
          text: 'GitHub',
          url: 'https://github.com/FormidableLabs/spectacle'
        }
      ]
    }
  },
  /*
   * FOOTER
   * @param {string} meta-theme - Light, Dark, Color
   * @param {boolean} meta-noMargin - true, false
   * @param {boolean} meta-noPadding - true, false
   */
  footer: {
    meta: {
      theme: 'Dark',
      noMargin: false,
      noPadding: false
    }
  },
  /*
   * FEATURES
   * @param {string} meta-theme - Light, Dark, Color
   * @param {boolean} meta-noMargin - true, false
   * @param {boolean} meta-noPadding - true, false
   * @param {string} title - section title text
   * @param {array} featureList - list of features
   * @param {string} feature-title - feature title
   * @param {string} feature-description - feature description
   * @param {string} feature-svg - path to svg image
   */
  features: {
    meta: {
      theme: 'Color',
      noMargin: false,
      noPadding: false
    },
    title: 'Features',
    featureList: [
      {
        title: 'Interactive Presentations',
        description:
          'Add clickable elements and other interactivity to make your presentations pop.',
        Svg: require('@site/static/svg/feature-01.svg').default
      },
      {
        title: 'Live-Preview Your Code',
        description:
          'Show people more than just a code block - demo the final project in real-time without leaving your presentation deck.',
        Svg: require('@site/static/svg/feature-02.svg').default
      },
      {
        title: '... and More!',
        description:
          'Polish off your presentation with auto-formatting, easy themeing, image dimming, and other fun touches available out of the box.',
        Svg: require('@site/static/svg/feature-03.svg').default
      }
    ]
  },
  /*
   * PREVIEW (VIDEO)
   * @param {string} meta-theme - Light, Dark, Color
   * @param {boolean} meta-noMargin - true, false
   * @param {boolean} meta-noPadding - true, false
   * @param {string} title - section title text
   * @param {string} longText - longer body copy above the video (optional, only displayed of present)
   * @param {string} videoAssets-bgMp4 - path to mp4 video
   * @param {string} videoAssets-bgWebm - path to webm video
   * @param {string} videoAssets-bgStill - path to poster image
   * @param {string} videoAssets-demoUrl - link to live demo
   * @param {string} buttonText - button label (optional, only displayed of present)
   * @param {string} buttonUrl - button URL (optional, only displayed of present)
   */
  preview: {
    meta: {
      theme: 'Light',
      noMargin: false,
      noPadding: false
    },
    title: 'Code Preview',
    longText: '',
    videoAssets: {
      bgMp4: require('@site/static/vid/video.mp4').default,
      bgWebm: require('@site/static/vid/video.webm').default,
      bgStill: require('@site/static/img/video-poster.png').default,
      demoUrl:
        'https://raw.githack.com/FormidableLabs/spectacle/main/examples/one-page/index.html'
    },
    buttonText: '',
    buttonUrl: ''
  },
  /*
   * GET STARTED (CTA)
   * @param {string} meta-theme - Light, Dark, Color
   * @param {boolean} meta-noMargin - true, false
   * @param {boolean} meta-noPadding - true, false
   * @param {string} title - section title text
   * @param {string} longText - longer body copy
   * @param {string} primaryButtonText - button label
   * @param {string} primaryButtonUrl - button URL
   * @param {string} secondaryButtonText - button label (optional, only displayed of present)
   * @param {string} secondaryButtonUrl - button URL (optional, only displayed of present)
   */
  getStarted: {
    meta: {
      theme: 'Color',
      noMargin: false,
      noPadding: false
    },
    title: 'Get Started',
    longText:
      'There are several flexible options for getting started with Spectacle, using either JSX or MDX syntax - dive into the documentation to see all the ways you can get a presentation up and running.',
    primaryButtonText: 'Documentation',
    primaryButtonUrl: 'docs/basic-concepts/',
    secondaryButtonText: '',
    secondaryButtonUrl: ''
  },
  /*
   * MORE (OSS)
   * @param {string} meta-theme - Light, Dark, Color
   * @param {boolean} meta-noMargin - true, false
   * @param {boolean} meta-noPadding - true, false
   * @param {string} title - section title text
   * @param {string} longText - longer body copy above the products (optional, only displayed of present)
   * @param {array} productList - list of featured products
   * @param {string} product-title - product title
   * @param {string} product-description - product description
   * @param {string} product-link - product link URL
   * @param {string} product-abbreviation - letters for badge (only if not featured)
   * @param {string} product-color - hex color for badge (only if not featured)
   * @param {string} buttonText - button label
   * @param {string} buttonUrl - button URL
   */
  oss: {
    meta: {
      theme: 'Light',
      noMargin: false,
      noPadding: false
    },
    title: 'More Open Source from Formidable',
    longText: '',
    productList: [
      {
        title: 'Nuka',
        description:
          'Small, fast and accessibility-first React carousel library with easily customizable UI and behavior to fit your brand and site.',
        link: 'https://github.com/FormidableLabs/nuka-carousel'
      },
      {
        title: 'Victory',
        description:
          'An ecosystem of modular data visualization components for React. Friendly and flexible.',
        link: 'https://formidable.com/open-source/victory'
      },
      {
        title: 'urql',
        description:
          'Universal React Query Library is a blazing-fast GraphQL client, exposed as a set of ReactJS components.',
        link: 'https://formidable.com/open-source/urql/'
      },
      {
        title: 'Runpkg',
        description:
          'The online package explorer. Runpkg turns any npm package into an interactive and informative browsing experience.',
        abbreviation: 'Rp',
        color: '#80eac7',
        link: 'https://www.runpkg.com/'
      }
    ],
    buttonText: 'View All',
    buttonUrl: 'https://formidable.com/open-source/'
  }
};

export default content;

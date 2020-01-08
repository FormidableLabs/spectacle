/* eslint-disable filenames/match-regex */
/* eslint-disable quotes*/
const content = {
  features: [
    {
      title: 'Interactive Presentations',
      description:
        'Add clickable elements and other interactivity to make your presentations pop.',
      icon: require('../../static/svgs/button.svg')
    },
    {
      title: 'Live-Preview Your Code',
      description:
        'Show people more than just a code block - demo the final project in real-time without leaving your presentation deck.',
      icon: require('../../static/svgs/code-preview.svg')
    },
    {
      title: 'Auto-Size Text, Image Dimming, and More',
      description:
        "On top of all of Spectacle's helpful features, you can also make your presentation look amazing with auto-formatting, easy themeing abilities, image dimming, and lots of other fun touches",
      icon: require('../../static/svgs/amazing.svg')
    }
  ],
  preview: {
    description: '',
    media: ''
  },
  getStarted: {
    description:
      'There are several flexible options for getting started with Spectacle, using either JSX or MDX syntax - dive into the documentation to see all the ways you can get a presentation up and running.',
    link: '/docs'
  },
  oss: [
    {
      title: 'Victory',
      description:
        'An ecosystem of modular data visualization components for React. Friendly and flexible.',
      logo: require('../../static/svgs/logo_victory.svg'),
      link: 'https://formidable.com/open-source/victory',
      hasOwnLogo: true
    },
    {
      title: 'Development Dashboards',
      description:
        'Dashboards to organize and intuitively display your dev server and tooling output.',
      abbreviation: 'Dd',
      color: '#8bd48b',
      number: '17',
      link: 'https://formidable.com/open-source/development-dashboards/'
    },
    {
      title: 'React Animations',
      description:
        'A collection of animations that can be used with many inline style libraries, such as Radium or Aphrodite.',
      abbreviation: 'Ra',
      color: '#86b9e6',
      number: '03',
      link: 'https://formidable.com/open-source/react-animations'
    },
    {
      title: 'Enzyme Matchers',
      description:
        'Run common assertions on your React components using Enzyme in a Jest or Jasmine environment.',
      abbreviation: 'Em',
      color: '#e48055',
      number: '09',
      link: 'https://formidable.com/open-source/jest-enzyme/'
    }
  ]
};

export default content;

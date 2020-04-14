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
      title: '... and More!',
      description:
        'Polish off your presentation with auto-formatting, easy themeing, image dimming, and other fun touches available out of the box.',
      icon: require('../../static/svgs/amazing.svg')
    }
  ],
  preview: {
    bgMp4: require('../../../public/static/bg-demo.mp4'),
    bgStill: require('../../../public/static/bg-still.png'),
    bgWebm: require('../../../public/static/bg-demo.webm'),
    demoUrl:
      'https://raw.githack.com/FormidableLabs/spectacle/master/examples/one-page.html'
  },
  getStarted: {
    description:
      'There are several flexible options for getting started with Spectacle, using either JSX or MDX syntax - dive into the documentation to see all the ways you can get a presentation up and running.',
    link: '/docs'
  },
  oss: [
    {
      title: 'Renature',
      description:
        'A collection of animations that can be used with many inline style libraries, such as Radium or Aphrodite.',
      link: 'https://formidable.com/open-source/react-animations'
    },
    {
      title: 'Victory',
      description:
        'An ecosystem of modular data visualization components for React. Friendly and flexible.',
      link: 'https://formidable.com/open-source/victory'
    },
    {
      title: 'Enzyme Matchers',
      description:
        'Run common assertions on your React components using Enzyme in a Jest or Jasmine environment.',
      abbreviation: 'Em',
      color: '#e48055',
      link: 'https://formidable.com/open-source/jest-enzyme/'
    },
    {
      title: 'React Animations',
      description:
        'A collection of animations that can be used with many inline style libraries, such as Radium or Aphrodite.',
      abbreviation: 'Ra',
      color: '#86b9e6',
      link: 'https://formidable.com/open-source/react-animations'
    }
  ]
};

export default content;

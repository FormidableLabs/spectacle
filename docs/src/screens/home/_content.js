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
    bgMp4: require('../../assets/demo-presentation.mp4'),
    bgStill: require('../../assets/demo-still.png'),
    bgWebm: require('../../assets/demo-presentation.webm'),
    demoUrl:
      'https://raw.githack.com/FormidableLabs/spectacle/master/examples/one-page.html'
  },
  getStarted: {
    description:
      'There are several flexible options for getting started with Spectacle, using either JSX or MDX syntax - dive into the documentation to see all the ways you can get a presentation up and running.',
    link: '/docs/basic-concepts/'
  },
  oss: [
    {
      title: 'Renature',
      description:
        'A collection of animations that can be used with many inline style libraries, such as Radium or Aphrodite.',
      link: 'https://formidable.com/open-source/renature'
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
  ]
};

export default content;

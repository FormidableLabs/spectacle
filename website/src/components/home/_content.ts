/* eslint-disable quotes*/
const content = {
  features: [
    {
      title: 'Interactive Presentations',
      description:
        'Add clickable elements and other interactivity to make your presentations pop.',
      Svg: require('@site/static/svg/button.svg').default
    },
    {
      title: 'Live-Preview Your Code',
      description:
        'Show people more than just a code block - demo the final project in real-time without leaving your presentation deck.',
      Svg: require('@site/static/svg/code-preview.svg').default
    },
    {
      title: '... and More!',
      description:
        'Polish off your presentation with auto-formatting, easy themeing, image dimming, and other fun touches available out of the box.',
      Svg: require('@site/static/svg/amazing.svg').default
    }
  ],
  preview: {
    bgMp4: require('@site/static/vid/demo-presentation.mp4').default,
    bgStill: require('@site/static/img/demo-still.png').default,
    bgWebm: require('@site/static/vid/demo-presentation.webm').default,
    demoUrl:
      'https://raw.githack.com/FormidableLabs/spectacle/main/examples/one-page.html'
  },
  getStarted: {
    description:
      'There are several flexible options for getting started with Spectacle, using either JSX or MDX syntax - dive into the documentation to see all the ways you can get a presentation up and running.',
    link: 'docs/basic-concepts/'
  },
  oss: [
    {
      title: 'Renature',
      description:
        'A physics-based animation library for React inspired by the natural world.',
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

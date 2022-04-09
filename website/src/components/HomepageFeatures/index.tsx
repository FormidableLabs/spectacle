import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Interactive Presentations',
    Svg: require('@site/static/img/button.svg').default,
    description: (
      <>
        Add clickable elements and other interactivity to make your presentations pop.
      </>
    ),
  },
  {
    title: 'Live-Preview Your Code',
    Svg: require('@site/static/img/code-preview.svg').default,
    description: (
      <>
        Show people more than just a code block - demo the final project in real-time without leaving your presentation deck.
      </>
    ),
  },
  {
    title: '... and More!',
    Svg: require('@site/static/img/amazing.svg').default,
    description: (
      <>
        Polish off your presentation with auto-formatting, easy themeing, image dimming, and other fun touches available out of the box.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

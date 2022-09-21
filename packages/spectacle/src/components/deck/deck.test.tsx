import Deck from './index';
import Slide from '../slide/slide';
import { render } from '@testing-library/react';
import { CSSObject } from 'styled-components';

describe('<Deck />', () => {
  it('should allow for backdrop color overrides from theme prop', () => {
    const deckWithStyle = (
      backdropStyle: CSSObject,
      Backdrop?: React.ElementType
    ) => (
      <Deck className="backdrop" theme={{ backdropStyle, Backdrop }}>
        <Slide>Hi</Slide>
      </Deck>
    );
    let { container, rerender } = render(deckWithStyle({ padding: 16 }));

    expect(container.querySelector('.backdrop')).toHaveStyle({
      backgroundColor: 'black'
    });

    rerender(deckWithStyle({ backgroundColor: 'blue' }));
    expect(container.querySelector('.backdrop')).toHaveStyle({
      backgroundColor: 'blue'
    });

    rerender(deckWithStyle({ background: 'red' }));
    expect(container.querySelector('.backdrop')).toHaveStyle({
      backgroundColor: 'red'
    });

    rerender(deckWithStyle({}, 'section'));
    expect(container.querySelector('.backdrop')).not.toHaveStyle({
      backgroundColor: 'black'
    });
  });
});

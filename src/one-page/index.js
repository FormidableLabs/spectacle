// eslint-disable-next-line import/no-unresolved
import htm from 'https://unpkg.com/htm?module';

import {
  Deck,
  Slide,
  Heading // eslint-disable-next-line import/no-unresolved
} from 'https://unpkg.com/spectacle@5.5.0/es/index.js?module';

// eslint-disable-next-line no-undef
const html = htm.bind(React.createElement);

const Pres = () =>
  html`
    <${Deck} >
        <${Slide} bgColor="offwhite"> 
            <${Heading}>
                1
            </${Heading}> 
        </${Slide}>
    </${Deck}>
  `;

// eslint-disable-next-line no-undef
ReactDOM.render(
  html`
    <${Pres} />
  `,
  document.querySelector('.app')
);

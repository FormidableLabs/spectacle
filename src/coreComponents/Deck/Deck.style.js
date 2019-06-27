import styled from 'styled-components';

const DeckContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  > div {
    width: inherit;
    height: inherit;
  }
`;

export { DeckContainer };

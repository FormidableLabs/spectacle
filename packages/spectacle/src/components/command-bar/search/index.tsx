import styled from 'styled-components';
import { KBarPortal, KBarPositioner, KBarAnimator, KBarSearch } from 'kbar';
import CommandBarResults from '../results';

const KBarSearchStyled = styled(KBarSearch)`
  padding: 12px 16px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  border: none;
`;

const KBarAnimatorStyled = styled(KBarAnimator)`
  max-width: 600px;
  width: 100%;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: rgb(0 0 0 / 50%) 0px 16px 70px;
`;

const CommandBarSearch = () => {
  return (
    <KBarPortal>
      <KBarPositioner>
        <KBarAnimatorStyled>
          <KBarSearchStyled />
          <CommandBarResults />
        </KBarAnimatorStyled>
      </KBarPositioner>
    </KBarPortal>
  );
};

export default CommandBarSearch;

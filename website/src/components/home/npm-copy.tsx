import React, { useState } from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BounceAnimation } from '@site/src/components/global/bounce-animation';

const HeroNPMWrapper = styled.div`
  flex-direction: row;
  justify-content: stretch;
  width: 30rem;
  display: flex;
  flex: 1 0 auto;
`;

const HeroNPMCopy = styled.p`
  width: 22rem;
  height: 4rem;
  color: #383838;
  background-color: #d5d5d5;
  color: black;
  text-align: left;
  padding: 0.33rem 1.5rem;
  line-height: 3.44rem;
  font-size: 14px;
  letter-spacing: 0.2px;
  margin: 0;
  flex: 1 0 auto;
`;

const HeroNPMButton = styled.button`
  width: 8rem;
  height: 4rem;
  background: ${({ theme }) => theme.colors.bg};
  transition: background 0.4s;
  font-size: 14px;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.textDark};
  border: 0;
  text-transform: uppercase;
  cursor: copy;
  &:hover {
    background: ${({ theme }) => theme.colors.buttonLightHover};
  }
`;

interface Text {
  text: string;
}

function NpmCopy(props: Text): JSX.Element {
  const [animating, setAnimating] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleCopy(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();

    setAnimating(true);
    setCopied(true);

    setTimeout(() => {
      setAnimating(false);
    }, 100);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }

  return (
    <CopyToClipboard text={props.text}>
      <HeroNPMWrapper>
        <HeroNPMCopy>{props.text}</HeroNPMCopy>
        <HeroNPMButton onClick={handleCopy}>
          <BounceAnimation bouncing={animating}>
            {copied ? 'Copied' : 'Copy'}
          </BounceAnimation>
        </HeroNPMButton>
      </HeroNPMWrapper>
    </CopyToClipboard>
  );
}

export default NpmCopy;

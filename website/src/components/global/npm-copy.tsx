import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import BounceAnimation from '@site/src/components/global/bounce-animation';
import styles from './npm-copy.module.scss';

interface Text {
  text: string;
}

function NpmCopy(props: Text) {
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
      <button onClick={handleCopy} className={styles.heroNPMWrapper}>
        <code className={styles.heroNPMCopy}>{props.text}</code>
        <span className={styles.heroNPMButton}>
          <BounceAnimation bouncing={animating}>
            {copied ? 'Copied' : 'Copy'}
          </BounceAnimation>
        </span>
      </button>
    </CopyToClipboard>
  );
}

export default NpmCopy;

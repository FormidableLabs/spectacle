import React from 'react';
import BodyCopy from '@site/src/components/global/body-copy';
import Button from '@site/src/components/global/button';
import SectionTitle from '@site/src/components/global/section-title';
import Stack from '@site/src/components/global/stack';
import Wrapper from '@site/src/components/global/wrapper';
import styles from './get-started.module.scss';

interface Meta {
  theme: string;
  noMargin: boolean;
  noPadding: boolean;
}

export default function GetStarted({ content }): JSX.Element {
  const {
    meta,
    title,
    longText,
    primaryButtonText,
    primaryButtonUrl,
    secondaryButtonText,
    secondaryButtonUrl
  }: {
    meta: Meta;
    title: string;
    longText: string;
    primaryButtonText: string;
    primaryButtonUrl: string;
    secondaryButtonText: string;
    secondaryButtonUrl: string;
  } = content;

  return (
    <Wrapper background={meta.theme}>
      <Stack>
        <SectionTitle theme={meta.theme}>{title}</SectionTitle>
        <BodyCopy theme={meta.theme}>{longText}</BodyCopy>
        <div className={styles.buttons}>
          <Button as={'link'} theme={meta.theme} to={primaryButtonUrl}>
            {primaryButtonText}
          </Button>
          {secondaryButtonText && secondaryButtonUrl && (
            <Button as={'link'} theme={meta.theme} to={secondaryButtonUrl}>
              {secondaryButtonText}
            </Button>
          )}
        </div>
      </Stack>
    </Wrapper>
  );
}

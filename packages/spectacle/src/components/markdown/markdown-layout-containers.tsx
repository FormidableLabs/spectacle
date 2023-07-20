import React, { PropsWithChildren } from 'react';
import { FlexBox } from '../layout-primitives';

export const Columns = ({ children }: PropsWithChildren) => (
  <FlexBox flexDirection="row" alignItems="start" flex={1}>
    {children}
  </FlexBox>
);

export const Center = ({ children }: PropsWithChildren) => (
  <FlexBox justifyContent="center" alignItems="center" height="100%">
    {children}
  </FlexBox>
);

export const hasLayoutConfig =
  (layoutKey: string) => (config?: Record<string, string>) =>
    config && 'layout' in config && config.layout === layoutKey;

import React, { PropsWithChildren } from 'react';
import { Box, FlexBox } from '../layout-primitives';

export const Columns = ({ children }: PropsWithChildren) => (
  <FlexBox flexDirection="row" alignItems="start" flex={1}>
    {children}
  </FlexBox>
);

export const Center = ({ children }: PropsWithChildren) => (
  <FlexBox justifyContent="center" alignItems="center" height="100vh">
    <Box>{children}</Box>
  </FlexBox>
);

export const hasLayoutConfig =
  (layoutKey: string) => (config?: Record<string, string>) =>
    config && 'layout' in config && config.layout === layoutKey;

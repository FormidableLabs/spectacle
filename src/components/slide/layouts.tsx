import { ReactNode } from 'react';
import { Box, FlexBox } from '../layout';

export const Center = ({ children }: { children: ReactNode }) => {
  return (
    <FlexBox justifyContent="center" alignItems="center" height="100%">
      <Box>{children}</Box>
    </FlexBox>
  );
};

export const TwoColumn = ({
  left,
  right
}: {
  left: ReactNode;
  right: ReactNode;
}) => {
  return (
    <FlexBox flexDirection="row" alignItems="start" flex={1}>
      <Box width="100%">{left}</Box>
      <Box width="100%">{right}</Box>
    </FlexBox>
  );
};

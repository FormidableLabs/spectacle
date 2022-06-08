import { ReactElement } from 'react';
import { Box, FlexBox } from '../layout';

export const TwoColumn = ({
  left,
  right
}: {
  left: ReactElement;
  right: ReactElement;
}) => {
  return (
    <FlexBox flexDirection="row" alignItems="start" flex={1}>
      <Box width="100%">{left}</Box>
      <Box width="100%">{right}</Box>
    </FlexBox>
  );
};

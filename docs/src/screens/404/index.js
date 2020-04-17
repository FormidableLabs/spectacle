import React from 'react';
import Docs from '../docs';
import NotFoundPage from './404';

const NotFound = () => {
  return (
    <Docs isLoading>
      <NotFoundPage />
    </Docs>
  );
};

export default NotFound;

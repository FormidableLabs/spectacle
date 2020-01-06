import React from 'react';

let Analytics = React.Fragment;

if (typeof document !== 'undefined') {
  Analytics = require('react-router-ga').default;
}

// eslint-disable-next-line react/prop-types
export default ({ children, ...rest }) => {
  if (typeof document !== 'undefined') {
    // fragment doesn't like it when you try to give it attributes
    return <Analytics {...rest}>{children}</Analytics>;
  }
  return <Analytics>{children}</Analytics>;
};

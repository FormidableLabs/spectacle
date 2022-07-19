import * as React from 'react';

export default function BasicConcepts() {
  React.useEffect(() => {
    const url = new URL(window.location.href);
    url.pathname = 'open-source/spectacle/docs/';
    window.location.replace(url);
  }, []);

  return null;
}

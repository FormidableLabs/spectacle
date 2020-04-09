import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useMarkdownPage } from 'react-static-plugin-md-pages';

const parsePathname = pathname => {
  const match = pathname && pathname.match(/#[a-z|-]+/);
  return match && match[1];
};

export const ScrollToTop = () => {
  const inputRef = useRef(null);
  const location = useLocation();
  const md = useMarkdownPage();

  const hash = location.hash || parsePathname(location.pathname);

  useEffect(() => {
    if (hash && md) {
      inputRef.current.click();
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, md]);

  return <a href={hash} ref={inputRef} />;
};

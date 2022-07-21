import React from 'react';
import DocSidebar from '@theme-original/DocSidebar';

export default function DocSidebarWrapper({ sidebar, ...rest }) {
  const filtered = sidebar.filter(f => f.docId !== 'index');
  return (
    <>
      <DocSidebar sidebar={filtered} {...rest} />
    </>
  );
}

import React from 'react';
import '@testing-library/jest-dom';
// We assign React to global for Jest since webpack automatically
// provides @babel/preset-react when the project is built.
// @ts-ignore
global.React = React;

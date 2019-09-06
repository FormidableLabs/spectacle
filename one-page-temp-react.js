/**
 * es-react needs exports for the individual methods.
 *
 * This is a shim until things are fixed from:
 * https://unpkg.com/browse/react-ecmascript@1.4.4/react.development.mjs
 */

import React from 'https://unpkg.com/es-react@16.8.60/src/react.js';

export default React;

const {
  Children,

  createRef,
  Component,
  PureComponent,

  createContext,
  forwardRef,
  lazy,
  memo,

  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useDebugValue,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,

  Fragment,
  StrictMode,
  Suspense,

  createElement,
  cloneElement,
  createFactory,
  isValidElement,

  version,

  unstable_ConcurrentMode,
  unstable_Profiler,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
} = React;
export {
  Children,

  createRef,
  Component,
  PureComponent,

  createContext,
  forwardRef,
  lazy,
  memo,

  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useDebugValue,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,

  Fragment,
  StrictMode,
  Suspense,

  createElement,
  cloneElement,
  createFactory,
  isValidElement,

  version,

  unstable_ConcurrentMode,
  unstable_Profiler,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
};

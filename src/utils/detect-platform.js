export const isWindows = () =>
  navigator.platform.toLowerCase().includes('win32');

export const isMacOS = () =>
  navigator.platform.toLowerCase().includes('macintel');

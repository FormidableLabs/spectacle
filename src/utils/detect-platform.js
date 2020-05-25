export const isWindows = () =>
  navigator.platform.toLowerCase().includes('win32');

export const isMacOS = () =>
  navigator.platform.toLowerCase().includes('macintel');

export const isLinux = () => navigator.platform.toLowerCase().includes('linux');

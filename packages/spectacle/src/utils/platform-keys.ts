/*
 * Check if operating system is MacOS
 */
export function isPlatformMacOS() {
  return /Mac|iPad|iPhone/.test(navigator.userAgent);
}

/*
 * Get operating system specific key
 */
export function getKeyForOS(key: KeyType) {
  const isMacOS = isPlatformMacOS();

  const replacementKeyMap = {
    alt: isMacOS ? '⌥' : 'Alt',
    ctrl: isMacOS ? '^' : 'Ctrl',
    mod: isMacOS ? '⌘' : 'Ctrl',
    shift: isMacOS ? '⇧' : 'Shift'
  };

  return replacementKeyMap[key] ?? key;
}

/**
 * Prettifies keyboard shortcuts in a platform-agnostic way.
 */
export function prettifyShortcut(shortcut: string[]): string[] {
  return shortcut
    .join('+')
    .toLowerCase()
    .replace('alt', getKeyForOS('alt'))
    .replace('ctrl', getKeyForOS('ctrl'))
    .replace('mod', getKeyForOS('mod'))
    .replace('shift', getKeyForOS('shift'))
    .replace('left', '←')
    .replace('up', '↑')
    .replace('right', '→')
    .replace('down', '↓')
    .replace('delete', '⌫')
    .replace('enter', '⏎')
    .split('+')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1));
}

export type KeyType = 'alt' | 'ctrl' | 'mod' | 'shift';

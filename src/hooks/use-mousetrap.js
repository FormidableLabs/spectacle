import * as React from 'react';
import Mousetrap from 'mousetrap';

/*
 * Hook for binding functions to keyboard bindings. Will throw an error if the
 * value of the keybind combination is not a function.
 */
export default function useMousetrap(keybinds, deps) {
  React.useEffect(() => {
    for (const combo in keybinds) {
      const callback = keybinds[combo];
      if (typeof callback !== 'function') {
        throw new TypeError(
          `Expected type 'function' in useMousetrap for combo '${combo}', but got ${typeof callback}`
        );
      }
      Mousetrap.bind(combo, callback);
    }
    return () => {
      for (const combo in keybinds) {
        Mousetrap.unbind(combo);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keybinds, ...deps]);
}

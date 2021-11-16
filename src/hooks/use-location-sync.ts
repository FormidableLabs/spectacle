import * as React from 'react';
import { createBrowserHistory } from 'history';
import QS from 'query-string';
import isEqual from 'react-fast-compare';
import { mergeAndCompare, merge } from 'merge-anything';
import { DeckView } from './use-deck-state';
import {
  mapLocationToState,
  mapStateToLocation
} from '../location-map-fns/query-string';

// Needed to properly merge query strings. (Hook consumers can also provide
// their own merge function if necessary)
function defaultMergeLocation(object, ...sources) {
  return mergeAndCompare(
    (left, right, key) => {
      switch (key) {
        case 'search':
          if (!left) return right;
          return (
            '?' +
            QS.stringify({
              ...QS.parse(left),
              ...QS.parse(right)
            })
          );
        default:
          return merge(left, right);
      }
    },
    object,
    ...sources
  );
}

type LocationStateOptions = {
  setState(state: Partial<DeckView>): void;
  mapStateToLocation: typeof mapStateToLocation;
  mapLocationToState: typeof mapLocationToState;
  mergeLocation?: typeof defaultMergeLocation;
  historyFactory?: typeof createBrowserHistory;
  disableInteractivity?: boolean;
};

// Hook to keep some external state synchronized with the history location.
export default function useLocationSync({
  setState,
  mapStateToLocation,
  mapLocationToState,
  disableInteractivity = false,
  mergeLocation = defaultMergeLocation,
  historyFactory = createBrowserHistory
}: LocationStateOptions) {
  const [history] = React.useState(() => historyFactory());
  const [initialized, setInitialized] = React.useState(false);

  // "down-sync" from location to state
  React.useEffect(() => {
    if (!initialized && disableInteractivity) return;
    return history.listen((location, action) => {
      setState(mapLocationToState(location));
    });
  }, [
    disableInteractivity,
    initialized,
    history,
    setState,
    mapLocationToState
  ]);

  const syncLocation = React.useCallback(
    (defaultState: DeckView) => {
      if (disableInteractivity) {
        return;
      }
      // perform initial two-way sync between location and state (state wins)
      const { location } = history;
      const initialState: DeckView = merge(
        defaultState || {},
        mapLocationToState(location)
      );
      const nextLocation = mergeLocation(
        {},
        location,
        mapStateToLocation(initialState)
      );
      history.replace(nextLocation);
      setInitialized(true);
      return initialState;
    },
    [
      history,
      mapLocationToState,
      mapStateToLocation,
      disableInteractivity,
      mergeLocation
    ]
  );

  const setLocation = React.useCallback(
    state => {
      if (!initialized) return;
      // perform one-way sync to history
      const { location } = history;
      const nextLocation = mergeLocation(
        {},
        location,
        mapStateToLocation(state)
      );
      if (!isEqual(location, nextLocation)) {
        history.push(nextLocation);
      }
    },
    [history, initialized, mergeLocation, mapStateToLocation]
  );

  return [syncLocation, setLocation] as const;
}

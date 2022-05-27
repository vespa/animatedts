import { DirectionsNavigateKeys } from '../state/action-types'

export const useArrowControl = () => {
  const wrap =
    (action: (e: KeyboardEvent) => void, key: DirectionsNavigateKeys) =>
    (e: KeyboardEvent) => {
      if (e.code === key && !e.repeat) {
        action(e);
      }
    };

  const commandFactory = (key: DirectionsNavigateKeys) => {
    return {
      onPlay: (action: (e: KeyboardEvent) => void) => {
        const command = wrap(action, key);
        window.addEventListener("keydown", command, true);
      },
      onStop: (action: (e: KeyboardEvent) => void) => {
        const command = wrap(action, key);
        window.addEventListener("keyup", command, true);
      },
    };
  };

  return {
    up: commandFactory(DirectionsNavigateKeys.UP),
    down: commandFactory(DirectionsNavigateKeys.DOWN),
    left: commandFactory(DirectionsNavigateKeys.LEFT),
    right: commandFactory(DirectionsNavigateKeys.RIGHT)
  };
};

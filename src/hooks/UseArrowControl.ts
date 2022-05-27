import { ActionNavigateTypeKeys } from '../state/action-types'

export const useArrowControl = () => {
  const wrap =
    (action: (e: KeyboardEvent) => void, key: ActionNavigateTypeKeys) =>
    (e: KeyboardEvent) => {
      if (e.code === key && !e.repeat) {
        action(e);
      }
    };

  const commandFactory = (key: ActionNavigateTypeKeys) => {
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
    up: commandFactory(ActionNavigateTypeKeys.ARROW_UP),
    down: commandFactory(ActionNavigateTypeKeys.ARROW_DOWN),
    left: commandFactory(ActionNavigateTypeKeys.ARROW_LEFT),
    right: commandFactory(ActionNavigateTypeKeys.ARROW_RIGHT)
  };
};

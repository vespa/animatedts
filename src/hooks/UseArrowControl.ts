import { useState } from "react";
import { ActionNavigateTypeKeys } from '../state/action-types'

export const useArrowControl = () => {
  const [keys, setKeys] = useState(0);
  const wrap =
    (action: (e: KeyboardEvent) => void, key: ActionNavigateTypeKeys) =>
    (e: KeyboardEvent) => {
      if (e.code === key && !e.repeat) {
        action(e);
      }
    };

  const commandFatory = (key: ActionNavigateTypeKeys) => {
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
    up: commandFatory(ActionNavigateTypeKeys.ARROW_UP),
    down: commandFatory(ActionNavigateTypeKeys.ARROW_DOWN),
    left: commandFatory(ActionNavigateTypeKeys.ARROW_LEFT),
    right: commandFatory(ActionNavigateTypeKeys.ARROW_RIGHT),
    keys,
    setKeys,
  };
};

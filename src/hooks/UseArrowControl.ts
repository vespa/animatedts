import { useState } from "react";
import { ActionNavigateType } from '../state/action-types'

export const useArrowControl = () => {
  const [keys, setKeys] = useState(0);
  const wrap =
    (action: (e: KeyboardEvent) => void, key: ActionNavigateType) =>
    (e: KeyboardEvent) => {
      if (e.code === key && !e.repeat) {
        action(e);
      }
    };

  const commandFatory = (key: ActionNavigateType) => {
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
    up: commandFatory(ActionNavigateType.ArrowUp),
    down: commandFatory(ActionNavigateType.ArrowDown),
    left: commandFatory(ActionNavigateType.ArrowLeft),
    right: commandFatory(ActionNavigateType.ArrowRight),
    keys,
    setKeys,
  };
};

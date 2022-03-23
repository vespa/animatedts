import { useState } from "react";

export const useArrowControl = () => {
  const [keys, setKeys] = useState(0);
  enum ArrowProps {
    UP = "ArrowUp",
    DOWN = "ArrowDown",
    RIGHT = "ArrowRight",
    LEFT = "ArrowLeft",
  }
  const wrap =
    (action: (e: KeyboardEvent) => void, key: ArrowProps) =>
    (e: KeyboardEvent) => {
      if (e.code === key && !e.repeat) {
        action(e);
      }
    };

  const commandFatory = (key: ArrowProps) => {
    return {
      onPlay: (action: (e: KeyboardEvent) => void) => {
        setKeys(keys + 1);
        const command = wrap(action, key);
        window.addEventListener("keydown", command, true);
      },
      onStop: (action: (e: KeyboardEvent) => void) => {
        setKeys(keys + 1);
        const command = wrap(action, key);
        window.addEventListener("keyup", command, true);
      },
    };
  };

  return {
    up: commandFatory(ArrowProps.UP),
    down: commandFatory(ArrowProps.DOWN),
    left: commandFatory(ArrowProps.LEFT),
    right: commandFatory(ArrowProps.RIGHT),
  };
};

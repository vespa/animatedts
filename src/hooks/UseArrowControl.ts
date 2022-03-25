import { useState } from "react";

export const useArrowControl = () => {
  const [keys, setKeys] = useState(0);
  enum ArrowProps {
    ArrowUp = "ArrowUp",
    ArrowDown = "ArrowDown",
    ArrowRight = "ArrowRight",
    ArrowLeft = "ArrowLeft",
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
    up: commandFatory(ArrowProps.ArrowUp),
    down: commandFatory(ArrowProps.ArrowRight),
    left: commandFatory(ArrowProps.ArrowLeft),
    right: commandFatory(ArrowProps.ArrowRight),
    keys,
    setKeys,
  };
};

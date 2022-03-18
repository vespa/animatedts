import { useEffect, useState } from "react";

export const useKeyControl = () => {
  const [keysStart, setKeysStart] = useState<Array<(e: KeyboardEvent) => void>>(
    []
  );
  const [keysStop, setKeysStop] = useState<Array<(e: KeyboardEvent) => void>>(
    []
  );

  const onKeyDownAction = (action: (e: KeyboardEvent) => void) => {
    setKeysStart([...keysStart, action]);
  };

  const onKeyUpAction = (action: (e: KeyboardEvent) => void) => {
    setKeysStop([...keysStart, action]);
  };

  const startAction = (e: KeyboardEvent) => {
    keysStart.forEach((item) => item(e));
  };

  const stopAction = (e: KeyboardEvent) => {
    keysStop.forEach((item) => item(e));
    // setRunAction(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", startAction, true);
    window.addEventListener("keyup", stopAction, true);
    return () => {
      window.removeEventListener("keydown", startAction, true);
      window.removeEventListener("keyup", stopAction, true);
    };
  }, [keysStart]);

  return { onKeyDownAction, onKeyUpAction };
};

export const useArrowControl = () => {
  enum ArrowProps {
    UP = "ArrowUp",
    DOWN = "ArrowDown",
    RIGHT = "ArrowRight",
    LEFT = "ArrowLeft",
  }
  const { onKeyDownAction, onKeyUpAction } = useKeyControl();
  const wrap =
    (action: (e: KeyboardEvent) => void, key: ArrowProps) =>
    (e: KeyboardEvent) => {
      if (e.code === key) action(e);
    };
  const commandFatory = (key: ArrowProps) => ({
    onPlay: (action: (e: KeyboardEvent) => void) => {
      onKeyDownAction(wrap(action, key));
    },
    onStop: (action: (e: KeyboardEvent) => void) => {
      onKeyUpAction(wrap(action, key));
    },
  });
  return {
    up: commandFatory(ArrowProps.UP),
    down: commandFatory(ArrowProps.DOWN),
    left: commandFatory(ArrowProps.LEFT),
    right: commandFatory(ArrowProps.RIGHT),
  };
};

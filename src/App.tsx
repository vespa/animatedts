import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { navigateActionCreator } from "./state";
import { Character, Stage } from "components";

export const UseArrowControl = ({ action }: { action: () => void }) => {
  const [runAction, setRunAction] = useState(false);
  const startAction = (e: KeyboardEvent) => {
    console.log(e);
    setRunAction(true);
  };

  const stopAction = () => {
    setRunAction(false);
  };

  useEffect(() => {
    if (runAction) {
      const id = setInterval(() => {
        action();
      }, 20);
      return () => clearInterval(id);
    }
  }, [runAction]);

  useEffect(() => {
    window.addEventListener("keydown", startAction, true);
    window.addEventListener("keyup", stopAction, true);
    return () => {
      window.removeEventListener("keydown", startAction, true);
      window.removeEventListener("keyup", stopAction, true);
    };
  }, []);

  return <></>;
};

function App() {
  // const [timer, setTimer] = useState<NodeJS.Timer>();
  const goto = 10;
  const char1 = "char1";
  const dispatch = useDispatch();
  const { moveTop, moveDown, moveLeft, moveRight } = bindActionCreators(
    navigateActionCreator,
    dispatch
  );

  // let timeout: NodeJS.Timer;

  return (
    <div className="App">
      <button onClick={() => moveTop(char1, goto)}>Move top</button>
      <button onClick={() => moveDown(char1, goto)}>Move down</button>
      <button onClick={() => moveLeft(char1, goto)}>Move left</button>
      <button onClick={() => moveRight(char1, goto)}>Move right</button>
      <br />
      {/* <UseArrowControl action={() => moveTop(char1, goto)} /> */}
      <button onClick={() => moveRight("char2", goto)}>Move right 2</button>
      <Stage size={{ width: 800, height: 600 }}>
        <Character startPosition={{ left: "50%", top: "50%" }} id={char1} />
        <Character startPosition={{ left: "10%", top: "10%" }} id={"char2"} />
      </Stage>
    </div>
  );
}

export default App;

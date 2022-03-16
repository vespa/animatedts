import React from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { navigateActionCreator } from "./state";
import { RootState } from "./state/reducers";
import { Character, Stage } from "components";

function App() {
  const goto = 200;
  const navigate = useSelector((state: RootState) => state.navigate);
  const dispatch = useDispatch();
  const { moveTop, moveDown, moveLeft, moveRight } = bindActionCreators(
    navigateActionCreator,
    dispatch
  );

  return (
    <div className="App">
      {console.log(navigate)}

      <button onClick={() => moveTop(goto)}>Move top</button>
      <button onClick={() => moveDown(goto)}>Move down</button>
      <button onClick={() => moveLeft(goto)}>Move left</button>
      <button onClick={() => moveRight(goto)}>Move right</button>
      <Stage>
        <Character />
      </Stage>
    </div>
  );
}

export default App;

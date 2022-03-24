import "./App.css";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { navigateActionCreator } from "./state";
import { CharacterArrowNav, Stage } from "components";

function App() {
  const goto = 10;
  const char1 = "char1";
  const dispatch = useDispatch();
  const { moveTop, moveDown, moveLeft, moveRight } = bindActionCreators(
    navigateActionCreator,
    dispatch
  );

  return (
    <div className="App">
      <button onClick={() => moveTop(char1, goto)}>Move top</button>
      <button onClick={() => moveDown(char1, goto)}>Move down</button>
      <button onClick={() => moveLeft(char1, goto)}>Move left</button>
      <button onClick={() => moveRight(char1, goto)}>Move right</button>
      <br />

      <button onClick={() => moveRight("char2", goto)}>Move right 2</button>
      <Stage size={{ width: 800, height: 600 }}>
        <CharacterArrowNav
          startPosition={{ left: "50%", top: "50%" }}
          id={char1}
        />
        {/* <CharacterArrowNav
          startPosition={{ left: "10%", top: "10%" }}
          id={"char2"}
        /> */}
      </Stage>
    </div>
  );
}

export default App;

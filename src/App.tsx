import "./App.css";
// import { useDispatch } from "react-redux";
// import { bindActionCreators } from "redux";
// import { navigateActionCreator } from "./state";
import { Stage, CharSpriteNavByArrows } from "components";
import mainSprite from "static/sprites/jetpack_sprite.png";


const MainChar = () => (
  <CharSpriteNavByArrows
    startPosition={{ left: "50%", top: "50%" }}
    id={"MainChar"}
    running={true}
    defaultPos={5}
    width={73}
    height={120}
    toRight={[8, 9]}
    toLeft={[10, 11]}
    toBottom={[6, 5, 7]}
    toTop={[13, 12, 14]}
    sprite={mainSprite}
  />
)


function App() {
  return (
    <div className="App">
      {/* <button onClick={() => moveTop(char1, goto)}>Move top</button>
      <button onClick={() => moveDown(char1, goto)}>Move down</button>
      <button onClick={() => moveLeft(char1, goto)}>Move left</button>
      <button onClick={() => moveRight(char1, goto)}>Move right</button>
      <br />

      <button onClick={() => moveRight("char2", goto)}>Move right 2</button> */}
      <Stage size={{ width: 800, height: 600 }}>

        <MainChar />
      </Stage>
    </div>
  );
}

export default App;

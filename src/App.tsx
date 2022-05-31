import "./App.css";
// import { useDispatch } from "react-redux";
// import { bindActionCreators } from "redux";
// import { navigateActionCreator } from "./state";
// import { navigateActionCreator } from "state";
import { Stage, AnimatedSpriteNavByArrows, AnimatedSprite } from "components";
import mainSprite from "static/sprites/jetpack_sprite.png";
import { useSelector } from "react-redux";
import { RootState } from "state/reducers";
import { useEffect } from "react";


const MainChar = () => (
  <AnimatedSpriteNavByArrows
    startPosition={{ left: "10%", top: "50%" }}
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

const StaticChar = () => (
  <AnimatedSprite
    position={{ left: "0%", top: "10%" }}
    sprite={mainSprite}
    defaultPos={5}
    height={120}
    running
    staticElementMoves={[13, 12, 14]}
    width={73}
  />
)


function App() {
  // const state = useSelector((state: RootState) => state);
  // useEffect(() => {
  //   console.log(state)
  // }, [state])
  return (
    <div className="App">
      {/* <button onClick={() => moveTop(char1, goto)}>Move top</button>
      <button onClick={() => moveDown(char1, goto)}>Move down</button>
      <button onClick={() => moveLeft(char1, goto)}>Move left</button>
      <button onClick={() => moveRight(char1, goto)}>Move right</button>
      <br />

      <button onClick={() => moveRight("char2", goto)}>Move right 2</button> */}
      <Stage size={{ width: 800, height: 600 }}>
        <StaticChar />
        <MainChar />
      </Stage>
    </div>
  );
}

export default App;

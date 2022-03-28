import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CharSprite, CharSpriteArrowNav } from "./CharSprite";
import mainSprite from "static/sprites/jetpack_sprite.png";
import { ActionNavigateType } from "state/action-types";
import { Stage } from "components/Stage";
import { Provider } from "react-redux";
import { store } from "state";

export default {
  title: "Example/CharSprite",
  component: CharSprite,
} as ComponentMeta<typeof CharSprite>;

const Template: ComponentStory<typeof CharSprite> = (args) => (
  <CharSprite {...args} />
);

export const charSprite = Template.bind({});
charSprite.args = {
  direction: ActionNavigateType.ArrowUp,
  running: true,
  defaultPos: 5,
  width: 73,
  height: 120,
  toLeft: [8, 9],
  toRight: [10, 11],
  toBottom: [6, 5, 7],
  toTop: [13, 12, 14],
  sprite: mainSprite,
};

const TemplateNAV: ComponentStory<typeof CharSpriteArrowNav> = (args) => (
  <Provider store={store}>
    <Stage size={{ width: 800, height: 200 }}>
      <CharSpriteArrowNav {...args} />
    </Stage>
  </Provider>
);
export const charSpriteArrowNav = TemplateNAV.bind({});

charSpriteArrowNav.args = {
  id: "test",
  direction: ActionNavigateType.ArrowUp,
  running: true,
  defaultPos: 5,
  width: 73,
  height: 120,
  toRight: [8, 9],
  toLeft: [10, 11],
  toBottom: [6, 5, 7],
  toTop: [13, 12, 14],
  sprite: mainSprite,
};


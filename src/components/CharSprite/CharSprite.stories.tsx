import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CharSprite } from "./CharSprite";
import mainSprite from "static/sprites/jetpack_sprite.png";
import { ActionNavigateType } from "state/action-types";

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


import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CharSprite } from "components";
import mainSprite from "static/sprites/jetpack_sprite.png";
import { ActionNavigateTypeKeys } from "state/action-types";

export default {
  title: "Example/CharSprite",
  component: CharSprite,
} as ComponentMeta<typeof CharSprite>;

const Template: ComponentStory<typeof CharSprite> = (args) => (
  <CharSprite {...args} />
);

export const charSprite = Template.bind({});
charSprite.args = {
  direction: ActionNavigateTypeKeys.ARROW_DOWN,
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



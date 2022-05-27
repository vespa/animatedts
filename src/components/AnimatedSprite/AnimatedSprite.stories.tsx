import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AnimatedSprite } from "components/AnimatedSprite";
import mainSprite from "static/sprites/jetpack_sprite.png";
import { DirectionsNavigateKeys } from "state/action-types";

export default {
  title: "Example/AnimatedSprite",
  component: AnimatedSprite,
} as ComponentMeta<typeof AnimatedSprite>;

const Template: ComponentStory<typeof AnimatedSprite> = (args) => (
  <AnimatedSprite {...args} />
);

export const animatedSprite = Template.bind({});
animatedSprite.args = {
  direction: DirectionsNavigateKeys.DOWN,
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



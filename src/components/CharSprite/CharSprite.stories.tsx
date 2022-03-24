import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CharSprite } from "./CharSprite";
import mainSprite from "static/sprites/jetpack_sprite.png";

export default {
  title: "Example/CharSprite",
  component: CharSprite,
} as ComponentMeta<typeof CharSprite>;

const Template: ComponentStory<typeof CharSprite> = (args) => (
  <CharSprite {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  running: true,
  width: 73,
  height: 120,
  sprite: mainSprite,
  initialPos: 5,
  toLeft: [8, 9],
};


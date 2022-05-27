import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AnimatedSpriteNavByArrows } from "components/AnimatedSpriteNavByArrows";
import mainSprite from "static/sprites/jetpack_sprite.png";
import { Stage } from "components/Stage";

export default {
  title: "Example/AnimatedSpriteNavByArrows",
  component: AnimatedSpriteNavByArrows,
} as ComponentMeta<typeof AnimatedSpriteNavByArrows>;

const TemplateNAV: ComponentStory<typeof AnimatedSpriteNavByArrows> = (args) => (
  <Stage size={{ width: 800, height: 200 }}>
    click on this stage and controll with the arrows
    <AnimatedSpriteNavByArrows {...args} />
  </Stage>
);
export const animatedSpriteNavByArrows = TemplateNAV.bind({});

animatedSpriteNavByArrows.parameters = { controls: { exclude: /^direction*/ } };
animatedSpriteNavByArrows.args = {
  id: "test",
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


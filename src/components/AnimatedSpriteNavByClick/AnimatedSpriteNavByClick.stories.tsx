import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AnimatedSpriteNavByClick } from "components/AnimatedSpriteNavByClick";
import mainSprite from "static/sprites/jetpack_sprite.png";
import { Stage } from "components/Stage";

export default {
  title: "Example/AnimatedSpriteNavByClick",
  component: AnimatedSpriteNavByClick,
} as ComponentMeta<typeof AnimatedSpriteNavByClick>;

const TemplateNAV: ComponentStory<typeof AnimatedSpriteNavByClick> = (args) => (
  <Stage size={{ width: 800, height: 200 }}>
    click on this stage and controll with the arrows
    <AnimatedSpriteNavByClick {...args} />
  </Stage>
);
export const animatedSpriteNavByClick = TemplateNAV.bind({});

animatedSpriteNavByClick.parameters = { controls: { exclude: /^direction*/ } };
animatedSpriteNavByClick.args = {
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


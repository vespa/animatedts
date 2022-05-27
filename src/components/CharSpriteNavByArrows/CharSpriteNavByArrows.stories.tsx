import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CharSpriteNavByArrows } from "components/CharSpriteNavByArrows";
import mainSprite from "static/sprites/jetpack_sprite.png";
import { Stage } from "components/Stage";

export default {
  title: "Example/CharSpriteNavByArrows",
  component: CharSpriteNavByArrows,
} as ComponentMeta<typeof CharSpriteNavByArrows>;

const TemplateNAV: ComponentStory<typeof CharSpriteNavByArrows> = (args) => (
  <Stage size={{ width: 800, height: 200 }}>
    click on this stage and controll with the arrows
    <CharSpriteNavByArrows {...args} />
  </Stage>
);
export const charSpriteArrowNav = TemplateNAV.bind({});

charSpriteArrowNav.parameters = { controls: { exclude: /^direction*/ } };
charSpriteArrowNav.args = {
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


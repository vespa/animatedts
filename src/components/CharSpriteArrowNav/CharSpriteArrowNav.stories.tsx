import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CharSpriteArrowNav } from "components";
import mainSprite from "static/sprites/jetpack_sprite.png";
import { Stage } from "components/Stage";

export default {
  title: "Example/CharSpriteArrowNav",
  component: CharSpriteArrowNav,
} as ComponentMeta<typeof CharSpriteArrowNav>;

const TemplateNAV: ComponentStory<typeof CharSpriteArrowNav> = (args) => (
  <Stage size={{ width: 800, height: 200 }}>
    click on this stage and controll with the arrows
    <CharSpriteArrowNav {...args} />
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


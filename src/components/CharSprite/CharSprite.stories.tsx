import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CharSprite } from "./CharSprite";

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
};

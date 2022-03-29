import { addDecorator } from "@storybook/react";

import { Provider } from "react-redux";
import { store } from "../src/state";
import React from "react";

export const decorators = [
  (Story: any) => (
    <Provider store={store}>
      <Story />
    </Provider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

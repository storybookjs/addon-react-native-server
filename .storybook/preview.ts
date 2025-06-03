import type { Preview } from "@storybook/react-native-web-vite";

const preview: Preview = {
  parameters: {
    deviceOnly: true,
    backgrounds: {
      default: "light",
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

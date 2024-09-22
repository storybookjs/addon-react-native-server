import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "./local-preset.js",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {},
  // @ts-ignore
  reactNativeServerOptions: {
    host: "192.168.1.69",
    port: 7008,
  },
};
export default config;

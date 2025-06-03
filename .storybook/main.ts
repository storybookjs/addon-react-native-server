import type { StorybookConfig } from "@storybook/react-native-web-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["./local-preset.js", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-native-web-vite",
    options: {},
  },
  typescript: {
    reactDocgen: "react-docgen",
  },
  // @ts-ignore
  reactNativeServerOptions: {
    host: "192.168.1.137",
    port: 7008,
  },
};
export default config;

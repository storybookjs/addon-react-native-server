import { defineConfig, type Options } from "tsup";
import { readFile } from "fs/promises";
import { globalPackages as globalManagerPackages } from "@storybook/manager/globals";
import { globalPackages as globalPreviewPackages } from "@storybook/preview/globals";

// The current browsers supported by Storybook v7
const BROWSER_TARGET: Options["target"] = [
  "chrome100",
  "safari15",
  "firefox91",
];
const NODE_TARGET: Options["target"] = ["node16"];

type BundlerConfig = {
  bundler?: {
    exportEntries?: string[];
    nodeEntries?: string[];
    managerEntries?: string[];
    previewEntries?: string[];
  };
};

export default defineConfig(async (options) => {
  const commonConfig: Options = {
    splitting: false,
    minify: !options.watch,
    treeshake: true,
    sourcemap: true,
    clean: true,
  };

  return [
    {
      ...commonConfig,
      entry: ["src/index.ts", "./src/preset.ts"],
      dts: {
        resolve: true,
      },
      format: ["esm", "cjs"],
      target: [...BROWSER_TARGET, ...NODE_TARGET],
      platform: "neutral",
      external: [...globalManagerPackages, ...globalPreviewPackages],
    },
  ];
});

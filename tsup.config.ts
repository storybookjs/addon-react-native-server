import { defineConfig, type Options } from "tsup";
import { globalPackages as globalManagerPackages } from "@storybook/manager/globals";
import { globalPackages as globalPreviewPackages } from "@storybook/preview/globals";

const NODE_TARGET: Options["target"] = ["node16"];

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
      entry: ["src/index.ts", "src/preset.ts"],
      dts: {
        resolve: true,
      },
      format: ["esm", "cjs"],
      target: [...NODE_TARGET],
      platform: "node",
      external: [...globalManagerPackages, ...globalPreviewPackages],
    },
  ];
});

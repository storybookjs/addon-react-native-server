import type { ProjectAnnotations, Renderer } from "@storybook/types";
import React from "react";

/**
 * Note: if you want to use JSX in this file, rename it to `preview.tsx`
 * and update the entry prop in tsup.config.ts to use "src/preview.tsx",
 */

const preview: ProjectAnnotations<Renderer> = {
  decorators: [
    function OnDeviceOnly(Story, { parameters }) {
      if (parameters.deviceOnly) {
        return (
          <span
            style={{
              fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
            }}
          >
            Parameter 'deviceOnly' was found and so the story is not rendered
          </span>
        );
      }

      return Story();
    },
  ],
};

export default preview;

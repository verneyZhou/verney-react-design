import type { StorybookConfig } from "@storybook/react-vite";
import { join, dirname } from "path";

/**
 * 获取包的存储位置
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  core: {
    builder: "@storybook/builder-vite",
  },
  async viteFinal(config, { configType }) {
    return {
      ...config,
      // resolve: {
      //   ...config.resolve,
      //   alias: {
      //     ...config.resolve?.alias,
      //     "@verney/ui": "../../../packages/ui/src"
      //   }
      // }
    };
  },
};

export default config;
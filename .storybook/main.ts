import type { StorybookConfig } from "@storybook/react-webpack5";
import { Configuration } from "webpack";
import * as path from "path";

const config: StorybookConfig = {
    stories: ["../src/components/**/*.stories.tsx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-webpack5-compiler-swc",
        "@storybook/addon-onboarding",
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@chromatic-com/storybook",
        "@storybook/addon-interactions",
    ],
    framework: {
        name: "@storybook/react-webpack5",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    webpackFinal: async (config: Configuration) => {
        config.module = config.module || {};
        config.module.rules = config.module.rules || [];

        config.module.rules.push({
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"],
            include: path.resolve(__dirname, "../"),
        });

        const imageRule = config.module.rules.find((rule) => rule?.["test"]?.test(".svg"));
        if (imageRule) {
            imageRule["exclude"] = /\.svg$/;
        }

        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
};
export default config;

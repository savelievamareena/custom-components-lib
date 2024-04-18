import * as path from "path";

module.exports = {
    mode: "production",
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        libraryTarget: "umd",
        clean: true,
    },
    resolve: {
        extensions: [".ts", ".tsx"],
    },
    externals: {
        react: "react",
    },
    module: {
        rules: [
            {
                test: /\.scss/,
                use: ["style-loader", "css-loader", "sass-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.(ts|tsx)?$/,
                use: ["ts-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ["@svgr/webpack"],
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        open: true,
    },
};

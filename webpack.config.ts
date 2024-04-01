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
                test: /\.(ts|tsx)?$/,
                use: ["ts-loader"],
                exclude: /node_modules/,
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

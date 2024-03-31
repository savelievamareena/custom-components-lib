module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["plugin:@typescript-eslint/recommended", "prettier"],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ["webpack.config.js", ".eslintrc.js"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json",
    },
    plugins: ["@typescript-eslint", "prettier"],
    rules: {
        "prettier/prettier": "error",
    },
};

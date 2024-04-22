module.exports = {
    silent: false,
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    moduleNameMapper: {
        "^.+\\.module\\.(css|scss)$": "identity-obj-proxy",
        "\\.svg$": "<rootDir>/__mocks__/svgMock.js", // Mock SVG imports
    },
    testEnvironment: "jsdom",
};

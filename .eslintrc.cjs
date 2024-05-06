module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/jsx-no-target-blank": 0,
    "react/react-in-jsx-scope": 0,
    "no-unused-vars": "error",
    "react/prop-types": 0,
  },
  settings: {
    react: {
      version: "detect", // You can specify the version here, or use "detect" to automatically detect the installed React version
    },
  },
};

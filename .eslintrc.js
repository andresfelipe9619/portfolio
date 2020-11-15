module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: [
    "react-app",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["prettier", "react", "react-hooks"],
  // add your custom rules here
  rules: {
    "react/prop-types": 0,
  },
};

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["react-app", "react-app/jest"],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "jsx-a11y/anchor-is-valid": "off",
    "react-hooks/exhaustive-deps": "off",
  },
};

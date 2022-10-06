module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "react-app",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "turbo",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["*.cjs"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "simple-import-sort", "jsx-a11y", "prettier"],
  rules: {
    "prettier/prettier": [
      "warn",
      { endOfLine: "auto" },
      { usePrettierrc: true },
    ],
    "react/react-in-jsx-scope": "off",
    "react/jsx-key": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "jsx-a11y/accessible-emoji": "off",
    "jsx-a11y/alt-text": "warn",
    "react/prop-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/consistent-type-imports": "warn",
    "react/jsx-filename-extension": [1, { extensions: [".jsx", ".tsx"] }],
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "turbo/no-undeclared-env-vars": "warn",
    "react/function-component-definition": [
      2,
      {
        namedComponents: "function-declaration",
      },
    ],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
};

module.exports = {
  extends: [
    "formidable/configurations/es6-react",
    "prettier",
    "prettier/react",
    "prettier/standard"
  ],
  env: {
    browser: true
  },
  globals: {
    __dirname: true,
    $: true
  },
  plugins: ["prettier"],
  rules: {
    "arrow-parens": "off",
    "filenames/match-regex": ["error", "^(_|)[a-z0-9\\-\\.]+$", false],
    "consistent-return": "warn",
    "no-magic-numbers": "warn",
    "object-curly-spacing": "off",
    "react/jsx-handler-names": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "max-params": ["error", 5],
    "prettier/prettier": [
      "error",
      {
        singleQuote: false
      }
    ]
  }
};

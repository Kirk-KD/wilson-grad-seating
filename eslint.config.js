// eslint.config.js
import js from "@eslint/js"; // require("@eslint/js") for CJS
import tsPlugin from "@typescript-eslint/eslint-plugin";
export default [
  js.configs.recommended,
  {
    files: ["*.ts", "*.tsx"],
    languageOptions: { parser: "@typescript-eslint/parser" },
    plugins: { "@typescript-eslint": tsPlugin },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
];

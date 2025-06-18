export default {
  importOrderParserPlugins: ['importAssertions', 'typescript', 'jsx'],
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  trailingComma: 'es5',
  // defined in .editorconfig
  // tabWidth: 2,
  semi: true,
  singleQuote: true,
  singleAttributePerLine: true,
  htmlWhitespaceSensitivity: 'strict',
};

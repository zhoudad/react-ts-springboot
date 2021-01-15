module.exports = {
  extends: ["prettier", "prettier/react","plugin:react/recommended"],
  singleQuote: true, // 使用单引号
  printWidth: 100, // 超过最大值换行
  htmlWhitespaceSensitivity: "ignore",
  semi: true, // 结尾用分号
  jsxBracketSameLine: true, // 在jsx中把'>' 不单独放一行
};

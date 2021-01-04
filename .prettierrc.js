module.exports = {
  extends: ["airbnb", "prettier", "prettier/react","plugin:react/recommended"],
  singleQuote: true, // 使用单引号
  printWidth: 500, // 超过最大值换行
  htmlWhitespaceSensitivity: "ignore",
  semi: true, // 结尾用分号
  disableLanguages: ["vue"], // 不格式化vue文件，vue文件的格式化单独设置
  jsxBracketSameLine: true, // 在jsx中把'>' 不单独放一行
};

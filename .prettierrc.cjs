module.exports = {
  // 换行的宽度，默认80
  printWidth: 120,
  // Tab字符的空格数量，默认值2
  tabWidth: 2,
  // 使用tab替代空格缩进，默认值false
  useTabs: false,
  // 语句结尾添加分号，默认值true
  semi: true,
  // 使用单引号替代双引号，默认值false
  singleQuote: true,
  // 对象的属性（键）是否需要引号包裹，默认值as-needed
  quoteProps: 'as-needed',
  // 多行时是否添加尾随逗号，默认值从2.0版本开始使用es5
  trailingComma: 'es5',
  // 对象字面量的括号之间是否需要空格，默认值true
  bracketSpacing: true,
  // 箭头函数单独的参数是否需要括号包裹，默认值从2.0版本开始使用always
  arrowParens: 'always',
  // HTML文件的空格敏感度，默认值css
  htmlWhitespaceSensitivity: 'css',
  // 换行符，默认值从2.0版本开始使用lf
  endOfLine: 'lf',
  // 重写配置
  overrides: [
    {
      files: '*.wxml',
      options: {
        parser: 'html',
      },
    },
    {
      files: '*.wxss',
      options: {
        parser: 'css',
      },
    },
    {
      files: '*.wxs',
      options: {
        parser: 'babel',
      },
    },
  ],
};

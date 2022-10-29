import local from './local.js'; // 本地环境
import development from './development.js'; // 开发环境
import test from './test.js'; // 测试环境
import preview from './preview.js'; // 预发环境
import production from './production.js'; // 生产环境

const configInfo = {
  local,
  development,
  test,
  preview,
  production,
};

// const NODE_ENV = 'local';
// const NODE_ENV = 'development';
// const NODE_ENV = 'test';
// const NODE_ENV = 'preview';
const NODE_ENV = 'production';
const config = configInfo[NODE_ENV];

export default config;

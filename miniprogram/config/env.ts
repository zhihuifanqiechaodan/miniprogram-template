import development from './development'; // 开发环境
import production from './production'; // 生产环境

const configInfo = {
  development,
  production,
};

// const NODE_ENV = 'development';
const NODE_ENV = 'production';
const config = configInfo[NODE_ENV];

export default config;

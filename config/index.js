// import config from "./local.js";       // 本地环境
// import config from './development.js'; // 开发环境
import config from './test.js'; // 测试环境
// import config from './preview.js'      // 预发环境
// import config from './production.js'; // 生产环境

/**
 * 环境
 */
export const env = config.env;
/**
 * 日志状态, 生产环境禁止打印日志
 */
export const log = env === 'production' ? false : true;
/**
 * 版本号
 */
export const version = '1.0.0';
/**
 * AppId
 */
export const appId = config.appId;
/**
 * 根域名
 */
export const baseUrl = config.baseUrl + 'xxx';

export default {
  env,
  log,
  version,
  appId,
  baseUrl,
};

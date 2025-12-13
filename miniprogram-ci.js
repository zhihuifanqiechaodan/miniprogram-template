import dayjs from 'dayjs';
import ci from 'miniprogram-ci';
import { version, appId, env } from './miniprogram/config/index.js';
import path from 'path';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
dayjs.extend(utc);
dayjs.extend(timezone);

(async () => {
  const project = new ci.Project({
    appid: appId, // 小程序AppID
    type: 'miniProgram',
    projectPath: path.resolve('./'), // 打包文件路径
    privateKeyPath: `private.${appId}.key`, // 秘钥路径，根据appId放置多个
    ignores: ['node_modules/**/*'],
  });
  const packNpmManuallyResult = await ci.packNpmManually({
    packageJsonPath: './package.json',
    miniprogramNpmDistDir: './miniprogram/',
    ignores: ['node_modules/**/*'],
  });
  const uploadResult = await ci.upload({
    // 项目对象
    project,
    // 版本号
    version,
    // 自定义备注 根据中国时区获取当前时间
    desc: `体验版本更新于${dayjs().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss')}`,
    // #编译设置
    setting: {
      es6: true,
      es7: true,
      minify: true,
      minifyJS: true,
      minifyWXML: true,
      minifyWXSS: true,
      autoPrefixWXSS: true,
    },
    // 进度更新监听函数
    onProgressUpdate: console.log,
  });
  console.log('========================👇 Env 👇========================\n\n', env, '\n\n');
  console.log('========================👇 AppId 👇========================\n\n', appId, '\n\n');
  console.log('========================👇 Version 👇========================\n\n', version, '\n\n');
  process.exit(0);
})();

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// 获取环境变量
const env = process.env.NODE_ENV || 'production';
const envPath = path.resolve(process.cwd(), `.env.${env}`);

// 读取对应的环境变量文件
const envConfig = dotenv.config({ path: envPath }).parsed;

// 直接使用原始配置
const config = { ...envConfig };

// 生成 env.ts 内容
const envContent = `export default ${JSON.stringify(config, null, 2)};`;

const configDir = path.resolve(process.cwd(), 'miniprogram/config');
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
}

// 写入文件
fs.writeFileSync(path.join(configDir, 'env.ts'), envContent, 'utf8');

console.log(`✨ env.ts 生成成功！(${env}环境)`);

// 云函数入口文件
const cloud = require('wx-server-sdk')
const { handleUuid } = require('../utils');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const { z } = require('zod');

// 云函数入口函数
exports.main = async (event, context) => {
    const schema = z.object({
        path: z.string().min(1, "path不能为空"),
    });
    const validated = schema.parse(event.params);
    // 获取小程序二维码的buffer
    const resp = await cloud.openapi.wxacode.get({
        path: validated.path,
    });
    const { buffer } = resp;
    // 将图片上传云存储空间
    const upload = await cloud.uploadFile({
        // 随机生成一个路径
        cloudPath: `${handleUuid()}.png`,
        fileContent: buffer,
    });
    return {
        code: 200,
        message: "获取小程序二维码成功",
        data: {
            fileID: upload.fileID,
        }
    }
}
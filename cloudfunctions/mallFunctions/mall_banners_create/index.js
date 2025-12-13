// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const { z } = require('zod');
const db = cloud.database();
const bannersCollection = db.collection('banners');
const updatedAt = db.serverDate();

// 云函数入口函数
exports.main = async (event, context) => {
    const schema = z.object({
        title: z.string().min(1, "标题不能为空").max(200, "标题过长").trim(),
        image_url: z.string().min(1, "图片地址不能为空"),
        link_url: z.string().optional().default(""),
        order: z.number().int().optional().default(1),
        is_enabled: z.boolean(),
    });
    const validated = schema.parse(event.params);
    await bannersCollection.add({
        data: {
            ...validated,
            created_at: updatedAt,
            updated_at: updatedAt,
            is_deleted: false,
        },
    });
    return {
        code: 200,
        message: "轮播图添加成功",
    }
}
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const { z } = require('zod');
const db = cloud.database();
const categoriesCollection = db.collection('categories');
const createdAt = db.serverDate();

// 云函数入口函数
exports.main = async (event, context) => {
    const schema = z.object({
        name: z.string().min(1, "分类名称不能为空").max(100, "分类名称过长").trim(),
        icon_url: z.string().optional().default(""),
        order: z.number().int().optional().default(1),
        is_enabled: z.boolean(),
    });
    const validated = schema.parse(event.params);
    await categoriesCollection.add({
        data: {
            ...validated,
            is_deleted: false,
            created_at: createdAt,
            updated_at: createdAt,
            count: 0,
        }
    });
    return {
        code: 200,
        message: "分类创建成功",
    }
}
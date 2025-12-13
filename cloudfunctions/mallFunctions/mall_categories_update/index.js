// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const { z } = require('zod');
const db = cloud.database();
const categoriesCollection = db.collection('categories');
const updatedAt = db.serverDate()

// 云函数入口函数
exports.main = async (event, context) => {
    const schema = categoriesCollection.extend({
        category_id: z.string().min(1, "分类 ID 不能为空"),
        name: z.string().min(1, "分类名称不能为空").max(100, "分类名称过长").trim(),
        icon_url: z.string().optional().default(""),
        order: z.number().int().optional().default(1),
        is_enabled: z.boolean(),
    })
    const validated = schema.parse(event.params);
    const categoriesRes = await categoriesCollection.where({ _id: validated.category_id, is_deleted: false }).get();
    if (!categoriesRes.data.length) throw new Error('分类不存在')
    await categoriesCollection.doc(validated.category_id).update({
        data: {
            name: validated.name,
            icon_url: validated.icon_url,
            order: validated.order,
            is_enabled: validated.is_enabled,
            updated_at: updatedAt
        },
    });
    return {
        code: 200,
        message: "分类更新成功",
    }
}
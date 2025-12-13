// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const { z } = require('zod');
const db = cloud.database();
const categoriesCollection = db.collection('categories');
const productsCollection = db.collection('products');
const updatedAt = db.serverDate()

// 云函数入口函数
exports.main = async (event, context) => {
    const schema = z.object({
        category_id: z.string().min(1, "分类 ID 不能为空"),
    });
    const validated = schema.parse(event.params);
    const categoriesRes = await categoriesCollection.where({ _id: validated.category_id, is_deleted: false, }).get();
    if (!categoriesRes.data.length) throw new Error('分类不存在')
    await categoriesCollection.doc(validated.category_id).update({
        data: {
            is_deleted: true,
            updated_at: updatedAt
        },
    });
    await productsCollection.where({ category_id: validated.category_id, is_deleted: false, }).update({
        data: {
            category_id: '',
            updated_at: updatedAt
        },
    });
    return {
        code: 200,
        message: "分类删除成功",
    }
}
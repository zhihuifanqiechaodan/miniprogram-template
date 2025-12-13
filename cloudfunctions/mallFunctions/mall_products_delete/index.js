// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const { z } = require('zod');
const db = cloud.database();
const productsCollection = db.collection('products');
const updatedAt = db.serverDate()

// 云函数入口函数
exports.main = async (event, context) => {
    const schema = z.object({
        product_id: z.string().min(1, "SPU ID 不能为空"),
    });
    const validated = schema.parse(event.params);
    const productsRes = await productsCollection
        .where({
            _id: validated.product_id,
            is_deleted: false,
        })
        .get();
    if (!productsRes.data.length) throw new Error("商品不存在");
    await productsCollection.doc(validated.product_id).update({
        data: {
            is_deleted: true,
            updated_at: updatedAt
        },
    });
    return {
        code: 200,
        message: "商品删除成功",
    }
}
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const { z } = require('zod');
const db = cloud.database();
const productsCollection = db.collection('products');

// 云函数入口函数
exports.main = async (event, context) => {
    const schema = z.object({
        product_id: z.string().min(1, "product_id 不能为空"),
    });
    const validated = schema.parse(event.params);
    const productsRes = await productsCollection
        .where({
            _id: validated.product_id,
            is_deleted: false,
            is_enabled: true,
        })
        .get();
    if (!productsRes.data.length) throw new Error("商品不存在");
    return {
        code: 200,
        message: "商品获取成功",
        data: {
            productInfo: productsRes.data[0],
        },
    }
}
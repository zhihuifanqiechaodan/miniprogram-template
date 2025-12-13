// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const { z } = require('zod');
const db = cloud.database();
const cartsCollection = db.collection('carts');
const productsCollection = db.collection('products');
const updatedAt = db.serverDate();

// 云函数入口函数
exports.main = async (event, context) => {
    const schema = z.object({
        cart_id: z.string().min(1, "cart_id 不能为空"),
        product_id: z.string().min(1, "product_id 不能为空"),
        sku_id: z.string().min(1, "sku_id 不能为空"),
        quantity: z.number().int().min(1, "quantity 必须大于0"),
    });
    const validated = schema.parse(event.params);
    const cartRes = await cartsCollection.where({ _id: validated.cart_id, user_id: cloud.getWXContext().OPENID, is_deleted: false, is_enabled: true }).get();
    if (!cartRes.data.length) throw new Error("购物车项不存在");
    const productsRes = await productsCollection.where({ _id: validated.product_id, is_deleted: false, is_enabled: true }).get();
    if (!productsRes.data.length) throw new Error("商品不存在");
    const skus = productsRes.data[0].skus;
    const sku = skus.find(s => s.sku_id === validated.sku_id);
    if (!sku) throw new Error("sku_id 不存在");
    if (validated.quantity > sku.stock) throw new Error("库存不足");
    await cartsCollection.doc(validated.cart_id).update({
        data: {
            quantity: validated.quantity,
            updated_at: updatedAt,
        },
    });
    return {
        code: 200,
        message: "商品更新到购物车成功",
    }
}
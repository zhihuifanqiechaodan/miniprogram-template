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
        product_id: z.string().min(1, "product_id 不能为空"),
        sku_id: z.string().min(1, "sku_id 不能为空"),
        quantity: z.number().int().min(1, "数量必须大于 0"),
    });
    const validated = schema.parse(event.params);
    const productsRes = await productsCollection.where({ _id: validated.product_id, is_deleted: false, is_enabled: true }).get();
    if (!productsRes.data.length) throw new Error("商品不存在");
    const skus = productsRes.data[0].skus;
    const sku = skus.find(s => s.sku_id === validated.sku_id);
    if (!sku) throw new Error("sku_id 不存在");
    const cartsRes = await cartsCollection.where({
        user_id: cloud.getWXContext().OPENID,
        product_id: validated.product_id,
        sku_id: validated.sku_id,
        is_deleted: false,
        is_enabled: true,
    }).get();
    if (cartsRes.data.length) {
        if (cartsRes.data[0].quantity + validated.quantity > sku.stock) throw new Error("库存不足");
        await cartsCollection.doc(cartsRes.data[0]._id).update({
            data: {
                quantity: cartsRes.data[0].quantity + validated.quantity,
                updated_at: updatedAt,
            },
        });
    } else {
        await cartsCollection.add({
            data: {
                ...validated,
                user_id: cloud.getWXContext().OPENID,
                is_deleted: false,
                is_enabled: true,
                created_at: updatedAt,
                updated_at: updatedAt,
            }
        });
    }
    return {
        code: 200,
        message: "商品添加到购物车成功",
    }
}
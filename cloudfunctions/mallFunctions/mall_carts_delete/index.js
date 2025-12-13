// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const { z } = require('zod');
const db = cloud.database();
const cartsCollection = db.collection('carts');
const updatedAt = db.serverDate()

// 云函数入口函数
exports.main = async (event, context) => {
    const schema = z.object({
        cart_id: z.string().min(1, "cart_id 不能为空"),
    });
    const validated = schema.parse(event.params);
    const cartsRes = await cartsCollection
        .where({
            _id: validated.cart_id,
            user_id: cloud.getWXContext().OPENID,
            is_deleted: false,
        })
        .get();
    if (!cartsRes.data.length) throw new Error("购物车项不存在");
    await cartsCollection.doc(validated.cart_id).update({
        data: {
            is_deleted: true,
            updated_at: updatedAt,
        },
    })
    return {
        code: 200,
        message: "商品从购物车删除成功",
    }
}
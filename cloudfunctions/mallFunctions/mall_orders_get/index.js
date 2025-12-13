// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const { z } = require('zod');
const db = cloud.database();
const ordersCollection = db.collection('orders');

// 云函数入口函数
exports.main = async (event, context) => {
    const schema = z.object({
        order_id: z.string().min(1, "订单ID不能为空"),
    });
    const validated = schema.parse(event.params);
    const ordersRes = await ordersCollection.where({
        _id: validated.order_id,
        user_id: cloud.getWXContext().OPENID,
    }).get();
    if (ordersRes.data.length === 0) throw new Error("订单不存在");
    return {
        code: 200,
        message: "获取订单成功",
        data: {
            orderInfo: ordersRes.data[0]
        }
    }
}
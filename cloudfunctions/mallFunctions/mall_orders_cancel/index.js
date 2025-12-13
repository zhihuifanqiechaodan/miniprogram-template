// 云函数入口文件
const cloud = require('wx-server-sdk')
const mallOrderUpdate = require('../mall_orders_update')

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
    const orderInfo = ordersRes.data[0];
    if (orderInfo.status !== 'pending') throw new Error("订单状态不正确");
    event.params = {
        ...validated,
        status: 'cancelled',
        user_id: cloud.getWXContext().OPENID,
    }
    await mallOrderUpdate.main(event, context)
    return {
        code: 200,
        message: "取消订单成功",
    }
}
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const { z } = require('zod');
const db = cloud.database();
const ordersCollection = db.collection('orders');

// 云函数入口函数
exports.main = async (event, context) => {
    const schema = z.object({
        pageNum: z.number().int().min(1),
        pageSize: z.number().int().min(1).max(20).optional().default(20),
        // 待支付、待发货、待收货、已取消
        status: z.enum(['pending', 'shipped', 'delivered', 'cancelled']).optional().default(''),
    });
    const validated = schema.parse(event.params);
    const whereCondition = {
        user_id: cloud.getWXContext().OPENID,
    };
    if (validated.status) {
        whereCondition.status = validated.status;
    }
    const countRes = await ordersCollection.where(whereCondition).count();
    const ordersRes = await ordersCollection
        .where(whereCondition)
        .orderBy("order", "asc")
        .orderBy('updated_at', 'desc')
        .skip((validated.pageNum - 1) * validated.pageSize)
        .limit(validated.pageSize)
        .get();
    return {
        code: 200,
        message: "订单获取成功",
        data: {
            records: ordersRes.data,
            pagination: {
                pageNum: validated.pageNum,
                pageSize: validated.pageSize,
                total: countRes.total,
                totalPages: Math.ceil(countRes.total / validated.pageSize),
            },
        },
    }
}
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const { z } = require('zod');
const db = cloud.database();
const ordersCollection = db.collection('orders');
const updatedAt = db.serverDate();

// 云函数入口函数
exports.main = async (event, context) => {
    const schema = z.object({
        order_id: z.string().min(1, "order_id 不能为空"),
        // 待支付、已支付、已发货、已收货、已完成、已取消、已退款
        status: z.enum(['pending', 'paid', 'shipped', 'delivered', 'completed', 'cancelled', 'refunded']).min(1, "status 不能为空"),
        user_id: z.string().min(1, "user_id 不能为空"),
    });
    const validated = schema.parse(event.params);
    const ordersRes = await ordersCollection.where({
        _id: validated.order_id,
        user_id: validated.user_id,
    }).get();
    if (!ordersRes.data.length) throw new Error("订单不存在");
    const orderInfo = ordersRes.data[0];
    if (orderInfo.status === validated.status) throw new Error("订单状态未发生变化");
    // 根据订单状态处理业务逻辑
    switch (validated.status) {
        case 'cancelled':
        case 'refunded':
            const productsRes = await db.collection('products').where({
                _id: db.command.in(orderInfo.products.map(item => item.product_id)),
            }).get();
            const productsMap = new Map()
            productsRes.data.forEach(p => {
                productsMap.set(p._id, p)
            })
            await db.runTransaction(async (transaction) => {
                const ordersCollection = transaction.collection('orders');
                const productsCollection = transaction.collection('products');
                await ordersCollection.doc(validated.order_id).update({
                    data: {
                        status: validated.status,
                        updated_at: updatedAt,
                    }
                })
                for (let i = 0; i < orderInfo.products.length; i++) {
                    const { sku_id, product_id, quantity } = orderInfo.products[i];
                    const productInfo = productsMap.get(product_id)
                    await productsCollection.doc(productInfo._id).update({
                        data: {
                            [`skus.${productInfo.skus.findIndex(s => s.sku_id === sku_id)}`]: {
                                stock: db.command.inc(quantity),
                            },
                            updated_at: updatedAt,
                        }
                    })
                }
            })
            break;
        default: {
            await ordersCollection.doc(validated.order_id).update({
                data: {
                    status: validated.status,
                    updated_at: updatedAt,
                }
            })
            break
        }
    }
    return {
        code: 200,
        message: "更新订单状态成功"
    }
}
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const { z } = require('zod');
const db = cloud.database();
const cartsCollection = db.collection('carts');
const productsCollection = db.collection('products');

// 云函数入口函数
exports.main = async (event, context) => {
    const schema = z.object({
        pageNum: z.number().int().min(1),
        pageSize: z.number().int().min(20).max(20).optional().default(20),
    });
    const validated = schema.parse(event.params);
    const cartRes = await cartsCollection
        .where({
            user_id: cloud.getWXContext().OPENID,
            is_deleted: false,
        })
        .orderBy("updated_at", "desc")
        .skip((validated.pageNum - 1) * validated.pageSize)
        .limit(validated.pageSize)
        .get()
    const productsRes = await productsCollection
        .where({
            _id: db.command.in(cartRes.data.map((item) => item.product_id)),
        })
        .get();
    const productsMap = new Map();
    productsRes.data.forEach((item) => {
        productsMap.set(item._id, item);
    });
    cartRes.data.forEach((item) => {
        const productItem = productsMap.get(item.product_id);
        const isDeleted = productItem?.is_deleted;
        const enabled = productItem?.is_enabled;
        const sku = productItem?.skus.find((s) => s.sku_id === item.sku_id);
        item.is_enabled = !!(!isDeleted && enabled && sku)
        item.product_name = productItem.name;
        item.product_image = productItem.images[0];
        item.quantity = item.quantity > sku.stock ? sku.stock : item.quantity;
        item.spec = sku.spec;
        item.original_price = sku.original_price;
        item.sell_price = sku.sell_price;
    });
    return {
        code: 200,
        message: "获取购物车成功",
        data: {
            records: cartRes.data,
            pagination: {
                pageNum: validated.pageNum,
                pageSize: validated.pageSize,
                total: cartRes.total,
                totalPages: Math.ceil(cartRes.total / validated.pageSize),
            },
        },
    }
}
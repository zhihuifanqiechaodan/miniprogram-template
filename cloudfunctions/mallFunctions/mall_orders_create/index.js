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
        cart_ids: z.array(z.string().min(1, "购物车ID不能为空")).min(1, "请选择至少一个商品"),
        name: z.string().min(1, "姓名不能为空"),
        phone: z.string().min(1, "手机号不能为空").regex(/^1[3-9]\d{9}$/, "手机号格式不正确"),
        province: z.string().min(1, "省不能为空"),
        province_id: z.string().min(1, "省ID不能为空"),
        city: z.string().min(1, "市不能为空"),
        city_id: z.string().min(1, "市ID不能为空"),
        district: z.string().min(1, "区不能为空").optional().default(''),
        district_id: z.string().min(1, "区ID不能为空").optional().default(''),
        detail_address: z.string().min(1, "详细地址不能为空"),
        remark: z.string().optional().default(''),
    });
    const validated = schema.parse(event.params);
    const cartsRes = await cartsCollection.where({
        user_id: cloud.getWXContext().OPENID,
        _id: db.command.in(validated.cart_ids),
        is_deleted: false,
        is_enabled: true,
    }).get();
    if (cartsRes.data.length !== validated.cart_ids.length) throw new Error("购物车商品不存在或已删除");
    const productsRes = await productsCollection.where({
        _id: db.command.in(cartsRes.data.map(c => c.product_id)),
        is_deleted: false,
        is_enabled: true,
    }).get();
    if (productsRes.data.length !== cartsRes.data.length) throw new Error("购物车商品不存在或已删除");
    const productsMap = new Map()
    const orderProducts = []
    let totalAmount = 0;
    productsRes.data.forEach(p => {
        productsMap.set(p._id, p)
    })
    for (const cart of cartsRes.data) {
        const product = productsMap.get(cart.product_id)
        if (!product) throw new Error(`商品${product.name}不存在或已删除`);
        const sku = product.skus.find(s => s.sku_id === cart.sku_id)
        if (!sku) throw new Error(`商品规格${sku.spec}不存在或已删除`);
        if (sku.stock < cart.quantity) throw new Error(`商品规格${sku.spec}库存不足`);
        totalAmount += sku.sell_price * cart.quantity;
        orderProducts.push({
            product_id: cart.product_id,
            name: product.name,
            images: product.images,
            sku_id: cart.sku_id,
            spec: sku.spec,
            quantity: cart.quantity,
            sell_price: sku.sell_price,
            original_price: sku.original_price,
        })
    }
    const orderInfo = await db.runTransaction(async (transaction) => {
        const ordersCollection = transaction.collection('orders');
        const cartsCollection = transaction.collection('carts');
        const productsCollection = transaction.collection('products');
        const orderRes = await ordersCollection.add({
            data: {
                user_id: cloud.getWXContext().OPENID,
                total_amount: totalAmount,
                status: 'pending',
                products: orderProducts,
                name: validated.name,
                phone: validated.phone,
                province: validated.province,
                city: validated.city,
                district: validated.district,
                detail_address: validated.detail_address,
                remark: validated.remark,
                updated_at: updatedAt,
                created_at: updatedAt,
            }
        })
        for (let i = 0; i < cartsRes.data.length; i++) {
            const { _id, sku_id, product_id } = cartsRes.data[i];
            const product = productsMap.get(product_id)
            await productsCollection.doc(product_id).update({
                data: {
                    [`skus.${product.skus.findIndex(s => s.sku_id === sku_id)}.stock`]: db.command.inc(-cartsRes.data[i].quantity),
                    updated_at: updatedAt,
                }
            })
            await cartsCollection.doc(_id).update({
                data: {
                    is_deleted: true,
                    updated_at: updatedAt,
                }
            })
        }
        return orderRes
    })
    return {
        code: 200,
        message: "创建订单成功",
        data: {
            orderInfo: orderInfo
        },
    }
}
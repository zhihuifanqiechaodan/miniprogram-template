// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const { z } = require('zod');
const { handleUuid } = require('../utils');
const db = cloud.database();
const productsCollection = db.collection('products');
const updatedAt = db.serverDate();

// 云函数入口函数
exports.main = async (event, context) => {
    const schema = z.object({
        product_id: z.string().min(1, "SPU ID 不能为空"),
        name: z.string().min(1, "商品名称不能为空").trim(),
        category_id: z.string().min(1, "商品分类不能为空"),
        images: z
            .array(z.string().min(1, "图片链接不能为空"))
            .min(1, "请至少上传一张商品图片"),
        is_enabled: z.boolean(),
        description: z.string().optional().default(""),
        skus: z.array(z.object({
            spec: z.string().min(1, "规格不能为空").trim(),
            sell_price: z.number().nonnegative("售价不能为负"),
            original_price: z.number().nonnegative("原价不能为负"),
            stock: z.number().int().nonnegative("库存不能为负"),
        })).min(1, "请至少添加一个 SKU"),
    });
    const validated = schema.parse(event.params);
    const productsRes = await productsCollection
        .where({
            _id: validated.product_id,
            is_deleted: false,
        })
        .get();
    if (!productsRes.data.length) throw new Error("商品不存在");
    const categoriesRes = await categoryCollection
        .where({
            _id: validated.category_id,
            is_deleted: false,
            is_enabled: true,
        })
        .get();
    if (!categoriesRes.data.length) throw new Error("所选分类不存在");
    const originalSkus = productsRes.data[0].skus;
    const updatedSkus = (validated.skus).map((sku) => {
        if (sku.sku_id) {
            if (!originalSkus.some(s => s.sku_id === sku.sku_id)) {
                throw new Error(`SKU ID ${sku.sku_id} 不存在，无法修改`);
            }
            return {
                ...sku,
                updated_at: updatedAt
            };
        }
        return {
            ...sku,
            sku_id: handleUuid(),
            created_at: updatedAt,
            updated_at: updatedAt
        };
    });
    await productsCollection.doc(validated.product_id).update({
        data: {
            name: validated.name,
            category_id: validated.category_id,
            images: validated.images,
            is_enabled: validated.is_enabled,
            description: validated.description,
            skus: updatedSkus,
            updated_at: updatedAt,
        },
    });
    return {
        code: 200,
        message: "商品更新成功",
    }
}
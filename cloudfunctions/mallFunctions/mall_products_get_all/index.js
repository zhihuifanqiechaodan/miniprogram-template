// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const { z } = require('zod');
const db = cloud.database();
const productsCollection = db.collection('products');

// 云函数入口函数
exports.main = async (event, context) => {
    const schema = z.object({
        pageNum: z.number().int().min(1),
        pageSize: z.number().int().min(1).max(20).optional().default(20),
        category_id: z.string().optional().default(''),
        is_enabled: z.boolean().optional(),
    });
    const validated = schema.parse(event.params);
    const whereCondition = {
        is_deleted: false,
    };
    if (validated.category_id) {
        whereCondition.category_id = validated.category_id;
    }
    if (validated.is_enabled !== undefined) {
        whereCondition.is_enabled = validated.is_enabled;
    }
    const countRes = await productsCollection.where(whereCondition).count();
    const productsRes = await productsCollection
        .where(whereCondition)
        .orderBy("order", "asc")
        .orderBy('updated_at', 'desc')
        .skip((validated.pageNum - 1) * validated.pageSize)
        .limit(validated.pageSize)
        .get();
    return {
        code: 200,
        message: "商品获取成功",
        data: {
            records: productsRes.data,
            pagination: {
                pageNum: validated.pageNum,
                pageSize: validated.pageSize,
                total: countRes.total,
                totalPages: Math.ceil(countRes.total / validated.pageSize),
            },
        },
    }
}
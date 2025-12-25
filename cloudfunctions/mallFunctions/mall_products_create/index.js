// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const { z } = require('zod');
const { handleUuid } = require('../utils');
const db = cloud.database();
const categoriesCollection = db.collection('categories');
const updatedAt = db.serverDate();

// 云函数入口函数
exports.main = async (event, context) => {
	const schema = z.object({
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
	const categoriesRes = await categoriesCollection.where({ _id: validated.category_id, is_deleted: false, is_enabled: true }).get();
	if (categoriesRes.data.length === 0) throw new Error("商品分类不存在");
	validated.skus.forEach((sku) => {
		sku.sku_id = handleUuid()
		sku.updated_at = updatedAt;
		sku.created_at = updatedAt;
	})
	db.runTransaction(async (transaction) => {
		const productsCollection = transaction.collection('products')
		const categoriesCollection = transaction.collection('categories')
		await productsCollection.add({
			data: {
				...validated,
				is_deleted: false,
				updated_at: updatedAt,
				created_at: updatedAt,
				category_name: categoriesRes.data[0].name,
			}
		})
		await categoriesCollection.doc(validated.category_id).update({
			data: {
				count: db.command.inc(1),
				updated_at: updatedAt,
			}
		})
	})

	return {
		code: 200,
		message: "商品创建成功",
	}
}
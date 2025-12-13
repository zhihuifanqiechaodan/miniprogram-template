// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const { z } = require('zod');
const db = cloud.database();
const bannersCollection = db.collection('banners');

// 云函数入口函数
exports.main = async (event, context) => {
	const schema = z.object({
		pageNum: z.number().int().min(1),
		pageSize: z.number().int().min(1).max(20).optional().default(20),
	});
	const validated = schema.parse(event.params);
	const whereCondition = {
		is_deleted: false,
	};
	const countRes = await bannersCollection.where(whereCondition).count();
	const bannersRes = await bannersCollection
		.where(whereCondition)
		.orderBy("order", "asc")
		.orderBy('updated_at', 'desc')
		.skip((validated.pageNum - 1) * validated.pageSize)
		.limit(validated.pageSize)
		.get();
	return {
		code: 200,
		message: "获取轮播图成功",
		data: {
			records: bannersRes.data,
			pagination: {
				pageNum: validated.pageNum,
				pageSize: validated.pageSize,
				total: countRes.total,
				totalPages: Math.ceil(countRes.total / validated.pageSize),
			},
		},
	}
}
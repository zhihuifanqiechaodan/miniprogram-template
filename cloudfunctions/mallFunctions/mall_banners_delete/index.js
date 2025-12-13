// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const { z } = require('zod');
const db = cloud.database();
const bannersCollection = db.collection('banners');
const updatedAt = db.serverDate();

// 云函数入口函数
exports.main = async (event, context) => {
    const schema = z.object({
        banner_id: z.string().min(1, "banner_id 不能为空"),
    });
    const validated = schema.parse(event.params);
    const bannersRes = await bannersCollection.where({ _id: validated.banner_id, is_deleted: false }).get();
    if (!bannersRes.data.length) throw new Error("轮播图不存在");
    await bannersCollection.doc(validated.banner_id).update({
        data: {
            is_deleted: true,
            updated_at: updatedAt,
        },
    });
    return {
        code: 200,
        message: "轮播图删除成功",
    }
}
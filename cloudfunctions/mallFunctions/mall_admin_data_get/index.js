// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database();
const bannersCollection = db.collection('banners');
const categoriesCollection = db.collection('categories');
const productsCollection = db.collection('products');

// 云函数入口函数
exports.main = async (event, context) => {
    const bannersCountRes = await bannersCollection.count();
    const categoriesCountRes = await categoriesCollection.count();
    const productsCountRes = await productsCollection.count();
    return {
        code: 200,
        message: "获取成功",
        data: {
            bannersCount: bannersCountRes.total,
            categoriesCount: categoriesCountRes.total,
            productsCount: productsCountRes.total,
        }
    }
}
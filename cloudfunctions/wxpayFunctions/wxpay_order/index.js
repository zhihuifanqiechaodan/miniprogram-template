/**
 * 微信支付 - 下单
 */
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();

  // 商户自行生成商户订单号，此处仅为代码示例
  const outTradeNo = Math.round(Math.random() * 10 ** 13) + Date.now();

  // 商户存储订单号到数据库，便于后续与微信侧订单号关联。例如使用云开发云存储能力：
  // db.collection('orders').add({ data: { outTradeNo } });

  const res = await cloud.callFunction({
    name: 'cloudbase_module',
    data: {
      name: 'wxpay_order',
      data: {
        description: '<商品描述>',
        amount: {
          total: 1, // 订单金额
          currency: 'CNY',
        },
        // 商户生成的订单号
        out_trade_no: outTradeNo,
        payer: {
          // 服务端云函数中直接获取当前用户openId
          openid: wxContext.OPENID,
        },
      },
    },
  });
  return res.result;
};
// pages/categories/index.ts
Page({
  data: {
    categories: [
      { id: 1, name: '人气 Top', icon: '📁', count: 3, isEnabled: true },
      { id: 2, name: '超值套餐', icon: '📁', count: 2, isEnabled: true },
      { id: 3, name: '主食单点', icon: '📁', count: 5, isEnabled: true },
      { id: 4, name: '小食/甜点', icon: '📁', count: 4, isEnabled: false },
      { id: 5, name: '饮品', icon: '📁', count: 1, isEnabled: true },
    ],
    totalCategories: 5,
    totalProducts: 8,
  },

  onLoad() {},

  onAddCategory() {
    wx.showToast({
      title: '添加分类',
      icon: 'none',
    });
  },

  onEditCategory(e: WechatMiniprogram.TouchEvent) {
    const { id } = e.currentTarget.dataset;
    wx.showToast({
      title: `编辑分类 ${id}`,
      icon: 'none',
    });
  },

  onToggleStatus(e: WechatMiniprogram.TouchEvent) {
    const { index } = e.currentTarget.dataset;
    const categories = this.data.categories;
    categories[index].isEnabled = !categories[index].isEnabled;
    this.setData({
      categories,
    });
  },

  onDeleteCategory(e: WechatMiniprogram.TouchEvent) {
    const { id } = e.currentTarget.dataset;
    wx.showToast({
      title: `删除分类 ${id}`,
      icon: 'none',
    });
  },

  onSortUp(e: WechatMiniprogram.TouchEvent) {
    const { index } = e.currentTarget.dataset;
    if (index === 0) return;
    const categories = this.data.categories;
    const temp = categories[index];
    categories[index] = categories[index - 1];
    categories[index - 1] = temp;
    this.setData({ categories });
  },

  onSortDown(e: WechatMiniprogram.TouchEvent) {
    const { index } = e.currentTarget.dataset;
    const categories = this.data.categories;
    if (index === categories.length - 1) return;
    const temp = categories[index];
    categories[index] = categories[index + 1];
    categories[index + 1] = temp;
    this.setData({ categories });
  },
});

### Props

| 参数        | 说明                                   | 类型             | 默认值     |
| ----------- | -------------------------------------- | ---------------- | ---------- |
| title       | 标题                                   | string           | -          |
| backTop     | 是否开启点击滚动到顶部, 仅支持页面滚动 | string           | aspectFill |
| fixed       | 是否固定在顶部                         | boolean          | true       |
| placeholder | 固定在顶部时是否开启占位               | string           | -          |
| border      | 是否显示下边框                         | string           | -          |
| customStyle | 根节点自定义样式                       | string ｜ number | 0          |
| showHome    | 是否显示左侧首页图标                   | boolean          | false      |
| showBack    | 是否显示左侧返回图标                   | boolean          | false      |
| showClose   | 是否显示左侧关闭图标                   | boolean          | true       |
| showSlot    | 是否开启左侧插槽                       | boolean          | true       |

### Slots

| 名称  | 说明           |
| ----- | -------------- |
| title | 自定义标题内容 |

### Events

| 事件名                  | 说明             | 回调参数     |
| ----------------------- | ---------------- | ------------ |
| bind:handleNavigateBack | 点击返回触发     | event: Event |
| bind:handleReLaunchHome | 点击返回首页触发 | event: Event |
| bind:handleBackTop      | 点击导航栏触发   | event: Event |

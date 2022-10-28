### Props

| 参数           | 说明                 | 类型    | 默认值                   |
| -------------- | -------------------- | ------- | ------------------------ |
| message        | 内容                 | string  | 似乎已断开与互联网的连接 |
| buttonText     | 按钮文案             | string  | 刷新                     |
| verticalCenter | 基于屏幕垂直居中布局 | boolean | false                    |

### Events

| 事件名称      | 说明                                              |
| ------------- | ------------------------------------------------- |
| handleRefresh | 点击按钮会触发 this.triggerEvent('handleRefresh') |

### 外部样式类

| 类名                                   | 说明           |
| -------------------------------------- | -------------- |
| external-custom-broken-network         | 根结点样式类   |
| external-custom-broken-network_message | 内容样式类     |
| external-custom-broken-network_refresh | 按钮容器样式类 |

# AGENTS

## Skills

- 本仓库的专项 skills 统一放在根目录 `skills/` 下。
- 专项 skills 采用按需加载方式，不默认预读全部 skill。
- 仅当任务明显命中某个 skill 的触发条件时，才读取对应的 `skills/*/SKILL.md`。
- 未命中触发条件时，不读取其他 skill 文件。
- 如 `SKILL.md` 中再引用额外说明或参考文件，只在当前任务确实需要时继续读取。

## 当前专项 Skills

- `skills/miniprogram-project-conventions/SKILL.md`
  触发条件：当任务涉及以下任一情况时读取：
  1. 修改 `miniprogram/components/` 下的公共组件目录、命名、引用或重命名
  2. 调整页面或组件的 `usingComponents`，或修改 `json`、`wxml` 中的组件引入、组件标签、组件路径
  3. 修改页面或组件的结构、布局、样式，涉及 `wxml`、`scss`、`wxss`
  4. 新增页面、删除页面、页面路由定义或页面跳转逻辑调整
  5. 页面 UI 调整同时需要判断组件复用、组件选型、路由定义或样式写法约束

- `skills/miniprogram-api-conventions/SKILL.md`
  触发条件：当任务涉及以下任一情况时读取：
  1. 根据接口路径和请求方法新增或修改 `miniprogram/api/` 下的接口封装
  2. 根据请求参数、响应数据新增或补充 `typings/api-types/` 下的接口类型声明
  3. 需要按接口路径决定 API 文件名、类型文件名、方法名或类型名
  4. 新增 `typings/api-types/*.d.ts` 后需要维护 `typings/api-types/index.d.ts` 导出

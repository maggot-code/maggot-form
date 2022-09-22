# maggot-form

## 属性

| 属性           | 说明                                       | 类型               | 默认值  |
| -------------- | ------------------------------------------ | ------------------ | ------- |
| `schema`       | 表单结构                                   | `Object`           | 必填    |
| `proName`      | 网络请求的前置标识，类似命名空间           | `String`           | `""`    |
| `token`        | 网络请求的身份校验属性                     | `String / Boolean` | `false` |
| `submitFormat` | 输出和提交表单数据时，是否对数据进行格式化 | `Boolean`          | `true`  |
| `job`          | 用于表单联动匹配的工作方法集合             | `Object`           | `{}`    |

### `Schema`

| 属性         | 说明                 | 类型     | 默认值                |
| ------------ | -------------------- | -------- | --------------------- |
| `formSchema` | 表单UI和整体控制结构 | `Object` | [详情](###FormSchema) |
| `cellSchema` | 表单项结构集合       | `Array`  | [详情](###CellSchema) |

### FormSchema

| 属性                   | 说明                                   | 类型                     | 默认值  |
| ---------------------- | -------------------------------------- | ------------------------ | ------- |
| `inline`               | 设置行内表单模式（一般用在搜索的时候） | `Boolean`                | `false` |
| `labelPosition`        | 设置表单标签的位置                     | `left / right / top`     | `right` |
| `labelWidth`           | 表单标签的宽度                         | `String / Number / auto` | `120px` |
| `labelSuffix`          | 表单标签的后缀                         | `String`                 |         |
| `hideRequiredAsterisk` | 必填字段是否隐藏红色星号标识           | `Boolean`                | `false` |
| `showMessage`          | 是否显示校验错误信息                   | `Boolean`                | `true`  |
| `inlineMessage`        | 校验信息是否在行内显示                 | `Boolean`                | `false` |
| `statusIcon`           | 是否在输入框显示校验信息               | `Boolean`                | `false` |
| `disabled`             | 是否禁用表单                           | `Boolean`                | `false` |
| `gutter`               | 表单项在栅格布局下的间距               | `Number`                 | `12`    |

### CellSchema

| 属性            | 说明                                                         | 类型     | 默认值                   |
| --------------- | ------------------------------------------------------------ | -------- | ------------------------ |
| `mold`          | 用作设置同组件下的不同使用方式                               | `String` | `default`                |
| `componentName` | 表单项组件名称                                               | `String` | 详情                     |
| `field`         | 表单项数据的绑定字段名称                                     | `String` | 必填                     |
| `value`         | 表单项所属数据                                               | `Any`    | 具体类型查看对应组件说明 |
| `uiSchema`      | 表单项UI结构                                                 | `Object` | 详情                     |
| `ruleSchema`    | 表单项校验规则                                               | `Array`  | 详情                     |
| `dataSchema`    | 表单项数据结构（多用作有额外数据的表单项中，例如多选，单选） | `Object` | 具体属性查看对应组件说明 |
| `leaderTag`     | 表单项触发数值修改后的对应异步操作（控制者）                 | `Object` | 详情                     |
| `workerTag`     | 接收其他表单项异步操作的标识集合（受控者）                   | `Array`  | `[]`                     |




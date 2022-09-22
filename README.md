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
| `componentName` | 表单项组件名称                                               | `String` | 必填/详情                |
| `field`         | 表单项数据的绑定字段名称                                     | `String` | 必填                     |
| `value`         | 表单项所属数据                                               | `Any`    | 具体类型查看对应组件说明 |
| `uiSchema`      | 表单项UI结构                                                 | `Object` | 详情                     |
| `ruleSchema`    | 表单项校验规则                                               | `Array`  | 详情                     |
| `dataSchema`    | 表单项数据结构（多用作有额外数据的表单项中，例如多选，单选） | `Object` | 具体属性查看对应组件说明 |
| `leaderTag`     | 表单项触发数值修改后的对应异步操作（控制者）                 | `Object` | 详情                     |
| `workerTag`     | 接收其他表单项异步操作的标识集合（受控者）                   | `Array`  | `[]`                     |

### UISchema

> 以下只展示共享属性，独享属性需要查看对应组件说明

| 属性    | 说明                                                     | 类型     | 默认值 |
| ------- | -------------------------------------------------------- | -------- | ------ |
| `col`   | 栅格布局分布数值，一行放几个表单项，数值相加最大值是`24` | `Number` | `24`   |
| `label` | 表单项标签内容                                           | `String` | `""`   |
| `tips`  | 表单项说明内容                                           | `String` | `""`   |

### RuleSchema

> 以下只展示共享属性，独享属性需要查看对应组件说明

| 属性       | 说明             | 类型                    | 默认值  |
| ---------- | ---------------- | ----------------------- | ------- |
| `required` | 是否必填         | `Boolean`               | `false` |
| `message`  | `校验失败的说明` | `String`                | `""`    |
| `trigger`  | `校验时机`       | `blur / focus / change` |         |

## 组件

* `mg-input` [说明](###mg-input)
* `mg-radio`[说明](###mg-radio)

### mg-input

#### `uiSchema`

| 属性          | 说明           | 类型      | 默认值  |
| ------------- | -------------- | --------- | ------- |
| `placeholder` | 占位文本内容   | `String`  | `""`    |
| `disabled`    | 禁用           | `Boolean` | `false` |
| `prefixIcon`  | 输入框头部图标 | `String`  | `""`    |
| `suffixIcon`  | 输入框尾部图标 | `String`  | `""`    |
| `prepend`     | 输入框前置内容 | `String`  | `""`    |
| `append`      | 输入框后置内容 | `String`  | `""`    |
| `readonly`    | 是否只读       | `Boolean` | `false` |
| `disabled`    | 是否禁用       | `Boolean` | `false` |
| `clearable`   | 是否允许清空   | `Boolean` | `false` |

##### `text`

| 属性          | 说明                     | 类型              | 默认值         |
| ------------- | ------------------------ | ----------------- | -------------- |
| `value`       | 表单项数据               | `String / Number` | `""`           |
| `defValue`    | 表单项默认数据           | `String / Number` | `""`           |
| `placeholder` | 占位文本内容             | `String`          | 请输入内容     |
| `prefixIcon`  | 输入框头部图标           | `String`          | `el-icon-edit` |
| `autofocus`   | 自动获取焦点（原生属性） | `Boolean`         | `false`        |

##### `textarea`

| 属性            | 说明                     | 类型                                  | 默认值                   |
| --------------- | ------------------------ | ------------------------------------- | ------------------------ |
| `value`         | 表单项数据               | `String`                              | `""`                     |
| `defValue`      | 表单项默认数据           | `String`                              | `""`                     |
| `placeholder`   | 占位文本内容             | `String`                              | `请输入文本内容`         |
| `showWordLimit` | 是否显示字数统计         | `Boolean`                             | `true`                   |
| `maxlength`     | 最大输入长度（原生属性） | `Number`                              | `200`                    |
| `minlength`     | 最小输入长度（原生属性） | `Number`                              | `0`                      |
| `rows`          | 输入框默认行数           | `Number`                              | `2`                      |
| `autosize`      | 自适应内容高度           | `Object / Boolean`                    | `{minRows:2, maxRows:4}` |
| `resize`        | 是否允许用户缩放         | `none / both / horizontal / vertical` |                          |
| `autofocus`     | 自动获取焦点（原生属性） | `Boolean`                             | `false`                  |

##### `password`

| 属性           | 说明                           | 类型      | 默认值         |
| -------------- | ------------------------------ | --------- | -------------- |
| `value`        | 表单项数据                     | `String`  | `""`           |
| `defValue`     | 表单项默认数据                 | `String`  | `""`           |
| `placeholder`  | 占位文本内容                   | `String`  | 请输入密码     |
| `prefixIcon`   | 输入框头部图标                 | `String`  | `el-icon-lock` |
| `showPassword` | 是否显示密码显示隐藏的切换按钮 | `Boolean` | `true`         |

##### `number`

| 属性               | 说明                   | 类型         | 默认值  |
| ------------------ | ---------------------- | ------------ | ------- |
| `value`            | 表单项数据             | `Number`     | `0`     |
| `defValue`         | 表单项默认数据         | `Number`     | `0`     |
| `controlsPosition` | 控制按钮位置           | `right`      | `right` |
| `controls`         | 是否显示控制按钮       | `Boolean`    | `true`  |
| `step`             | 计数器步长             | `Number`     | `1`     |
| `stepStrictly`     | 是否只能输入步长的倍数 | `Boolean`    | `false` |
| `precision`        | 数值经度               | `Number`     |         |
| `minus`            | 是否可以为负数         | `Boolean`    | `false` |
| `min`              | 计数器允许的最小值     | ` -Infinity` | 负无穷  |
| `max`              | 计数器允许的最大值     | `Infinity`   | 正无穷  |

##### `integer`

| 属性               | 说明                   | 类型        | 默认值  |
| ------------------ | ---------------------- | ----------- | ------- |
| `value`            | 表单项数据             | `Number`    | `0`     |
| `defValue`         | 表单项默认数据         | `Number`    | `0`     |
| `step`             | 计数器步长             | `Number`    | `1`     |
| `stepStrictly`     | 是否只能输入步长的倍数 | `Boolean`   | `true`  |
| `controlsPosition` | 控制按钮位置           | `right`     | `right` |
| `controls`         | 是否显示控制按钮       | `Boolean`   | `true`  |
| `precision`        | 数值经度               | `Number`    |         |
| `minus`            | 是否可以为负数         | `Boolean`   | `false` |
| `min`              | 计数器允许的最小值     | `-Infinity` | 负无穷  |
| `max`              | 计数器允许的最大值     | `Infinity`  | 正无穷  |

##### `float`

| 属性               | 说明                   | 类型        | 默认值  |
| ------------------ | ---------------------- | ----------- | ------- |
| `value`            | 表单项数据             | `Number`    | `0.0`   |
| `defValue`         | 表单项默认数据         | `Number`    | `0.0`   |
| `step`             | 计数器步长             | `Number`    | `0.01`  |
| `stepStrictly`     | 是否只能输入步长的倍数 | `Boolean`   | `true`  |
| `controlsPosition` | 控制按钮位置           | `right`     | `right` |
| `controls`         | 是否显示控制按钮       | `Boolean`   | `true`  |
| `precision`        | 数值经度               | `Number`    | `2`     |
| `minus`            | 是否可以为负数         | `Boolean`   | `false` |
| `min`              | 计数器允许的最小值     | `-Infinity` | 负无穷  |
| `max`              | 计数器允许的最大值     | `Infinity`  | 正无穷  |

#### ruleSchema

| 属性  | 说明           | 类型     | 默认值 |
| ----- | -------------- | -------- | ------ |
| `min` | 允许的最小数值 | `Number` |        |
| `max` | 允许的最大数值 | `Number` |        |

### mg-radio

#### `uiSchema`

#### `ruleSchema`

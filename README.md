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
| `componentName` | 表单项组件名称                                               | `String` | [必填/详情](##组件)      |
| `field`         | 表单项数据的绑定字段名称                                     | `String` | 必填                     |
| `value`         | 表单项所属数据                                               | `Any`    | 具体类型查看对应组件说明 |
| `uiSchema`      | 表单项UI结构                                                 | `Object` | [详情](##UISchema)       |
| `ruleSchema`    | 表单项校验规则                                               | `Array`  | [详情](##RuleSchema)     |
| `dataSchema`    | 表单项数据结构（多用作有额外数据的表单项中，例如多选，单选） | `Object` | [详情](##DataSchema)     |
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

### DataSchema

| 属性          | 说明                     | 类型              | 默认值     |
| ------------- | ------------------------ | ----------------- | ---------- |
| `valueField`  | 数值标识                 | `String`          | `id`       |
| `textField`   | 标签标识                 | `String`          | `text`     |
| `attachField` | 附加描述标识             | `String`          | `attach`   |
| `isAttach`    | 是否显示附加描述         | `Boolean`         | `false`    |
| `enums`       | 选项集合                 | `Array`           | `[]`       |
| `lib`         | 额外数据                 | `Object`          | `{}`       |
| `childrenKey` | 下级节点标识             | `String`          | `children` |
| `step`        | `valueField`数值规则步长 | `String / Number` |            |
| `api`         | 异步选项集合来源         | `String`          |            |

---



## 组件

* `输入框 -> mg-input` [说明](###mg-input)
* `单选框 -> mg-radio` [说明](###mg-radio)
* `多选框 -> mg-check-box` [说明](###mg-check-box)
* `下拉框 -> mg-select` [说明](###mg-select)
* `日期框 -> mg-time` [说明](###mg-time)
* `上传 -> mg-upload` [说明](###mg-upload)
* `级联 -> mg-cascade` [说明](###mg-cascade)
* `搜索 -> mg-search` [说明](###mg-search)
* `开关 -> mg-switch`[说明](###mg-switch)
* `滑块 -> mg-slider`[说明](###mg-slider)

-----



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

##### `mold - text`

> `value 和 defValue` 的类型是`String / Number`，默认值是`""`

| 属性          | 说明                     | 类型              | 默认值         |
| ------------- | ------------------------ | ----------------- | -------------- |
| `placeholder` | 占位文本内容             | `String`          | 请输入内容     |
| `prefixIcon`  | 输入框头部图标           | `String`          | `el-icon-edit` |
| `autofocus`   | 自动获取焦点（原生属性） | `Boolean`         | `false`        |

##### `mold - textarea`

> `value 和 defValue` 的类型是`Number`，默认值是`""`

| 属性            | 说明                     | 类型                                  | 默认值                   |
| --------------- | ------------------------ | ------------------------------------- | ------------------------ |
| `placeholder`   | 占位文本内容             | `String`                              | 请输入文本内容           |
| `showWordLimit` | 是否显示字数统计         | `Boolean`                             | `true`                   |
| `maxlength`     | 最大输入长度（原生属性） | `Number`                              | `200`                    |
| `minlength`     | 最小输入长度（原生属性） | `Number`                              | `0`                      |
| `rows`          | 输入框默认行数           | `Number`                              | `2`                      |
| `autosize`      | 自适应内容高度           | `Object / Boolean`                    | `{minRows:2, maxRows:4}` |
| `resize`        | 是否允许用户缩放         | `none / both / horizontal / vertical` |                          |
| `autofocus`     | 自动获取焦点（原生属性） | `Boolean`                             | `false`                  |

##### `mold - password`

> `value 和 defValue` 的类型是`Number`，默认值是`""`

| 属性           | 说明                           | 类型      | 默认值         |
| -------------- | ------------------------------ | --------- | -------------- |
| `placeholder`  | 占位文本内容                   | `String`  | 请输入密码     |
| `prefixIcon`   | 输入框头部图标                 | `String`  | `el-icon-lock` |
| `showPassword` | 是否显示密码显示隐藏的切换按钮 | `Boolean` | `true`         |

##### `mold - number`

> `value 和 defValue` 的类型是`Number`，默认值是`0`

| 属性               | 说明                   | 类型         | 默认值  |
| ------------------ | ---------------------- | ------------ | ------- |
| `controlsPosition` | 控制按钮位置           | `right`      | `right` |
| `controls`         | 是否显示控制按钮       | `Boolean`    | `true`  |
| `step`             | 计数器步长             | `Number`     | `1`     |
| `stepStrictly`     | 是否只能输入步长的倍数 | `Boolean`    | `false` |
| `precision`        | 数值经度               | `Number`     |         |
| `minus`            | 是否可以为负数         | `Boolean`    | `false` |
| `min`              | 计数器允许的最小值     | ` -Infinity` | 负无穷  |
| `max`              | 计数器允许的最大值     | `Infinity`   | 正无穷  |

##### `mold - integer`

> `value 和 defValue` 的类型是`Number`，默认值是`0`

| 属性               | 说明                   | 类型        | 默认值  |
| ------------------ | ---------------------- | ----------- | ------- |
| `step`             | 计数器步长             | `Number`    | `1`     |
| `stepStrictly`     | 是否只能输入步长的倍数 | `Boolean`   | `true`  |
| `controlsPosition` | 控制按钮位置           | `right`     | `right` |
| `controls`         | 是否显示控制按钮       | `Boolean`   | `true`  |
| `precision`        | 数值经度               | `Number`    |         |
| `minus`            | 是否可以为负数         | `Boolean`   | `false` |
| `min`              | 计数器允许的最小值     | `-Infinity` | 负无穷  |
| `max`              | 计数器允许的最大值     | `Infinity`  | 正无穷  |

##### `mold - float`

> `value 和 defValue` 的类型是`Number`，默认值是`0.0`

| 属性               | 说明                   | 类型        | 默认值  |
| ------------------ | ---------------------- | ----------- | ------- |
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

----



### mg-radio

> 单选框的`mold`只有两种，并且没有实质区别，只是UI风格不同
>
> * `default`
> * `button`

#### `uiSchema`

| 属性        | 说明                           | 类型      | 默认值    |
| ----------- | ------------------------------ | --------- | --------- |
| `border`    | 是否显示边框                   | `Boolean` | `false`   |
| `disabled`  | 是否禁用                       | `Boolean` | `false`   |
| `textColor` | `button`时激活状态文本颜色     | `String`  | `#ffffff` |
| `fill`      | `button`时激活状态填充和边框色 | `String`  | `#409EFF` |

----



### mg-check-box

> 多选框的`mold`只有两种，并且没有实质区别，只是UI风格不同
>
> * `default`
> * `button`

#### `uiSchema`

| 属性            | 说明                           | 类型      | 默认值    |
| --------------- | ------------------------------ | --------- | --------- |
| `indeterminate` | 全选是否可用                   | `Boolean` | `false`   |
| `disabled`      | 是否禁用（整体）               | `Boolean` | `false`   |
| `border`        | 是否显示边框                   | `Boolean` | `false`   |
| `min`           | 允许被勾选数量的最小值         | `Number`  |           |
| `max`           | 允许被勾选数量的最大值         | `Number`  |           |
| `textColor`     | `button`时激活状态文本颜色     | `String`  | `#ffffff` |
| `fill`          | `button`时激活状态填充和边框色 | `String`  | `#409EFF` |

#### `ruleSchema`

| 属性  | 说明                       | 类型     | 默认值 |
| ----- | -------------------------- | -------- | ------ |
| `min` | 校验勾选数量不能小于该数值 | `Number` |        |
| `max` | 校验勾选数量不能大于该数值 | `Number` |        |

---



### mg-select

#### `uiSchema`

| 属性            | 说明                                      | 类型      | 默认值  |
| --------------- | ----------------------------------------- | --------- | ------- |
| `multiple`      | 是否可以多选                              | `Boolean` | `false` |
| `disabled`      | 是否禁用                                  | `Boolean` | `false` |
| `clearable`     | 是否可以清空                              | `Boolean` | `true`  |
| `collapseTags`  | 多选时是否将选中值按文字方式展示          | `Boolean` | `false` |
| `multipleLimit` | 多选时允许选择的最大数量，`0`标识不做限制 | `Number`  | `0`     |
| `placeholder`   | 占位文本内容                              | `String`  | 请选择  |
| `noDataText`    | 没有数据时的文本内容                      | `String`  | 无数据  |

---

### mg-time

#### `uiSchema`

| 属性               | 说明                               | 类型                    | 默认值                 |
| ------------------ | ---------------------------------- | ----------------------- | ---------------------- |
| `readonly`         | 是否只读                           | `Boolean`               | `false`                |
| `disabled`         | 是否禁用                           | `Boolean`               | `false`                |
| `clearable`        | 是否显示清除按钮                   | `Boolean`               | `true`                 |
| `placeholder`      | 非范围选择器占位内容               | `String`                | `""`                   |
| `startPlaceholder` | 范围选择器 - 开始日期的占位内容    | `String`                | `""`                   |
| `endPlaceholder`   | 范围选择器 - 结束日期的占位内容    | `String`                | `""`                   |
| `timeArrowControl` | 是否使用箭头进行时间选择           | `Boolean`               | `false`                |
| `format`           | 格式化规则                         | `String`                | 详情                   |
| `align`            | 对齐方式                           | `left / right / center` | `center`               |
| `rangeSeparator`   | 范围选择器分隔符号                 | `String`                | 至                     |
| `unlinkPanels`     | 范围选择器中取消两个面板之间的联动 | `Boolean`               | `false`                |
| `prefixIcon`       | 自定义头部图标                     | `String`                | `el-icon-date`         |
| `clearIcon`        | 自定义清空图标                     | `String`                | `el-icon-circle-close` |

##### `mold - date `

> `value 和 defValue`的类型是`String`，默认值是`""`

| 属性          | 说明       | 类型     | 默认值       |
| ------------- | ---------- | -------- | ------------ |
| `format`      | 格式化规则 | `String` | `yyyy-MM-dd` |
| `placeholder` | 占位内容   | `String` | 请选择日期   |

##### `mold - daterange`

> `value 和 defValue`的类型是`[String, String]`，默认值是`["", ""]`

| 属性               | 说明               | 类型     | 默认值       |
| ------------------ | ------------------ | -------- | ------------ |
| `format`           | 格式化规则         | `String` | `yyyy-MM-dd` |
| `startPlaceholder` | 开始日期的占位内容 | `String` | 开始日期     |
| `endPlaceholder`   | 结束日期的占位内容 | `String` | 结束日期     |

##### `mold - datetime`

> `value 和 defValue`的类型是`String`，默认值是`""`

| 属性          | 说明       | 类型     | 默认值                |
| ------------- | ---------- | -------- | --------------------- |
| `format`      | 格式化规则 | `String` | `yyyy-MM-dd HH:mm:ss` |
| `placeholder` | 占位内容   | `String` | 请选择时间            |

##### `mold - datetimerange`

> `value 和 defValue`的类型是`[String, String]`，默认值是`["", ""]`

| 属性               | 说明             | 类型     | 默认值                |
| ------------------ | ---------------- | -------- | --------------------- |
| `format`           | 格式化规则       | `String` | `yyyy-MM-dd HH:mm:ss` |
| `startPlaceholder` | 开始日期占位内容 | `String` | 开始日期              |
| `endPlaceholder`   | 结束日期占位内容 | `String` | 结束日期              |

##### `mold - month`

> `value 和 defValue`的类型是`String`，默认值是`""`

| 属性          | 说明       | 类型     | 默认值     |
| ------------- | ---------- | -------- | ---------- |
| `format`      | 格式化规则 | `String` | `yyyy-MM`  |
| `placeholder` | 占位内容   | `String` | 请选择月份 |

##### `mold - year`

> `value 和 defValue`的类型是`String`，默认值是`""`

| 属性          | 说明       | 类型     | 默认值     |
| ------------- | ---------- | -------- | ---------- |
| `format`      | 格式化规则 | `String` | `yyyy`     |
| `placeholder` | 占位内容   | `String` | 请选择年份 |

---

### mg-upload

#### `schema - value & defValue`

> `value 和 defValue`的类型都是`Array`，默认值是`[]`

| 属性   | 说明                         | 类型              | 默认值 |
| ------ | ---------------------------- | ----------------- | ------ |
| `id`   | 文件对象主键                 | `String / Number` | 必填   |
| `name` | 文件名称                     | `String`          | 必填   |
| `url`  | 文件地址（推荐使用绝对地址） | `String`          | 必填   |

#### `uiSchema`

| 属性         | 说明                                                       | 类型            | 默认值  |
| ------------ | ---------------------------------------------------------- | --------------- | ------- |
| `multiple`   | 是否允许多选                                               | `Boolean`       | `false` |
| `limit`      | 一次性选择文件的最大数量（0表示不做限制）                  | `Number`        | `0`     |
| `size`       | 可上传文件大小限制（单位：MB，-1表示不做限制）             | `Number`        | `-1`    |
| `types`      | 允许上传的文件后缀（只做后缀名的校验，没有校验文件本身）   | `Array<String>` | `[]`    |
| `blacklist`  | 不允许上传的文件后缀（只做后缀名的校验，没有校验文件本身） | `Array<String>` | `[]`    |
| `download`   | 点击文件名称时是否下载文件                                 | `Boolean`       | `false` |
| `percentage` | 是否显示上传进度条                                         | `Boolean`       | `true`  |
| `total`      | 是否显示上传文件总大小（单位：MB）                         | `Boolean`       | `true`  |
| `current`    | 是否显示上传文件已上传大小（单位：MB）                     | `Boolean`       | `true`  |
| `speed`      | 是否显示上传文件进度百分比（单位：%）                      | `Boolean`       | `true`  |
---

### mg-cascader

> `value 和 defValue`的类型可以是`String 或者 Array<String>`，默认值都是`""`
>
> 在`uiSchema.multiple = true`的情况下`value 和 defValue`的类型都是`Array<String>`
>
> 在`uiSchema.multiple = false`的情况下`value 和 defValue`的类型都是`String`
>
> **如果类型不对的话，下拉列表和下拉框中的数据是没法儿对应起来的**

#### `uiSchema`

| 属性            | 说明                                                         | 类型            | 默认值  |
| --------------- | ------------------------------------------------------------ | --------------- | ------- |
| `disabled`      | 是否被禁用                                                   | `Boolean`       | `false` |
| `clearable`     | 是否可以被清空                                               | `Boolean`       | `true`  |
| `showAllLevels` | 输入框中是否显示选中值的完整路径                             | `Boolean`       | `true`  |
| `collapseTags`  | 多选模式下是否折叠`Tag`                                      | `Boolean`       | `false` |
| `separator`     | 选项分隔符                                                   | `String`        | `/`     |
| `expandTrigger` | 菜单展开的触发方式                                           | `click / hover` | `hover` |
| `multiple`      | 是否允许多选                                                 | `Boolean`       | `false` |
| `checkStrictly` | 父亲节点是否需要关联（即无法随意选择任意一级，只能通过父节点找到最后一级子节点选中） | `Boolean`       | `true`  |

---

### mg-search

> `value 和 defValue`的类型可以是`String 或者 Array<String>`，默认值都是`""`
>
> 在`uiSchema.multiple = true`的情况下`value 和 defValue`的类型都是`Array<String>`
>
> 在`uiSchema.multiple = false`的情况下`value  和 defValue`的类型都是`String`
>
> **如果类型不对的话，搜索列表和搜素框中的数据是没法儿对应起来**

#### `uiSchema`

| 属性            | 说明                                      | 类型      | 默认值  |
| --------------- | ----------------------------------------- | --------- | ------- |
| `multiple`      | 是否允许多选                              | `Boolean` | `false` |
| `disabled`      | 是否被禁用                                | `Boolean` | `false` |
| `collapseTags`  | 多选时是否仅显示选中数量                  | `Boolean` | `false` |
| `multipleLimit` | 多选时用户最多可选择数量，`0`表示不做限制 | `Number`  | `0`     |

---

### mg-switch

#### `uiSchema`

| 属性            | 说明                 | 类型      | 默认值    |
| --------------- | -------------------- | --------- | --------- |
| `disabled`      | 是否禁用             | `Boolean` | `false`   |
| `width`         | 开关的宽度（像素）   | `Number`  | `40`      |
| `activeText`    | 开关打开时的文字描述 | `String`  | `''`      |
| `inactiveText`  | 开关关闭时的文字描述 | `String`  | `''`      |
| `activeColor`   | 开关打开时的背景色   | `String`  | `#409EFF` |
| `inactiveColor` | 开关关闭时的背景色   | `String`  | `#C0CCDA` |


#### `dataSchema`

> 如果类型和数值无法匹配或校验不通过的话则对应数值会使用该类型的默认值

| 属性            | 说明         | 类型                                | 默认值                   |
| --------------- | ------------ | ----------------------------------- | ------------------------ |
| `valueType`     | 描述值的类型 | `String<Boolean / String / Number>` | `'Boolean'`              |
| `activeValue`   | 选中状态的值 | `Boolean / String / Number`         | `true / 'usable' / 1`    |
| `inactiveValue` | 未选中的值   | `Boolean / String / Number`         | `false / 'unusable' / 0` |

---

### mg-slider

#### `uiSchema`

| 属性                | 说明               | 类型      | 默认值  |
| ------------------- | ------------------ | --------- | ------- |
| `min`               | 最小值             | `Number`  | `0`     |
| `max`               | 最大值             | `Number`  | `100`   |
| `disabled`          | 是否禁用           | `Boolean` | `false` |
| `step`              | 步长               | `Number`  | `1`     |
| `showInput`         | 是否显示输入框     | `Boolean` | `false` |
| `showInputControls` | 是否显示输入框控件 | `Boolean` | `true`  |
| `showStops`         | 是否显示间隔断点   | `Boolean` | `false` |
| `showTooltip`       | 是否显示提示       | `Boolean` | `true`  |

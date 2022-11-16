<!--
 * @Author: maggot-code
 * @Date: 2021-03-23 16:31:51
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-16 15:35:14
 * @Description: mg-cascader.vue
-->
<template>
    <el-cascader
        class="mg-cascader"
        v-bind="options"
        v-model="cascaderValue"
        :options="cascaderList">
        <div slot-scope="{node,data}">
            <p>{{toRender(node,data)}}</p>
        </div>
    </el-cascader>
</template>

<script>
import MgFormComponent from "../../mg-form/mixins/mg-form-component";
import { isNil, isArray, isString, isBoolean } from "lodash";

function toRender(node, data) {
    const { attachLabel } = data;
    return attachLabel;
}

// 序列化接口格式为element格式
function serializeValue(value, step) {
    if (value.length <= 0) return [];

    const valuePath = [];
    let len = Math.floor(value.length / step);

    while (len > 0) {
        valuePath.push(value.substr(0, len * step));
        len--;
    }

    return valuePath.reverse();
};

// 反序列化element格式到接口格式
function desSerializeValue(value,defValue) {
    return value.length <= 0 ? defValue : value[value.length - 1];
};

export default {
    name: "mg-cascader",
    trigger: "change",
    mixins: [MgFormComponent],
    components: {},
    props: {},
    data() {
        //这里存放数据
        const valueWatch = {
            variable: "value",
            func() {
                this.$set(this, "cascaderValue", this.formatValue);
            },
        };
        const cascaderValueWatch = {
            variable: "cascaderValue",
            func(newVal, oldVal) {
                if (newVal.toString() === oldVal.toString()) return;
                this.monitorValue({
                    mold: this.mold,
                    field: this.field,
                    value: this.formatCascaderValue,
                    cutValue: newVal,
                    handle: "cascader",
                });
            },
        };
        return {
            toRender,
            cascaderValue: [],
            cascaderList: [],
            watchHandle: Object.freeze([valueWatch, cascaderValueWatch]),
        };
    },
    //监听属性 类似于data概念
    computed: {
        valueStep() {
            const { step } = this.database;
            return this.setDefault(step, 0);
        },
        // 外部value变更，映射给内部cascaderValue，字符串转数组
        formatValue() {
            if (this.options.props.multiple) {
                return this.value.map(item => serializeValue(item, this.valueStep));
            }

            return serializeValue(this.value, this.valueStep);
        },
        // 内部cascaderValue变更，映射给外部value，数组转字符串
        formatCascaderValue() {
            if (this.options.props.multiple) {
                return this.cascaderValue.map(item => desSerializeValue(item, this.defValue));
            }

            return desSerializeValue(this.cascaderValue, this.defValue);
        },
        options: (vm) => {
            const { ui } = vm;
            const {
                label,
                placeholder,
                expandTrigger,
                multiple,
                clearable,
                checkStrictly
            } = ui;

            const baseLabel = vm.setDefault(label, "内容");
            const basePlaceholder = vm.setDefault(placeholder, `请选择${baseLabel}`);

            const props = {
                expandTrigger: vm.setDefault(expandTrigger,"hover"),
                multiple: vm.setDefault(multiple, false),
                checkStrictly: vm.setDefault(checkStrictly, false),
                value: vm.valueKey,
                label: vm.labelKey,
                children: vm.childrenKey,
                emitPath: true,
                lazy: false,
            }

            const vbind = {
                props,
                placeholder: basePlaceholder,
                filterable: false,
                clearable: vm.setDefault(clearable,true),
                "popper-append-to-body": true,
                "default-first-option": true,
            }

            return Object.assign({},ui,vbind);
        },
        disabledKey: (vm) => {
            const { database } = vm;
            return vm.setDefault(database.disabledField, "disabled");
        },
        childrenKey: (vm) => {
            const { database } = vm;
            return vm.setDefault(database.childrenKey, "children");
        },
        valueKey: (vm) => {
            const { database } = vm;
            return vm.setDefault(database.valueField, "id");
        },
        labelKey: (vm) => {
            const { database } = vm;
            return vm.setDefault(database.textField, "label");
        },
        attachKey: (vm) => {
            const { database } = vm;
            return vm.setDefault(database.attachField, "attach");
        },
        useAttach: (vm) => {
            const { database } = vm;
            const { isAttach } = database;
            return isBoolean(isAttach) ? isAttach : false;
        },
        useApi: (vm) => {
            const { database } = vm;
            const { api } = database;
            return isString(api);
        },
        config: (vm) => {
            const { database } = vm;
            const { api, lib } = database;
            return {
                address: isNil(api) ? "" : api,
                lib: isNil(lib) ? {} : lib,
                field: vm.field,
                valueKey: vm.valueKey,
                labelKey: vm.labelKey,
                childKey: vm.childrenKey
            }
        }
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        setDefault(value, def) {
            return isNil(value) ? def : value;
        },
        setupSelectList(data) {
            if (!isArray(data)) return [];
            return data.map(this.setupSelectItem);
        },
        setupSelectItem(item) {
            const {
                [this.labelKey]: label,
                [this.attachKey]: baseAttach
            } = item;
            const state = this.useAttach && isString(baseAttach);
            const attachLabel = state ? `${label}(${baseAttach})` : label;
            const value = item[this.valueKey];
            const hasChild = isArray(item[this.childrenKey]) && item[this.childrenKey].length > 0;
            const extend = {
                label,
                attachLabel,
                value,
            }

            if(hasChild) extend[this.childrenKey] = this.setupSelectList(item[this.childrenKey]);

            return Object.assign({}, item, extend);
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    async created() {
        if (this.useApi) {
            const data = await this.form.remote.enums(this.config);
            this.cascaderList = this.setupSelectList(data);
        } else {
            this.cascaderList = this.setupSelectList(this.database.enums);
        }

        this.initValue("cascaderValue", this.formatValue).then(() => {
            this.$emit("update:value", this.formatCascaderValue);
            this.mountWatch(this.watchHandle);
        });
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
@import "./mg-cascader.scss";
</style>

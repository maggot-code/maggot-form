<!--
 * @Author: maggot-code
 * @Date: 2021-03-23 16:31:51
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-24 10:18:37
 * @Description: mg-cascader.vue
-->
<template>
    <el-cascader
        class="mg-cascader"
        v-model="selectValue"
        v-bind="options"
        :options="selectData"
    ></el-cascader>
</template>

<script>
import MgFormComponent from "../../mg-form/mixins/mg-form-component";
import { send } from "../../mg-form/axios";
import { isArray, isNil } from "lodash";
export default {
    name: "mg-cascader",
    mixins: [MgFormComponent],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            selectValue: this.serializeValue(this.value),
            selectData: [],
        };
    },
    //监听属性 类似于data概念
    computed: {
        options: (vm) => {
            const { mold, field, ui, rule } = vm;
            const {
                multiple,
                checkStrictly,
                label,
                placeholder,
                separator,
                disabled,
                clearable,
                showAllLevels,
                collapseTags,
            } = ui;
            const baseLabel = vm.setDefault(label, "");
            const props = {
                multiple: vm.setDefault(multiple, false), // 是否多选
                checkStrictly: vm.setDefault(checkStrictly, false), // 是否可以任选一级
                expandTrigger: "click",
                value: vm.valueKey,
                label: vm.labelKey,
                children: vm.childrenKey,
                disabled: vm.disabledKey,
            };
            const vbind = {
                separator: vm.setDefault(separator, "/"),
                placeholder: vm.setDefault(placeholder, `请选择${baseLabel}`),
                disabled: vm.setDefault(disabled, false),
                clearable: vm.setDefault(clearable, true),
                "show-all-levels": vm.setDefault(showAllLevels, false),
                "collapse-tags": vm.setDefault(collapseTags, true),
                props: props,
            };

            return vbind;
        },
        requestApi: (vm) => {
            const { proName, database } = vm;
            const { api } = database;

            return proName + api;
        },
        requestParams: (vm) => {
            const { database } = vm;
            const { lib } = database;

            return lib;
        },
        valueKey: (vm) => {
            const { database } = vm;
            return vm.setDefault(database.valueField, "id");
        },
        labelKey: (vm) => {
            const { database } = vm;
            return vm.setDefault(database.textField, "text");
        },
        childrenKey: (vm) => {
            const { database } = vm;
            return vm.setDefault(database.childrenField, "children");
        },
        disabledKey: (vm) => {
            const { database } = vm;
            return vm.setDefault(database.disabledField, "disabled");
        },
    },
    //监控data中的数据变化
    watch: {
        value(newVal) {
            this.$set(this, "selectValue", this.serializeValue(newVal));
        },
        selectValue(newVal) {
            this.monitorValue({
                mold: this.mold,
                field: this.field,
                value: this.desSerializeValue(newVal),
                handle: "change",
            });
        },
    },
    //方法集合
    methods: {
        // 序列化接口格式为element格式
        serializeValue(value) {
            const { step } = this.database;
            const valuePath = [];
            let baseLen = value.length / step;

            while (baseLen > 0) {
                const strSub = this.handleSelectValue(baseLen);

                valuePath.push(strSub(value));

                baseLen--;
            }

            return valuePath.reverse();
        },
        // 反序列化element格式到接口格式
        desSerializeValue(valuePath) {
            const index = valuePath.length - 1;

            return valuePath[index];
        },
        // 拆分字符串
        handleSelectValue(baseStep) {
            const { step } = this.database;

            return function (value) {
                const varStep = baseStep * step;
                return value.substr(0, varStep);
            };
        },
        setDefault(value, def) {
            return isNil(value) ? def : value;
        },
        setSelectData(data = []) {
            this.selectData = isArray(data) ? data : [];
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        send({
            url: this.requestApi,
            method: "POST",
            params: this.requestParams,
        })
            .then((res) => this.setSelectData(res.data))
            .catch((error) => this.setSelectData());
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

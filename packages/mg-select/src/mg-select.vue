<!--
 * @Author: maggot-code
 * @Date: 2021-03-04 16:53:45
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-30 13:18:08
 * @Description: mg-select.vue component
-->
<template>
    <!-- @change="handleChange" -->
    <el-select class="mg-select" v-model="selectValue" v-bind="options">
        <el-option
            v-for="item in selectList"
            :key="item[hasKey]"
            :label="item[hasValue]"
            :value="item[hasKey]"
            :disabled="item.disabled"
        ></el-option>
    </el-select>
</template>

<script>
import MgFormComponent from "../../mg-form/mixins/mg-form-component";
import { setEnums } from "../../mg-form/utils";
import { isArray, isNil } from "lodash";
export default {
    name: "mg-select",
    trigger: "change",
    mixins: [MgFormComponent],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            selectValue: "",
            watchHandle: [
                {
                    variable: "value",
                    func(newVal) {
                        this.$set(this, "selectValue", newVal);
                    },
                },
                {
                    variable: "selectValue",
                    func(newVal) {
                        this.monitorValue({
                            mold: this.mold,
                            field: this.field,
                            value: newVal,
                            handle: "change",
                        });
                    },
                },
            ],
        };
    },
    //监听属性 类似于data概念
    computed: {
        options: (vm) => {
            const { mold, field, ui, rule } = vm;
            const { label, placeholder, clearable } = ui;

            const baseLabel = label || "内容";
            const basePlaceholder = placeholder || `请输入${baseLabel}`;

            return Object.assign({}, ui, {
                placeholder: basePlaceholder,
                clearable: vm.setDefault(clearable, true),
                "popper-append-to-body": false,
            });
        },
        selectList: (vm) => {
            const { enums } = vm.database;
            return isArray(enums) ? enums.map(setEnums) : [];
        },
        hasKey: (vm) => {
            const { valueField } = vm.database;
            return valueField;
        },
        hasValue: (vm) => {
            const { textField } = vm.database;
            return textField;
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        setDefault(value, def) {
            return isNil(value) ? def : value;
        },
        /**
         * @description: 处理 change 事件
         * @param {String | Number | Array} value 更新数值
         */
        handleChange(value) {
            this.monitorValue({
                mold: this.mold,
                field: this.field,
                value: value,
                handle: "change",
            });
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.initValue("selectValue", this.value).then((val) => {
            this.$emit("update:value", val);
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
@import "./mg-select.scss";
</style>

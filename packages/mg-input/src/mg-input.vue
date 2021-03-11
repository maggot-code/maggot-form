<!--
 * @Author: maggot-code
 * @Date: 2021-03-04 09:50:31
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-11 23:56:54
 * @Description: mg-input.vue component
-->
<template>
    <!-- @input="handleInput" -->
    <el-input-number
        v-if="checkNumber"
        class="mg-input"
        v-model="inputValue"
        v-bind="options"
    >
    </el-input-number>

    <el-input v-else class="mg-input" v-model="inputValue" v-bind="options">
        <template v-if="checkText && hasPrepend" slot="prepend">{{
            hasPrepend
        }}</template>

        <template v-if="checkText && hasAppend" slot="append">{{
            hasAppend
        }}</template>
    </el-input>
</template>

<script>
import MgFormComponent from "../../mg-form/mixins/mg-form-component";
import MgInputText from "../mixins/mg-input-text";
import MgInputTextarea from "../mixins/mg-input-textarea";
import MgInputPassword from "../mixins/mg-input-password";
import MgInputNumber from "../mixins/mg-input-number";
import MgInputInteger from "../mixins/mg-input-integer";
import MgInputFloat from "../mixins/mg-input-float";
export default {
    name: "mg-input",
    mixins: [
        MgFormComponent,
        MgInputText,
        MgInputTextarea,
        MgInputPassword,
        MgInputNumber,
        MgInputInteger,
        MgInputFloat,
    ],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            inputValue: this.value,
            handleMoldOptions: {
                text: this.moldText,
                textarea: this.moldTextarea,
                password: this.moldPassword,
                number: this.moldNumber,
                integer: this.moldInteger,
                float: this.moldFloat,
            },
        };
    },
    //监听属性 类似于data概念
    computed: {
        options: (vm) => {
            const { mold, field, ui, rule } = vm;
            const { label, placeholder } = ui;

            const moldRenderFunc = vm.handleMoldOptions[mold];
            const vbind = moldRenderFunc ? moldRenderFunc(ui || {}) : ui;

            const baseLabel = label || vbind.label;
            const basePlaceholder = placeholder || `请输入${baseLabel}`;

            return Object.assign({}, vbind, {
                placeholder: basePlaceholder,
            });
        },
        hasPrepend: (vm) => {
            const { prepend } = vm.ui;
            return prepend ? prepend : "";
        },
        hasAppend: (vm) => {
            const { append } = vm.ui;
            return append ? append : "";
        },
        checkText: (vm) => {
            const { mold } = vm;
            return mold === "text";
        },
        checkNumber: (vm) => {
            const { mold } = vm;
            const type = ["number", "integer", "float"];
            return type.indexOf(mold) >= 0;
        },
    },
    //监控data中的数据变化
    watch: {
        value(newVal) {
            this.$set(this, "inputValue", newVal);
        },
        inputValue(newVal) {
            this.monitorValue({
                mold: this.mold,
                field: this.field,
                value: newVal,
                handle: "input",
            });
        },
    },
    //方法集合
    methods: {
        /**
         * @description: 处理 input 事件
         * @param {String | Number} value 更新数值
         */
        handleInput(value) {
            this.monitorValue({
                mold: this.mold,
                field: this.field,
                value: value,
                handle: "input",
            });
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
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
@import "./mg-input.scss";
</style>

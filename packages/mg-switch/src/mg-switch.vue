<!--
 * @FilePath: \maggot-form\packages\mg-switch\src\mg-switch.vue
 * @Author: maggot-code
 * @Date: 2022-10-17 17:02:36
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-10-17 17:42:35
 * @Description: 
-->
<template>
    <el-switch class='mg-switch' v-model="switchValue" v-bind="options"></el-switch>
</template>

<script>
import MgFormComponent from "../../mg-form/mixins/mg-form-component";
import { isBoolean, isString, isNumber } from "lodash";

const BooleanSymbol = "Boolean";
const StringSymbol = "String";
const NumberSymbol = "Number";
const BooleanDefault = {
    check:isBoolean,
    value: false,
    activeValue: true,
    inactiveValue:false
};
const StringDefault = {
    check:isString,
    value: "unusable",
    activeValue: "usable",
    inactiveValue: "unusable"
}
const NumberDefault = {
    check:isNumber,
    value: 0,
    activeValue: 1,
    inactiveValue: 0
}
const ValueDefault = {
    [BooleanSymbol]: BooleanDefault,
    [StringSymbol]: StringDefault,
    [NumberSymbol]: NumberDefault
}
export default {
    name: 'mg-switch',
    trigger: "change",
    mixins: [MgFormComponent],
    components: {},
    props: {},
    data() {
        //这里存放数据
        const watchHandle = Object.freeze([
            {
                variable: "value",
                func(newVal) {
                    this.$set(this, "switchValue", newVal);
                },
            },
            {
                variable: "switchValue",
                func(newVal) {
                    this.monitorValue({
                        mold: this.mold,
                        field: this.field,
                        value: newVal,
                        handle: "switch",
                    });
                },
            },
        ]);
        return {
            switchValue: false,
            watchHandle
        };
    },
    //监听属性 类似于data概念
    computed: {
        dataValue(){
            const { valueType } = this.database;
            const target = ValueDefault[valueType ?? "Boolean"] ?? ValueDefault.Boolean;
            const activeValue = target.check(this.database?.activeValue) ? this.database.activeValue : target.activeValue;
            const inactiveValue = target.check(this.database?.inactiveValue) ? this.database.inactiveValue : target.inactiveValue;
            const value = target.check(this.value) ? this.value : target.value;

            return { value, activeValue, inactiveValue };
        },
        options: (vm) => {
            const { ui } = vm;
            const { activeValue, inactiveValue } = vm.dataValue;

            const bind = Object.assign({}, ui, {activeValue,inactiveValue});

            return Object.assign({}, bind, {
                validateEvent: false
            });
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {},
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.initValue("switchValue", this.dataValue.value).then((val) => {
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
@import "./mg-switch.scss";
</style>

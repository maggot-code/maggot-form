<!--
 * @Author: maggot-code
 * @Date: 2021-03-06 14:43:37
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-04-13 13:23:05
 * @Description: mg-radio.vue component
-->
<template>
    <el-radio-group
        class="mg-radio"
        v-model="radioValue"
        v-bind="options"
        size="small"
    >
        <template v-if="mold === 'button'">
            <el-radio-button
                v-for="cell in radioList"
                :key="cell[valueKey]"
                :label="cell[valueKey]"
                :disabled="cell.disabled"
                >{{ cell[labelKey] }}</el-radio-button
            >
        </template>

        <template v-else>
            <el-radio
                v-for="cell in radioList"
                :key="cell[valueKey]"
                :label="cell[valueKey]"
                :disabled="cell.disabled"
                :border="options.border"
                >{{ cell[labelKey] }}</el-radio
            >
        </template>
    </el-radio-group>
</template>

<script>
import MgFormComponent from "../../mg-form/mixins/mg-form-component";
import { setEnums } from "../../mg-form/utils";
import { isArray, isNil } from "lodash";
export default {
    name: "mg-radio",
    trigger: "change",
    mixins: [MgFormComponent],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            radioValue: "",
            watchHandle: [
                {
                    variable: "value",
                    func(newVal) {
                        this.$set(this, "radioValue", newVal);
                    },
                },
                {
                    variable: "radioValue",
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
            return ui;
        },
        radioList: (vm) => {
            const { enums } = vm.database;
            return isArray(enums) ? enums.map(setEnums) : [];
        },
        valueKey: (vm) => {
            const { database } = vm;
            return vm.setDefault(database.valueField, "id");
        },
        labelKey: (vm) => {
            const { database } = vm;
            return vm.setDefault(database.textField, "text");
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        setDefault(value, def) {
            return isNil(value) ? def : value;
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.initValue("radioValue", this.value).then((val) => {
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
@import "./mg-radio.scss";
</style>

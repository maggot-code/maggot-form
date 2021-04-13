<!--
 * @Author: maggot-code
 * @Date: 2021-03-06 17:34:33
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-04-13 13:24:57
 * @Description: mg-check-box.vue component
-->
<template>
    <div class="mg-check-box">
        <el-checkbox
            v-if="selectAll"
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
            >全选</el-checkbox
        >

        <el-checkbox-group v-model="checkValue" v-bind="options" size="small">
            <template v-if="mold === 'button'">
                <el-checkbox-button
                    v-for="cell in checkList"
                    :key="cell[valueKey]"
                    :label="cell[valueKey]"
                    :disabled="cell.disabled"
                    >{{ cell[labelKey] }}</el-checkbox-button
                >
            </template>

            <template v-else>
                <el-checkbox
                    v-for="cell in checkList"
                    :key="cell[valueKey]"
                    :label="cell[valueKey]"
                    :disabled="cell.disabled"
                    :border="options.border"
                    >{{ cell[labelKey] }}</el-checkbox
                >
            </template>
        </el-checkbox-group>
    </div>
</template>

<script>
import MgFormComponent from "../../mg-form/mixins/mg-form-component";
import { setEnums } from "../../mg-form/utils";
import { isArray, isNil } from "lodash";
export default {
    name: "mg-check-box",
    trigger: "change",
    mixins: [MgFormComponent],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            checkValue: "",
            checkAll: false,
            isIndeterminate: false,
            watchHandle: [
                {
                    variable: "value",
                    func(newVal) {
                        this.$set(this, "checkValue", newVal);
                    },
                },
                {
                    variable: "checkValue",
                    func(newVal) {
                        this.isCheckAll(newVal);
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
        valueKey: (vm) => {
            const { database } = vm;
            return vm.setDefault(database.valueField, "id");
        },
        labelKey: (vm) => {
            const { database } = vm;
            return vm.setDefault(database.textField, "text");
        },
        checkList: (vm) => {
            const { enums } = vm.database;
            return isArray(enums) ? enums.map(setEnums) : [];
        },
        selectAll: (vm) => {
            const { indeterminate } = vm.ui;
            return isNil(indeterminate) ? false : indeterminate;
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        handleCheckAllChange(value) {
            const copyEnumsValue = this.checkList.map((item) => item.value);
            const newVal = value ? copyEnumsValue : [];

            this.$set(this, "checkValue", newVal);
        },
        isCheckAll(value) {
            const checkedCount = value.length;
            const checkAll = checkedCount === this.checkList.length;
            const isIndeterminate =
                checkedCount > 0 && checkedCount < this.checkList.length;

            this.checkAll = checkAll;
            this.isIndeterminate = isIndeterminate;
        },
        setDefault(value, def) {
            return isNil(value) ? def : value;
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.initValue("checkValue", this.value).then((val) => {
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
@import "./mg-check-box.scss";
</style>

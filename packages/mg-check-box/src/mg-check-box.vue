<!--
 * @Author: maggot-code
 * @Date: 2021-03-06 17:34:33
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-06 18:05:06
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
                    :key="cell.eid"
                    :label="cell.value"
                    :disabled="cell.disabled"
                    >{{ cell.label }}</el-checkbox-button
                >
            </template>

            <template v-else>
                <el-checkbox
                    v-for="cell in checkList"
                    :key="cell.eid"
                    :label="cell.value"
                    :disabled="cell.disabled"
                    :border="options.border"
                    >{{ cell.label }}</el-checkbox
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
    mixins: [MgFormComponent],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            checkValue: this.value,
            checkAll: false,
            isIndeterminate: false,
        };
    },
    //监听属性 类似于data概念
    computed: {
        options: (vm) => {
            const { mold, field, ui, rule } = vm;
            return ui;
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
    watch: {
        value(newVal) {
            this.$set(this, "checkValue", newVal);
        },
        checkValue(newVal) {
            this.isCheckAll(newVal);
            this.monitorValue({
                mold: this.mold,
                field: this.field,
                value: newVal,
                handle: "change",
            });
        },
    },
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
@import "./mg-check-box.scss";
</style>

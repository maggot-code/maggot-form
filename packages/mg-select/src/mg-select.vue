<!--
 * @Author: maggot-code
 * @Date: 2021-03-04 16:53:45
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-04 18:33:28
 * @Description: mg-select.vue component
-->
<template>
    <el-select
        class="mg-select"
        v-model="selectValue"
        v-bind="options"
        @change="handleChange"
    >
        <el-option
            v-for="item in selectList"
            :key="item.eid"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
        ></el-option>
    </el-select>
</template>

<script>
import MgFormComponent from "../../mg-form/mixins/mg-form-component";
export default {
    name: "mg-select",
    mixins: [MgFormComponent],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            selectValue: this.value,
        };
    },
    //监听属性 类似于data概念
    computed: {
        options: (vm) => {
            const { mold, field, ui, rule } = vm;
            return ui;
        },
        selectList: (vm) => {
            const { enums } = vm.database;

            return enums.map((item) => {
                const disabledType = typeof item.disabled;
                const disabledFlg =
                    disabledType !== "undefined" && disabledType === "boolean";
                const disabled = disabledFlg ? item.disabled : false;

                return { ...item, disabled: disabled };
            });
        },
    },
    //监控data中的数据变化
    watch: {
        value: {
            handler(newVal) {
                this.selectValue = newVal;
            },
            deep: true,
        },
    },
    //方法集合
    methods: {
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
        console.log(this.$Tagmill);
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

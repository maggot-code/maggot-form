<!--
 * @Author: maggot-code
 * @Date: 2021-03-17 11:29:36
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-16 15:51:01
 * @Description: mg-time.vue component
-->
<template>
    <el-date-picker style="width: 100%;" class="mg-time" v-model="timeValue" v-bind="options"></el-date-picker>
</template>

<script>
import MgFormComponent from "../../mg-form/mixins/mg-form-component";
import MgTimeDate from "../mixins/mg-time-date";
import MgTimeDaterange from "../mixins/mg-time-daterange";
// import MgTimeDates from "../mixins/mg-time-dates";
import MgTimeDatetime from "../mixins/mg-time-datetime";
import MgTimeDatetimerange from "../mixins/mg-time-datetimerange";
import MgTimeMonth from "../mixins/mg-time-month";
// import MgTimeMonthrange from "../mixins/mg-time-monthrange";
import MgTimeYear from "../mixins/mg-time-year";

import { isEqual, isString, isArray } from "lodash";
import { default as dateFormat } from 'date-fns/format';

export default {
    name: "mg-time",
    trigger: "change",
    mixins: [
        MgFormComponent,
        MgTimeDate,
        MgTimeDaterange,
        // MgTimeDates,
        MgTimeDatetime,
        MgTimeDatetimerange,
        MgTimeMonth,
        // MgTimeMonthrange,
        MgTimeYear,
    ],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            timeValue: "",
            watchHandle: Object.freeze([
                {
                    variable: "value",
                    func(newVal, oldVal) {
                        if (isEqual(newVal, oldVal)) return;
                        this.$set(this, "timeValue", this.setupValue(newVal));
                    },
                },
                {
                    variable: "timeValue",
                    func(newVal) {
                        const defValue = isArray(newVal) ? [] : "";
                        this.monitorValue({
                            mold: this.mold,
                            field: this.field,
                            value: newVal ?? defValue,
                            handle: "input",
                        });
                    },
                },
            ]),
            handleMoldOptions: {
                date: this.moldDate,
                // dates: this.moldDates,
                daterange: this.moldDaterange,
                datetime: this.moldDatetime,
                datetimerange: this.moldDatetimerange,
                month: this.moldMonth,
                // monthrange: this.moldMonthrange,
                year: this.moldYear,
            }
        };
    },
    //监听属性 类似于data概念
    computed: {
        options: (vm) => {
            const { mold, field, ui, rule } = vm;

            const moldRenderFunc = vm.handleMoldOptions[mold];
            const vbind = moldRenderFunc ? moldRenderFunc(ui || {}) : ui;

            return Object.assign({}, vbind, {
                align: "center",
                editable: false,
                clearable: true,
                "format": vbind.format,
                "value-format": "yyyy-MM-dd HH:mm:ss",
                "range-separator": "至",
                "validate-event": false,
            });
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        setupValue(value) {
            const stringEmpty = isString(value) && value.length <= 0;
            const stringNotEmpty = isString(value) && value.length > 0;

            if (stringEmpty) return value;

            if (!isArray(value) && stringNotEmpty)
                return this.changeDate(value);

            return value.map((val) => this.changeDate(val));
        },
        changeDate(dateValue) {
            if (this.isDateObject(dateValue)) {
                return dateFormat(new Date(dateValue), "yyyy-MM-dd HH:mm:ss");
            } else {
                const date = new Date(dateValue);
                return this.isDateObject(date)
                    ? dateFormat(date, "yyyy-MM-dd HH:mm:ss")
                    : "";
            }
        },
        isDateObject(value) {
            return value instanceof Date;
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.initValue("timeValue", this.setupValue(this.value)).then((val) => {
            this.$emit("update:value", val);
            this.mountWatch(this.watchHandle);
        });
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
@import "./mg-time.scss";
</style>

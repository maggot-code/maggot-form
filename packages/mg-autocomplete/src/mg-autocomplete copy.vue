<!--
 * @Author: maggot-code
 * @Date: 2021-03-23 11:24:59
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-24 12:35:55
 * @Description: mg-autocomplete.vue component
-->
<template>
    <el-autocomplete
        class="mg-autocomplete"
        v-model="inputLabel"
        v-bind="options"
        :fetch-suggestions="querySearchAsync"
        @select="handleSelect"
    ></el-autocomplete>
</template>

<script>
import MgFormComponent from "../../mg-form/mixins/mg-form-component";
import { send } from "../../mg-form/axios";
import { isNil } from "lodash";
export default {
    name: "mg-autocomplete",
    mixins: [MgFormComponent],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            inputLabel: "",
            timeout: null,
        };
    },
    //监听属性 类似于data概念
    computed: {
        options: (vm) => {
            const { mold, field, ui, rule } = vm;
            const { label, placeholder, clearable } = ui;
            const baseLabel = label || "内容";
            const basePlaceholder = placeholder || `请输入${baseLabel}`;
            const vbind = Object.assign({}, ui, {
                placeholder: basePlaceholder,
                clearable: vm.setDefault(clearable, true),
                "value-key": "label",
                "highlight-first-item": true,
                "trigger-on-focus": false,
            });

            return vbind;
        },
        requestApi: (vm) => {
            const { proName, database } = vm;
            const { api } = database;

            return isNil(api) ? false : proName + api;
        },
        valueKey: (vm) => {
            const { database } = vm;
            return vm.setDefault(database.valueField, "userid");
        },
        labelKey: (vm) => {
            const { database } = vm;
            return vm.setDefault(database.textField, "truename");
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        setDefault(value, def) {
            return isNil(value) ? def : value;
        },
        setInputLabel(value) {
            if (!value) {
                this.inputLabel = "";
                return false;
            }
            const params = {};
            params[this.valueKey] = value;

            this.getData(params)
                .then((res) => {
                    const { data } = res;
                    this.inputLabel =
                        data.length <= 0 ? value : data[0][this.labelKey];
                })
                .catch((error) => {
                    this.inputLabel = "";
                });
        },
        handleSelect(cell) {
            const { value } = cell;
            this.monitorValue({
                mold: this.mold,
                field: this.field,
                value: value.toString(),
                handle: "input",
            });
        },
        querySearchAsync(queryString, callback) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                const params = {};
                params[this.labelKey] = queryString;

                this.getData(params)
                    .then((res) => {
                        const { data } = res;
                        callback(this.setDataStruct(data));
                    })
                    .catch((error) => {
                        callback([]);
                        this.inputLabel = "";
                    });
            }, 200);
        },
        setDataStruct(data) {
            return data.map((cell) => this.setCellStruct(cell));
        },
        setCellStruct(cell) {
            return {
                value: cell[this.valueKey],
                label: cell[this.labelKey],
            };
        },
        getData(params) {
            return new Promise((resolve, reject) => {
                send({
                    url: this.requestApi,
                    method: "POST",
                    params: params,
                })
                    .then((res) => resolve(res))
                    .catch((error) => reject(error));
            });
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        // 1735443
        this.setInputLabel(this.value);
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
@import "./mg-autocomplete.scss";
</style>

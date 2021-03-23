<!--
 * @Author: maggot-code
 * @Date: 2021-03-23 11:24:59
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-23 15:38:15
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
export default {
    name: "mg-autocomplete",
    mixins: [MgFormComponent],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            inputValue: this.value,
            inputLabel: "",
            timeout: null,
        };
    },
    //监听属性 类似于data概念
    computed: {
        options: (vm) => {
            const { mold, field, ui, rule } = vm;
            const { label, placeholder } = ui;
            const baseLabel = label || vbind.label;
            const basePlaceholder = placeholder || `请输入${baseLabel}`;
            const vbind = Object.assign({}, ui, {
                placeholder: basePlaceholder,
                clearable: true,
                "value-key": "label",
                "highlight-first-item": true,
            });

            return vbind;
        },
        requestApi: (vm) => {
            const { proName, database } = vm;
            const { api } = database;

            return proName + api;
        },
    },
    //监控data中的数据变化
    watch: {
        value(newVal) {
            this.$set(this, "inputValue", newVal);
        },
    },
    //方法集合
    methods: {
        setInputValue(value) {
            if (!value) {
                return "";
            }

            this.getData({ userid: value })
                .then((res) => {
                    const { data } = res;
                    this.inputLabel =
                        data.length <= 0 ? value : data[0].truename;
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
                this.getData({ truename: queryString })
                    .then((res) => {
                        const { data } = res;
                        callback(this.setDataStruct(data));
                    })
                    .catch((error) => {
                        callback([]);
                    });
            }, 200);
        },
        setDataStruct(data) {
            return data.map((cell) => this.setCellStruct(cell));
        },
        setCellStruct(cell) {
            const { userid, truename, departmentidname } = cell;
            const label = truename;
            return {
                value: userid,
                label: label,
            };
        },
        getData(params) {
            const { truename, userid } = params;
            return new Promise((resolve, reject) => {
                send({
                    url: this.requestApi,
                    method: "POST",
                    params: { truename: truename, userid: userid },
                })
                    .then((res) => resolve(res))
                    .catch((error) => reject(error));
            });
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        // 1735443
        this.inputLabel = this.setInputValue(this.value);
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

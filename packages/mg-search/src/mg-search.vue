<!--
 * @FilePath: \maggot-form\packages\mg-search\src\mg-search.vue
 * @Author: maggot-code
 * @Date: 2022-09-29 14:52:34
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-29 17:00:47
 * @Description: 
-->
<template>
    <el-select
        class='mg-search'
        v-model="searchValue"
        v-bind="options"
        :loading="searchLoading"
        :remote-method="remoteMethod">
        <template v-for="item in searchList" >
            <el-option
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">
                <p>{{item.attachLabel}}</p>
            </el-option>
        </template>
    </el-select>
</template>

<script>
import MgFormComponent from "../../mg-form/mixins/mg-form-component";
import { isArray, isBoolean, isNil, isString } from "lodash";

export default {
    name: 'mg-search',
    trigger: "change",
    mixins: [MgFormComponent],
    components: {},
    props: {},
    data() {
        const valueWatch = {
            variable: "value",
            func(newVal) {
                this.$set(this, "searchValue", newVal);
            },
        };
        const searchValueWatch = {
            variable: "searchValue",
            func(newVal) {
                this.monitorValue({
                    mold: this.mold,
                    field: this.field,
                    value: newVal,
                    handle: "search",
                });
            },
        }
        //这里存放数据
        return {
            searchValue: this.value,
            searchList:[],
            searchLoading:true,
            watchHandle: Object.freeze([valueWatch, searchValueWatch]),
        };
    },
    //监听属性 类似于data概念
    computed: {
        options: (vm) => {
            const { ui } = vm;
            const { label, placeholder, clearable } = ui;

            const baseLabel = label || "内容";
            const basePlaceholder = placeholder || `请输入${baseLabel}`;

            const vbind = Object.assign({}, ui, {
                placeholder: basePlaceholder,
                clearable: vm.setDefault(clearable, true),
                remote: true,
                filterable: true,
                "popper-append-to-body": true,
                "default-first-option": true,
                "reserve-keyword": true,
                "loading-text": `获取${baseLabel}中..`,
                "no-match-text": "未找到匹配信息",
                "no-data-text": "未找到信息",

                "value-key": "value",
            });

            return vbind;
        },
        valueKey: (vm) => {
            const { database } = vm;
            return vm.setDefault(database.valueField, "id");
        },
        labelKey: (vm) => {
            const { database } = vm;
            return vm.setDefault(database.textField, "label");
        },
        attachKey: (vm) => {
            const { database } = vm;
            return vm.setDefault(database.attachField, "attach");
        },
        useAttach: (vm) => {
            const { database } = vm;
            const { isAttach } = database;
            return isBoolean(isAttach) ? isAttach : false;
        },
        config: (vm) => {
            const { database } = vm;
            const { api, lib } = database;
            return {
                address: isNil(api) ? "" : api,
                lib:isNil(lib) ? {} : lib
            };
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
        async remoteMethod(query) {
            this.searchLoading = true;
            const config = Object.assign({}, this.config, { query });
            const data = await this.form.remote.call(config);
            this.searchList = this.setupSearchList(data);
            this.searchLoading = false;
        },
        setupSearchList(data) {
            if (!isArray(data)) return this.searchList;

            return data.map(this.setupSearchItem);
        },
        setupSearchItem(item) {
            const {
                [this.labelKey]: label,
                [this.attachKey]:baseAttach
            } = item;
            const state = this.useAttach && isString(baseAttach);
            const attachLabel = state ? `${label}(${baseAttach})` : label;
            const value = item[this.valueKey];
            return Object.assign({}, item, { label, attachLabel, value });
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.remoteMethod();
        this.initValue("searchValue", this.value).then((val) => {
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
@import "./mg-search.scss";
</style>

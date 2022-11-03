<!--
 * @Author: maggot-code
 * @Date: 2021-03-04 16:53:45
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-03 17:10:12
 * @Description: mg-select.vue component
-->
<template>
    <!-- @change="handleChange" -->
    <el-select class="mg-select" v-model="selectValue" v-bind="options">
        <template v-for="item in selectList">
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
import { isArray, isNil, isBoolean,isString } from "lodash";
export default {
    name: "mg-select",
    trigger: "change",
    mixins: [MgFormComponent],
    components: {},
    props: {},
    data() {
        //这里存放数据
        const valueWatch = {
            variable: "value",
            func(newVal) {
                this.$set(this, "selectValue", newVal);
            },
        }
        const selectValueWatch = {
            variable: "selectValue",
            func(newVal, oldVal) {
                if (newVal.toString() === oldVal.toString()) return;
                
                this.monitorValue({
                    mold: this.mold,
                    field: this.field,
                    value: newVal,
                    handle: "select",
                });
            },
        }
        const enumsWatch = {
            variable: "enums",
            func(newVal) {
                this.$set(this, "selectList", this.setupSelectList(newVal));
            },
        }
        return {
            selectValue: "",
            selectList:[],
            watchHandle: Object.freeze([valueWatch, selectValueWatch, enumsWatch]),
        };
    },
    //监听属性 类似于data概念
    computed: {
        enums: (vm) => {
            const { database} = vm;
            return database.enums;
        },
        options: (vm) => {
            const { ui } = vm;
            const { label, placeholder, clearable } = ui;

            const baseLabel = label || "内容";
            const basePlaceholder = placeholder || `请输入${baseLabel}`;

            return Object.assign({}, ui, {
                placeholder: basePlaceholder,
                clearable: vm.setDefault(clearable, true),
                "popper-append-to-body": true,
                "default-first-option": true,
            });
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
        useApi: (vm) => {
            const { database } = vm;
            const { api } = database;
            return isString(api);
        },
        config: (vm) => {
            const { database } = vm;
            const { api, lib } = database;
            return {
                address: isNil(api) ? "" : api,
                lib: isNil(lib) ? {} : lib,
                field: vm.field,
                valueKey: vm.valueKey,
                labelKey: vm.labelKey
            }
        }
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
        setupSelectList(data) {
            if (!isArray(data)) return [];

            return data.map(this.setupSelectItem);
        },
        setupSelectItem(item) {
            const {
                [this.labelKey]: label,
                [this.attachKey]: baseAttach
            } = item;
            const state = this.useAttach && isString(baseAttach);
            const attachLabel = state ? `${label}(${baseAttach})` : label;
            const value = item[this.valueKey];
            return Object.assign({}, item, { label, attachLabel, value });
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    async created() {
        if (this.useApi) {
            const data = await this.form.remote.enums(this.config);
            this.selectList = this.setupSelectList(data);
        } else {
            this.selectList = this.setupSelectList(this.database.enums);
        }

        this.initValue("selectValue", this.value).then((val) => {
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
@import "./mg-select.scss";
</style>

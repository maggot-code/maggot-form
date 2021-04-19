<!--
 * @Author: maggot-code
 * @Date: 2021-03-23 11:24:59
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-04-19 09:57:33
 * @Description: mg-autocomplete.vue component
-->
<template>
    <el-select
        class="mg-autocomplete"
        v-model="selectValue"
        v-bind="options"
        :remote-method="remoteMethod"
        :loading="selectLoading"
    >
        <el-option
            v-for="item in selectGather"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
    </el-select>
</template>

<script>
import MgFormComponent from "../../mg-form/mixins/mg-form-component";
import { send } from "../../mg-form/axios";
import { isNil, isBoolean } from "lodash";
export default {
    name: "mg-autocomplete",
    trigger: "blur",
    mixins: [MgFormComponent],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            selectValue: this.value,
            selectLoading: false,
            selectGather: [],
            timeout: null,
        };
    },
    //监听属性 类似于data概念
    computed: {
        options: (vm) => {
            const { mold, field, ui, rule } = vm;
            const { label, placeholder, clearable } = ui;
            const baseLabel = label || "标签";
            const basePlaceholder = placeholder || `请选择${baseLabel}`;
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
        requestApi: (vm) => {
            const { proName, database } = vm;
            const { api } = database;

            return isNil(api) ? false : proName + api;
        },
        useAttach: (vm) => {
            const { database } = vm;
            const { isAttach } = database;
            return isBoolean(isAttach) ? isAttach : false;
        },
        valueKey: (vm) => {
            const { database } = vm;
            return vm.setDefault(database.valueField, "userid");
        },
        labelKey: (vm) => {
            const { database } = vm;
            return vm.setDefault(database.textField, "truename");
        },
        attachKey: (vm) => {
            const { database } = vm;
            return vm.setDefault(database.attachField, "attach");
        },
    },
    //监控data中的数据变化
    watch: {
        value(newVal) {
            this.setSelectGather(newVal);
            this.$set(this, "selectValue", newVal);
        },
        selectValue(newVal) {
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
        setDefault(value, def) {
            return isNil(value) ? def : value;
        },
        setSelectGather(value) {
            if (!value) {
                this.selectGather = [];
                return false;
            }

            this.getData({ [this.valueKey]: value })
                .then((res) => {
                    const { data } = res;
                    this.selectGather =
                        data.length <= 0 ? [] : this.setDataStruct(data);
                })
                .catch((error) => {
                    this.selectGather = [];
                });
        },
        remoteMethod(queryString) {
            clearTimeout(this.timeout);
            if (queryString === "") {
                this.selectGather = [];
            } else {
                this.selectLoading = true;
                this.timeout = setTimeout(() => {
                    this.getData({ [this.labelKey]: queryString })
                        .then((res) => {
                            const { data } = res;
                            this.selectGather = this.setDataStruct(data);
                        })
                        .catch((error) => {
                            this.selectGather = [];
                        });
                    this.selectLoading = false;
                }, 200);
            }
        },
        setDataStruct(data) {
            return data.map((cell) => this.setCellStruct(cell));
        },
        setCellStruct(cell) {
            const {
                [this.labelKey]: baseLabel,
                [this.attachKey]: baseAttach,
            } = cell;
            return {
                value: cell[this.valueKey],
                label: this.useAttach
                    ? `${baseLabel} (${baseAttach})`
                    : baseLabel,
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
        this.setSelectGather(this.value);
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

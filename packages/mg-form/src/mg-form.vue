<!--
 * @Author: maggot-code
 * @Date: 2021-03-04 09:46:46
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-28 15:08:23
 * @Description: mg-form.vue component
-->
<template>
    <el-form class="mg-form" label-suffix="：" :ref="ruleForm" :rules="formRules" :model="formData" :size="formSize"
        :status-icon="false" v-bind="options">
        <!-- inline form -->
        <template v-if="options.inline">
            <template v-for="cell in formCellSchema">
                <el-form-item v-if="checkIsComponents(cell.componentName)" :key="cell.field"
                    v-bind="setFormItem(cell.field, cell.uiSchema)">
                    <component :is="cell.componentName" :ref="refsName(cell.field)" :proName="proName" :token="token"
                        :mold="cell.mold" :field="cell.field" :value.sync="formData[cell.field]"
                        :defValue="formDefData[cell.field]" :leaderTag="cell.leaderTag" :workerTag="cell.workerTag"
                        :database="cell.dataSchema" :ui="cell.uiSchema" :rule="cell.ruleSchema" :reset="componentReset"
                        @monitorValue="monitorValue" @formError="formError" @uploadSpeed="uploadSpeed"
                        @uploadCellEvent="uploadCellEvent"></component>
                </el-form-item>
            </template>
        </template>

        <!-- not inline form -->
        <template v-else>
            <el-row :gutter="options.gutter">
                <template v-for="cell in formCellSchema">
                    <el-col v-if="checkIsComponents(cell.componentName)" :span="setColSpan(cell.uiSchema)">
                        <el-form-item :key="cell.field" v-bind="setFormItem(cell.field, cell.uiSchema)">
                            <template v-if="useTips(cell.uiSchema, cell.componentName)">
                                <component :is="cell.componentName" :ref="refsName(cell.field)" :proName="proName" :token="token" :mold="cell.mold"
                                    :field="cell.field" :value.sync="formData[cell.field]" :defValue="formDefData[cell.field]"
                                    :leaderTag="cell.leaderTag" :workerTag="cell.workerTag" :database="cell.dataSchema" :ui="cell.uiSchema"
                                    :rule="cell.ruleSchema" :reset="componentReset" @monitorValue="monitorValue" @formError="formError"
                                    @uploadSpeed="uploadSpeed" @uploadCellEvent="uploadCellEvent"></component>
                            </template>

                            <template v-else>
                                <el-tooltip :content="handleTips(cell.uiSchema)" placement="top">
                                    <component :is="cell.componentName" :ref="refsName(cell.field)" :proName="proName" :token="token" :mold="cell.mold"
                                        :field="cell.field" :value.sync="formData[cell.field]" :defValue="formDefData[cell.field]"
                                        :leaderTag="cell.leaderTag" :workerTag="cell.workerTag" :database="cell.dataSchema" :ui="cell.uiSchema"
                                        :rule="cell.ruleSchema" :reset="componentReset" @monitorValue="monitorValue" @formError="formError"
                                        @uploadSpeed="uploadSpeed" @uploadCellEvent="uploadCellEvent"></component>
                                </el-tooltip>
                            </template>
                        </el-form-item>
                    </el-col>
                </template>
            </el-row>
        </template>

        <el-form-item label-width="0" :style="buttonGroupStyle">
            <slot name="form-button"></slot>
        </el-form-item>
    </el-form>
</template>

<script>
import MgFormTagMap from "../mixins/mg-form-tag-map";
import { FormCellComponents, FormCellRules } from "../install";
import { mergeSchema } from "../utils";
import { cloneDeep, isNil, isString, isArray } from "lodash";
import { flake } from "maggot-utils";

const unusableTipsComponent = ["mg-upload"];
function useUploadCache(cache) {
    function run(target) {
        const { tocancel } = target;
        try {
            tocancel.abort();
        } catch (error) {
            console.log(error);
        }
        return { remove };
    }
    function setup(key, value) {
        const [state, target] = find(key);
        state && run(target).remove(key);
        cache.set(key, value);
    }
    function find(key) {
        const has = cache.has(key);
        const value = cache.get(key);
        return [has,has ? value : null];
    }
    function remove(key) {
        cache.delete(key);
    }
    function clear() {
        cache.forEach((target, key) => {
            run(target).remove(key);
        });
        cache.clear();
    }

    return {
        run,
        setup,
        find,
        remove,
        clear
    }
}

const download = document.createElement("a");
function useDownload(file) {
    const { name, type } = file;
    const blob = new Blob([file], { type });
    const href = window.URL.createObjectURL(blob);
    function unload() {
        window.URL.revokeObjectURL(href);
    }
    function toload() {
        download.click();
        unload();
    }

    download.href = href;
    download.download = name ?? flake.gen();

    return {
        file,
        blob,
        unload,
        toload
    }
}

export default {
    name: "mg-form",
    mixins: [MgFormTagMap],
    components: { ...FormCellComponents },
    props: {
        schema: {
            type: Object,
            required: true,
        },
        proName: {
            type: String,
            default: () => "",
        },
        token: {
            type: [String, Boolean],
            default: () => false,
        },
        submitFormat: {
            type: Boolean,
            default: () => true,
        },
        upload: {
            type: Object,
            default:()=>({})
        }
    },
    provide() {
        return {
            form: this,
            useDownload,
            useUploadCache
        };
    },
    data() {
        //这里存放数据
        return {
            ruleForm: flake.gen(),
            componentReset: flake.gen(),
            // medium | small | mini
            // formSize: "medium",
            // [inline, disabled, labelWidth,labelPosition,gutter ]
            formSchema: {
                inline: false,
                disabled: false,
                showMessage: true,
                labelWidth: "120px",
                labelPosition: "right",
                gutter: 12,
            },
            formDefCellSchema: {},
            formCellSchema: {},
            formDefData: {},
            formData: {},
            formRules: {},
            formTagMap: new Map(),
        };
    },
    //监听属性 类似于data概念
    computed: {
        // 获取所有mg-upload的字段名称
        fileField: (vm) => {
            const { cellSchema } = vm.schema;
            return cellSchema
                .filter((cell) => {
                    const { componentName, field } = cell;
                    if (componentName === "mg-upload") {
                        return field;
                    }
                })
                .map((item) => item.field);
        },
        componentLists: () =>
            Object.keys(FormCellComponents).map(
                (keys) => FormCellComponents[keys].name
            ),
        // 表单属性选项
        options: (vm) => {
            const { formSchema } = vm.schema;
            const vbind = mergeSchema(vm.formSchema, formSchema);

            return vbind;
        },
        formSize: (vm) => {
            const { inline } = vm.options;
            return inline ? "mini" : "small";
        },
        buttonGroupStyle: (vm) => {
            const { inline } = vm.options;
            return inline
                ? {}
                : {
                    display: "flex",
                    "justify-content": "center",
                };
        },
        submitLabel: (vm) => {
            const { inline } = vm.options;
            return inline ? "查询" : "提交";
        },
        ifTempButton: (vm) => {
            const { inline } = vm.options;
            return !inline && vm.useTemp;
        },
    },
    //监控data中的数据变化
    watch: {
        schema: {
            handler(newVal) {
                const { struct, data, rules, tag } = this.handleSchema(newVal);

                this.$set(this, "formDefCellSchema", cloneDeep(struct));
                this.$set(this, "formRules", cloneDeep(rules));
                this.$set(this, "formCellSchema", cloneDeep(struct));
                this.$set(this, "formDefData", cloneDeep(data));
                this.$set(this, "formData", cloneDeep(data));

                this.$nextTick(this.clearValidate);

                this.setTagmap(tag, struct);
            },
            deep: true,
            immediate: true,
        },
    },
    //方法集合
    methods: {
        getFormCell(field) {
            const cellSchema = this.formCellSchema[field];
            const cellData = this.formData[field];
            const cellDefData = this.formDefData[field];
            const cellRules = this.formRules[field];

            return {
                schema: cellSchema,
                value: cellData,
                defValue: cellDefData,
                rules: cellRules,
            };
        },
        setFormCell(field, options) {
            const { schema, value, defValue, rules } = options;

            this.$set(this.formDefCellSchema, field, schema);
            this.$set(this.formCellSchema, field, schema);
            this.$set(this.formData, field, value);
            this.$set(this.formDefData, field, defValue);
            this.$set(this.formRules, field, rules);
        },
        uploadSpeed(uploadInfo) {
            this.$emit("upload-speed", uploadInfo);
        },
        uploadCellEvent(cell) {
            // this.$message("upload-event", cell);
            this.$emit("upload-event", cell);
        },
        formError(errorInfo) {
            this.$emit("form-error", errorInfo);
        },
        formOutput() {
            return {
                validate: this.$refs[this.ruleForm].validate,
                data: this.fileSubmitHandleHook(cloneDeep(this.formData)),
            };
        },
        clearValidateField(field) {
            this.$refs[this.ruleForm].clearValidate(field)
        },
        clearValidate() {
            this.$refs[this.ruleForm].clearValidate();
        },
        resetForm() {
            this.componentReset = flake.gen();
            this.$refs[this.ruleForm].resetFields();
        },
        // 文件上传 提交参数处理
        fileSubmitHandleHook(formData) {
            this.fileField.forEach((field) => {
                const refs = this.$refs[this.refsName(field)][0];
                formData[`savefile${field}`] = this.fileSubmitFormat(
                    formData[field]
                );
                formData[`delfile${field}`] = this.fileSubmitFormat(
                    refs.deleteFile
                );
            });

            return formData;
        },
        // 文件上传 提交参数格式处理
        fileSubmitFormat(fileList) {
            if (!isArray(fileList)) {
                return "";
            }

            if (this.submitFormat) {
                return fileList.map((file) => file.url).join("|");
            }

            return fileList;
        },
        monitorValue(params) {
            const { field, value, defValue, handle } = params;
            this.$emit("monitor-value", params);

            if (handle === "select" || handle === "radio") {
                this.clearValidateField(field);
            }

            const tag = this.getTag(field);
            if (!tag) {
                return false;
            }

            const { leaderTag, lib } = tag;
            this.leaderRun(field, leaderTag, lib, value, defValue, params);
        },
        // 拼接 refs name
        refsName(field) {
            return `form-item-${field}`;
        },
        /**
         * @description: 处理原始结构体数据
         * @param {Object} schema 原始数据值
         * @return {Object} 分别处理得到的数据，校验规则，结构数据
         */
        handleSchema(schema) {
            const { cellSchema } = schema;
            const struct = {};
            const data = {};
            const rules = {};
            const tag = {};

            cellSchema.forEach((cell) => {
                const {
                    componentName,
                    field,
                    value,
                    ruleSchema,
                    leaderTag,
                    workerTag,
                    dataSchema,
                } = cell;
                const baseDataSchema = dataSchema || { lib: {} };
                const { lib } = baseDataSchema;

                data[field] = value;
                struct[field] = cell;
                rules[field] = this.setRuleItem(componentName, ruleSchema);
                tag[field] = { leaderTag, workerTag, lib };
            });

            return { struct, data, rules, tag };
        },
        setRuleItem(componentName, ruleSchema) {
            if (isNil(ruleSchema)) {
                return {};
            }

            return ruleSchema.map((item) => {
                const { required, trigger } = item;
                const baseTrigger = isNil(trigger)
                    ? FormCellRules[componentName]
                    : trigger;

                if (componentName === "mg-upload") {
                    return Object.assign({}, item, {
                        required: !isNil(required),
                    });
                }

                return Object.assign({}, item, {
                    trigger: baseTrigger,
                });
            });
        },
        removeUploadRule(componentName, ruleSchema) {
            if (componentName !== "mg-upload") {
                return ruleSchema;
            }

            return ruleSchema.filter((item) => {
                const { required } = item;

                return !isNil(required);
            });
        },
        /**
         * @description: 检查表单项组件是否被正确注册了
         * @param {String} componentName 组件名称
         * @return {Boolean} 是否被注册
         */
        checkIsComponents(componentName) {
            return this.componentLists.indexOf(componentName) >= 0;
        },
        /**
         * @description: 设置栅格布局的数值
         * @param {Object} uiSchema ui结构对象
         * @return {Number} 栅格布局数值
         */
        setColSpan(uiSchema) {
            const { col } = uiSchema;
            return col - 0 || 24;
        },
        /**
         * @description: 设置表单-单元格属性
         * @param {String} field 表单提交字段名称
         * @param {Object} uiSchema ui结构对象
         * @return {Object} 表单-单元格属性
         */
        setFormItem(field, uiSchema) {
            const { label } = uiSchema;
            const formProps = {
                label: label || "",
                prop: field,
            };

            if (formProps.label.length <= 0) {
                formProps["label-width"] = "0px";
            }
            return formProps;
        },
        handleTips(uiSchema) {
            const { tips } = uiSchema;

            return !isNil(tips) && isString(tips) ? tips : "";
        },
        useTips(uiSchema, componentName) {
            const { tips } = uiSchema;

            // 一些组件不需要提示或者提示在组件内部已经内置了位置
            return isNil(tips) || unusableTipsComponent.includes(componentName);
        },
        setFormDataValue(field, value) {
            const defValue = this.formDefData[field];

            this.$set(this.formData, field, isNil(value) ? defValue : value);
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() {
        download.remove();
    }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss'>
.mg-form {
    width: 100%;
    overflow: hidden;
}
</style>

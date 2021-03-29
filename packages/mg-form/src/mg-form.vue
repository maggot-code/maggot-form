<!--
 * @Author: maggot-code
 * @Date: 2021-03-04 09:46:46
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-29 15:48:21
 * @Description: mg-form.vue component
-->
<template>
    <el-form
        class="mg-form"
        label-suffix="："
        :ref="ruleForm"
        :model="formData"
        :rules="formRules"
        :size="formSize"
        :status-icon="false"
        v-bind="options"
    >
        <!-- inline form -->
        <template v-if="options.inline">
            <template v-for="cell in formCellSchema">
                <el-form-item
                    v-if="checkIsComponents(cell.componentName)"
                    :key="cell.field"
                    v-bind="setFormItem(cell.field, cell.uiSchema)"
                >
                    <component
                        :is="cell.componentName"
                        :ref="refsName(cell.field)"
                        :proName="proName"
                        :token="token"
                        :mold="cell.mold"
                        :field="cell.field"
                        :value.sync="formData[cell.field]"
                        :defValue="formDefData[cell.field]"
                        :leaderTag="cell.leaderTag"
                        :workerTag="cell.workerTag"
                        :database="cell.dataSchema"
                        :ui="cell.uiSchema"
                        :rule="cell.ruleSchema"
                        :reset="componentReset"
                        @monitorValue="monitorValue"
                        @formError="formError"
                        @uploadSpeed="uploadSpeed"
                        @uploadCellEvent="uploadCellEvent"
                    ></component>
                </el-form-item>
            </template>
        </template>

        <!-- not inline form -->
        <template v-else>
            <el-row :gutter="options.gutter">
                <template v-for="cell in formCellSchema">
                    <el-col
                        v-if="checkIsComponents(cell.componentName)"
                        :key="cell.field"
                        :span="setColSpan(cell.uiSchema)"
                    >
                        <el-form-item
                            v-bind="setFormItem(cell.field, cell.uiSchema)"
                        >
                            <el-tooltip
                                :disabled="
                                    useTips(cell.uiSchema, cell.componentName)
                                "
                                :content="handleTips(cell.uiSchema)"
                                placement="top"
                            >
                                <component
                                    :is="cell.componentName"
                                    :ref="refsName(cell.field)"
                                    :proName="proName"
                                    :token="token"
                                    :mold="cell.mold"
                                    :field="cell.field"
                                    :value.sync="formData[cell.field]"
                                    :defValue="formDefData[cell.field]"
                                    :leaderTag="cell.leaderTag"
                                    :workerTag="cell.workerTag"
                                    :database="cell.dataSchema"
                                    :ui="cell.uiSchema"
                                    :rule="cell.ruleSchema"
                                    :reset="componentReset"
                                    @monitorValue="monitorValue"
                                    @formError="formError"
                                    @uploadSpeed="uploadSpeed"
                                    @uploadCellEvent="uploadCellEvent"
                                ></component>
                            </el-tooltip>
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
import { FormCellComponents } from "../install";
import { mergeSchema } from "../utils";
import { cloneDeep, isNil, isString, isArray } from "lodash";
import { flake } from "maggot-utils";
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
                this.$set(this, "formCellSchema", cloneDeep(struct));
                this.$set(this, "formDefData", cloneDeep(data));
                this.$set(this, "formData", cloneDeep(data));
                this.$set(this, "formRules", cloneDeep(rules));

                this.setTagmap(tag, struct);
            },
            deep: true,
            immediate: true,
        },
    },
    //方法集合
    methods: {
        uploadSpeed(uploadInfo) {
            this.$emit("upload-speed", uploadInfo);
        },
        uploadCellEvent(cell) {
            this.$message("upload-event", cell);
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
            this.$emit("monitor-value", params);

            const { field, value } = params;
            const tag = this.getTag(field);
            if (!tag) {
                return false;
            }

            const { leaderTag, lib } = tag;
            this.leaderRun(field, leaderTag, lib, value);
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
                const baseTrigger = isNil(trigger) ? "blur" : trigger;

                if (componentName === "mg-upload") {
                    return Object.assign({}, item, {
                        required: !isNil(required),
                    });
                }

                return Object.assign({}, item, { trigger: baseTrigger });
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
            const isName = componentName === "mg-upload";

            return isNil(tips) || isName;
        },
        setFormDataValue(field, value) {
            const defValue = this.formDefData[field];

            this.$set(this.formData, field, isNil(value) ? defValue : value);
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
<style lang='scss'>
.mg-form {
    width: 100%;
    overflow: hidden;
}
</style>

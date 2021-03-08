<!--
 * @Author: maggot-code
 * @Date: 2021-03-04 09:46:46
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-08 15:20:09
 * @Description: mg-form.vue component
-->
<template>
    <el-form
        class="mg-form"
        label-suffix="："
        :ref="formRef"
        :model="formData"
        :rules="formRules"
        :size="formSize"
        :status-icon="false"
        v-bind="options"
    >
        <!-- inline form -->
        <template v-if="options.inline">inline</template>

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
                            <component
                                :is="cell.componentName"
                                :mold="cell.mold"
                                :field="cell.field"
                                :value.sync="formData[cell.field]"
                                :defValue="formDefData[cell.field]"
                                :leaderTag="cell.leaderTag"
                                :workerTag="cell.workerTag"
                                :database="cell.dataSchema"
                                :ui="cell.uiSchema"
                                :rule="cell.ruleSchema"
                                @monitorValue="monitorValue"
                            ></component>
                        </el-form-item>
                    </el-col>
                </template>
            </el-row>
        </template>
    </el-form>
</template>

<script>
import MgFormTagMap from "../mixins/mg-form-tag-map";
import { FormCellComponents } from "../install";
import { mergeSchema } from "../utils";
import { cloneDeep, isNil } from "lodash";
export default {
    name: "mg-form",
    mixins: [MgFormTagMap],
    components: { ...FormCellComponents },
    props: {
        formRef: {
            type: [String, Number],
            default: () => new Date().getTime(),
        },
        schema: {
            type: Object,
            required: true,
        },
    },
    data() {
        //这里存放数据
        return {
            // medium | small | mini
            formSize: "medium",
            // [inline, disabled, labelWidth,labelPosition,gutter ]
            formSchema: {
                inline: false,
                disabled: false,
                labelWidth: "120px",
                labelPosition: "right",
                gutter: 20,
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
        monitorValue(params) {
            const { field, value } = params;
            const tag = this.getTag(field);
            if (!tag) {
                return false;
            }

            const { leaderTag, lib } = tag;
            this.leaderRun(field, leaderTag, lib, value);
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
                const { lib } = dataSchema;

                struct[field] = cell;
                data[field] = value;
                rules[field] = this.removeUploadRule(componentName, ruleSchema);
                tag[field] = { leaderTag, workerTag, lib };
            });

            return { struct, data, rules, tag };
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
            return col || 24;
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
                label: label,
                prop: field,
            };

            if (label.length <= 0) {
                formProps["label-width"] = "0px";
            }
            return formProps;
        },

        /**
         * @description: 上抛表单组件的 refs
         */
        throwRefs() {
            this.$emit("getRefs", this.formRef);
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.throwRefs();
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
@import "./mg-form.scss";
</style>

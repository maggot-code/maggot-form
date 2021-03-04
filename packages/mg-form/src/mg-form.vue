<!--
 * @Author: maggot-code
 * @Date: 2021-03-04 09:46:46
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-04 18:23:26
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
                                :leaderTag="cell.leaderTag"
                                :workerTag="cell.workerTag"
                                :database="cell.dataSchema"
                                :ui="cell.uiSchema"
                                :rule="cell.ruleSchema"
                            ></component>
                        </el-form-item>
                    </el-col>
                </template>
            </el-row>
        </template>
    </el-form>
</template>

<script>
import { FormCellComponents } from "../install";
import { mergeSchema } from "../utils";
export default {
    name: "mg-form",
    mixins: [],
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
            formCellSchema: {},
            formDefCellSchema: {},
            formData: {},
            formRules: {},
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
            const { formSchema } = vm.$props.schema;
            const vbind = mergeSchema(vm.formSchema, formSchema);

            return vbind;
        },
    },
    //监控data中的数据变化
    watch: {
        schema: {
            handler(newVal) {
                const { data, rules, struct, tag } = this.handleSchema(newVal);
                this.formData = data;
                this.formRules = rules;
                this.formDefCellSchema = this.formCellSchema = struct;

                this.$Tagmill.add(tag);
            },
            deep: true,
            immediate: true,
        },
    },
    //方法集合
    methods: {
        /**
         * @description: 上抛表单组件的 refs
         */
        throwRefs() {
            this.$emit("getRefs", this.formRef);
        },
        /**
         * @description: 处理原始结构体数据
         * @param {Object} schema 原始数据值
         * @return {Object} 分别处理得到的数据，校验规则，结构数据
         */
        handleSchema(schema) {
            const { cellSchema } = schema;
            const data = {};
            const rules = {};
            const struct = [];
            const tag = [];

            cellSchema.forEach((cell) => {
                const {
                    field,
                    value,
                    ruleSchema,
                    dataSchema,
                    leaderTag,
                    workerTag,
                    lib,
                } = this.untieSchema(cell);

                data[field] = value;
                rules[field] = ruleSchema;
                struct.push(cell);

                if (Object.keys(leaderTag).length > 0) {
                    tag.push({
                        field: field,
                        leader: leaderTag,
                        lib: lib,
                    });
                }
            });

            return { data, rules, struct, tag };
        },
        /**
         * @description: 拆解结构体
         * @param {Object} cell 目标结构体
         * @return {Object} 拆解结构体中需要使用的属性
         */
        untieSchema(cell) {
            const {
                field,
                value,
                ruleSchema,
                dataSchema,
                leaderTag,
                workerTag,
            } = cell;
            const { lib } = dataSchema;

            return {
                field,
                value,
                ruleSchema,
                dataSchema,
                leaderTag,
                workerTag,
                lib,
            };
        },
        /**
         * @description: 检查表单项组件是否被正确注册了
         * @param {String} componentName 组件名称
         * @return {Boolean} 是否被注册
         */
        checkIsComponents(componentName) {
            return this.componentLists.indexOf(componentName) >= 0;
        },
        setColSpan(uiSchema) {
            const { col } = uiSchema;
            return col || 24;
        },
        setFormItem(field, uiSchema) {
            const { label } = uiSchema;
            const formItem = {
                label: label,
                prop: field,
            };

            if (label.length <= 0) {
                formItem["label-width"] = "0px";
            }
            return formItem;
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

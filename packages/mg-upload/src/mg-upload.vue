<!--
 * @Author: maggot-code
 * @Date: 2021-03-08 10:04:12
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-11 23:04:00
 * @Description: mg-upload.vue component
-->
<template>
    <el-upload
        :key="reset"
        class="mg-upload"
        :ref="uploadRefs"
        v-bind="options"
        :file-list="fileValue"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-error="handleError"
        :on-progress="handleProgress"
        :on-change="handleChange"
        :on-exceed="handleExceed"
        :before-upload="handleBeforeUpload"
        :before-remove="handleBeforeRemove"
    >
        <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
        >
        <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            >上传到服务器</el-button
        >

        <div v-if="uploadTips.isTips" slot="tip" class="el-upload__tip">
            {{ uploadTips.text }}
        </div>
    </el-upload>
</template>

<script>
import MgFormComponent from "../../mg-form/mixins/mg-form-component";
import { isBoolean, isNumber, isNil, isString, isArray } from "lodash";

const DefaultFileName = "files";
export default {
    name: "mg-upload",
    mixins: [MgFormComponent],
    components: {},
    props: {
        reset: Number,
    },
    data() {
        //这里存放数据
        return {
            uploadRefs: new Date().getTime(),
            fileValue: this.setFileList(this.value),
            uploadRule: {},
        };
    },
    //监听属性 类似于data概念
    computed: {
        options: (vm) => {
            const { mold, field, ui, rule } = vm;
            const { action, isAction } = vm.setAction(ui);
            const multiple = vm.setMultiple(ui);
            const limit = vm.setLimit(ui);
            const vbind = {
                "list-type": "text",
                "auto-upload": false,
                "show-file-list": true,
                "with-credentials": true,
                action: action,
                multiple: multiple,
                headers: vm.setHeaders(ui),
                data: vm.setUploadData(ui),
                disabled: vm.setDisabled(ui, isAction),
                name: vm.setUploadName(ui, multiple),
            };

            if (limit) {
                vbind.limit = limit;
            }

            return vbind;
        },
        uploadTips: (vm) => {
            const { tips } = vm.ui;
            const isTips = !isNil(tips) && isString(tips);

            return {
                text: tips,
                isTips: isTips,
            };
        },
        fileSize: (vm) => {
            const { size } = vm.ui;
            if (isNil(size)) {
                return false;
            }

            return vm.mb2byte(size);
        },
        fileType: (vm) => {
            const { types } = vm.ui;
            if (isNil(types)) {
                return false;
            }

            return types;
        },
    },
    //监控data中的数据变化
    watch: {
        value(newVal) {
            this.$set(this, "fileValue", this.setFileList(newVal));
        },
        fileValue(newVal) {
            this.monitorValue({
                mold: this.mold,
                field: this.field,
                value: newVal,
                handle: "upload",
            });
        },
    },
    //方法集合
    methods: {
        submitUpload() {
            this.$refs[this.uploadRefs].submit();
        },
        /**
         * @description: 文件列表选中时的操作
         * @param {File} file
         */
        handlePreview(file) {
            console.log(file);
        },
        /**
         * @description: 从文件列表移除文件时的操作
         * @param {File} file
         * @param {Array[File]} fileList
         */
        handleRemove(file, fileList) {
            this.$set(this, "fileValue", fileList);
        },
        /**
         * @description: 文件上传成功时的操作
         * @param {Object} response
         * @param {File} file
         * @param {Array[File]} fileList
         */
        handleSuccess(response, file, fileList) {
            const { name, status, uid } = file;

            this.fileValue.push({
                name: name,
                status: status,
                uid: uid,
                url: response[0],
            });
        },
        /**
         * @description: 文件上传失败时的操作
         * @param {Object} err
         * @param {File} file
         * @param {Array[File]} fileList
         */
        handleError(err, file, fileList) {},
        /**
         * @description: 文件上传中的操作
         * @param {Object} event
         * @param {File} file
         * @param {Array[File]} fileList
         */
        handleProgress(event, file, fileList) {},
        /**
         * @description: 文件状态改变时的操作（添加文件、上传成功和上传失败时会被调用）
         * @param {File} file
         * @param {Array[File]} fileList
         */
        handleChange(file, fileList) {},
        /**
         * @description: 文件超出个数限制时的操作
         * @param {File} files
         * @param {Array[File]} fileList
         */
        handleExceed(files, fileList) {
            const { limit } = this.ui;
            console.error(
                `抱歉，超过一次性上传文件数量限制，一次性上传最大${limit}个文件!`
            );
        },
        /**
         * @description: 文件上传之前的操作，返回false或者promise.reject会停止上传
         * @param {File} file
         * @return {Boolean | Promise} 停止上传
         */
        handleBeforeUpload(file) {
            const { name, size } = file;
            const type = this.getFileType(name);
            let isType = true;
            let isSize = true;

            if (this.fileType) {
                isType = this.checkFileType(file, type, this.fileType);
            }

            if (this.fileSize) {
                isSize = this.checkFileSize(file, size, this.fileSize);
            }

            return isType && isSize;
        },
        /**
         * @description: 文件删除之前的操作，返回false或者promise.reject会停止删除
         * @param {File} file
         * @param {Array[File]} fileList
         * @return {Boolean | Promise} 停止删除
         */
        handleBeforeRemove(file, fileList) {},

        // 设置文件列表
        setFileList(value) {
            return isArray(value) ? value : [];
        },
        // 设置上传地址
        setAction(ui) {
            const { action } = ui;
            const isAction = !isNil(action) && isString(action);

            if (!isAction) {
                console.error(
                    "上传组件必须携带 “action” 属性，指定上传文件地址!"
                );
            }

            return {
                action: isString(action) ? action : "",
                isAction: isAction,
            };
        },
        // 设置上传请求头部
        setHeaders(ui) {
            return {};
        },
        // 设置是否支持多选文件
        setMultiple(ui) {
            const { multiple } = ui;

            return isBoolean(multiple) ? multiple : false;
        },
        // 设置附带额外参数
        setUploadData(ui) {
            return {};
        },
        // 设置上传文件字段名
        setUploadName(ui, multiple) {
            const { name } = ui;
            const baseName =
                !isNil(name) && isString(name) ? name : DefaultFileName;

            return multiple ? `${baseName}` : baseName;
        },
        // 设置是否禁用
        setDisabled(ui, isAction) {
            const { disabled } = ui;

            if (!isAction) {
                return !isAction;
            }

            return isBoolean(disabled) ? disabled : false;
        },
        // 设置最大允许上传个数
        setLimit(ui) {
            const { limit } = ui;

            return isNumber(limit) ? limit : false;
        },
        // mb 换算 byte
        mb2byte(number) {
            return number * 1000000;
        },
        // byte 换算 mb
        byte2mb(number) {
            return (number / 1000000).toFixed(2);
        },
        // 获取文件类型
        getFileType(name) {
            const fileTypeSplit = name.split(".");
            return fileTypeSplit[fileTypeSplit.length - 1];
        },
        // 检查文件类型
        checkFileType(file, type, typeList) {
            const { name } = file;
            const isType = typeList.indexOf(type) >= 0;

            if (!isType) {
                console.error(`${name} 文件类型与要求类型不符!`);
            }
            return isType;
        },
        // 检查文件大小
        checkFileSize(file, size, baseSize) {
            const { name } = file;
            const isSize = size < baseSize;

            if (!isSize) {
                console.error(`${name} 文件大小超出上传限制!`);
            }
            return isSize;
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
<style lang='scss' scoped>
@import "./mg-upload.scss";
</style>

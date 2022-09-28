<!--
 * @FilePath: \maggot-form\packages\mg-upload\src\mg-upload-list.vue
 * @Author: maggot-code
 * @Date: 2022-09-27 17:00:58
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-28 15:55:27
 * @Description: 
-->
<template>
    <div class='mg-upload-list'>
        <div class="mg-upload-list-info">
            <el-link
                class="mg-upload-list-info-title"
                type="primary"
                :disabled="useProgress"
                @click="uploadPreview">
                {{fileValue.name}}
            </el-link>

            <div class="mg-upload-list-info-data" v-if="useProgress">
                <el-tag
                    v-if="progressInfo.speed"
                    class="mg-upload-list-info-data-item"
                    size="mini"
                    type="info">
                    {{speedValue}} %
                </el-tag>

                <el-tag
                    v-if="progressInfo.current"
                    class="mg-upload-list-info-data-item"
                    size="mini"
                    type="info">
                    {{currentValue}} MB
                </el-tag>

                <el-tag
                    v-if="progressInfo.total"
                    class="mg-upload-list-info-data-item"
                    size="mini">
                    {{totalValue}} MB
                </el-tag>

                <el-tag
                    v-if="progressTips"
                    class="mg-upload-list-info-data-item"
                    size="mini">
                    正在上传中..
                </el-tag>
            </div>
            <div class="mg-upload-list-info-control">
                <el-button v-show="useProgress" type="danger" size="mini" @click="uploadCancel">取消</el-button>
                <el-button v-show="!useProgress" type="danger" size="mini" @click="uploadDelete">删除</el-button>
            </div>
        </div>

        <div v-if="useProgress&&progressInfo.percentage" class="mg-upload-list-percentage">
            <el-progress :percentage="speedValue" :color="customColors" :show-text="false"></el-progress>
        </div>
    </div>
</template>

<script>
import { byte2mb } from "../../mg-form/utils";
import { floor,isBoolean } from "lodash";

function toFixed2(value) {
    return floor(value, 2);
}

export default {
    name: 'mg-upload-list',
    mixins: [],
    components: {},
    props: {
        file: {
            type: Object,
            required: true,
        },
        ui: {
            type: Object,
            default: () => ({})
        },
    },
    inject: ["form"],
    data() {
        //这里存放数据
        return {
            customColors: Object.freeze([
                { color: '#909399', percentage: 20 },
                { color: '#F56C6C', percentage: 40 },
                { color: '#E6A23C', percentage: 60 },
                { color: '#67C23A', percentage: 80 },
                { color: '#409EFF', percentage: 100 }
            ]),
        };
    },
    //监听属性 类似于data概念
    computed: {
        fileValue() {
            const { response } = this.file;
            const [value] = response ?? [];
            return Object.assign({}, this.file, value ?? {});
        },
        currentValue() {
            const { size, percentage } = this.fileValue;
            return toFixed2(byte2mb(size * percentage / 100));
        },
        totalValue() {
            const { size } = this.fileValue;
            return toFixed2(byte2mb(size));
        },
        speedValue() {
            const { percentage } = this.fileValue;
            return toFixed2(percentage);
        },
        status() {
            const { status } = this.fileValue;
            return status;
        },
        useProgress() {
            return this.status === "uploading";
        },
        progressInfo() {
            const { speed, current, total, percentage } = this.ui;
            return {
                "speed": isBoolean(speed) ? speed : true,
                "current": isBoolean(current) ? current : true,
                "total": isBoolean(total) ? total : true,
                "percentage": isBoolean(percentage) ? percentage : true,
            }
        },
        progressTips() {
            return !this.progressInfo.speed && !this.progressInfo.current && !this.progressInfo.total;
        }
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        uploadDelete() {
            this.$emit("on-delete", this.fileValue);
        },
        async uploadPreview() {
            const blob = await this.form.upload.down(this.fileValue);
            const raw = Object.assign(blob, {
                name: this.fileValue.name,
            });
            
            this.$emit("on-preview", Object.assign({}, this.fileValue,{raw}));
        },
        uploadCancel() {
            this.$emit('on-cancel', this.fileValue);
        }
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
.mg-upload-list{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    padding: 0 12px;
    box-sizing: border-box;
    &-info{
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 32px;
        &-title,
        &-data,
        &-control{
            height: 100%;
            display: flex;
            align-items: center;
        }
        &-data{
            &-item{
                height: 24px;
                line-height: 24px;
                font-size: 12px;
            }
            &-item+&-item{
                margin-left: 6px;
            }
        }
    }
    &-percentage{
        position: relative;
        width: 100%;
        height: 32px;
        overflow: hidden;
    }
}
</style>

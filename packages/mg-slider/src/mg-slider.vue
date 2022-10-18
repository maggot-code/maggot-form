<!--
 * @FilePath: \maggot-form\packages\mg-slider\src\mg-slider.vue
 * @Author: maggot-code
 * @Date: 2022-10-18 09:23:21
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-10-18 09:46:37
 * @Description: 
-->
<template>
    <div class="mg-slider">
        <el-slider v-model="sliderValue" v-bind="options"></el-slider>
    </div>
</template>

<script>
import MgFormComponent from "../../mg-form/mixins/mg-form-component";

function formatTooltip(value) {
    const val = value ?? 0;
    return val;
}
export default {
    name: 'mg-slider',
    trigger: "change",
    mixins: [MgFormComponent],
    components: {},
    props: {},
    data() {
        //这里存放数据
        const watchHandle = Object.freeze([
            {
                variable: "value",
                func(newVal) {
                    this.$set(this, "sliderValue", newVal);
                },
            },
            {
                variable: "sliderValue",
                func(newVal) {
                    this.monitorValue({
                        mold: this.mold,
                        field: this.field,
                        value: newVal,
                        handle: "slider",
                    });
                },
            },
        ]);
        return {
            sliderValue: 0,
            watchHandle
        };
    },
    //监听属性 类似于data概念
    computed: {
        options: (vm) => {
            const { ui, database } = vm;

            return Object.assign({}, ui, {
                formatTooltip,
                marks:{},
                range: false,
                vertical: false,
                inputSize:"mini"
            });
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {},
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.initValue("sliderValue", this.value).then((val) => {
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
@import "./mg-slider.scss";
</style>

/*
 * @Author: maggot-code
 * @Date: 2021-03-04 13:25:06
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-05 15:44:44
 * @Description: mg form mixins component package
 */
export default {
    name: "mg-form-component",
    mixins: [],
    components: {},
    props: {
        mold: {
            type: String,
            default: () => "default"
        },
        field: {
            type: String,
            required: true,
        },
        value: {
            type: [String, Number, Array, Object, Boolean],
            default: () => ""
        },
        defValue: {
            type: [String, Number, Array, Object, Boolean],
            default: () => ""
        },
        leaderTag: {
            type: Object,
            default: () => ({})
        },
        workerTag: {
            type: Array,
            default: () => []
        },
        database: {
            type: Object,
            default: () => ({})
        },
        ui: {
            type: Object,
            default: () => ({})
        },
        rule: {
            type: Array,
            default: () => []
        }
    },
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        /**
         * @description: 监听数值更新
         * @param {Object} params 更新附带信息 (mold, field, value, handle)
         */
        monitorValue(params) {
            const { value } = params;

            this.$emit("update:value", value);
            this.$emit('monitorValue', params);
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
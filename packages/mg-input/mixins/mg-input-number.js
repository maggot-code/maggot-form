/*
 * @Author: maggot-code
 * @Date: 2021-03-04 13:32:02
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-04 15:40:05
 * @Description: mg input number mold
 */
import { mergeSchema, inputMinus } from "../../mg-form/utils";

const defaultBind = {
    "disabled": false,
    "step": 1,
    "controls-position": "right",
    "step-strictly": false,
    "controls": true
}

export default {
    name: "mg-input-number",
    mixins: [],
    components: {},
    props: {},
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
        moldNumber(uiSchema) {
            const vbind = mergeSchema(defaultBind, uiSchema);
            const { minus, min } = vbind;
            const baseMin = inputMinus(minus, min);
            if (typeof baseMin === "number") {
                vbind.min = baseMin;
            }

            return vbind;
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
/*
 * @Author: maggot-code
 * @Date: 2021-03-05 15:53:28
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-05 17:14:40
 * @Description: mg form mixins tag map package
 */
import testList from '../../../test/select-change';
import { forIn, set, cloneDeep } from 'lodash';
export default {
    name: "mg-form-tag-map",
    mixins: [],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            formTagMap: new Map(),
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        request(params) {
            const { value } = params;
            const data = testList[value];

            return new Promise((resolve, reject) => {
                resolve(data)
            })
        },
        leaderRun(field, leader, lib, value) {
            forIn(leader, (target, name) => {
                const { controller, workerMan } = target;
                const handlerName = this.splitLeaderName(name);

                this[handlerName]({ ...lib, value }).then(res => {
                    workerMan.forEach(worker => this.assignWorker(worker, controller, res));
                })
            })
        },
        assignWorker(worker, path, result) {
            // set(this.formCellSchema[worker], path, result);
            const schema = cloneDeep(this.formCellSchema[worker]);
            set(schema, path.split('.'), result);
            this.$set(this.formCellSchema, worker, schema);
            this.$set(this.formData, worker, schema.value);
        },
        getTag(field) {
            return this.formTagMap.has(field) ? this.formTagMap.get(field) : false;
        },
        setTagmap(tag, struct) {
            for (const name in tag) {
                const { leaderTag } = tag[name];
                const leaderLen = Object.keys(leaderTag).length;
                if (leaderLen <= 0) { continue }

                this.handleTagItem(leaderTag, struct);
                this.formTagMap.set(name, tag[name]);
            }
        },
        splitLeaderName(name) {
            const handlerName = name.split('.');

            return handlerName[0];
        },
        /**
         * @description: 操作标签单元项
         * @param {Object} item 标签单元项
         * @param {Array} struct schema列表
         * @return {Object} 标签单元项
         */
        handleTagItem(leader, struct) {
            for (const name in leader) {
                leader[name].workerMan = [];

                for (const field in struct) {
                    const hasWorker = this.selectWorker(struct[field], name);
                    hasWorker && leader[name].workerMan.push(field);
                }
            }

            return leader;
        },
        /**
         * @description: 寻找worker索引
         * @param {Object} cell schema单元项
         * @param {String} tagName 标签名称
         * @return {Boolean} 是否满足worker索引条件
         */
        selectWorker(cell, tagName) {
            const { workerTag } = cell;
            return workerTag.length > 0 && workerTag.indexOf(tagName) >= 0;
        },
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

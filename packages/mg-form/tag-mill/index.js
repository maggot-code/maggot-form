/*
 * @Author: maggot-code
 * @Date: 2021-03-04 17:57:45
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-04 18:38:38
 * @Description: mg form tag mill inlet
 */
class Tagmill {
    constructor() {
        this.tagPond = new Map();
    }
    push(tag) {
        this.tagPond.set(tag.field, Tagmill._untieTag(tag))
    }
    add(tags) {
        tags.forEach(tag => this.tagPond.set(tag.field, Tagmill._untieTag(tag)));
    }
    static _untieTag(tag) {
        const { leader, lib } = tag;
        return leader;
    }
}

export default Tagmill

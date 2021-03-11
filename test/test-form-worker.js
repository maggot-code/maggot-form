/*
 * @Author: maggot-code
 * @Date: 2021-03-10 17:07:25
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-11 16:54:12
 * @Description: test form worker function
 */
import testList from '../test/select-change';

const request = (params) => {
    const { value } = params;
    const data = testList[value];

    return new Promise((resolve, reject) => {
        resolve(data)
        reject()
    })
}

export default {
    request
}

/*
 * @Author: maggot-code
 * @Date: 2021-03-23 13:07:34
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-24 11:11:20
 * @Description: file content
 */
import axios from 'axios';
import { MGaxios } from 'maggot-utils';
import { flake, getToken, setToken } from 'maggot-utils';
// setToken('0820e552-4fab-486b-b64f-be2f29c5568f');
const BASEURL = process.env.NODE_ENV === 'production' ? window.location.origin : '/';
const { Send } = MGaxios;

const baseAxios = axios.create({ baseURL: BASEURL });

// 请求拦截器
baseAxios.interceptors.request.use(config => {
    config.requestId = flake.gen();

    const token = getToken();
    if (token) {
        config.headers.token = token;
    }

    return config;
}, error => Promise.reject(error));

export const send = Send(baseAxios);
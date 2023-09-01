import request from'@/utils/request'
//import axios from 'axios'
//获取地址列表
export const getAddressList = ()=>{
    return request.get('/address/list')
}
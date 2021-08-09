import {get,post,ConfigBaseURL} from './http'

/**
 * 看板的相关api
 */

// 获取用户列表
export async function getTurnover(){
    let res = await get('/system/getTurnover')
    console.log(res);
    return res.data;
}
export async function getUserNumber(){
    let res = await get('/system/getUserNumber')
    return res.data;
}
export async function getDeals(){
    let res = await get('/system/getDeals')
    
    return res.data;
}


export async function login(args){
    let res = await get('/system/login',args)
    return res.data;
}









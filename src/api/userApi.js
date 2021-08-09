/**
 * 用户模块
 */

import {get,post} from './http'


// 获取用户列表
export async function getUser(args){
    let res = await get('/user/getUser',args)
    return res.data;
}


// 根据会员级别筛选会员
export async function searchType(args){
    let res = await get('/user/searchType',args)
    return res.data;
}


// 根据会员名搜索会员
export async function search(args){
    let res = await get('/user/search',args)
    return res.data;
}


// 修改会员信息
export async function edit(args){
    let res = await post('/user/edit',args)
    return res;
}
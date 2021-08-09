import {get,post,ConfigBaseURL} from './http'


/**
 * banner
 */


// 获取首页banner图
export async function getBannerList(){
    let res = await get('/shop/getBannerList');
    res.data.forEach(item=>{
        item.path = ConfigBaseURL + item.path;
    })
    return res;
}



// 修改banner图片
export async function editBanner(data){
    let res = await post('/shop/editBanner',data)
    return res;
}

// 添加banner图
export async function addBanner(args){
    let res = await post('/shop/addBanner',args)
    return res;
}



/**
 * 商品
 */

 // 添加商品
export async function addShop(args){
    let res = await post('/shop/addShop',args)
    return res;
}

// 获取商品列表
export async function getShop(args){
    let res = await get('/shop/getShop',args)
    return res.data;
}

// 编辑商品
export async function editShop(args){
    let res = await post('/shop/editShop',args)
    return res;
}

// 删除商品
export async function delShop(args){
    let res = await get('/shop/delShop',args)
    return res.data;
}

//搜索商品
export async function searchShop(args){
    let res = await get('/shop/searchShop',args)
    return res.data;
}

//通过状态搜索商品
export async function searchStatus(args){
    let res = await get('/shop/searchStatus',args)
    return res.data;
}


// 获取订单列表
export async function getOrderList(args){
    let data = await get("/shop/getOrderList",args)

    data.data.list.forEach(item=>{
        let arr = JSON.parse(item.coverPath);
        item.coverPath = arr.map(item=>(ConfigBaseURL + item)).reverse()[0];
    })
    return data.data;
}

// 搜索订单
export async function searchOrder(args){
    let data = await get("/shop/searchOrder",args)
    data.data.list.forEach(item=>{
        let arr = JSON.parse(item.coverPath);
        item.coverPath = arr.map(item=>(ConfigBaseURL + item)).reverse()[0];
    })
    return data.data;
}


// 管理员点击发货
export async function editStatus(args){
    let data = await get("/shop/editStatus",args)
    console.log(data);
    return data.data;
}


/**
 * 评论
 */



// 获取某商品的评论信息
export async function getComment(args){
    let res = await get('/shop/getComment',args)
    return res;
}

//删除评论
export async function delComment(args){
    let res = await get('/shop/delComment',args)
    return res;
} 


/**
 * 订单
 */

 // 显示订单列表

 // 修改订单状态

 







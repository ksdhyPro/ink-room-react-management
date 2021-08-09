import {get,post,ConfigBaseURL} from './http'

/**
 * 控制台的相关api
 */




/***********************banner图*****************************/


// 获取首页banner图
export async function getBannerList(){
    let res = await get('/console/getBannerList');
    res.data.forEach(item=>{
        item.path = ConfigBaseURL + item.path;
    })
    return res;
}



// 修改banner图片
export async function editBanner(data){
    let res = await post('/console/editBanner',data)
    return res;
}

// 添加banner图
export async function addBanner(args){
    let res = await post('/console/addBanner',args)
    return res;
}

/***********************封面图*****************************/

// 获取活动和课程封面图
export async function getShowImage(args){
    let res = await get('/console/getShowImage',args);
    res.data.forEach(item=>{
        item.path = ConfigBaseURL + item.path;
    })
    return res;
}


// 更换活动和课程封面图
export async function editShowImage(args){
    let res = await post('/console/editShowImage',args);
    return res;
}



/***********************课程*****************************/
// 添加课程
export async function addCourse(args){
    let res = await post('/console/addCourse',args);
    return res;
}

// 修改课程
export async function editCourse(args){
    let res = await post('/console/editCourse',args);
    return res;
}
// 删除课程
export async function delCourse(args){
    let res = await get('/console/delCourse',args);
    return res.data;
}


// 获取课程列表(分页)
export async function getCourseList(data){
    let res = await get('/console/getCourse',data);
    res.data.list.forEach(item=>{
        item.cover = ConfigBaseURL + item.cover
    })
    return res.data;
}


// 搜索课程
export async function searchCourse(data){
    let res = await get('/console/searchCourse',data);
    return res.data;
}

// 课程报名详情
export async function getCourseReg(data){
    let res = await get('/console/getCourseReg',data);
    return res.data;
}






/***********************活动*****************************/




// 添加活动
export async function addActive(args){
    let res = await post('/console/addActive',args);
    return res;
}

// 修改活动
export async function editActive(args){
    let res = await post('/console/editActive',args);
    return res;
}
// 删除活动
export async function delActive(args){
    let res = await get('/console/delActive',args);
    return res.data;
}


// 获取活动列表(分页)
export async function getActive(data){
    let res = await get('/console/getActive',data);
    res.data.list.forEach(item=>{
        item.cover = ConfigBaseURL + item.cover
    })
    return res.data;
}




// 搜索活动
export async function searchActive(data){
    let res = await get('/console/searchActive',data);
    return res.data;
}


// 活动报名详情
export async function getActiveReg(data){
    let res = await get('/console/getActiveReg',data);
    return res.data;
}



/*********************文章********************** */
// 获取文章列表(分页)
export async function getArticle(data){
    let res = await get('/console/getAdminArticle',data);
    return res.data;
}

// 搜索文章

export async function searchArticle(data){
    let res = await get('/console/searchArticle',data);
    return res.data;
}

//管理员写文章
export async function adminWriteArticle(data){
    let res = await post('/console/adminWriteArticle',data);
    return res;
}

// 删除文章
export async function delArticle(id){
    let res = await post(`/console/delArticle/${id}`);
    return res;
}


// 修改文章
export async function editArticle(data){
    let res = await post(`/console/editArticle`,data);
    return res;
}


// 获取待审核的文章
export async function getShenHeList(data){
    let res = await get(`/console/getShenHeList`,data);
    return res.data;
}

/*************************审核******************************** */

/**
 * 审核操作（文章）
 * @param {*} data 包含需要审核的文章id，审核是否通过，1为通过2为拒绝
 * @returns 
 */
export async function isArticlePass(data){
    let res = await get(`/console/isArticlePass`,data);
    return res;
}



/**
 * 获取待审核图片
 * @param {*} data 
 * @returns 
 */
export async function getIsShenHePhoto(data){
    let res = await get(`/console/getIsShenHePhoto`,data);
    return res.data;
}


/**
 * 审核操作（图片）
 * @param {*} data 包含需要审核的图片id，审核是否通过，1为通过2为拒绝
 * @returns 
 */
 export async function isPhotoPass(data){
    let res = await get(`/console/getPhotoShenHeList`,data);
    return res.data;
}



/***********************设置*****************************/


// 获取所有设置
export async function getSetting(){
    let res = await get('/console/getSetting');
    return res.data;
}

// 修改设置
export async function editSetting(data){
    let res = await post('/console/editSetting',data);
    return res.data;
}


/***********************第四分类*****************************/




// 获取第四分类
export async function getArticleType(){
    let res = await get('/console/getFourShow');
    return res.data;
}

// 输入id查找用户名
export async function searchUsername(data){
    let res = await get('/console/searchUsername',data);
    return res.data;
}


// 通过用户名搜索艺术家
export async function searchArtist(data){
    let res = await get('/console/searchArtist',data);
    return res.data;
}


// 删除显示的艺术家
export async function deleteArtist(data){
    let res = await get('/console/deleteArtist',data);
    return res.data;
}


// 新增显示的艺术家
export async function addArtist(data){
    let res = await post('/console/addArtist',data);
    return res;
}

// 修改显示的艺术家
export async function editArtist(data){
    let res = await post('/console/editArtist',data);
    return res;
}








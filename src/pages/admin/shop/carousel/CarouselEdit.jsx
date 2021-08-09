import { Button, Card,Image,Modal,Form, Input,  Radio,Upload ,message} from 'antd';
import React,{useState,useEffect} from 'react'
import {ConfigBaseURL} from '../../../../api/http'
import {getBannerList,editBanner,addBanner} from '../../../../api/shopApi'
import ImgCrop from 'antd-img-crop';
// import './CarouselEdit.css';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 8,
  },
};


const CarouselEdit = (params) => {

  const [bannerList, setBannerList] = useState([]) // banner数据
  const [isModalVisible, setIsModalVisible] = useState(false); // 弹窗显示状态
  const [item, setItem] = useState({}); // 当前操作的轮播项
  const [fileList, setFileList] = useState([]); // 上传文件列表
  const [filePath , setFilePath] = useState(""); // 文件路径

  const fetchData = async function() {
    const response = await getBannerList();
    setBannerList(response.data)
  }

 
  useEffect(() => {
    fetchData();
  },[])


  useEffect(()=>{
    if(!isModalVisible){
      setItem({})
      setFilePath("")
      setFileList([])
    }
  },[isModalVisible])

  

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    
    
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const onFinish = async (values) => {
    let data = {...values,pageType:'shop',path:filePath || item.path.replace(ConfigBaseURL,"")}
    if(item.id){
      // 修改
       let res = await editBanner({...data,id:item.id})
       if(res.code == 200){
        handleOk();
        message.success("修改成功")
        fetchData()
      }else if(res.code == 400){
        message.error("修改失败，该商品不存在！")
      }
    }else{
      // 添加
      let res = await addBanner(data)
      if(res.code == 200){
        handleOk();
        message.success("添加成功")
        fetchData()
      }else if(res.code == 400){
        message.error("添加失败，该商品不存在！")
      }
    }
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };




const onChange = ({ fileList: newFileList }) => {
  setFileList(newFileList);
  if(newFileList[0].response){
    if(newFileList[0].response.storageAddress)
    {

      setFilePath(newFileList[0].response.storageAddress)
    }
    else{
      message.error('图片上传失败，请检查网络');
    }
  }
};

  return (
  <>
  <Button style={{marginBottom:20}} onClick={()=>{
    showModal()
  }}>新增轮播项</Button>
  {
    bannerList.map((item,index)=>(
      <Card key={item.id} 
        style={{marginBottom:20}}
        title={
        <div style={{display:'flex'}}>
          <div>
            {'首页轮播图'+(index+1)}
          </div>
          <div style={{marginLeft:'auto'}}>
            <Button type="primary" onClick={()=>{
              showModal();
              setItem(bannerList[index])
            }}>编辑</Button>
          </div>
        </div>
      }>
       <div style={{display:'flex'}}>
       <div>
          <Image src={item.path} style={{maxWidth:800}}></Image>
        </div>
        <div style={{display:'flex',flexFlow:'column' ,paddingLeft:150,justifyContent:'center'}}>
          <h2>跳转到该商品的id:{item.pageId}</h2>
        </div>
       </div>
      </Card>

      
    ))
  }

    <Modal title={item.id?item.id:'新增轮播项'} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true} footer={null}>
    <Form
      {...layout}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
     
      <ImgCrop aspect={1920/1080}>
            <Upload
              action={ConfigBaseURL+'/uploadBanner'} 
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              name="banner"
            >
          {fileList.length < 1 && '+ 上传'}
        </Upload>
      </ImgCrop>
      {
        item.id?<span style={{color:'red'}}>(如果修改图片则点击上传，不修改图片直接提交)</span>:''
      }
      

      <Form.Item
        label="跳转的商品id"
        name="pageId"
        initialValue={item.pageId}
        rules={[
          {
            required: true,
            message: '请输入商品id',
          },
        ]}
      >
        <Input />
      </Form.Item>

      


      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          确认
        </Button>
      </Form.Item>
    </Form>
    </Modal>
  </>
  )
    
}


export default CarouselEdit

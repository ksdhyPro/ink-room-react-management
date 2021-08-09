import {Form,Input,Button,Upload,Image,message} from 'antd'
import {ConfigBaseURL} from '../../../../api/http'
import React, { useState } from 'react'
import ImgCrop from 'antd-img-crop';
import { searchUsername , addArtist,editArtist} from '../../../../api/consoleApi';

function EditArticleType(props) {
   const [filePath1, setFilePath1] = useState(props.operator == 'edit'?props.data.image1:null)
   const [filePath2, setFilePath2] = useState(props.operator == 'edit'?props.data.image2:null)
   const [filePath3, setFilePath3] = useState(props.operator == 'edit'?props.data.image3:null)
//    const [username,setUsername] = useState("")

   const [form] = Form.useForm();
    const layout = {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 16,
        },
      };
      const tailLayout = {
        wrapperCol: {
          offset: 17,
          span: 16,
        },
      };


      const onFinish = async(values) => {
                if(props.operator == 'add'){
                  let res = await addArtist({
                    ...values,
                    image1:filePath1 || '',
                    image2:filePath2 || '',
                    image3:filePath3 || ''
                  })

                  if(res.code == 200){
                    props.getChildValue(true)
                  }else{
                    props.getChildValue(false)
                  }
                }else{
                  let res = await editArtist({
                    ...values,
                    image1:filePath1,
                    image2:filePath2,
                    image3:filePath3
                  })
                  if(res.code == 200){
                    props.getChildValue(true)
                  }else{
                    props.getChildValue(false)
                  }
                }
                
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

const upload1 = ({ fileList: newFileList })=>{
    if(newFileList[0].response){
      if(newFileList[0].response.storageAddress)
      {
        setFilePath1(newFileList[0].response.storageAddress)
      }
      else{
        message.error('图片上传失败，请检查网络');
      }
    }
}
const upload2 = ({ fileList: newFileList })=>{
    if(newFileList[0].response){
      if(newFileList[0].response.storageAddress)
      {
        setFilePath2(newFileList[0].response.storageAddress)
      }
      else{
        message.error('图片上传失败，请检查网络');
      }
    }
}
const upload3 = ({ fileList: newFileList })=>{
    if(newFileList[0].response){
      if(newFileList[0].response.storageAddress)
      {
        setFilePath3(newFileList[0].response.storageAddress)
      }
      else{
        message.error('图片上传失败，请检查网络');
      }
    }
}

const onBlur = async(e)=>{
    
    // if(props.operator == 'add'){
        if(e.target.value!=''){
            let res = await searchUsername({id:e.target.value})
        if(res.code == 200){
            // setUsername(res.username)
            form.setFieldsValue({username:res.username})
        }else{
            message.error("请填写正确的艺术家id！")
            form.setFieldsValue({username:''})
        }
        }
    // }
}


    return (
        <div>
            <Form
            form={form}
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
    {
        props.operator == 'edit' ? (
            <Form.Item
            label="id"
            name="id"
            initialValue={props.operator == 'edit'?props.data.id:''}
            rules={[
              {
                required: true,
                message: '未设置id',
              },
            ]}
          >
            <Input disabled/>
      </Form.Item>
        ):''
    }

<Form.Item
        label="用户id"
        name="userId"
        initialValue={props.operator == 'edit'?props.data.userId:''}
        
        rules={[
          {
            required: true,
            message: '请输入用户id',
          },
        ]}
      >
        <Input type='number' onBlur={onBlur}/>
      </Form.Item>


      <Form.Item
        label="艺术家名称"
        name="username"
        initialValue={props.operator == 'edit'?props.data.username:''}
        
        rules={[
            {
              required: true,
              message: '请正确填写用户id',
            },
          ]}
      >
        <Input disabled/>
      </Form.Item>

    {
        props.operator == 'edit' ? (
            <Form.Item
            label="排序"
            name="sort"
            initialValue={props.operator == 'edit'?props.data.sort:''}
            rules={[
              {
                required: true,
                message: '填写排序信息',
              },
            ]}
          >
            <Input/>
      </Form.Item>
        ):''
    }


    <Form.Item
        label="作品数量"
        name="works"
        initialValue={props.operator == 'edit'?props.data.works:''}
        rules={[
          {
            required: true,
            message: '请输入作品数量',
          },
        ]}
      >
        <Input type='number'/>
      </Form.Item>



     


      <Form.Item label="展示图片一">
        <ImgCrop aspect={1920/1080}>
              <Upload
                action={ConfigBaseURL+'/artistImage'} 
                onChange={upload1}
                name="file"
                showUploadList={false}
              >
            {
                filePath1?
                <Image src={ConfigBaseURL+ filePath1} width={100} preview={false}/>
                :<Button type="primary">上传</Button>
            }
          </Upload>
        </ImgCrop>
      </Form.Item>

        


      <Form.Item label="展示图片二">
        <ImgCrop aspect={1920/1080}>
              <Upload
                action={ConfigBaseURL+'/addActiveImage'} 
                onChange={upload2}
                name="file"
                showUploadList={false}
              >
            {
                filePath2?
                <Image src={ConfigBaseURL+ filePath2} width={100} preview={false}/>
                :<Button type="primary">上传</Button>
            }
          </Upload>
        </ImgCrop>
      </Form.Item>
      <Form.Item label="展示图片三">
        <ImgCrop aspect={1920/1080}>
              <Upload
                action={ConfigBaseURL+'/addActiveImage'} 
                onChange={upload3}
                name="file"
                showUploadList={false}
              >
            {
                filePath3?
                <Image src={ConfigBaseURL+ filePath3} width={100} preview={false}/>
                :<Button type="primary">上传</Button>
            }
          </Upload>
        </ImgCrop>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
            确认修改
        </Button>
      </Form.Item>
    </Form>
        </div>
    )
}

export default EditArticleType


import React,{useState,useEffect} from 'react'
import { Button, Card,Image,Upload ,message} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {getShowImage,editShowImage} from '../../../../api/consoleApi'
import ImgCrop from 'antd-img-crop';
import {ConfigBaseURL} from '../../../../api/http'
function TypeSetting() {
    
    const [list, setList] = useState([])
    // const [fileList, setFileList] = useState([]); // 上传文件列表
  const fetchData = async function() {
    const response = await getShowImage({data:'article1,article2,article3,article4'});
    setList(response.data);
  }

    useEffect(() => {
        fetchData()
    }, [])


    const onChange1 = async (res) => {
        if(res.file.response){
            let result = await editShowImage({
                type:'article1',
                path:res.file.response.storageAddress
            })
            if(result.code == 200){
                message.success("更换成功！")
                fetchData()
            }else{
                message.error("更换失败，请联系管理员")
            }
        }
      };


      const onChange2 = async(res) => {

        if(res.file.response){
            let result = await editShowImage({
                type:'article2',
                path:res.file.response.storageAddress
            })
            if(result.code == 200){
                message.success("更换成功！")
                fetchData()
            }else{
                message.error("更换失败，请联系管理员")
            }
        }
      };

      const onChange3 = async (res) => {
        if(res.file.response){
            let result = await editShowImage({
                type:'article3',
                path:res.file.response.storageAddress
            })
            if(result.code == 200){
                message.success("更换成功！")
                fetchData()
            }else{
                message.error("更换失败，请联系管理员")
            }
        }
      };


      const onChange4 = async(res) => {

        if(res.file.response){
            let result = await editShowImage({
                type:'article4',
                path:res.file.response.storageAddress
            })
            if(result.code == 200){
                message.success("更换成功！")
                fetchData()
            }else{
                message.error("更换失败，请联系管理员")
            }
        }
      };



    return (
        <div>
            建议尺寸：800x800
        <Card title={
            <div style={{display:'flex'}}>
                <span style={{marginRight:'auto'}}>文章分类1</span>
                <ImgCrop aspect={800/800}>
                        <Upload
                        action={ConfigBaseURL+'/uploadShowImage'} 

                        onChange={onChange1}
                        name="showImage"
                        showUploadList={false}
                        >
                    <Button icon={<UploadOutlined />}>更换</Button>
                    </Upload>
                </ImgCrop>
            </div>
        } style={{marginBottom:20}}>
            <Image src={list[0]?list[0].path:""}></Image>
            
        </Card>


        <Card title={
            <div style={{display:'flex'}}>
                <span style={{marginRight:'auto'}}>文章分类2</span>
                <ImgCrop aspect={800/800}>
                        <Upload
                        action={ConfigBaseURL+'/uploadShowImage'} 
                        onChange={onChange2}
                        name="showImage"
                        showUploadList={false}
                        >
                    <Button icon={<UploadOutlined />}>更换</Button>
                    </Upload>
                </ImgCrop>
            </div>
        } style={{marginBottom:20}}>
            <Image src={list[1]?list[1].path:""}></Image>
            
        </Card>

        <Card title={
            <div style={{display:'flex'}}>
                <span style={{marginRight:'auto'}}>文章分类3</span>
                <ImgCrop aspect={800/800}>
                        <Upload
                        action={ConfigBaseURL+'/uploadShowImage'} 
                        onChange={onChange3}
                        name="showImage"
                        showUploadList={false}
                        >
                    <Button icon={<UploadOutlined />}>更换</Button>
                    </Upload>
                </ImgCrop>
            </div>
        } style={{marginBottom:20}}>
            <Image src={list[2]?list[2].path:""}></Image>
            
        </Card>

        <Card title={
            <div style={{display:'flex'}}>
                <span style={{marginRight:'auto'}}>文章分类4</span>
                <ImgCrop aspect={800/800}>
                        <Upload
                        action={ConfigBaseURL+'/uploadShowImage'} 
                        onChange={onChange4}
                        name="showImage"
                        showUploadList={false}
                        >
                    <Button icon={<UploadOutlined />}>更换</Button>
                    </Upload>
                </ImgCrop>
            </div>
        } style={{marginBottom:20}}>
            <Image src={list[3]?list[3].path:""}></Image>
            
        </Card>

    </div>
    )
}

export default TypeSetting

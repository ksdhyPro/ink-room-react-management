import React,{useState,useEffect} from 'react'
import { Button, Card,Image,Upload ,message} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {getShowImage,editShowImage} from '../../../../api/consoleApi'
import ImgCrop from 'antd-img-crop';
import {ConfigBaseURL} from '../../../../api/http'
function Cover() {

    const [list, setList] = useState([])
    // const [fileList, setFileList] = useState([]); // 上传文件列表
  const fetchData = async function() {
    const response = await getShowImage({data:'active,course'});
    setList(response.data);
  }

    useEffect(() => {
        fetchData()
    }, [])


    const onChange1 = async (res) => {
        if(res.file.response){
            let result = await editShowImage({
                type:'active',
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
                type:'course',
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
            建议尺寸：390x150
            <Card title={
                <div style={{display:'flex'}}>
                    <span style={{marginRight:'auto'}}>首页活动封面图</span>
                    <ImgCrop aspect={390/150}>
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
                    <span style={{marginRight:'auto'}}>首页课程封面图</span>
                    <ImgCrop aspect={390/150}>
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

        </div>
    )
}

export default Cover

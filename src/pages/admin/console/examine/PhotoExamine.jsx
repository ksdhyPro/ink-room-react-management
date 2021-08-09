import React ,{useState,useEffect}from 'react'
import { Button,Table ,Modal, message,Image } from 'antd';
import {getIsShenHePhoto,isPhotoPass} from '../../../../api/consoleApi'
import {timeFormat} from '../../../../utils/timeFormat'
import './main.css'
import { ConfigBaseURL } from '../../../../api/http';

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
      offset: 8,
      span: 16,
    },
  };
  
function PhotoExamine() {
    const [photoList, setPhotoList] = useState([])
    const [showModel, setShowModel] = useState(false)
    const [data, setData] = useState(null)
    const columns = [
        { 
          title: 'ID',
          dataIndex: 'id',
        },
        { 
            title: '名称',
            dataIndex: 'name',
          },
        {
          title: '图片',
          dataIndex: 'path',
          render:(text)=> <Image style={{maxWidth:200}} src={ConfigBaseURL + text}/>
        },
        {
          title: '提交时间',
          dataIndex: 'time',
          render:(text)=>timeFormat(text)
        },
        
        {
            title: '操作',
            align:'center',
            render:(text, record, index)=>(
                <div style={{display:'flex',justifyContent:'center'}}>
                    <Button type="link" onClick={()=>{
                        setData(photoList.list[index]);
                        setShowModel(true)
                    }}>通过</Button>
                    <Button type="link" danger onClick={()=>{
                        setData(photoList.list[index]);
                        setShowModel(true)
                    }}>不通过</Button>
                </div>
            )
        },
      ];






      const getPhotoList = async(start,pageSize) => {
        let res = await getIsShenHePhoto(start,pageSize)

        setPhotoList(res)
      }

    
        useEffect(() => {
            getPhotoList({start:10,pageSize:1})
        }, [])
        
        const handleOk =async () => {
            console.log(data);
          // 网络请求
          let res = await isPhotoPass({
            isPass:1,
            id:data.id,
            photoListId:data.photoListId,
            userId:data.userId,
            path:data.path
          })
          
          console.log();
          if(res.code == 200){
            message.success("操作成功")

          }else{
            message.error("操作失败，请检查网络情况")
          }
          getPhotoList({start:10,pageSize:1})
          setShowModel(false);
        };
    
        const handleCancel = () => {
        setShowModel(false);
        };

    return (
        <div>
             <Table 
            dataSource={photoList.list} 
            columns={columns} 
            rowKey={(record=>record.id)} 
            size="small"
            // pagination={{
            //     // total: articleList.total,
            //     showQuickJumper:true,
            //     showTotal:(total, range) => `共 ${total} 条记录`,
            //     onChange:(page, pageSize)=>{
            //     //     setPage(page)
            //     // getArticleList({items:10,page:page})
            //     }
            // }}
            bordered 
            tableLayout
        />
          <Modal 
        footer={
           <>
            <Button onClick={handleOk} type="primary">确定</Button>
            <Button type='primary' danger onClick={handleCancel}>取消</Button>
           </>
        }
         width={500}
          title={'审核'} 
          visible={showModel} 
          destroyOnClose={true}
          onCancel={handleCancel}
          onOk={handleOk}
          
        >
         
            <p>确认进行此操作？</p>
         
        </Modal>
        </div>
    )
}

export default PhotoExamine

import React ,{useState,useEffect}from 'react'
import { Button,Table ,Modal, message } from 'antd';
import {getShenHeList,isArticlePass} from '../../../../api/consoleApi'
import {timeFormat} from '../../../../utils/timeFormat'
import './main.css'


function showhtml(htmlString){
    var html = {__html:htmlString};
    return   <div dangerouslySetInnerHTML={html}></div> ;
}

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
  
function ArticleExamine() {
    const [articleList, setArticleList] = useState({})
    const [showModel, setShowModel] = useState(false)
    const [data, setData] = useState(null)
    const [page,setPage] = useState(1)
    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
        },
        {
          title: '文章标题',
          dataIndex: 'title',
          render:(text)=>{
            if(text.length > 30){
              console.log(text);
              return text.substring(0,30) + '...';
            }
            return text;
          }
        },
        {
          title: '提交时间',
          dataIndex: 'createTime',
          render:(text)=>timeFormat(text)
        },
        
        {
            title: '操作',
            align:'center',
            render:(text, record, index)=>(
                <div style={{display:'flex',justifyContent:'center'}}>
                    <Button type="link" onClick={()=>{
                        console.log(articleList.list[index]);
                        setData(articleList.list[index]);
                        setShowModel(true);
                    }}>详情</Button>
                </div>
            )
        },
      ];






      const getArticleList = async(page) => {
        let res = await getShenHeList(page)
        setArticleList(res)
      }

    
        useEffect(() => {
          getArticleList({page:1})
        }, [])
        
        const handleOk =async () => {
          // 网络请求
          let res = await isArticlePass({
            isPass:1,
            id:data.id
          })
          console.log(res);

          if(res.data.code == 200){
            message.success("操作成功")
            getArticleList({page:1})
          }else{
            message.error("操作失败，请检查网络情况")
          }

          setShowModel(false);
        };
    
        const handleCancel = () => {
        setShowModel(false);
        };

    return (
        <div>
             <Table 
            dataSource={articleList.list} 
            columns={columns} 
            rowKey={(record=>record.id)} 
            size="small"
            pagination={{
                total: articleList.total,
                showQuickJumper:true,
                showTotal:(total, range) => `共 ${total} 条记录`,
                onChange:(page, pageSize)=>{
                  setPage(page)
                  getShenHeList(page)
                }
            }}
            bordered 
            tableLayout
        />
          <Modal 
        footer={
           <>
            <Button onClick={handleOk} type="primary">通过</Button>
            <Button type='primary' danger onClick={handleCancel}>不通过</Button>
           </>
        }
         width={1000}
          title={'审核'} 
          visible={showModel} 
          destroyOnClose={true}
          onCancel={handleCancel}
          onOk={handleOk}
          
        >
         
            <div id="content" style={{overflowY:'scroll'}}>
            {data && showhtml(data.content)}
            </div>
         
        </Modal>
        </div>
    )
}

export default ArticleExamine

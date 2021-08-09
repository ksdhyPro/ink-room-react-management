import { Button,Table,Modal,Form, Input,  DatePicker, message  } from 'antd';
import React ,{useState,useEffect} from 'react'
import {delArticle,searchArticle, getArticle} from '../../../../api/consoleApi'
import moment from 'moment'
import AddArticle from './AddArticle';



const { Search } = Input;

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

function ActiveList() {
    const [articleList, setArticleList] = useState({})
    const [operator, setOperator] = useState()
    const [isModalVisible, setIsModalVisible] = useState()
    const [data, setData] = useState({})
    const [page,setPage] = useState(1)
    const [isRegModalVisible, setIsRegModalVisible] = useState(false)

  const getArticleList = async(page) => {
    let res = await getArticle(page)
    setArticleList(res)
  }

    useEffect(() => {
      getArticleList({page:1})
    }, [])
    

    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
        },
        {
          title: '文章标题',
          dataIndex: 'title',
        },
        {
          title: '文章分类',
          dataIndex: 'typeId',
          render:(text)=>{
            return text == 0?'首页推荐':'分类'+text
          }
        },
        {
          title: '排序',
          dataIndex: 'sort',
        },
        {
            title: '操作',
            align:'center',
            render:(text, record, index)=>(
                <div style={{display:'flex',justifyContent:'center'}}>
                    <Button type="link" onClick={()=>{
                        setOperator('edit')
                        setData(articleList.list[index])
                        showModal()
                    }}>详情</Button>
                    <Button type="link" danger  onClick={()=>{
                        setOperator('delete')
                        setData(articleList.list[index])
                        showModal()
                    }}>删除</Button>
                </div>
            )
        },
      ];


    const childValue = (data)=>{
        if(data){
            message.success("操作成功")
            handleCancel()
            getArticleList({page:page})
        }
        else{
            message.success("操作失败")
            handleCancel()
        }
    }
    
    const showRegModal = () => {

      setIsRegModalVisible(true);
    };
  const handleRegCancel = () => {

    setIsRegModalVisible(false);
    };

    const showModal = () => {

        setIsModalVisible(true);
      };
    
    const handleOk =async () => {
        let res = await delArticle(data.id);
      if(res.code == 200){
        message.success("删除成功")
        getArticleList({page:page})
      }else{
        message.error("删除失败")
      }
        setIsModalVisible(false);
    };

    const handleCancel = () => {
    setIsModalVisible(false);
    };

    const add = ()=>{
        setOperator("add")
        showModal()
    }

    const onSearch =async (value,ev)=>{
      if(ev){
        if(ev.currentTarget.toString() == '[object HTMLButtonElement]'){
          // 点了搜索按钮
          if(value == ""){
            message.error("请输入搜索内容")
            }else{
              let res = await searchArticle({key:value,page:1});
              setArticleList(res)
            }
        }else if(ev.currentTarget.toString() == '[object HTMLInputElement]'){
          getArticleList({page:1})
        }
      }  
    }


    const searchChange = (e)=> {
      if(e.currentTarget.value == ""){
        getArticleList({page:1})
      }
    }

    const onPressEnter = async(e) =>{ 
      if(e.currentTarget.value == ""){
        message.error("请输入搜索内容")
        }else{
          let res = await searchArticle({key:e.currentTarget.value,page:1});
        //   setActiveList({data:res,total:res.length})
        }
    }



    return (
        <>
        <div>
        <Search
            placeholder="输入文章标题"
            allowClear
            enterButton="搜索"
            size="middle"
            style={{ width: 500 }}
            onSearch={onSearch}
            // onPressEnter={onPressEnter}
            onChange={searchChange}
        />
            <Button type="primary" onClick={add} style={{marginBottom:10,float:'right'}}>写文章</Button>
        </div>
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
              getArticleList({page:page})
            }
          }}
          bordered 
          tableLayout
        />

        <Modal 
        footer={
            operator != 'delete'?
            null
            :<><Button onClick={handleOk} type="primary">确定</Button><Button onClick={handleCancel}>取消</Button></>
        }
         width={ operator != 'delete'?1000:500}
          title={operator == "delete"?"删除":(operator == "edit"?"详情":"写文章")} 
          visible={isModalVisible} 
          destroyOnClose={true}
          onCancel={handleCancel}
          onOk={handleOk}
          
        >
         
            {operator != "delete"?
            <AddArticle operator={operator} data={data} getChildValue={childValue} />
            :<p>是否删除此项?<span style={{color:'red'}}></span></p>}
        </Modal>

      </>
    )
}

export default ActiveList

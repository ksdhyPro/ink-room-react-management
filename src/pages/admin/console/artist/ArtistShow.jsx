import { Table ,Button, Input,Modal,message} from 'antd'
import React, { useEffect,useState } from 'react'
import { getArticleType ,deleteArtist,searchArtist} from '../../../../api/consoleApi'
import EditArticleType  from './EditArticleType'

function ArtistShow() {
    const [list, setList] = useState([])
    const [operator, setOperator] = useState('')
    const [data, setData] = useState({})
    const [delId, setDelId] = useState();

    const {Search} = Input;


    const getData = async()=>{
        let res = await getArticleType();
       setList(res)
    }
    useEffect(() => {
        getData()
    }, [])

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDelModalVisible, setIsDelModalVisible] = useState(false);
    
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const showDelModal = () => {
    setIsDelModalVisible(true);
  };

  const handleDelOk = async() => {
    let res = await deleteArtist({id:delId});
    if(res.code == 200){
      message.success("删除成功");
      getData();
    }else{
      message.error("删除失败");
    }
    setIsDelModalVisible(false);
  };

  const handleDelCancel = () => {
    setIsDelModalVisible(false);
  };




  const childValue = (data)=>{
    if(data){
        message.success("操作成功")
        handleCancel()
        getData()
    }
    else{
        message.success("操作失败")
        handleCancel()
    }
}







  const onSearch =async (value,ev)=>{
    if(ev){
      if(ev.currentTarget.toString() == '[object HTMLButtonElement]'){
        // 点了搜索按钮
        if(value == ""){
          message.error("请输入搜索内容")
          }else{
            let res = await searchArtist({key:value});
            setList(res)
          }
      }else if(ev.currentTarget.toString() == '[object HTMLInputElement]'){
        getData()
      }
    }  
  }


  const searchChange = (e)=> {
    if(e.currentTarget.value == ""){
      getData()
    }
  }

  const onPressEnter = async(e) =>{ 
    if(e.currentTarget.value == ""){
      message.error("请输入搜索内容")
      }else{
        let res = await searchArtist({key:e.currentTarget.value});
        setList(res)
      }
  }













    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
        },
        {
          title: '用户id',
          dataIndex: 'userId',
        },
        {
          title: '艺术家',
          dataIndex: 'username',
        },
        {
          title: '排序',
          dataIndex: 'sort',
        },
        {
          title: '作品数量',
          dataIndex: 'works',
       
        } ,
        {
            title: '操作',
            dataIndex: 'operator',
            render:(text, record, index)=>(
                <>
                <Button type="link" onClick={()=>{
                  setOperator("edit")
                  setData(list[index])
                  showModal()
                }}>详情</Button>
                <Button type="link" danger onClick={()=>{
                  setDelId(list[index].id)
                  showDelModal()

                }}>删除</Button>
                </>
            )
          } 
      ];

    return (
        <div>
           <div style={{display:'flex',marginBottom:10}}>
           <Search
            placeholder="输入艺术家名称"
            allowClear
            enterButton="搜索"
            size="middle"
            style={{ width: 500 }}
            onSearch={onSearch}
            onPressEnter={onPressEnter}
            onChange={searchChange}
        />
            <Button type='primary' style={{marginLeft:'auto'}} onClick={()=>{
              setOperator("add")
              showModal()
            }}>新增项目</Button>
           </div>
            <Table 
                size="small"
                dataSource={list}
                columns={columns}
                bordered
                rowKey={(record=>record.id)} 
            ></Table>
            <Modal 
              title="删除"
              destroyOnClose={true}
              visible={isDelModalVisible}
              onOk={handleDelOk} 
              onCancel={handleDelCancel}
            >
              是否删除此项？
            </Modal>
            <Modal
            bodyStyle={{height:500,overflowY:'scroll'}}
            footer={null}
                title="详情"
                destroyOnClose={true}
                 visible={isModalVisible}
                  onOk={handleOk} 
                  onCancel={handleCancel}>
              <EditArticleType operator={operator} data={data} getChildValue={childValue}/>
            </Modal>
        </div>
    )
}

export default ArtistShow

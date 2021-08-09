import { Button,Table,Modal,Form, Input,  DatePicker, message  } from 'antd';
import React ,{useState,useEffect} from 'react'
import {getActive,delActive,searchActive} from '../../../../api/consoleApi'
import moment from 'moment'
import AddActive from './AddActive';
import ActiveRegister from './ActiveRegister';


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
    const [activeList, setActiveList] = useState({})
    const [operator, setOperator] = useState()
    const [isModalVisible, setIsModalVisible] = useState()
    const [data, setData] = useState({})
    const [page,setPage] = useState(1)
    const [isRegModalVisible, setIsRegModalVisible] = useState(false)

  const getCourse = async(page) => {
    let res = await getActive(page)
    setActiveList(res)
  }

    useEffect(() => {
      getCourse({page:1})
    }, [])
    

    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
        },
        {
          title: '活动名称',
          dataIndex: 'name',
        },
        {
          title: '活动开始时间',
          dataIndex: 'startTime',
          render:(text, record, index) => (
            moment(new Date(text)).format("YYYY-MM-DD")
          )
        },
        {
          title: '人数限制',
          dataIndex: 'maxPeople',
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
                        setData(activeList.list[index])
                        showRegModal()
                    }}>报名详情</Button>
                    <Button type="link" onClick={()=>{
                        setOperator('edit')
                        setData(activeList.list[index])
                        showModal()
                    }}>详情</Button>
                    <Button type="link" danger  onClick={()=>{
                        setOperator('delete')
                        setData(activeList.list[index])
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
            getCourse({items:10,page:page})
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
        let res = await delActive({id:data.id});
      if(res.code == 200){
        message.success("删除成功")
        getCourse({items:10,page:page})
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
              let res = await searchActive({key:value,page:1});
              console.log(1);
              setActiveList(res)
            }
        }else if(ev.currentTarget.toString() == '[object HTMLInputElement]'){
          getCourse({page:1})
        }
      }  
    }


    const searchChange = (e)=> {
      if(e.currentTarget.value == ""){
        getCourse({items:10,page:1})
      }
    }

    const onPressEnter = async(e) =>{ 
      if(e.currentTarget.value == ""){
        message.error("请输入搜索内容")
        }else{
          let res = await searchActive({key:e.currentTarget.value});
          setActiveList({data:res,total:res.length})
        }
    }



    return (
        <>
        <div>
        <Search
            placeholder="输入活动名称关键字"
            allowClear
            enterButton="搜索"
            size="middle"
            style={{ width: 500 }}
            onSearch={onSearch}
            // onPressEnter={onPressEnter}
            onChange={searchChange}
        />
            <Button type="primary" onClick={add} style={{marginBottom:10,float:'right'}}>创建活动</Button>
        </div>
        <Table 
          dataSource={activeList.list} 
          columns={columns} 
          rowKey={(record=>record.id)} 
          size="small"
          pagination={{
            total: activeList.total,
            showQuickJumper:true,
            showTotal:(total, range) => `共 ${total} 条记录`,
            onChange:(page, pageSize)=>{
                setPage(page)
              getCourse({items:10,page:page})
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
          title={operator == "delete"?"删除":(operator == "edit"?"详情":"新增")} 
          visible={isModalVisible} 
          destroyOnClose={true}
          onCancel={handleCancel}
          onOk={handleOk}
          
        >
            {operator != "delete"?
            <AddActive operator={operator} data={data} getChildValue={childValue}>

            </AddActive>
            :<p>是否删除此项?<span style={{color:'red'}}>(删除后该活动下已报名的用户数据将会丢失)</span></p>}
        </Modal>
        <Modal 
            title="报名详情"
            visible={isRegModalVisible} 
            destroyOnClose={true}
            footer={null}
            onCancel={handleRegCancel}
            width={1000}
            >
                <ActiveRegister data={data}/>
            </Modal>
      </>
    )
}

export default ActiveList

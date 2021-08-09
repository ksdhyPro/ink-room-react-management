import React, { useEffect, useState } from 'react'
import { getUser,search,searchType } from '../../../../api/userApi';
import moment from 'moment'
import { Button,Table ,Modal, Input, Select,message} from 'antd';
import { Option } from 'antd/lib/mentions'
import UserEdit from './UserEdit';
function UserList() {

const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'openid',
      dataIndex: 'openid',
    },
    {
      title: '昵称',
      dataIndex: 'name',
    },
    
    {
      title: 'vip等级',
      dataIndex: 'vipLevel',
      render:(text)=>{
          switch (text) {
              case '0':
                  return '初级会员'
                  break;
            case '1':
                return '高级会员'
                break;
            case '2':
                return '专家会员'
                break;
              default:
                  break;
          }
      }
    },
    {
      title: '是否为艺术家',
      dataIndex: 'isArtist',
      render:(text, record, index)=>{
          return text == 0?'是':'否';
      }
    },
    {
        title: '排序',
        dataIndex: 'sort',
      },
      {
        title: '注册时间',
        dataIndex: 'createTime',
        render:(text, record, index) => (
          moment(new Date(text)).format("YYYY-MM-DD")
        )
    },
    {
        title: '操作',
        align:'center',
        render:(text, record, index)=>(
            <div style={{display:'flex',justifyContent:'center'}}>
               
                <Button type="link" onClick={()=>{
                    setData(record)
                    showModal()

                }}>详情</Button>
                <Button type="link" onClick={()=>{

                }}>用户文章</Button>
                <Button type="link" onClick={()=>{

                }}>用户相册</Button>
            </div>
        )
    },
  ];




  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
const [userList, setUserList] = useState({})
const [data, setData] = useState({})
const getData = async(page) => {
    let res = await getUser(page)

    setUserList(res)
  }


const typeSearch =async (e)=>{
  if(e){
    let res = await searchType({key:e,page:1})

    setUserList(res)
  }else{
    getData({page:1})
  }
}



const onSearch =async (value,ev)=>{
  if(ev){
    if(ev.currentTarget.toString() == '[object HTMLButtonElement]'){
      // 点了搜索按钮
      if(value == ""){
        message.error("请输入搜索内容") 
        }else{
          let res = await search({key:value,page:1});
          setUserList(res)
        }
    }else if(ev.currentTarget.toString() == '[object HTMLInputElement]'){
      getData({page:1})
    }
  }  
}


const searchChange = (e)=> {
  if(e.currentTarget.value == ""){
    getData({page:1})
  }
}

const onPressEnter = async(e) =>{ 
  if(e.currentTarget.value == ""){
    message.error("请输入搜索内容") 
    }else{
      let res = await search({key:e.currentTarget.value,page:1});
      console.log(res);
      setUserList(res)
    }
}



useEffect(() => {
    getData({page:1})
}, [])

    return (
        <>
        <div style={{marginBottom:20}}>
        按类别搜索：
        <Select onChange={typeSearch} allowClear style={{width:300,marginRight:100}}>
            <Select.Option value="0">初级会员</Select.Option>
            <Select.Option value="1">高级会员</Select.Option>
            <Select.Option value="2">专家会员</Select.Option>
        </Select>
        按名称搜索：
        <Input.Search 
          placeholder="请输入会员名" 
          style={{width:300}}
          onSearch={onSearch}
          onPressEnter={onPressEnter}
          onChange={searchChange}
          allowClear
        />
        </div>
        <Table 
        dataSource={userList.list} 
        columns={columns} 
        rowKey={(record=>record.id)} 
        size="small"
        pagination={{
          total: userList.total,
          showQuickJumper:true,
          showTotal:(total, range) => `共 ${total} 条记录`,
          onChange:(page, pageSize)=>{
            getData({page:page})
          }
        }}
        bordered 
        tableLayout
      />

      <Modal 
      title="用户详情"
      destroyOnClose={true} 
      footer={null}
      onOk={handleOk}
      onCancel={handleCancel}
      visible={isModalVisible}
      width={1000}
      >
         <UserEdit data={data}  onChange={(res)=>{
                  if(res){
                    message.success('操作成功')
                    getData({page:1})
                    
                  }else{
                    message.error('操作失败，请稍后再试')
                  }
                  handleOk()
                }}></UserEdit>
      </Modal>
</>

    )
}

export default UserList

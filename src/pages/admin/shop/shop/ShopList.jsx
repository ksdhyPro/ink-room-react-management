import React ,{useEffect,useState}from 'react'
import { Button,Table,Modal,Form, Input,  DatePicker, message ,Popconfirm } from 'antd';
import { delShop, getShop, searchShop } from '../../../../api/shopApi'
import moment from 'moment'
import AddShop from './AddShop';
function ShopList() {

    // const { Search } = Input;

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



    const [shopList, setShopList] = useState({});

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [operator, setOperator] = useState('');
    const [data, setData] = useState({});



    const confirm =async (id)=> {
      let res = await delShop({id})
      if(res.code == 200){
        message.success('删除成功');
        getData({page:1})
      }else{

        message.success('删除失败，请稍后再试');
      }
    }
    
    const cancel = (e)=> {

    }

    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };


    const getData = async(items,page) => {
        let res = await getShop(items,page)
        setShopList(res)
      }
    
    useEffect(() => {
        getData({page:1})
    }, [])


    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
        },
        {
          title: '商品名称',
          dataIndex: 'name',
        },
        {
          title: '价格',
          dataIndex: 'price',
        },
        
        {
          title: '排序',
          dataIndex: 'sort',
        },
        {
          title: '艺术家',
          dataIndex: 'artist',
          render:(text) => text==''?'无':text
        },
        {
            title: '所属类别',
            dataIndex: 'typeName',
          },
          {
            title: '上架时间',
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
                        showModal()
                        setOperator('edit')
                        setData(record)
                    }}>详情</Button>
                     <Popconfirm
                      title="是否删除此项？"
                      onConfirm={()=>{confirm(record.id)}}
                      onCancel={cancel}
                      okText="确认"
                      cancelText="取消"
                    >
                      <Button type="link" danger>删除</Button>

                    </Popconfirm>
                    <Button type="link" onClick={()=>{
                        
                      }}>评价信息</Button>
                    
                </div>
            )
        },
      ];

      const onSearch =async (value,ev)=>{
        if(ev){
          if(ev.currentTarget.toString() == '[object HTMLButtonElement]'){
            // 点了搜索按钮
            if(value == ""){
              message.error("请输入搜索内容")
              }else{
                let res = await searchShop({key:value});
                console.log(res);
                setShopList({data:res,total:res.length})
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
            let res = await searchShop({key:e.currentTarget.value});
            setShopList({data:res,total:res.length})
          }
      }






    return (
        <>
        <div style={{display:'flex'}}>
        <Input.Search
          placeholder="请输入商品名" 
          style={{width:300}}
          onSearch={onSearch}
          onPressEnter={onPressEnter}
          onChange={searchChange}
          allowClear
        />
        <Button 
        type='primary'
          style={{marginBottom:20,marginLeft:'auto'}}
          onClick={()=>{
            setOperator("add")
            setData({})
            showModal()
        }}>新增商品</Button>
        </div>
        <Table 
          dataSource={shopList.list} 
          columns={columns} 
          rowKey={(record=>record.id)} 
          size="small"
          pagination={{
            total: shopList.total,
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
            title="商品详情"
            destroyOnClose={true} 
            footer={null}
            onOk={handleOk}
            onCancel={handleCancel}
            visible={isModalVisible}
            width={1000}
            >
                <AddShop onChange={(res)=>{
                  if(res){
                    message.success('操作成功')
                    getData({page:1})
                    
                  }else{
                    message.error('操作失败，请稍后再试')
                  }
                  handleOk()
                }} operator={operator} data={{...data,coverPath :(data.coverPath && JSON.parse(data.coverPath))}}/>
            </Modal>

        </>
    )
}

export default ShopList

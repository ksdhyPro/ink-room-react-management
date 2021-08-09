import React ,{useEffect,useState}from 'react'
import { Button,Table,Modal,Select, Input,  DatePicker, message ,Popconfirm,Image } from 'antd';
import { delShop, editStatus, getOrderList, getShop, searchOrder, searchShop ,searchStatus} from '../../../../api/shopApi'
import moment from 'moment'
import {ConfigBaseURL} from '../../../../api/http'
function OrderList() {

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


    const getData = async(page) => {
        let res = await getOrderList(page)
  
        setShopList(res)
      }
    
    useEffect(() => {
        getData({page:1})
    }, [])


    const columns = [
      {
        title: '订单编号',
        dataIndex: 'id',
        align:'center',
        render:(text)=><span style={{fontWeight:700}}>{text}</span>
      },
      {
        title: '商品图片',
        align:'center',
        render:(text, record, index)=>(
            <div style={{display:'flex',justifyContent:'center',padding:'15px 0'}}>

               <Image src={record.coverPath} width={100} style={{borderRadius:'15px'}}></Image>
            </div>
        )
    },
 
        {
          title: '商品名称',
          dataIndex: 'shopName',
          align:'center'
        },
        {
          title: '价格',
          dataIndex: 'price',
          align:'center'
        },

        {
          title: '发货状态',
          dataIndex: 'status',
          render:(text, record, index) => (
            text=='0'?'待发货':(text=='1'?"已发货":'已签收')
          ),
          align:'center'
      },
        
          {
            title: '创建时间',
            dataIndex: 'createTime',
            render:(text, record, index) => (
              moment(new Date(text)).format("YYYY-MM-DD HH:mm:ss")
            ),
            align:'center'
        },
      
        {
            title: '订单详情',
            align:'center',
            render:(text, record, index)=>(
                <div style={{display:'flex',justifyContent:'center'}}>
                   
                    <Button type="link" onClick={()=>{
                        showModal()
                        setOperator('edit')
                        setData(record)
                    }}>详情</Button>
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
                let res = await searchOrder({orderId:value,page:1});
                setShopList(res)
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

      /**
       * 通过发货状态筛选
       */
      const tabStatus = async(e)=>{
        if(e){
          let res = await searchStatus({status:e,page:1})
          setShopList(res)
        }else{
          getData({page:1})
        }
      }



    return (
        <>
        <div style={{display:'flex',marginBottom:20,alignItems:'center'}}>
          订单号搜索：
        <Input.Search
          placeholder="请输入订单编号" 
          style={{width:300}}
          onSearch={onSearch}
          onPressEnter={onPressEnter}
          onChange={searchChange}
          allowClear
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        订单状态搜索：
        <Select placeholder="请选择订单状态"  onChange={tabStatus} allowClear style={{width:300,marginRight:100}}>
            <Select.Option value="0">未发货</Select.Option>
            <Select.Option value="1">已发货</Select.Option>
            <Select.Option value="2">已签收</Select.Option>
        </Select>
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
            title={"订单："+data.id}
            destroyOnClose={true} 
            footer={null}
            onOk={handleOk}
            onCancel={handleCancel}
            visible={isModalVisible}
            width={600}
            >
              <div style={{ display:'flex'}}>
                <div style={{marginRight:50,display:'flex',alignItems:'center'}}>
                  <Image src={data.coverPath} width={150} style={{borderRadius:'15px'}}></Image>
                </div>
                <div>
                  <p><span style={{display:'inline-block',width:100,fontWeight:700}}>商品名：</span>{data.shopName}</p>
                  <p><span style={{display:'inline-block',width:100,fontWeight:700}}>收货人：</span>{data.name}</p>
                  <p><span style={{display:'inline-block',width:100,fontWeight:700}}>收货手机号：</span>{data.phone}</p>
                  <p><span style={{display:'inline-block',width:100,fontWeight:700}}>收货地址：</span>{data.address}</p>
                  <p><span style={{display:'inline-block',width:100,fontWeight:700}}>发货状态：</span>{data.status=='0'?(<><span>未发货</span><Button type="link" onClick={async ()=>{
                    let res = await editStatus({id:data.id,status:1})
                    if(res.code=="200"){
                      message.success("操作成功")
                      handleOk()
                      let old = {...shopList};
                      old.list.forEach(item=>((item.id == data.id) && (item.status = 1)))
                      setShopList({...old})
                    }else{
                      message.success("请检查您的网络")
                    }
                  }}>立即发货</Button></>):(data.status=='1'?"已发货":'已签收')}</p>
                  <p><span style={{display:'inline-block',width:100,fontWeight:700}}>订单备注：</span>{data.message}</p>
                </div>
              </div>
            </Modal>

        </>
    )
}

export default OrderList


import { Button, Table } from 'antd';
import React,{useEffect,useState} from 'react'
import { getActiveReg } from '../../../../api/consoleApi';
import moment from 'moment'
import { ConfigBaseURL } from '../../../../api/http';

function ActiveRegister(props) {
    const [list, setList] = useState({})
    const getData = async (items,page)=>{
        let res = await getActiveReg({activeId:props.data.id,items,page})
        setList(res)
    }
    useEffect(() => {
        getData(10,1); 
       
    }, [])


   


    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
        },
        {
          title: '报名用户',
          dataIndex: 'userName',
        },
        {
          title: '报名时间',
          dataIndex: 'createTime',
          render:(text, record, index) => (
            moment(new Date(text)).format("YYYY-MM-DD")
          )
        } 
      ];






    return (
        <div>
            <Button><a href={ConfigBaseURL+'/console/getActiveExcel?activeId='+props.data.id}>导出excel</a></Button>
            <Table 
                // title={props}
                columns={columns}
                dataSource={list.data}
                rowKey={(record=>record.id)} 
                size="small"
                pagination={{
                    total: list.total,
                    showQuickJumper:true,
                    showTotal:(total, range) => `共 ${total} 条记录`,
                    onChange:(page, pageSize)=>{
                      getData({items:10,page:page})
                    }
                  }}
                bordered
            />
        
        </div>
    )
}

export default ActiveRegister

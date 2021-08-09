import React,{useEffect,useState} from 'react'
import { editSetting, getSetting } from '../../../../api/consoleApi'
import {Button, Form, Switch} from 'antd'


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };



function Setting() {
    const [list, setList] = useState([])
    const getData = async() =>{
        let res = await getSetting();
        setList(res)
    }
    useEffect(() => {
        getData();
    }, [])
    function onChange(checked) {
        console.log(`switch to ${checked}`);
      }
      const onFinish =async(e)=>{
        let res = await editSetting({
            id:Object.keys(e)[0],
            value:e[1]
        })
        console.log(res);
      }
      const onFinishFailed =(e)=>{
        console.log(e);
      }
    return (
        <Form  
        onFinish={onFinish}
        onFinishFailed={onFinishFailed} >
        <div>
            {
                list.map(item=>(
                    <Form.Item
                        label={item.name}
                        name={item.id}>
                        <Switch  defaultChecked={item.value==0?false:true} onChange={onChange} />
                    </Form.Item>
                ))
            }
            <Button type="primary" htmlType="submit">保存设置</Button>
        </div>
        </Form>
    )
}

export default Setting

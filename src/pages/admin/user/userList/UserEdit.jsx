import {Form,Input,Select,Button} from 'antd'
import TextArea from 'antd/lib/input/TextArea';
import React,{useEffect} from 'react'
import { Option } from 'antd/lib/mentions'
import { edit } from '../../../../api/userApi';
const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 16,
    },
  };


 
  
const UserEdit = (props) => {

    const onFinish = async(e) => {
        let res = await edit({...e})
        if(res.code == 200){
            props.onChange(true)
        }else{
            props.onChange(false)
        }
      }
    
    
      const onFinishFailed = (e) => { 
          console.log(e);
      }


useEffect(() => {
    console.log(props);
}, [])


    return (
        <div>
            <Form
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
                <Form.Item
                        label="id"
                        name="id"
                        initialValue={props.data.id}
                    >
                        <Input disabled/>
                </Form.Item>
                <Form.Item
                        label="昵称"
                        name="name"
                        initialValue={props.data.name}
                    >
                        <Input disabled/>
                </Form.Item>
                <Form.Item
                        label="排序"
                        name="sort"
                        initialValue={props.data.sort}
                    >
                        <Input type="number"/>
                </Form.Item>
                <Form.Item
                        label="会员级别"
                        name="vipLevel"
                        initialValue={props.data.vipLevel}
                    >
                    <Select >
                    <Select.Option value="0">初级会员</Select.Option>
                    <Select.Option value="1">高级会员</Select.Option>
                    <Select.Option value="2">专家会员</Select.Option>
                    
                </Select>
                </Form.Item>
                <Form.Item
                        label="是否为艺术家"
                        name="isArtist"
                        initialValue={''+props.data.isArtist}
                    >
                    <Select >
                        <Select.Option value="0">是</Select.Option>
                        <Select.Option value="1">否</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                        label="个人介绍"
                        name="msg"
                        initialValue={props.data.msg}
                    >
                        <TextArea style={{minHeight:200}}/>
                </Form.Item>
                <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
            </Form>
        </div>
    )
}

export default UserEdit

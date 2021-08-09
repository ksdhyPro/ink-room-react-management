import React from 'react'
import { ConfigBaseURL } from '../api/http'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { login } from '../api/systemApi';

function Login() {
    const onFinish = async (values) => {
       let res = await login(values)
       if(res.status){
           sessionStorage.setItem("isLogin",true)
           message.success("登陆成功")
           setTimeout(() => {
               window.location.href = "/"
           }, 1000);
       }else{
        message.error("登陆失败，请检查用户名或密码")
       }
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (
        <div style={{
            display:'flex',
            flexFlow:'column',
            alignItems:'center',
            justifyContent:'center', 
             width:'100%',height:'100%',
             backgroundImage:`url("${ConfigBaseURL}/images/background/bg.jpg")`
             }}>
            <h1 style={{marginBottom:50}}>墨色间后台管理系统</h1>
            <div style={{
                width:500,
                border:'1px solid #8c5c4a',
                padding:'70px 70px 20px 20px',
                boxSizing:'border-box'
                }}>
                
            <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
            <Form.Item
                label="用户名"
                name="username"
                rules={[
                {
                    required: true,
                    message: '请输入用户名!',
                },
                ]}
            >
                <Input autoComplete="false"/>
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[
                {
                    required: true,
                    message: '请输入密码!',
                },
                ]}
            >
                <Input.Password autoComplete="false"/>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                offset: 8,
                span: 16,
                }}
            >
                <Button type="primary" htmlType="submit" style={{backgroundColor:'#8c5c4a',border:'none'}}>
                立即登录
                </Button>
            </Form.Item>
            </Form>
            </div>
        </div>
    )
}

export default Login

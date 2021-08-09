import React,{useState} from 'react'
import { Layout, Menu, Breadcrumb,Button ,message} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import {nav} from '../../routers/index'
import {Link,Route,Switch} from 'react-router-dom'
import Console from "../Console";
import Shop from "../Shop";
import User from "../User";
import './Index.css';
import logo from './logo.jpg'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const init = function(){
    let a = window.location.pathname + '/';
    let b = a.indexOf("/",7);
    return a.substring(0,b)
}


function Index(props) {
    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState(init())
    return (
        <Layout>
            <Header className="header" style={{display:"flex"}}>
            <div className="logo">
                <img src={logo} alt="logo" width='50'style={{marginRight:100}}/>
            </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[defaultSelectedKeys]}>
                {nav.map(item=>(
                    <Menu.Item key={item.path}>
                      <Link to={item.path}>{item.title}</Link>
                    </Menu.Item>
                ))}
            </Menu>
            <div style={{color:'#fff',marginLeft:'auto'}}>
                欢迎您，admin！
                <Button type="link" onClick={
                    ()=>{
                        sessionStorage.clear();
                        message.success("退出成功")
                        setTimeout(() => {
                            window.location.href = "/"
                        }, 1000);
                    }
                }>退出登录</Button>
            </div>
            </Header>
            <Layout>
            <Switch>
                <Route path="/admin/console" component={Console} />
                <Route path="/admin/Shop" component={Shop} />
                <Route path="/admin/User" component={User} />
            </Switch>
            <Layout style={{ padding: '24px 24px' }}>
                <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    overflowY:'scroll'
                }}
                >
                {props.children}
                </Content>
            </Layout>
            </Layout>
        </Layout>

    )
}

export default Index

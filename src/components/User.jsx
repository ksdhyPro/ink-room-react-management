import React from 'react'
import { UserOutlined} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import {Link} from 'react-router-dom'
const { SubMenu } = Menu;
const { Sider } = Layout;

const console = () => {
    return (

        <Sider width={200} className="site-layout-background">
            <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            >
            <SubMenu key="sub1" icon={<UserOutlined />} title="会员列表">
                <Menu.Item key="1">
                    <Link to="/admin/user/userList">会员列表</Link>
                </Menu.Item>
            </SubMenu>
            
            </Menu>
      </Sider>

    )
}

export default console

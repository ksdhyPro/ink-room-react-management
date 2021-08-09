import React from 'react'
import { PictureOutlined, OrderedListOutlined, ShopOutlined } from '@ant-design/icons';
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
            <SubMenu key="sub1" icon={<PictureOutlined />} title="轮播图管理">
                <Menu.Item key="1">
                    <Link to="/admin/shop/carouselEdit">商品页轮播</Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<ShopOutlined />} title="商品管理">
                <Menu.Item key="2">
                    <Link to="/admin/shop/shopList">商品列表</Link>
                </Menu.Item> 
            </SubMenu>
            <SubMenu key="sub3" icon={<OrderedListOutlined />} title="订单管理">
                <Menu.Item key="5">
                    <Link to="/admin/shop/orderList">订单管理</Link>
                </Menu.Item>
            </SubMenu>
            </Menu>
      </Sider>

    )
}

export default console

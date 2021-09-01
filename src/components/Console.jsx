import React from 'react'
import { Layout, Menu } from 'antd';
import { PictureOutlined,
     AlignLeftOutlined,
     UnorderedListOutlined,
     ReadOutlined, 
     NotificationOutlined,
     SettingOutlined ,
     QuestionCircleOutlined,
     BarChartOutlined 
    } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const { SubMenu } = Menu;






const Console = () => {

    return (

        <Sider width={200} className="site-layout-background">
            <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
            >
            <SubMenu key="sub0" icon={<BarChartOutlined />} title="数据展示">
                <Menu.Item key="display">
                    <Link to="/admin/console/display">
                        数据展示
                    </Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="sub1" icon={<PictureOutlined />} title="轮播图管理">
                <Menu.Item key="1">
                    <Link to="/admin/console/carousel">
                        轮播图设置
                    </Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<UnorderedListOutlined />} title="分类管理">
                <Menu.Item key="2">
                    <Link to="/admin/console/cover">
                        课程/活动封面
                    </Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="/admin/console/typeSetting">
                    文章分类封面
                    </Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<ReadOutlined />} title="课程管理">
                {/* <Menu.Item key="5">
                    <Link to="/admin/console/addCourse">
                        发布课程
                    </Link>
                </Menu.Item> */}
                <Menu.Item key="6">
                    <Link to="/admin/console/courseList">
                        课程管理
                    </Link>
                </Menu.Item>
                {/* <Menu.Item key="7">
                    <Link to="/admin/console/courseRegister">
                        课程报名表
                    </Link>
                </Menu.Item> */}
            </SubMenu>
            <SubMenu key="sub4" icon={<NotificationOutlined />} title="活动管理">
                <Menu.Item key="9">
                    <Link to="/admin/console/active/activeList">活动管理</Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="sub40" icon={<NotificationOutlined />} title="文章管理">
                <Menu.Item key="90">
                    <Link to="/admin/console/article/articleList">文章管理</Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="sub5" icon={<AlignLeftOutlined />} title="艺术家展示管理">
                <Menu.Item key="11">
                    <Link to="/admin/console/artistShow">艺术家首页展示</Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="sub6" icon={<QuestionCircleOutlined />} title="审核管理">
                <Menu.Item key="12">
                    <Link to="/admin/console/articleExamine">
                        文章审核
                    </Link>
                </Menu.Item>
                <Menu.Item key="15">
                    <Link to="/admin/console/photoExamine">
                        相册审核
                    </Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="sub7" icon={<SettingOutlined />} title="全局设置">
                <Menu.Item key="14">
                    <Link to="/admin/console/setting">设置</Link>
                </Menu.Item>
            </SubMenu>
            </Menu>
      </Sider>

    )
}

export default Console

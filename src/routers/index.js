import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";

import ActiveList from '../pages/admin/console/active/ActiveList'
import ActiveRegister from '../pages/admin/console/active/ActiveRegister'
import AddActive from '../pages/admin/console/active/AddActive'

import ArticleList from '../pages/admin/console/article/ArticleList'

import CourseList from '../pages/admin/console/course/CourseList'
import CourseRegister from '../pages/admin/console/course/CourseRegister'
import AddCourse from '../pages/admin/console/course/AddCourse'

import ArtistShow from '../pages/admin/console/artist/ArtistShow'



import Carousel from '../pages/admin/console/carousel/CarouselEdit.jsx'

import ArticleExamine from '../pages/admin/console/examine/ArticleExamine'
import PhotoExamine from '../pages/admin/console/examine/PhotoExamine'
import Setting from "../pages/admin/console/setting/Setting.jsx";
import Cover from "../pages/admin/console/type/Cover";
import TypeSetting from "../pages/admin/console/type/TypeSetting";
import CarouselEdit from "../pages/admin/shop/carousel/CarouselEdit.jsx";
import OrderList from "../pages/admin/shop/order/OrderList";
import AddShop from "../pages/admin/shop/shop/AddShop";
import ShopList from "../pages/admin/shop/shop/ShopList";
import UserList from "../pages/admin/user/userList/UserList";
import Display from "../pages/admin/console/display/Display";



export const mainRoutes = [
	{
		path:'/login',
		component:Login
	},
	{
		path:'/404',
		component:PageNotFound
	}
]


export const nav = [
	{
		title:'控制台',
		path:'/admin/console',
		route:[]
	},
	{
		title:'商品管理',
		path:'/admin/shop',
		route:[]
	},
	{
		title:'用户管理',
		path:'/admin/user',
		route:[]
	}
]



	// 控制台
const console = [
	{
		path:'/admin/console',
		component:Display
	},
	{
		path:'/admin/console/display',
		component:Display
	},
	{
		path:'/admin/console/carousel',
		component:Carousel
	},
	{
		path:'/admin/console/active/activeList',
		component:ActiveList
	},
	{
		path:'/admin/console/article/articleList',
		component:ArticleList
	},
	// {
	// 	path:'/admin/console/addActive',
	// 	component:AddActive
	// },
	// {
	// 	path:'/admin/console/addCourse',
	// 	component:AddCourse
	// },
	{
		path:'/admin/console/courseList',
		component:CourseList
	},
	// {
	// 	path:'/admin/console/courseRegister',
	// 	component:CourseRegister
	// },
	 
	{
		path:'/admin/console/setting',
		component:Setting
	},
	{
		path:'/admin/console/ArticleExamine',
		component:ArticleExamine
	},
	{
		path:'/admin/console/photoExamine',
		component:PhotoExamine
	},
	{
		path:'/admin/console/cover',
		component:Cover
	},
	{
		path:'/admin/console/typeSetting',
		component:TypeSetting
	},
	{
		path:'/admin/console/artistShow',
		component:ArtistShow
	}

]


const shop = [
	{
		path:'/admin/shop',
		component:CarouselEdit
	},
	{
		path:'/admin/shop/carouselEdit',
		component:CarouselEdit
	},
	{
		path:'/admin/shop/orderList',
		component:OrderList
	},
	// {
	// 	path:'/admin/shop/addShop',
	// 	component:AddShop
	// },
	{
		path:'/admin/shop/shopList',
		component:ShopList
	},
	
]

const user = [
	{
		path:'/admin/user',
		component:UserList
	},
	{
		path:'/admin/user/userList',
		component:UserList
	}
]



export const adminRoutes = [
	...console,
	...shop,
	...user
	

	
]
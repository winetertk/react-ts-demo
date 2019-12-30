import asyncComponent from '../utils/asyncComponent'
const Userauth = asyncComponent(() => import("../pages/identity_auth/userAuth.tsx"))
const Home = asyncComponent(() => import("../pages/home/home.tsx"))
const List = asyncComponent(() => import("../pages/list/list.tsx"))
const orderAdd = asyncComponent(() => import("../pages/create_order/orderAdd.tsx"))

const routes = [
    {
        path: '/',
        redirect: '/userauth',
        component: null,
        children: [],
        title: '身份验证'
    },
    {
        path: '/userauth',
        redirect: null,
        component: Userauth,
        name: 'userAuth',
        title: '身份验证',
        children: []
    },
    {
        path: '/home',
        redirect: null,
        component: Home,
        name: 'Home',
        title: '选择服务',
        children: []
    },
    {
        path: '/list',
        redirect: null,
        component: List,
        name: 'List',
        title: '历史申报单',
        children: []
    },
    {
        path: '/orderadd',
        redirect: null,
        component: orderAdd,
        name: 'orderAdd',
        title: '新增申报单',
        children: []
    }
]

export default routes
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/main/home'
import store from '@/store/store'

Vue.use(Router)
if(window.localStorage.getItem("token")){
	store.commit('Login',window.localStorage.getItem('token'));
}
const routes = [
    {
        path: '/',
        name: 'App',
        component: Login
     },
     {
           path: '/home',
        name: 'home',
        component:Home
     },
];
const router = new Router({
	mode:'history',
    routes
});
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (store.state.token) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})
export default router;
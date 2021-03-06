import Vue from 'vue';
import VueRouter from 'vue-router';
import { routers, otherRouter, appRouter } from './router';
import { LoadingBar } from 'iview';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: routers
};

const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
	// 进度条开始
	LoadingBar.start();
    // 设置title
    window.document.title = to.meta.title;
    // 登录检测
    if (!localStorage.getItem('token') && to.meta.requiresAuth == true) {
        next('/login');
    } else if (localStorage.getItem('token') && to.name == 'login') {
        next('/admin/home');
    }
    // 权限检测 TODO
    next();
});

router.afterEach((to) => {
    // 返回顶部
    window.scrollTo(0, 0);
    // 进度条结束
    LoadingBar.finish();
});
export default router;
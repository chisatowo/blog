// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'


//创建并暴露一个路由器
export default new VueRouter({
	routes: [
		{
			path: '/',
			component: () => import('../views/Index'),
			children: [
				{
					path: 'about',
					component: () => import('../views/About'),
				},
				{
					path: '/',
					name: 'home',
					component: () => import('../views/Home'),
				},
				{
					path: "/sort",
					name: "sort",
					component: () => import('../views/sort')
				},
				{
					path: "/article",
					name: "article",
					component: () => import('../views/article')
				},
				{
					path: '/footprint',
					component: () => import('../views/footprint'),
				}
			]
		},
	]
})

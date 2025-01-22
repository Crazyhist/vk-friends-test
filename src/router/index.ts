import FriendPage from '@/pages/FriendPage.vue'
import HomePage from '@/pages/HomePage.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomePage,
	},
	{
		path: '/friend/:id',
		name: 'FriendPage',
		component: FriendPage,
		props: true,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router

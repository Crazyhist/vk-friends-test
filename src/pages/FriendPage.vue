<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUserById, getUserWall } from '@/api/services/vkApi'
import type { VkUser, VkWallPost } from '@/types/vk'
import { useSourceStore } from '@/stores/sourceStore'

const route = useRoute()
const router = useRouter()

const userId = route.params.id as string
const friend = ref<VkUser | null>(null)
const wallPosts = ref<VkWallPost[]>([])
const sourceUsers = ref<VkUser[]>([]) // Пользователи из "Исходного", у которых этот друг есть в друзьях

// Получение данных о друге
const fetchFriendData = async () => {
	try {
		wallPosts.value = await getUserWall(userId)
	} catch (error) {
		console.error('Ошибка загрузки данных друга:', error)
	}
}

// Найти "Исходных", у которых друг есть в друзьях
const fetchSourceUsers = () => {
	const sourceStore = useSourceStore()
	sourceUsers.value = sourceStore.sourceList.filter((user) =>
		sourceStore.friendsList.some(
			(f) => f.id === friend.value?.id && f.id === user.id
		)
	)
}

onMounted(() => {
	fetchFriendData()
	fetchSourceUsers()
})

// Переход назад
const goBack = () => {
	router.push('/')
}
</script>

<template>
	<div class="friend-page">
		<button @click="goBack" class="back-button">Назад</button>

		<div v-if="friend" class="friend-info">
			<img :src="friend.photo_100" alt="Фото друга" />
			<h2>{{ friend.first_name }} {{ friend.last_name }}</h2>
			<p>Пол: {{ friend.sex === 1 ? 'Женщина' : 'Мужчина' }}</p>
			<p>Дата рождения: {{ friend.bdate || 'N/A' }}</p>
		</div>
		<div v-else>
			<p>Данные о пользователе не найдены.</p>
		</div>
		<h3>Исходные пользователи:</h3>
		<ul>
			<li v-for="user in sourceUsers" :key="user.id">
				{{ user.first_name }} {{ user.last_name }}
			</li>
		</ul>

		<h3>Записи на стене:</h3>
		<ul>
			<li v-for="post in wallPosts" :key="post.id">
				<p>{{ post.text }}</p>
			</li>
		</ul>
	</div>
</template>

<style scoped>
.friend-page {
	padding: 20px;
}

.back-button {
	padding: 10px 20px;
	font-size: 16px;
	color: white;
	background-color: #00c8ff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	margin-bottom: 20px;
}

.friend-info {
	margin-bottom: 20px;
}

.friend-info img {
	width: 100px;
	height: 100px;
	border-radius: 50%;
}

.friend-info h2 {
	margin: 10px 0;
}
</style>

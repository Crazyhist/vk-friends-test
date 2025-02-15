<script setup lang="ts">
import { getFriends, getUserWall } from '@/api/services/vkApi'
import { useSourceStore } from '@/stores/sourceStore'
import type { VkUser, VkWallPost } from '@/types/vk'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const sourceStore = useSourceStore()

const userId = Number(route.params.id)

const wallPosts = ref<VkWallPost[]>([])
const commonFriends = ref<VkUser[]>([])

const fetchFriendData = async () => {
	try {
		wallPosts.value = await getUserWall(userId)
	} catch (error) {
		console.error('Ошибка загрузки данных друга:', error)
		wallPosts.value = []
	}
}

const fetchCommonFriends = () => {
	commonFriends.value = sourceStore.findUsersWithFriend(userId)
}

onMounted(() => {
	fetchFriendData()
	fetchCommonFriends()
})

const goBack = () => {
	router.push('/')
}
</script>

<template>
	<div class="friend-page">
		<button @click="goBack" class="back-button">Назад</button>

		<h3>Общие пользователи:</h3>
		<ul>
			<li v-for="user in commonFriends" :key="user.id">
				{{ user.first_name }} {{ user.last_name }}
			</li>
			<li v-if="commonFriends.length === 0">Общих друзей не найдено.</li>
		</ul>

		<h3>Записи на стене:</h3>
		<ul>
			<li v-for="post in wallPosts" :key="post.id" class="wall-post">
				<p v-if="post.text">{{ post.text }}</p>
				<p v-else class="no-text">Запись без текста</p>
				<p class="post-date">
					Дата: {{ new Date(post.date * 1000).toLocaleString() }}
				</p>
				<p class="likes" v-if="post.likes">Лайков: {{ post.likes.count }}</p>
				<img
					v-if="post.attachments && post.attachments[0]?.photo?.sizes"
					:src="post.attachments[0].photo.sizes[0].url"
					alt="Вложение"
					class="attachment"
				/>
			</li>
			<li v-if="wallPosts.length === 0">Записей на стене нет.</li>
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

.wall-post {
	margin-bottom: 15px;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	background-color: #f9f9f9;
}

.wall-post .no-text {
	color: #999;
	font-style: italic;
}

.post-date {
	font-size: 12px;
	color: #666;
}

.likes {
	font-size: 14px;
	color: #333;
	font-weight: bold;
}

.attachment {
	margin-top: 10px;
	width: 100%;
	max-width: 300px;
	border-radius: 5px;
}
</style>

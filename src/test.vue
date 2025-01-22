<script setup lang="ts">
import {
	getFriends,
	getUserById,
	getUserWall,
	searchUsers,
} from '@/api/services/vkApi'

const testGetUserById = async () => {
	try {
		const user = await getUserById('88887720')
		console.log('Данные пользователя:', user)
	} catch (error) {
		console.error('Ошибка при выполнении запроса:', error)
	}
}

const testSearchUsers = async () => {
	try {
		const results = await searchUsers('Кирилл Александров')
		console.log('Результаты поиска пользователей:', results)
	} catch (error) {
		console.error('Ошибка при поиске пользователей:', error)
	}
}

testSearchUsers()

const testGetFriends = async () => {
	try {
		const friends = await getFriends(88887720)
		console.log('Друзья пользователя:', friends)
	} catch (error) {
		console.error('Ошибка при получении списка друзей:', error)
	}
}

testGetFriends()

const testGetUserWall = async () => {
	try {
		const wallPosts = await getUserWall(88887720)
		console.log('Записи на стене пользователя:', wallPosts)
	} catch (error) {
		console.error('Ошибка при получении записей со стены:', error)
	}
}

testGetUserWall()
</script>

<template>
	<div>
		<button @click="testGetUserById">Тестировать getUserById</button>
	</div>
</template>

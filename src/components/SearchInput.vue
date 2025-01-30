<script setup lang="ts">
import { searchUsers } from '@/api/services/vkApi'
import type { VkUser } from '@/types/vk'

import { useSourceStore } from '@/stores/sourceStore'

import { defineEmits, ref, watch } from 'vue'

const store = useSourceStore()

const query = ref('')
const searchResults = ref<VkUser[]>([])
const emit = defineEmits(['select-user'])

const performSearch = async () => {
	if (!query.value.trim()) return
	try {
		searchResults.value = await searchUsers(query.value)
	} catch (error) {
		console.error('Ошибка при поиске пользователей:', error)
	}
}

const selectUser = (user: VkUser) => {
	emit('select-user', user)
	query.value = ''
	searchResults.value = []
}

const buildFriendsList = async () => {
	await store.buildFriendsList()
}

watch(query, (newValue) => {
	if (!newValue.trim()) {
		searchResults.value = []
	}
})
</script>

<template>
	<div class="search-container">
		<input
			v-model="query"
			class="search-input"
			type="text"
			placeholder="Введите имя, фамилию или ID"
			@input="performSearch"
		/>
		<ul v-if="searchResults.length" class="search-results">
			<li
				v-for="user in searchResults"
				:key="user.id"
				@click="selectUser(user)"
			>
				{{ user.first_name }} {{ user.last_name }} (ID: {{ user.id }})
			</li>
		</ul>
		<button class="build-button" @click="buildFriendsList">
			Построить список "Друзья"
		</button>
	</div>
</template>

<style scoped>
.search-container {
	display: flex;
	flex-direction: column;
	position: relative;
	width: 100%;
}

.search-input {
	padding: 10px;
	font-size: 14px;
	border: 1px solid #ccc;
	border-radius: 5px;
	margin-bottom: 10px;
}

.search-results {
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	background: white;
	border: 1px solid #ccc;
	border-radius: 5px;
	max-height: 200px;
	overflow-y: auto;
	z-index: 1000;
	margin-top: 5px;
}

.search-results li {
	padding: 10px;
	cursor: pointer;
	transition: background-color 0.2s;
}

.search-results li:hover {
	background-color: #f0f0f0;
}

.build-button {
	padding: 10px 20px;
	font-size: 1rem;
	color: white;
	background-color: #00c8ff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.2s;
}

.build-button:hover {
	background-color: #0096cc;
}
</style>

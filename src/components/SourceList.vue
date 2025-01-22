<script setup lang="ts">
import { useSourceStore } from '@/stores/sourceStore'

const store = useSourceStore()
</script>

<template>
	<div class="column">
		<h3 class="column-title">Исходный</h3>
		<ul>
			<li v-for="user in store.sourceList" :key="user.id" class="user-item">
				{{ user.first_name }} {{ user.last_name }}
				<button @click="store.removeUser(user.id)">Удалить</button>
			</li>
		</ul>
	</div>
</template>

<style scoped>
.column {
	background: #f9f9f9;
	border-radius: 10px;
	padding: 20px;
}

.column-title {
	margin-bottom: 10px;
}

.user-item {
	display: flex;
	justify-content: space-between;
	padding: 10px;
	background: white;
	border-radius: 5px;
	margin-bottom: 10px;
}
</style>

<script setup lang="ts">
import { useSourceStore } from '@/stores/sourceStore'
import FriendItem from './FriendItem.vue'

const store = useSourceStore()
</script>

<template>
	<div class="column">
		<h3 class="column-title">Друзья</h3>
		<ul>
			<FriendItem
				v-for="friend in store.friendsList"
				:key="friend.id"
				:friend="friend"
			/>
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
</style>

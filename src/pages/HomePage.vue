<template>
	<div class="container">
		<div class="search-bar">
			<SearchInput @select-user="addUserToSource" />
		</div>
		<div class="columns">
			<SourceList />
			<FriendsList />
		</div>
	</div>
</template>

<script setup>
import FriendsList from '@/components/FriendsList.vue'
import SearchInput from '@/components/SearchInput.vue'
import SourceList from '@/components/SourceList.vue'

import { useSourceStore } from '@/stores/sourceStore'

const store = useSourceStore()

const addUserToSource = (user) => {
	store.addUser(user)
}
</script>

<style scoped>
.container {
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	background: #e0e0e0;
	border-radius: 10px;
	max-width: 1000px;
	margin: auto;
}

.search-bar {
	display: flex;
}

.columns {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	align-items: flex-start;
}

.columns > * {
	flex: 1;
}
</style>

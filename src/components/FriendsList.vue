<script setup lang="ts">
import { useSourceStore } from '@/stores/sourceStore'

const store = useSourceStore()
</script>

<template>
	<div class="column">
		<h3 class="column-title">Друзья</h3>
		<ul>
			<li
				v-for="friend in store.friendsList"
				:key="friend.id"
				class="friend-item"
				:style="{
					backgroundColor: `rgba(0, 200, 255, ${Math.min(
						(friend.frequency || 0) * 0.2,
						1
					)})`,
				}"
			>
				<router-link :to="`/friend/${friend.id}`" class="friend-link">
					<img :src="friend.photo_100" alt="Фото друга" />
					<div>
						<div>
							<strong>{{ friend.last_name }} {{ friend.first_name }}</strong>
						</div>
						<div>Друзей: {{ friend.frequency || 'N/A' }}</div>
					</div>
				</router-link>
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

.friend-item {
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 10px;
	background: white;
	border-radius: 5px;
	margin-bottom: 10px;
	transition: background-color 0.3s;
}

.friend-link {
	text-decoration: none;
	color: inherit;
	display: flex;
	align-items: center;
}

.friend-item img {
	width: 50px;
	height: 50px;
	border-radius: 50%;
}
</style>

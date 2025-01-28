<script setup lang="ts">
import { getUserById } from '@/api/services/vkApi'
import type { VkUser } from '@/types/vk'
import { useIntersectionObserver } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const target = ref(null)
const targetIsVisible = ref(false)
const loading = ref(false)

const { stop } = useIntersectionObserver(target, ([entry]) => {
	targetIsVisible.value = entry?.isIntersecting || false
})

const props = defineProps<{ friend: VkUser }>()

const router = useRouter()

const backgroundColor = computed(
	() => `rgba(0, 200, 255, ${Math.min((props.friend.frequency || 0) * 0.2, 1)})`
)

const fetchFriendCount = async () => {
	if (loading.value || props.friend.friends_count !== undefined) return
	loading.value = true
	try {
		const userData = await getUserById(props.friend.id)
		props.friend.friends_count = userData?.counters?.friends ?? 0
	} catch (error) {
		console.error(
			`Ошибка загрузки данных для пользователя ${props.friend.id}:`,
			error
		)
	} finally {
		loading.value = false
	}
}

// Следим за видимостью
watch(targetIsVisible, (isVisible) => {
	if (isVisible) fetchFriendCount()
})

const goToFriendPage = () => {
	router.push(`/friend/${props.friend.id}`)
}
</script>

<template>
	<li
		ref="target"
		class="friend-item"
		:data-friend-id="friend.id"
		:style="{ backgroundColor }"
		@click="goToFriendPage"
	>
		<img :src="friend.photo_100" alt="Фото друга" />
		<div>
			<div>
				<strong>{{ friend.last_name }} {{ friend.first_name }}</strong>
			</div>
			<div v-if="friend.age">Возраст: {{ friend.age }} лет</div>
			<div>
				Друзей:
				{{
					friend.friends_count !== undefined
						? friend.friends_count
						: 'Загрузка...'
				}}
			</div>
			<div>Пол: {{ friend.sex === 1 ? 'Женский' : 'Мужской' }}</div>
			<p>Частота встречаемости: {{ friend.frequency }}</p>
		</div>
	</li>
</template>

<style scoped>
.friend-item {
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 10px;
	background: white;
	border-radius: 5px;
	margin-bottom: 10px;
	cursor: pointer;
	transition: background-color 0.3s;
}

.friend-item img {
	width: 50px;
	height: 50px;
	border-radius: 50%;
}
</style>

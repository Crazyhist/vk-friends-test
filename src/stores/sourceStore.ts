import { getFriends } from '@/api/services/vkApi'
import type { VkUser } from '@/types/vk'
import { calculateFriendFrequency } from '@/utils/friendsUtils'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSourceStore = defineStore('sourceStore', () => {
	const sourceList = ref<VkUser[]>([])
	const friendsList = ref<VkUser[]>([])

	const addUser = (user: VkUser) => {
		if (!sourceList.value.find((u) => u.id === user.id)) {
			sourceList.value.push(user)
		}
	}

	const removeUser = (userId: number) => {
		sourceList.value = sourceList.value.filter((user) => user.id !== userId)
	}
	const setFriendsList = (friends: VkUser[]) => {
		friendsList.value = friends
	}

	const clearLists = () => {
		sourceList.value = []
		friendsList.value = []
	}

	const sortFriendsList = () => {
		friendsList.value.sort((a, b) => {
			const nameA = (a.last_name + a.first_name).toLowerCase()
			const nameB = (b.last_name + b.first_name).toLowerCase()
			return nameA.localeCompare(nameB)
		})
	}

	const buildFriendsList = async () => {
		const allFriends: VkUser[] = []

		for (const user of sourceList.value) {
			try {
				const userFriends = await getFriends(user.id)
				allFriends.push(...userFriends)
			} catch (error) {
				console.error(
					`Ошибка загрузки друзей для пользователя ${user.id}:`,
					error
				)
			}
		}

		const frequencyMap = calculateFriendFrequency(allFriends)

		const uniqueFriends = Array.from(
			new Map(allFriends.map((friend) => [friend.id, friend])).values()
		)

		uniqueFriends.forEach((friend) => {
			friend['frequency'] = frequencyMap.get(friend.id) || 1
		})

		setFriendsList(uniqueFriends)

		sortFriendsList()
	}

	return {
		sourceList,
		friendsList,
		addUser,
		removeUser,
		setFriendsList,
		clearLists,
		buildFriendsList,
	}
})

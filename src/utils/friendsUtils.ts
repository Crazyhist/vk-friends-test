import type { VkUser } from '@/types/vk'

export const calculateFriendFrequency = (
	friends: VkUser[]
): Map<number, number> => {
	const frequencyMap = new Map<number, number>()

	friends.forEach((friend) => {
		const count = frequencyMap.get(friend.id) || 0
		frequencyMap.set(friend.id, count + 1)
	})
	console.log('Список друзей для подсчёта частоты:', friends)
	console.log('Частота друзей:', frequencyMap)

	return frequencyMap
}

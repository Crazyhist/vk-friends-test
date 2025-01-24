import type { VkUser } from '@/types/vk'

export const calculateFriendFrequency = (
	friends: VkUser[]
): Map<number, number> => {
	return friends.reduce((map, friend) => {
		map.set(friend.id, (map.get(friend.id) || 0) + 1)
		return map
	}, new Map<number, number>())
}

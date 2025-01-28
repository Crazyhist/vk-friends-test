import { getFriends, getUserById } from '@/api/services/vkApi'

export async function test() {
	const friends = await getFriends(88887720)
	console.log('Список друзей:', friends)

	const user = await getUserById(160784506)
	console.log('Количество друзей у пользователя:', user)
}

test()

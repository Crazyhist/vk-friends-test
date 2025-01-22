import axiosInstance from '@/api/axiosInstance'

export interface VkResponse<T> {
	response: {
		count: number
		items: T
	}
	error?: {
		error_code: number
		error_msg: string
	}
}

export interface VkUser {
	id: number
	first_name: string
	last_name: string
	photo_100: string
	sex: 1 | 2
	bdate?: string
}

export interface VkWallPost {
	id: number
	owner_id: number
	from_id: number
	date: number
	text: string
	likes?: {
		count: number
	}
}

const API_VERSION = '5.199'

export async function searchUsers(query: string): Promise<VkUser[]> {
	try {
		const response = await axiosInstance.get<VkResponse<VkUser[]>>(
			'/users.search',
			{
				params: {
					q: query,
					count: 10,
					fields: 'photo_100,sex',
					v: API_VERSION,
				},
			}
		)

		if (response.data.error) {
			throw new Error(response.data.error.error_msg || 'Ошибка VK API')
		}

		return response.data.response.items
	} catch (error) {
		console.error('Ошибка при поиске пользователей:', error)
		throw error
	}
}

/**
 * Получение информации о пользователях по ID или имени пользователя
 */
export async function getUserById(userId: number | string): Promise<VkUser> {
	try {
		const response = await axiosInstance.get<VkResponse<VkUser[]>>(
			'/users.get',
			{
				params: {
					user_ids: userId,
					fields: 'photo_100,sex,bdate',
					v: API_VERSION,
				},
			}
		)

		console.log('VK API Response:', response.data) // Лог полного ответа

		if (response.data.error) {
			throw new Error(response.data.error.error_msg || 'Ошибка VK API')
		}

		if (
			!response.data.response ||
			!response.data.response.items ||
			response.data.response.items.length === 0
		) {
			throw new Error(
				'Некорректный формат ответа от VK API или пользователь не найден'
			)
		}

		return response.data.response.items[0]
	} catch (error) {
		console.error('Ошибка при получении информации о пользователе:', error)
		throw error
	}
}

/**
 * Получение списка друзей пользователя
 */
export async function getFriends(userId: number | string): Promise<VkUser[]> {
	try {
		const response = await axiosInstance.get<VkResponse<VkUser[]>>(
			'/friends.get',
			{
				params: {
					user_id: userId,
					fields: 'photo_100,sex,bdate',
					v: API_VERSION,
				},
			}
		)

		if (response.data.error) {
			throw new Error(response.data.error.error_msg || 'Ошибка VK API')
		}

		return response.data.response.items
	} catch (error) {
		console.error('Ошибка при получении списка друзей:', error)
		throw error
	}
}

/**
 * Получение записей на стене пользователя
 */
export async function getUserWall(
	userId: number | string
): Promise<VkWallPost[]> {
	try {
		const response = await axiosInstance.get<VkResponse<VkWallPost[]>>(
			'/wall.get',
			{
				params: {
					owner_id: userId,
					count: 10,
					v: API_VERSION,
				},
			}
		)

		if (response.data.error) {
			throw new Error(response.data.error.error_msg || 'Ошибка VK API')
		}

		return response.data.response.items
	} catch (error) {
		console.error('Ошибка при получении записей со стены:', error)
		throw error
	}
}

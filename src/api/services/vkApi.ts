import axiosInstance from '@/api/axiosInstance'
import { calculateAge } from '@/utils/calculateAge'

export interface VkResponse<T> {
	response: {
		count?: number
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
	counters?: {
		friends?: number
		[key: string]: number | undefined
	}
}

export interface VkAttachment {
	type: string
	photo?: {
		id: number
		album_id: number
		owner_id: number
		sizes: { url: string; type: string }[]
		text: string
		date: number
	}
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
	attachments?: VkAttachment[]
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

export async function getUserById(userId: number | string): Promise<VkUser> {
	try {
		const response = await axiosInstance.get<VkResponse<VkUser[]>>(
			'/users.get',
			{
				params: {
					user_ids: userId,
					fields: 'counters',
					v: API_VERSION,
				},
			}
		)

		console.log('Ответ VK API:', response.data)

		if (response.data.error) {
			throw new Error(response.data.error.error_msg || 'Ошибка VK API')
		}

		const users = response.data.response
		if (!Array.isArray(users) || users.length === 0) {
			throw new Error('Пользователь не найден')
		}
		return users[0]
	} catch (error) {
		console.error('Ошибка при получении информации о пользователе:', error)
		throw error
	}
}

export async function getFriends(userId: number | string): Promise<VkUser[]> {
	try {
		const response = await axiosInstance.get<VkResponse<VkUser[]>>(
			'/friends.get',
			{
				params: {
					user_id: userId,
					count: 5000,
					fields: 'photo_100,sex,bdate',
					v: API_VERSION,
				},
			}
		)

		if (response.data.error) {
			throw new Error(response.data.error.error_msg || 'Ошибка VK API')
		}
		console.log('Ответ VK API друзья:', response.data)
		return response.data.response.items.map((user) => ({
			...user,
			age: calculateAge(user.bdate),
		}))
	} catch (error) {
		console.error('Ошибка при получении списка друзей:', error)
		throw error
	}
}

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
					fields: 'attachments',
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

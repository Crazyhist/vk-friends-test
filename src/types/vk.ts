export type VkUserId = number

export interface VkUser {
	id: VkUserId
	first_name: string
	last_name: string
	photo_100: string
	sex: 1 | 2
	bdate?: string
	friends_count?: number
	age?: number
	frequency?: number
}

export interface VkResponse<T> {
	response: T
	error?: {
		error_code: number
		error_msg: string
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
}
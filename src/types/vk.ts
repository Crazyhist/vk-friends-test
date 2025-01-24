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

export interface VkAttachment {
	type: string
	photo?: {
		id: number
		album_id: number
		owner_id: number
		sizes: { url: string; type: string }[]
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

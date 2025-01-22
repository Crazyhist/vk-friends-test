import axios from 'axios'

const BASE_URL = '/api/method'

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Accept: 'application/json',
		Authorization:
			'Bearer vk1.a.uUYFn0vm67T1QSm6uRYr8fWRd-QmuCFcVG-v2x1IZWoUqiYt42V6Pb4vbBnzT2kFUnMsnoPadgg4L3g7MfmowbvkM1K9keSzwF9hqDRYcfx9u3sEjSrbDOz_3sLZQJpXB2yhqmGnurRQbUhmweY6zWOh7nogV1f0nYFoA8kr1SHrxGVX2F2pfw2KwxHIYeIkC51MyZD-HUkCuw8QoXynwQ',
	},
})

export default axiosInstance

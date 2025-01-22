export const calculateAge = (bdate?: string): number | null => {
	if (!bdate) return null
	const [day, month, year] = bdate.split('.').map(Number)
	if (!year) return null // Если год рождения отсутствует
	const today = new Date()
	const birthDate = new Date(year, month - 1, day)
	let age = today.getFullYear() - birthDate.getFullYear()
	if (
		today.getMonth() < birthDate.getMonth() ||
		(today.getMonth() === birthDate.getMonth() &&
			today.getDate() < birthDate.getDate())
	) {
		age--
	}
	return age
}

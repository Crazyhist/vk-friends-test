<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
	<main>
		<RouterView />
	</main>
</template>

<style scoped>
header {
	line-height: 1.5;
	max-height: 100vh;
	background-color: #f8f9fa;
	padding: 1rem;
}

.wrapper {
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	justify-content: center;
}

nav {
	width: 100%;
	text-align: center;
}

.nav-link {
	text-decoration: none;
	padding: 0.5rem 1rem;
	color: #007bff;
	border-radius: 4px;
	transition: background-color 0.3s ease;
}

.nav-link:hover {
	background-color: #e9ecef;
}

.active {
	font-weight: bold;
	color: #0056b3;
	text-decoration: underline;
}

main {
	padding: 1rem;
}
</style>

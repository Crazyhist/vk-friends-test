<script setup lang="ts">
import { useSourceStore } from '@/stores/sourceStore'

const store = useSourceStore()
</script>

<template>
	<button @click="store.buildFriendsList">Построить список "Друзья"</button>
</template>

<template>
	<div class="text-center q-mb-lg">
		<span class="text-h4">{{ title }}</span>
	</div>
</template>

<script setup>
	const props = defineProps({
		title: {
			type: String,
			required: true,
		}
	})
</script>

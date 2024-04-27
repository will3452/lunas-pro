<script setup>
const props = defineProps({
  link: {
    type: String,
    required: true,
  },
	title: {
    type: String,
    required: true,
  },
});
</script>
<template>
	 <ULink :to="props.link" >
		<UCard class="p-4">
			<p class="text-center">{{ props.title }}</p>
		</UCard>
  </ULink>
</template>
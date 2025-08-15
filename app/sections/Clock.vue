<script setup lang="ts">
const { timezone } = defineProps<{
  time: Date
  icon: string
  timezone: string
}>()

defineEmits<{
  remove: [timezone: string]
}>()
</script>

<template>
  <div class="flex flex-col items-center bg-gray-100 dark:bg-gray-800 px-9 py-2 rounded-lg gap-2 relative">
    <Icon
      class="absolute top-2 right-2 cursor-pointer hover:opacity-75"
      name="material-symbols:close-rounded"
      :size="20"
      @click="$emit('remove', timezone)"
    />
    <h4 class="font-bold">
      {{ timezone }}
    </h4>
    <h1 class="flex">
      <DatePicker :timezone="timezone" />
      <Time :timezone="timezone" />
    </h1>
  </div>
</template>

<script setup lang="ts">
import { formatDateTime } from '@/libs/utils'

const { timezone } = defineProps<{
  timezone: string
}>()

const { time, nativeTime } = useTime()

const formatted = computed(() => formatDateTime(nativeTime.value, timezone))
</script>

<template>
  <Popover>
    <Button
      color="neutral"
      variant="soft"
      class="justify-center text-xl font-bold"
    >
      {{ formatted.date }}
    </Button>

    <template #content>
      <Calendar
        v-model="time"
        class="p-2"
      />
    </template>
  </Popover>
</template>

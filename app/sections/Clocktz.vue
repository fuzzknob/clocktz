<script setup lang="ts">
import Clock from './Clock.vue'
import { useTime } from '~/composables/useTime'

const { nativeTime } = useTime()

const timezoneInput = ref('')

const timezones = useLocalStorage('timezones', [
  { timezone: 'Asia/Kathmandu', icon: 'circle-flags:np' },
  { timezone: 'GMT', icon: 'si:globe-detailed-duotone' },
  { timezone: 'Europe/London', icon: 'circle-flags:gb' },
  { timezone: 'Asia/Kolkata', icon: 'circle-flags:in' },
  { timezone: 'Asia/Bangkok', icon: 'circle-flags:th' },
  { timezone: 'Australia/Sydney', icon: 'circle-flags:au' },
])

function handleAddTimezone() {
  if (!timezoneInput.value) return

  const exists = timezones.value.find(timezone => timezone.timezone === timezoneInput.value)

  if (exists) return

  timezones.value.push({
    timezone: timezoneInput.value,
    icon: 'si:globe-detailed-duotone',
  })

  timezoneInput.value = ''
}

function handleRemove(target: string) {
  timezones.value = timezones.value.filter(timezone => timezone.timezone !== target)
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <form
      class="flex justify-between gap-2"
      @submit.prevent="handleAddTimezone"
    >
      <Input
        v-model="timezoneInput"
        class="flex-1"
        color="neutral"
        placeholder="Enter timezone"
      />
      <Button type="submit">
        Add
      </Button>
    </form>

    <Clock
      v-for="{ timezone, icon } in timezones"
      :key="timezone"
      :time="nativeTime"
      :icon="icon"
      :timezone="timezone"
      @remove="handleRemove"
    />
  </div>
</template>

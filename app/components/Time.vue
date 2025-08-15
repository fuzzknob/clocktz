<script setup lang="ts">
import { formatDateTime, parseNumber, getTzDate } from '@/libs/utils'

const { timezone } = defineProps<{
  timezone: string
}>()

const { nativeTime } = useTime()

const hours = ref('00')
const minutes = ref('00')

watch(nativeTime, () => {
  const { time } = formatDateTime(nativeTime.value, timezone)
  hours.value = time.hours
  minutes.value = time.minutes
}, {
  immediate: true,
})

const updateHour = (newHour: string) => {
  const hours = Math.min(Math.max(parseNumber(newHour), 0), 23)
  const tzDate = getTzDate(nativeTime.value, timezone)
  tzDate.setHours(hours)
  nativeTime.value = new Date(tzDate.toISOString())
}

const updateMinute = (newMinute: string) => {
  const minutes = Math.min(Math.max(parseNumber(newMinute), 0), 59)
  const tzDate = getTzDate(nativeTime.value, timezone)
  tzDate.setMinutes(minutes)
  nativeTime.value = new Date(tzDate.toISOString())
}
</script>

<template>
  <div class="flex items-center text-xl font-bold">
    <Input
      v-model="hours"
      type="number"
      color="neutral"
      variant="soft"
      min="0"
      max="23"
      maxlength="2"
      :ui="{
        base: 'text-center font-bold p-0 text-xl w-[30px]',
      }"
      @blur="updateHour(hours)"
    />
    :
    <Input
      v-model="minutes"
      type="number"
      color="neutral"
      variant="soft"
      min="0"
      max="59"
      maxlength="2"
      :ui="{
        base: 'text-center font-bold p-0 text-xl w-[30px]',
      }"
      @blur="updateMinute(minutes)"
    />
  </div>
</template>

<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield; /* For Firefox */
}
</style>

import { now, getLocalTimeZone, fromDate } from '@internationalized/date'

const localTz = getLocalTimeZone()

export const useTime = () => {
  const time = useState('time', () => now(localTz))

  const nativeTime = computed({
    get: () => time.value.toDate(),
    set: (newDate) => {
      time.value = fromDate(newDate, localTz)
    },
  })

  return {
    time,
    nativeTime,
  }
}

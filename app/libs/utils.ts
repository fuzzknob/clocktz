import { TZDateMini } from '@date-fns/tz'
import { format, getHours, getMinutes } from 'date-fns'
import { padStart } from 'lodash'

export function formatDateTime(date: Date, timezone: string) {
  const tzDate = new TZDateMini(date, timezone)

  return { date: format(tzDate, 'EEE, dd MMM yyyy'), time: {
    hours: padStart(getHours(tzDate).toString(), 2, '0'),
    minutes: padStart(getMinutes(tzDate).toString(), 2, '0'),
  } }
}

export function getTzDate(date: Date, timezone: string) {
  return new TZDateMini(date, timezone)
}

export function parseNumber(int: string) {
  const parsed = parseInt(int)

  if (Number.isNaN(parsed)) return 0

  return parsed
}

export const days = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 99,
}

export const dayPeriods = {
  ALL: {
    value: 'ALL',
    label: 'Tümü',
    startTime: '00:00',
    endTime: '23:59',
  },
  MORNING: {
    value: 'MORNING',
    label: 'Sabah',
    startTime: '06:00',
    endTime: '11:59',
  },
  NOON: {
    value: 'NOON',
    label: 'Öğle',
    startTime: '12:00',
    endTime: '17:59',
  },
  EVENING: {
    value: 'EVENING',
    label: 'Akşam',
    startTime: '18:00',
    endTime: '23:59',
  },
  NIGHT: {
    value: 'NIGHT',
    label: 'Gece',
    startTime: '00:00',
    endTime: '05:59',
  },
}

export default '';

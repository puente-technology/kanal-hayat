/* eslint-disable func-names */
// eslint-disable-next-line no-extend-native
Date.prototype.toEventDateFormat = function () {
  const monthNames = ['Ocak', 'Şub', 'Mar',
    'Nis', 'May', 'Haz',
    'Tem', 'Ağu', 'Eyl',
    'Ekim', 'Kas', 'Ara'];
  const day = this.getDate();
  const monthIndex = this.getMonth();

  return `${day} ${monthNames[monthIndex]}`;
}

// eslint-disable-next-line no-extend-native
Date.prototype.toEventDayFormat = function () {
  const dayNames = ['PAZ', 'PZT', 'SAL', 'ÇARŞ',
    'PERŞ', 'CUM', 'CMTS'];

  const dayIndex = this.getDay();

  return dayNames[dayIndex];
}

export const days = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 99,
}

export const eventWeek = () => {
  const result = [];
  const today = new Date();
  const startDay = new Date();
  const nthDayOfWeek = today.getDay();
  const isMonday = nthDayOfWeek === 1;
  if (!isMonday) {
    startDay.setDate(today.getDate() - (nthDayOfWeek - 1))
  }
  for (let index = 0; index < 7; index += 1) {
    const tempDate = new Date();
    tempDate.setDate(startDay.getDate() + index)
    let tempNth = tempDate.getDay().toString()
    if (tempNth === '0') {
      tempNth = '99'
    }
    result.push({
      date: tempDate.toEventDateFormat(),
      day: tempDate.toEventDayFormat(),
      nthDayOfWeek: tempNth,
    })
  }
  return result;
}

export const sortTimeString = (x, y) => {
  if (!x.time || !y.time) {
    return 1;
  }
  if (x.time.startTime > y.time.startTime) {
    return 1
  }
  return -1
}

export const sortDateandTimeString = (x, y) => {
  if (!x.time || y.time) {
    return -1;
  }
  if (x.time.startTime > y.time.startTime) {
    return 1
  }
  return -1
}


export default '';

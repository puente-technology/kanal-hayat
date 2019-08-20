import { dayPeriods } from '../constants/generics';

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
      fullDate: tempDate,
      nthDayOfWeek: tempNth,
    })
  }
  return result;
}

// eslint-disable-next-line no-extend-native
Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
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

export const getDayPeriod = () => {
  const nowInTime = new Date().toLocaleTimeString()
  const foundObject = Object.entries(dayPeriods)
    .find(item => (item[1].startTime < nowInTime && item[1].endTime > nowInTime))
  return foundObject[1].value
}

export default '';

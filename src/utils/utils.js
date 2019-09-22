import { dayPeriods } from '../constants/generics';


/* eslint-disable func-names */
// eslint-disable-next-line no-extend-native
String.prototype.turkishtoEnglish = function () {
  return this.replace('Ğ', 'g')
    .replace('Ü', 'u')
    .replace('Ş', 's')
    .replace('I', 'i')
    .replace('İ', 'i')
    .replace('Ö', 'o')
    .replace('Ç', 'c')
    .replace('ğ', 'g')
    .replace('ü', 'u')
    .replace('ş', 's')
    .replace('ı', 'i')
    .replace('ö', 'o')
    .replace('ç', 'c');
};

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
  const isSunday = nthDayOfWeek === 0;
  if (!isMonday) {
    if (isSunday) {
      startDay.setDate(today.getDate() - 6)
    } else {
      startDay.setDate(today.getDate() - (nthDayOfWeek - 1))
    }
  }
  for (let index = 0; index < 7; index += 1) {
    const tempDate = new Date();
    tempDate.setDate(startDay.getDate() + index)
    const tempNth = tempDate.getDay().toString()
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

export const nFormatter = (num) => {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1).replace(/\.0$/, '')}G`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}B`;
  }
  return num;
}

export default '';

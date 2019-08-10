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
    tempDate.setDate(startDay.getDate() + index - (nthDayOfWeek - 1))
    result.push({
      date: tempDate.toEventDateFormat(),
      day: tempDate.toEventDayFormat(),
      isActive: today === tempDate,
    })
  }
  return result;
}

// eslint-disable-next-line no-extend-native
Date.prototype.toEventDateFormat = () => {
  const monthNames = ['Ocak', 'Şub', 'Mar',
    'Nis', 'May', 'Haz',
    'Tem', 'Ağu', 'Eyl',
    'Ekim', 'Kas', 'Ara'];

  const day = this.getDate();
  const monthIndex = this.getMonth();

  return `${day} ${monthNames[monthIndex]}`;
}

// eslint-disable-next-line no-extend-native
Date.prototype.toEventDayFormat = () => {
  const dayNames = ['PZT', 'SAL', 'ÇARŞ',
    'PERŞ', 'CUM', 'CMTS',
    'PAZ'];

  const dayIndex = this.getDay();

  return dayNames[dayIndex];
}

export default '';

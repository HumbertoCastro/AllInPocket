export const getDayOfYear = (dateArray) => {
  const monthNames = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  
  const monthIndex = monthNames.indexOf(dateArray[0].toLowerCase());
  if (monthIndex === -1) {
    throw new Error('Invalid month name');
  }
  
  const day = dateArray[1];
  
  if (day < 1 || day > 31) {
    throw new Error('Invalid day of the month');
  }
  
  const daysInMonth = [
    31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
  ];
  
  // Check if it's a leap year and update days in February accordingly
  const year = new Date().getFullYear();
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    daysInMonth[1] = 29;
  }
  
  if (day > daysInMonth[monthIndex]) {
    throw new Error('Invalid day for the given month');
  }
  
  let dayOfYear = day;
  for (let i = 0; i < monthIndex; i++) {
    dayOfYear += daysInMonth[i];
  }
  
  return dayOfYear;
}

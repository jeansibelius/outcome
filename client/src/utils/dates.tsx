export const getYearMonthDay = (date = new Date()): string => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  const month =
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${date.getFullYear()}-${month}-${day}`;
};

export const getCountOfDaysInMonth = (year: number, month: number): number =>
  new Date(year, month, 0).getDate();

export const getYearMonth = ({ date = new Date(), addMonth = 0 }): Date => {
  return new Date(date.getFullYear(), date.getMonth() + addMonth);
};

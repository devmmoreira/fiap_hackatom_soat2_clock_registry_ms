export const verifyIfIsBusinessDay = (day: Date): boolean => {
  return day.getDay() == 6 || day.getDay() == 0;
};

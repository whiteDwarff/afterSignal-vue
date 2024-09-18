export const localeToMoney = (value) => {
  value = Math.abs(value);
  if (value != null && value != undefined) return value.toLocaleString('ko-KR');
  else return;
};

export const renderDate = (inputDate: string | Date) => {
  const date = new Date(inputDate);
  return `${date.getDate()}/${date.getMonth() + 1}`;
};

export const renderCurrency = (amount: number): string => {
  if (amount === 0) return '0.00';
  if (!amount) return '';
  return (amount / 100).toFixed(2);
};
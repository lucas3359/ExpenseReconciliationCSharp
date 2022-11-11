export const renderDate = (inputDate: string | Date) => {
  const date = new Date(inputDate);
  return `${date.getDate()}/${date.getMonth() + 1}`;
};

export const renderCurrency = (amount: number): string => {
  return (amount / 100).toFixed(2);
};
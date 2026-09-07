export const CURRENCY_SYMBOL = '₹';

export const formatINR = (amount: number): string => {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
};

export const formatPrice = (amount: number): string => {
  return formatINR(amount);
};

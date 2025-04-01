
/**
 * Format a price number as a currency string
 * @param price - The price to format
 * @param currency - The currency code (default: USD)
 * @returns Formatted price string with currency symbol
 */
export const formatPrice = (price: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

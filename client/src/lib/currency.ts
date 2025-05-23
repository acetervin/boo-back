
const KES_TO_USD = 0.0066; // Example rate
const KES_TO_EUR = 0.0061; // Example rate

export function convertCurrency(amount: number, from: string, to: string): number {
  if (from === "KES" && to === "USD") {
    return amount * KES_TO_USD;
  }
  if (from === "KES" && to === "EUR") {
    return amount * KES_TO_EUR;
  }
  return amount;
}

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

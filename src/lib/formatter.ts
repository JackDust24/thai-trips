const DATE_FORMATTER = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
});

const CURRENCY_FORMATTER = new Intl.NumberFormat('th-TH', {
  currency: 'THB',
  style: 'currency',
  minimumFractionDigits: 0,
});
const NUMBER_FORMATTER = new Intl.NumberFormat('th-TH');

export function formatDate(date: Date) {
  return DATE_FORMATTER.format(date);
}

export function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER.format(amount);
}

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number);
}

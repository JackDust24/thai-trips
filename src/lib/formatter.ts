const DATE_FORMATTER = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
});

export function formatDate(date: Date) {
  return DATE_FORMATTER.format(date);
}

const CURRENCY_FORMATTER = new Intl.NumberFormat('th-TH', {
  currency: 'THB',
  style: 'currency',
  minimumFractionDigits: 0,
});

export function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER.format(amount);
}

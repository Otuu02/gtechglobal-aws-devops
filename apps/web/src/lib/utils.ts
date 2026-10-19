export function formatCurrency(value: number, currency = 'NGN') {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium' }).format(new Date(date));
}

export function initials(first: string, last: string) {
  return `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase();
}

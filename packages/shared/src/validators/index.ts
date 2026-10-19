export const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const isStrongPassword = (v: string) =>
  v.length >= 8 && /[A-Z]/.test(v) && /[0-9]/.test(v);
export const slugify = (v: string) =>
  v.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

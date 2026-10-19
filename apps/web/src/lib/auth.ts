export const auth = {
  get token(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('gg_access_token');
  },
  logout() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('gg_access_token');
    localStorage.removeItem('gg_refresh_token');
  },
};

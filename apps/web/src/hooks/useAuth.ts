'use client';

import { useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';

export function useAuth() {
  const { user, setUser, clear } = useAuthStore();

  useEffect(() => {
    if (user) return;
    api.get('/auth/me').then(({ data }) => setUser(data)).catch(() => clear());
  }, [user, setUser, clear]);

  return { user, logout: clear };
}

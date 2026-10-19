export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  organizationId?: string;
  departmentId?: string;
  mfaEnabled: boolean;
};

export type ApiList<T> = { data: T[]; total: number };

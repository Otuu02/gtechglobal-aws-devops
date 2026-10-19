export type Role = 'ceo' | 'department_head' | 'manager' | 'employee';
export type Status = 'active' | 'inactive' | 'suspended';
export type Priority = 'low' | 'medium' | 'high' | 'critical';

export interface ApiUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  organizationId?: string;
  departmentId?: string;
}

export interface ApiList<T> { data: T[]; total: number; }

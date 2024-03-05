export const EMPLOYEE_ROLES = [
  'reparador',
  'finanzas',
  'admin',
  'user',
] as const;

export type EmployeeModel = {
  _id: string;
  name: string;
  age: number;
  role: string;
  direction: string;
  email: string;
  phone: string;
};

export const DEFAULT_EMPLOYEE: EmployeeModel = {
  _id: '',
  name: '',
  age: 20,
  direction: '',
  email: '',
  phone: '',
  role: '',
};

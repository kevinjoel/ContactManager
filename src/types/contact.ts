export const DEPARTMENTS = ['Ventas', 'Desarrollo', 'Marketing', 'Soporte'] as const;

export type Department = (typeof DEPARTMENTS)[number];

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: Department;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  department: Department;
}

export interface FiltersState {
  search: string;
  department: Department | null;
}

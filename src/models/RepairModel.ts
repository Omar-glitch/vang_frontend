export const REPAIR_STATUS = [
  'no iniciado',
  'en progreso',
  'finalizado',
] as const;
export const REPAIR_TYPES = [
  'batería',
  'centro de carga',
  'pantalla',
  'tapa trasera',
  'micrófono',
  'placa madre',
  'circuitos integrados',
] as const;

export type RepairModel = {
  _id: string;
  price: number;
  description: string;
  status: (typeof REPAIR_STATUS)[number];
  type: (typeof REPAIR_TYPES)[number];
  employee: string;
  client: string;
  inventory: string;
  inventory_amount: number;
};

export const DEFAULT_REPAIR: RepairModel = {
  _id: '',
  description: '',
  client: '',
  employee: '',
  inventory: '',
  inventory_amount: 0,
  price: 0,
  status: 'no iniciado',
  type: 'centro de carga',
};

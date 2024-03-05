export const INVENTORY_TYPES = [
  'batería',
  'centro de carga',
  'pantalla',
  'tapa trasera',
  'micrófono',
  'placa madre',
  'circuitos integrados',
] as const;

export type InventoryModel = {
  _id: string;
  name: string;
  description: string;
  type: (typeof INVENTORY_TYPES)[number];
  cost: number;
  stock: number;
  min: number;
};

export const DEFAULT_INVENTORY: InventoryModel = {
  _id: '',
  description: '',
  min: 0,
  name: '',
  cost: 0,
  stock: 0,
  type: 'centro de carga',
};

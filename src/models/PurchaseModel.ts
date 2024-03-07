export const PURCHASE_TYPES = ['inventario', 'equipo'] as const;

export type PurchaseModel = {
  _id: string;
  type: (typeof PURCHASE_TYPES)[number];
  description: string;
  cost: number;
};

export const DEFAULT_CLIENT: PurchaseModel = {
  _id: '',
  type: 'equipo',
  description: '',
  cost: 0,
};

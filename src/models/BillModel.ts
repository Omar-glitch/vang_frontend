export type BillModel = {
  _id: string;
  amount: number;
  type: string;
  description: string;
  paid: boolean;
  id_repair: string;
};

export const DEFAULT_BILL: BillModel = {
  _id: '',
  amount: 0,
  type: '',
  description: '',
  paid: false,
  id_repair: '',
};

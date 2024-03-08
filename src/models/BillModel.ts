export type BillModel = {
  _id: string;
  amount: number;
  paid: boolean;
  id_repair: string;
};

export const DEFAULT_BILL: BillModel = {
  _id: '',
  amount: 0,
  paid: false,
  id_repair: '',
};

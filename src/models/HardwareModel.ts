export const HARDWARE_PRIORITIES = [
  'poco',
  'medio',
  'mucho',
  'indispensable',
] as const;

export type HardwareModel = {
  _id: string;
  name: string;
  description: string;
  stock: number;
  cost: number;
  priority: (typeof HARDWARE_PRIORITIES)[number];
};

export const DEFAULT_HARDWARE: HardwareModel = {
  _id: '',
  cost: 0,
  description: '',
  name: '',
  priority: 'poco',
  stock: 0,
};

export type ClientModel = {
  _id: string;
  name: string;
  contact: string;
};

export const DEFAULT_CLIENT: ClientModel = {
  _id: '',
  contact: '',
  name: '',
};

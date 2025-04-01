export type OrderType = {
  id?: string;
  product: number;
  quantity: number;
  price: number;
  address: string;
  email: string;
  phone: string;
  name: string;
  comment: string;
  delivery: string;
  status: string;
};

export type OrderCreateType = {
  product: number;
  quantity: number;
  price: number;
  address: string;
  email: string;
  phone: string;
  name: string;
  comment: string;
  delivery: string;
};

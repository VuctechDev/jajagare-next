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

export type UserType = {
  id: string;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
};

export type UserBOType = {
  id: string;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
  orderCount: number;
  quantitySum: number;
  lastOrder: string;
};

export type ClientOrderType = {
  id: string;
  product: number;
  quantity: number;
  price: number;
  address: string;
  comment: string;
  delivery: string;
  status: string;
  createdAt: string;
  user: UserType;
};

export type OrderCreateType = {
  userId?: string;
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

export type YieldType = {
  id: number;
  chickens: number;
  quantity: number;
  comment: string;
  date: string;
};

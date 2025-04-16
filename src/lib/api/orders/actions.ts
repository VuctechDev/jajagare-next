import { ClientOrderType, OrderType, YieldType } from "@/@types";
import { apiClient } from "..";

const path = "/orders";

const get = async (
  query: string
): Promise<{
  data: ClientOrderType[];
  total: number;
}> => {
  const response = await apiClient.get(`${path}${query}`);
  return response.data;
};

const create = async (
  data: Partial<YieldType>
): Promise<{
  data: YieldType;
}> => {
  const response = await apiClient.post(`${path}`, data);
  return response.data;
};

const createBO = async (
  data: Partial<OrderType>
): Promise<{
  data: OrderType;
}> => {
  const response = await apiClient.post(`/backoffice/${path}`, data);
  return response.data;
};

const updateStatus = async (
  id: string
): Promise<{
  data: OrderType;
}> => {
  const response = await apiClient.patch(`${path}/${id}`);
  return response.data;
};

const deleteItem = async (
  id: string
): Promise<{
  data: { success: boolean };
}> => {
  const response = await apiClient.delete(`${path}/${id}`);
  return response.data;
};

const actions = { get, create, createBO, updateStatus, deleteItem };

export default actions;

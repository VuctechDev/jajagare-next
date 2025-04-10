import { YieldType } from "@/@types";
import { apiClient } from "..";

const path = "/yield";

const get = async (
  query: string
): Promise<{
  data: YieldType[];
  total: number;
  topDay: YieldType | null;
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

const actions = { get, create };

export default actions;

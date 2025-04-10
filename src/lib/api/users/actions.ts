import { UserType, UserBOType } from "@/@types";
import { apiClient } from "..";

const path = "/users";

const get = async (): Promise<{
  data: UserBOType[];
  total: number;
}> => {
  const response = await apiClient.get(`${path}`);
  return response.data;
};

const create = async (
  data: Partial<UserType>
): Promise<{
  data: UserBOType;
}> => {
  const response = await apiClient.post(`${path}`, data);
  return response.data;
};

const actions = { get, create };

export default actions;

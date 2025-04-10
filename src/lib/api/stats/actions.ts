import { StatsType } from "@/@types";
import { apiClient } from "..";

const path = "/stats";

const get = async (): Promise<StatsType> => {
  const response = await apiClient.get(`${path}`);
  return response.data;
};

const actions = { get };

export default actions;

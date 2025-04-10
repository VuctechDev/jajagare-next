import { useQuery } from "@tanstack/react-query";
import actions from "./actions";

export const useGetStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: () => actions.get(),
    initialData: { balance: 0, sold: 0, reserved: 0 },
  });
};

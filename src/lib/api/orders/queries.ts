import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import actions from "./actions";

export const useGetOrders = (query: string) => {
  return useQuery({
    queryKey: ["orders", query],
    queryFn: () => actions.get(query),
    initialData: { data: [], total: 0 },
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  //   const { openSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: actions.create,
    onSuccess: () => {
      //   openSnackbar("commentCreatedSuccess");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      console.error(error);
      //   openSnackbar(error.message, "error");
    },
  });
};

export const useCreateOrderBO = () => {
  const queryClient = useQueryClient();
  //   const { openSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: actions.createBO,
    onSuccess: () => {
      //   openSnackbar("commentCreatedSuccess");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      console.error(error);
      //   openSnackbar(error.message, "error");
    },
  });
};

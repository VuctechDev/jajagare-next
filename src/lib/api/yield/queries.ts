import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import actions from "./actions";
import { storage } from "@/lib/storage";

export const useGetYield = (query: string) => {
  return useQuery({
    queryKey: ["yield", query],
    queryFn: () => actions.get(query),
    initialData: { data: [], total: 0, topDay: null },
  });
};

export const useCreateYield = () => {
  const queryClient = useQueryClient();
  //   const { openSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: actions.create,
    onSuccess: (data) => {
      //   openSnackbar("commentCreatedSuccess");
      storage.set("YieldFormData", { ...data, date: "" });
      queryClient.invalidateQueries({ queryKey: ["yield"] });
    },
    onError: (error) => {
      console.error(error);
      //   openSnackbar(error.message, "error");
    },
  });
};

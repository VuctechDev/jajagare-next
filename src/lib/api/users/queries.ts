import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import actions from "./actions";

export const useGetUsers = (query: string) => {
  return useQuery({
    queryKey: ["users", query],
    queryFn: () => actions.get(query),
    initialData: { data: [], total: 0 },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  //   const { openSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: actions.create,
    onSuccess: () => {
      //   openSnackbar("commentCreatedSuccess");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error(error);
      //   openSnackbar(error.message, "error");
    },
  });
};

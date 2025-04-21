import { initialQueryState, QueryState } from "@/hooks/useApiQuery";

type QueryStateWithOptionalStatus = Omit<QueryState, "status" | "all"> & {
  status?: string;
  all?: boolean;
};

export const queryHandler = (
  query: Partial<{ [key: string]: string | string[] }>
): QueryStateWithOptionalStatus => {
  const handler = { ...initialQueryState } as QueryStateWithOptionalStatus;

  // Coerce and assign values with fallbacks
  handler.sort = typeof query.sort === "string" ? query.sort : "createdAt";
  handler.take =
    typeof query.take === "string" && !isNaN(+query.take) ? query.take : "50";

  handler.status = typeof query.status === "string" ? query.status : undefined;
  handler.date = typeof query.date === "string" ? query.date : "";
  handler.all = !!query.all;
  return handler;
};

import { useCallback, useState } from "react";

export type QueryState = {
  date: string;
  status: string;
  sort: string;
  take: string;
  skip: string;
};

export const initialQueryState = {
  date: "",
  status: "",
  sort: "",
  take: "",
  skip: "",
};

const useApiQuery = (initialValue?: Partial<QueryState>) => {
  const initialHandler = initialValue ? initialValue : {};
  const [state, setState] = useState<QueryState>({
    ...initialQueryState,
    ...initialHandler,
  });

  const handleQuery = useCallback(
    (data: Partial<QueryState>) => {
      setState((prev) => ({ ...prev, ...data }));
    },
    [setState]
  );

  const query = Object.entries(state)
    .filter(([, value]) => value !== "")
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  const queryString = query ? `?${query}` : "";

  return { state, queryString, handleQuery };
};

export default useApiQuery;

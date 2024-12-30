import { useCacheAPIResponse } from "@/shared/hooks/useCacheAPIResponse";
import { customBaseQueryWithTransformation } from "@/shared/utils/apis";
import { FetchArgs } from "@reduxjs/toolkit/query";
import { useMutation } from "@tanstack/react-query";

type Request = {
  userId?: string;
};

type Response = {
  message: string;
  data: ITransaction[];
};

type Error = {
  message: string;
};

export const useAPIGetListOfTransactions = () => {
  const result = useMutation<Response, Error, Request>({
    mutationFn: async (params) => {
      const fetchArgs: FetchArgs = {
        url: `/transaction/list?userId=${params.userId}`,
        method: "POST",
        body: params,
      };

      return await customBaseQueryWithTransformation(fetchArgs);
    },
  });
  return useCacheAPIResponse(result);
};

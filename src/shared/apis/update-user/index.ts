import { useCacheAPIResponse } from "@/shared/hooks/useCacheAPIResponse";
import { customBaseQueryWithTransformation } from "@/shared/utils/apis";
import { FetchArgs } from "@reduxjs/toolkit/query";
import { useMutation } from "@tanstack/react-query";

type Request = {
  userId: string;
  settings?: IUserSettings;
};

type Response = {
  message: string;
};

type Error = {
  message: string;
};

export const useAPIUpdateUser = () => {
  const result = useMutation<Response, Error, Request>({
    mutationFn: async (params) => {
      const fetchArgs: FetchArgs = {
        url: `/users/clerk/${params.userId}`,
        method: "POST",
        body: params,
      };

      return await customBaseQueryWithTransformation(fetchArgs);
    },
  });
  return useCacheAPIResponse(result);
};

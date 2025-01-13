import { useCacheAPIResponse } from "@/shared/hooks/useCacheAPIResponse";
import { customBaseQueryWithTransformation } from "@/shared/utils/apis";
import { FetchArgs } from "@reduxjs/toolkit/query";
import { useMutation } from "@tanstack/react-query";

type Request = {
  userId: string;
  courseId: string;
  transactionId: string;
  amount: number;
  paymentProvider: string;
};

type Response = {
  message: string;
  data: {
    transaction: ITransaction;
    courseProgress: IUserCourseProgress;
  };
};

type Error = {
  message: string;
};

export const useAPICreateTransaction = () => {
  const result = useMutation<Response, Error, Request>({
    mutationFn: async (params) => {
      const fetchArgs: FetchArgs = {
        url: `/transaction`,
        method: "POST",
        body: params,
      };

      return await customBaseQueryWithTransformation(fetchArgs);
    },
  });
  return useCacheAPIResponse(result);
};

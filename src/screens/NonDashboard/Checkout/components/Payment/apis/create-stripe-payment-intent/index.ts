import { useCacheAPIResponse } from "@/shared/hooks/useCacheAPIResponse";
import { customBaseQueryWithTransformation } from "@/shared/utils/apis";
import { FetchArgs } from "@reduxjs/toolkit/query";
import { useMutation } from "@tanstack/react-query";

type Request = {
  amount: number;
};

type Response = {
  message: string;
  data: {
    clientSecret: string;
  };
};

type Error = {
  message: string;
};

export const useAPICreateStripePaymentIntent = () => {
  const result = useMutation<Response, Error, Request>({
    mutationFn: async (params) => {
      const fetchArgs: FetchArgs = {
        url: `/transaction/stripe/payment-intent`,
        method: "POST",
        body: params,
      };

      return await customBaseQueryWithTransformation(fetchArgs);
    },
  });
  return useCacheAPIResponse(result);
};

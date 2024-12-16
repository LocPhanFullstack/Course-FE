import { useCacheAPIResponse } from "@/shared/hooks/useCacheAPIResponse";
import { axiosFnTransformer } from "@/shared/utils/apis";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

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
      return axiosFnTransformer(
        axios.post(`http://localhost:8001/users/clerk/${params.userId}`, params)
      );
    },
  });
  return useCacheAPIResponse(result);
};

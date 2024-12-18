import { useCacheAPIResponse } from "@/shared/hooks/useCacheAPIResponse";
import { axiosFnTransformer } from "@/shared/utils/apis";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type Request = {
  courseId: string;
};

type Response = {
  message: string;
  data: ICourse;
};

type Error = {
  message: string;
};

export const useAPIGetCourse = () => {
  const result = useMutation<Response, Error, Request>({
    mutationFn: async (params) => {
      return axiosFnTransformer(
        axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${params.courseId}`,
          params
        )
      );
    },
  });
  return useCacheAPIResponse(result);
};

import { useCacheAPIResponse } from "@/shared/hooks/useCacheAPIResponse";
import { customBaseQueryWithTransformation } from "@/shared/utils/apis";
import { FetchArgs } from "@reduxjs/toolkit/query";
import { useMutation } from "@tanstack/react-query";

type Request = {
  courseId: string;
  userId: string;
  updateData: ICourse;
};

type Response = {
  message: string;
  data: ICourse;
};

type Error = {
  message: string;
};

export const useAPIUpdateCourse = () => {
  const result = useMutation<Response, Error, Request>({
    mutationFn: async (params) => {
      const fetchArgs: FetchArgs = {
        url: `/courses/${params.courseId}`,
        method: "PUT",
        body: params,
      };

      return await customBaseQueryWithTransformation(fetchArgs);
    },
  });
  return useCacheAPIResponse(result);
};

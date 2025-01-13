import { useCacheAPIResponse } from "@/shared/hooks/useCacheAPIResponse";
import { customBaseQueryWithTransformation } from "@/shared/utils/apis";
import { FetchArgs } from "@reduxjs/toolkit/query";
import { useMutation } from "@tanstack/react-query";

type Request = {
  teacherId: string;
  teacherName: string;
};

type Response = {
  message: string;
  data: ICourse;
};

type Error = {
  message: string;
};

export const useAPICreateCourse = () => {
  const result = useMutation<Response, Error, Request>({
    mutationFn: async (params) => {
      const fetchArgs: FetchArgs = {
        url: "/courses",
        method: "POST",
        params: {
          teacherId: params.teacherId,
          teacherName: params.teacherName,
        },
      };

      return await customBaseQueryWithTransformation(fetchArgs);
    },
  });
  return useCacheAPIResponse(result);
};

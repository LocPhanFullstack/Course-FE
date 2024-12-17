import { useCacheAPIResponse } from "@/shared/hooks/useCacheAPIResponse";
import { customBaseQueryWithTransformation } from "@/shared/utils/apis";
import { FetchArgs } from "@reduxjs/toolkit/query";
import { useMutation } from "@tanstack/react-query";
type Request = {
  category?: string;
};

type Response = {
  message: string;
  data: ICourse[];
};

type Error = {
  message: string;
};

export const useAPIGetListOfCourses = () => {
  const result = useMutation<Response, Error, Request>({
    mutationFn: async (params) => {
      const fetchArgs: FetchArgs = {
        url: "/courses", // Đường dẫn API
        method: "POST", // Hoặc GET nếu cần
        body: params, // Tham số bạn truyền vào, ví dụ: { category: "some-category" }
      };

      // Sử dụng hàm customBaseQueryWithTransformation để xử lý kết quả API
      return await customBaseQueryWithTransformation(fetchArgs);
    },
  });
  return useCacheAPIResponse(result);
};

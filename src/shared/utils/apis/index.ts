import { AxiosResponse } from "axios";

export const axiosFnTransformer = (
  axiosCalledFn: Promise<AxiosResponse<any, any>>
) => {
  return axiosCalledFn
    .then((res) => res.data)
    .catch((error) => {
      if (error.data?.message) {
        throw error.data;
      } else if (error.response?.data?.message) {
        throw error.response;
      } else if (error.message) {
        throw error;
      } else {
        throw {
          message: "An error has occured",
        };
      }
    });
};

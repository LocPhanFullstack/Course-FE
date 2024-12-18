import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import { AxiosResponse } from "axios";

const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers: any) => {
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        console.log("Clerk token not available");
      }
      return headers;
    },
  });

  try {
    const result: any = await baseQuery(args, api, extraOptions);

    if (result.error) {
      const errorData = result.error.data;
      const errorMessage =
        errorData?.message ||
        result.error.status.toString() ||
        "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    }

    const isMutationRequest =
      (args as FetchArgs).method && (args as FetchArgs).method !== "GET";

    if (isMutationRequest) {
      const successMessage = result.data?.message;
      if (successMessage) toast.success(successMessage);
    }

    if (result.data) {
      result.data = result.data.data;
    } else if (
      result.error?.status === 204 ||
      result.meta?.response?.status === 24
    ) {
      return { data: null };
    }

    return result;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return { error: { status: "FETCH_ERROR", error: errorMessage } };
  }
};

export const customBaseQueryWithTransformation = async (
  fetchArgs: FetchArgs
) => {
  try {
    const response = await customBaseQuery(fetchArgs, {} as any, {});

    if (response.error) {
      throw response.error;
    }

    // Kiểm tra và trả về dữ liệu sau khi xử lý
    return response.data || { message: "No data", data: [] };
  } catch (error: any) {
    if (error.data?.message) {
      throw error.data;
    } else if (error.message) {
      throw error;
    } else {
      throw {
        message: "An error has occurred",
      };
    }
  }
};

export function axiosFnTransformer(
  axiosCalledFn: Promise<AxiosResponse<any, any>>
) {
  return axiosCalledFn
    .then((res) => res.data)
    .catch((err) => {
      if (err.data?.message) {
        throw err.data;
      } else if (err.response?.data?.message) {
        throw err.response;
      } else if (err.message) {
        throw err;
      } else {
        throw {
          message: "An error has occurred",
        };
      }
    });
}

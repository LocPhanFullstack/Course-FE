import { BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/query'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { toast } from 'sonner'

const customBaseQuery = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: any) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      const token = await window.Clerk?.session?.getToken()
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  })

  try {
    const result: any = await baseQuery(args, api, extraOptions)
    console.log('API Response:', result) // Log phản hồi từ API để kiểm tra

    if (result.error) {
      const errorData = result.error.data
      const errorMessage = errorData?.message || result.error.status.toString() || 'An error occurred'
      toast.error(`Error: ${errorMessage}`)
    }

    const isMutationRequest = (args as FetchArgs).method && (args as FetchArgs).method !== 'GET'

    if (isMutationRequest) {
      const successMessage = result.data?.message
      if (successMessage) toast.success(successMessage)
    }

    if (result.data) {
      result.data = result.data.data
    } else if (result.error?.status === 204 || result.meta?.response?.status === 24) {
      return { data: null }
    }

    return result
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return { error: { status: 'FETCH_ERROR', error: errorMessage } }
  }
}

export const api = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'api',
  tagTypes: ['Users', 'Courses'],
  endpoints: (build) => ({
    updateUser: build.mutation<IUser, Partial<IUser> & { userId: string }>({
      query: ({ userId, ...updatedUser }) => ({
        url: `users/clerk/${userId}`,
        method: 'PUT',
        body: updatedUser,
      }),
      invalidatesTags: ['Users'],
    }),

    /* 
        ===============
        COURSES
        =============== 
        */
    getCourses: build.query<ICourse[], { category?: string }>({
      query: ({ category }) => ({
        url: 'courses',
        params: { category },
      }),
      providesTags: ['Courses'],
    }),

    getCourse: build.query<ICourse, string>({
      query: (courseId) => `courses/${courseId}`,
      providesTags: (result, error, courseId) => [{ type: 'Courses', courseId }],
    }),

    createCourse: build.mutation<ICourse, { teacherId: string; teacherName: string }>({
      query: (body) => ({
        url: `courses`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Courses'],
    }),

    updateCourse: build.mutation<ICourse, { courseId: string; formData: FormData }>({
      query: ({ courseId, formData }) => ({
        url: `courses/${courseId}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { courseId }) => [{ type: 'Courses', courseId }],
    }),

    deleteCourse: build.mutation<{ message: string }, string>({
      query: (courseId) => ({
        url: `courses/${courseId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Courses'],
    }),

    /* 
    ===============
    TRANSACTIONS
    =============== 
    */
    getTransactions: build.query<ITransaction[], string>({
      query: (userId) => `transactions?userId=${userId}`,
    }),

    createStripePaymentIntent: build.mutation<{ clientSecret: string }, { amount: number }>({
      query: ({ amount }) => ({
        url: `/transactions/stripe/payment-intent`,
        method: 'POST',
        body: { amount },
      }),
    }),

    createTransaction: build.mutation<ITransaction, Partial<ITransaction>>({
      query: (transaction) => ({
        url: 'transactions',
        method: 'POST',
        body: transaction,
      }),
    }),

    /* 
    ===============
    USER COURSE PROGRESS
    =============== 
    */
  }),
})

export const {
  useUpdateUserMutation,
  useGetCourseQuery,
  useGetCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useGetTransactionsQuery,
  useCreateStripePaymentIntentMutation,
  useCreateTransactionMutation,
} = api

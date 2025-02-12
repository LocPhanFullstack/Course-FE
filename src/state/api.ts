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
    if (result.error) {
      const errorData = result.error.data
      const errorMessage =
        errorData?.message || result.error.status.toString() || 'An error occurred'
      toast.error(`Error: ${errorMessage}`)
      console.log(result.error)
      return { error: { status: result.error.status, message: errorMessage } }
    }
    const isMutationRequest = (args as FetchArgs).method && (args as FetchArgs).method !== 'GET'
    if (isMutationRequest) {
      const successMessage = result.data?.message
      if (successMessage) toast.success(successMessage)
    }
    if (result.data) {
      if (result.data.data) {
        return { data: result.data.data }
      }
      return { data: result.data }
    } else if (result.error?.status === 204 || result.meta?.response?.status === 24) {
      return { data: null }
    }
    return { error: { status: 'UNKNOWN_ERROR', message: 'Unknown error' } }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return { error: { status: 'FETCH_ERROR', error: errorMessage } }
  }
}

export const api = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'api',
  tagTypes: ['Users', 'Courses', 'UserCourseProgress'],
  endpoints: (build) => ({
    updateUser: build.mutation<IUser, Partial<IUserSettings> & { userId: string }>({
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
      query: (courseId) => {
        return `courses/${courseId}`
      },
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
    getUserEnrolledCourses: build.query<ICourse[], string>({
      query: (userId) => `users/course-progress/${userId}/enrolled-courses`,
      providesTags: ['Courses', 'UserCourseProgress'],
    }),

    getUserCourseProgress: build.query<IUserCourseProgress, { userId: string; courseId: string }>({
      query: ({ userId, courseId }) => `users/course-progress/${userId}/courses/${courseId}`,
      providesTags: ['UserCourseProgress'],
    }),

    updateUserCourseProgress: build.mutation<
      IUserCourseProgress,
      {
        userId: string
        courseId: string
        progressData: {
          sections: ISectionProgress[]
        }
      }
    >({
      query: ({ userId, courseId, progressData }) => ({
        url: `users/course-progress/${userId}/courses/${courseId}`,
        method: 'PUT',
        body: progressData,
      }),
      invalidatesTags: ['UserCourseProgress'],
      async onQueryStarted({ userId, courseId, progressData }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getUserCourseProgress', { userId, courseId }, (draft) => {
            Object.assign(draft, {
              ...draft,
              sections: progressData.sections,
            })
          }),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
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
  useGetUserEnrolledCoursesQuery,
  useGetUserCourseProgressQuery,
  useUpdateUserCourseProgressMutation,
} = api

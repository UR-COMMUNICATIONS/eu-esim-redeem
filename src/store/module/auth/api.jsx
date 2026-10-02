import { apiSlice } from "../api/apiSlice";
import { saveAuthData } from "./slice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdmin: builder.query({
      query: () => ({
        url: "/admins/all",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/admins/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/admins/login",
        method: "POST",
        body: data,
      }),
    }),
    sendForgotEmail: builder.mutation({
      query: (data) => ({
        url: "/admins/send-otp",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/admins/reset",
        method: "PATCH",
        body: data,
      }),
    }),
    updateAdmin: builder.mutation({
      query: ({ data, id }) => ({
        url: `/admins/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data) {
            dispatch(saveAuthData(result?.data?.admin));
          }
        } catch (error) {
        }
      },
    }),
    updateAdminPassword: builder.mutation({
      query: ({ data, email }) => ({
        url: `/admins/resetpassword/${email}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllAdminQuery,
  useRegisterMutation,
  useLoginMutation,
  useSendForgotEmailMutation,
  useResetPasswordMutation,
  useUpdateAdminMutation,
  useUpdateAdminPasswordMutation,
} = authApi;

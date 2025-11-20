import { baseApi } from "@/redux/api/baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ⭐ Get All Users
    getUsers: builder.query({
      query: (params) => ({
        url: `/admin-users/all-users`,
        method: "GET",
        params,
      }),
      providesTags: ["Users"],
    }),
    // ⭐ Update User
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/admin-users/soft-delete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

// Export hooks
export const { useGetUsersQuery, useDeleteUserMutation } = usersApi;

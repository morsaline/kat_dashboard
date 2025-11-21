import { baseApi } from "@/redux/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ⭐ Get Dashboard Stats
    getDashboardStats: builder.query({
      query: () => ({
        url: "/admin-users/stats", // Adjust URL as per your backend
        method: "GET",
      }),
      providesTags: ["Dashboard"], // You can set tags here for invalidation if needed
    }),
    getCancelledOrders: builder.query({
      query: () => ({
        url: "/admin-users/cancelled-orders", // Adjust URL as per your backend
        method: "GET",
      }),
      providesTags: ["Orders"], // You can set tags here for invalidation if needed
    }),

    getTransactionStats: builder.query({
      query: () => ({
        url: "/admin-users/financial-summary", // Adjust URL as per your backend
        method: "GET",
      }),
      providesTags: ["Orders"], // You can set tags here for invalidation if needed
    }),

    getConfirmedOrders: builder.query({
      query: () => ({
        url: "/admin-users/confirmed-orders", // Adjust URL as per your backend
        method: "GET",
      }),
      providesTags: ["Orders"], // You can set tags here for invalidation if needed
    }),

    // ⭐ Get User Activity Data (example)
  }),
});

// Export hooks for the dashboard API
export const {
  useGetTransactionStatsQuery,
  useGetDashboardStatsQuery,
  useGetCancelledOrdersQuery,
  useGetConfirmedOrdersQuery,
} = dashboardApi;

import { baseApi } from "@/redux/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getDashboardStats: build.query<any, void>({
      // <-- <responseType, argumentType>
      query: () => ({
        url: "/dashboard/stats",
        method: "GET",
      }),
      providesTags: ["overview"],
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;

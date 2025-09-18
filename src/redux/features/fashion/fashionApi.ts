/* eslint-disable @typescript-eslint/no-explicit-any */
import { SeoDataResponse } from "@/app/types/global";
import { baseApi } from "@/redux/api/baseApi";

export interface FashionData {
  id?: string;
  fashionName: string;
  category?: string;
  address: string;
  lat: number;
  lng: number;
  averageRating: number;
  phone?: string;
  facilities?: string[]; // list of available facilities
  images: string | File; // single image URL (if multiple, use string[])
}

export const fashionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFashion: build.mutation<SeoDataResponse<FashionData>, FormData>({
      query: (body) => ({
        url: "/fashions/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Fashion"],
    }),

    updateSingleFashion: build.mutation<
      SeoDataResponse<FashionData>,
      { id: string; body: FormData } // ✅ FormData allowed
    >({
      query: ({ id, body }) => ({
        url: `/fashions/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Fashion"],
    }),

    getAllFashions: build.query<
      SeoDataResponse<FashionData>,
      Record<string, any>
    >({
      query: (params = {}) => ({
        url: "/fashions/all-fashion",
        method: "GET",
        params,
      }),
      providesTags: ["Fashion"],
    }),

    deleteSingleFashion: build.mutation<SeoDataResponse<FashionData>, string>({
      query: (id) => ({
        url: `/fashions/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Fashion"],
    }),
  }),
});

export const {
  useCreateFashionMutation,
  useUpdateSingleFashionMutation,
  useGetAllFashionsQuery,
  useDeleteSingleFashionMutation,
} = fashionApi;

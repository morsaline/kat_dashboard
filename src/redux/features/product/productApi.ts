import { baseApi } from "@/redux/api/baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ✅ CREATE Product
    createProduct: build.mutation({
      query: (body) => ({
        url: "/products/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),

    // ✅ READ All Products (List)
    getProducts: build.query({
      query: (params) => ({
        url: "/products/all",
        method: "GET",
        params,
      }),
      providesTags: ["Products"],
    }),

    // ✅ READ Single Product by ID
    getProductById: build.query({
      query: (id) => `/products/single/${id}`,
      providesTags: ["Products"],
    }),

    updateProduct: build.mutation({
      query: ({ id, formData }) => ({
        url: `/products/update/${id}`,
        method: "PUT",
        formData, // directly pass FormData
      }),
      invalidatesTags: ["Products"],
    }),

    // ✅ DELETE Product
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/products/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;

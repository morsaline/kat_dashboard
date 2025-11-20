import { baseApi } from "@/redux/api/baseApi";

export const skillsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ⭐ Get All Skills
    getSkills: builder.query({
      query: (params) => ({
        url: `/admin-users/category-dashboard`, // Replace with your actual API endpoint
        method: "GET",
        params,
      }),
      providesTags: ["Skills"],
    }),
    getSubCategory: builder.query({
      query: (params) => ({
        url: `/admin-users/sub-categories`, // Replace with your actual API endpoint
        method: "GET",
        params,
      }),
      providesTags: ["Skills"],
    }),

    getSkillsCategory: builder.query({
      query: (params) => ({
        url: `/admin-users/skills`, // Replace with your actual API endpoint
        method: "GET",
        params,
      }),
      providesTags: ["Skills"],
    }),

    // ⭐ Add or Update a Skill
    updateSkill: builder.mutation({
      query: ({ id, skillData }) => ({
        url: `/skills/update/${id}`, // Replace with your actual API endpoint
        method: "PATCH", // Or "PUT" based on your update strategy
        body: skillData, // Send the data to be updated
      }),
      invalidatesTags: ["Skills"],
    }),
    // ⭐ Delete a Skill (Soft Delete)
    deleteSkill: builder.mutation({
      query: ({ id }) => ({
        url: `/skills/soft-delete/${id}`, // Replace with your actual API endpoint
        method: "PATCH", // Or "DELETE" depending on your API's implementation
      }),
      invalidatesTags: ["Skills"],
    }),
  }),
});

// Export hooks
export const {
  useGetSkillsCategoryQuery,
  useGetSubCategoryQuery,
  useGetSkillsQuery,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} = skillsApi;

import api from "./axiosClient";

export const businessApi = {
  // GET /api/business/profiles/ (List Business Profiles)
  getProfiles: async () => {
    const response = await api.get("/api/business/profiles/");
    return response.data;
  },

  // PUT /api/business/profiles/<uuid>/ (Update Profile)
  updateProfile: async (profileId, data) => {
    const response = await api.put(`/api/business/profiles/${profileId}/`, data);
    return response.data;
  },
};

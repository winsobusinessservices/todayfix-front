import { useUserStore } from "../store/userStore";

export default function saveLoginCredentials(response) {
  const setAuthData = useUserStore.getState().setAuthData;
  setAuthData({
    access: response?.data?.access,
    refresh: response?.data?.refresh,
    user: {
      id: response?.data?.user?.id,
      user_uuid: response?.data?.user?.user_uuid,
      first_name: response?.data?.user?.first_name,
      last_name: response?.data?.user?.last_name,
      email: response?.data?.user?.email,
      phone: response?.data?.user?.phone,
      profile_image: response?.data?.user?.profile_image,
      role: response?.data?.user?.role,
    },
  });
}

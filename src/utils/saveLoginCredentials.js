import { userDetails } from "../services/userApi";
import { useUserStore } from "../store/userStore";

export default async function saveLoginCredentials(response) {
  const setTokens = useUserStore.getState().setTokens;
  const setUser = useUserStore.getState().setUser;
  setTokens({
    access: response?.data?.access,
    refresh: response?.data?.refresh,
  });
  const userData = await userDetails();
  setUser(userData);
}

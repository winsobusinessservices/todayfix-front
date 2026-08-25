import {
  GoogleLogin as GoogleLoginButton,
  useGoogleLogin,
} from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { googleLogin } from "../../services/authApi";
import { popup } from "../pop-up/pop-up";
import { useNavigate } from "react-router";
import saveLoginCredentials from "../../utils/saveLoginCredentials";
import { useUserStore } from "../../store/userStore";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const setAuthData = useUserStore((state) => state.setAuthData);

  const { mutate, isError, error, isPending, isSuccess } = useMutation({
    mutationFn: googleLogin,
    onSuccess: (response) => {
      const result = response;
      console.log(result);
      if (result.success && result.data) {
        // saveLoginCredentials(result.data);
        // setAuthData({
        //   access: result.data.access,
        //   refresh: result.data.refresh,
        //   user: {
        //     id: result.data.user.id,
        //     uuid: result.data.user.uuid,
        //     first_name: result.data.user.first_name,
        //     last_name: result.data.user.last_name,
        //     email: result.data.user.email,
        //     phone: result.data.user.phone,
        //     role: result.data.user.role,
        //   },
        // });
        popup(
          "Login Successful",
          "Welcome back! You've successfully logged in.",
          "login",
        );
        navigate("/");
      }
    },
    onError: (error) => {
      console.log(error);
      popup("Error", error.message, "error");
    },
  });

  const handleSuccess = async (credentialResponse) => {
    const credential = credentialResponse.credential;
    if (!credential) {
      console.error("No Google credential received");
      return;
    }
    // console.log(credentialResponse);
    mutate(credential);
  };

  const handleError = (response) => {
    console.log("Login Failed", response);
  };

  return (
    <>
      {/* <button
        onClick={login}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-surface-primary border border-border-primary rounded-xl text-sm font-bold text-text-primary hover:bg-surface-secondary hover:border-border-secondary transition-all shadow-sm active:scale-95"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Google
      </button> */}
      <GoogleLoginButton onSuccess={handleSuccess} onError={handleError} />
    </>
  );
};

export default GoogleLogin;

import { useMutation } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { verifyEmail } from "../services/userApi";
import { useUserStore } from "../store/userStore";
import { popup } from "../components/pop-up/pop-up";

const VerifictionSuccess = () => {
  const [status, setStatus] = useState("verifying");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setAuthData = useUserStore((state) => state.setAuthData);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (response) => {
      const result = response;
      if (result.success && result.data) {
        setStatus("success");
        setAuthData({
          access: result.data.access,
          refresh: result.data.refresh,
          user: {
            id: result.data.user.id,
            uuid: result.data.user.uuid,
            first_name: result.data.user.first_name,
            last_name: result.data.user.last_name,
            email: result.data.user.email,
            phone: result.data.user.phone,
            role: result.data.user.role,
          },
        });
        popup(
          "Registration Successful",
          "Your account has been created successfully.",
          "login",
        );
        navigate("/");
      }
    },
    onError: (response) => {
      console.log(response);
      setStatus("error");
      popup("Something Went Wrong!", error.message, "error");
    },
  });

  useEffect(() => {
    mutate({
      uuid: searchParams.get("uuid"),
      token: searchParams.get("token"),
    });
    if (isPending) {
      setStatus("verifying");
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center font-sans selection:bg-blue-100">
      <div className="max-w-md w-full px-6 flex flex-col items-center justify-center text-center">
        {/* Loading State: Runs automatically on page load */}
        {status === "verifying" && (
          <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-[#F0F2F5] border-t-[#4A44F2] rounded-full animate-spin mb-6 shadow-sm"></div>
            <h2 className="text-xl font-bold text-[#1F2328] tracking-tight animate-pulse">
              Verifying...
            </h2>
          </div>
        )}

        {/* Success State: Displays ONLY "Verification Success" */}
        {status === "success" && (
          <div className="animate-in fade-in zoom-in slide-in-from-bottom-4 duration-500 flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <svg
                className="w-8 h-8 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold text-[#1F2328] tracking-tight">
              Verification Success
            </h1>
          </div>
        )}

        {/* Error State: Just in case the API call fails */}
        {status === "error" && (
          <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold text-[#1F2328] tracking-tight mb-3">
              Verification Failed
            </h1>
            <p className="text-[#848A92] text-sm">
              The link may have expired or is invalid. Please request a new
              verification email.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifictionSuccess;

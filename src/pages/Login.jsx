import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import SEO from "../components/seo/SEO";
import { useMutation } from "@tanstack/react-query";
import { login, sendLoginOTP, verifyLoginOTP } from "../services/authApi";
import { popup } from "../components/pop-up/pop-up";
import GoogleLogin from "../components/oauth/GoogleLogin";
import AppleLogin from "../components/oauth/AppleLogin";
import saveLoginCredentials from "../utils/saveLoginCredentials";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    otp: "",
    remember_me: true,
  });
  const [loginMethod, setLoginMethod] = useState("email");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [viaOtp, setViaOtp] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const {
    mutate,
    isPending: isLoginPending,
    isError: isLoginError,
    error: loginError,
  } = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const result = response;
      if (result.success && result.data) {
        saveLoginCredentials(result);
        popup(
          "Login Successful",
          "Welcome back! You've successfully logged in.",
          "login",
        );
        navigate("/");
      }
    },
    onError: (error) => {
      console.log(error?.response?.data?.detail[0]);
      popup(
        "Error",
        error?.response?.data?.detail[0] || error.message,
        "error",
      );
    },
  });

  // Send OTP Mutation
  const sendOtpMutation = useMutation({
    mutationFn: sendLoginOTP,
    onSuccess: (response) => {
      if (response.success) {
        setOtpSent(true);
        setTimer(60);
        setViaOtp(true);
        popup(
          "OTP Sent",
          "An OTP has been sent to your phone number.",
          "success",
        );
      } else {
        popup("Error", "Failed to send OTP.", "error");
      }
    },
    onError: (error) => {
      // console.log(error.response.data.phone[0]);
      popup(
        "Error",
        error?.response?.data?.phone[0] || "Failed to send OTP",
        "error",
      );
    },
  });

  // Verify OTP Mutation
  const verifyOtpMutation = useMutation({
    mutationFn: verifyLoginOTP,
    onSuccess: (response) => {
      const result = response;
      // console.log(response);
      if (result.success && result.data) {
        saveLoginCredentials(result);
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
      popup(
        "Error",
        error?.response?.data?.message || error.message || "Invalid OTP",
        "error",
      );
    },
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginMethod === "email") {
      mutate({ identifier: formData.email, password: formData.password });
    } else if (loginMethod === "phone") {
      if (viaOtp) {
        verifyOtpMutation.mutate({ phone: formData.phone, otp: formData.otp });
      } else {
        mutate({ identifier: formData.phone, password: formData.password });
      }
    }
  };

  const isAnyPending =
    isLoginPending || sendOtpMutation.isPending || verifyOtpMutation.isPending;

  return (
    <div className="flex font-sans bg-surface-primary justify-center items-center">
      <div className="absolute inset-0 opacity-70 bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:70px_70px] " />
      <SEO
        title="Login | TodayFix"
        description="Sign in to your TodayFix account to manage your bookings or business profile."
      />
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 relative">
        {/* Mobile-only background elements */}
        <div className="absolute top-0 right-0 w-full h-full bg-surface-secondary lg:hidden -z-10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-200 rounded-full filter blur-[80px] lg:hidden -z-10 opacity-50"></div>
        <div className="w-full max-w-md">
          <div className="p-10 rounded-xl bg-surface-secondary border border-border-primary shadow-2xl">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-extrabold text-text-primary tracking-tight mb-2">
                Welcome back
              </h2>
              <p className="text-text-secondary font-medium">
                Please enter your details to sign in.
              </p>

              {isLoginError && loginMethod === "email" && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
                  {loginError?.response?.data?.detail?.[0] ||
                    loginError?.response?.data?.non_field_errors?.[0] ||
                    "Invalid email or password."}
                </div>
              )}
              {sendOtpMutation.isError &&
                loginMethod === "phone" &&
                !otpSent && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
                    {sendOtpMutation.error?.response?.data?.phone?.[0] ||
                      "Failed to send OTP"}
                  </div>
                )}
              {verifyOtpMutation.isError &&
                loginMethod === "phone" &&
                otpSent && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
                    {verifyOtpMutation.error?.response?.data?.message ||
                      verifyOtpMutation.error?.message ||
                      "Invalid OTP"}
                  </div>
                )}
            </div>

            <div className="flex flex-col gap-3 mb-8">
              <GoogleLogin />
              {/* <AppleLogin /> */}
            </div>

            <div className="flex p-1 bg-surface-primary rounded-xl mb-8 border border-border-primary">
              <button
                type="button"
                onClick={() => {
                  setLoginMethod("email");
                  setOtpSent(false);
                  setTimer(0);
                  setViaOtp(false);
                }}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                  loginMethod === "email"
                    ? "bg-surface-dark text-text-inverted shadow-sm"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
                }`}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginMethod("phone");
                  setOtpSent(false);
                  setTimer(0);
                  setViaOtp(false);
                }}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                  loginMethod === "phone"
                    ? "bg-surface-dark text-text-inverted shadow-sm"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
                }`}
              >
                Phone Number
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              {loginMethod === "email" ? (
                <>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-text-primary">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-text-muted group-focus-within:text-black transition-colors"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                          />
                        </svg>
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required={loginMethod === "email"}
                        placeholder="name@company.com"
                        className="w-full bg-surface-secondary/50 border border-border-primary text-text-primary rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 transition-all font-medium placeholder-slate-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-text-primary">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-text-muted group-focus-within:text-black transition-colors"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required={loginMethod === "email"}
                        placeholder="••••••••"
                        className="w-full bg-surface-secondary/50 border border-border-primary text-text-primary rounded-xl py-3 pl-11 pr-12 focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 transition-all font-medium placeholder-slate-400 tracking-wide"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-text-secondary focus:outline-none"
                      >
                        {showPassword ? (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-end mt-2">
                    {/* <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember_me"
                        type="checkbox"
                        checked={formData.remember_me}
                        onChange={handleInputChange}
                        value={true}
                        className="h-4 w-4 text-text-primary focus:ring-black border-border-secondary rounded cursor-pointer"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-text-secondary cursor-pointer select-none"
                      >
                        Remember me
                      </label>
                    </div> */}
                    <div className="text-sm">
                      <Link
                        to="/forgot-password"
                        className="font-bold text-text-primary hover:text-text-secondary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-text-primary">
                      Phone Number
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-text-muted group-focus-within:text-black transition-colors"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone || ""}
                        onChange={handleInputChange}
                        required={loginMethod === "phone"}
                        placeholder="+1 (555) 000-0000"
                        disabled={otpSent}
                        className={`w-full bg-surface-secondary/50 border border-border-primary text-text-primary rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 transition-all font-medium placeholder-slate-400 ${otpSent ? "opacity-60 cursor-not-allowed" : ""}`}
                      />
                    </div>
                  </div>
                  {!viaOtp && (
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-text-primary">
                        Password
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg
                            className="w-5 h-5 text-text-muted group-focus-within:text-black transition-colors"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required={loginMethod === "phone" && !viaOtp}
                          placeholder="••••••••"
                          className="w-full bg-surface-secondary/50 border border-border-primary text-text-primary rounded-xl py-3 pl-11 pr-12 focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 transition-all font-medium placeholder-slate-400 tracking-wide"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-text-secondary focus:outline-none"
                        >
                          {showPassword ? (
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {!viaOtp && (
                    <div className="flex items-center justify-end mt-2 text-sm">
                      <button
                        type="button"
                        onClick={() => {
                          if (!formData.phone) {
                            popup(
                              "Error",
                              "Please enter your phone number first.",
                              "error",
                            );
                            return;
                          }
                          sendOtpMutation.mutate(formData.phone);
                        }}
                        disabled={timer > 0 || sendOtpMutation.isPending}
                        className="font-bold text-text-primary hover:text-text-secondary hover:underline"
                      >
                        Continue Via OTP
                      </button>
                    </div>
                  )}

                  {otpSent && (
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-text-primary">
                        OTP Code
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg
                            className="w-5 h-5 text-text-muted group-focus-within:text-black transition-colors"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="otp"
                          value={formData.otp || ""}
                          onChange={handleInputChange}
                          required={loginMethod === "phone" && otpSent}
                          placeholder="Enter 6-digit code"
                          maxLength={6}
                          className="w-full bg-surface-secondary/50 border border-border-primary text-text-primary rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 transition-all font-medium placeholder-slate-400 tracking-widest"
                        />
                        <button
                          type="button"
                          onClick={() => sendOtpMutation.mutate(formData.phone)}
                          disabled={timer > 0 || sendOtpMutation.isPending}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-text-primary hover:text-text-secondary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {timer > 0 ? `Resend in ${timer}s` : "Resend"}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              <button
                type="submit"
                disabled={isAnyPending}
                className="w-full mt-6 bg-surface-dark text-white font-bold py-3.5 rounded-xl hover:bg-zinc-800 transition-colors shadow-lg shadow-black/10 active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isAnyPending ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {sendOtpMutation.isPending ? "Sending..." : "Signing In..."}
                  </>
                ) : (
                  <>
                    Sign In
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-text-secondary">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-text-primary hover:text-text-secondary hover:underline"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

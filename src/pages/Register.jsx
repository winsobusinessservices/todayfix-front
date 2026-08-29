import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import SEO from "../components/seo/SEO";
import { useMutation } from "@tanstack/react-query";
import { register, verifyOTP } from "../services/authApi";
import { popup } from "../components/pop-up/pop-up";
import { validatePassword } from "../utils/passwordValidator";
import { validatePhone } from "../utils/phoneValidator";
import saveLoginCredentials from "../utils/saveLoginCredentials";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [registerMethod, setRegisterMethod] = useState("email");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

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
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    otp: "",
    password: "",
    confirm_password: "",
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      if (response.success) {
        if (registerMethod === "phone") {
          popup(
            "OTP sent Successful",
            "Please verify your phone number using the OTP sent to you.",
            "info",
          );
          setOtpSent(true);
          setTimer(60);
        } else {
          popup(
            "Email Sent Successful",
            "Please check your email and click the verification link to activate your account.",
            "info",
          );
          navigate("/login");
        }
      }
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: (response) => {
      const result = response;
      // console.log(response);
      if (result.success && result.data) {
        saveLoginCredentials(result)
        popup(
          "Registration Successful",
          "Your account has been created successfully.",
          "success",
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationErrors({});

    if (registerMethod === "phone" && otpSent) {
      verifyOtpMutation.mutate({ phone: formData.phone, otp: formData.otp });
      return;
    }

    const errors = {};
    if (formData.password !== formData.confirm_password) {
      errors.confirm_password = "Passwords do not match.";
    }

    const pwdErrors = validatePassword(formData.password);
    if (pwdErrors.length > 0) {
      errors.password = "Password must contain " + pwdErrors.join(", ") + ".";
    }

    if (registerMethod === "phone" && formData.phone.length > 0) {
      setFormData((prev) => ({ ...prev, phone: prev.phone.replace(" ", "") }));
      const phoneErrors = validatePhone(formData.phone);
      if (phoneErrors.length > 0) {
        errors.phone = "Phone number " + phoneErrors[0] + ".";
      }
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const payload = { ...formData };
    if (registerMethod === "email") {
      delete payload.phone;
      delete payload.otp;
    } else {
      delete payload.email;
      delete payload.otp;
    }

    mutate(payload);
  };

  const getFieldError = (fieldName) => {
    if (validationErrors[fieldName]) return validationErrors[fieldName];
    if (isError && error?.response?.data?.[fieldName]) {
      const err = error.response.data[fieldName];
      return Array.isArray(err) ? err[0] : err;
    }
    return null;
  };

  return (
    <div className="bg-surface-secondary font-sans flex items-center justify-center relative">
      <div className="absolute inset-0 opacity-70 bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:70px_70px] " />
      <SEO
        title="Register | TodayFix"
        description="Create your TodayFix account to book premium home services or list your professional business."
      />
      <div className="w-full md:w-7/12 p-8 relative">
        <div className="p-10 max-w-md mx-auto rounded-xl bg-surface-secondary border border-border-primary shadow-2xl">
          <div className="">
            <div className="animate-fade-in-up delay-100 mb-8">
              <h1 className="text-3xl font-extrabold text-text-primary tracking-tight mb-2">
                Create an account
              </h1>
              <p className="text-text-secondary font-medium">
                Let's get you set up in minutes.
              </p>
              {isError && error?.response?.data?.non_field_errors && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
                  {error.response.data.non_field_errors[0]}
                </div>
              )}
              {isError && !error?.response && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
                  An unexpected error occurred. Please try again.
                </div>
              )}
              {verifyOtpMutation.isError && registerMethod === "phone" && otpSent && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
                  {verifyOtpMutation.error?.response?.data?.message ||
                    verifyOtpMutation.error?.message ||
                    "Invalid OTP"}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Social Logins */}
              {/* <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-surface-primary border border-border-primary rounded-xl text-sm font-bold text-text-primary hover:bg-surface-secondary hover:border-border-secondary transition-all shadow-sm active:scale-95">
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
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-surface-primary border border-border-primary rounded-xl text-sm font-bold text-text-primary hover:bg-surface-secondary hover:border-border-secondary transition-all shadow-sm active:scale-95">
                  <svg
                    className="w-5 h-5 text-black"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.27-.77 3.65-.77 1.41.05 2.53.5 3.31 1.48-2.65 1.54-2.18 5.25.4 6.37-1.11 2.37-2.14 4.54-2.44 5.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  Apple
                </button>
              </div> */}

              <div className="flex p-1 bg-surface-primary rounded-xl mb-8 border border-border-primary">
                <button
                  type="button"
                  onClick={() => {
                    setRegisterMethod("email");
                    setOtpSent(false);
                    setTimer(0);
                  }}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                    registerMethod === "email"
                      ? "bg-surface-dark text-text-inverted shadow-sm"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
                  }`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRegisterMethod("phone");
                  }}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                    registerMethod === "phone"
                      ? "bg-surface-dark text-text-inverted shadow-sm"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
                  }`}
                >
                  Phone Number
                </button>
              </div>

              <div className="flex gap-5 w-full">
                {/* Full Name Input */}
                <div className="animate-fade-in-up delay-300 space-y-1.5 w-1/2">
                  <label className="text-sm font-bold text-text-primary">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required
                    placeholder="John"
                    className={`w-full bg-surface-secondary/50 border ${getFieldError("first_name") ? "border-red-500 focus:ring-red-500/20" : "border-border-primary focus:border-black focus:ring-black/10"} text-text-primary rounded-xl py-3 px-4 focus:outline-none focus:ring-4 transition-all font-medium placeholder-text-muted`}
                  />
                  {getFieldError("first_name") && (
                    <p className="text-xs text-red-500 mt-1">
                      {getFieldError("first_name")}
                    </p>
                  )}
                </div>
                <div className="animate-fade-in-up delay-300 space-y-1.5 w-1/2">
                  <label className="text-sm font-bold text-text-primary">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    required
                    placeholder="Doe"
                    className={`w-full bg-surface-secondary/50 border ${getFieldError("last_name") ? "border-red-500 focus:ring-red-500/20" : "border-border-primary focus:border-black focus:ring-black/10"} text-text-primary rounded-xl py-3 px-4 focus:outline-none focus:ring-4 transition-all font-medium placeholder-text-muted`}
                  />
                  {getFieldError("last_name") && (
                    <p className="text-xs text-red-500 mt-1">
                      {getFieldError("last_name")}
                    </p>
                  )}
                </div>
              </div>

              {registerMethod === "email" ? (
                /* Email Input */
                <div className="animate-fade-in-up delay-300 space-y-1.5">
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
                      required={registerMethod === "email"}
                      placeholder="name@example.com"
                      className={`w-full bg-surface-secondary/50 border ${getFieldError("email") ? "border-red-500 focus:ring-red-500/20" : "border-border-primary focus:border-black focus:ring-black/10"} text-text-primary rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-4 transition-all font-medium placeholder-slate-400`}
                    />
                  </div>
                  {getFieldError("email") && (
                    <p className="text-xs text-red-500 mt-1">
                      {getFieldError("email")}
                    </p>
                  )}
                </div>
              ) : (
                <div className="animate-fade-in-up delay-300 space-y-1.5">
                  <label className="text-sm font-bold text-text-primary">
                    Phone Number
                  </label>
                  <div className="relative group">
                    <div className="absolute font-semibold inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted group-focus-within:text-black transition-colors">
                      +91
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required={registerMethod === "phone"}
                      placeholder="12345 67890"
                      className={`w-full bg-surface-secondary/50 border ${getFieldError("phone") ? "border-red-500 focus:ring-red-500/20" : "border-border-primary focus:border-black focus:ring-black/10"} text-text-primary rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-4 transition-all font-medium placeholder-slate-400`}
                    />
                  </div>
                  {getFieldError("phone") && (
                    <p className="text-xs text-red-500 mt-1">
                      {getFieldError("phone")}
                    </p>
                  )}
                </div>
              )}

              {registerMethod === "phone" && otpSent && (
                <div className="animate-fade-in-up delay-300 space-y-1.5">
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
                      value={formData.otp}
                      onChange={handleInputChange}
                      required={registerMethod === "phone" && otpSent}
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      className="w-full bg-surface-secondary/50 border border-border-primary text-text-primary rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 transition-all font-medium placeholder-slate-400 tracking-widest"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        // We construct a payload to resend the OTP.
                        // For this implementation, we re-trigger the register mutation.
                        // Assuming the backend handles duplicate attempts by re-sending OTP.
                        const payload = { ...formData };
                        delete payload.email;
                        delete payload.otp;
                        mutate(payload);
                      }}
                      disabled={timer > 0 || isPending}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-text-primary hover:text-text-secondary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {timer > 0 ? `Resend in ${timer}s` : "Resend"}
                    </button>
                  </div>
                </div>
              )}

              {/* Password Input */}
              <div className="animate-fade-in-up delay-400 space-y-1.5">
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
                    required
                    placeholder="Create a strong password"
                    className={`w-full bg-surface-secondary/50 border ${getFieldError("password") ? "border-red-500 focus:ring-red-500/20" : "border-border-primary focus:border-black focus:ring-black/10"} text-text-primary rounded-xl py-3 pl-11 pr-12 focus:outline-none focus:ring-4 transition-all font-medium placeholder-slate-400 tracking-wide`}
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
                {getFieldError("password") && (
                  <p className="text-xs text-red-500 mt-1">
                    {getFieldError("password")}
                  </p>
                )}
              </div>

              <div className="animate-fade-in-up delay-400 space-y-1.5">
                <label className="text-sm font-bold text-text-primary">
                  Confirm Password
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
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleInputChange}
                    required
                    placeholder="Create a strong password"
                    className={`w-full bg-surface-secondary/50 border ${getFieldError("confirm_password") ? "border-red-500 focus:ring-red-500/20" : "border-border-primary focus:border-black focus:ring-black/10"} text-text-primary rounded-xl py-3 pl-11 pr-12 focus:outline-none focus:ring-4 transition-all font-medium placeholder-slate-400 tracking-wide`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-text-secondary focus:outline-none"
                  >
                    {showConfirmPassword ? (
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
                {getFieldError("confirm_password") && (
                  <p className="text-xs text-red-500 mt-1">
                    {getFieldError("confirm_password")}
                  </p>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="animate-fade-in-up delay-400 flex items-start mt-2">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 mt-0.5 text-text-primary focus:ring-black border-border-secondary rounded cursor-pointer"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-text-secondary cursor-pointer"
                >
                  I agree to the{" "}
                  <Link
                    to="#"
                    className="font-bold text-text-primary hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="#"
                    className="font-bold text-text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              <button
                type="submit"
                disabled={isPending || verifyOtpMutation.isPending}
                className="animate-fade-in-up delay-500 w-full mt-6 bg-surface-dark text-white font-bold py-3.5 rounded-xl hover:bg-zinc-800 transition-colors shadow-lg shadow-black/10 active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending || verifyOtpMutation.isPending ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
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
                    {registerMethod === "phone" && otpSent
                      ? "Verifying OTP..."
                      : "Creating Account..."}
                  </>
                ) : (
                  <>
                    {registerMethod === "phone" && otpSent
                      ? "Verify OTP"
                      : "Create Account"}
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

            <p className="animate-fade-in-up delay-500 mt-8 text-center text-sm text-text-secondary">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-text-primary hover:text-text-secondary hover:underline"
              >
                Log in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import { Link } from "react-router";
import SEO from "../components/seo/SEO";
import { useMutation } from "@tanstack/react-query";
import { forgetPassword } from "../services/userApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: forgetPassword,
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  if (isError) {
    console.log(error);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    // Add logic to send reset email here
    setIsSubmitted(true);
    mutate(email);
  };

  return (
    <div className="flex mt-32 font-sans justify-center items-center">
      <SEO
        title="Forgot Password | TodayFix"
        description="Reset your password to regain access to your TodayFix account."
      />
      <div className="w-full max-w-md p-6 sm:p-12 relative z-10 bg-surface-primary shadow-2xl rounded-3xl border border-border-primary m-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-text-primary tracking-tight mb-2">
            Reset Password
          </h2>
          <p className="text-text-secondary font-medium text-sm">
            {isSubmitted
              ? "Check your email for reset instructions."
              : "Enter your email address and we'll send you a link to reset your password."}
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@company.com"
                  className="w-full bg-surface-secondary/50 border border-border-primary text-text-primary rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 transition-all font-medium placeholder-slate-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-surface-dark text-white font-bold py-3.5 rounded-xl hover:bg-zinc-800 transition-colors shadow-lg shadow-black/10 active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full bg-surface-secondary text-text-primary font-bold py-3.5 rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              Try another email
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-sm font-bold">
          <Link
            to="/login"
            className="text-text-secondary hover:text-text-primary transition-colors inline-flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

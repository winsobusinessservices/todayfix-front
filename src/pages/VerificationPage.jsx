import { useMutation } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { verifyOTP } from "../services/userApi";
import { popup } from "../components/pop-up/pop-up";
import { useUserStore } from "../store/userStore";

const VerificationPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const location = useLocation();
  const { email } = location.state || {};
  const navigate = useNavigate();
  const setAuthData = useUserStore((state) => state.setAuthData);

  const handleChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: verifyOTP,
    onSuccess: (response) => {
      const result = response;
      if (result.success && result.data) {
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
          "register",
        );
        navigate("/");
      }
    },
    onError: (response) => {
      console.log(response);
      popup("Something Went Wrong!", error.message, "error");
    },
  })

  const handleSubmit = () => {
    mutate(otp.join(""))
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      {/* <div className="absolute inset-0 opacity-70 bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:70px_70px] " /> */}
      <div className="max-w-xl w-full px-6 flex flex-col items-center relative mt-32 p-8 rounded-xl bg-surface-secondary border border-border-primary shadow-2xl">
        <h1 className="text-3xl font-bold text-text-primary mb-3 tracking-tight">
          Check your email or message
        </h1>
        <p className="text-text-muted text-center mb-10 text-[15px] leading-relaxed">
          Please enter the six digit verification code we sent to
          <br />
          <span className="font-bold text-[#1F2328]">{email}</span>
        </p>
        <div className="flex gap-4 mb-10">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-16 h-16 rounded-full text-center text-xl font-semibold outline-none transition-all duration-200 ${digit || document.activeElement === inputRefs[index]?.current
                ? "bg-surface-accent border-2 border-border-dark text-text-primary"
                : "bg-surface-accent border-2 border-transparent text-text-primary"
                }`}
            />
          ))}
        </div>
        {otp.join("").length !== 6 ?
          (<button
            className="w-full bg-surface-accent cursor-not-allowed text-text-primary rounded-full py-4 text-[15px] font-medium transition-colors mb-6"
          >
            Please fill the full otp to confirm
          </button>) : (
            <button
              onClick={handleSubmit}
              className="w-full bg-surface-dark cursor-pointer text-text-inverted hover:scale-[1.02] rounded-full py-4 text-[15px] font-medium transition-colors mb-6"
            >
              Confirm
            </button>
          )}
        <p className="text-[#848A92] text-[15px] mb-8">
          Didn't get the email? Resend in 00:41
        </p>
        <Link to={"/register"} className="flex items-center gap-2 text-[#505459] hover:text-[#1F2328] transition-colors text-[15px] font-medium">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          back
        </Link>
      </div>
    </div>
  );
};

export default VerificationPage;

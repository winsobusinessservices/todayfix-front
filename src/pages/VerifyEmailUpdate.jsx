import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { verifyProfileEmail } from "../services/authApi";
import { CheckCircle, XCircle, Loader2, ArrowRight } from "lucide-react";
import SEO from "../components/seo/SEO";

const VerifyEmailUpdate = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasAttemptedRef = useRef(false);

  const uuid = searchParams.get("email_update_verification_uuid");
  const token = searchParams.get("token");

  const [status, setStatus] = useState("verifying"); // 'verifying', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate } = useMutation({
    mutationFn: verifyProfileEmail,
    onSuccess: () => {
      setStatus("success");
    },
    onError: (err) => {
      setStatus("error");
      setErrorMessage(
        err?.response?.data?.message ||
          err?.response.data?.detail ||
          "Failed to verify email address. The link might be invalid or expired."
      );
    },
  });

  useEffect(() => {
    if (hasAttemptedRef.current) return;
    hasAttemptedRef.current = true;

    if (!uuid || !token) {
      setStatus("error");
      setErrorMessage("Missing verification parameters in the URL.");
      return;
    }

    mutate({
      email_update_verification_uuid: uuid,
      token: token,
    });
  }, [uuid, token, mutate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-surface-primary px-4 font-sans">
      <SEO
        title="Verify Email Update | TodayFix"
        description="Verify your new email address for TodayFix."
      />
      <div className="w-full max-w-md bg-surface-secondary border border-border-primary rounded-3xl p-8 shadow-xl text-center">
        {status === "verifying" && (
          <div className="flex flex-col items-center">
            <Loader2 className="w-16 h-16 text-brand-primary animate-spin mb-6" />
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Verifying Your Email
            </h2>
            <p className="text-text-secondary">
              Please wait while we securely verify your new email address...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
            <h2 className="text-2xl font-black text-text-primary mb-3">
              Email Verified!
            </h2>
            <p className="text-text-secondary mb-8">
              Your email address has been successfully updated and verified.
            </p>
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-black text-white font-bold rounded-xl hover:bg-zinc-800 transition-colors shadow-lg"
            >
              Back to Profile
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <XCircle className="w-20 h-20 text-red-500 mb-6" />
            <h2 className="text-2xl font-black text-text-primary mb-3">
              Verification Failed
            </h2>
            <p className="text-red-500/90 bg-red-500/10 p-4 rounded-xl border border-red-500/20 text-sm mb-8 w-full">
              {errorMessage}
            </p>
            <button
              onClick={() => navigate("/profile")}
              className="w-full px-6 py-3.5 bg-surface-secondary border border-border-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 transition-colors shadow-sm"
            >
              Return to Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailUpdate;

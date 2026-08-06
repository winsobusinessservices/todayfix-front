import React from "react";
import { useNavigate } from "react-router";
import { Clock, ShieldCheck, ChevronRight } from "lucide-react";

const VerificationPendingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans flex flex-col items-center justify-center p-6">
      <div className="bg-surface-primary border border-border-primary rounded-xl p-10 md:p-14 max-w-xl w-full text-center shadow-2xl relative overflow-hidden">
        {/* Subtle background pulse */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>

        <div className="relative z-10">
          <div className="w-24 h-24 bg-surface-secondary border border-border-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Clock
              size={40}
              className="text-emerald-500 animate-[spin_4s_linear_infinite]"
            />
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-text-primary tracking-tight mb-4">
            Under Review
          </h1>

          <p className="text-zinc-500 font-medium leading-relaxed mb-8">
            Thank you for submitting your documents. Our admin team is carefully
            reviewing your profile to ensure marketplace quality.
            <br />
            <br />
            This process typically takes <strong>24-48 hours</strong>. We will
            notify you via email once your business is verified.
          </p>

          <div className="bg-surface-secondary border border-border-primary rounded-2xl p-4 text-sm font-bold text-text-secondary flex items-center justify-center gap-2 mb-10">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            Your Dashboard is locked during this period.
          </div>

          <button
            onClick={() => navigate("/")}
            className="text-sm font-bold text-text-primary hover:text-emerald-500 transition-colors"
          >
            Return to Homepage
          </button>
        </div>
      </div>

      {/* DEV SIMULATOR BUTTON */}
      <button
        onClick={() => navigate("/owner-dashboard")}
        className="fixed bottom-6 right-6 flex items-center gap-2 bg-emerald-500 text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
      >
        [Dev] Simulate Admin Approval <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default VerificationPendingPage;

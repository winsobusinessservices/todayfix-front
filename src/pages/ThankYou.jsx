import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router";

const ThankYou = () => {
  const location = useLocation();

  // No tracking code here to prevent double-firing! 
  // Tracking is handled exactly at the moment of submission in EnquiryLanding and BookingDrawer.

  return (
    <div className="min-h-[80vh] bg-surface-primary flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface-secondary rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border-primary text-center">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>

        <h1 className="text-3xl font-black text-text-primary tracking-tight mb-4">
          Thank You!
        </h1>

        <p className="text-zinc-500 mb-8 font-medium leading-relaxed">
          Your request has been successfully processed. We appreciate your
          interest and will get back to you shortly.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 w-full bg-text-primary text-surface-primary font-bold py-3.5 px-6 rounded-xl hover:opacity-90 transition-opacity shadow-sm"
        >
          Back to Home
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;

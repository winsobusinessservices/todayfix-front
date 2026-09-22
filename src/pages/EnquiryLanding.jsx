import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Phone,
  MessageCircle,
} from "lucide-react";
import toast from "react-hot-toast";

const EnquiryLanding = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDirectContact = (type) => {
    // Fire Google Ads Conversion
    // if (typeof window !== "undefined") {
    //   console.log(`Firing Google Ads Conversion from ${type} button...`);

    //   window.dataLayer = window.dataLayer || [];
    //   window.dataLayer.push({
    //     event: "conversion",
    //     send_to: "AW-18422514526/Ry8GCIHp6IAdEN6GxdBE",
    //   });

    //   if (typeof window.gtag === "function") {
    //     window.gtag("event", "conversion", {
    //       send_to: "AW-18422514526/Ry8GCIHp6IAdEN6GxdBE",
    //     });
    //   }
    // }

    // After firing conversion, perform the action
    // if (type === "whatsapp") {
    //   window.open("https://wa.me/", "_blank");
    // } else if (type === "call") {
    //   window.location.href = "tel:+";
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Connect this to a real backend API when ready
    // Simulate API call delay for now
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Fire Google Ads Conversion
    // if (typeof window !== "undefined") {
    //   console.log("Firing Google Ads Conversion from Enquiry Form...");

    //   // Using dataLayer push
    //   window.dataLayer = window.dataLayer || [];
    //   window.dataLayer.push({
    //     event: "conversion",
    //     send_to: "AW-18422514526/Ry8GCIHp6IAdEN6GxdBE",
    //   });

    //   // Fallback direct gtag
    //   if (typeof window.gtag === "function") {
    //     window.gtag("event", "conversion", {
    //       send_to: "AW-18422514526/Ry8GCIHp6IAdEN6GxdBE",
    //     });
    //   }
    // }

    toast.success("Enquiry submitted successfully!");
    setIsSubmitting(false);

    // Send them to the success page
    navigate("/thank-you");
  };

  return (
    <div className="min-h-screen bg-surface-primary flex flex-col md:flex-row">
      {/* Left Side: Guide Info */}
      <div className="flex-1 bg-surface-dark p-8 md:p-16 lg:p-24 flex flex-col justify-center relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-primary/10 border border-surface-primary/20 text-text-inverted text-sm font-bold mb-6 backdrop-blur-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Simple 3-Step Process
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-text-inverted tracking-tight leading-[1.1] mb-6">
            How to book a service on{" "}
            <span className="text-brand-dark">TodayFix.</span>
          </h1>
          <p className="text-lg text-text-inverted/70 font-medium mb-12 leading-relaxed">
            Skip the hassle of calling around. Our platform connects you with
            the best local professionals instantly. Here is how it works:
          </p>

          <div className="space-y-8 relative">
            {/* Connecting line */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-surface-primary/10"></div>

            <div className="flex items-start gap-5 relative z-10">
              <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center shrink-0 font-black text-surface-primary text-xl shadow-[0_0_15px_rgba(var(--brand-primary-rgb),0.5)]">
                1
              </div>
              <div className="pt-2">
                <h3 className="text-text-inverted font-bold text-xl mb-2">
                  Submit your request
                </h3>
                <p className="text-text-inverted/60 text-sm leading-relaxed">
                  Fill out the form on this page with your details and what you
                  need help with. It takes less than 30 seconds.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 relative z-10">
              <div className="w-12 h-12 rounded-full bg-surface-primary/10 border border-surface-primary/20 flex items-center justify-center shrink-0 font-black text-text-inverted text-xl backdrop-blur-sm">
                2
              </div>
              <div className="pt-2">
                <h3 className="text-text-inverted font-bold text-xl mb-2">
                  Get Matched Instantly
                </h3>
                <p className="text-text-inverted/60 text-sm leading-relaxed">
                  Our smart system broadcasts your request to verified,
                  background-checked professionals in your exact area.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 relative z-10">
              <div className="w-12 h-12 rounded-full bg-surface-primary/10 border border-surface-primary/20 flex items-center justify-center shrink-0 font-black text-text-inverted text-xl backdrop-blur-sm">
                3
              </div>
              <div className="pt-2">
                <h3 className="text-text-inverted font-bold text-xl mb-2">
                  Job Done
                </h3>
                <p className="text-text-inverted/60 text-sm leading-relaxed">
                  A trusted professional arrives at your doorstep to complete
                  the job with upfront, transparent pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-16 relative">
        <div className="w-full max-w-md bg-surface-secondary rounded-[2rem] p-8 shadow-2xl border border-border-primary relative z-10">
          <h2 className="text-2xl font-black text-text-primary mb-2">
            Request a Service
          </h2>
          <p className="text-text-secondary text-sm font-medium mb-8">
            Enter your details below and we'll reach out immediately.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                Full Name
              </label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-surface-primary border border-border-primary rounded-xl px-4 py-3.5 text-sm font-semibold text-text-primary focus:border-brand-primary outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                Phone Number
              </label>
              <input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                pattern="[0-9]{10}"
                className="w-full bg-surface-primary border border-border-primary rounded-xl px-4 py-3.5 text-sm font-semibold text-text-primary focus:border-brand-primary outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                Service Needed
              </label>
              <select
                required
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full bg-surface-primary border border-border-primary rounded-xl px-4 py-3.5 text-sm font-semibold text-text-primary focus:border-brand-primary outline-none transition-colors appearance-none"
              >
                <option value="" disabled>
                  Select a service...
                </option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Carpentry">Carpentry</option>
                <option value="Cleaning">Home Cleaning</option>
                <option value="Appliance Repair">Appliance Repair</option>
                <option value="Painting">Painting</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                Additional Details (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Briefly describe what you need help with..."
                rows={3}
                className="w-full bg-surface-primary border border-border-primary rounded-xl px-4 py-3.5 text-sm font-semibold text-text-primary focus:border-brand-primary outline-none transition-colors resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary bg-text-primary text-surface-primary py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 mt-4"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-surface-primary border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  Get Started Now
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
          <div className="mt-8 pt-8 border-t border-border-primary">
            <p className="text-center text-sm font-bold text-text-secondary mb-4 uppercase tracking-wider">
              Or contact us directly
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleDirectContact("whatsapp")}
                type="button"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/20"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </button>
              <button
                onClick={() => handleDirectContact("call")}
                type="button"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition-colors border border-blue-500/20"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-text-muted mt-6 font-medium">
            By submitting, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnquiryLanding;

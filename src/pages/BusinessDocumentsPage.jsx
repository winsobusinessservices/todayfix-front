import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ShieldCheck, UploadCloud, FileText } from "lucide-react";

const BusinessDocumentsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const providerType = location.state?.providerType || "business"; // Fallback to business

  const [govId, setGovId] = useState(null);
  const [license, setLicense] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/verification-pending");
  };

  return (
    <div className="bg-surface-secondary min-h-screen font-sans pb-20">
      {/* Header */}
      <div className="bg-surface-dark pt-20 pb-24 px-6 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-surface-primary/10 border border-white/20 text-text-inverted text-xs font-bold uppercase tracking-widest rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Step 2 of 2
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Verify Your Identity
          </h1>
          <p className="text-zinc-400 text-lg font-medium max-w-xl mx-auto">
            To maintain a high-trust marketplace, we require valid government ID
            and business registration documents.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-6 -mt-12 relative z-20">
        <form
          onSubmit={handleSubmit}
          className="bg-surface-primary rounded-3xl p-8 md:p-12 shadow-2xl border border-border-primary space-y-8"
        >
          <div>
            <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">
              Government ID (Aadhar/PAN/Passport){" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-border-secondary rounded-2xl p-8 text-center hover:bg-surface-secondary transition-colors cursor-pointer group">
              <input
                type="file"
                required
                className="hidden"
                id="govId"
                onChange={(e) => setGovId(e.target.files[0])}
              />
              <label
                htmlFor="govId"
                className="cursor-pointer flex flex-col items-center"
              >
                {govId ? (
                  <>
                    <FileText className="w-10 h-10 text-emerald-500 mb-3" />
                    <span className="font-bold text-text-primary">
                      {govId.name}
                    </span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-10 h-10 text-zinc-400 mb-3 group-hover:text-text-primary transition-colors" />
                    <span className="font-bold text-text-primary mb-1">
                      Upload ID Proof
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">
                      PDF, JPG, PNG (Max 5MB)
                    </span>
                  </>
                )}
              </label>
            </div>
          </div>

          {providerType === "business" && (
            <div>
              <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">
                Business Registration / Trade License
              </label>
              <div className="border-2 border-dashed border-border-secondary rounded-2xl p-8 text-center hover:bg-surface-secondary transition-colors cursor-pointer group">
                <input
                  type="file"
                  className="hidden"
                  id="license"
                  onChange={(e) => setLicense(e.target.files[0])}
                />
                <label
                  htmlFor="license"
                  className="cursor-pointer flex flex-col items-center"
                >
                  {license ? (
                    <>
                      <FileText className="w-10 h-10 text-emerald-500 mb-3" />
                      <span className="font-bold text-text-primary">
                        {license.name}
                      </span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-10 h-10 text-zinc-400 mb-3 group-hover:text-text-primary transition-colors" />
                      <span className="font-bold text-text-primary mb-1">
                        Upload License
                      </span>
                      <span className="text-xs text-zinc-500 font-medium">
                        GST / MSME / Trade License
                      </span>
                    </>
                  )}
                </label>
              </div>
            </div>
          )}

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-emerald-600/90 leading-relaxed">
              Your documents are securely encrypted and only accessible by our
              verification team. They will never be shared with customers.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-surface-dark text-text-inverted font-black text-lg py-5 rounded-xl hover:scale-[0.98] transition-transform shadow-xl"
          >
            Submit for Verification
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusinessDocumentsPage;

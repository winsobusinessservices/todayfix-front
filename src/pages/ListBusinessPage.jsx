import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import CustomDropdown from "../components/ui/CustomDropdown";
import SEO from "../components/seo/SEO";
import { useCategoryStore } from "../store/categoryStore";
import MapPicker from "../components/modals/MapPicker";

const ListBusinessPage = () => {
  const navigate = useNavigate();
  const [providerType, setProviderType] = useState("COMPANY"); // "COMPANY" | "INDIVIDUAL" | "INVESTOR"
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [website, setWebsite] = useState("");

  // Bank Details
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");

  const [errors, setErrors] = useState("");

  // Get categories from the Zustand store (already fetched on app load)
  const categoriesData = useCategoryStore((state) => state.categories);

  const categoryOptions = useMemo(() => {
    const list = Array.isArray(categoriesData) ? categoriesData : [];
    return list.filter((c) => c.is_active).map((c) => c.name);
  }, [categoriesData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    // --- Validations ---
    if (!category) {
      setErrors("Please select a business category.");
      window.scrollTo(0, 0);
      return;
    }

    if (!location.trim()) {
      setErrors("Please enter your business location.");
      window.scrollTo(0, 0);
      return;
    }

    if (!accountHolderName.trim()) {
      setErrors("Account holder name is required.");
      window.scrollTo(0, 0);
      return;
    }

    const cleanAccount = accountNumber.trim();
    if (!/^\d{9,18}$/.test(cleanAccount)) {
      setErrors("Account number must contain between 9 and 18 digits.");
      window.scrollTo(0, 0);
      return;
    }

    const cleanIfsc = ifscCode.trim().toUpperCase();
    if (cleanIfsc.length !== 11 || cleanIfsc[4] !== "0") {
      setErrors(
        "Enter a valid 11-character IFSC code (5th character must be '0').",
      );
      window.scrollTo(0, 0);
      return;
    }

    if (!bankName.trim()) {
      setErrors("Bank name is required.");
      window.scrollTo(0, 0);
      return;
    }

    const payload = {
      business_type: providerType,
      category,
      location: location.trim(),
      website: website.trim(),
      account_holder_name: accountHolderName.trim(),
      account_number: cleanAccount,
      ifsc_code: cleanIfsc,
      bank_name: bankName.trim(),
      branch_name: branchName.trim(),
    };

    localStorage.setItem("businessAppDetails", JSON.stringify(payload));
    navigate("/list-business/documents", { state: { providerType } });
  };

  return (
    <div className="bg-surface-secondary font-sans pb-10">
      <SEO
        title="List Your Business | TodayFix"
        description="Join thousands of premium professionals on TodayFix. List your services, get verified, and grow your business today."
      />
      {/* --- Header --- */}
      <div className="relative overflow-hidden border-b border-border-secondary bg-gradient-to-br from-brand-background via-surface-primary to-surface-accent px-6 pb-36 pt-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, var(--color-brand-primary) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        ></div>
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/15 blur-[120px]"></div>
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-accent/15 blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-soft bg-surface-primary/75 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-text-brand shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Partner Onboarding
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tight leading-tight">
            List your business on <span className="opacity-80">Todayfix</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-medium text-text-secondary md:text-xl">
            Join thousands of premium professionals. Fill out the details below
            to get your verified, cinematic profile live in minutes.
          </p>
        </div>
      </div>

      {/* --- Form Container --- */}
      <div className="max-w-4xl mx-auto px-6 -mt-24 relative z-20">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECTION 1: Basic Information */}
          {errors && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-500/25 bg-red-500/10 p-4 text-red-700 dark:text-red-300">
              <span className="font-medium text-sm">{errors}</span>
            </div>
          )}
          <div className="bg-surface-primary rounded-xl p-8 md:p-12 shadow-2xl shadow-black/5 border border-border-primary">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 flex items-center gap-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-dark text-text-inverted text-sm font-black shadow-inner">
                1
              </span>
              Business Details
            </h2>

            {/* Provider Type Selection */}
            <div className="mb-10">
              <label className="block text-sm font-bold text-text-secondary mb-4 uppercase tracking-wide">
                I am signing up as a...
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setProviderType("COMPANY")}
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${providerType === "COMPANY" ? "border-brand-primary bg-surface-accent shadow-md" : "border-border-secondary bg-surface-primary hover:border-brand-soft"}`}
                >
                  <span
                    className={`font-bold text-lg ${providerType === "COMPANY" ? "text-text-primary" : "text-text-secondary"}`}
                  >
                    Company
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setProviderType("INDIVIDUAL")}
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${providerType === "INDIVIDUAL" ? "border-brand-primary bg-surface-accent shadow-md" : "border-border-secondary bg-surface-primary hover:border-brand-soft"}`}
                >
                  <span
                    className={`font-bold text-lg ${providerType === "INDIVIDUAL" ? "text-text-primary" : "text-text-secondary"}`}
                  >
                    Individual
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setProviderType("INVESTOR")}
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${providerType === "INVESTOR" ? "border-brand-primary bg-surface-accent shadow-md" : "border-border-secondary bg-surface-primary hover:border-brand-soft"}`}
                >
                  <span
                    className={`font-bold text-lg ${providerType === "INVESTOR" ? "text-text-primary" : "text-text-secondary"}`}
                  >
                    Investor
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <CustomDropdown
                    options={categoryOptions}
                    value={category}
                    onChange={setCategory}
                    placeholder="Select Category"
                    variant="dark"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">
                  Website URL
                </label>
                <input
                  type="url"
                  placeholder="https://www.example.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full bg-surface-secondary border border-border-secondary text-text-primary rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all font-medium placeholder:text-text-muted"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Location */}
          <div className="bg-surface-primary rounded-xl p-8 md:p-12 shadow-2xl shadow-black/5 border border-border-primary">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 flex items-center gap-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-dark text-text-inverted text-sm font-black shadow-inner">
                2
              </span>
              Location Details
            </h2>

              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">
                  Location <span className="text-red-500">*</span>
                </label>
                {location && location.includes("<iframe") ? (
                  <div className="relative">
                    <div
                      className="w-full h-40 rounded-xl overflow-hidden border border-border-primary"
                      dangerouslySetInnerHTML={{
                        __html: location.replace('height="300"', 'height="100%"'),
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setIsMapOpen(true)}
                      className="absolute bottom-2 right-2 px-3 py-1.5 bg-surface-primary/90 backdrop-blur-sm border border-border-primary text-text-primary text-xs font-bold rounded-lg shadow-sm hover:bg-surface-secondary transition-colors"
                    >
                      Change Location
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsMapOpen(true)}
                    className="w-full text-left bg-surface-secondary border border-border-secondary text-text-primary rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all font-medium placeholder:text-text-muted hover:border-brand-soft"
                  >
                    Select your business location on map
                  </button>
                )}
                <p className="text-xs text-text-muted mt-2 font-medium">
                  Choose your business location precisely using the map. This is required for customers to find you.
                </p>
              </div>
          </div>
          
          <MapPicker
            isOpen={isMapOpen}
            onClose={() => setIsMapOpen(false)}
            onConfirm={(iframeString) => setLocation(iframeString)}
          />

          {/* SECTION 3: Bank Details */}
          <div className="bg-surface-primary rounded-xl p-8 md:p-12 shadow-2xl shadow-black/5 border border-border-primary">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 flex items-center gap-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-dark text-text-inverted text-sm font-black shadow-inner">
                3
              </span>
              Bank Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">
                  Account Holder Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={accountHolderName}
                  onChange={(e) => setAccountHolderName(e.target.value)}
                  className="w-full bg-surface-secondary border border-border-secondary text-text-primary rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">
                  Account Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full bg-surface-secondary border border-border-secondary text-text-primary rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">
                  IFSC Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={ifscCode}
                  onChange={(e) => setIfscCode(e.target.value)}
                  className="w-full bg-surface-secondary border border-border-secondary text-text-primary rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all font-medium uppercase"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">
                  Bank Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full bg-surface-secondary border border-border-secondary text-text-primary rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">
                  Branch Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  className="w-full bg-surface-secondary border border-border-secondary text-text-primary rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all font-medium"
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-8 pb-10">
            <button
              type="submit"
              className="btn-primary w-full font-black text-xl py-6 rounded-xl transition-all shadow-xl active:scale-[0.98]"
            >
              Next: Upload Documents
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListBusinessPage;

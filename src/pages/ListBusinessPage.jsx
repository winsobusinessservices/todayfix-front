import React, { useState } from "react";
import { useNavigate } from "react-router";
import CustomDropdown from "../components/ui/CustomDropdown";
import { categoryApi } from "../services/categoryApi";
import { api } from "../api";
import SEO from "../components/seo/SEO";

const ListBusinessPage = () => {
  const navigate = useNavigate();
  const [providerType, setProviderType] = useState("COMPANY"); // "COMPANY" | "INDIVIDUAL" | "INVESTOR"
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("Bengaluru");
  const [website, setWebsite] = useState("");

  // Bank Details
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");

  const [errors, setErrors] = useState("");
  const [servicesData, setServicesData] = useState([]);
  const [areasData, setAreasData] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, areasRes] = await Promise.all([
          categoryApi.getCategories(),
          api.getAreas()
        ]);
        setServicesData(servicesRes.map(s => s.name));
        setAreasData(areasRes.map(a => a.name));
      } catch (error) {
        console.error("Failed to fetch initial data", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    // Validation matching backend constraints
    const cleanAccount = accountNumber.trim();
    if (!/^\d{9,18}$/.test(cleanAccount)) {
      setErrors("Account number must contain between 9 and 18 digits.");
      window.scrollTo(0, 0);
      return;
    }

    const cleanIfsc = ifscCode.trim().toUpperCase();
    if (cleanIfsc.length !== 11 || cleanIfsc[4] !== "0") {
      setErrors("Enter a valid 11-character IFSC code (5th character must be '0').");
      window.scrollTo(0, 0);
      return;
    }

    const payload = {
      business_type: providerType,
      category,
      location: `${address}, ${area}`,
      website,
      account_holder_name: accountHolderName,
      account_number: cleanAccount,
      ifsc_code: cleanIfsc,
      bank_name: bankName,
      branch_name: branchName,
    };

    localStorage.setItem("businessAppDetails", JSON.stringify(payload));
    navigate("/list-business/documents", { state: { providerType } });
  };

  const serviceOptions = servicesData.length > 0 ? servicesData : ["Interior Design"];
  const areas = areasData.length > 0 ? areasData : ["Indiranagar"];

  return (
    <div className="bg-surface-secondary font-sans pb-10">
      <SEO 
        title="List Your Business | TodayFix"
        description="Join thousands of premium professionals on TodayFix. List your services, get verified, and grow your business today."
      />
      {/* --- Header --- */}
      <div className="bg-surface-dark pt-20 pb-36 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-surface-primary/10 border border-white/20 text-text-inverted text-xs font-bold uppercase tracking-widest rounded-full backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Partner Onboarding
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            List your business on <span className="opacity-80">Todayfix</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
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
            <div className="bg-red-500/10 border border-red-500/20 text-red-600 rounded-2xl p-4 mb-6 flex items-start gap-3">
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
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${providerType === "COMPANY" ? "border-text-primary bg-surface-secondary shadow-md" : "border-border-secondary bg-surface-primary hover:border-text-primary/50"}`}
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
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${providerType === "INDIVIDUAL" ? "border-text-primary bg-surface-secondary shadow-md" : "border-border-secondary bg-surface-primary hover:border-text-primary/50"}`}
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
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${providerType === "INVESTOR" ? "border-text-primary bg-surface-secondary shadow-md" : "border-border-secondary bg-surface-primary hover:border-text-primary/50"}`}
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
                  Category <span className="text-text-primary">*</span>
                </label>
                <div className="relative">
                  <CustomDropdown
                    options={serviceOptions}
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
                  className="w-full bg-surface-secondary border border-border-secondary text-text-primary rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-text-primary focus:border-text-primary transition-all font-medium placeholder-zinc-400"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">
                  Full Address <span className="text-text-primary">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Street address, building, company..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-surface-secondary border border-border-secondary text-text-primary rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-text-primary focus:border-text-primary transition-all font-medium placeholder-zinc-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">
                  City
                </label>
                <CustomDropdown
                  options={["Bengaluru"]}
                  value={city}
                  onChange={setCity}
                  placeholder="Select City"
                  variant="dark"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">
                  Area
                </label>
                <CustomDropdown
                  options={areas}
                  value={area}
                  onChange={setArea}
                  placeholder="Any Area"
                  variant="dark"
                />
              </div>
            </div>
          </div>

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
                  Account Holder Name <span className="text-text-primary">*</span>
                </label>
                <input
                  type="text"
                  value={accountHolderName}
                  onChange={(e) => setAccountHolderName(e.target.value)}
                  className="w-full bg-surface-secondary border border-border-secondary text-text-primary rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-text-primary transition-all font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">
                  Account Number <span className="text-text-primary">*</span>
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full bg-surface-secondary border border-border-secondary text-text-primary rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-text-primary transition-all font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">
                  IFSC Code <span className="text-text-primary">*</span>
                </label>
                <input
                  type="text"
                  value={ifscCode}
                  onChange={(e) => setIfscCode(e.target.value)}
                  className="w-full bg-surface-secondary border border-border-secondary text-text-primary rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-text-primary transition-all font-medium uppercase"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">
                  Bank Name <span className="text-text-primary">*</span>
                </label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full bg-surface-secondary border border-border-secondary text-text-primary rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-text-primary transition-all font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">
                  Branch Name
                </label>
                <input
                  type="text"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  className="w-full bg-surface-secondary border border-border-secondary text-text-primary rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-text-primary transition-all font-medium"
                />
              </div>
            </div>
          </div>

          <div className="pt-8 pb-10">
            <button
              type="submit"
              className="w-full bg-surface-dark text-text-inverted font-black text-xl py-6 rounded-xl hover:bg-zinc-800 transition-all shadow-xl active:scale-[0.98]"
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

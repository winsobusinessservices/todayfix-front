import React, { useState } from "react";
import { useNavigate } from "react-router";
import CustomDropdown from "../components/ui/CustomDropdown";
import { Map } from "lucide-react";
import { api } from "../api";
import SEO from "../components/seo/SEO";

const ListBusinessPage = () => {
  const navigate = useNavigate();
  const [providerType, setProviderType] = useState("business"); // "business" | "individual"
  const [services, setServices] = useState([{ name: "", price: "" }]);
  const [businessName, setBusinessName] = useState("");
  const [service, setService] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [googleMapEmbed, setGoogleMapEmbed] = useState("");

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const [errors, setErrors] = useState("");
  const [servicesData, setServicesData] = useState([]);
  const [areasData, setAreasData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, areasRes] = await Promise.all([
          api.getServices(),
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

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);

    if (type === "logo") {
      setLogoFile(file);
      setLogoPreview(url);
    } else if (type === "cover") {
      setCoverFile(file);
      setCoverPreview(url);
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setGalleryFiles([...galleryFiles, ...files]);
    setGalleryPreviews([...galleryPreviews, ...newPreviews]);
  };

  const handleAddService = () => {
    setServices([...services, { name: "", price: "" }]);
  };

  const handleRemoveService = (index) => {
    const newServices = services.filter((_, i) => i !== index);
    setServices(newServices);
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      providerType,
      name: businessName,
      service,
      phone,
      email,
      website,
      description: about,
      location: `${address}, ${area}`,
      // mock document processing
      documents: ["document_pending.pdf"],
    };
    try {
      await api.registerVendor(payload);
      navigate("/list-business/documents", { state: { providerType } });
    } catch (error) {
      console.error("Failed to register vendor:", error);
      setErrors("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
        {/* Subtle grid pattern for premium tech feel */}
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
          <div className="bg-surface-primary rounded-xl p-8 md:p-12 shadow-2xl shadow-black/5 border border-border-primary">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 flex items-center gap-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-dark text-text-inverted text-sm font-black shadow-inner">
                1
              </span>
              Basic Information
            </h2>

            {/* Provider Type Selection */}
            <div className="mb-10">
              <label className="block text-sm font-bold text-text-secondary mb-4 uppercase tracking-wide">
                I am signing up as a...
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setProviderType("business")}
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${providerType === "business" ? "border-text-primary bg-surface-secondary shadow-md" : "border-border-secondary bg-surface-primary hover:border-text-primary/50"}`}
                >
                  <svg
                    className={`w-8 h-8 mb-2 ${providerType === "business" ? "text-text-primary" : "text-text-muted"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <span
                    className={`font-bold text-lg ${providerType === "business" ? "text-text-primary" : "text-text-secondary"}`}
                  >
                    Registered Business
                  </span>
                  <span className="text-xs text-text-muted mt-1 font-medium">
                    Company or Agency
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setProviderType("individual")}
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${providerType === "individual" ? "border-text-primary bg-surface-secondary shadow-md" : "border-border-secondary bg-surface-primary hover:border-text-primary/50"}`}
                >
                  <svg
                    className={`w-8 h-8 mb-2 ${providerType === "individual" ? "text-text-primary" : "text-text-muted"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span
                    className={`font-bold text-lg ${providerType === "individual" ? "text-text-primary" : "text-text-secondary"}`}
                  >
                    Individual Professional
                  </span>
                  <span className="text-xs text-text-muted mt-1 font-medium">
                    Freelancer (Solo)
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">
                  {providerType === "business"
                    ? "Business Name"
                    : "Your Full Name"}{" "}
                  <span className="text-text-primary">*</span>
                </label>
                <input
                  type="text"
                  placeholder={
                    providerType === "business"
                      ? "e.g. Aura Spaces Interior Design"
                      : "e.g. John Doe"
                  }
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-surface-secondary border border-border-secondary text-text-primary rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-text-primary focus:border-text-primary transition-all font-medium placeholder-zinc-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">
                  Service <span className="text-text-primary">*</span>
                </label>
                <div className="relative">
                  <CustomDropdown
                    options={serviceOptions}
                    value={service}
                    onChange={setService}
                    placeholder="Any Service"
                    variant="dark"
                    icon={
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        />
                      </svg>
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">
                  Phone Number <span className="text-text-primary">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 9123456789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-surface-secondary border border-border-secondary text-text-primary rounded-2xl px-5 py-1.5 focus:outline-none focus:ring-2 focus:ring-text-primary focus:border-text-primary transition-all font-medium placeholder-zinc-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">
                  Email <span className="text-text-primary">*</span>
                </label>
                <input
                  type="email"
                  placeholder="example@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-secondary border border-border-secondary text-text-primary rounded-2xl px-5 py-1.5 focus:outline-none focus:ring-2 focus:ring-text-primary focus:border-text-primary transition-all font-medium placeholder-zinc-400"
                  required
                />
              </div>

              {/* {providerType === "business" && ( */}
              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">
                  Website URL
                </label>
                <input
                  type="url"
                  placeholder="https://www.example.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full bg-surface-secondary border border-border-secondary text-text-primary rounded-2xl px-5 py-1.5 focus:outline-none focus:ring-2 focus:ring-text-primary focus:border-text-primary transition-all font-medium placeholder-zinc-400"
                  required={providerType === "business"}
                />
              </div>
              {/* )} */}

              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">
                  About the Business
                </label>
                <textarea
                  rows="4"
                  placeholder="Tell customers about your experience, specialties, and why they should choose you..."
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="w-full bg-surface-secondary border border-border-secondary text-text-primary rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-text-primary focus:border-text-primary transition-all resize-none font-medium placeholder-zinc-400"
                ></textarea>
              </div>
            </div>
          </div>

          {/* SECTION 2: Location & Map */}
          <div className="bg-surface-primary rounded-xl p-8 md:p-12 shadow-2xl shadow-black/5 border border-border-primary">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 flex items-center gap-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-dark text-text-inverted text-sm font-black shadow-inner">
                2
              </span>
              Location Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                  value={""}
                  onChange={() => {}}
                  placeholder="Select City"
                  variant="dark"
                  icon={
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  }
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
                  icon={
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  }
                />
              </div>
            </div>

            {/* Interactive Map Pin Simulator */}
            <div>
              <label className="flex flex-col gap-1 text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">
                <span className="flex items-start gap-1">
                  <Map size={18} className="inline-block mr-1 text-primary" />
                  Google Maps Embed
                </span>
                <span className="text-xs text-text-muted normal-case ml-2">
                  Paste your Google Maps embed code (Go to Google Maps → Share →
                  Embed a map → Copy HTML)
                </span>
              </label>
              <div>
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  <textarea
                    id="googleMapEmbed"
                    className="focus-ring min-h-24 rounded-md border border-line bg-white px-3 py-3 font-mono text-xs text-ink"
                    placeholder='<iframe src="https://www.google.com/maps/embed?..." width="600" height="450" ...></iframe>'
                    value={googleMapEmbed}
                    onChange={(e) => setGoogleMapEmbed(e.target.value)}
                  />
                  {errors ? (
                    <span className="text-xs font-medium text-red-600">
                      {errors}
                    </span>
                  ) : null}
                </label>
                {googleMapEmbed && googleMapEmbed.includes("<iframe") && (
                  <div
                    className="mt-3 overflow-hidden rounded-lg border border-line"
                    dangerouslySetInnerHTML={{
                      __html: googleMapEmbed
                        .replace(/width="[^"]*"/, 'width="100%"')
                        .replace(/height="[^"]*"/, 'height="300"'),
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* SECTION 3: Services & Pricing */}
          <div className="bg-surface-primary rounded-xl p-8 md:p-12 shadow-2xl shadow-black/5 border border-border-primary">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-2 flex items-center gap-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-dark text-text-inverted text-sm font-black shadow-inner">
                3
              </span>
              Services & Pricing
            </h2>
            <p className="text-text-secondary font-medium mb-8 ml-14">
              Add the main services you offer and their starting prices.
            </p>

            <div className="space-y-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center gap-4 bg-surface-secondary p-3 sm:p-4 rounded-[1.5rem] border border-border-secondary transition-all hover:border-text-primary focus-within:border-text-primary"
                >
                  <div className="w-full sm:flex-[2]">
                    <input
                      type="text"
                      placeholder="e.g. Modular Kitchen Setup"
                      value={service.name}
                      onChange={(e) =>
                        handleServiceChange(index, "name", e.target.value)
                      }
                      className="w-full bg-surface-primary border border-border-primary text-text-primary rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-text-primary font-bold placeholder-zinc-400"
                    />
                  </div>
                  <div className="w-full sm:flex-[1]">
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted font-bold">
                        ₹
                      </span>
                      <input
                        type="number"
                        placeholder="Starting price"
                        value={service.price}
                        onChange={(e) =>
                          handleServiceChange(index, "price", e.target.value)
                        }
                        className="w-full bg-surface-primary border border-border-primary text-text-primary rounded-xl pl-10 pr-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-text-primary font-bold placeholder-zinc-400"
                      />
                    </div>
                  </div>
                  {services.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveService(index)}
                      className="w-full sm:w-auto p-3 text-text-muted hover:text-text-inverted hover:bg-surface-dark rounded-xl transition-colors flex justify-center border border-transparent hover:border-surface-dark"
                      title="Remove service"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddService}
              className="mt-6 flex items-center gap-2 text-text-primary font-extrabold text-sm hover:opacity-70 transition-opacity ml-2 uppercase tracking-wide"
            >
              <span className="bg-surface-dark text-text-inverted rounded-full p-1 shadow-md">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </span>
              Add Another Service
            </button>
          </div>

          {/* SECTION 4: Media & Gallery */}
          <div className="bg-surface-primary rounded-xl p-8 md:p-12 shadow-2xl shadow-black/5 border border-border-primary">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-2 flex items-center gap-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-dark text-text-inverted text-sm font-black shadow-inner">
                4
              </span>
              Media & Portfolio
            </h2>
            <p className="text-text-secondary font-medium mb-8 ml-14">
              Upload a profile photo,{" "}
              {providerType === "business" && "a cover image, "} and photos of
              your past work to create a cinematic profile.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile/Logo Upload */}
              <label
                className={
                  providerType === "business"
                    ? "col-span-1 flex flex-col items-center justify-center border-2 border-dashed border-border-secondary rounded-[2rem] bg-surface-secondary p-8 hover:bg-surface-dark hover:border-surface-dark hover:text-text-inverted transition-all cursor-pointer group relative overflow-hidden"
                    : "col-span-1 md:col-span-3 flex flex-col items-center justify-center border-2 border-dashed border-border-secondary rounded-[2rem] bg-surface-secondary p-8 hover:bg-surface-dark hover:border-surface-dark hover:text-text-inverted transition-all cursor-pointer group relative overflow-hidden"
                }
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setLogoFile(e.target.files[0]);
                      setLogoPreview(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                ) : (
                  <>
                    <div className="w-20 h-20 bg-surface-primary rounded-full flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
                      <svg
                        className="w-8 h-8 text-text-muted group-hover:text-text-primary transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                    </div>
                    <span className="text-base font-extrabold group-hover:text-text-inverted transition-colors">
                      {providerType === "business"
                        ? "Upload Logo"
                        : "Upload Profile Photo"}
                    </span>
                    <span className="text-xs text-text-muted mt-2 font-bold uppercase tracking-wider group-hover:text-zinc-400">
                      JPG / PNG (2MB)
                    </span>
                  </>
                )}
              </label>

              {/* Cover Image Upload (Only for Business) */}
              {providerType === "business" && (
                <label className="col-span-1 md:col-span-2 flex flex-col items-center justify-center border-2 border-dashed border-border-secondary rounded-[2rem] bg-surface-secondary p-8 hover:bg-surface-dark hover:border-surface-dark hover:text-text-inverted transition-all cursor-pointer group relative overflow-hidden">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setCoverFile(e.target.files[0]);
                        setCoverPreview(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                  />
                  {coverPreview ? (
                    <img
                      src={coverPreview}
                      alt="Cover Preview"
                      className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center grayscale group-hover:scale-105 transition-transform duration-700"></div>
                      <div className="relative z-10 flex flex-col items-center">
                        <svg
                          className="w-12 h-12 text-text-muted mb-4 group-hover:text-text-inverted transition-colors"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                          />
                        </svg>
                        <span className="text-lg font-extrabold group-hover:text-text-inverted transition-colors">
                          Upload Cover Image
                        </span>
                        <span className="text-sm text-text-muted mt-2 font-semibold group-hover:text-zinc-400">
                          High-res wide image for your banner
                        </span>
                      </div>
                    </>
                  )}
                </label>
              )}

              {/* Gallery Drag & Drop Zone */}
              <label className="col-span-1 md:col-span-3 flex flex-col items-center justify-center border-2 border-dashed border-border-secondary rounded-[2rem] bg-surface-secondary p-12 hover:bg-surface-dark hover:border-surface-dark hover:text-text-inverted transition-all cursor-pointer group min-h-[12rem]">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) {
                      const filesArray = Array.from(e.target.files);
                      setGalleryFiles((prev) => [...prev, ...filesArray]);
                      setGalleryPreviews((prev) => [
                        ...prev,
                        ...filesArray.map((f) => URL.createObjectURL(f)),
                      ]);
                    }
                  }}
                />
                {galleryPreviews.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
                    {galleryPreviews.map((src, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-xl overflow-hidden shadow-md"
                      >
                        <img
                          src={src}
                          alt={`Gallery ${idx}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setGalleryPreviews((prev) =>
                              prev.filter((_, i) => i !== idx),
                            );
                            setGalleryFiles((prev) =>
                              prev.filter((_, i) => i !== idx),
                            );
                          }}
                          className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <div className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-border-secondary text-text-muted hover:text-text-primary hover:border-text-primary transition-colors">
                      <svg
                        className="w-8 h-8 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <span className="text-xs font-bold uppercase">
                        Add More
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <svg
                      className="w-10 h-10 text-text-muted mb-4 group-hover:text-text-inverted transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 6h12M6 12h12m-7 6h7"
                      />
                    </svg>
                    <span className="text-base font-extrabold group-hover:text-text-inverted transition-colors">
                      Drag & drop gallery images
                    </span>
                    <span className="text-xs text-text-muted mt-2 font-bold uppercase tracking-wider group-hover:text-zinc-400">
                      or click to browse from device
                    </span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-8 pb-10">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-surface-dark text-text-inverted font-black text-xl py-6 rounded-xl hover:bg-zinc-800 transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 group relative overflow-hidden disabled:opacity-70"
            >
              {/* Button Hover Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0"></div>

              <span className="relative z-10 flex items-center gap-3">
                {isSubmitting ? "Submitting..." : "Submit Application"}
                {!isSubmitting && (
                  <svg
                    className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                )}
              </span>
            </button>
            <p className="text-center text-text-muted font-semibold text-sm mt-6 max-w-lg mx-auto">
              By submitting, you agree to Todayfix's{" "}
              <a
                href="#"
                className="text-text-primary hover:underline font-bold"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-text-primary hover:underline font-bold"
              >
                Privacy Policy
              </a>
              . Our team will review your application within 24 hours.
            </p>
          </div>
        </form>
      </div>

      {/* Utility Styles */}
      <style>
        {`
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
};

function SectionHeading({ children, className = "" }) {
  return (
    <h2 className={`text-base font-bold text-ink ${className}`}>
      {children}
      <hr className="mt-2 border-line" />
    </h2>
  );
}

function Field({ label, error, children, className = "" }) {
  return (
    <label
      className={`grid gap-2 text-sm font-semibold text-slate-700 ${className}`}
    >
      {label}
      {children}
      {error ? (
        <span className="text-xs font-medium text-red-600">{error}</span>
      ) : null}
    </label>
  );
}

export default ListBusinessPage;

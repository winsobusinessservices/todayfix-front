import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { ShieldCheck, UploadCloud, FileText, AlertCircle } from "lucide-react";
import { submitBusinessApplication } from "../services/userApi";

const FileUpload = ({ id, label, required, file, setFile }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-bold text-text-secondary uppercase tracking-wide">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="border-2 border-dashed border-border-secondary rounded-2xl p-4 text-center hover:bg-surface-secondary transition-colors cursor-pointer group">
      <input
        type="file"
        id={id}
        className="hidden"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <label htmlFor={id} className="cursor-pointer flex flex-col items-center">
        {file ? (
          <>
            <FileText className="w-8 h-8 text-emerald-500 mb-2" />
            <span className="font-bold text-text-primary text-sm truncate max-w-[200px]">{file.name}</span>
          </>
        ) : (
          <>
            <UploadCloud className="w-8 h-8 text-zinc-400 mb-2 group-hover:text-text-primary transition-colors" />
            <span className="text-sm font-bold text-text-primary">Upload File</span>
          </>
        )}
      </label>
    </div>
  </div>
);

const NumberInput = ({ label, required, value, setValue }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-bold text-text-secondary uppercase tracking-wide">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="bg-surface-secondary border border-border-secondary text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-text-primary font-medium"
      placeholder={`Enter ${label}`}
    />
  </div>
);

const BusinessDocumentsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const providerType = location.state?.providerType || "INDIVIDUAL"; 
  const isCompany = providerType === "COMPANY" || providerType === "INVESTOR";

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Identity Docs
  const [panNumber, setPanNumber] = useState("");
  const [panDocument, setPanDocument] = useState(null);
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [aadhaarDocument, setAadhaarDocument] = useState(null);

  // Registrations (Need at least 1 for COMPANY)
  const [gstNumber, setGstNumber] = useState("");
  const [udyamNumber, setUdyamNumber] = useState("");
  const [labourLicenseNumber, setLabourLicenseNumber] = useState("");
  const [bbmpLicenseNumber, setBbmpLicenseNumber] = useState("");
  const [foodLicenseNumber, setFoodLicenseNumber] = useState("");

  // Store photos & bills
  const [internalStorePhoto, setInternalStorePhoto] = useState(null);
  const [externalStorePhoto, setExternalStorePhoto] = useState(null);
  const [cancelledGstBill, setCancelledGstBill] = useState(null);
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    const details = localStorage.getItem("businessAppDetails");
    if (!details) {
      navigate("/list-business");
    }
  }, [navigate]);

  const validate = () => {
    setError("");
    if (panNumber) {
      if (!/^[a-zA-Z]{5}\d{4}[a-zA-Z]{1}$/.test(panNumber)) {
        return "Enter a valid 10-character PAN format (e.g., ABCDE1234F).";
      }
    }
    if (aadhaarNumber) {
      if (!/^\d{12}$/.test(aadhaarNumber)) {
        return "Aadhaar must contain exactly 12 digits.";
      }
    }
    if (gstNumber) {
      if (gstNumber.length !== 15) {
        return "GST number must contain exactly 15 characters.";
      }
    }

    if (!isCompany) {
      // Individual needs AT LEAST one complete pair
      const hasPan = panNumber && panDocument;
      const hasAadhaar = aadhaarNumber && aadhaarDocument;
      if (!hasPan && !hasAadhaar) {
        return "Individual accounts require at least one complete pair of PAN or Aadhaar (Number + Document).";
      }
    } else {
      // Company / Investor
      if (!panNumber || !panDocument) return "PAN Number and Document are mandatory.";
      if (!aadhaarNumber || !aadhaarDocument) return "Aadhaar Number and Document are mandatory.";
      
      const hasRegistration = gstNumber || udyamNumber || labourLicenseNumber || bbmpLicenseNumber || foodLicenseNumber;
      if (!hasRegistration) return "At least one registration number (GST/Udyam/Labour/BBMP/Food) is required.";

      if (!internalStorePhoto) return "Internal store photo is mandatory.";
      if (!externalStorePhoto) return "External store photo is mandatory.";
      if (!cancelledGstBill) return "Cancelled GST bill/book photo is mandatory.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      window.scrollTo(0, 0);
      return;
    }

    setIsSubmitting(true);
    const detailsStr = localStorage.getItem("businessAppDetails");
    const details = JSON.parse(detailsStr || "{}");

    const formData = new FormData();
    Object.keys(details).forEach(key => formData.append(key, details[key]));

    if (panNumber) formData.append("pan_number", panNumber);
    if (panDocument) formData.append("pan_document", panDocument);
    
    if (aadhaarNumber) formData.append("aadhaar_number", aadhaarNumber);
    if (aadhaarDocument) formData.append("aadhaar_document", aadhaarDocument);
    
    if (gstNumber) formData.append("gst_number", gstNumber);
    if (udyamNumber) formData.append("udyam_number", udyamNumber);
    if (labourLicenseNumber) formData.append("labour_license_number", labourLicenseNumber);
    if (bbmpLicenseNumber) formData.append("bbmp_license_number", bbmpLicenseNumber);
    if (foodLicenseNumber) formData.append("food_license_number", foodLicenseNumber);
    
    if (internalStorePhoto) formData.append("internal_store_photo", internalStorePhoto);
    if (externalStorePhoto) formData.append("external_store_photo", externalStorePhoto);
    if (cancelledGstBill) formData.append("cancelled_gst_bill_book_photo", cancelledGstBill);
    if (logo) formData.append("logo", logo);

    try {
      await submitBusinessApplication(formData);
      localStorage.removeItem("businessAppDetails");
      navigate("/verification-pending");
    } catch (err) {
      setError("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface-secondary min-h-screen font-sans pb-20">
      {/* Header */}
      <div className="bg-surface-dark pt-20 pb-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-surface-primary/10 border border-white/20 text-text-inverted text-xs font-bold uppercase tracking-widest rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Step 2 of 2
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Upload Documents
          </h1>
          <p className="text-zinc-400 text-lg font-medium max-w-xl mx-auto">
            Please provide your verification documents. 
            {isCompany ? " Company accounts require additional verifications." : " Individual accounts require at least PAN or Aadhaar."}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-6 -mt-12 relative z-20">
        <form
          onSubmit={handleSubmit}
          className="bg-surface-primary rounded-3xl p-8 md:p-12 shadow-2xl border border-border-primary space-y-10"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-600 rounded-2xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="font-medium text-sm">{error}</p>
            </div>
          )}

          {/* Identity Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-text-primary border-b border-border-secondary pb-2">1. Identity Proof</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <NumberInput label="PAN Number" required={isCompany} value={panNumber} setValue={setPanNumber} />
              <FileUpload id="pan_doc" label="PAN Document" required={isCompany} file={panDocument} setFile={setPanDocument} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <NumberInput label="Aadhaar Number" required={isCompany} value={aadhaarNumber} setValue={setAadhaarNumber} />
              <FileUpload id="aadhaar_doc" label="Aadhaar Document" required={isCompany} file={aadhaarDocument} setFile={setAadhaarDocument} />
            </div>
          </div>

          {/* Registrations (Companies only) */}
          {isCompany && (
            <div className="space-y-6">
              <h3 className="text-xl font-black text-text-primary border-b border-border-secondary pb-2">2. Business Registrations</h3>
              <p className="text-sm text-text-secondary font-medium">Please provide at least ONE of the following:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NumberInput label="GST Number" value={gstNumber} setValue={setGstNumber} />
                <NumberInput label="Udyam Number" value={udyamNumber} setValue={setUdyamNumber} />
                <NumberInput label="Labour License Number" value={labourLicenseNumber} setValue={setLabourLicenseNumber} />
                <NumberInput label="BBMP License Number" value={bbmpLicenseNumber} setValue={setBbmpLicenseNumber} />
                <NumberInput label="Food License Number" value={foodLicenseNumber} setValue={setFoodLicenseNumber} />
              </div>
            </div>
          )}

          {/* Media/Photos (Companies only) */}
          {isCompany && (
            <div className="space-y-6">
              <h3 className="text-xl font-black text-text-primary border-b border-border-secondary pb-2">3. Business Photos & Bills</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FileUpload id="internal_store" label="Internal Store Photo" required={true} file={internalStorePhoto} setFile={setInternalStorePhoto} />
                <FileUpload id="external_store" label="External Store Photo" required={true} file={externalStorePhoto} setFile={setExternalStorePhoto} />
                <FileUpload id="cancelled_bill" label="Cancelled GST Bill/Book" required={true} file={cancelledGstBill} setFile={setCancelledGstBill} />
              </div>
            </div>
          )}

          {/* Logo (Optional) */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-text-primary border-b border-border-secondary pb-2">
              {isCompany ? "4. Branding (Optional)" : "2. Branding (Optional)"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FileUpload id="logo" label="Business Logo" file={logo} setFile={setLogo} />
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-emerald-600/90 leading-relaxed">
              Your documents are securely encrypted and only accessible by our verification team.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-surface-dark text-text-inverted font-black text-lg py-5 rounded-xl hover:scale-[0.98] transition-transform shadow-xl disabled:opacity-70 disabled:hover:scale-100"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusinessDocumentsPage;

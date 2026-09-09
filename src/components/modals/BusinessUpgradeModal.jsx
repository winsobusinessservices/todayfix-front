import React, { useState } from "react";
import { X, Upload, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { businessApi } from "../../services/businessApi";

const BusinessUpgradeModal = ({ isOpen, onClose, currentType }) => {
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    requested_business_type:
      currentType === "INDIVIDUAL" ? "COMPANY" : "INVESTOR",
    keep_employees_and_schedules: true,
  });

  const [documents, setDocuments] = useState({
    pan_document: null,
    aadhaar_document: null,
    internal_store_photo: null,
    external_store_photo: null,
    cancelled_gst_bill_book_photo: null,
  });

  // API Call 1: Create Request
  const createReqMutation = useMutation({
    mutationFn: businessApi.createUpgradeRequest,
  });

  // API Call 2: Upload Documents
  const uploadDocsMutation = useMutation({
    mutationFn: ({ requestId, formData }) =>
      businessApi.uploadUpgradeDocuments(requestId, formData),
  });

  const handleFileChange = (e, fieldName) => {
    if (e.target.files?.[0]) {
      setDocuments((prev) => ({
        ...prev,
        [fieldName]: e.target.files[0],
      }));
    }
  };

  const handleNext = () => setStep(2);

  const handleSubmit = async () => {
    try {
      // 1. Create the Upgrade Request
      const reqResponse = await createReqMutation.mutateAsync(formData);
      const requestId = reqResponse?.data?.business_upgrade_request_uuid;

      if (!requestId) {
        throw new Error("Failed to create request");
      }

      // 2. Upload Documents
      const docsFormData = new FormData();
      Object.entries(documents).forEach(([key, file]) => {
        if (file) docsFormData.append(key, file);
      });

      // If there are files to upload
      let hasFiles = false;
      for (const value of docsFormData.values()) {
        hasFiles = true;
        break;
      }

      if (hasFiles) {
        await uploadDocsMutation.mutateAsync({
          requestId,
          formData: docsFormData,
        });
      }

      // 3. Success -> Invalidate queries & Close
      queryClient.invalidateQueries(["upgrade-requests"]);
      queryClient.invalidateQueries(["docs-data"]);
      onClose();
    } catch (error) {
      console.error("Failed to submit upgrade request:", error);
      alert("Failed to submit request. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-surface-primary border border-border-primary w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border-primary bg-surface-secondary shrink-0">
            <div>
              <h2 className="text-xl font-bold text-text-primary">
                Upgrade Business Account
              </h2>
              <p className="text-sm text-text-secondary mt-1">
                Step {step} of 2:{" "}
                {step === 1 ? "Select Plan" : "Upload Documents"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-text-primary hover:bg-surface-primary rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto styled-scrollbar flex-1">
            {step === 1 ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Select New Business Type
                  </label>
                  <select
                    value={formData.requested_business_type}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        requested_business_type: e.target.value,
                      }))
                    }
                    className="w-full bg-surface-secondary border border-border-primary rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-text-primary transition-colors"
                  >
                    {currentType !== "COMPANY" && (
                      <option value="COMPANY">COMPANY</option>
                    )}
                    {currentType !== "INVESTOR" && (
                      <option value="INVESTOR">INVESTOR</option>
                    )}
                    {currentType !== "INDIVIDUAL" && (
                      <option value="INDIVIDUAL">INDIVIDUAL</option>
                    )}
                  </select>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl border border-border-primary bg-surface-secondary">
                  <input
                    type="checkbox"
                    id="keep_employees"
                    checked={formData.keep_employees_and_schedules}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        keep_employees_and_schedules: e.target.checked,
                      }))
                    }
                    className="mt-1 w-4 h-4 rounded text-text-primary bg-surface-primary border-border-primary focus:ring-text-primary"
                  />
                  <div>
                    <label
                      htmlFor="keep_employees"
                      className="text-sm font-bold text-text-primary cursor-pointer"
                    >
                      Keep Existing Employees & Schedules
                    </label>
                    <p className="text-xs text-text-secondary mt-1">
                      If unchecked, all your current employees and their
                      schedules will be deactivated upon approval.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-text-secondary mb-4">
                  Please provide the required documents for the new business
                  type. (Leave blank if already uploaded and unchanged)
                </p>

                {[
                  { key: "pan_document", label: "PAN Card Document" },
                  { key: "aadhaar_document", label: "Aadhaar Card Document" },
                  {
                    key: "cancelled_gst_bill_book_photo",
                    label: "Cancelled Check / GST / Bill Book",
                  },
                  {
                    key: "internal_store_photo",
                    label: "Internal Store Photo",
                  },
                  {
                    key: "external_store_photo",
                    label: "External Store Photo",
                  },
                ].map(({ key, label }) => (
                  <div
                    key={key}
                    className="border border-border-primary rounded-xl p-4 bg-surface-secondary flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-text-primary">
                        {label}
                      </h4>
                      <p className="text-xs text-text-secondary mt-0.5">
                        {documents[key]
                          ? documents[key].name
                          : "No file selected"}
                      </p>
                    </div>
                    <label className="cursor-pointer bg-surface-primary hover:bg-border-primary border border-border-primary px-4 py-2 rounded-lg text-sm font-medium text-text-primary transition-colors flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Browse
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(e, key)}
                      />
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border-primary bg-surface-secondary flex justify-end gap-3 shrink-0">
            <button
              onClick={step === 1 ? onClose : () => setStep(1)}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-text-primary bg-surface-primary border border-border-primary hover:bg-border-primary transition-colors"
              disabled={
                createReqMutation.isPending || uploadDocsMutation.isPending
              }
            >
              {step === 1 ? "Cancel" : "Back"}
            </button>

            {step === 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-text-primary text-surface-primary hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={
                  createReqMutation.isPending || uploadDocsMutation.isPending
                }
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-text-primary text-surface-primary hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
              >
                {createReqMutation.isPending || uploadDocsMutation.isPending ? (
                  "Submitting..."
                ) : (
                  <>
                    Submit Request <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BusinessUpgradeModal;

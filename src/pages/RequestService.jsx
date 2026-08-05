import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  IndianRupee,
  MapPin,
  Wrench,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CustomDropdown from "../components/CustomDropdown";

const RequestService = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fallbackOptions = [
    "Home : 123 Cross Road - 560038",
    "Work : Block 4, Tech Park - 560066"
  ];

  const address = location.state?.addresses;
  const options = address?.length > 0
    ? address.map((addr) => `${addr.label} : ${addr.street.slice(0, 30)} - ${addr.zip}`)
    : fallbackOptions;
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State structured for easy API submission later
  const [formData, setFormData] = useState({
    serviceCategory: "",
    description: "",
    budget: "",
    generalLocation: options[0],
  });

  // Pre-fill category if navigated from a specific service page
  useEffect(() => {
    if (location.state && location.state.category) {
      setFormData((prev) => ({
        ...prev,
        serviceCategory: location.state.category,
      }));
      setStep(2); // Skip category selection step
    }
  }, [location]);

  const categories = [
    "AC Servicing & Repair",
    "Deep Home Cleaning",
    "Plumbing & Pipes",
    "Electrical Repairs",
    "Pest Control",
    "Painting & Decor",
  ];

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Replace with actual backend API call
      // await api.post('/service-requests', formData);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Mock network delay

      setStep(4); // Success step
    } catch (error) {
      console.error("Failed to submit request", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface-secondary text-text-primary py-4 md:py-12 px-6 font-sans">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => (step > 1 && step < 4 ? handleBack() : navigate(-1))}
            className="flex items-center gap-2 text-zinc-400 hover:text-text-primary mb-6 transition-colors"
          >
            <ArrowLeft size={20} /> Back
          </button>

          {step < 4 && (
            <>
              <h1 className="text-4xl font-black tracking-tight mb-2">
                Request a Service
              </h1>
              <p className="text-zinc-400">Step {step} of 3</p>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-surface-primary rounded-full mt-4 overflow-hidden border border-border-primary">
                <motion.div
                  className="h-full bg-text-primary"
                  initial={{ width: `${((step - 1) / 3) * 100}%` }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </>
          )}
        </div>

        {/* Wizard Content */}
        <div className="bg-surface-primary rounded-2xl border border-border-primary p-8 shadow-2xl shadow-black/5">
          <AnimatePresence mode="wait">
            {/* STEP 1: Category */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Wrench className="text-zinc-400" /> What do you need help
                  with?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setFormData({ ...formData, serviceCategory: cat });
                        handleNext();
                      }}
                      className={`p-4 rounded-xl border text-left font-bold transition-all ${
                        formData.serviceCategory === cat
                          ? "bg-text-primary text-surface-primary border-text-primary shadow-lg scale-[0.98]"
                          : "bg-surface-secondary border-border-primary text-text-primary hover:border-zinc-500 hover:bg-surface-secondary/80"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Details */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6">Describe the issue</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-text-primary mb-2">
                      Description
                    </label>
                    <textarea
                      rows={5}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="e.g., My split AC is not cooling properly and making a loud noise. It's a 1.5 ton Voltas AC."
                      className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-text-primary transition-colors resize-none font-medium"
                    />
                  </div>
                  <button
                    onClick={handleNext}
                    disabled={!formData.description.trim()}
                    className="w-full py-4 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md flex justify-center items-center gap-2 disabled:opacity-50 disabled:hover:scale-100 mt-6"
                  >
                    Continue <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Budget & Location */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  Budget & Location
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-text-primary mb-2">
                      Estimated Budget (₹)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <IndianRupee className="h-5 w-5 text-zinc-500" />
                      </div>
                      <input
                        type="number"
                        required
                        min="100"
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({ ...formData, budget: e.target.value })
                        }
                        placeholder="e.g. 1500"
                        className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl pl-12 pr-4 py-3 font-bold focus:outline-none focus:border-text-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-text-primary mb-2">
                      Location
                    </label>
                    <div className="relative">
                      {/* <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-zinc-500" />
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.generalLocation}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            generalLocation: e.target.value,
                          })
                        }
                        placeholder="e.g. Indiranagar, Bengaluru"
                        className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl pl-12 pr-4 py-3 font-bold focus:outline-none focus:border-text-primary transition-colors"
                      /> */}
                      <CustomDropdown
                        options={options}
                        value={formData.generalLocation}
                        onChange={(val) => setFormData({ ...formData, generalLocation: val })}
                        icon={<MapPin className="h-5 w-5 text-zinc-500" />}
                        variant="transparent"
                      />
                    </div>
                    <p className="text-xs text-zinc-500 mt-2">
                      Vendors will only see your general location until
                      accepted.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !formData.budget ||
                      !formData.generalLocation
                    }
                    className="w-full py-4 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md flex justify-center items-center gap-2 disabled:opacity-50 disabled:hover:scale-100 mt-4"
                  >
                    {isSubmitting ? (
                      <span className="w-6 h-6 border-2 border-text-inverted border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      "Submit Request"
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 4: Success */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-3xl font-black tracking-tight text-text-primary mb-4">
                  Request Sent!
                </h2>
                <p className="text-zinc-400 mb-8 max-w-sm mx-auto">
                  Your request is being reviewed by our admins. It will be
                  broadcasted to verified professionals near you shortly.
                </p>
                <button
                  onClick={() => navigate("/profile")}
                  className="px-8 py-4 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md"
                >
                  Track in Dashboard
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RequestService;

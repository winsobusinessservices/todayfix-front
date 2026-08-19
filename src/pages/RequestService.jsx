import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Info,
  ShieldCheck,
  Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CustomDropdown from "../components/ui/CustomDropdown";
import { api } from "../api";

const serviceMockData = {
  "AC Servicing & Repair": {
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&q=80",
    startingPrice: "Rs. 399",
  },
  "Deep Home Cleaning": {
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=80",
    startingPrice: "Rs. 899",
  },
  "Plumbing & Pipes": {
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80",
    startingPrice: "Rs. 199",
  },
  "Electrical Repairs": {
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&q=80",
    startingPrice: "Rs. 149",
  },
  "Pest Control": {
    image: "https://images.unsplash.com/photo-1598928506311-c55dd2b1d3d7?w=500&q=80",
    startingPrice: "Rs. 799",
  },
  "Painting & Decor": {
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&q=80",
    startingPrice: "Rs. 1499",
  },
  "Interior Design & Renovation": {
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80",
    startingPrice: "Rs. 499",
  }
};

const getServiceDetails = (category) => {
  return serviceMockData[category] || {
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=80",
    startingPrice: "Rs. 499"
  };
};

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
  const [categories, setCategories] = useState(Object.keys(serviceMockData));
  const [bookingId, setBookingId] = useState("");

  // Expand form data to include new fields
  const [formData, setFormData] = useState({
    serviceCategory: "",
    date: "",
    time: "",
    description: "",
    generalLocation: options[0],
  });

  useEffect(() => {
    // If coming from a specific service page, pre-fill category
    if (location.state && location.state.category) {
      setFormData((prev) => ({
        ...prev,
        serviceCategory: location.state.category,
      }));
    }
  }, [location]);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Generate a mock booking ID
      const randomId = "TF-" + Math.random().toString(36).substr(2, 6).toUpperCase();
      setBookingId(randomId);
      
      setStep(3); // Success step
    } catch (error) {
      console.error("Failed to submit request", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedServiceDetails = useMemo(() => {
    if (!formData.serviceCategory) return null;
    return getServiceDetails(formData.serviceCategory);
  }, [formData.serviceCategory]);

  return (
    <div className="min-h-screen bg-surface-secondary text-text-primary py-8 md:py-12 px-4 md:px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => (step > 1 && step < 3 ? handleBack() : navigate(-1))}
            className="flex items-center gap-2 text-zinc-500 hover:text-text-primary mb-6 transition-colors font-semibold"
          >
            <ArrowLeft size={20} /> Back
          </button>

          {step < 3 && (
            <>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 text-text-primary">
                Book a Service
              </h1>
              <p className="text-zinc-500 font-medium">Step {step} of 2</p>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-surface-primary rounded-full mt-4 overflow-hidden border border-border-primary">
                <motion.div
                  className="h-full bg-text-primary"
                  initial={{ width: `${((step - 1) / 2) * 100}%` }}
                  animate={{ width: `${(step / 2) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </>
          )}
        </div>

        {step === 3 ? (
          // STEP 3: Confirmation View (Full Width)
          <div className="bg-surface-primary rounded-3xl border border-border-primary p-8 md:p-16 shadow-2xl shadow-black/5 max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-green-100">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-text-primary mb-4">
                Booking Confirmed!
              </h2>
              <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto">
                Your request for <span className="font-bold text-text-primary">{formData.serviceCategory}</span> has been successfully placed.
              </p>
              
              <div className="bg-surface-secondary rounded-2xl p-6 mb-8 border border-border-primary flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider font-bold mb-1">Booking ID</p>
                  <p className="text-xl font-extrabold text-text-primary">{bookingId}</p>
                </div>
                <div className="hidden md:block w-px h-12 bg-border-primary"></div>
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider font-bold mb-1">Scheduled For</p>
                  <p className="text-lg font-bold text-text-primary">{formData.date} at {formData.time}</p>
                </div>
              </div>

              <button
                onClick={() => navigate("/")}
                className="px-8 py-4 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-lg shadow-black/10"
              >
                Go to Homepage
              </button>
            </motion.div>
          </div>
        ) : (
          // Two-Column Layout for Steps 1 & 2
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left Column: Wizard Steps */}
            <div className="flex-1 w-full bg-surface-primary rounded-3xl border border-border-primary p-6 md:p-8 shadow-xl shadow-black/5">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: Service Details (Category, Date, Time, Description) */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-text-primary">
                        <Info className="text-text-primary" /> Service Details
                      </h2>
                      
                      {/* Service Category Selection */}
                      <div className="mb-6">
                        <label className="block text-sm font-bold text-text-secondary mb-3">
                          Select Service Type
                        </label>
                        <CustomDropdown
                          options={categories}
                          value={formData.serviceCategory}
                          onChange={(val) => setFormData({ ...formData, serviceCategory: val })}
                          placeholder="Choose a service"
                        />
                      </div>
                      
                      {/* Date & Time Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-bold text-text-secondary mb-3">
                            Select Date
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            <input 
                              type="date"
                              required
                              value={formData.date}
                              onChange={(e) => setFormData({...formData, date: e.target.value})}
                              className="w-full bg-surface-secondary border border-border-primary rounded-xl py-3 pl-12 pr-4 font-semibold text-text-primary focus:outline-none focus:border-text-primary transition-colors"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-text-secondary mb-3">
                            Select Time
                          </label>
                          <div className="relative">
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            <input 
                              type="time"
                              required
                              value={formData.time}
                              onChange={(e) => setFormData({...formData, time: e.target.value})}
                              className="w-full bg-surface-secondary border border-border-primary rounded-xl py-3 pl-12 pr-4 font-semibold text-text-primary focus:outline-none focus:border-text-primary transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-bold text-text-secondary mb-3">
                          Tell us what you need help with
                        </label>
                        <textarea
                          rows={4}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Provide any details that might help the professional (e.g. 'AC making loud noise', '2 BHK full cleaning')"
                          className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-text-primary transition-colors resize-none font-medium"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleNext}
                      disabled={!formData.serviceCategory || !formData.date || !formData.time}
                      className="w-full py-4 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md flex justify-center items-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
                    >
                      Continue to Address <ArrowRight size={20} />
                    </button>
                  </motion.div>
                )}

                {/* STEP 2: Address and Booking */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-text-primary">
                        <MapPin className="text-text-primary" /> Where do you need the service?
                      </h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-bold text-text-secondary mb-3">
                            Select Address
                          </label>
                          <div className="bg-surface-secondary p-2 rounded-xl border border-border-primary">
                            <CustomDropdown
                              options={options}
                              value={formData.generalLocation}
                              onChange={(val) => setFormData({ ...formData, generalLocation: val })}
                              icon={<MapPin className="h-5 w-5 text-zinc-500" />}
                              variant="transparent"
                            />
                          </div>
                          <p className="text-xs text-zinc-500 font-medium mt-3 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-green-500" />
                            Professionals will only see your full address after booking confirmation.
                          </p>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <button
                        type="submit"
                        disabled={isSubmitting || !formData.generalLocation}
                        className="w-full py-4 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
                      >
                        {isSubmitting ? (
                          <span className="w-6 h-6 border-2 border-text-inverted border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                          "Book Service"
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column: Persistent Booking Summary */}
            <div className="w-full lg:w-[380px] flex-shrink-0">
              <div className="sticky top-[100px] bg-surface-primary rounded-3xl border border-border-primary shadow-xl shadow-black/5 overflow-hidden">
                {/* Summary Header / Image */}
                <div className="h-40 w-full bg-surface-secondary relative border-b border-border-primary">
                  {selectedServiceDetails ? (
                    <img 
                      src={selectedServiceDetails.image} 
                      alt={formData.serviceCategory} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 gap-2">
                      <Star className="w-8 h-8 opacity-20" />
                      <span className="text-sm font-semibold">Select a service</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-extrabold tracking-tight truncate shadow-sm">
                      {formData.serviceCategory || "Booking Summary"}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  {/* Price */}
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-border-secondary">
                    <span className="font-bold text-text-secondary">Starting Price</span>
                    <span className="text-2xl font-extrabold text-text-primary">
                      {selectedServiceDetails ? selectedServiceDetails.startingPrice : "--"}
                    </span>
                  </div>

                  {/* Details List */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-zinc-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-0.5">Date</p>
                        <p className="font-semibold text-text-primary text-sm">{formData.date || "Not selected"}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-zinc-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-0.5">Time</p>
                        <p className="font-semibold text-text-primary text-sm">{formData.time || "Not selected"}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-zinc-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-0.5">Location</p>
                        <p className="font-semibold text-text-primary text-sm line-clamp-2">{formData.generalLocation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default RequestService;

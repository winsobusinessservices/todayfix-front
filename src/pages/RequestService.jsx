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
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CustomDropdown from "../components/ui/CustomDropdown";
import { bookingApi } from "../services/bookingApi";
import { serviceApi } from "../services/serviceApi";
import { getAddresses } from "../services/addressApi";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const RequestService = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState(1);
  const [bookingId, setBookingId] = useState("");

  const [formData, setFormData] = useState({
    service_uuid: "",
    scheduled_date: "",
    slot_type: "",
    notes: "",
    address_uuid: "",
  });

  // Fetch Services
  const { data: servicesData } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await serviceApi.getServices();
      return response.data || response;
    },
  });
  // console.log(servicesData);

  const services = Array.isArray(servicesData)
    ? servicesData
    : servicesData?.results || [];
  const serviceOptions = services.map((s) => s.name);

  // Fetch Addresses
  const { data: addressesData } = useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });
  const addresses = addressesData?.data || addressesData || [];
  const addressOptions = addresses.map(
    (a) => `${a.address_type} : ${a.address_line.slice(0, 30)} - ${a.pincode}`,
  );

  // Create Booking Mutation
  const { mutate: createBooking, isPending: isSubmitting } = useMutation({
    mutationFn: bookingApi.createBooking,
    onSuccess: (data) => {
      setBookingId(data?.uuid || "TF-SUCCESS");
      setStep(3);
    },
    onError: (error) => {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to create booking");
    },
  });

  // Fetch Availability
  const { data: availabilityData, isLoading: checkingAvailability, isError: isAvailabilityError, error: availabilityError } = useQuery({
    queryKey: ["availability", formData.service_uuid, formData.scheduled_date],
    queryFn: () =>
      bookingApi.checkAvailability({
        service_uuid: formData.service_uuid,
        scheduled_date: formData.scheduled_date,
      }),
    enabled: !!formData.service_uuid && !!formData.scheduled_date,
  });

  useEffect(() => {
    // If coming from a specific service page, pre-fill category
    if (location.state && location.state.category) {
      const matchedService = services.find(
        (s) => s.name === location.state.category,
      );
      if (matchedService) {
        setFormData((prev) => ({
          ...prev,
          service_uuid: matchedService.uuid || matchedService.service_uuid,
        }));
      }
    }
  }, [location, services]);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.service_uuid ||
      !formData.address_uuid ||
      !formData.scheduled_date ||
      !formData.slot_type
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    createBooking({
      service_uuid: formData.service_uuid,
      address_uuid: formData.address_uuid,
      scheduled_date: formData.scheduled_date,
      slot_type: formData.slot_type,
      notes: formData.notes,
    });
  };

  const selectedServiceDetails = useMemo(() => {
    if (!formData.service_uuid || services.length === 0) return null;
    const service = services.find(
      (s) => (s.uuid || s.service_uuid) === formData.service_uuid,
    );
    if (!service) return null;
    return {
      name: service.name,
      image:
        service.image ||
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=80", // default fallback image
      startingPrice: service.price
        ? `Rs. ${service.price}`
        : "Price unavailable",
    };
  }, [formData.service_uuid, services]);

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
                Your request for{" "}
                <span className="font-bold text-text-primary">
                  {selectedServiceDetails?.name}
                </span>{" "}
                has been successfully placed.
              </p>

              <div className="bg-surface-secondary rounded-2xl p-6 mb-8 border border-border-primary flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider font-bold mb-1">
                    Booking ID
                  </p>
                  <p className="text-xl font-extrabold text-text-primary">
                    {bookingId}
                  </p>
                </div>
                <div className="hidden md:block w-px h-12 bg-border-primary"></div>
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider font-bold mb-1">
                    Scheduled For
                  </p>
                  <p className="text-lg font-bold text-text-primary">
                    {formData.scheduled_date} • {formData.slot_type}
                  </p>
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
                          options={serviceOptions}
                          value={selectedServiceDetails?.name || ""}
                          onChange={(val) => {
                            const matched = services.find(
                              (s) => s.name === val,
                            );
                            if (matched) {
                              setFormData({
                                ...formData,
                                service_uuid:
                                  matched.uuid || matched.service_uuid,
                              });
                            }
                          }}
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
                              value={formData.scheduled_date}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  scheduled_date: e.target.value,
                                })
                              }
                              className="w-full bg-surface-secondary border border-border-primary rounded-xl py-3 pl-12 pr-4 font-semibold text-text-primary focus:outline-none focus:border-text-primary transition-colors"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-text-secondary mb-3">
                            Select Slot Type
                          </label>
                          <div className="relative">
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            <select
                              required
                              value={formData.slot_type}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  slot_type: e.target.value,
                                })
                              }
                              className="w-full bg-surface-secondary border border-border-primary rounded-xl py-3 pl-12 pr-4 font-semibold text-text-primary focus:outline-none focus:border-text-primary transition-colors appearance-none"
                            >
                              <option value="" disabled>
                                Select a slot
                              </option>
                              <option value="MORNING">
                                Morning (9 AM - 12 PM)
                              </option>
                              <option value="AFTERNOON">
                                Afternoon (12 PM - 4 PM)
                              </option>
                              <option value="EVENING">
                                Evening (4 PM - 8 PM)
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Availability Display */}
                      {formData.service_uuid && formData.scheduled_date && (
                        <div className="mb-6 p-4 bg-surface-primary border border-border-primary rounded-xl">
                          <h3 className="text-sm font-bold text-text-secondary mb-3 flex items-center gap-2">
                            <Clock className="w-4 h-4" /> Availability for{" "}
                            {formData.scheduled_date}
                          </h3>
                          {checkingAvailability ? (
                            <div className="flex gap-2 items-center text-sm text-text-secondary">
                              <span className="w-4 h-4 border-2 border-text-secondary border-t-transparent rounded-full animate-spin inline-block"></span>
                              Checking slots...
                            </div>
                          ) : isAvailabilityError ? (
                            <p className="text-sm text-red-500 font-medium">
                              {availabilityError?.response?.data?.message || "Failed to fetch availability."}
                            </p>
                          ) : availabilityData?.success === false ? (
                            <p className="text-sm text-red-500 font-medium">
                              {availabilityData?.message || "Availability can only be checked for a future date."}
                            </p>
                          ) : availabilityData?.data?.slots ? (
                            <div className="grid grid-cols-3 gap-3">
                              {Object.entries(availabilityData.data.slots || {}).map(
                                ([slot, slotData]) => (
                                  <div
                                    key={slot}
                                    className={`p-2 rounded-lg text-center text-sm font-bold border ${slotData?.available ? "bg-green-500/10 text-green-600 border-green-500/20" : "bg-red-500/10 text-red-600 border-red-500/20"}`}
                                  >
                                    <div className="text-xs uppercase tracking-wider mb-1 opacity-80">
                                      {slot}
                                    </div>
                                    <div>{slotData?.available ? "Available" : "Unavailable"}</div>
                                  </div>
                                ),
                              )}
                            </div>
                          ) : (
                            <p className="text-sm text-zinc-500">
                              No availability data found for this date.
                            </p>
                          )}
                        </div>
                      )}

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-bold text-text-secondary mb-3">
                          Tell us what you need help with
                        </label>
                        <textarea
                          rows={4}
                          value={formData.notes}
                          onChange={(e) =>
                            setFormData({ ...formData, notes: e.target.value })
                          }
                          placeholder="Provide any details that might help the professional (e.g. 'AC making loud noise', '2 BHK full cleaning')"
                          className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-text-primary transition-colors resize-none font-medium"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleNext}
                      disabled={
                        !formData.service_uuid ||
                        !formData.scheduled_date ||
                        !formData.slot_type
                      }
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
                        <MapPin className="text-text-primary" /> Where do you
                        need the service?
                      </h2>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-bold text-text-secondary mb-3">
                            Select Address
                          </label>
                          <div className="bg-surface-secondary p-2 rounded-xl border border-border-primary">
                            <CustomDropdown
                              options={addressOptions}
                              value={
                                addresses.find(
                                  (a) =>
                                    (a.uuid || a.id || a.add_uuid) ===
                                    formData.address_uuid,
                                )
                                  ? `${addresses.find((a) => (a.uuid || a.id || a.add_uuid) === formData.address_uuid).address_type} : ${addresses.find((a) => (a.uuid || a.id || a.add_uuid) === formData.address_uuid).address_line.slice(0, 30)} - ${addresses.find((a) => (a.uuid || a.id || a.add_uuid) === formData.address_uuid).pincode}`
                                  : ""
                              }
                              onChange={(val) => {
                                const matched = addresses.find(
                                  (a) =>
                                    `${a.address_type} : ${a.address_line.slice(0, 30)} - ${a.pincode}` ===
                                    val,
                                );
                                if (matched) {
                                  setFormData({
                                    ...formData,
                                    address_uuid:
                                      matched.uuid ||
                                      matched.id ||
                                      matched.add_uuid,
                                  });
                                }
                              }}
                              icon={
                                <MapPin className="h-5 w-5 text-zinc-500" />
                              }
                              variant="transparent"
                            />
                          </div>
                          <p className="text-xs text-zinc-500 font-medium mt-3 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-green-500" />
                            Professionals will only see your full address after
                            booking confirmation.
                          </p>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <button
                        type="submit"
                        disabled={isSubmitting || !formData.address_uuid}
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
                      alt={selectedServiceDetails.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 gap-2">
                      <Star className="w-8 h-8 opacity-20" />
                      <span className="text-sm font-semibold">
                        Select a service
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-extrabold tracking-tight truncate shadow-sm">
                      {selectedServiceDetails?.name || "Booking Summary"}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  {/* Price */}
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-border-secondary">
                    <span className="font-bold text-text-secondary">
                      Starting Price
                    </span>
                    <span className="text-2xl font-extrabold text-text-primary">
                      {selectedServiceDetails
                        ? selectedServiceDetails.startingPrice
                        : "--"}
                    </span>
                  </div>

                  {/* Details List */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-zinc-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-0.5">
                          Date
                        </p>
                        <p className="font-semibold text-text-primary text-sm">
                          {formData.scheduled_date || "Not selected"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-zinc-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-0.5">
                          Time
                        </p>
                        <p className="font-semibold text-text-primary text-sm">
                          {formData.slot_type || "Not selected"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-zinc-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-0.5">
                          Location
                        </p>
                        <p className="font-semibold text-text-primary text-sm line-clamp-2">
                          {addresses.find(
                            (a) =>
                              (a.uuid || a.id || a.add_uuid) ===
                              formData.address_uuid,
                          )?.locality || "Not selected"}
                        </p>
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

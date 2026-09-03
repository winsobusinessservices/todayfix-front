import React, { useEffect, useState } from "react";
import { useBookingStore } from "../../store/bookingStore";
import {
  X,
  Clock,
  Calendar,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAddresses, updateAddress } from "../../services/addressApi";
import { bookingApi } from "../../services/bookingApi";
import CustomDropdown from "../ui/CustomDropdown";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

// Step 1: Instant vs Scheduled
const BookingTypeSelector = () => {
  const { setBookingType, nextStep } = useBookingStore();

  const handleSelect = (type) => {
    setBookingType(type);
    nextStep();
  };

  return (
    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
      <h3 className="text-xl font-bold text-text-primary mb-6">
        When do you need this?
      </h3>

      <button
        onClick={() => handleSelect("INSTANT")}
        className="w-full text-left p-4 rounded-2xl border-2 border-border-primary hover:border-text-primary transition-colors bg-surface-secondary flex items-start gap-4 group"
      >
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-110 transition-transform">
          <Clock className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <h4 className="font-bold text-text-primary text-lg">
            Right Now (Instant)
          </h4>
          <p className="text-sm text-text-secondary mt-1">
            Provider will be assigned immediately and arrive ASAP.
          </p>
        </div>
      </button>

      <button
        onClick={() => handleSelect("SCHEDULED")}
        className="w-full text-left p-4 rounded-2xl border-2 border-border-primary hover:border-text-primary transition-colors bg-surface-secondary flex items-start gap-4 group"
      >
        <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center shrink-0 border border-purple-100 group-hover:scale-110 transition-transform">
          <Calendar className="w-6 h-6 text-purple-500" />
        </div>
        <div>
          <h4 className="font-bold text-text-primary text-lg">
            Schedule for Later
          </h4>
          <p className="text-sm text-text-secondary mt-1">
            Pick a specific date and time slot that works for you.
          </p>
        </div>
      </button>
    </div>
  );
};

// Step 2: Date & Time (Only for Scheduled)
const DateTimeSelector = () => {
  const { schedule, setSchedule, nextStep, selectedService } =
    useBookingStore();

  const { data: availabilityData, isLoading: checkingAvailability } = useQuery({
    queryKey: [
      "availability",
      selectedService?.uuid || selectedService?.service_uuid,
      schedule.date,
    ],
    queryFn: () =>
      bookingApi.checkAvailability({
        service_uuid: selectedService?.uuid || selectedService?.service_uuid,
        scheduled_date: schedule.date,
      }),
    enabled: !!(selectedService && schedule.date),
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <h3 className="text-xl font-bold text-text-primary mb-4">
        Select Date & Time
      </h3>

      <div>
        <label className="block text-sm font-bold text-text-secondary mb-3">
          Date
        </label>
        <input
          type="date"
          value={schedule.date}
          onChange={(e) => setSchedule({ date: e.target.value, timeSlot: "" })}
          min={new Date().toISOString().split("T")[0]}
          className="w-full bg-surface-secondary border border-border-primary rounded-xl py-3 px-4 font-semibold text-text-primary focus:outline-none focus:border-text-primary transition-colors"
        />
      </div>

      {schedule.date && (
        <div>
          <label className="block text-sm font-bold text-text-secondary mb-3">
            Time Slot
          </label>

          {checkingAvailability ? (
            <div className="flex gap-2 items-center text-sm text-text-secondary">
              <span className="w-4 h-4 border-2 border-text-secondary border-t-transparent rounded-full animate-spin inline-block"></span>
              Checking slots...
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {["MORNING", "AFTERNOON", "EVENING"].map((slot) => {
                const isAvailable =
                  availabilityData?.data?.slots?.[slot]?.available;
                const isSelected = schedule.timeSlot === slot;

                return (
                  <button
                    key={slot}
                    disabled={!isAvailable}
                    onClick={() => setSchedule({ timeSlot: slot })}
                    className={`p-4 rounded-xl border-2 text-left flex justify-between items-center transition-all
                      ${
                        !isAvailable
                          ? "opacity-50 cursor-not-allowed bg-surface-secondary border-border-primary"
                          : isSelected
                            ? "border-text-primary bg-surface-primary shadow-md"
                            : "border-border-primary hover:border-text-secondary bg-surface-primary"
                      }
                    `}
                  >
                    <div>
                      <div className="font-bold text-text-primary">{slot}</div>
                      <div className="text-xs text-text-secondary">
                        {slot === "MORNING"
                          ? "9 AM - 12 PM"
                          : slot === "AFTERNOON"
                            ? "12 PM - 4 PM"
                            : "4 PM - 8 PM"}
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="text-text-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      <button
        onClick={nextStep}
        disabled={!schedule.date || !schedule.timeSlot}
        className="w-full py-4 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md disabled:opacity-50 disabled:hover:scale-100"
      >
        Continue
      </button>
    </div>
  );
};

// Step 3: Address & Confirm
const AddressSelector = () => {
  const {
    address_uuid,
    setAddress,
    selectedService,
    schedule,
    bookingType,
    nextStep,
    setBookingId,
    notes,
    setNotes,
  } = useBookingStore();

  const [mapEmbed, setMapEmbed] = useState("");
  const [currentPayload, setCurrentPayload] = useState(null);

  const { data: addressesData } = useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });

  const addresses = addressesData?.data || addressesData || [];
  const addressOptions = addresses.map(
    (a) => `${a.address_type} : ${a.address_line.slice(0, 30)} - ${a.pincode}`,
  );

  const { mutate: submitBooking, isPending } = useMutation({
    mutationFn: (payload) => {
      if (bookingType === "INSTANT") {
        return bookingApi.createInstantBooking(payload);
      }
      return bookingApi.createBooking(payload);
    },
    onSuccess: (data) => {
      console.log("Booking response:", data);
      setBookingId(data?.data?.instant_booking_uuid || "TF-SUCCESS");
      nextStep();
    },
    onError: (error) => {
      if (error?.response?.data) {
        console.error("Booking error response:", error.response.data);
        const data = error.response.data;
        if (data.address_uuid && Array.isArray(data.address_uuid)) {
          toast.error(data.address_uuid[0]);
          return;
        }
      }
      toast.error(error?.response?.data?.message || "Failed to create booking");
    },
  });

  const { mutate: updateAddressMutate, isPending: isUpdatingAddress } =
    useMutation({
      mutationFn: updateAddress,
      onSuccess: () => {
        submitBooking(currentPayload);
      },
      onError: () => toast.error("Failed to update address location"),
    });

  const handleConfirm = () => {
    if (!address_uuid) return toast.error("Please select an address");

    let payload;
    if (bookingType === "INSTANT") {
      if (!mapEmbed) {
        return toast.error(
          "Google Maps embed link is required for instant booking.",
        );
      }
      payload = {
        address_uuid,
        requested_service_name: selectedService?.name,
        customer_note: notes,
      };

      const selectedAddr = addresses.find(
        (a) => (a.uuid || a.id || a.add_uuid) === address_uuid,
      );
      if (selectedAddr && selectedAddr.location !== mapEmbed) {
        setCurrentPayload(payload);
        updateAddressMutate({
          addressId: address_uuid,
          addressData: { ...selectedAddr, location: mapEmbed },
        });
        return;
      }
    } else {
      payload = {
        service_uuid: selectedService?.uuid || selectedService?.service_uuid,
        address_uuid,
        notes,
        scheduled_date: schedule.date,
        slot_type: schedule.timeSlot,
      };
    }

    submitBooking(payload);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <h3 className="text-xl font-bold text-text-primary mb-4">
        Confirm Location
      </h3>

      <div>
        <label className="block text-sm font-bold text-text-secondary mb-3">
          Select Address
        </label>
        <div className="bg-surface-secondary p-2 rounded-xl border border-border-primary">
          <CustomDropdown
            options={addressOptions}
            value={
              addresses.find(
                (a) => (a.uuid || a.id || a.add_uuid) === address_uuid,
              )
                ? `${addresses.find((a) => (a.uuid || a.id || a.add_uuid) === address_uuid).address_type} : ${addresses.find((a) => (a.uuid || a.id || a.add_uuid) === address_uuid).address_line.slice(0, 30)} - ${addresses.find((a) => (a.uuid || a.id || a.add_uuid) === address_uuid).pincode}`
                : ""
            }
            onChange={(val) => {
              const matched = addresses.find(
                (a) =>
                  `${a.address_type} : ${a.address_line.slice(0, 30)} - ${a.pincode}` ===
                  val,
              );
              if (matched) {
                setAddress(matched.uuid || matched.id || matched.add_uuid);
                setMapEmbed(matched.location || "");
              }
            }}
            icon={<MapPin className="h-5 w-5 text-zinc-500" />}
            placeholder="Choose an address..."
            variant="transparent"
          />
        </div>
        <p className="text-xs text-zinc-500 font-medium mt-3 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          Professionals will only see your full address after confirmation.
        </p>
      </div>

      {bookingType === "INSTANT" && (
        <div>
          <label className="block text-sm font-bold text-text-secondary mb-3">
            Google Maps Embed Link (Required)
          </label>
          <input
            type="text"
            value={mapEmbed}
            onChange={(e) => setMapEmbed(e.target.value)}
            placeholder="<iframe src='https://www.google.com/maps/embed?...' ></iframe>"
            className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-text-primary transition-colors font-medium"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-text-secondary mb-3">
          Add Notes (Optional)
        </label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. 'Ring the bell twice' or 'Issue is in the bedroom'"
          className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-text-primary transition-colors resize-none font-medium"
        />
      </div>

      <button
        onClick={handleConfirm}
        disabled={isPending || isUpdatingAddress || !address_uuid}
        className="w-full py-4 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-lg disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center"
      >
        {isPending || isUpdatingAddress ? (
          <span className="w-5 h-5 border-2 border-text-inverted border-t-transparent rounded-full animate-spin"></span>
        ) : (
          `Confirm ${bookingType === "INSTANT" ? "Instant " : ""}Booking`
        )}
      </button>
    </div>
  );
};

// Step 4: Success
const BookingSuccess = () => {
  const { bookingId, closeBooking, selectedService } = useBookingStore();
  const navigate = useNavigate();

  return (
    <div className="text-center py-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-100">
        <CheckCircle2 className="w-10 h-10 text-green-500" />
      </div>
      <h2 className="text-2xl font-black text-text-primary mb-2">
        Booking Confirmed!
      </h2>
      <p className="text-text-secondary mb-6">
        Your request for {selectedService?.name} is placed.
      </p>
      <div className="bg-surface-secondary rounded-xl p-4 mb-8">
        <p className="text-xs text-text-muted font-bold uppercase mb-1">
          Booking ID
        </p>
        <p className="text-lg font-black text-text-primary">{bookingId}</p>
      </div>
      <button
        onClick={() => {
          closeBooking();
          navigate("/profile"); // or wherever they track bookings
        }}
        className="w-full py-4 bg-surface-dark text-text-inverted font-bold rounded-xl shadow-md"
      >
        View My Bookings
      </button>
    </div>
  );
};

// Main Drawer Component
const BookingDrawer = () => {
  const {
    isOpen,
    closeBooking,
    step,
    selectedService,
    bookingType,
    prevStep,
    setStep,
  } = useBookingStore();

  // Handle escape key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeBooking();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeBooking]);

  // Handle back button behavior
  const handleBack = () => {
    if (step === 2 && bookingType === "INSTANT") {
      // If we are on address step but it's instant, going back means back to step 1
      setStep(1);
    } else {
      prevStep();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBooking}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer (Slides in from Right on Desktop, Bottom on Mobile) */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-surface-primary shadow-2xl z-50 flex flex-col border-l border-border-primary"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-border-primary flex items-center justify-between bg-surface-primary shrink-0">
              <div className="flex items-center gap-3">
                {step > 1 && step < 4 ? (
                  <button
                    onClick={handleBack}
                    className="p-2 -ml-2 rounded-full hover:bg-surface-secondary transition-colors text-text-primary"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                ) : (
                  <div className="w-8" /> // Spacer for alignment
                )}
                <h2 className="font-bold text-text-primary truncate max-w-[200px]">
                  {step === 4
                    ? "Success"
                    : selectedService?.name || "Book Service"}
                </h2>
              </div>
              <button
                onClick={closeBooking}
                className="p-2 -mr-2 rounded-full hover:bg-surface-secondary text-text-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 bg-surface-primary">
              {step === 1 && <BookingTypeSelector />}
              {step === 2 && bookingType === "SCHEDULED" && (
                <DateTimeSelector />
              )}
              {step === 2 &&
                bookingType === "INSTANT" &&
                (() => {
                  setStep(3);
                  return null;
                })()}
              {step === 3 && <AddressSelector />}
              {step === 4 && <BookingSuccess />}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingDrawer;

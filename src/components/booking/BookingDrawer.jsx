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
  Navigation,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createAddress,
  getAddresses,
  updateAddress,
} from "../../services/addressApi";
import { bookingApi } from "../../services/bookingApi";
import { instantBookingApi } from "../../services/instantBookingApi";
import CustomDropdown from "../ui/CustomDropdown";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Map, MessageSquare, Search } from "lucide-react";
import MapPicker from "../modals/MapPicker";

const ADD_ADDRESS_OPTION = "+ Add New Address";
const emptyAddressForm = {
  address_type: "HOME",
  address_line: "",
  locality: "",
  city: "",
  state: "",
  pincode: "",
  location: "",
  is_default: false,
};

// Step 1: Instant vs Scheduled
const BookingTypeSelector = () => {
  const { setBookingType, nextStep, selectedService } = useBookingStore();
  const vendorName = selectedService?.business?.name || "Professional";
  const [showGuide, setShowGuide] = useState(false);

  const handleSelect = (type) => {
    setBookingType(type);
    nextStep();
  };

  if (showGuide) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="mb-6">
          <h3 className="text-[24px] font-black text-text-primary leading-tight mb-2">
            How to Book
          </h3>
          <p className="text-text-secondary text-[14px]">
            Follow these 3 simple steps to get your service done.
          </p>
        </div>

        <div className="space-y-6 relative">
          <div className="absolute left-6 top-6 bottom-6 w-px bg-border-primary"></div>

          <div className="flex gap-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-surface-accent flex items-center justify-center shrink-0 border border-border-primary">
              <span className="font-bold text-text-brand">1</span>
            </div>
            <div className="pt-2">
              <h4 className="font-bold text-text-primary text-[15px]">
                Choose booking type
              </h4>
              <p className="text-[13px] text-text-secondary mt-1 leading-relaxed">
                Select "Schedule" to pick a specific date and time, or "Instant"
                to find someone right now.
              </p>
            </div>
          </div>

          <div className="flex gap-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-surface-primary flex items-center justify-center shrink-0 border border-border-primary shadow-sm">
              <span className="font-bold text-text-primary">2</span>
            </div>
            <div className="pt-2">
              <h4 className="font-bold text-text-primary text-[15px]">
                Provide location
              </h4>
              <p className="text-[13px] text-text-secondary mt-1 leading-relaxed">
                Enter your address so we can find the best professionals near
                your exact location.
              </p>
            </div>
          </div>

          <div className="flex gap-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-surface-primary flex items-center justify-center shrink-0 border border-border-primary shadow-sm">
              <span className="font-bold text-text-primary">3</span>
            </div>
            <div className="pt-2">
              <h4 className="font-bold text-text-primary text-[15px]">
                Job Done
              </h4>
              <p className="text-[13px] text-text-secondary mt-1 leading-relaxed">
                Our system confirms your booking and assigns a trusted, verified
                professional to the job.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowGuide(false)}
          className="w-full mt-8 py-4 rounded-xl bg-text-primary text-surface-primary font-bold flex items-center justify-center hover:opacity-90 transition-opacity shadow-md"
        >
          Got it, let's book!
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
      <div className="mb-6">
        <h3 className="text-[28px] font-black text-text-primary leading-tight mb-2">
          How would you like
          <br />
          to book?
        </h3>
        <p className="text-text-secondary text-[15px]">
          Choose the option that works best for you.
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => handleSelect("SCHEDULED")}
          className="w-full text-left p-6 rounded-2xl border border-border-primary hover:border-brand-primary transition-colors bg-card-primary flex items-center justify-between gap-4 group shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-surface-accent flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-text-brand" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-bold text-text-primary text-[15px]">
                Schedule with {vendorName}
              </h4>
              <p className="text-[13px] text-text-secondary mt-1 leading-snug pr-4">
                Secure this exact professional at their listed price of ₹
                {Math.round(selectedService?.price || 0)}.
              </p>
            </div>
          </div>
          <ArrowRight
            className="w-5 h-5 text-text-muted group-hover:text-text-brand shrink-0"
            strokeWidth={1.5}
          />
        </button>

        <button
          onClick={() => handleSelect("INSTANT")}
          className="w-full text-left p-6 rounded-2xl border border-border-primary hover:border-brand-primary transition-colors bg-card-primary flex items-center justify-between gap-4 group shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-surface-accent flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-text-brand" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-bold text-text-primary text-[15px]">
                Find Any Professional Instantly
              </h4>
              <p className="text-[13px] text-text-secondary mt-1 leading-snug pr-2">
                Broadcast this request to all available vendors.
                <br />
                <span className="text-text-brand font-bold mt-1 block">
                  *Final price may vary based on who accepts.*
                </span>
              </p>
            </div>
          </div>
          <ArrowRight
            className="w-5 h-5 text-text-muted group-hover:text-text-brand shrink-0"
            strokeWidth={1.5}
          />
        </button>
      </div>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border-primary"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-surface-primary text-text-secondary text-[13px]">
            Not sure which to choose?
          </span>
        </div>
      </div>

      <button
        onClick={() => setShowGuide(true)}
        className="w-full text-left p-4 rounded-2xl bg-surface-secondary flex items-center justify-between group hover:bg-surface-accent transition-colors border border-border-primary"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border border-border-primary bg-surface-primary flex items-center justify-center shrink-0">
            <MessageSquare
              className="w-4 h-4 text-text-brand"
              strokeWidth={1.5}
            />
          </div>
          <div>
            <h4 className="font-bold text-text-primary text-[14px]">
              We're here to help
            </h4>
            <p className="text-[12px] text-text-secondary mt-0.5">
              Guide to book a Service.
            </p>
          </div>
        </div>
        <ArrowRight
          className="w-4 h-4 text-text-muted group-hover:text-text-brand shrink-0"
          strokeWidth={1.5}
        />
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

  const todayStr = new Date().toISOString().split("T")[0];

  const handleDateChange = (e) => {
    const selected = e.target.value;
    if (!selected) {
      setSchedule({ date: "", timeSlot: "" });
      return;
    }

    if (selected < todayStr) {
      toast.error("Please select a date from today onwards.");
      return;
    }

    setSchedule({ date: selected, timeSlot: "" });
  };

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
          onChange={handleDateChange}
          min={todayStr}
          className="w-full bg-surface-secondary border border-border-primary rounded-xl py-3 px-4 font-semibold text-text-primary focus:outline-none focus:border-brand-primary transition-colors"
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
                            ? "border-brand-primary bg-surface-accent shadow-md"
                            : "border-border-primary hover:border-brand-soft bg-surface-primary"
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
                    {isSelected && <CheckCircle2 className="text-text-brand" />}
                  </button>
                );
              })}
            </div>
          )}
          {!availabilityData && availabilityData?.detail}
        </div>
      )}

      <button
        onClick={nextStep}
        disabled={!schedule.date || !schedule.timeSlot}
        className="btn-primary w-full py-4 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md disabled:opacity-50 disabled:hover:scale-100"
      >
        Continue
      </button>
    </div>
  );
};

// Step 3: Address & Confirm
const AddressSelector = () => {
  const queryClient = useQueryClient();
  const {
    address_uuid,
    setAddress,
    selectedService,
    schedule,
    bookingType,
    nextStep,
    setBookingId,
    setBookingData,
    notes,
    setNotes,
  } = useBookingStore();
  // console.log(selectedService);

  const [mapEmbed, setMapEmbed] = useState("");
  const [currentPayload, setCurrentPayload] = useState(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState(emptyAddressForm);

  const handleGetCurrentLocation = () => {
    setIsLoadingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (loc) => {
          const lat = loc.coords.latitude;
          const lng = loc.coords.longitude;
          const iframeString = `<iframe src="https://maps.google.com/maps?q=${lat},${lng}&hl=es;z=14&output=embed" width="100%" height="300" frameborder="0" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"><!-- !3d${lat}!4d${lng} --></iframe>`;
          setMapEmbed(iframeString);
          setIsLoadingLocation(false);
          toast.success("Location retrieved successfully");
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoadingLocation(false);
          toast.error("Error getting location. Please allow location access.");
        },
        { enableHighAccuracy: true, timeout: 10000 },
      );
    } else {
      setIsLoadingLocation(false);
      toast.error("Geolocation is not supported by your browser");
    }
  };

  const { data: addressesData } = useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });

  const addresses = addressesData?.data || addressesData || [];
  const savedAddressOptions = addresses.map(
    (a) => `${a.address_type} : ${a.address_line.slice(0, 30)} - ${a.pincode}`,
  );
  const addressOptions = [...savedAddressOptions, ADD_ADDRESS_OPTION];

  const { mutate: addAddress, isPending: isAddingAddress } = useMutation({
    mutationFn: createAddress,
    onSuccess: async (response, submittedAddress) => {
      await queryClient.invalidateQueries({ queryKey: ["addresses"] });
      const refreshedData = await queryClient.fetchQuery({
        queryKey: ["addresses"],
        queryFn: getAddresses,
      });
      const refreshedAddresses = refreshedData?.data || refreshedData || [];
      const responseAddress = response?.data || response;
      const createdAddress =
        refreshedAddresses.find(
          (address) =>
            (address.uuid || address.id || address.add_uuid) ===
            (responseAddress?.uuid ||
              responseAddress?.id ||
              responseAddress?.add_uuid),
        ) ||
        [...refreshedAddresses]
          .reverse()
          .find(
            (address) =>
              address.address_line === submittedAddress.address_line &&
              address.pincode === submittedAddress.pincode,
          );

      if (createdAddress) {
        setAddress(
          createdAddress.uuid || createdAddress.id || createdAddress.add_uuid,
        );
        setMapEmbed(createdAddress.location || "");
      }
      setNewAddress(emptyAddressForm);
      setShowAddAddress(false);
      toast.success("Address added successfully");
    },
    onError: (error) => {
      const data = error.response?.data;
      const firstError =
        data && typeof data === "object"
          ? Object.values(data).flat().find(Boolean)
          : null;
      toast.error(
        (typeof firstError === "string" && firstError) ||
          data?.message ||
          "Failed to add address",
      );
    },
  });

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((current) => ({ ...current, [name]: value }));
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    addAddress({
      ...newAddress,
      address_line: newAddress.address_line.trim(),
      locality: newAddress.locality.trim(),
      city: newAddress.city.trim(),
      state: newAddress.state.trim(),
      pincode: newAddress.pincode.trim(),
      location: mapEmbed,
      is_default: addresses.length === 0,
    });
  };

  const { mutate: submitBooking, isPending } = useMutation({
    mutationFn: (payload) => {
      if (bookingType === "INSTANT") {
        return instantBookingApi.createInstantBooking(payload);
      }
      return bookingApi.createBooking(payload);
    },
    onSuccess: (data) => {
      // Handle the case where the backend returns success: true, but no provider is available
      // console.log(data);

      if (
        data?.data?.status === "NO_PROVIDER" ||
        data?.message?.toLowerCase().includes("no provider")
      ) {
        toast.error(
          data?.message ||
            "No provider is currently available for this service.",
        );
        return;
      }

      setBookingId(
        data?.data?.uuid || data?.data?.instant_booking_uuid || "TF-SUCCESS",
      );
      setBookingData(data?.data);
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
    if (!address_uuid)
      return toast.error("Please select a saved address or add a new one");

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
    } else {
      payload = {
        service_uuid: selectedService?.service_uuid,
        address_uuid,
        notes,
        scheduled_date: schedule.date,
        slot_type: schedule.timeSlot,
        business_uuid: selectedService?.business?.business_profile_uuid,
      };
    }

    // Save map embed to address if it was added/changed
    const selectedAddr = addresses.find(
      (a) => (a.uuid || a.id || a.add_uuid) === address_uuid,
    );
    if (selectedAddr && mapEmbed && selectedAddr.location !== mapEmbed) {
      setCurrentPayload(payload);
      updateAddressMutate({
        addressId: address_uuid,
        addressData: { ...selectedAddr, location: mapEmbed },
      });
      return;
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
              if (val === ADD_ADDRESS_OPTION) {
                setShowAddAddress(true);
                return;
              }
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
            icon={<MapPin className="h-5 w-5 text-text-secondary" />}
            placeholder="Choose an address..."
            variant="transparent"
          />
        </div>
        {showAddAddress && (
          <form
            onSubmit={handleAddAddress}
            className="mt-4 space-y-4 rounded-2xl border border-border-primary bg-surface-secondary p-4"
          >
            <div className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-text-primary" />
              <h4 className="font-bold text-text-primary">Add New Address</h4>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="col-span-2 text-xs font-bold uppercase tracking-wider text-text-secondary">
                Address Type
                <select
                  name="address_type"
                  value={newAddress.address_type}
                  onChange={handleNewAddressChange}
                  className="mt-1.5 w-full rounded-xl border border-border-primary bg-surface-primary px-3 py-2.5 text-sm text-text-primary outline-none focus:border-brand-primary"
                >
                  <option value="HOME">Home</option>
                  <option value="WORK">Work</option>
                  <option value="OTHER">Other</option>
                </select>
              </label>
              <label className="col-span-2 text-xs font-bold uppercase tracking-wider text-text-secondary">
                Address Line
                <input
                  name="address_line"
                  value={newAddress.address_line}
                  onChange={handleNewAddressChange}
                  required
                  placeholder="House number, street or building"
                  className="mt-1.5 w-full rounded-xl border border-border-primary bg-surface-primary px-3 py-2.5 text-sm normal-case text-text-primary outline-none focus:border-brand-primary"
                />
              </label>
              <label className="col-span-2 text-xs font-bold uppercase tracking-wider text-text-secondary">
                Locality
                <input
                  name="locality"
                  value={newAddress.locality}
                  onChange={handleNewAddressChange}
                  required
                  placeholder="Area or locality"
                  className="mt-1.5 w-full rounded-xl border border-border-primary bg-surface-primary px-3 py-2.5 text-sm normal-case text-text-primary outline-none focus:border-brand-primary"
                />
              </label>
              <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                City
                <input
                  name="city"
                  value={newAddress.city}
                  onChange={handleNewAddressChange}
                  required
                  className="mt-1.5 w-full rounded-xl border border-border-primary bg-surface-primary px-3 py-2.5 text-sm normal-case text-text-primary outline-none focus:border-brand-primary"
                />
              </label>
              <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                State
                <input
                  name="state"
                  value={newAddress.state}
                  onChange={handleNewAddressChange}
                  required
                  className="mt-1.5 w-full rounded-xl border border-border-primary bg-surface-primary px-3 py-2.5 text-sm normal-case text-text-primary outline-none focus:border-brand-primary"
                />
              </label>
              <label className="col-span-2 text-xs font-bold uppercase tracking-wider text-text-secondary">
                Pincode
                <input
                  name="pincode"
                  value={newAddress.pincode}
                  onChange={handleNewAddressChange}
                  required
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  placeholder="6-digit pincode"
                  className="mt-1.5 w-full rounded-xl border border-border-primary bg-surface-primary px-3 py-2.5 text-sm normal-case text-text-primary outline-none focus:border-brand-primary"
                />
              </label>
            </div>

            <div className="col-span-2 mt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-2 block">
                Precise Location (Map)
              </label>
              {mapEmbed ? (
                <div className="relative">
                  <div
                    className="w-full h-32 rounded-xl overflow-hidden border border-border-primary"
                    dangerouslySetInnerHTML={{
                      __html: mapEmbed.replace('height="300"', 'height="100%"'),
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
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => setIsMapOpen(true)}
                    className="w-full bg-surface-accent text-text-brand border border-brand-soft hover:bg-button-secondary-hover hover:border-brand-primary rounded-xl px-4 py-4 flex items-center justify-center gap-3 transition-colors font-bold"
                  >
                    <Map className="w-5 h-5" />
                    Select Location on Map
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                disabled={isAddingAddress}
                className="btn-primary flex-1 rounded-xl bg-surface-dark px-4 py-3 text-sm font-bold text-text-inverted disabled:opacity-50"
              >
                {isAddingAddress ? "Saving..." : "Save Address"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddAddress(false);
                  setNewAddress(emptyAddressForm);
                }}
                className="rounded-xl border border-border-primary bg-surface-primary px-4 py-3 text-sm font-bold text-text-primary"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        <p className="text-xs text-text-secondary font-medium mt-3 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          Professionals will only see your full address after confirmation.
        </p>
      </div>

      {!showAddAddress && (
        <div>
          {mapEmbed && (
            <div className="relative">
              <div
                className="w-full h-32 rounded-xl overflow-hidden border border-border-primary"
                dangerouslySetInnerHTML={{
                  __html: mapEmbed.replace('height="300"', 'height="100%"'),
                }}
              />
              <button
                onClick={() => setIsMapOpen(true)}
                className="absolute bottom-2 right-2 px-3 py-1.5 bg-surface-primary/90 backdrop-blur-sm border border-border-primary text-text-primary text-xs font-bold rounded-lg shadow-sm hover:bg-surface-secondary transition-colors"
              >
                Change Location
              </button>
            </div>
          )}
        </div>
      )}
      <MapPicker
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onConfirm={(iframeString) => setMapEmbed(iframeString)}
      />

      <div>
        <label className="block text-sm font-bold text-text-secondary mb-3">
          Add Notes (Optional)
        </label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. 'Ring the bell twice' or 'Issue is in the bedroom'"
          className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-colors resize-none font-medium"
        />
      </div>

      <button
        onClick={handleConfirm}
        disabled={isPending || isUpdatingAddress || !address_uuid}
        className="btn-primary w-full py-4 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-lg disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center"
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
  const { bookingId, bookingData, closeBooking, selectedService, bookingType } =
    useBookingStore();
  const navigate = useNavigate();

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { weekday: "short", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Helper to format time slot
  const formatTimeSlot = (timeString) => {
    if (!timeString) return "";
    return (
      timeString.charAt(0).toUpperCase() + timeString.slice(1).toLowerCase()
    );
  };

  return (
    <div className="text-center py-8 animate-in fade-in zoom-in-95 duration-500">
      {bookingType === "INSTANT" ? (
        // Radar/Pulse animation for Instant
        <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-brand-primary/20 rounded-full animate-ping [animation-duration:2s]"></div>
          <div className="absolute inset-2 bg-brand-primary/30 rounded-full animate-ping [animation-duration:2s] [animation-delay:0.5s]"></div>
          <div className="relative w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center shadow-lg shadow-brand-primary/40">
            <Search className="w-5 h-5 text-surface-primary animate-pulse" />
          </div>
        </div>
      ) : (
        // Checkmark for Scheduled
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-100">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
      )}

      <h2 className="text-2xl font-black text-text-primary mb-2">
        {bookingType === "INSTANT"
          ? "Request Broadcasted!"
          : "Booking Confirmed!"}
      </h2>
      <p className="text-text-secondary mb-6">
        {bookingType === "INSTANT"
          ? `Searching for a provider for ${selectedService?.name}...`
          : `Your request for ${selectedService?.name} is successfully placed.`}
      </p>

      {/* Detailed Card for Scheduled Bookings */}
      {bookingType !== "INSTANT" && bookingData && (
        <div className="bg-surface-secondary rounded-2xl p-5 mb-8 border border-border-primary text-left">
          <div className="flex justify-between items-center pb-4 border-b border-border-primary/50 mb-4">
            <div>
              <p className="text-[11px] text-text-muted font-bold uppercase tracking-wider mb-1">
                Booking ID
              </p>
              <p className="text-sm font-black text-text-primary uppercase">
                {bookingId.split("-")[0]}
              </p>
            </div>
            {bookingData.price && (
              <div className="text-right">
                <p className="text-[11px] text-text-muted font-bold uppercase tracking-wider mb-1">
                  Est. Price
                </p>
                <p className="text-sm font-black text-text-brand">
                  ₹{Math.round(bookingData.price)}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {(bookingData.scheduled_date || bookingData.slot_type) && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-primary border border-border-primary flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-text-muted font-medium mb-0.5">
                    Date & Time
                  </p>
                  <p className="text-sm font-bold text-text-primary">
                    {formatDate(bookingData.scheduled_date)} •{" "}
                    {formatTimeSlot(bookingData.slot_type)}
                  </p>
                </div>
              </div>
            )}

            {bookingData.business?.name && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-primary border border-border-primary flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-text-muted font-medium mb-0.5">
                    Professional
                  </p>
                  <p className="text-sm font-bold text-text-primary">
                    {bookingData.business.name}
                  </p>
                </div>
              </div>
            )}

            {bookingData.address && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-primary border border-border-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-text-muted font-medium mb-0.5">
                    Location
                  </p>
                  <p className="text-sm font-bold text-text-primary line-clamp-1">
                    {bookingData.address.locality || bookingData.address.city}
                  </p>
                  <p className="text-xs text-text-secondary line-clamp-1 mt-0.5">
                    {bookingData.address.address_line}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Detailed Card for Instant Bookings */}
      {bookingType === "INSTANT" && bookingData && (
        <div className="bg-surface-secondary rounded-2xl p-5 mb-8 border border-border-primary text-left">
          <div className="flex justify-between items-center pb-4 border-b border-border-primary/50 mb-4">
            <div>
              <p className="text-[11px] text-text-muted font-bold uppercase tracking-wider mb-1">
                Booking ID
              </p>
              <p className="text-sm font-black text-text-primary uppercase">
                {bookingId.split("-")[0]}
              </p>
            </div>
            {bookingData.average_service_price && (
              <div className="text-right">
                <p className="text-[11px] text-text-muted font-bold uppercase tracking-wider mb-1">
                  Est. Price
                </p>
                <p className="text-sm font-black text-text-brand">
                  ₹{Math.round(bookingData.average_service_price)}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {bookingData.requested_service_name && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-primary border border-border-primary flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-text-muted font-medium mb-0.5">
                    Requested Service
                  </p>
                  <p className="text-sm font-bold text-text-primary">
                    {bookingData.requested_service_name}
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-surface-primary border border-border-primary flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-text-secondary" />
              </div>
              <div>
                <p className="text-xs text-text-muted font-medium mb-0.5">
                  Status
                </p>
                <p className="text-sm font-bold text-text-brand flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
                  {bookingData.status || "SEARCHING"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fallback Simple Card for missing data */}
      {!bookingData && (
        <div className="bg-surface-secondary rounded-xl p-4 mb-8 border border-border-primary">
          <p className="text-[11px] text-text-muted font-bold uppercase tracking-wider mb-1">
            Booking ID
          </p>
          <p className="text-lg font-black text-text-primary uppercase">
            {bookingId.split("-")[0]}
          </p>
        </div>
      )}
      <button
        onClick={() => {
          closeBooking();
          if (bookingType === "INSTANT") {
            navigate(`/track/instant/${bookingId}`);
          } else {
            navigate("/profile");
          }
        }}
        className="btn-primary w-full py-4 font-bold rounded-xl shadow-md"
      >
        {bookingType === "INSTANT" ? "Track My Booking" : "View My Bookings"}
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

  // Auto-skip step 2 for INSTANT bookings
  useEffect(() => {
    if (step === 2 && bookingType === "INSTANT") {
      setStep(3);
    }
  }, [step, bookingType, setStep]);

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
    if (step === 3 && bookingType === "INSTANT") {
      // If we are on address step (step 3) but it's instant, going back means back to step 1
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
              <div className="flex items-center gap-1">
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

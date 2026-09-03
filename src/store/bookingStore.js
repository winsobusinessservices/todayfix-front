import { create } from "zustand";

export const useBookingStore = create((set) => ({
  isOpen: false,
  step: 1,
  selectedService: null,
  bookingType: null, // "INSTANT" | "SCHEDULED"
  schedule: {
    date: "",
    timeSlot: "", // "MORNING", "AFTERNOON", "EVENING"
  },
  address_uuid: "",
  notes: "",
  bookingId: null,

  openBooking: (service) =>
    set({
      isOpen: true,
      selectedService: service,
      step: 1,
      bookingType: null,
      schedule: { date: "", timeSlot: "" },
      address_uuid: "",
      notes: "",
      bookingId: null,
    }),

  closeBooking: () => set({ isOpen: false }),

  setBookingType: (type) => set({ bookingType: type }),

  setSchedule: (scheduleObj) =>
    set((state) => ({
      schedule: { ...state.schedule, ...scheduleObj },
    })),

  setAddress: (uuid) => set({ address_uuid: uuid }),

  setNotes: (notes) => set({ notes }),

  setBookingId: (id) => set({ bookingId: id }),

  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),

  setStep: (stepNumber) => set({ step: stepNumber }),
}));

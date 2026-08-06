export const userData = {
  id: 1,
  firstName: "Shree",
  lastName: "Kanth",
  role: "USER",
  isAuthenticated: true,
  hasBusiness: true,
  businessStatus: "VERIFIED",
  email: "shree.kanth@example.com",
  profile: "",
  phoneNo: 9876543210,
  joinedate: "Jan 2024",
  addresses: [
    {
      label: "Home",
      street: "123 Cross Road",
      area: "Indiranagar",
      city: "Bangaluru",
      state: "Karnataka",
      zip: 560038,
      default: true,
    },
    {
      label: "Work",
      street: "Block 4, Tech Park",
      area: "Whitefield",
      city: "Bangaluru",
      state: "Karnataka",
      zip: 560066,
      default: false,
    },
  ],
};

export const userServiceHistory = [
  {
    serviceId: 1,
    serviceName: "Deep Home Cleaning",
    businessName: "Sparkle Cleaners",
    date: "1-Aug-2026",
    price: 2500,
  },
  {
    serviceId: 2,
    serviceName: "AC Repair & Service",
    businessName: "CoolBreeze Tech",
    date: "Jul 15, 2026",
    price: 850,
  },
];

export const userPendingService = [
  {
    serviceId: 1,
    serviceName: "AC Servicing & Repair",
    date: "5-Aug-2026",
    description:
      "My split AC is not cooling properly and making a loud noise. It's a 1.5 ton Voltas AC.",
    budget: 1500,
    address: {
      label: "Work",
      street: "Block 4, Tech Park",
      area: "Whitefield",
      city: "Bangaluru",
      state: "Karnataka",
      zip: 560066,
      default: false,
    },
    status: "PENDING",
    acceptedVendor: {
      businessId: 1,
      businessName: "Sparkle Cleaners",
    },
  },
];

export const userReviews = [
  {
    providerId: 1,
    businessName: "Sparkle Cleaners",
    rating: 5,
    description:
      "Excellent team. They were on time and left the house spotless.",
    date: "1-Aug-2026",
  },
];

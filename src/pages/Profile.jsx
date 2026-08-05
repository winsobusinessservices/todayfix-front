import React, { useState } from "react";
import ProfileDetails from "../components/ProfileDetails";
import ProfileServicesHistory from "../components/ProfileServicesHistory";
import ProfileReviews from "../components/ProfileReviews";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);

  // Mock User Data
  const [userData, setUserData] = useState({
    firstName: "Shree",
    lastName: "kanth",
    email: "shree.kanth@example.com",
    phone: "+91 98765 43210",
    // bio: "Process & Production Associate",
  });

  // Address Management State
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Home",
      street: "123 Cross Road, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      zip: "560038",
      isDefault: true,
    },
    {
      id: 2,
      label: "Work",
      street: "Block 4, Tech Park, Whitefield",
      city: "Bengaluru",
      state: "Karnataka",
      zip: "560066",
      isDefault: false,
    },
  ]);

  const [editingAddressId, setEditingAddressId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Mock Service History & Reviews (Unchanged)
  const serviceHistory = [
    {
      id: 1,
      service: "Deep Home Cleaning",
      vendor: "Sparkle Cleaners",
      date: "Aug 1, 2026",
      status: "Completed",
      price: "₹2,500",
    },
    {
      id: 2,
      service: "AC Repair & Service",
      vendor: "CoolBreeze Tech",
      date: "Jul 15, 2026",
      status: "Completed",
      price: "₹850",
    },
  ];
  const userReviews = [
    {
      id: 1,
      vendor: "Sparkle Cleaners",
      rating: 5,
      date: "Aug 2, 2026",
      comment: "Excellent team. They were on time and left the house spotless.",
    },
  ];

  // User Profile Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  // Address Handlers
  const handleEditClick = (address) => {
    setEditingAddressId(address.id);
    setEditForm({ ...address });
  };

  const handleCancelEdit = () => {
    setEditingAddressId(null);
    setEditForm({});
  };

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveAddress = (id) => {
    setAddresses((prev) => {
      let updated = prev.map((addr) => (addr.id === id ? editForm : addr));
      // If the newly edited address was set to default, remove default from others
      if (editForm.isDefault) {
        updated = updated.map((addr) => ({
          ...addr,
          isDefault: addr.id === id,
        }));
      }
      return updated;
    });
    setEditingAddressId(null);
  };

  const handleSetDefault = (id) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    );
  };

  return (
    <div className="bg-surface-secondary text-text-primary font-sans relative overflow-hidden pb-20">
      {/* Ambient glowing background is replaced by strict monochrome grid */}
      {/* <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, black 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        ></div>
      </div> */}

      <div className="max-w-5xl mx-auto px-6 pt-20 relative z-10">
        {/* --- Profile Header --- */}
        <div className="bg-surface-primary border border-border-primary rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 shadow-2xl shadow-black/5 mb-10">
          <div className="relative group">
            <div className="w-36 h-36 rounded-full p-1.5 bg-border-secondary group-hover:bg-text-primary transition-colors duration-500">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.firstName}&backgroundColor=transparent`}
                alt="User Avatar"
                className="w-full h-full rounded-full bg-surface-secondary object-cover"
              />
            </div>
            <button className="absolute bottom-2 right-2 bg-surface-dark text-text-inverted p-2.5 rounded-full hover:scale-110 transition-transform shadow-lg border border-zinc-700">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>

          <div className="flex-grow text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              {userData.firstName} {userData.lastName}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-text-secondary text-sm font-semibold">
              <span className="flex items-center gap-2 bg-surface-secondary px-4 py-2 rounded-full border border-border-secondary">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {addresses.find((a) => a.isDefault)?.city || "Location not set"}
              </span>
              <span className="flex items-center gap-2 bg-surface-secondary px-4 py-2 rounded-full border border-border-secondary">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Joined Jan 2024
              </span>
            </div>
          </div>
        </div>

        {/* --- Navigation Tabs --- */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-10 bg-surface-primary border border-border-primary p-2 rounded-2xl shadow-sm">
          {["profile", "history", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 flex-1 ${
                activeTab === tab
                  ? "bg-surface-dark text-text-inverted shadow-md scale-[0.98]"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
              }`}
            >
              {tab === "profile" && "Personal Details"}
              {tab === "history" && "Service History"}
              {tab === "reviews" && "My Reviews"}
            </button>
          ))}
        </div>

        {/* --- Tab Content Area --- */}
        <div className="bg-surface-primary border border-border-primary rounded-2xl p-8 md:p-12 shadow-2xl shadow-black/5 min-h-[500px]">
          {/* TAB 1: Profile & Addresses */}
          {activeTab === "profile" && (
            <ProfileDetails
              userData={userData}
              handleInputChange={handleInputChange}
              handleSaveProfile={handleSaveProfile}
              isSaving={isSaving}
              addresses={addresses}
              handleEditClick={handleEditClick}
              editingAddressId={editingAddressId}
              editForm={editForm}
              handleAddressChange={handleAddressChange}
              handleSaveAddress={handleSaveAddress}
              handleCancelEdit={handleCancelEdit}
              handleSetDefault={handleSetDefault}
            />
          )}

          {/* TAB 2: Service History */}
          {activeTab === "history" && (
            <ProfileServicesHistory serviceHistory={serviceHistory} />
          )}

          {/* TAB 3: User Reviews */}
          {activeTab === "reviews" && (
            <ProfileReviews userReviews={userReviews} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

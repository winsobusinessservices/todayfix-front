import React, { useEffect, useState } from "react";
import ProfileDetails from "../features/profile/ProfileDetails";
import ProfileServicesHistory from "../features/profile/ProfileServicesHistory";
import ProfileReviews from "../features/profile/ProfileReviews";
import ProfileRequests from "../features/profile/ProfileRequests";
import { useQuery } from "@tanstack/react-query";
import {
  userDetails,
  userPendingServices,
  userReviews,
  userServicesHistory,
} from "../services/userApi";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("requests");

  const {
    data: userData,
    isLoading: userDataLoading,
    error: userDataError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: userDetails,
  });

  // console.log(userData);
  

  const {
    data: serviceHistory,
    isLoading: serviceHistoryLoading,
    error: serviceHistoryError,
  } = useQuery({
    queryKey: ["serviceHistory"],
    queryFn: userServicesHistory,
  });

  const {
    data: userReview,
    isLoading: userReviewLoading,
    error: userReviewError,
  } = useQuery({
    queryKey: ["userReviews"],
    queryFn: userReviews,
  });

  const {
    data: userPendingService,
    isLoading: userPendingServicesLoading,
    error: userPendingServicesError,
  } = useQuery({
    queryKey: ["userPendingServices"],
    queryFn: userPendingServices,
  });

  if (userDataLoading) {
    return <p>Loading...</p>;
  }

  if (userDataError) {
    console.log(error.message);
  }

  return (
    <div className="bg-surface-secondary text-text-primary font-sans relative overflow-hidden pb-20">
      <div className="max-w-5xl mx-auto px-6 pt-12 md:pt-16 relative z-10">
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
                {userData.addresses.find((a) => a.default)?.city ||
                  "Location not set"}
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
                Joined {userData.createdAt}
              </span>
            </div>
          </div>
        </div>

        {/* --- Navigation Tabs --- */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-10 bg-surface-primary border border-border-primary p-2 rounded-2xl shadow-sm">
          {["requests", "profile", "history", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 flex-1 ${
                activeTab === tab
                  ? "bg-surface-dark text-text-inverted shadow-md scale-[0.98]"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
              }`}
            >
              {tab === "requests" && "My Requests"}
              {tab === "profile" && "Personal Details"}
              {tab === "history" && "Service History"}
              {tab === "reviews" && "My Reviews"}
            </button>
          ))}
        </div>

        {/* --- Tab Content Area --- */}
        <div className="bg-surface-primary border border-border-primary rounded-2xl p-8 md:p-12 shadow-2xl shadow-black/5 min-h-[500px]">
          {/* TAB 0: My Requests */}
          {activeTab === "requests" && (
            <ProfileRequests
              addresses={userData.addresses}
              userPendingServices={userPendingService}
            />
          )}

          {/* TAB 1: Profile & Addresses */}
          {activeTab === "profile" && <ProfileDetails userData={userData} />}

          {/* TAB 2: Service History */}
          {activeTab === "history" && (
            <ProfileServicesHistory serviceHistory={serviceHistory} />
          )}

          {/* TAB 3: User Reviews */}
          {activeTab === "reviews" && (
            <ProfileReviews userReviews={userReview} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

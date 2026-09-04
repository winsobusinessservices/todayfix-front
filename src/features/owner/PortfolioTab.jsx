import React, { useState, useEffect } from "react";
import {
  Upload,
  X,
  Camera,
  Plus,
  Check,
  FileText,
  Loader2,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { businessApi } from "../../services/businessApi";
import toast from "react-hot-toast";
import { useOutletContext } from "react-router";
import { IMAGE_URL } from "../../services/axiosClient";
import { dateFormater, dateMonthYearFormater } from "../../utils/dateFormater";

const INITIAL_GALLERY = [
  "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=400",
];

const PortfolioTab = () => {
  const queryClient = useQueryClient();
  const [gallery, setGallery] = useState(INITIAL_GALLERY);
  const [profileId, setProfileId] = useState(null);
  const [details, setDetails] = useState({
    name: "",
    description: "",
    location: "",
    email: "",
    phone: "",
    website: "",
  });

  const profile = useOutletContext();

  useEffect(() => {
    if (profile) {
      setProfileId(profile.business_profile_uuid);
      setDetails({
        name: profile.name || "",
        description: profile.description || "",
        location: profile.location || "",
        email: profile.email || "",
        phone: profile.phone || "",
        website: profile.website || "",
      });
    }
  }, [profile]);

  const {
    mutate: updateProfile,
    isPending: isSaving,
    isSuccess: isSaved,
  } = useMutation({
    mutationFn: (data) => businessApi.updateProfile(profileId, data),
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries(["businessProfiles"]);
      setTimeout(() => queryClient.resetQueries(["businessProfiles"]), 2000);
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  // Fetch Business Applications to get UUID for documents
  const { data: appListData } = useQuery({
    queryKey: ["businessAppList"],
    queryFn: businessApi.getBusinessApplicationList,
  });

  const applications = appListData?.data?.filter(
    (item) => item.status === "APPROVED",
  )[0];
  const appId = applications?.business_application_uuid || null;

  // Fetch Documents
  // const { data: documentsData, isLoading: docsLoading } = useQuery({
  //   queryKey: ["businessAppDocs", appId],
  //   queryFn: () => businessApi.getBusinessApplicationDocuments(appId),
  //   enabled: !!appId,
  // });

  // console.log(applications);
  const docsLoading = false;

  const handleSave = () => {
    if (profileId) {
      updateProfile({
        name: details.name,
        description: details.description,
        location: details.location,
        email: details.email,
        phone: details.phone,
        website: details.website,
      });
    } else {
      toast.error("No business profile found to update.");
    }
  };

  const deleteImage = (index) => {
    setGallery(gallery.filter((_, i) => i !== index));
  };

  const mockUpload = () => {
    const newImages = [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1527515637-640a3e8bc8ce?auto=format&fit=crop&q=80&w=400",
    ];
    const randomImg = newImages[Math.floor(Math.random() * newImages.length)];
    setGallery([...gallery, randomImg]);
  };

  const renderDocumentLink = (label, url) => {
    if (!url) return null;
    return (
      <a
        href={IMAGE_URL + url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-3 rounded-xl border border-border-primary bg-surface-secondary hover:border-text-primary transition-colors"
      >
        <FileText className="w-5 h-5 text-blue-500" />
        <span className="text-sm font-bold text-text-primary">{label}</span>
      </a>
    );
  };

  // sdjfkdshf
  const contactInfo = [
    {
      id: 1,
      label: "Website",
      value: profile?.website || "Website Not Added",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
      ),
    },
    {
      id: 2,
      label: "Email",
      value: profile?.email || "Email Not Added",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
      ),
    },
    {
      id: 3,
      label: "Phone",
      value: "+91 " + profile?.phone,
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.54-4.24-7.136-7.136l1.292-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      label: "Joined",
      value: dateFormater(profile?.created_at),
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          />
        </svg>
      ),
    },
  ];

  const tags = [
    "UI Designer",
    "UX Designer",
    "Design System",
    "Product",
    "Succesfull",
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-text-primary mb-2">
          Portfolio & Profile
        </h1>
        <p className="text-zinc-400">
          Update your public profile and showcase your best work.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Left Col: Profile Editor & Documents */}
        <div className="flex gap-6 w-full">
          <div className="bg-surface-primary rounded-2xl border border-border-primary p-6 shadow-2xl shadow-black/5 w-3/4">
            <h2 className="text-xl font-bold tracking-tight text-text-primary mb-6">
              Business Details
            </h2>
            <div className="space-y-4 border flex flex-col">
              <div className="flex items-end">
                <div className="flex flex-col justify-center items-center gap-4 w-fit p-4">
                  <div className="w-24 h-24 rounded-full bg-surface-secondary border-2 border-dashed border-border-primary flex items-center justify-center relative group cursor-pointer overflow-hidden">
                    {applications?.identity?.logo ? (
                      <img
                        src={IMAGE_URL + applications?.identity?.logo}
                        alt="Logo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-text-primary group-hover:opacity-0 transition-opacity">
                        {details.name
                          ? details.name.substring(0, 2).toUpperCase()
                          : "BU"}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="text-white w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-xs text-zinc-500 font-medium">
                    Update Logo
                  </p>
                </div>

                <div className="">
                  <label className="block text-sm font-bold text-text-primary mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={details.name}
                    onChange={(e) =>
                      setDetails({ ...details, name: e.target.value })
                    }
                    className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-text-primary transition-colors font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-text-primary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={details.email}
                  onChange={(e) =>
                    setDetails({ ...details, email: e.target.value })
                  }
                  className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-text-primary transition-colors font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-primary mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  value={details.phone}
                  onChange={(e) =>
                    setDetails({ ...details, phone: e.target.value })
                  }
                  className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-text-primary transition-colors font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-primary mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={details.website}
                  onChange={(e) =>
                    setDetails({ ...details, website: e.target.value })
                  }
                  className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-text-primary transition-colors font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-primary mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={details.location}
                  onChange={(e) =>
                    setDetails({ ...details, location: e.target.value })
                  }
                  className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-text-primary transition-colors font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-primary mb-2">
                  About Us
                </label>
                <textarea
                  rows={4}
                  value={details.description}
                  onChange={(e) =>
                    setDetails({ ...details, description: e.target.value })
                  }
                  className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-text-primary transition-colors resize-none font-medium"
                  placeholder="Describe your business..."
                />
              </div>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full py-3 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md mt-4 flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <span className="w-5 h-5 border-2 border-text-inverted border-t-transparent rounded-full animate-spin"></span>
                ) : isSaved ? (
                  <>
                    <Check className="w-5 h-5" /> Saved
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>

          <div className="min-h-screen bg-surface-secondary flex items-center justify-center p-6 font-sans border w-3/4">
            <div className="w-full flex flex-col gap-6">
              <div className="bg-surface-secondary rounded-3xl overflow-hidden shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-slate-100">
                <div className="h-40 w-full bg-[#0a0f25] relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      background:
                        "radial-gradient(circle at 20% 150%, #2563eb 0%, transparent 50%), radial-gradient(circle at 80% -50%, #3b82f6 0%, transparent 50%)",
                    }}
                  ></div>
                </div>

                <div className="px-6 pb-8 relative flex flex-col items-center text-center">
                  <div className="w-28 h-28 rounded-full border-[6px] border-white bg-slate-50 -mt-14 relative z-10 flex items-center justify-center overflow-hidden shadow-sm">
                    {applications?.identity?.logo ? (
                      <img
                        src={IMAGE_URL + applications?.identity?.logo}
                        alt="Arnoldy Chafe"
                        className="w-full h-full object-cover mt-2"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-text-primary group-hover:opacity-0 transition-opacity">
                        {details.name
                          ? details?.name?.substring(0, 2).toUpperCase()
                          : "BU"}
                      </span>
                    )}
                  </div>

                  <div className="mt-3">
                    <h1 className="text-2xl font-bold text-slate-900 mt-1 tracking-tight">
                      {details.name}
                    </h1>
                  </div>

                  <div className="flex items-center gap-2 mt-2 text-sm font-medium">
                    <span className="text-indigo-500">{applications?.business_type}</span>
                    <span className="text-slate-300">|</span>
                    {/* <span className="text-slate-400">Joined {dateMonthYearFormater(profile)}</span> */}
                  </div>

                  {/* Action Buttons */}
                  {/* <div className="flex flex-wrap items-center justify-center gap-3 mt-6 w-full">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Follow
                    </button>

                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                      Message
                    </button>

                    <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                      More
                    </button>
                  </div> */}

                  <p className="mt-8 text-slate-700 text-[15px] leading-relaxed max-w-sm mx-auto font-semibold">
                    {profile?.description || "No description available"}
                  </p>
                </div>
              </div>

              {/* --- BOTTOM CARD: Information --- */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">
                  Information
                </h2>

                <div className="flex flex-col gap-5">
                  {contactInfo.map((info) => (
                    <div
                      key={info.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 text-slate-400">
                        {info.icon}
                        <span className="font-medium text-[15px]">
                          {info.label}
                        </span>
                      </div>
                      <div className="text-slate-900 font-semibold text-[15px]">
                        {info.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-full h-px bg-slate-100 my-8"></div>

                {/* Tags */}
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-slate-50 text-slate-700 border border-slate-100 rounded-lg text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Business Documents Card */}
          <div className="bg-surface-primary rounded-2xl border border-border-primary p-6 shadow-2xl shadow-black/5 h-fit">
            <h2 className="text-xl font-bold tracking-tight text-text-primary mb-4">
              Verified Documents
            </h2>
            {docsLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
              </div>
            ) : !appId ? (
              <p className="text-sm text-zinc-500">
                No application documents found.
              </p>
            ) : (
              <div className="space-y-3">
                {renderDocumentLink(
                  "PAN Document",
                  applications?.identity?.pan_document,
                )}
                {renderDocumentLink(
                  "Aadhaar Document",
                  applications?.identity?.aadhaar_document,
                )}
                {renderDocumentLink(
                  "Internal Store Photo",
                  applications?.identity?.internal_store_photo,
                )}
                {renderDocumentLink(
                  "External Store Photo",
                  applications?.identity?.external_store_photo,
                )}
                {renderDocumentLink(
                  "Cancelled GST/Bill",
                  applications?.identity?.cancelled_gst_bill_book_photo,
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Gallery */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cover Image */}
          <div className="bg-surface-primary rounded-3xl border border-border-primary p-6 shadow-2xl shadow-black/5">
            <h2 className="text-xl font-bold tracking-tight text-text-primary mb-4">
              Cover Image
            </h2>
            <div className="w-full h-48 rounded-2xl bg-surface-secondary border-2 border-dashed border-border-primary flex flex-col items-center justify-center cursor-pointer hover:bg-border-primary transition-colors group">
              <div className="p-4 bg-surface-primary rounded-full border border-border-primary mb-2 group-hover:scale-110 transition-transform shadow-sm">
                <Upload className="w-6 h-6 text-zinc-400" />
              </div>
              <p className="text-sm font-bold text-text-primary">
                Click to upload cover
              </p>
              <p className="text-xs text-zinc-500">1920x1080px recommended</p>
            </div>
          </div>

          {/* Work Gallery */}
          <div className="bg-surface-primary rounded-3xl border border-border-primary p-6 shadow-2xl shadow-black/5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold tracking-tight text-text-primary">
                Work Gallery
              </h2>
              <span className="text-sm text-zinc-500 font-medium">
                {gallery.length} / 10 Images
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((img, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-2xl overflow-hidden relative group"
                >
                  <img
                    src={img}
                    alt={`Gallery ${i}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => deleteImage(i)}
                      className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Upload New Button */}
              {gallery.length < 10 && (
                <div
                  onClick={mockUpload}
                  className="aspect-square rounded-2xl bg-surface-secondary border-2 border-dashed border-border-primary flex flex-col items-center justify-center cursor-pointer hover:bg-border-primary transition-colors group"
                >
                  <div className="p-2 bg-surface-primary rounded-full border border-border-primary mb-2 group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6 text-zinc-400" />
                  </div>
                  <span className="text-sm font-bold text-text-primary">
                    Add Photo
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioTab;

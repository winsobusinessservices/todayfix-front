import React, { useState, useEffect } from "react";
import {
  Upload,
  X,
  Camera,
  Plus,
  Check,
  FileText,
  Loader2,
  Edit3,
  CreditCard,
  ShieldCheck,
  Contact,
  GalleryHorizontal,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { businessApi } from "../../services/businessApi";
import toast from "react-hot-toast";
import { useOutletContext } from "react-router";
import { IMAGE_URL } from "../../services/axiosClient";
import { dateMonthYearFormater } from "../../utils/dateFormater";
import { IconLocation } from "@tabler/icons-react";

const INITIAL_GALLERY = [
  "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=400",
];

const PortfolioTab = () => {
  const queryClient = useQueryClient();
  const [gallery, setGallery] = useState(INITIAL_GALLERY);
  const [profileId, setProfileId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
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

  const { mutate: updateProfile, isPending: isSaving } = useMutation({
    mutationFn: (data) => businessApi.updateProfile(profileId, data),
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      queryClient.invalidateQueries(["businessProfiles"]);
      setTimeout(() => queryClient.resetQueries(["businessProfiles"]), 2000);
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  const { data: appListData } = useQuery({
    queryKey: ["businessAppList"],
    queryFn: businessApi.getBusinessApplicationList,
  });

  const applications = Array.isArray(appListData)
    ? appListData
    : appListData?.data || appListData?.results || [];
  const firstApp = applications.length > 0 ? applications[0] : null;
  const appId = firstApp?.business_application_uuid;

  // const { data: docsData } = useQuery({
  //   queryKey: ["docs-data"],
  //   queryFn: businessApi.getBusinessApplicationDocuments(appId),
  // });

  const bankAccount = firstApp?.bank_account;
  const identity = firstApp?.identity;

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
        <span className="text-xs text-text-primary bg-surface-secondary border border-border-primary rounded-lg font-medium px-2 py-1">
          {label}
        </span>
      </a>
    );
  };

  const contactInfo = [
    {
      id: 1,
      label: "Website",
      value: profile?.website || "Website Not Added",
      editKey: "website",
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
      editKey: "email",
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
      value: profile?.phone ? "+91 " + profile.phone : "Phone Not Added",
      editKey: "phone",
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
      value: dateMonthYearFormater(profile?.created_at),
      editKey: null,
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
    {
      id: 5,
      label: "Location",
      value: profile?.location || "Location Not Added",
      editKey: "location",
      icon: <IconLocation className="size-5" />,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-text-primary mb-2">
          Portfolio & Profile
        </h1>
        <p className="text-zinc-400">
          Update your public profile and showcase your best work.
        </p>
      </div>

      <div className="flex flex-col">
        <div className="flex gap-6 w-full">
          <div className="bg-surface-secondary w-full font-sans">
            <div className="w-full flex flex-col gap-6">
              <div className="bg-surface-primary rounded-2xl overflow-hidden shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-border-primary">
                <div className="h-48 w-full relative rounded-2xl overflow-hidden">
                  {firstApp?.identity?.banner ? (
                    <img
                      src={IMAGE_URL + firstApp.identity.banner}
                      alt="Profile Banner"
                      className="w-full h-full object-cover absolute top-0 left-0 opacity-80"
                    />
                  ) : (
                    <div className="w-full h-48 rounded-2xl bg-surface-secondary border-2 border-dashed border-border-primary flex flex-col items-center justify-center">
                      <div className="p-4 bg-surface-primary rounded-full border border-border-primary mb-2 shadow-sm">
                        <Upload className="w-6 h-6 text-zinc-400" />
                      </div>
                      <p className="text-sm font-bold text-text-primary">
                        Banner Image
                      </p>
                    </div>
                  )}
                </div>

                <div className="px-6 pb-8 relative flex flex-col items-center text-center">
                  <div className="w-28 h-28 rounded-full border-[6px] border-surface-primary bg-surface-secondary -mt-14 relative z-10 flex items-center justify-center overflow-hidden shadow-sm">
                    {firstApp?.identity?.logo ? (
                      <img
                        src={IMAGE_URL + firstApp.identity.logo}
                        alt=""
                        className="w-full h-full object-cover mt-2 rounded-full"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-text-primary">
                        {details.name
                          ? details.name.substring(0, 2).toUpperCase()
                          : "BU"}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 w-full max-w-sm">
                    {isEditing ? (
                      <input
                        type="text"
                        value={details.name}
                        onChange={(e) =>
                          setDetails({ ...details, name: e.target.value })
                        }
                        className="w-full text-center text-2xl font-bold text-text-primary mt-1 tracking-tight bg-surface-secondary border-b-2 border-border-primary focus:outline-none focus:border-text-primary py-1"
                        placeholder="Business Name"
                      />
                    ) : (
                      <h1 className="text-2xl font-bold text-text-primary mt-1 tracking-tight">
                        {details.name}
                      </h1>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-2 mt-2 text-sm font-medium w-full">
                    <span className="text-indigo-500">
                      {firstApp?.business_type || "Business Profile"}
                    </span>
                    <span className="text-zinc-500">|</span>
                    <span className="text-zinc-400">
                      Joined {dateMonthYearFormater(profile?.created_at)}
                    </span>
                  </div>

                  <div className="mt-8 w-full max-w-sm mx-auto">
                    {isEditing ? (
                      <textarea
                        rows={3}
                        value={details.description}
                        onChange={(e) =>
                          setDetails({
                            ...details,
                            description: e.target.value,
                          })
                        }
                        className="w-full text-center text-zinc-400 text-[15px] font-semibold bg-surface-secondary border-b-2 border-border-primary focus:outline-none focus:border-text-primary py-1 resize-none"
                        placeholder="Business description"
                      />
                    ) : (
                      <p className="text-zinc-400 text-[15px] leading-relaxed font-semibold">
                        {details.description || "No description available"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Information / Edit Card */}
              <div className="bg-surface-primary rounded-3xl p-6 md:p-8 shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-border-primary">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-text-primary tracking-tight flex items-center gap-1">
                    <Contact className="w-6 h-6" />
                    Contact Information
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors bg-blue-500/10 px-3 py-1.5 rounded-full"
                    >
                      <Edit3 className="w-4 h-4" /> Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-text-primary transition-colors bg-surface-secondary px-3 py-1.5 rounded-full"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 text-sm font-bold text-text-inverted bg-surface-dark hover:bg-zinc-800 transition-colors px-3 py-1.5 rounded-full disabled:opacity-50"
                      >
                        {isSaving ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Check className="w-4 h-4" />
                        )}{" "}
                        Save
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-5">
                  {contactInfo.map((info) => (
                    <div
                      key={info.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 text-zinc-400">
                        {info.icon}
                        <span className="font-medium text-[15px]">
                          {info.label}
                        </span>
                      </div>

                      {isEditing && info.editKey ? (
                        <input
                          type={info.editKey === "email" ? "email" : "text"}
                          value={details[info.editKey]}
                          onChange={(e) =>
                            setDetails({
                              ...details,
                              [info.editKey]: e.target.value,
                            })
                          }
                          className="text-text-primary font-semibold text-[15px] bg-surface-secondary border border-border-primary rounded-lg px-3 py-1 focus:outline-none focus:border-text-primary text-right w-1/2"
                        />
                      ) : (
                        <div className="text-text-primary font-semibold text-[15px]">
                          {isEditing
                            ? info.editKey === null
                              ? info.value
                              : details[info.editKey]
                            : info.value}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="w-full h-px bg-surface-secondary my-5"></div>

                <div className="flex flex-wrap gap-3">
                  {!appId ? (
                    <p className="text-sm text-zinc-500 text-center w-full">
                      No application documents found.
                    </p>
                  ) : (
                    <div className="w-full">
                      <h2 className="text-xl font-bold text-text-primary tracking-tight mb-4 flex items-center gap-1">
                        <ShieldCheck className="w-5 h-5" />
                        Verified Documents
                      </h2>
                      <div className="flex flex-wrap gap-3 w-full">
                        {renderDocumentLink(
                          "PAN Document",
                          firstApp?.identity?.pan_document,
                        )}
                        {renderDocumentLink(
                          "Aadhaar Document",
                          firstApp?.identity?.aadhaar_document,
                        )}
                        {renderDocumentLink(
                          "Internal Store Photo",
                          firstApp?.identity?.internal_store_photo,
                        )}
                        {renderDocumentLink(
                          "External Store Photo",
                          firstApp?.identity?.external_store_photo,
                        )}
                        {renderDocumentLink(
                          "Cancelled GST/Bill",
                          firstApp?.identity?.cancelled_gst_bill_book_photo,
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Identity & Verification Card */}
              <div className="bg-surface-primary rounded-3xl p-6 md:p-8 shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-border-primary">
                <div className="flex items-center gap-1 mb-6">
                  <ShieldCheck className="w-5 h-5" />
                  <h2 className="text-xl font-bold text-text-primary tracking-tight">
                    Identity Details
                  </h2>
                </div>
                {identity ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <p className="text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wider">
                        PAN Number
                      </p>
                      <p className="font-semibold text-text-primary">
                        {identity.pan_number || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wider">
                        Aadhaar Number
                      </p>
                      <p className="font-semibold text-text-primary">
                        {identity.aadhaar_number || "-"}
                      </p>
                    </div>
                    {identity.gst_number && (
                      <div>
                        <p className="text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wider">
                          GST Number
                        </p>
                        <p className="font-semibold text-text-primary">
                          {identity.gst_number}
                        </p>
                      </div>
                    )}
                    {identity.udyam_number && (
                      <div>
                        <p className="text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wider">
                          Udyam Number
                        </p>
                        <p className="font-semibold text-text-primary">
                          {identity.udyam_number}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-zinc-500">
                    No identity data available.
                  </p>
                )}
              </div>

              {/* Bank Account Card */}
              <div className="bg-surface-primary rounded-3xl p-6 md:p-8 shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-border-primary">
                <div className="flex items-center gap-1 mb-6">
                  <CreditCard className="w-5 h-5" />
                  <h2 className="text-xl font-bold text-text-primary tracking-tight">
                    Bank Account
                  </h2>
                </div>
                {bankAccount ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <p className="text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wider">
                        Bank Name
                      </p>
                      <p className="font-semibold text-text-primary">
                        {bankAccount.bank_name || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wider">
                        Account Holder
                      </p>
                      <p className="font-semibold text-text-primary">
                        {bankAccount.account_holder_name || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wider">
                        Account Number
                      </p>
                      <p className="font-semibold text-text-primary">
                        {bankAccount.account_number
                          ? `XXXX-XXXX-${bankAccount.account_number.slice(-4)}`
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wider">
                        IFSC Code
                      </p>
                      <p className="font-semibold text-text-primary">
                        {bankAccount.ifsc_code || "-"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-zinc-500">
                    No bank account data available.
                  </p>
                )}
              </div>

              <div className="w-full flex flex-col gap-6">
                <div className="bg-surface-primary rounded-3xl p-6 px-8 shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-border-primary">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold tracking-tight text-text-primary flex items-center gap-1">
                      <GalleryHorizontal className="w-5 h-5" />
                      Work Gallery
                    </h2>
                    <span className="text-sm text-zinc-400 font-medium bg-surface-secondary px-2 py-1 rounded-md">
                      {gallery.length} / 10
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

                    {gallery.length < 10 && (
                      <div
                        onClick={mockUpload}
                        className="aspect-square rounded-2xl bg-surface-secondary border-2 border-dashed border-border-primary flex flex-col items-center justify-center cursor-pointer hover:border-text-primary transition-colors group"
                      >
                        <div className="p-2 bg-surface-primary rounded-full border border-border-primary mb-2 group-hover:scale-110 transition-transform shadow-sm">
                          <Plus className="w-5 h-5 text-zinc-400" />
                        </div>
                        <span className="text-xs font-bold text-zinc-500 group-hover:text-text-primary transition-colors">
                          Add Photo
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioTab;

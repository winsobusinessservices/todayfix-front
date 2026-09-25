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
  Info,
  HelpCircle,
  Link as LinkIcon,
  Trash2,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { businessApi } from "../../services/businessApi";
import toast from "react-hot-toast";
import { useOutletContext } from "react-router";
import { IMAGE_URL } from "../../services/axiosClient";
import { dateMonthYearFormater } from "../../utils/dateFormater";
import { IconLocation } from "@tabler/icons-react";
import MapPicker from "../../components/modals/MapPicker";

const PortfolioTab = () => {
  const queryClient = useQueryClient();
  const [gallery, setGallery] = useState([]);
  const [profileId, setProfileId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    description: "",
    location: "",
    email: "",
    phone: "",
    website: "",
    business_type: "",
  });

  const profile = useOutletContext();

  useEffect(() => {
    if (profile) {
      setProfileId(profile.business_profile_uuid);
      setDetails({
        name: profile.business_name || "",
        description: profile.description || "",
        location: profile.address || "",
        email: profile.contact_email || "",
        phone: profile.contact_phone || "",
        website: profile.website || "",
        business_type: profile.business_type || "INDIVIDUAL",
      });
    }
  }, [profile]);

  const { data: portfolioData, isLoading: isPortfolioLoading } = useQuery({
    queryKey: ["businessPortfolio", profileId],
    queryFn: () => businessApi.businessPortfolio(profileId),
    enabled: !!profileId,
    retry: false,
  });

  const portfolio =
    portfolioData?.results || portfolioData?.data || portfolioData;
  // console.log(portfolio);

  const [faqs, setFaqs] = useState([]);
  const [socialLinks, setSocialLinks] = useState({
    facebook_url: "",
    instagram_url: "",
    twitter_url: "",
    linkedin_url: "",
  });
  const [portfolioDetails, setPortfolioDetails] = useState({
    established_year: "",
    starting_price: "",
    response_time: "",
  });
  const [newGalleryImages, setNewGalleryImages] = useState([]);

  useEffect(() => {
    if (portfolio && !isPortfolioLoading) {
      if (portfolio.faqs) {
        try {
          const parsedFaqs =
            typeof portfolio.faqs === "string"
              ? JSON.parse(portfolio.faqs)
              : portfolio.faqs;
          setFaqs(Array.isArray(parsedFaqs) ? parsedFaqs : []);
        } catch (e) {
          setFaqs([]);
        }
      } else {
        setFaqs([]);
      }

      setSocialLinks({
        facebook_url: portfolio.facebook_url || "",
        instagram_url: portfolio.instagram_url || "",
        twitter_url: portfolio.twitter_url || "",
        linkedin_url: portfolio.linkedin_url || "",
      });

      setPortfolioDetails({
        established_year: portfolio.established_year || "",
        starting_price: portfolio.starting_price || "",
        response_time: portfolio.response_time || "",
      });
      if (portfolio.gallery_images) {
        // if gallery_images is a JSON string of objects, parse it
        try {
          const parsedGallery =
            typeof portfolio.gallery_images === "string"
              ? JSON.parse(portfolio.gallery_images)
              : portfolio.gallery_images;
          setGallery(Array.isArray(parsedGallery) ? parsedGallery : []);
        } catch (e) {
          setGallery(portfolio.gallery_images);
        }
      }
    }
  }, [portfolio, isPortfolioLoading]);

  const { mutate: updateProfile, isPending: isSavingProfile } = useMutation({
    mutationFn: (data) => businessApi.updateProfile(profileId, data),
    onSuccess: () => {
      // toast.success("Profile updated successfully!");
      queryClient.invalidateQueries(["businessProfiles"]);
      setTimeout(() => queryClient.resetQueries(["businessProfiles"]), 2000);
    },
    onError: (error) => {
      toast.error("Failed to update profile");
      console.log(error?.response?.data);
    },
  });

  const { mutate: savePortfolio, isPending: isSavingPortfolio } = useMutation({
    mutationFn: async (data) => {
      try {
        if (portfolio?.business_profile_uuid) {
          return await businessApi.businessUpdatePortfolio(data);
        } else {
          return await businessApi.businessCreatePortfolio(data);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          return await businessApi.businessCreatePortfolio(data);
        }
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Profile & Portfolio updated successfully!");
      setIsEditing(false);
      setNewGalleryImages([]);
      queryClient.invalidateQueries(["businessPortfolio", profileId]);
    },
    onError: (error) => {
      const errorData = error?.response?.data;
      if (errorData && typeof errorData === "object") {
        // Try to show the first specific field error if available
        const firstErrorKey = Object.keys(errorData)[0];
        if (firstErrorKey && Array.isArray(errorData[firstErrorKey])) {
          toast.error(`${firstErrorKey}: ${errorData[firstErrorKey][0]}`);
        } else {
          toast.error("Failed to update portfolio. Please check your inputs.");
        }
      } else {
        toast.error("Failed to update portfolio");
      }
      console.log(errorData);
    },
  });

  const { mutate: deleteImageMutation } = useMutation({
    mutationFn: (imageId) =>
      businessApi.businessPortfolioDeleteGalleryImage(imageId),
    onSuccess: () => {
      toast.success("Image deleted");
      queryClient.invalidateQueries(["businessPortfolio", profileId]);
    },
    onError: () => toast.error("Failed to delete image"),
  });

  const { mutate: deleteFaqMutation } = useMutation({
    mutationFn: (faqId) => businessApi.businessDeletePortfolioFaq(faqId),
    onSuccess: () => {
      toast.success("FAQ deleted");
      queryClient.invalidateQueries(["businessPortfolio", profileId]);
    },
    onError: () => toast.error("Failed to delete FAQ"),
  });

  const isSaving = isSavingProfile || isSavingPortfolio;

  const { data: appListData } = useQuery({
    queryKey: ["businessAppList"],
    queryFn: businessApi.getBusinessApplicationList,
  });

  const applications = Array.isArray(appListData)
    ? appListData
    : appListData?.data || appListData?.results || [];
  const firstApp = applications.length > 0 ? applications[0] : null;
  const appId = firstApp?.business_application_uuid;

  // const { data: docsData, isLoading: isDocsLoading } = useQuery({
  //   queryKey: ["docs-data", appId],
  //   queryFn: () => businessApi.getBusinessApplicationDocuments(appId),
  //   enabled: !!appId,
  // });

  // const documents = docsData?.data || docsData || {};
  const isDocsLoading = false; // remove later when commenting out the top api

  const bankAccount = firstApp?.bank_account;
  const identity = firstApp?.identity;

  const handleSave = () => {
    if (profileId) {
      const payload = {
        business_name: details.name,
        description: details.description,
        address: details.location,
        business_type: details.business_type,
      };

      if (details.email) payload.contact_email = details.email;
      if (details.phone) payload.contact_phone = details.phone;
      if (details.website) payload.website = details.website;

      updateProfile(payload);

      // Prepare Portfolio FormData
      const formData = new FormData();
      if (portfolioDetails.established_year)
        formData.append("established_year", portfolioDetails.established_year);
      if (portfolioDetails.starting_price)
        formData.append("starting_price", portfolioDetails.starting_price);
      if (portfolioDetails.response_time)
        formData.append("response_time", portfolioDetails.response_time);
      if (socialLinks.facebook_url)
        formData.append("facebook_url", socialLinks.facebook_url);
      if (socialLinks.instagram_url)
        formData.append("instagram_url", socialLinks.instagram_url);
      if (socialLinks.twitter_url)
        formData.append("twitter_url", socialLinks.twitter_url);
      if (socialLinks.linkedin_url)
        formData.append("linkedin_url", socialLinks.linkedin_url);

      const faqsToSave = faqs.filter(
        (faq) => faq.question && faq.answer && !faq.faq_uuid,
      );
      if (faqsToSave.length > 0) {
        formData.append("faqs", JSON.stringify(faqsToSave));
      }

      newGalleryImages.forEach((file) => {
        formData.append("gallery_images", file);
      });

      savePortfolio(formData);
    } else {
      toast.error("No business profile found to update.");
    }
  };

  const deleteImage = (index, isNew = false, imageId = null) => {
    if (isNew) {
      setNewGalleryImages(newGalleryImages.filter((_, i) => i !== index));
    } else {
      if (imageId) {
        deleteImageMutation(imageId);
      } else {
        // If it's from INITIAL_GALLERY
        setGallery(gallery.filter((_, i) => i !== index));
      }
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setNewGalleryImages((prev) => [...prev, ...files]);
    }
  };

  const handleAddFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const handleFaqChange = (index, field, value) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  const handleRemoveFaq = (index, faqId = null) => {
    if (faqId) {
      deleteFaqMutation(faqId);
    } else {
      setFaqs(faqs.filter((_, i) => i !== index));
    }
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
      value: details?.website || "Website Not Added",
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
      value: details?.email || "Email Not Added",
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
      value: details?.phone ? "+91 " + details.phone : "Phone Not Added",
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
      value: details?.location?.includes("<iframe") ? (
        <div className="w-full rounded-xl overflow-hidden border border-border-primary mt-2">
          <div
            className="w-full h-48"
            dangerouslySetInnerHTML={{
              __html: details.location.replace('height="300"', 'height="100%"'),
            }}
          />
        </div>
      ) : (
        details?.location || "Location Not Added"
      ),
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
                  {gallery.length > 0 ? (
                    <img
                      src={gallery[0].image}
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
                    {isEditing ? (
                      <select
                        value={details.business_type}
                        onChange={(e) =>
                          setDetails({
                            ...details,
                            business_type: e.target.value,
                          })
                        }
                        className="bg-surface-secondary text-indigo-500 font-medium py-1 px-2 border-b-2 border-border-primary focus:outline-none focus:border-text-primary text-center appearance-none cursor-pointer"
                      >
                        <option value="INDIVIDUAL">INDIVIDUAL</option>
                        <option value="COMPANY">COMPANY</option>
                        <option value="INVESTOR">INVESTOR</option>
                      </select>
                    ) : (
                      <span className="text-indigo-500">
                        {details.business_type ||
                          firstApp?.business_type ||
                          "Business Profile"}
                      </span>
                    )}
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
                <div className="flex flex-col md:flex-row gap-3 justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-text-primary tracking-tight flex items-center gap-1">
                    <Contact className="w-6 h-6" />
                    Contact Information
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 text-sm font-bold text-text-primary hover:opacity-80 transition-colors bg-surface-secondary px-3 py-1.5 rounded-full border border-border-primary"
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
                        className="btn-primary flex items-center gap-2 text-sm font-bold text-text-inverted bg-surface-dark hover:bg-zinc-800 transition-colors px-3 py-1.5 rounded-full disabled:opacity-50"
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

                <div className="flex flex-col gap-6">
                  {contactInfo.map((info) => (
                    <div
                      key={info.id}
                      className={`flex ${
                        info.editKey === "location"
                          ? "flex-col items-start gap-3"
                          : "items-center justify-between"
                      }`}
                    >
                      <div className="flex items-center gap-3 text-zinc-400">
                        {info.icon}
                        <span className="font-medium text-[15px]">
                          {info.label}
                        </span>
                      </div>

                      {isEditing && info.editKey ? (
                        info.editKey === "location" ? (
                          <div className="flex flex-col items-end gap-2 w-full">
                            {details?.location?.includes("<iframe") && (
                              <div className="w-full h-48 rounded-xl overflow-hidden border border-border-primary">
                                <div
                                  className="w-full h-full"
                                  dangerouslySetInnerHTML={{
                                    __html: details.location.replace(
                                      'height="300"',
                                      'height="100%"',
                                    ),
                                  }}
                                />
                              </div>
                            )}
                            <button
                              onClick={() => setIsMapOpen(true)}
                              className="text-text-primary font-semibold text-[15px] bg-surface-secondary border border-border-primary rounded-lg px-4 py-2 hover:border-text-primary transition-colors text-center w-full"
                            >
                              {details?.location?.includes("<iframe")
                                ? "Change Location"
                                : "Select Map Location"}
                            </button>
                          </div>
                        ) : (
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
                        )
                      ) : (
                        <div
                          className={`text-text-primary font-semibold text-[15px] ${info.editKey === "location" ? "w-full" : ""}`}
                        >
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

                <MapPicker
                  isOpen={isMapOpen}
                  onClose={() => setIsMapOpen(false)}
                  onConfirm={(iframeString) =>
                    setDetails({ ...details, location: iframeString })
                  }
                />

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
                      {isDocsLoading ? (
                        <div className="flex items-center gap-2 text-zinc-400">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm">Loading documents...</span>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-3 w-full">
                          {renderDocumentLink(
                            "PAN Document",
                            identity?.pan_document,
                          )}
                          {renderDocumentLink(
                            "Aadhaar Document",
                            identity?.aadhaar_document,
                          )}
                          {renderDocumentLink(
                            "Internal Store Photo",
                            identity?.internal_store_photo,
                          )}
                          {renderDocumentLink(
                            "External Store Photo",
                            identity?.external_store_photo,
                          )}
                          {renderDocumentLink(
                            "Cancelled GST/Bill",
                            identity?.cancelled_gst_bill_book_photo,
                          )}
                          {renderDocumentLink("Logo", identity?.logo)}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Portfolio Details Card */}
              <div className="bg-surface-primary rounded-3xl p-6 md:p-8 shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-border-primary">
                <div className="flex items-center gap-1 mb-6">
                  <Info className="w-5 h-5" />
                  <h2 className="text-xl font-bold text-text-primary tracking-tight">
                    Portfolio Details
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <p className="text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wider">
                      Established Year
                    </p>
                    {isEditing ? (
                      <input
                        type="number"
                        value={portfolioDetails.established_year}
                        onChange={(e) =>
                          setPortfolioDetails({
                            ...portfolioDetails,
                            established_year: e.target.value,
                          })
                        }
                        className="text-text-primary font-semibold text-[15px] bg-surface-secondary border border-border-primary rounded-lg px-3 py-1 w-full focus:outline-none focus:border-text-primary"
                        placeholder="e.g. 2015"
                      />
                    ) : (
                      <p className="font-semibold text-text-primary">
                        {portfolioDetails.established_year || "-"}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wider">
                      Starting Price (₹)
                    </p>
                    {isEditing ? (
                      <input
                        type="number"
                        value={portfolioDetails.starting_price}
                        onChange={(e) =>
                          setPortfolioDetails({
                            ...portfolioDetails,
                            starting_price: e.target.value,
                          })
                        }
                        className="text-text-primary font-semibold text-[15px] bg-surface-secondary border border-border-primary rounded-lg px-3 py-1 w-full focus:outline-none focus:border-text-primary"
                        placeholder="e.g. 999"
                      />
                    ) : (
                      <p className="font-semibold text-text-primary">
                        {portfolioDetails.starting_price
                          ? `₹${portfolioDetails.starting_price}`
                          : "-"}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wider">
                      Response Time
                    </p>
                    {isEditing ? (
                      <select
                        value={portfolioDetails.response_time}
                        onChange={(e) =>
                          setPortfolioDetails({
                            ...portfolioDetails,
                            response_time: e.target.value,
                          })
                        }
                        className="text-text-primary font-semibold text-[15px] bg-surface-secondary border border-border-primary rounded-lg px-3 py-1 w-full focus:outline-none focus:border-text-primary appearance-none cursor-pointer"
                      >
                        <option value="">Select response time</option>
                        <option value="WITHIN_AN_HOUR">Within an hour</option>
                        <option value="WITHIN_A_FEW_HOURS">
                          Within a few hours
                        </option>
                        <option value="WITHIN_A_DAY">Within a day</option>
                        <option value="MORE_THAN_A_DAY">More than a day</option>
                      </select>
                    ) : (
                      <p className="font-semibold text-text-primary">
                        {portfolioDetails.response_time === "WITHIN_AN_HOUR"
                          ? "Within an hour"
                          : portfolioDetails.response_time ===
                              "WITHIN_A_FEW_HOURS"
                            ? "Within a few hours"
                            : portfolioDetails.response_time === "WITHIN_A_DAY"
                              ? "Within a day"
                              : portfolioDetails.response_time ===
                                  "MORE_THAN_A_DAY"
                                ? "More than a day"
                                : portfolioDetails.response_time || "-"}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-8 mb-4 border-t border-border-secondary pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    <LinkIcon className="w-4 h-4 text-zinc-500" />
                    <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">
                      Social Links
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries({
                      facebook_url: "Facebook",
                      instagram_url: "Instagram",
                      twitter_url: "Twitter",
                      linkedin_url: "LinkedIn",
                    }).map(([key, label]) => (
                      <div key={key}>
                        <p className="text-xs font-bold text-zinc-500 mb-1">
                          {label}
                        </p>
                        {isEditing ? (
                          <input
                            type="url"
                            value={socialLinks[key]}
                            onChange={(e) =>
                              setSocialLinks({
                                ...socialLinks,
                                [key]: e.target.value,
                              })
                            }
                            className="text-text-primary text-sm bg-surface-secondary border border-border-primary rounded-lg px-3 py-1.5 w-full focus:outline-none focus:border-text-primary"
                            placeholder={`https://${label.toLowerCase()}.com/...`}
                          />
                        ) : (
                          <a
                            href={socialLinks[key] || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm ${socialLinks[key] ? "text-indigo-500 hover:underline" : "text-zinc-400"}`}
                          >
                            {socialLinks[key] || "Not provided"}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* FAQs Card */}
              <div className="bg-surface-primary rounded-3xl p-6 md:p-8 shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-border-primary">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-1">
                    <HelpCircle className="w-5 h-5" />
                    <h2 className="text-xl font-bold text-text-primary tracking-tight">
                      Frequently Asked Questions
                    </h2>
                  </div>
                  {isEditing && (
                    <button
                      onClick={handleAddFaq}
                      className="flex items-center gap-1 text-sm font-bold text-text-primary hover:bg-surface-secondary transition-colors border border-border-primary px-3 py-1.5 rounded-full"
                    >
                      <Plus className="w-4 h-4" /> Add FAQ
                    </button>
                  )}
                </div>

                {faqs.length === 0 && !isEditing ? (
                  <p className="text-sm text-zinc-500 text-center py-4">
                    No FAQs added yet.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div
                        key={faq.faq_uuid || index}
                        className="p-4 rounded-xl border border-border-secondary bg-surface-secondary/50 relative group"
                      >
                        {isEditing ? (
                          <div className="flex flex-col gap-3 pr-8">
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) =>
                                handleFaqChange(
                                  index,
                                  "question",
                                  e.target.value,
                                )
                              }
                              className="text-text-primary font-bold text-[15px] bg-surface-primary border border-border-primary rounded-lg px-3 py-2 w-full focus:outline-none focus:border-text-primary"
                              placeholder="Question"
                            />
                            <textarea
                              value={faq.answer}
                              onChange={(e) =>
                                handleFaqChange(index, "answer", e.target.value)
                              }
                              className="text-zinc-400 text-[14px] font-medium bg-surface-primary border border-border-primary rounded-lg px-3 py-2 w-full focus:outline-none focus:border-text-primary resize-none"
                              placeholder="Answer"
                              rows={2}
                            />
                          </div>
                        ) : (
                          <div>
                            <h4 className="font-bold text-text-primary mb-1 pr-6">
                              {faq.question}
                            </h4>
                            <p className="text-sm text-text-secondary">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                        {isEditing && (
                          <button
                            onClick={() => handleRemoveFaq(index, faq.faq_uuid)}
                            className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
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
                    {gallery.map((img, i) => {
                      const isObject = typeof img === "object" && img !== null;
                      const imgSrc = isObject
                        ? img.image?.startsWith("http")
                          ? img.image
                          : IMAGE_URL + img.image
                        : img;
                      const imgId = isObject ? img.gallery_image_uuid : null;

                      return (
                        <div
                          key={imgId || i}
                          className="aspect-square rounded-2xl overflow-hidden relative group"
                        >
                          <img
                            src={imgSrc}
                            alt={`Gallery ${i}`}
                            className="w-full h-full object-cover"
                          />
                          {isEditing && (
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button
                                onClick={() => deleteImage(i, false, imgId)}
                                className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {newGalleryImages.map((file, i) => (
                      <div
                        key={`new-${i}`}
                        className="aspect-square rounded-2xl overflow-hidden relative group border-2 border-indigo-500"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`New Gallery ${i}`}
                          className="w-full h-full object-cover opacity-70"
                        />
                        <div className="absolute top-2 right-2 bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                          New
                        </div>
                        {isEditing && (
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              onClick={() => deleteImage(i, true)}
                              className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}

                    {isEditing &&
                      gallery.length + newGalleryImages.length < 10 && (
                        <label className="aspect-square rounded-2xl bg-surface-secondary border-2 border-dashed border-border-primary flex flex-col items-center justify-center cursor-pointer hover:border-text-primary transition-colors group">
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <div className="p-2 bg-surface-primary rounded-full border border-border-primary mb-2 group-hover:scale-110 transition-transform shadow-sm">
                            <Plus className="w-5 h-5 text-zinc-400" />
                          </div>
                          <span className="text-xs font-bold text-zinc-500 group-hover:text-text-primary transition-colors">
                            Add Photo
                          </span>
                        </label>
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

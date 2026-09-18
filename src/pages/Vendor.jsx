import React, { useState } from "react";
import { Link, useParams } from "react-router";
import { api } from "../api";
import SEO from "../components/seo/SEO";
import { useQuery } from "@tanstack/react-query";
import { businessApi } from "../services/businessApi";
import { dateFormater } from "../utils/dateFormater";
import {
  MapPin,
  Clock,
  Star,
  CheckCircle2,
  ShieldCheck,
  Mail,
  Phone,
  Globe,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Briefcase,
  Users,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-border-secondary rounded-xl overflow-hidden mb-3 bg-surface-primary transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex justify-between items-center text-left focus:outline-none hover:bg-surface-secondary/50 transition-colors"
      >
        <span className="font-semibold text-text-primary text-sm">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-text-secondary flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-text-secondary flex-shrink-0" />
        )}
      </button>
      <div
        className={`px-4 overflow-hidden transition-all ${isOpen ? "max-h-96 pb-4 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="text-text-secondary text-sm">{answer}</p>
      </div>
    </div>
  );
};

const Vendor = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [canReview, setCanReview] = useState(false);

  // Review Modal State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, text: "" });

  const { data: businessPortfolioData, isLoading } = useQuery({
    queryKey: ["vendor", id],
    queryFn: () => businessApi.businessPortfolio(id),
  });

  const businessPortfolio =
    businessPortfolioData?.results ||
    businessPortfolioData?.data ||
    businessPortfolioData ||
    {};
  // console.log(businessPortfolio);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const reviewData = {
        vendorId: id,
        user: "Current User",
        avatar:
          "https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser&backgroundColor=fca5a5",
        rating: Number(newReview.rating),
        text: newReview.text,
      };
      await api.addReview(reviewData);
      setIsReviewModalOpen(false);
      setNewReview({ rating: 5, text: "" });
      const reviewsData = await api.getReviewsByVendorId(id);
      setReviews(reviewsData);
    } catch (error) {
      console.error("Failed to submit review", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-secondary flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Parse fields safely
  const faqs =
    typeof businessPortfolio?.faqs === "string"
      ? JSON.parse(businessPortfolio.faqs || "[]")
      : businessPortfolio?.faqs || [];
  const gallery =
    typeof businessPortfolio?.gallery_images === "string"
      ? JSON.parse(businessPortfolio.gallery_images || "[]")
      : businessPortfolio?.gallery_images || [];

  const bannerImage =
    gallery.length > 0
      ? gallery[0].image || gallery[0]
      : "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";
  const avatarImage = `https://api.dicebear.com/7.x/shapes/svg?seed=${businessPortfolio?.name || "Vendor"}&backgroundColor=0284c7`;

  // Format Working Hours
  const formatWorkingHours = (hoursArray) => {
    if (!hoursArray || hoursArray.length === 0) return [];
    const days = [...new Set(hoursArray.map((h) => h.day_of_week))];
    const order = {
      MONDAY: 1,
      TUESDAY: 2,
      WEDNESDAY: 3,
      THURSDAY: 4,
      FRIDAY: 5,
      SATURDAY: 6,
      SUNDAY: 7,
    };
    days.sort((a, b) => order[a] - order[b]);
    return days.map((day) => {
      const slots = hoursArray.filter((h) => h.day_of_week === day);
      const startTime = slots.reduce(
        (min, p) => (p.start_time < min ? p.start_time : min),
        slots[0].start_time,
      );
      const endTime = slots.reduce(
        (max, p) => (p.end_time > max ? p.end_time : max),
        slots[0].end_time,
      );
      return { day, startTime, endTime };
    });
  };
  const activeHours = formatWorkingHours(businessPortfolio?.working_hours);

  return (
    <div className="min-h-screen bg-surface-secondary font-sans pb-16">
      <SEO
        title={`${businessPortfolio?.name || "Loading"} - ${businessPortfolio?.category?.name || ""} | TodayFix`}
        description={
          businessPortfolio?.description
            ? `${businessPortfolio?.description?.substring(0, 150)}...`
            : `Book ${businessPortfolio?.name} for premium ${businessPortfolio?.category?.name} services in Bangalore.`
        }
        ogImage={avatarImage}
      />

      {/* Banner Area */}
      <div className="w-full h-48 md:h-64 bg-zinc-200">
        <img
          src={bannerImage}
          alt="Vendor Banner"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Profile Header Card */}
        <div className="bg-surface-primary rounded-2xl p-5 md:p-6 shadow-sm border border-border-secondary -mt-12 md:-mt-16 relative z-10 flex flex-col md:flex-row gap-5 items-start">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-surface-secondary p-1 shadow-sm flex-shrink-0 -mt-10 md:-mt-14 mx-auto md:mx-0 border-4 border-surface-primary relative z-20">
            <img
              src={avatarImage}
              alt={businessPortfolio?.name}
              className="w-full h-full object-cover rounded-lg"
            />
            {businessPortfolio?.is_active && (
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-surface-primary flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>{" "}
                ACTIVE
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left w-full">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
                  <h1 className="text-xl md:text-2xl font-bold text-text-primary">
                    {businessPortfolio?.name}
                  </h1>
                  <div className="flex gap-1">
                    {businessPortfolio?.verification_badges
                      ?.aadhaar_verified && (
                      <div
                        className="text-emerald-500 tooltip"
                        title="Aadhaar Verified"
                      >
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                    )}
                    {businessPortfolio?.verification_badges?.gst_verified && (
                      <div
                        className="text-indigo-500 tooltip"
                        title="GST Verified"
                      >
                        <Briefcase className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-text-secondary text-sm font-medium flex items-center justify-center md:justify-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  {businessPortfolio?.category?.name}
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-text-secondary text-sm mt-3">
                  {businessPortfolio?.address && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-text-muted" />
                      {businessPortfolio?.address}
                    </div>
                  )}
                  {businessPortfolio?.established_year && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-text-muted" />
                      Est. {businessPortfolio.established_year}
                    </div>
                  )}
                  <div className="flex items-center gap-1 font-medium">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-text-primary">
                      {businessPortfolio?.average_rating || "New"}
                    </span>
                    <span className="text-text-muted">
                      ({businessPortfolio?.review_count || 0})
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap justify-center md:justify-end gap-2 mt-4 md:mt-0">
                {businessPortfolio?.phone && (
                  <a
                    href={`tel:${businessPortfolio.phone}`}
                    className="p-2.5 bg-surface-secondary text-text-primary border border-border-secondary rounded-lg hover:bg-border-secondary transition-colors"
                    title="Call"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                )}
                {businessPortfolio?.email && (
                  <a
                    href={`mailto:${businessPortfolio.email}`}
                    className="p-2.5 bg-surface-secondary text-text-primary border border-border-secondary rounded-lg hover:bg-border-secondary transition-colors"
                    title="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
                {businessPortfolio?.website && (
                  <a
                    href={businessPortfolio.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-surface-secondary text-text-primary border border-border-secondary rounded-lg hover:bg-border-secondary transition-colors"
                    title="Website"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column (Main Details) */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <section className="bg-surface-primary rounded-2xl p-5 md:p-6 shadow-sm border border-border-secondary">
              <h2 className="text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
                About Us
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                {businessPortfolio?.description ||
                  "No description provided yet."}
              </p>
            </section>

            {/* Gallery */}
            {gallery && gallery.length > 0 && (
              <section className="bg-surface-primary rounded-2xl p-5 md:p-6 shadow-sm border border-border-secondary">
                <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                  Work Gallery
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {gallery.map((img, index) => {
                    const imgSrc = img.image || img;
                    return (
                      <div
                        key={index}
                        className="aspect-square rounded-lg overflow-hidden bg-surface-secondary border border-border-secondary group relative"
                      >
                        <img
                          src={imgSrc}
                          alt={`Gallery work ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {img.caption && (
                          <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2">
                            <p className="text-white text-xs truncate text-center">
                              {img.caption}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Our Team */}
            {businessPortfolio?.employees &&
              businessPortfolio.employees.length > 0 && (
                <section className="bg-surface-primary rounded-2xl p-5 md:p-6 shadow-sm border border-border-secondary">
                  <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                    Our Team
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {businessPortfolio.employees.map((emp) => (
                      <div
                        key={emp.employee_uuid}
                        className="flex items-center gap-3 p-3 rounded-xl bg-surface-secondary border border-border-secondary"
                      >
                        <img
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${emp.name}&backgroundColor=0284c7`}
                          alt={emp.name}
                          className="w-10 h-10 rounded-lg object-cover bg-white"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-text-primary text-sm truncate">
                            {emp.name}
                          </h4>
                          {emp.phone && (
                            <p className="text-xs text-text-secondary truncate">
                              {emp.phone}
                            </p>
                          )}
                        </div>
                        {emp.is_active && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

            {/* FAQs */}
            {faqs && faqs.length > 0 && (
              <section className="bg-surface-primary rounded-2xl p-5 md:p-6 shadow-sm border border-border-secondary">
                <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-2">
                  {faqs.map((faq, index) => (
                    <FaqItem
                      key={index}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Reviews Section */}
            <section className="bg-surface-primary rounded-2xl p-5 md:p-6 shadow-sm border border-border-secondary">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                  Customer Reviews
                </h2>
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="bg-surface-secondary border border-border-primary text-text-primary px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-border-secondary transition-colors"
                >
                  Write a Review
                </button>
              </div>

              {businessPortfolio?.recent_reviews?.length === 0 ? (
                <div className="bg-surface-secondary p-6 rounded-xl border border-border-secondary text-center">
                  <p className="font-medium text-text-primary mb-1 text-sm">
                    No Reviews Yet
                  </p>
                  <p className="text-text-muted text-xs">
                    Be the first to leave a review for {businessPortfolio?.name}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {businessPortfolio?.recent_reviews?.map((review) => (
                    <div
                      key={review?.review_uuid}
                      className="bg-surface-secondary p-4 rounded-xl border border-border-secondary"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={
                              review?.avatar ||
                              `https://api.dicebear.com/7.x/initials/svg?seed=${review?.user || "U"}`
                            }
                            alt={review?.user}
                            className="w-8 h-8 rounded-full bg-surface-primary"
                          />
                          <div>
                            <h4 className="font-semibold text-text-primary text-xs">
                              {review?.user || "Customer"}
                            </h4>
                            {review?.date && (
                              <span className="text-[11px] text-text-secondary">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < review.rating ? "text-amber-500 fill-amber-500" : "text-zinc-200 fill-zinc-200"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-text-secondary text-xs leading-relaxed line-clamp-3">
                        {review?.message || "No comments provided."}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right Column (Sticky Sidebar) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Stats Overview */}
              <div className="bg-surface-primary p-5 md:p-6 rounded-2xl border border-border-secondary shadow-sm">
                <h3 className="text-base font-bold text-text-primary mb-4">
                  Performance
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-secondary p-3 rounded-xl border border-border-secondary">
                    <p className="text-xl font-bold text-text-primary mb-0.5">
                      {businessPortfolio?.completed_bookings_count || 0}
                    </p>
                    <p className="text-xs font-medium text-text-secondary">
                      Bookings
                    </p>
                  </div>
                  <div className="bg-surface-secondary p-3 rounded-xl border border-border-secondary">
                    <p className="text-xl font-bold text-text-primary mb-0.5">
                      {businessPortfolio?.average_rating || 0}
                    </p>
                    <p className="text-xs font-medium text-text-secondary">
                      Rating
                    </p>
                  </div>
                  <div className="bg-surface-secondary p-3 rounded-xl border border-border-secondary">
                    <p className="text-lg font-bold text-text-primary mb-0.5">
                      {businessPortfolio?.on_time_rate || "N/A"}
                    </p>
                    <p className="text-xs font-medium text-text-secondary">
                      On-Time
                    </p>
                  </div>
                  <div className="bg-surface-secondary p-3 rounded-xl border border-border-secondary">
                    <p className="text-lg font-bold text-text-primary mb-0.5 truncate">
                      {businessPortfolio?.response_time === "WITHIN_AN_HOUR"
                        ? "1 hr"
                        : businessPortfolio?.response_time ===
                            "WITHIN_A_FEW_HOURS"
                          ? "Few hrs"
                          : businessPortfolio?.response_time === "WITHIN_A_DAY"
                            ? "1 day"
                            : businessPortfolio?.response_time ===
                                "MORE_THAN_A_DAY"
                              ? "> 1 day"
                              : businessPortfolio?.response_time || "N/A"}
                    </p>
                    <p className="text-xs font-medium text-text-secondary">
                      Response
                    </p>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              {activeHours.length > 0 && (
                <div className="bg-surface-primary p-5 md:p-6 rounded-2xl border border-border-secondary shadow-sm">
                  <h3 className="text-base font-bold text-text-primary mb-4">
                    Working Hours
                  </h3>
                  <div className="space-y-2">
                    {activeHours.map((slot, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="font-medium text-text-secondary capitalize">
                          {slot.day.toLowerCase()}
                        </span>
                        <span className="font-medium text-text-primary">
                          {slot.startTime.substring(0, 5)} -{" "}
                          {slot.endTime.substring(0, 5)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Services Offered */}
              {businessPortfolio?.services &&
                businessPortfolio.services.length > 0 && (
                  <div className="bg-surface-primary p-5 md:p-6 rounded-2xl border border-border-secondary shadow-sm">
                    <h3 className="text-base font-bold text-text-primary mb-4">
                      Services
                    </h3>
                    <ul className="space-y-2">
                      {businessPortfolio.services.map((service) => (
                        <li
                          key={service?.service_uuid}
                          className="bg-surface-secondary p-3 rounded-xl border border-border-secondary"
                        >
                          <div className="flex justify-between items-start">
                            <span className="font-semibold text-sm text-text-primary pr-3">
                              {service?.name}
                            </span>
                            <span className="font-bold text-sm text-text-primary whitespace-nowrap">
                              ₹{service?.price}
                            </span>
                          </div>
                          {service.duration && (
                            <div className="flex items-center gap-1 text-xs text-text-muted mt-1.5">
                              <Clock className="w-3 h-3" /> {service.duration}{" "}
                              mins
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                    {businessPortfolio?.starting_price && (
                      <div className="mt-4 pt-4 border-t border-border-secondary flex justify-between items-center text-sm">
                        <span className="text-text-secondary font-medium">
                          Starting Price
                        </span>
                        <span className="text-text-primary font-bold">
                          ₹{businessPortfolio.starting_price}
                        </span>
                      </div>
                    )}
                  </div>
                )}

              {/* Social Links */}
              {businessPortfolio?.social_links &&
                Object.values(businessPortfolio.social_links).some(
                  (v) => v,
                ) && (
                  <div className="bg-surface-primary p-5 md:p-6 rounded-2xl border border-border-secondary shadow-sm flex flex-wrap justify-center gap-3">
                    {businessPortfolio.social_links.facebook && (
                      <a
                        href={businessPortfolio.social_links.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-surface-secondary text-text-secondary hover:text-text-primary rounded-lg border border-border-secondary transition-colors"
                        title="Facebook"
                      >
                        <IconBrandFacebook className="w-4 h-4" />
                      </a>
                    )}
                    {businessPortfolio.social_links.instagram && (
                      <a
                        href={businessPortfolio.social_links.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-surface-secondary text-text-secondary hover:text-text-primary rounded-lg border border-border-secondary transition-colors"
                        title="Instagram"
                      >
                        <IconBrandInstagram className="w-4 h-4" />
                      </a>
                    )}
                    {businessPortfolio.social_links.twitter && (
                      <a
                        href={businessPortfolio.social_links.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-surface-secondary text-text-secondary hover:text-text-primary rounded-lg border border-border-secondary transition-colors"
                        title="Twitter"
                      >
                        <IconBrandTwitter className="w-4 h-4" />
                      </a>
                    )}
                    {businessPortfolio.social_links.linkedin && (
                      <a
                        href={businessPortfolio.social_links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-surface-secondary text-text-secondary hover:text-text-primary rounded-lg border border-border-secondary transition-colors"
                        title="LinkedIn"
                      >
                        <IconBrandLinkedin className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}

              {/* Report Vendor */}
              <button
                className="w-full py-2.5 text-red-500 hover:bg-red-50 font-medium text-sm rounded-lg transition-colors border border-transparent hover:border-red-100 flex items-center justify-center gap-2"
                onClick={() => alert("Vendor reported to support.")}
              >
                <AlertTriangle className="w-4 h-4" /> Report Vendor
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface-primary rounded-2xl max-w-lg w-full p-6 shadow-xl border border-border-secondary">
            <h2 className="text-xl font-bold text-text-primary mb-5">
              Write a Review
            </h2>
            <form onSubmit={handleSubmitReview} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Rating
                </label>
                <div className="flex gap-2 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      onClick={() =>
                        setNewReview({ ...newReview, rating: star })
                      }
                      className={`w-8 h-8 cursor-pointer transition-transform ${star <= newReview.rating ? "fill-amber-500" : "text-zinc-200 fill-zinc-200"}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Share more details
                </label>
                <textarea
                  required
                  rows="4"
                  value={newReview.text}
                  onChange={(e) =>
                    setNewReview({ ...newReview, text: e.target.value })
                  }
                  placeholder="Describe your experience..."
                  className="w-full bg-surface-secondary border border-border-secondary text-text-primary text-sm rounded-xl p-3 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-surface-secondary text-text-primary font-medium text-sm rounded-xl hover:bg-border-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newReview.text.trim()}
                  className="flex-1 px-4 py-2 bg-text-primary text-surface-primary font-medium text-sm rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vendor;

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { api } from "../api";

const Vendor = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [canReview, setCanReview] = useState(false);

  // Review Modal State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, text: "" });

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        setIsLoading(true);
        const currentUserId = 1; // Mock current user ID
        const [vendorData, reviewsData, bookingsData] = await Promise.all([
          api.getVendorById(id),
          api.getReviewsByVendorId(id),
          api.getBookingsByCustomerId(currentUserId)
        ]);
        setVendor(vendorData);
        setReviews(reviewsData);
        
        // Check if user has taken a service from this vendor
        const hasCompletedBooking = bookingsData.some(
          booking => String(booking.vendorId) === String(id) && booking.status === "COMPLETED"
        );
        setCanReview(hasCompletedBooking);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      fetchVendorDetails();
    }
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const reviewData = {
        vendorId: id,
        user: "Current User", // Mock user for now
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser&backgroundColor=fca5a5",
        rating: Number(newReview.rating),
        text: newReview.text,
      };
      await api.addReview(reviewData);
      setIsReviewModalOpen(false);
      setNewReview({ rating: 5, text: "" });
      // Refresh reviews
      const reviewsData = await api.getReviewsByVendorId(id);
      setReviews(reviewsData);
    } catch (error) {
      console.error("Failed to submit review", error);
    }
  };

  if (isLoading) return <div className="min-h-screen bg-surface-secondary text-text-primary p-10 flex items-center justify-center">Loading vendor profile...</div>;
  if (!vendor) return <div className="min-h-screen bg-surface-secondary text-text-primary p-10 flex items-center justify-center">Vendor not found.</div>;

  // Map API properties to UI properties
  const displayVendor = {
    ...vendor,
    banner: vendor.bg || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    avatar: vendor.logo || `https://api.dicebear.com/7.x/shapes/svg?seed=${vendor.name}&backgroundColor=0284c7`,
    memberSince: "2024",
    address: vendor.location,
    about: vendor.description || "No description provided.",
    services: [{ id: 1, name: vendor.service || "General Service", price: "Contact for pricing" }],
    gallery: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31104.23456!2d77.615!3d12.978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16a50614532b%3A0x7d28711e5ab37dcb!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    stats: {
      rating: vendor.rating || "4.5",
      reviews: vendor.reviews || reviews.length,
      tasksCompleted: 450,
      responseTime: "Under 2 hours",
      onTimeRate: "98%",
    }
  };

  return (
    <div className="min-h-screen bg-surface-secondary font-sans pb-24 lg:pb-12">
      {/* Banner */}
      <div className="relative w-full h-64 md:h-80 bg-surface-dark">
        <img
          src={displayVendor.banner}
          alt="Vendor Banner"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between -mt-16 md:-mt-20 mb-8 z-10 relative gap-4">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 w-full text-center md:text-left">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-surface-primary p-2 shadow-xl flex-shrink-0">
              <img
                src={displayVendor.avatar}
                alt={displayVendor.name}
                className="w-full h-full object-cover rounded-2xl bg-surface-secondary"
              />
            </div>
            <div className="mb-2">
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary">
                  {displayVendor.name}
                </h1>
                {displayVendor.status === "APPROVED" && (
                  <svg
                    className="w-6 h-6 text-emerald-500 mt-2.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <p className="text-text-secondary font-medium text-lg">
                {displayVendor.category}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-1 text-text-secondary text-sm mt-2">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {displayVendor.location}
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-shrink-0 gap-3 mb-2">
            <button className="px-6 py-2.5 cursor-pointer bg-surface-primary border border-border-secondary text-text-primary font-semibold rounded-xl hover:bg-surface-secondary shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-colors">
              Share Profile
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Main Details) */}
          <div className="lg:col-span-2 space-y-10">
            {/* About Section */}
            <section className="bg-surface-primary rounded-2xl p-6 md:p-8 border border-border-primary shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                About the Vendor
              </h2>
              <p className="text-text-secondary leading-relaxed">
                {displayVendor.about}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-surface-secondary text-text-secondary text-sm font-medium rounded-lg">
                  Verified Identity
                </span>
                <span className="px-3 py-1 bg-surface-secondary text-text-secondary text-sm font-medium rounded-lg">
                  Background Checked
                </span>
                <span className="px-3 py-1 bg-surface-secondary text-text-secondary text-sm font-medium rounded-lg">
                  Member since {displayVendor.memberSince}
                </span>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  Portfolio Gallery
                </h2>
                <button className="text-text-primary cursor-pointer font-semibold text-sm hover:underline">
                  View All
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {displayVendor.gallery.map((imgUrl, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-md overflow-hidden bg-surface-secondary cursor-pointer group shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-border-primary"
                  >
                    <img
                      src={imgUrl}
                      alt={`Gallery work ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                ))}
              </div>
            </section>

            {/* Performance Stats */}
            <section>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                Performance Overview
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-surface-primary p-4 rounded-2xl border border-border-primary shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-extrabold text-text-primary mb-1">
                    {displayVendor.stats.tasksCompleted}+
                  </span>
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wide">
                    Tasks Completed
                  </span>
                </div>

                <div className="bg-surface-primary p-4 rounded-2xl border border-border-primary shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col items-center justify-center text-center">
                  <div className="flex items-center gap-1 text-3xl font-extrabold text-amber-500 mb-1">
                    {displayVendor.stats.rating}
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wide">
                    Rating ({displayVendor.stats.reviews})
                  </span>
                </div>

                <div className="bg-surface-primary p-4 rounded-2xl border border-border-primary shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold text-text-primary mb-2">
                    {displayVendor.stats.responseTime}
                  </span>
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wide">
                    Response Time
                  </span>
                </div>

                <div className="bg-surface-primary p-4 rounded-2xl border border-border-primary shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-extrabold text-emerald-600 mb-1">
                    {displayVendor.stats.onTimeRate}
                  </span>
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wide">
                    On-Time Rate
                  </span>
                </div>
              </div>
            </section>

            {/* Location Map Section */}
            <section className="bg-surface-primary rounded-2xl p-6 md:p-8 border border-border-primary shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <h2 className="text-2xl font-bold text-text-primary mb-3">
                Location & Coverage
              </h2>
              <div className="flex items-start md:items-center gap-2 mb-6 text-text-secondary">
                <svg
                  className="w-5 h-5 flex-shrink-0 mt-0.5 md:mt-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="leading-tight">{displayVendor.address}</span>
              </div>
              {/* Map iFrame Container */}
              <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-surface-secondary border border-border-secondary relative">
                <iframe
                  src={displayVendor.mapEmbedUrl}
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vendor Location Map"
                ></iframe>
              </div>
            </section>

            {/* Reviews Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-text-primary">
                  Customer Reviews
                </h2>
                {canReview && (
                  <button
                    onClick={() => setIsReviewModalOpen(true)}
                    className="bg-surface-dark text-text-inverted px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:scale-[0.98] transition-transform"
                  >
                    Write a Review
                  </button>
                )}
              </div>

              {reviews.length === 0 ? (
                <div className="bg-surface-primary p-6 rounded-2xl border border-border-primary shadow-[0_2px_10px_rgb(0,0,0,0.02)] text-center text-text-muted">
                  No reviews yet. Be the first to leave one!
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-surface-primary p-6 rounded-2xl border border-border-primary shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={review.avatar}
                            alt={review.user}
                            className="w-10 h-10 rounded-full bg-surface-secondary"
                          />
                          <div>
                            <h4 className="font-bold text-text-primary leading-tight">
                              {review.user}
                            </h4>
                            <span className="text-xs text-text-secondary">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-slate-200 fill-current"}`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        "{review.text}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right Column (Sticky Sidebar) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-surface-primary p-6 rounded-2xl border border-border-primary shadow-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100 mb-4">
                  <svg
                    className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm text-emerald-800 font-medium">
                    This is a Verified Professional. They maintain a high standard of quality and on-time delivery across the platform.
                  </p>
                </div>
              </div>

              <div className="bg-surface-primary p-6 rounded-2xl border border-border-primary shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                <h3 className="text-lg font-bold text-text-primary mb-4">
                  Services Offered
                </h3>
                <ul className="space-y-4">
                  {displayVendor.services.map((service) => (
                    <li
                      key={service.id}
                      className="flex flex-col border-b border-border-secondary pb-3 last:border-0 last:pb-0"
                    >
                      <span className="font-semibold text-text-primary">
                        {service.name}
                      </span>
                      <span className="text-sm text-text-muted mt-1">
                        {service.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface-primary rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Write a Review</h2>
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2">Rating</label>
                <div className="flex gap-2 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className={`w-8 h-8 cursor-pointer transition-transform hover:scale-110 ${star <= newReview.rating ? "fill-current" : "text-slate-200 fill-current"}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2">Review Details</label>
                <textarea
                  required
                  rows="4"
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  placeholder="Share your experience working with this professional..."
                  className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-text-primary resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newReview.text.trim()}
                  className="flex-1 px-4 py-3 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform disabled:opacity-50"
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

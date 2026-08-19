import React, { useState } from "react";
import { Link, useParams } from "react-router";
import { vendors } from "../data/collectedData";
import CustomDropdown from "../components/ui/CustomDropdown";
import SEO from "../components/seo/SEO";

const Service = () => {
  const { slug } = useParams();
  const [sortBy, setSortBy] = useState("recommended");

  // Mock data for the specific service
  const serviceDetails = {
    name: "Interior Design & Renovation",
    description:
      "Transform your living or workspace with our curated list of top-rated interior designers. From modular kitchens to full-house renovations, find the perfect match for your aesthetic and budget.",
    category: "Home & Decor",
    coverImage:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    rating: "4.8",
    reviews: "1,245",
    highlights: ["Expert Technicians", "Service at your doorstep", "100% Satisfaction Guarantee"],
    includes: [
      "Comprehensive site inspection and consultation",
      "Professional tools and high-quality materials",
      "Post-service cleanup and finishing",
      "30-day service warranty"
    ],
    duration: "Approx. 45-60 mins",
    startingPrice: "Rs. 499",
    paymentOptions: ["Cards", "Cash", "UPI"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  };

  return (
    <div className="min-h-screen bg-surface-primary font-sans pb-20">
      <SEO
        title={`${slug || serviceDetails.name} Services | TodayFix`}
        description={`Find the best ${slug || serviceDetails.name} professionals in your area. Verified, rated, and ready to work.`}
        ogImage={serviceDetails.coverImage}
      />
      <div className="relative w-full h-[350px] md:h-[400px] bg-surface-dark">
        <img
          src={serviceDetails.coverImage}
          alt={serviceDetails.name}
          className="w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/60 to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full">
          <div className="max-w-5xl mx-auto px-6 pb-12">
            <span className="inline-block px-3 py-1 mb-4 bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-sm">
              {serviceDetails.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight capitalize">
              {/* {serviceDetails.name} */}
              {slug}
            </h1>
            <p className="text-text-muted text-base md:text-lg max-w-2xl leading-relaxed mb-6">
              {serviceDetails.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">

          {/* Main Content (Left) */}
          <div className="flex-1">

            {/* Highlights & Ratings */}
            <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-border-secondary">
              <div className="flex items-center gap-1.5 bg-yellow-100/50 text-yellow-800 px-3 py-1.5 rounded-lg text-sm font-bold border border-yellow-200/50">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {serviceDetails.rating} <span className="font-normal text-yellow-800/70 ml-1">({serviceDetails.reviews} reviews)</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {serviceDetails.highlights.map((highlight, idx) => (
                  <span key={idx} className="bg-surface-secondary text-text-secondary px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            {/* Service Images */}
            {serviceDetails.images && serviceDetails.images.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-bold text-text-primary mb-6">Service Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {serviceDetails.images.map((img, idx) => (
                    <div key={idx} className="aspect-square rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-shadow">
                      <img
                        src={img}
                        alt={`Service gallery item ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Includes */}
            <div className="mb-12 pb-12 border-b border-border-secondary">
              <h3 className="text-xl font-bold text-text-primary mb-6">What's included in this service</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6">
                {serviceDetails.includes.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-text-secondary text-base">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vendors Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold text-text-primary">
                {vendors.length} Verified Providers
              </h2>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-secondary shrink-0">
                  Sort by:
                </span>
                <CustomDropdown
                  options={["Highest Rated", "Most Reviews", "Price: Low to High"]}
                  value={sortBy}
                  onChange={setSortBy}
                  placeholder="Recommended"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                  }
                />
              </div>
            </div>

            {/* Vendors List */}
            <div className="flex flex-col gap-5">
              {vendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="bg-surface-primary rounded-xl p-5 border border-border-primary shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-xl hover:shadow-[0_8px_40px_rgb(0,0,0,0.06)] hover:border-black/50 transition-all duration-300 group flex flex-col md:flex-row gap-6 md:gap-8"
                >
                  <div className="flex flex-row md:flex-col items-center gap-4 md:w-32 flex-shrink-0">
                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden bg-surface-secondary border border-border-secondary shadow-sm group-hover:scale-105 transition-transform">
                      <img
                        src={vendor.avatar}
                        alt={vendor.name}
                        className="w-full h-full object-cover p-2"
                      />
                    </div>
                    {vendor.verified && (
                      <div className="hidden md:flex items-center justify-center gap-1.5 bg-surface-dark text-text-inverted px-2.5 py-1 rounded-md text-xs font-semibold w-full">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Verified
                      </div>
                    )}
                  </div>

                  <div className="flex-grow flex flex-col justify-center">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-text-primary group-hover:text-text-muted transition-colors">
                            {vendor.name}
                          </h3>
                          {vendor.verified && (
                            <svg
                              className="w-5 h-5 text-text-primary md:hidden"
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

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-secondary mb-3">
                          <div className="flex items-center gap-1">
                            <svg
                              className="w-4 h-4 text-text-primary"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="font-bold text-text-primary">
                              {vendor.rating}
                            </span>
                            <span>({vendor.reviews} reviews)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg
                              className="w-4 h-4 text-text-muted"
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
                            {vendor.location}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {vendor.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-border-secondary">
                      <div className="flex flex-wrap gap-2">
                        {vendor.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-surface-secondary text-text-secondary px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/vendor/${vendor.id}`}
                        className="w-full sm:w-auto flex flex-nowrap text-nowrap justify-center items-center gap-2 cursor-pointer bg-surface-dark hover:bg-zinc-800 text-text-inverted px-6 py-2.5 rounded-xl text-sm font-bold transition-transform hover:scale-[1.02] active:scale-95 shadow-md"
                      >
                        View Profile
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & Booking Panel (Right Sticky Sidebar) */}
          <div className="w-full lg:w-[340px] flex-shrink-0">
            <div className="sticky top-[100px] bg-surface-primary rounded-2xl p-6 md:p-8 border border-border-primary shadow-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <div className="mb-6">
                <span className="text-text-secondary font-semibold text-sm uppercase tracking-wider">Starting at</span>
                <div className="text-4xl font-extrabold text-text-primary mt-1">{serviceDetails.startingPrice}</div>
              </div>

              <div className="flex items-center gap-3 text-base font-medium text-text-secondary mb-8 pb-8 border-b border-border-secondary">
                <svg className="w-6 h-6 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Takes {serviceDetails.duration}</span>
              </div>

              <Link
                to="/request-service"
                state={{ category: serviceDetails.name }}
                className="w-full flex justify-center items-center gap-2 cursor-pointer bg-surface-dark hover:bg-zinc-800 text-text-inverted px-6 py-4 rounded-xl text-lg font-bold transition-transform hover:scale-[1.02] active:scale-95 shadow-lg mb-6"
              >
                Book Now
              </Link>

              <div className="text-center">
                <p className="text-[11px] text-text-muted mb-3 uppercase tracking-wider font-bold">Safe & Secure Payments</p>
                <div className="flex justify-center items-center gap-2 flex-wrap">
                  {serviceDetails.paymentOptions.map((opt, idx) => (
                    <span key={idx} className="text-xs font-semibold text-text-secondary bg-surface-secondary px-3 py-1.5 rounded-md">
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Service;

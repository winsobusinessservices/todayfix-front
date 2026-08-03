import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

const Area = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  // Mock data for the specific Area
  const areaInfo = {
    name: "Indiranagar",
    city: "Bengaluru",
    pincode: "560038",
    heroImage:
      "https://images.unsplash.com/photo-1517713982677-4b66332f98de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Premium neighborhood/cafe street vibe
    stats: {
      activePros: 342,
      avgResponseTime: "45 mins",
      jobsCompleted: "12,500+",
    },
  };

  const categories = [
    "All",
    "Home Cleaning",
    "Plumbing",
    "Interior Design",
    "Electricians",
    "Appliance Repair",
    "Packers & Movers",
  ];

  const localVendors = [
    {
      id: 1,
      name: "Aura Spaces Studio",
      avatar:
        "https://api.dicebear.com/7.x/shapes/svg?seed=Aura&backgroundColor=0284c7",
      category: "Interior Design",
      rating: 4.9,
      reviews: 128,
      distance: "0.5 km away",
      verified: true,
      tags: ["Free Consultation", "Top Rated"],
    },
    {
      id: 2,
      name: "QuickFix Plumbers",
      avatar:
        "https://api.dicebear.com/7.x/shapes/svg?seed=QuickFix&backgroundColor=ea580c",
      category: "Plumbing",
      rating: 4.7,
      reviews: 412,
      distance: "1.2 km away",
      verified: true,
      tags: ["24/7 Emergency", "Affordable"],
    },
    {
      id: 3,
      name: "Sparkle Clean Home",
      avatar:
        "https://api.dicebear.com/7.x/shapes/svg?seed=Sparkle&backgroundColor=059669",
      category: "Home Cleaning",
      rating: 4.8,
      reviews: 305,
      distance: "In Indiranagar",
      verified: true,
      tags: ["Deep Cleaning", "Eco-friendly"],
    },
    {
      id: 4,
      name: "Volt Experts",
      avatar:
        "https://api.dicebear.com/7.x/shapes/svg?seed=Volt&backgroundColor=7c3aed",
      category: "Electricians",
      rating: 4.6,
      reviews: 189,
      distance: "2.0 km away",
      verified: false,
      tags: ["Quick Response"],
    },
  ];

  return (
    <div className="min-h-screen bg-surface-secondary font-sans">
      {/* --- BREADCRUMBS --- */}
      <div className="bg-surface-primary border-b border-border-primary py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center text-sm font-medium text-text-secondary gap-2">
          <Link
            to="#"
            className="hover:text-text-primary hover:underline transition-colors"
          >
            Home
          </Link>
          <svg
            className="w-4 h-4 text-text-muted"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <Link
            to="#"
            className="hover:text-text-primary hover:underline transition-colors"
          >
            {areaInfo.city}
          </Link>
          <svg
            className="w-4 h-4 text-text-muted"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-text-primary font-bold">{areaInfo.name}</span>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <div className="relative w-full h-[350px] md:h-[450px] bg-surface-dark overflow-hidden">
        <img
          src={areaInfo.heroImage}
          alt={areaInfo.name}
          className="w-full h-full object-cover opacity-50 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/60 to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full px-6 pb-12">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-primary/20 backdrop-blur-md rounded-full text-white text-xs font-bold tracking-wide uppercase mb-4 border border-white/30">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {areaInfo.pincode}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
                Top Services in {areaInfo.name}
              </h1>
              <p className="text-text-muted text-lg font-medium leading-relaxed">
                Connect with {areaInfo.stats.activePros}+ verified professionals
                actively serving the {areaInfo.name} neighborhood.
              </p>
            </div>

            {/* Quick Local Stats */}
            <div className="hidden lg:flex gap-6 bg-surface-dark/60 backdrop-blur-xl border border-border-dark p-5 rounded-2xl">
              <div>
                <p className="text-2xl font-extrabold text-white">
                  {areaInfo.stats.avgResponseTime}
                </p>
                <p className="text-xs text-text-muted font-bold uppercase tracking-wider mt-1">
                  Avg Response
                </p>
              </div>
              <div className="w-px bg-slate-600"></div>
              <div>
                <p className="text-2xl font-extrabold text-emerald-400">
                  {areaInfo.stats.jobsCompleted}
                </p>
                <p className="text-xs text-text-muted font-bold uppercase tracking-wider mt-1">
                  Jobs Done Here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* --- CATEGORY SCROLL --- */}
        <div className="mb-10">
          <h3 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-4">
            Browse {areaInfo.name} Services
          </h3>
          <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2 -mx-6 px-6 md:mx-0 md:px-0">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 border ${
                  activeCategory === cat
                    ? "bg-surface-dark text-white border-slate-900 shadow-md"
                    : "bg-surface-primary text-text-secondary border-border-primary hover:border-black hover:bg-surface-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- LOCAL VENDORS LIST --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {localVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-surface-primary rounded-md p-6 border border-border-primary hover:shadow-xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-black transition-all duration-300 group flex flex-col sm:flex-row gap-6"
            >
              {/* Avatar & Distance */}
              <div className="flex flex-col items-center gap-3 sm:w-28 flex-shrink-0">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-surface-secondary border border-border-secondary shadow-[0_4px_20px_rgb(0,0,0,0.03)] group-hover:scale-105 transition-transform">
                  <img
                    src={vendor.avatar}
                    alt={vendor.name}
                    className="w-full h-full object-cover p-2"
                  />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wide text-text-primary bg-surface-secondary px-2 py-1 rounded-md text-center w-full">
                  {vendor.distance}
                </span>
              </div>

              {/* Details */}
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-extrabold text-text-primary group-hover:text-text-primary hover:underline transition-colors leading-tight">
                      {vendor.name}
                    </h3>
                    {vendor.verified && (
                      <svg
                        className="w-5 h-5 text-emerald-500 flex-shrink-0"
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
                  <p className="text-sm font-semibold text-text-secondary mb-3">
                    {vendor.category}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <svg
                      className="w-4 h-4 text-amber-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-bold text-text-primary text-sm">
                      {vendor.rating}
                    </span>
                    <span className="text-sm text-text-muted">
                      ({vendor.reviews} reviews)
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
                    {vendor.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-surface-secondary text-text-secondary px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border-secondary">
                  <button className="flex-1 bg-surface-dark hover:bg-zinc-800 text-white py-2.5 rounded-xl text-sm font-bold transition-colors shadow-md active:scale-95">
                    Contact
                  </button>
                  <button
                    onClick={() => navigate(`/vendor/${vendor.id}`)}
                    className="flex-1 bg-surface-primary hover:bg-surface-secondary border border-border-primary text-text-primary py-2.5 rounded-xl text-sm font-semibold transition-colors active:scale-95"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- LOCAL SEO BLOCK --- */}
        <div className="mt-16 bg-surface-secondary/50 rounded-3xl p-8 md:p-12 border border-border-primary">
          <h2 className="text-2xl font-extrabold text-text-primary mb-4">
            Why choose local professionals in {areaInfo.name}?
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            Hiring service providers near {areaInfo.name}, {areaInfo.city}{" "}
            ensures faster response times, lower travel costs, and deep
            knowledge of the local area's specific requirements (like building
            society rules and traffic timings). Our verified vendors in the{" "}
            {areaInfo.pincode} area have completed thousands of successful jobs
            with top ratings from your neighbors.
          </p>
          <button className="text-text-primary font-bold hover:underline flex items-center gap-1">
            View more about {areaInfo.name} services
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
          </button>
        </div>
      </div>

      {/* Utility to hide scrollbar for categories */}
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
};

export default Area;

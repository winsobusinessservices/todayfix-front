import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomDropdown from "./CustomDropdown";

const AdvancedSearch = () => {
  // State for search filters
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");

  // Mock data for dropdowns
  const cities = ["Bengaluru", "Mumbai", "Delhi", "Hyderabad", "Chennai"];
  const areas = [
    "Indiranagar",
    "Koramangala",
    "Whitefield",
    "HSR Layout",
    "Jayanagar",
  ];
  const categories = [
    "Interior Design",
    "Packers & Movers",
    "Solar Services",
    "Pest Control",
    "Cleaning",
  ];
  const ratings = ["4.5 & above", "4.0 & above", "3.0 & above", "All Ratings"];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching with:", {
      searchQuery,
      city,
      area,
      category,
      rating,
    });
    // Add your search logic/API call here
  };

  return (
    <div className="w-full mx-auto font-sans relative z-10">
      <form
        onSubmit={handleSearch}
        className="bg-surface-primary rounded-lg shadow-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border-primary p-2 md:p-3 transition-all duration-300 hover:shadow-2xl hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]"
      >
        {/* --- Top Row: Primary Search (Service & City) --- */}
        <div className="flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-border-secondary">
          {/* Service Name Input */}
          <div className="w-full md:flex-[2] flex items-center px-4 py-3 md:py-2 group">
            <svg
              className="w-6 h-6 text-text-muted group-focus-within:text-text-primary transition-colors flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <div className="flex flex-col w-full ml-3">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-0.5">
                What are you looking for?
              </label>
              <input
                type="text"
                placeholder="e.g. Interior Designers, Plumbers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-text-primary font-semibold placeholder-text-muted outline-none truncate"
              />
            </div>
          </div>

          {/* City Selection */}
          <div className="w-full md:flex-[1] flex items-center px-4 py-3 md:py-2 group">
            <svg
              className="w-6 h-6 text-text-muted group-focus-within:text-text-primary transition-colors flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <div className="flex flex-col w-full ml-3 relative">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-0.5">
                City
              </label>
              <CustomDropdown
                options={cities}
                value={city}
                onChange={setCity}
                placeholder="Select City"
                variant="transparent"
              />
            </div>
          </div>

          {/* Search Button (Desktop) */}
          <div className="hidden md:block pl-3 pr-1">
            <button
              type="submit"
              className="w-14 h-14 rounded-xl bg-surface-dark hover:bg-zinc-800 text-white flex items-center justify-center transition-transform duration-300 active:scale-95 shadow-md shadow-black/20"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* --- Bottom Row: Secondary Filters --- */}
        <div className="px-4 py-4 md:py-3 mt-2 border-t border-border-secondary flex flex-wrap items-center gap-3 md:gap-4 bg-surface-secondary rounded-xl">
          <span className="hidden md:inline-block text-xs font-semibold text-text-muted mr-2">
            Filters:
          </span>

          {/* Area Filter */}
          <CustomDropdown
            options={areas}
            value={area}
            onChange={setArea}
            placeholder="Any Area"
            icon={
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            }
          />

          {/* Category Filter */}
          <CustomDropdown
            options={categories}
            value={category}
            onChange={setCategory}
            placeholder="All Categories"
            icon={
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            }
          />

          {/* Rating Filter */}
          <CustomDropdown
            options={ratings}
            value={rating}
            onChange={setRating}
            placeholder="Any Rating"
            icon={
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            }
          />

          {/* Search Button (Mobile Only) */}
          <button
            type="submit"
            className="md:hidden w-full mt-2 py-3 rounded-xl bg-surface-dark hover:bg-zinc-800 text-white font-bold flex items-center justify-center gap-2 transition-transform duration-300 active:scale-95 shadow-md shadow-black/20"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Search Services
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdvancedSearch;

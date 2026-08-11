import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import CustomDropdown from "./CustomDropdown";
import { ratings } from "../../data/collectedData";
import { api } from "../../api";

const AnimatedSearchBar = () => {
  // State for the user's actual input
  const [inputValue, setInputValue] = useState("");

  // States for the typing effect in the placeholder
  const [placeholderText, setPlaceholderText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(120);
  const navigate = useNavigate();

  const [area, setArea] = useState("");
  const [service, setService] = useState("");
  const [rating, setRating] = useState("");

  const [servicesData, setServicesData] = useState([]);
  const [areasData, setAreasData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, areasRes] = await Promise.all([
          api.getServices(),
          api.getAreas(),
        ]);
        setServicesData(servicesRes);
        setAreasData(areasRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const areas = areasData?.map((ar) => ar?.name) || [];
  const services = servicesData?.map((s) => s?.name) || [];

  useEffect(() => {
    // Only run the typing animation if the user hasn't typed anything
    if (inputValue !== "") return;

    let timer = setTimeout(() => {
      handleTyping();
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [placeholderText, isDeleting, inputValue, loopNum, typingSpeed]);

  const handleTyping = () => {
    if (servicesData.length === 0) return;
    const i = loopNum % servicesData.length;
    const fullText = servicesData[i]?.name || "";

    // Determine the next string state based on whether we are typing or deleting
    setPlaceholderText(
      isDeleting
        ? fullText.substring(0, placeholderText.length - 1)
        : fullText.substring(0, placeholderText.length + 1),
    );

    // Adjust speed: faster when deleting, slower when typing
    setTypingSpeed(isDeleting ? 40 : 120);

    // If word is fully typed, pause before deleting
    if (!isDeleting && placeholderText === fullText) {
      setTimeout(() => setIsDeleting(true), 1500);
    }
    // If word is fully deleted, move to next word
    else if (isDeleting && placeholderText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      navigate(`/services/${encodeURIComponent(inputValue.trim())}`);
    }
  };

  return (
    <div className="flex items-center justify-center font-sans px-4 sm:px-6 w-full">
      {/* Search Bar Container */}
      <div className="relative w-full max-w-xl group">
        {/* Animated Background Glow */}
        {/* <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div> */}
        {/* Main Input Wrapper */}
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center w-full h-12 bg-surface-primary rounded-full border border-border-dark focus-within:border-border-primary focus-within:ring-4 focus-within:ring-cyan-500/10 transition-all shadow-2xl overflow-hidden"
        >
          {/* Search Icon */}
          <div className="pl-6 pr-3 text-text-primary group-focus-within:text-cyan-400 transition-colors">
            <svg
              className="h-7 w-7"
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
          </div>

          {/* Input Field */}
          <input
            type="text"
            onFocus={() => {
              // Reset the typing animation when the user focuses on the input
              setPlaceholderText("");
              setIsDeleting(false);
              setLoopNum(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full h-full bg-transparent text-text-primary outline-none placeholder-text-primary text-xl truncate"
            placeholder={`Search ${inputValue === "" ? placeholderText : ""}`}
            spellCheck="false"
          />

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Clear Button (Shows only when user types) */}
            {inputValue && (
              <button
                onClick={() => setInputValue("")}
                className="p-2 text-text-inverted hover:text-text-inverted transition-colors focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="hidden sm:block bg-surface-dark hover:bg-black/70 hover:text-text-inverted text-text-inverted px-6 py-3 rounded-full font-bold text-lg tracking-wide transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
              Search
            </button>
          </div>
        </form>

        {/* Secondary Filters */}
        <div className="flex items-center justify-center gap-1 md:gap-3 mt-6">
          {/* Area Filter */}
          <div className="bg-zinc-800/80 backdrop-blur-md rounded-xl border border-zinc-700/50 hover:border-cyan-500/50 transition-colors shadow-lg">
            <CustomDropdown
              options={areas}
              value={area}
              onChange={setArea}
              placeholder="Any Area"
              variant="dark"
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
          </div>

          {/* Service Filter */}
          <div className="bg-zinc-800/80 backdrop-blur-md rounded-xl border border-zinc-700/50 hover:border-cyan-500/50 transition-colors shadow-lg">
            <CustomDropdown
              options={services}
              value={service}
              onChange={setService}
              placeholder="All Services"
              variant="dark"
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
          </div>

          {/* Rating Filter */}
          <div className="bg-zinc-800/80 backdrop-blur-md rounded-xl border border-zinc-700/50 hover:border-cyan-500/50 transition-colors shadow-lg">
            <CustomDropdown
              options={ratings}
              value={rating}
              onChange={setRating}
              placeholder="Any Rating"
              variant="dark"
              icon={
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedSearchBar;

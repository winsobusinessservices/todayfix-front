import React, { useState, useEffect } from "react";

const AnimatedSearchBar = () => {
  // State for the user's actual input
  const [inputValue, setInputValue] = useState("");

  // States for the typing effect in the placeholder
  const [placeholderText, setPlaceholderText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(120);

  // The phrases you want to type out
  const phrases = [
    "Digital Media...",
    "Interior Work...",
    "Packers & Movers...",
    "Real Estate...",
  ];

  useEffect(() => {
    // Only run the typing animation if the user hasn't typed anything
    if (inputValue !== "") return;

    let timer = setTimeout(() => {
      handleTyping();
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [placeholderText, isDeleting, inputValue, loopNum, typingSpeed]);

  const handleTyping = () => {
    const i = loopNum % phrases.length;
    const fullText = phrases[i];

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

  return (
    <div className="flex items-center justify-center font-sans px-4 sm:px-6 w-full">
      {/* Search Bar Container */}
      <div className="relative w-full max-w-xl group">
        {/* Animated Background Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>

        {/* Main Input Wrapper */}
        <div className="relative flex items-center w-full h-12 bg-zinc-700 rounded-full border border-border-dark focus-within:border-cyan-500 focus-within:ring-4 focus-within:ring-cyan-500/10 transition-all shadow-2xl overflow-hidden">
          {/* Search Icon */}
          <div className="pl-6 pr-3 text-text-inverted group-focus-within:text-cyan-400 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full h-full bg-transparent text-text-inverted outline-none placeholder-white text-xl truncate"
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
            <button className="hidden sm:block bg-surface-primary hover:bg-black/70 hover:text-text-inverted text-text-primary px-6 py-3 rounded-full font-bold text-lg tracking-wide transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-zinc-900">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedSearchBar;

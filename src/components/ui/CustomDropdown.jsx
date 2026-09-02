import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";

const CustomDropdown = ({
  options,
  value,
  onChange,
  placeholder,
  icon,
  variant = "pill", // "pill" or "transparent"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedDisplay = value || placeholder;

  if (variant === "transparent") {
    return (
      <div className="relative w-full" ref={ref}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-transparent text-text-primary font-semibold cursor-pointer py-1 flex items-center justify-between"
        >
          <span className="truncate">{selectedDisplay}</span>
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="w-4 h-4 text-text-muted ml-2 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-full mt-2 w-full min-w-[160px] bg-surface-primary border border-border-primary rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-50 overflow-hidden"
            >
              <div className="max-h-60 overflow-y-auto p-1">
                {options.map((opt, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      onChange(opt);
                      setIsOpen(false);
                    }}
                    className={`px-3 py-2 cursor-pointer text-sm rounded-lg transition-colors ${
                      value === opt
                        ? "bg-surface-secondary text-text-primary font-bold"
                        : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
                    }`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative w-full" ref={ref}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-surface-primary border border-border-primary text-text-primary text-sm font-medium rounded-xl py-2 pl-9 pr-8 hover:border-black cursor-pointer shadow-sm transition-all"
      >
        <div className="absolute left-3 flex items-center pointer-events-none text-text-muted group-hover:text-text-primary transition-colors">
          {icon}
        </div>
        <span className="truncate whitespace-nowrap">{selectedDisplay}</span>
        <div className="absolute right-3 flex items-center pointer-events-none text-text-muted">
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-2 w-full bg-surface-primary border border-border-primary rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-50 overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto p-1.5">
              <div
                onClick={() => {
                  onChange(""); // Clear selection
                  setIsOpen(false);
                }}
                className={`px-3 py-2 cursor-pointer text-sm rounded-xl transition-colors ${
                  !value
                    ? "bg-surface-secondary text-text-primary font-bold"
                    : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
                }`}
              >
                {placeholder}
              </div>
              {options.map((opt, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                  }}
                  className={`px-3 py-2 cursor-pointer text-sm rounded-xl transition-colors ${
                    value === opt
                      ? "bg-surface-secondary text-text-primary font-bold"
                      : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
                  }`}
                >
                  {opt}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDropdown;

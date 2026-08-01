import React from "react";
import "./logo.css";

const Logo = () => {
  // Splitting the word to apply staggered animations to each letter
  const prefix = "Today".split("");
  const suffix = "ix".split("");

  return (
    <div className="relative flex items-baseline text-xl font-extrabold tracking-tighter text-[#8E7692] select-none cursor-pointer group">
      {/* Animate 'Today' */}
      {prefix.map((char, index) => (
        <span
          key={`prefix-${index}`}
          className="animate-letter transition-colors duration-300 group-hover:text-[#8E7692]"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {char}
        </span>
      ))}

      {/* Animated 'f' Wrapper */}
      <div className="relative mx-[2px] flex flex-col items-center justify-end z-20">
        <span className="animate-f-special text-[#8E7692] drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
          f
        </span>

        <div className="animate-bottom-line absolute bottom-[12%] w-full h-[4px] md:h-[6px] bg-[#8E7692] rounded-full"></div>
      </div>

      {/* Animate 'ix' */}
      {suffix.map((char, index) => (
        <span
          key={`suffix-${index}`}
          className="animate-letter transition-colors duration-300 group-hover:text-[#8E7692]"
          // Continue the timing delay cascade after the 'f'
          style={{ animationDelay: `${(index + prefix.length + 1) * 0.05}s` }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default Logo;

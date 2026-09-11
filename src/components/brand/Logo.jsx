import React from "react";
import "./Logo.css";

const Logo = () => {
  // Splitting the word to apply staggered animations to each letter
  const prefix = "Today".split("");
  const suffix = "ix".split("");

  return (
    <div className="group relative flex cursor-pointer select-none items-baseline text-xl font-extrabold tracking-tighter text-text-primary">
      {/* Animate 'Today' */}
      {prefix.map((char, index) => (
        <span
          key={`prefix-${index}`}
          className="animate-letter transition-colors duration-300 group-hover:text-text-secondary"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {char}
        </span>
      ))}

      {/* Animated 'f' Wrapper */}
      <div className="relative mx-[2px] flex flex-col items-center justify-end z-20">
        <span className="animate-f-special transition-colors duration-300 group-hover:text-text-secondary">
          f
        </span>

        <div className="animate-bottom-line absolute bottom-[12%] h-[4px] w-full rounded-full bg-text-primary md:h-[6px]"></div>
      </div>

      {/* Animate 'ix' */}
      {suffix.map((char, index) => (
        <span
          key={`suffix-${index}`}
          className="animate-letter transition-colors duration-300 group-hover:text-text-secondary"
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

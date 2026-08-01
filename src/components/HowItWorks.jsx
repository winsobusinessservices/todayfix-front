import React from "react";
import { howItWorksData } from "../data/howItWorksData";

const HowItWorks = () => {
  return (
    <section className="w-full bg-surface-secondary py-20 px-4 md:px-8 font-sans overflow-hidden border-y border-border-secondary relative">
      
      {/* Global SVG Defs for markers to ensure they render on all screen sizes */}
      <svg className="w-0 h-0 absolute pointer-events-none">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M 0 0 L 6 3 L 0 6 z" fill="#18181b" />
          </marker>
        </defs>
      </svg>

      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        {/* Top Black Dash */}
        <div className="w-8 h-1 bg-surface-dark mx-auto mb-6 rounded-full"></div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-6">
          How it works
        </h2>

        <p className="text-text-secondary text-sm md:text-base leading-relaxed">
          Getting your work done by verified Indian professionals is quick and
          effortless.
        </p>
      </div>

      {/* Steps Container */}
      <div className="max-w-6xl mx-auto relative">
        
        {/* Desktop SVG Connecting Lines (Hidden on Mobile & Tablet) */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
          <svg
            className="w-full h-full"
            viewBox="0 0 1000 300"
            preserveAspectRatio="none"
          >
            {/* Swoop Under (Step 1 to Step 2) */}
            <path
              d="M 180 230 Q 250 290 320 240"
              fill="none"
              stroke="#18181b"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              markerEnd="url(#arrowhead)"
            />
            {/* Swoop Over (Step 2 to Step 3) */}
            <path
              d="M 430 80 Q 500 20 570 80"
              fill="none"
              stroke="#18181b"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              markerEnd="url(#arrowhead)"
            />
            {/* Swoop Under (Step 3 to Step 4) */}
            <path
              d="M 680 230 Q 750 290 820 240"
              fill="none"
              stroke="#18181b"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              markerEnd="url(#arrowhead)"
            />
          </svg>
        </div>

        {/* The 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6 relative z-10">
          {howItWorksData.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center group cursor-default relative"
            >
              {step.mockupUI}
              <h3
                className={`font-semibold text-text-primary text-center ${
                  step.id === 2 || step.id === 4 ? "w-28 leading-snug" : ""
                }`}
              >
                {step.title}
              </h3>
              {step.mobileArrow}
              {step.tabletArrow}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
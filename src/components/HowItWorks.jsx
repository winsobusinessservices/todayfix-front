import React from "react";

const HowItWorks = () => {
  return (
    <section className="w-full bg-zinc-50 py-20 px-4 md:px-8 font-sans overflow-hidden border-y border-zinc-100 relative">
      
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
        <div className="w-8 h-1 bg-black mx-auto mb-6 rounded-full"></div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-6">
          How it works
        </h2>

        <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
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
          
          {/* Step 1: Search Service */}
          <div className="flex flex-col items-center group cursor-default relative">
            <div className="w-56 h-40 relative flex items-center justify-center mb-6">
              {/* CSS UI Mockup: Browser Window */}
              <div className="w-52 h-36 bg-white rounded-md shadow-md border border-zinc-100 overflow-hidden transform group-hover:-translate-y-2 transition-transform duration-300">
                <div className="w-full h-5 bg-zinc-900 flex items-center px-2 space-x-1.5">
                  <div className="w-2 h-2 rounded-full bg-zinc-500"></div>
                  <div className="w-2 h-2 rounded-full bg-zinc-500"></div>
                </div>
                <div className="p-4">
                  <div className="w-16 h-3 bg-zinc-800 rounded-sm mb-4"></div>
                  <div className="w-full h-1.5 bg-zinc-100 rounded-full mb-3"></div>
                  <div className="w-4/5 h-1.5 bg-zinc-100 rounded-full mb-5"></div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-zinc-100 border border-zinc-300 rounded-sm"></div>
                    <div className="w-20 h-1.5 bg-zinc-100 rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-zinc-100 border border-zinc-300 rounded-sm"></div>
                    <div className="w-14 h-1.5 bg-zinc-100 rounded-full"></div>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 h-1 bg-zinc-50 rounded-full"></div>
                </div>
              </div>

              {/* Decorative Circle from original design */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border border-zinc-300 border-dashed rounded-full pointer-events-none"></div>
            </div>
            
            <h3 className="font-semibold text-black text-center">
              Search Service
            </h3>

            {/* Mobile Curved Arrow (Swoops Right) */}
            <svg className="block md:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 w-12 h-10 pointer-events-none z-0" viewBox="0 0 48 40" fill="none">
              <path d="M 24 0 C 44 16, 24 24, 24 35" stroke="#18181b" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrowhead)" />
            </svg>
            {/* Tablet Curved Arrow (Swoops Under) */}
            <svg className="hidden md:block lg:hidden absolute top-[35%] -right-12 w-12 h-10 pointer-events-none z-0" viewBox="0 0 48 40" fill="none">
              <path d="M 0 20 C 16 40, 32 20, 41 20" stroke="#18181b" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrowhead)" />
            </svg>
          </div>

          {/* Step 2: Compare Profiles */}
          <div className="flex flex-col items-center group cursor-default relative">
            <div className="w-56 h-40 relative flex items-center justify-center mb-6">
              {/* CSS UI Mockup: Floating Cards */}
              <div className="relative w-full h-full transform group-hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute top-4 left-2 w-40 h-10 bg-white rounded shadow-sm border border-zinc-100 flex items-center p-2 gap-2 opacity-60">
                  <div className="w-4 h-4 bg-zinc-800 rounded-sm"></div>
                  <div className="flex-1 space-y-1">
                    <div className="h-1.5 w-12 bg-zinc-200 rounded-full"></div>
                  </div>
                  <div className="w-10 h-3 bg-zinc-900 rounded-sm"></div>
                </div>
                <div className="absolute top-14 left-8 w-44 h-12 bg-white rounded shadow-lg border border-zinc-100 flex items-center p-2.5 gap-2 z-20">
                  <div className="w-5 h-5 bg-zinc-800 rounded-sm"></div>
                  <div className="flex-1 space-y-1.5">
                    <div className="h-1.5 w-14 bg-zinc-200 rounded-full"></div>
                    <div className="h-1 w-8 bg-zinc-100 rounded-full"></div>
                  </div>
                  <div className="w-12 h-3.5 bg-black rounded-sm"></div>
                </div>
                <div className="absolute bottom-4 left-4 w-40 h-10 bg-white rounded shadow-sm border border-zinc-100 flex items-center p-2 gap-2 z-10 opacity-80">
                  <div className="w-4 h-4 bg-zinc-800 rounded-sm"></div>
                  <div className="flex-1 space-y-1">
                    <div className="h-1.5 w-10 bg-zinc-200 rounded-full"></div>
                  </div>
                  <div className="w-10 h-3 bg-zinc-900 rounded-sm"></div>
                </div>
              </div>
            </div>
            
            <h3 className="font-semibold text-black text-center w-28 leading-snug">
              Compare Profiles
            </h3>

            {/* Mobile Curved Arrow (Swoops Left) */}
            <svg className="block md:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 w-12 h-10 pointer-events-none z-0" viewBox="0 0 48 40" fill="none">
              <path d="M 24 0 C 4 16, 24 24, 24 35" stroke="#18181b" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrowhead)" />
            </svg>
            {/* (No arrow needed for tablet here as it naturally wraps to the next row) */}
          </div>

          {/* Step 3: Get Free Quotes */}
          <div className="flex flex-col items-center group cursor-default relative">
            <div className="w-56 h-40 relative flex items-center justify-center mb-6">
              {/* CSS UI Mockup: Desktop & Mobile Devices */}
              <div className="relative w-48 h-36 transform group-hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute top-0 left-0 w-36 h-32 bg-white rounded-md shadow-sm border border-zinc-100 overflow-hidden">
                  <div className="w-full h-4 bg-zinc-900"></div>
                  <div className="p-3">
                    <div className="w-8 h-8 bg-zinc-800 rounded-sm mb-3"></div>
                    <div className="w-full h-1.5 bg-zinc-100 rounded-full mb-1.5"></div>
                    <div className="w-full h-1.5 bg-zinc-100 rounded-full mb-1.5"></div>
                    <div className="w-2/3 h-1.5 bg-zinc-100 rounded-full mb-4"></div>
                    <div className="flex gap-2">
                      <div className="w-1/2 h-1 bg-zinc-100 rounded-full"></div>
                      <div className="w-1/2 h-1 bg-zinc-100 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-20 h-28 bg-white rounded-md shadow-xl border border-zinc-200 overflow-hidden z-20">
                  <div className="w-full h-3 bg-zinc-900"></div>
                  <div className="p-2 flex flex-col items-center mt-2">
                    <div className="w-12 h-1 bg-zinc-200 rounded-full mb-2"></div>
                    <div className="w-14 h-4 bg-black rounded-sm mb-3"></div>
                    <div className="w-14 h-1 bg-zinc-200 rounded-full mb-2"></div>
                    <div className="w-14 h-4 bg-black rounded-sm mb-3"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <h3 className="font-semibold text-black text-center">
              Get Free Quotes
            </h3>

            {/* Mobile Curved Arrow (Swoops Right) */}
            <svg className="block md:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 w-12 h-10 pointer-events-none z-0" viewBox="0 0 48 40" fill="none">
              <path d="M 24 0 C 44 16, 24 24, 24 35" stroke="#18181b" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrowhead)" />
            </svg>
            {/* Tablet Curved Arrow (Swoops Over) */}
            <svg className="hidden md:block lg:hidden absolute top-[35%] -right-12 w-12 h-10 pointer-events-none z-0" viewBox="0 0 48 40" fill="none">
              <path d="M 0 20 C 16 0, 32 20, 41 20" stroke="#18181b" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrowhead)" />
            </svg>
          </div>

          {/* Step 4: Hire & Relax */}
          <div className="flex flex-col items-center group cursor-default relative">
            <div className="w-56 h-40 relative flex items-end justify-center pb-2 mb-6 transform group-hover:-translate-y-2 transition-transform duration-300">
              {/* CSS UI Mockup: Document Cards */}
              <div className="w-14 h-20 bg-white border border-zinc-100 shadow-sm transform -rotate-6 translate-x-3 opacity-60 p-2 flex flex-col items-center z-0">
                <div className="w-6 h-0.5 bg-zinc-200 mt-2 mb-1"></div>
                <div className="w-8 h-0.5 bg-zinc-200 mb-1"></div>
                <div className="w-4 h-0.5 bg-zinc-200"></div>
              </div>
              <div className="w-20 h-28 bg-white border border-zinc-100 shadow-xl z-20 relative p-3 flex flex-col items-center">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center shadow-sm">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-end gap-1 mt-4 h-8 border-b border-zinc-100 w-full justify-center pb-1">
                  <div className="w-2.5 h-3 bg-zinc-800 rounded-t-sm"></div>
                  <div className="w-2.5 h-7 bg-zinc-800 rounded-t-sm"></div>
                  <div className="w-2.5 h-5 bg-zinc-800 rounded-t-sm"></div>
                </div>
                <div className="w-12 h-1.5 bg-black rounded-full mt-4"></div>
              </div>
              <div className="w-14 h-20 bg-white border border-zinc-100 shadow-sm transform rotate-6 -translate-x-3 opacity-60 p-2 flex flex-col items-center z-10">
                <div className="w-8 h-0.5 bg-zinc-200 mt-3 mb-1"></div>
                <div className="w-6 h-0.5 bg-zinc-200"></div>
              </div>
            </div>
            
            <h3 className="font-semibold text-black text-center w-28 leading-snug">
              Hire & Relax
            </h3>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
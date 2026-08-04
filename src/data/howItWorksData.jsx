import React from "react";

export const howItWorksData = [
  {
    id: 1,
    title: "Search Service",
    mockupUI: (
      <div className="w-56 h-40 relative flex items-center justify-center mb-6">
        <div className="w-52 h-36 bg-surface-primary rounded-md shadow-md border border-border-secondary overflow-hidden transform group-hover:-translate-y-2 transition-transform duration-300">
          <div className="w-full h-5 bg-zinc-900 flex items-center px-2 space-x-1.5">
            <div className="w-2 h-2 rounded-full bg-zinc-500"></div>
            <div className="w-2 h-2 rounded-full bg-zinc-500"></div>
          </div>
          <div className="p-4">
            <div className="w-16 h-3 bg-zinc-800 rounded-sm mb-4"></div>
            <div className="w-full h-1.5 bg-zinc-100 rounded-full mb-3"></div>
            <div className="w-4/5 h-1.5 bg-zinc-100 rounded-full mb-5"></div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-zinc-100 border border-border-tertiary rounded-sm"></div>
              <div className="w-20 h-1.5 bg-zinc-100 rounded-full"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-zinc-100 border border-border-tertiary rounded-sm"></div>
              <div className="w-14 h-1.5 bg-zinc-100 rounded-full"></div>
            </div>
            <div className="absolute bottom-3 left-4 right-4 h-1 bg-surface-secondary rounded-full"></div>
          </div>
        </div>
        <div className="absolute -top-4 -left-4 w-12 h-12 border border-border-tertiary border-dashed rounded-full pointer-events-none"></div>
      </div>
    ),
    mobileArrow: (
      <svg
        className="block md:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 w-12 h-10 pointer-events-none z-0"
        viewBox="0 0 48 40"
        fill="none"
      >
        <path
          d="M 24 0 C 44 16, 24 24, 24 35"
          stroke="#18181b"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          markerEnd="url(#arrowhead)"
        />
      </svg>
    ),
    tabletArrow: (
      <svg
        className="hidden md:block lg:hidden absolute top-[35%] -right-12 w-12 h-10 pointer-events-none z-0"
        viewBox="0 0 48 40"
        fill="none"
      >
        <path
          d="M 0 20 C 16 40, 32 20, 41 20"
          stroke="#18181b"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          markerEnd="url(#arrowhead)"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Compare Profiles",
    mockupUI: (
      <div className="w-56 h-40 relative flex items-center justify-center mb-6">
        <div className="relative w-full h-full transform group-hover:-translate-y-2 transition-transform duration-300">
          <div className="absolute top-4 left-2 w-40 h-10 bg-surface-primary rounded shadow-sm border border-border-secondary flex items-center p-2 gap-2 opacity-60">
            <div className="w-4 h-4 bg-zinc-800 rounded-sm"></div>
            <div className="flex-1 space-y-1">
              <div className="h-1.5 w-12 bg-zinc-200 rounded-full"></div>
            </div>
            <div className="w-10 h-3 bg-zinc-900 rounded-sm"></div>
          </div>
          <div className="absolute top-14 left-8 w-44 h-12 bg-surface-primary rounded shadow-lg border border-border-secondary flex items-center p-2.5 gap-2 z-20">
            <div className="w-5 h-5 bg-zinc-800 rounded-sm"></div>
            <div className="flex-1 space-y-1.5">
              <div className="h-1.5 w-14 bg-zinc-200 rounded-full"></div>
              <div className="h-1 w-8 bg-zinc-100 rounded-full"></div>
            </div>
            <div className="w-12 h-3.5 bg-surface-dark rounded-sm"></div>
          </div>
          <div className="absolute bottom-4 left-4 w-40 h-10 bg-surface-primary rounded shadow-sm border border-border-secondary flex items-center p-2 gap-2 z-10 opacity-80">
            <div className="w-4 h-4 bg-zinc-800 rounded-sm"></div>
            <div className="flex-1 space-y-1">
              <div className="h-1.5 w-10 bg-zinc-200 rounded-full"></div>
            </div>
            <div className="w-10 h-3 bg-zinc-900 rounded-sm"></div>
          </div>
        </div>
      </div>
    ),
    mobileArrow: (
      <svg
        className="block md:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 w-12 h-10 pointer-events-none z-0"
        viewBox="0 0 48 40"
        fill="none"
      >
        <path
          d="M 24 0 C 4 16, 24 24, 24 35"
          stroke="#18181b"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          markerEnd="url(#arrowhead)"
        />
      </svg>
    ),
    tabletArrow: null,
  },
  {
    id: 3,
    title: "Get Free Quotes",
    mockupUI: (
      <div className="w-56 h-40 relative flex items-center justify-center mb-6">
        <div className="relative w-48 h-36 transform group-hover:-translate-y-2 transition-transform duration-300">
          <div className="absolute top-0 left-0 w-36 h-32 bg-surface-primary rounded-md shadow-sm border border-border-secondary overflow-hidden">
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
          <div className="absolute bottom-0 right-0 w-20 h-28 bg-surface-primary rounded-md shadow-xl border border-border-primary overflow-hidden z-20">
            <div className="w-full h-3 bg-zinc-900"></div>
            <div className="p-2 flex flex-col items-center mt-2">
              <div className="w-12 h-1 bg-zinc-200 rounded-full mb-2"></div>
              <div className="w-14 h-4 bg-surface-dark rounded-sm mb-3"></div>
              <div className="w-14 h-1 bg-zinc-200 rounded-full mb-2"></div>
              <div className="w-14 h-4 bg-surface-dark rounded-sm mb-3"></div>
            </div>
          </div>
        </div>
      </div>
    ),
    mobileArrow: (
      <svg
        className="block md:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 w-12 h-10 pointer-events-none z-0"
        viewBox="0 0 48 40"
        fill="none"
      >
        <path
          d="M 24 0 C 44 16, 24 24, 24 35"
          stroke="#18181b"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          markerEnd="url(#arrowhead)"
        />
      </svg>
    ),
    tabletArrow: (
      <svg
        className="hidden md:block lg:hidden absolute top-[35%] -right-12 w-12 h-10 pointer-events-none z-0"
        viewBox="0 0 48 40"
        fill="none"
      >
        <path
          d="M 0 20 C 16 0, 32 20, 41 20"
          stroke="#18181b"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          markerEnd="url(#arrowhead)"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Hire & Relax",
    mockupUI: (
      <div className="w-56 h-40 relative flex items-end justify-center pb-2 mb-6 transform group-hover:-translate-y-2 transition-transform duration-300">
        <div className="w-14 h-20 bg-surface-primary border border-border-secondary shadow-sm transform -rotate-6 translate-x-3 opacity-60 p-2 flex flex-col items-center z-0">
          <div className="w-6 h-0.5 bg-zinc-200 mt-2 mb-1"></div>
          <div className="w-8 h-0.5 bg-zinc-200 mb-1"></div>
          <div className="w-4 h-0.5 bg-zinc-200"></div>
        </div>
        <div className="w-20 h-28 bg-surface-primary border border-border-secondary shadow-xl z-20 relative p-3 flex flex-col items-center">
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center shadow-sm">
            <div className="w-6 h-6 bg-surface-dark rounded-full flex items-center justify-center text-text-inverted">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-end gap-1 mt-4 h-8 border-b border-border-secondary w-full justify-center pb-1">
            <div className="w-2.5 h-3 bg-zinc-800 rounded-t-sm"></div>
            <div className="w-2.5 h-7 bg-zinc-800 rounded-t-sm"></div>
            <div className="w-2.5 h-5 bg-zinc-800 rounded-t-sm"></div>
          </div>
          <div className="w-12 h-1.5 bg-surface-dark rounded-full mt-4"></div>
        </div>
        <div className="w-14 h-20 bg-surface-primary border border-border-secondary shadow-sm transform rotate-6 -translate-x-3 opacity-60 p-2 flex flex-col items-center z-10">
          <div className="w-8 h-0.5 bg-zinc-200 mt-3 mb-1"></div>
          <div className="w-6 h-0.5 bg-zinc-200"></div>
        </div>
      </div>
    ),
    mobileArrow: null,
    tabletArrow: null,
  },
];

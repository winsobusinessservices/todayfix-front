import React from "react";
import { servicesPageData } from "../data/ServicePageData";
import { Link } from "react-router";

const ServiceCards = ({ service }) => {
  return (
    <>
      <div className="group bg-surface-primary rounded-lg p-2.5 border border-border-primary shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col">
        {/* Image Section: Reduced height */}
        <div className="relative h-36 w-full rounded-lg overflow-hidden mb-4">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Category Badge overlay */}
          <div className="absolute top-2 left-2 bg-surface-primary/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-text-primary shadow-sm">
            {service.category}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-grow px-2">
          <h3 className="text-base font-bold text-text-primary mb-1.5 transition-colors">
            {service.name}
          </h3>
          <p className="text-[11px] text-text-secondary leading-relaxed line-clamp-2">
            {service.description}
          </p>

          {/* Vendors List (Facepile) */}
          <div className="mt-4 pt-3 border-t border-border-secondary flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Overlapping Avatars */}
              <div className="flex -space-x-2.5">
                {service.vendors.map((avatar, idx) => (
                  <div
                    key={idx}
                    className="w-7 h-7 rounded-full border-[1.5px] border-surface-primary shadow-sm overflow-hidden bg-surface-secondary relative z-10 hover:z-20 hover:scale-110 transition-transform"
                  >
                    <img
                      src={avatar}
                      alt="Vendor"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Vendor Count Text */}
              <div className="text-[10px] font-medium text-text-muted flex flex-col leading-tight">
                <span className="font-bold text-text-primary">
                  {service.vendorCount}+
                </span>
                Vendors
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4 px-1 pb-1">
          <Link
            to={`/services/${service.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="w-full bg-surface-dark text-text-inverted py-2.5 rounded-lg font-semibold text-xs hover:bg-zinc-800 transition-colors duration-300 flex items-center justify-center gap-1.5 group/btn shadow-sm"
          >
            View Providers
            <svg
              className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ServiceCards;

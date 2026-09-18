import React from "react";
import { Star, Users, MapPin, Search } from "lucide-react";
import { Link } from "react-router";

const services = [
  {
    title: "Women's Salon & Spa",
    icon: "💆‍♀️",
    badge: "44 mins",
    bgColor: "bg-pink-50",
  },
  {
    title: "Men's Salon & Massage",
    icon: "💆‍♂️",
    bgColor: "bg-blue-50",
  },
  {
    title: "AC & Appliance Repair",
    icon: "❄️",
    badge: "44 mins",
    bgColor: "bg-cyan-50",
  },
  {
    title: "Cleaning & Pest Control",
    icon: "🧹",
    badge: "29 mins",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Electrician, Plumber & Carpenter",
    icon: "🛠️",
    badge: "29 mins",
    bgColor: "bg-orange-50",
  },
  {
    title: "Painting & Waterproofing",
    icon: "🖌️",
    bgColor: "bg-yellow-50",
  },
  {
    title: "Wall Panels by Revamp",
    icon: "🧱",
    bgColor: "bg-stone-100",
  },
];

const smartProducts = [
  {
    title: "Native Water Purifier",
    icon: "💧",
    badge: "New",
    badgeColor: "bg-rose-600 text-white",
    bgColor: "bg-zinc-100",
  },
  {
    title: "Native Smart Locks",
    icon: "🔏",
    bgColor: "bg-zinc-100",
  },
];

const UrbanCompanyHero = () => {
  return (
    <div className="w-full bg-surface-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid  gap-12 lg:gap-8 items-start">
          {/* Left Column */}
          <div className="flex flex-col w-full max-w-xl">
            {/* <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-text-primary leading-[1.1] tracking-tight">
              Home services at your doorstep
            </h1> */}

            {/* Main Card */}
            <div className="bg-surface-primary sm:border sm:border-border-primary rounded-lg max-md:my-3 sm:p-6 sm:my-6 sm:shadow-sm">
              {/* What are you looking for */}
              <div className="mb-6">
                {/* <h3 className="text-xl font-bold text-text-primary mb-6">
                  What are you looking for?
                </h3> */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-3 gap-y-3">
                  {services.map((service, idx) => (
                    <Link
                      key={idx}
                      to="#"
                      className="flex flex-col items-center text-center group cursor-pointer w-full"
                    >
                      <div className="relative mb-3 w-full">
                        <div
                          className={`w-full h-16 sm:h-20 rounded-lg flex items-center justify-center text-3xl sm:text-4xl ${service.bgColor} group-hover:scale-105 transition-transform duration-200`}
                        >
                          {service.icon}
                        </div>
                        {service.badge && (
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-white border border-green-200 text-green-700 text-[10px] sm:text-xs font-bold rounded-full shadow-sm whitespace-nowrap">
                            {service.badge}
                          </div>
                        )}
                      </div>
                      <p className="text-xs font-medium text-text-primary leading-tight px-1">
                        {service.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Native Smart Products */}
              <div className="pt-6 border-t border-border-primary">
                <h3 className="text-xl font-bold text-text-primary mb-6">
                  Native Smart Products
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-3 gap-y-3">
                  {smartProducts.map((product, idx) => (
                    <Link
                      key={idx}
                      to="#"
                      className="flex flex-col items-center text-center group cursor-pointer w-full"
                    >
                      <div className="relative mb-3 w-full">
                        <div
                          className={`w-full h-16 sm:h-20 rounded-lg flex items-center justify-center text-4xl ${product.bgColor} group-hover:scale-105 transition-transform duration-200`}
                        >
                          {product.icon}
                        </div>
                        {product.badge && (
                          <div
                            className={`absolute top-0 right-0 translate-x-2 -translate-y-2 px-2 py-0.5 text-[10px] font-bold rounded-sm shadow-sm ${
                              product.badgeColor || "bg-zinc-800 text-white"
                            }`}
                          >
                            {product.badge}
                          </div>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-text-primary leading-tight">
                        {product.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Ratings row */}
            {/* <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 border border-border-primary rounded-full">
                  <Star
                    className="w-6 h-6 text-text-primary"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <p className="text-xl font-bold text-text-primary">4.8</p>
                  <p className="text-sm text-text-secondary">Service Rating*</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 border border-border-primary rounded-full">
                  <Users
                    className="w-6 h-6 text-text-primary"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <p className="text-xl font-bold text-text-primary">12M+</p>
                  <p className="text-sm text-text-secondary">
                    Customers Globally*
                  </p>
                </div>
              </div>
            </div> */}
          </div>

          {/* Right Column / Image Area */}
          {/* <div className="hidden lg:block relative h-full min-h-[600px] rounded-3xl overflow-hidden ml-8">
            <div className="absolute inset-0 grid grid-rows-2 gap-4">
              <div className="bg-zinc-200 rounded-3xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop"
                  alt="Cleaning Service"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-zinc-200 rounded-3xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop"
                  alt="Repair Service"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UrbanCompanyHero;

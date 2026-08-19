import React, { useState, useMemo } from "react";
import AdvancedSearch from "../components/ui/AdvancedSearch";
import CustomDropdown from "../components/ui/CustomDropdown";
import ServicesCards from "../features/home/ServiceCards";
import { servicesPageData } from "../data/ServicePageData";
import SEO from "../components/seo/SEO";

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Services");

  const categories = useMemo(() => {
    return ["All Services", "Cleaning", "Appliances", "Moving", ...new Set(servicesPageData.map((item) => item.category))];
  }, []);

  const filteredServices = useMemo(() => {
    if (selectedCategory === "All Services") {
      return servicesPageData;
    }
    return servicesPageData.filter(
      (service) => service.category === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <div className="w-full max-w-6xl mx-auto relative flex flex-col gap-6 pt-4 md:pt-6">
      <SEO
        title="All Services | TodayFix"
        description="Browse all available services on TodayFix. Find the right professional for your plumbing, electrical, cleaning, and maintenance needs."
      />
      <div className="text-center md:text-left hidden md:block">
        <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">
          {selectedCategory === "All Services" ? "Popular Services" : `${selectedCategory} Services`}
        </h2>
        <p className="text-text-muted mt-2 text-base">
          Find and compare the best professionals for your needs.
        </p>
      </div>
      <div className="bg-background-primary pb-4 shadow-[0_10px_10px_-10px_rgba(0,0,0,0.05)]">
        <AdvancedSearch />
      </div>

      <div className="w-full bg-transparent pb-14 font-sans flex justify-center relative max-md:px-4">
        <div className="max-w-[1400px] w-full flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-background-secondary bg-surface-primary rounded-lg md:shadow-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:border border-border-primary md:p-3 transition-all duration-300 hover:shadow-2xl hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] z-30">
              <h3 className="text-lg font-bold text-text-primary tracking-tight hidden mb-2 md:block">Categories</h3>

              {/* Mobile Dropdown */}
              <div className="md:hidden relative mb-2">
                <div className="text-center md:text-left mb-5">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">
                    {selectedCategory === "All Services" ? "Popular Services" : `${selectedCategory} Services`}
                  </h2>
                  <p className="text-text-muted mt-2 text-base">
                    Find and compare the best professionals for your needs.
                  </p>
                </div>
                <CustomDropdown
                  options={categories}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
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
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  }
                />
              </div>

              {/* Desktop List */}
              <ul className="hidden md:flex flex-col gap-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm
                        ${selectedCategory === category
                          ? "bg-surface-dark text-white shadow-md"
                          : "text-text-secondary hover:bg-surface-accent hover:text-text-primary"
                        }
                      `}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 ">
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {filteredServices.map((service) => (
                  <span key={service.id}>
                    <ServicesCards service={service} />
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-background-secondary rounded-2xl border border-border-light">
                <p className="text-text-muted text-lg">No services found in this category.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div >
  );
};

export default Services;

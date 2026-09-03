import React, { useState, useMemo } from "react";
import { Link, useParams } from "react-router";
import { vendors } from "../data/collectedData";
import CustomDropdown from "../components/ui/CustomDropdown";
import SEO from "../components/seo/SEO";
import { useQuery } from "@tanstack/react-query";
import { categoryApi } from "../services/categoryApi";
import * as Icons from "lucide-react";
import { serviceApi } from "../services/serviceApi";
import { IMAGE_URL } from "../services/axiosClient";
import { useBookingStore } from "../store/bookingStore";
import BookingDrawer from "../components/booking/BookingDrawer";

const Service = () => {
  const { slug } = useParams();
  const [sortBy, setSortBy] = useState("Recommended");
  const openBooking = useBookingStore((state) => state.openBooking);

  // 1. Fetch Categories to find the one matching `slug`
  const { data: subcategoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["publicSubcategory"],
    queryFn: () => categoryApi.getSubcategory(slug),
  });

  const currentSubcategory =
    subcategoriesData?.data || subcategoriesData || null;

  const { data: servicesData } = useQuery({
    queryKey: ["subcategory-services", currentSubcategory?.subCat_uuid],
    queryFn: () =>
      serviceApi.getServicesBySubcategory(currentSubcategory?.subCat_uuid),
    enabled: !!currentSubcategory?.subCat_uuid,
  });

  const services = servicesData?.results || [];
  // console.log(currentSubcategory);

  if (isLoadingCategories) {
    return (
      <div className="min-h-screen bg-surface-primary flex items-center justify-center">
        <span className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  if (!currentSubcategory) {
    return (
      <div className="min-h-screen bg-surface-primary flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Category Not Found
        </h2>
        <p className="text-text-secondary mb-6">
          The category you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/services"
          className="px-6 py-3 bg-surface-dark text-text-inverted rounded-xl font-semibold"
        >
          Browse All Services
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-primary font-sans pb-20">
      <SEO
        title={`${currentSubcategory.name} Services | TodayFix`}
        description={
          currentSubcategory.description ||
          `Find the best ${currentSubcategory.name} professionals in your area.`
        }
      />

      {/* Clean Header / Hero */}
      <div className="w-full bg-surface-secondary pt-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-36 h-36 md:w-40 md:h-40 bg-white rounded-3xl shadow-sm border border-border-primary flex items-center justify-center shrink-0">
              <img
                src={IMAGE_URL + currentSubcategory?.image}
                alt={currentSubcategory?.name}
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center justify-center md:justify-start gap-2 mb-3">
                <span className="px-3 py-1 bg-surface-accent text-text-primary text-xs font-extrabold uppercase tracking-wider rounded-full">
                  {currentSubcategory?.category_name}
                </span>
                {/* <span className="flex items-center gap-1 text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                  <Icons.ShieldCheck className="w-4 h-4" /> Verified
                </span> */}
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight mb-4">
                {currentSubcategory.name}
              </h1>
              <p className="text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed">
                {currentSubcategory.description ||
                  "Discover top-rated professionals for all your needs. Quality service, transparent pricing, and trusted experts."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
          {/* Main Content (Left) */}
          <div className="flex-1">
            {/* Vendors Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pt-4">
              <h2 className="text-2xl font-bold text-text-primary">
                Top Rated Providers
              </h2>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-secondary shrink-0">
                  Sort by:
                </span>
                <div className="w-48">
                  <CustomDropdown
                    options={["Highest Rated", "Most Reviews"]}
                    value={sortBy}
                    onChange={setSortBy}
                    placeholder="Recommended"
                    icon={<Icons.SlidersHorizontal className="w-4 h-4" />}
                  />
                </div>
              </div>
            </div>

            {/* Vendors List (Mock Data) */}
            <div className="flex flex-col gap-4">
              {vendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="bg-surface-primary rounded-2xl p-5 border border-border-primary hover:border-black/30 shadow-sm transition-all duration-300 flex flex-col md:flex-row gap-6"
                >
                  <div className="flex items-center gap-4 md:w-32 flex-shrink-0">
                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden bg-surface-secondary border border-border-secondary shrink-0">
                      <img
                        src={vendor.avatar}
                        alt={vendor.name}
                        className="w-full h-full object-cover p-2"
                      />
                    </div>
                  </div>

                  <div className="flex-grow flex flex-col justify-center">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
                          {vendor.name}
                          {vendor.verified && (
                            <Icons.BadgeCheck className="w-5 h-5 text-blue-500" />
                          )}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-secondary mt-1">
                          <div className="flex items-center gap-1 font-bold text-text-primary">
                            <Icons.Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            {vendor.rating}{" "}
                            <span className="font-normal text-text-muted">
                              ({vendor.reviews})
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icons.MapPin className="w-3.5 h-3.5" />
                            {vendor.location}
                          </div>
                        </div>
                      </div>

                      <div className="hidden md:block">
                        <Link
                          to={`/vendor/${vendor.id}`}
                          className="px-5 py-2 bg-surface-secondary hover:bg-zinc-200 text-text-primary font-bold rounded-xl text-sm transition-colors"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>

                    <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                      {vendor.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {vendor.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-surface-secondary text-text-secondary px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="md:hidden mt-4 pt-4 border-t border-border-secondary">
                      <Link
                        to={`/vendor/${vendor.id}`}
                        className="w-full text-center block px-5 py-2.5 bg-surface-secondary text-text-primary font-bold rounded-xl text-sm"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & Booking Panel (Right Sticky Sidebar) */}
          <div className="w-full lg:w-[360px] flex-shrink-0">
            <div className="sticky top-[100px] bg-surface-primary rounded-3xl p-6 border border-border-primary shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
              <div className="bg-purple-50 rounded-2xl p-5 mb-6 border border-purple-100">
                <span className="text-text-secondary font-bold text-xs uppercase tracking-wider block mb-1">
                  Standard Pricing from
                </span>
                <div className="text-3xl font-black text-text-primary">
                  ₹499
                </div>
                <p className="text-text-muted text-xs font-medium mt-2">
                  *Final price depends on selected service
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Icons.Clock className="w-5 h-5 text-text-muted shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">
                      Flexible Timing
                    </h4>
                    <p className="text-xs text-text-secondary">
                      Book slots that work for you
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icons.CreditCard className="w-5 h-5 text-text-muted shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">
                      Secure Payments
                    </h4>
                    <p className="text-xs text-text-secondary">
                      Pay after service completion
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-center items-center gap-2 bg-surface-secondary text-text-secondary px-6 py-4 rounded-2xl text-base font-bold transition-all shadow-md mb-4 text-center">
                Select a service below to book{" "}
                <Icons.ArrowDown className="w-4 h-4" />
              </div>
              <p className="text-[10px] text-center text-text-muted font-medium uppercase tracking-widest">
                No credit card required
              </p>
            </div>
          </div>
        </div>
        {/* Services List Section */}
        <div className="w-full mt-16 mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-text-primary tracking-tight">
              Available Services
            </h2>
            <div className="text-sm font-bold text-text-secondary">
              {services.length} services found
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service?.service_uuid}
                className="flex flex-col bg-surface-primary rounded-3xl border border-border-primary shadow-sm hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all overflow-hidden group"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-3 py-1.5 bg-surface-secondary text-text-primary text-[10px] font-black uppercase tracking-widest rounded-xl">
                      {service?.subcategory?.name}
                    </span>
                    <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      <Icons.ShieldCheck className="w-3.5 h-3.5" />
                      Verified
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-text-primary mb-2 leading-tight group-hover:text-emerald-600 transition-colors">
                    {service?.name}
                  </h3>

                  <div className="flex items-center gap-2.5 mb-3 pb-2 border-b border-border-primary/50">
                    <div className="w-8 h-8 rounded-full bg-surface-secondary flex items-center justify-center shrink-0 border border-border-primary">
                      <Icons.Store className="w-4 h-4 text-text-secondary" />
                    </div>
                    <p className="text-sm font-bold text-text-secondary truncate">
                      {service?.business?.name || "Independent Provider"}
                    </p>
                  </div>

                  <p className="text-sm text-text-secondary font-medium leading-relaxed mb-3 flex-1 line-clamp-3">
                    {service?.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {service?.duration && (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-text-secondary bg-surface-secondary px-3 py-1.5 rounded-lg border border-border-primary/50">
                        <Icons.Clock className="w-3.5 h-3.5" />
                        {service.duration} min
                      </div>
                    )}
                    {service?.required_employees && (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-text-secondary bg-surface-secondary px-3 py-1.5 rounded-lg border border-border-primary/50">
                        <Icons.Users className="w-3.5 h-3.5" />
                        {service.required_employees} Staff
                      </div>
                    )}
                  </div>

                  <div className="h-px w-full bg-border-primary mb-5" />

                  <div className="flex items-end justify-between mt-auto">
                    <div>
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-1">
                        Starting at
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-text-primary tracking-tight">
                          ₹{Math.round(service?.price)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => openBooking(service)}
                      className="px-5 py-3 bg-surface-dark text-text-inverted font-bold text-sm rounded-xl hover:bg-zinc-800 transition-all active:scale-95 shadow-md flex items-center gap-2"
                    >
                      Book
                      <Icons.ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BookingDrawer />
    </div>
  );
};

export default Service;

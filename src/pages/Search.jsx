import React, { useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { serviceApi } from "../services/serviceApi";
import SEO from "../components/seo/SEO";
import * as Icons from "lucide-react";
import { useBookingStore } from "../store/bookingStore";
import BookingDrawer from "../components/booking/BookingDrawer";
import { IMAGE_URL } from "../services/axiosClient";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const openBooking = useBookingStore((state) => state.openBooking);

  // Convert searchParams to an object
  const params = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["searchServices", params],
    queryFn: () => serviceApi.searchServices(params),
  });

  const services = data?.results || [];
  const count = data?.count || 0;

  const handlePageChange = (newPage) => {
    setSearchParams({ ...params, page: newPage });
  };

  const currentPage = parseInt(params.page || "1", 10);
  const totalPages = Math.ceil(count / 10); // Assuming 10 items per page

  return (
    <div className="min-h-screen bg-surface-primary font-sans pb-20">
      <SEO
        title={`Search Results for "${params.search || "Services"}" | TodayFix`}
        description="Find top-rated professionals and services on TodayFix."
      />

      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-12">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-text-primary mb-3">
            Search Results for "{params.search || "Services"}"
          </h1>
          <p className="text-text-secondary text-lg font-medium">
            {isLoading
              ? "Searching..."
              : `Found ${count} ${count === 1 ? "service" : "services"} matching your criteria.`}
          </p>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <span className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></span>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-6 rounded-2xl text-center">
            <Icons.AlertCircle className="w-10 h-10 mx-auto mb-2" />
            <p className="font-bold">Error loading search results.</p>
            <p className="text-sm">Please try again later.</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20 bg-surface-secondary rounded-2xl border border-border-primary">
            <Icons.SearchX className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-text-primary mb-2">
              No services found
            </h3>
            <p className="text-text-secondary">
              Try adjusting your search terms or filters.
            </p>
            <Link
              to="/"
              className="inline-flex mt-6 px-6 py-3 bg-surface-dark text-text-inverted rounded-xl font-semibold"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {services.map((service) => (
              <div
                key={service.service_uuid}
                className="bg-surface-primary rounded-3xl p-4 md:p-6 border border-border-primary hover:border-black transition-colors flex flex-col md:flex-row gap-6 group"
              >
                {/* Image Section */}
                <div className="w-full md:w-56 h-48 md:h-auto rounded-2xl overflow-hidden shrink-0 bg-surface-secondary relative border border-border-primary">
                  {service.image ? (
                    <img 
                      src={`${IMAGE_URL}${service.image}`} 
                      alt={service.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-surface-secondary">
                       <Icons.Image className="w-8 h-8 text-zinc-300" />
                    </div>
                  )}
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-surface-primary/90 backdrop-blur-sm text-text-primary text-[10px] font-bold uppercase tracking-wider rounded-lg border border-border-primary">
                      {service.category?.name}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-grow flex flex-col justify-center py-1">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1 block">
                        {service.subcategory?.name}
                      </span>
                      <h3 className="text-2xl font-black text-text-primary mb-2">
                        {service.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-sm font-bold text-text-secondary">
                        <Icons.Store className="w-4 h-4" />
                        {service.business?.name || "Independent Pro"}
                      </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                      <div className="text-xl font-black text-text-primary">
                        ₹{service.price}
                      </div>
                      <button
                        onClick={() => openBooking(service)}
                        className="px-6 py-2.5 bg-text-primary text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform w-full md:w-auto flex items-center justify-center gap-2 group/btn"
                      >
                        Book Now
                        <Icons.ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-2">
                    {service.description || "Service delivered by verified experts."}
                  </p>

                  <div className="mt-auto pt-4 border-t border-border-primary flex items-center gap-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-text-secondary">
                      <Icons.Clock className="w-4 h-4" />
                      {service.duration} mins
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-text-secondary">
                      <Icons.Users className="w-4 h-4" />
                      {service.required_employees} employee(s)
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border border-border-primary text-text-primary hover:bg-surface-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icons.ChevronLeft className="w-5 h-5" />
            </button>
            <div className="px-4 py-2 text-sm font-bold text-text-primary">
              Page {currentPage} of {totalPages}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl border border-border-primary text-text-primary hover:bg-surface-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icons.ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Booking Drawer */}
      <BookingDrawer />
    </div>
  );
};

export default Search;

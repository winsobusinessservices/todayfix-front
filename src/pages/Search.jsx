import React, { useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { serviceApi } from "../services/serviceApi";
import SEO from "../components/seo/SEO";
import * as Icons from "lucide-react";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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
        <div className="mb-8 border-b border-border-primary pb-6">
          <h1 className="text-3xl font-black text-text-primary mb-2">
            Search Results
          </h1>
          <p className="text-text-secondary text-lg">
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
                className="bg-surface-primary rounded-2xl p-5 border border-border-primary hover:border-black/30 shadow-sm transition-all duration-300 flex flex-col md:flex-row gap-6"
              >
                <div className="flex-grow flex flex-col justify-center">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-surface-accent text-text-primary text-[10px] font-bold uppercase tracking-wider rounded-md">
                          {service.category?.name}
                        </span>
                        <span className="text-xs text-text-muted">
                          {service.subcategory?.name}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
                        {service.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-text-secondary mt-1 font-medium">
                        <Icons.Store className="w-4 h-4 text-purple-500" />
                        {service.business?.name}
                      </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-2">
                      <div className="text-lg font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
                        ₹{service.price}
                      </div>
                    </div>
                  </div>

                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-semibold text-text-muted pt-4 border-t border-border-secondary">
                    <span className="flex items-center gap-1.5">
                      <Icons.Clock className="w-4 h-4" />
                      {service.duration} mins
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icons.Users className="w-4 h-4" />
                      {service.required_employees} employee(s)
                    </span>
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
    </div>
  );
};

export default Search;

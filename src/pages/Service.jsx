import React, { useState, useMemo } from "react";
import { Link, useParams } from "react-router";
import { vendors } from "../data/collectedData";
import CustomDropdown from "../components/ui/CustomDropdown";
import SEO from "../components/seo/SEO";
import { useQuery } from "@tanstack/react-query";
import { categoryApi } from "../services/categoryApi";
import * as Icons from "lucide-react";

// Helper for dynamic icons
const DynamicIcon = ({ iconName, className }) => {
  if (!iconName) {
    const Default = Icons.Wrench;
    return <Default className={className} />;
  }
  const formattedName =
    iconName.charAt(0).toUpperCase() + iconName.slice(1).toLowerCase();
  const IconComponent =
    Icons[formattedName] || Icons[`${formattedName}s`] || Icons.Wrench;
  return <IconComponent className={className} />;
};

const Service = () => {
  const { slug } = useParams();
  const [sortBy, setSortBy] = useState("Recommended");

  // 1. Fetch Categories to find the one matching `slug`
  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["publicCategories"],
    queryFn: () => categoryApi.getSubcategory(slug),
  });

  console.log(categoriesData);

  const currentCategory = categoriesData?.data || categoriesData || null;

  // 2. Fetch Subcategories for this category
  const { data: subcategoriesData, isLoading: isLoadingSubcategories } =
    useQuery({
      queryKey: ["publicSubcategories", currentCategory?.cat_uuid],
      queryFn: () => categoryApi.getSubcategories(currentCategory.cat_uuid),
      enabled: !!currentCategory?.cat_uuid,
    });

  const subcategories = subcategoriesData?.data || subcategoriesData || [];
  const activeSubcategories = subcategories.filter((sub) => sub.is_active);

  if (isLoadingCategories) {
    return (
      <div className="min-h-screen bg-surface-primary flex items-center justify-center">
        <span className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  if (!currentCategory) {
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
        title={`${currentCategory.name} Services | TodayFix`}
        description={
          currentCategory.description ||
          `Find the best ${currentCategory.name} professionals in your area.`
        }
      />

      {/* Clean Header / Hero */}
      <div className="w-full bg-surface-secondary pt-12 pb-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-3xl shadow-sm border border-border-primary flex items-center justify-center text-purple-500 shrink-0">
              <DynamicIcon
                iconName={currentCategory.icon}
                className="w-12 h-12 md:w-16 md:h-16"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center justify-center md:justify-start gap-2 mb-3">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-extrabold uppercase tracking-wider rounded-full">
                  Professional Services
                </span>
                <span className="flex items-center gap-1 text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                  <Icons.ShieldCheck className="w-4 h-4" /> Verified
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight mb-4">
                {currentCategory.name}
              </h1>
              <p className="text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed">
                {currentCategory.description ||
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
                    options={["Recommended", "Highest Rated", "Most Reviews"]}
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
                <span className="text-purple-800 font-bold text-xs uppercase tracking-wider block mb-1">
                  Standard Pricing from
                </span>
                <div className="text-3xl font-black text-purple-900">₹499</div>
                <p className="text-purple-700/80 text-xs font-medium mt-2">
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

              <Link
                to="/request-service"
                state={{ category: currentCategory.name }}
                className="w-full flex justify-center items-center gap-2 bg-surface-dark hover:bg-zinc-800 text-text-inverted px-6 py-4 rounded-2xl text-base font-bold transition-all shadow-md active:scale-95 mb-4"
              >
                Proceed to Booking <Icons.ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[10px] text-center text-text-muted font-medium uppercase tracking-widest">
                No credit card required
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;

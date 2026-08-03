import React from "react";

const Vendor = () => {
  // Mock data for the vendor profile
  const vendor = {
    name: "Aura Spaces",
    category: "Interior Design & Renovation",
    location: "Indiranagar, Bengaluru",
    banner:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    avatar:
      "https://api.dicebear.com/7.x/shapes/svg?seed=Aura&backgroundColor=0284c7",
    verified: true,
    memberSince: "2021",
    address: "100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31104.23456!2d77.615!3d12.978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16a50614532b%3A0x7d28711e5ab37dcb!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    about:
      "Aura Spaces is an award-winning design firm specializing in modern, minimalist residential spaces. With a focus on functionality and aesthetic appeal, our team of certified architects and interior designers work closely with you to transform your vision into reality. We handle everything from 3D planning to turnkey execution.",
    gallery: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    stats: {
      rating: 4.9,
      reviews: 128,
      tasksCompleted: 450,
      responseTime: "Under 2 hours",
      onTimeRate: "98%",
    },
    services: [
      { id: 1, name: "Full Home Interiors", price: "Starts at ₹3,50,000" },
      { id: 2, name: "Modular Kitchen", price: "Starts at ₹1,20,000" },
      { id: 3, name: "Consultation & 3D Renders", price: "₹5,000 / room" },
    ],
    testimonials: [
      {
        id: 1,
        user: "Priya Sharma",
        avatar:
          "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=fca5a5",
        rating: 5,
        date: "2 weeks ago",
        text: "Absolutely thrilled with the modular kitchen they designed for us. The team was highly professional, stuck to the timeline, and the finish is premium. Highly recommend!",
      },
      {
        id: 2,
        user: "Rahul Sharma",
        avatar:
          "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul&backgroundColor=93c5fd",
        rating: 5,
        date: "1 month ago",
        text: "Aura Spaces transformed our bare 3BHK into a dream home. Their 3D renders were incredibly accurate to the final result. The project manager kept us updated daily.",
      },
      {
        id: 3,
        user: "Anita Desai",
        avatar:
          "https://api.dicebear.com/7.x/avataaars/svg?seed=Anita&backgroundColor=d8b4fe",
        rating: 4,
        date: "3 months ago",
        text: "Great design sense and very accommodating with changes. The only slight issue was a minor delay with the plumbing fixture delivery, but they handled it well.",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-surface-secondary font-sans pb-24 lg:pb-12">
      {/* Banner */}
      <div className="relative w-full h-64 md:h-80 bg-surface-dark">
        <img
          src={vendor.banner}
          alt="Vendor Banner"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between -mt-16 md:-mt-20 mb-8 z-10 relative gap-4">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 w-full text-center md:text-left">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-surface-primary p-2 shadow-xl flex-shrink-0">
              <img
                src={vendor.avatar}
                alt={vendor.name}
                className="w-full h-full object-cover rounded-2xl bg-surface-secondary"
              />
            </div>
            <div className="mb-2">
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary">
                  {vendor.name}
                </h1>
                {vendor.verified && (
                  <svg
                    className="w-6 h-6 text-emerald-500 mt-2.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <p className="text-text-secondary font-medium text-lg">
                {vendor.category}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-1 text-text-secondary text-sm mt-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {vendor.location}
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-shrink-0 gap-3 mb-2">
            <button className="px-6 py-2.5 cursor-pointer bg-surface-primary border border-border-secondary text-text-primary font-semibold rounded-xl hover:bg-surface-secondary shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-colors">
              Share
            </button>
            <button className="px-6 py-2.5 cursor-pointer bg-surface-dark text-white font-semibold rounded-xl hover:bg-zinc-800 shadow-md shadow-[0_4px_20px_rgb(0,0,0,0.08)] transition-colors">
              Contact Vendor
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Main Details) */}
          <div className="lg:col-span-2 space-y-10">
            {/* About Section */}
            <section className="bg-surface-primary rounded-2xl p-6 md:p-8 border border-border-primary shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                About the Vendor
              </h2>
              <p className="text-text-secondary leading-relaxed">
                {vendor.about}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-surface-secondary text-text-secondary text-sm font-medium rounded-lg">
                  Verified Identity
                </span>
                <span className="px-3 py-1 bg-surface-secondary text-text-secondary text-sm font-medium rounded-lg">
                  Background Checked
                </span>
                <span className="px-3 py-1 bg-surface-secondary text-text-secondary text-sm font-medium rounded-lg">
                  Member since {vendor.memberSince}
                </span>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  Portfolio Gallery
                </h2>
                <button className="text-text-primary cursor-pointer font-semibold text-sm hover:underline">
                  View All
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {vendor.gallery.map((imgUrl, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-md overflow-hidden bg-surface-secondary cursor-pointer group shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-border-primary"
                  >
                    <img
                      src={imgUrl}
                      alt={`Gallery work ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Hover overlay for premium feel */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                ))}
              </div>
            </section>

            {/* Performance Stats */}
            <section>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                Performance Overview
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-surface-primary p-4 rounded-2xl border border-border-primary shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-extrabold text-text-primary mb-1">
                    {vendor.stats.tasksCompleted}+
                  </span>
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wide">
                    Tasks Completed
                  </span>
                </div>

                <div className="bg-surface-primary p-4 rounded-2xl border border-border-primary shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col items-center justify-center text-center">
                  <div className="flex items-center gap-1 text-3xl font-extrabold text-amber-500 mb-1">
                    {vendor.stats.rating}
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wide">
                    Rating ({vendor.stats.reviews})
                  </span>
                </div>

                <div className="bg-surface-primary p-4 rounded-2xl border border-border-primary shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold text-text-primary mb-2">
                    {vendor.stats.responseTime}
                  </span>
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wide">
                    Response Time
                  </span>
                </div>

                <div className="bg-surface-primary p-4 rounded-2xl border border-border-primary shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-extrabold text-emerald-600 mb-1">
                    {vendor.stats.onTimeRate}
                  </span>
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wide">
                    On-Time Rate
                  </span>
                </div>
              </div>
            </section>

            {/* --- NEW: Location Map Section --- */}
            <section className="bg-surface-primary rounded-2xl p-6 md:p-8 border border-border-primary shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <h2 className="text-2xl font-bold text-text-primary mb-3">
                Location & Coverage
              </h2>
              <div className="flex items-start md:items-center gap-2 mb-6 text-text-secondary">
                <svg
                  className="w-5 h-5 flex-shrink-0 mt-0.5 md:mt-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="leading-tight">{vendor.address}</span>
              </div>
              {/* Map iFrame Container */}
              <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-surface-secondary border border-border-secondary relative">
                <iframe
                  src={vendor.mapEmbedUrl}
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vendor Location Map"
                ></iframe>
              </div>
            </section>

            {/* Reviews Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-text-primary">
                  Customer Reviews
                </h2>
                <button className="text-text-primary cursor-pointer font-semibold text-sm hover:underline">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {vendor.testimonials.map((review) => (
                  <div
                    key={review.id}
                    className="bg-surface-primary p-6 rounded-2xl border border-border-primary shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={review.avatar}
                          alt={review.user}
                          className="w-10 h-10 rounded-full bg-surface-secondary"
                        />
                        <div>
                          <h4 className="font-bold text-text-primary leading-tight">
                            {review.user}
                          </h4>
                          <span className="text-xs text-text-secondary">
                            {review.date}
                          </span>
                        </div>
                      </div>
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-slate-200 fill-current"}`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      "{review.text}"
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column (Sticky Sidebar) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-surface-primary p-6 rounded-2xl border border-border-primary shadow-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  Request a Service
                </h3>
                <p className="text-text-secondary text-sm mb-6">
                  Connect with {vendor.name} to discuss your requirements and
                  get a free quote.
                </p>

                <button className="w-full cursor-pointer bg-surface-dark text-white font-bold py-3.5 rounded-xl hover:bg-zinc-800 transition-colors shadow-md active:scale-95 mb-3">
                  Request Free Quote
                </button>
                <button className="w-full cursor-pointer bg-surface-primary border border-border-secondary text-text-primary font-bold py-3.5 rounded-xl hover:bg-surface-secondary transition-colors active:scale-95 flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Send Message
                </button>

                <div className="mt-6 flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <svg
                    className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-xs text-emerald-800 font-medium">
                    This vendor is highly responsive. Expect a reply within 2
                    hours.
                  </p>
                </div>
              </div>

              <div className="bg-surface-primary p-6 rounded-2xl border border-border-primary shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                <h3 className="text-lg font-bold text-text-primary mb-4">
                  Services Offered
                </h3>
                <ul className="space-y-4">
                  {vendor.services.map((service) => (
                    <li
                      key={service.id}
                      className="flex flex-col border-b border-border-secondary pb-3 last:border-0 last:pb-0"
                    >
                      <span className="font-semibold text-text-primary">
                        {service.name}
                      </span>
                      <span className="text-sm text-text-secondary mt-0.5">
                        {service.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-surface-primary border-t border-border-primary p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:hidden z-50 flex gap-3">
        <button className="flex-1 cursor-pointer bg-surface-primary border border-border-secondary text-text-primary font-bold py-3 rounded-xl active:bg-surface-secondary">
          Message
        </button>
        <button className="flex-[2] cursor-pointer bg-surface-dark text-white font-bold py-3 rounded-xl active:bg-zinc-800">
          Request Quote
        </button>
      </div>
    </div>
  );
};

export default Vendor;

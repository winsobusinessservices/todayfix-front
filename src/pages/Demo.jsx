import { useParams, Link } from "react-router";
import {
  ArrowRight,
  Star,
  MapPin,
  CheckCircle,
  ExternalLink,
  Calendar,
  MessageSquare,
  Briefcase,
  Globe,
  Phone,
} from "lucide-react";
import SEO from "../components/seo/SEO";
import { featuredData } from "../data/collectedData";

const Demo = () => {
  const { name } = useParams();

  // Handle URL decoded names if needed, or exact matches
  const decodedName = decodeURIComponent(name.split("-").join(" "));
  const partnerData = featuredData.find(
    (partner) =>
      partner.name.toLowerCase() === decodedName.toLowerCase() ||
      partner.name === name,
  );

  const otherWebsites = [
    {
      id: 1,
      name: "Urbania Bangalore",
      description:
        "Premium Group Travel in Bangalore. Every journey, made comfortable.",
      url: "https://urbaniabangalore.com/",
      domain: "urbaniabangalore.com",
    },
    {
      id: 2,
      name: "KTT Travels",
      description:
        "Premium Corporate Travel Solutions. Reliable airport transfers and corporate transportation.",
      url: "https://ktttravels.com/",
      domain: "ktttravels.com",
    },
    {
      id: 3,
      name: "Savari Urbania",
      description:
        "Bangalore's Most Trusted Luxury Van Service for corporate travel, weddings, and tours.",
      url: "https://savariurbania.com/",
      domain: "savariurbania.com",
    },
  ];

  if (!partnerData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-primary">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Partner Not Found
          </h2>
          <Link to="/" className="text-surface-dark underline font-bold">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const steps = [
    {
      icon: <Briefcase className="w-6 h-6 text-text-primary" />,
      title: "1. Select Service",
      description:
        "Browse through their catalog and pick the exact service you need for your project.",
    },
    {
      icon: <Calendar className="w-6 h-6 text-text-primary" />,
      title: "2. Schedule & Quote",
      description:
        "Pick a convenient date and get a transparent, upfront quote from the provider.",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-text-primary" />,
      title: "3. Get it Done",
      description:
        "The professionals arrive on time and complete the job to your satisfaction.",
    },
  ];

  return (
    <div className="min-h-screen bg-surface-primary font-sans selection:bg-surface-dark selection:text-text-inverted overflow-x-hidden">
      <SEO
        title={`${partnerData.name} | TodayFix`}
        description={`Book services with ${partnerData.name} - ${partnerData.description}`}
      />

      {/* Hero Section */}
      <div className="relative w-full h-[65vh] min-h-[500px] flex items-end pb-12 overflow-hidden border-b border-border-primary">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src={partnerData.bg}
            alt={partnerData.name}
            className="w-full h-full object-cover scale-105 animate-slow-pan"
          />
          {/* Subtle gradient overlay to ensure readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-8 items-end justify-between">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 w-full md:w-auto text-center md:text-left">
            {/* Logo Wrapper */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-surface-primary border border-border-primary p-2 shadow-xl shrink-0 group hover:scale-105 transition-transform duration-500 overflow-hidden relative">
              <img
                src={partnerData.logo}
                alt={`${partnerData.name} Logo`}
                className="w-full h-full object-cover rounded-2xl relative z-0"
              />
            </div>

            {/* Partner Info */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 justify-center md:justify-start flex-wrap">
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-text-primary bg-surface-primary rounded-full border border-border-primary shadow-sm">
                  {partnerData.category}
                </span>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-text-primary bg-surface-primary/90 backdrop-blur px-3 py-1 rounded-full border border-border-primary shadow-sm">
                  <CheckCircle className="w-4 h-4" /> Verified Partner
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-lg">
                {partnerData.name}
              </h1>
              <div className="flex items-center gap-4 text-text-primary justify-center md:justify-start">
                <div className="flex items-center gap-1.5 bg-surface-primary/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border-primary shadow-sm">
                  <Star className="w-5 h-5 text-text-primary fill-text-primary" />
                  <span className="font-bold">{partnerData.rating}</span>
                  <span className="text-sm font-medium">
                    ({partnerData.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-surface-primary/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border-primary shadow-sm">
                  <MapPin className="w-5 h-5 text-text-primary" />
                  <span className="text-sm font-medium">
                    {partnerData.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Button */}
          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <a
              href={partnerData.url}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-surface-primary text-text-primary border border-border-primary font-black rounded-full overflow-hidden hover:scale-105 hover:bg-surface-secondary transition-all shadow-lg w-full md:w-auto"
            >
              <span className="relative z-10 flex items-center gap-2">
                Visit Website{" "}
                <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-20">
        {/* Left Column: About & Services */}
        <div className="lg:col-span-2 space-y-12">
          {/* About Section */}
          <div className="bg-surface-secondary border border-border-primary rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-500 group">
            <h2 className="text-2xl font-black text-text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-surface-primary border border-border-primary flex items-center justify-center shadow-sm">
                <Briefcase className="w-4 h-4 text-text-primary" />
              </span>
              About {partnerData.name}
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed font-medium">
              {partnerData.description} We pride ourselves on delivering
              top-tier {partnerData.service.toLowerCase()} solutions tailored to
              your specific needs. Our team of certified professionals ensures
              that every project is executed with precision, quality, and strict
              adherence to timelines.
            </p>
          </div>

          {/* Booking Steps */}
          <div>
            <h2 className="text-3xl font-black text-text-primary mb-8 tracking-tight">
              How to Book
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-surface-primary border border-border-primary rounded-3xl p-8 hover:-translate-y-2 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                    {step.icon}
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-surface-secondary border border-border-primary flex items-center justify-center mb-6 shadow-sm">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Sidebar with CTA */}
        <div className="space-y-6">
          <div className="sticky top-24">
            {/* Booking Card */}
            <div className="bg-surface-primary rounded-[2rem] p-8 shadow-xl border border-border-primary text-text-primary relative overflow-hidden group">
              <h3 className="text-2xl font-black mb-2 relative z-10">
                Ready to start?
              </h3>
              <p className="text-text-secondary font-medium mb-8 relative z-10">
                Book a consultation with {partnerData.name} today and bring your
                vision to life.
              </p>

              <div className="space-y-4 relative z-10">
                <a
                  href="tel:+919939958616"
                  className="w-full flex items-center justify-between px-6 py-4 bg-surface-dark hover:bg-zinc-800 text-text-inverted font-black rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md"
                >
                  <span>Call Now</span>
                  <Phone className="w-5 h-5" />
                </a>

                <a
                  href={`https://wa.me/919939958616?text=Hello+KTT+Travels%2C+I+would+like+to+get+a+quotation.&type=phone_number&app_absent=0`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-surface-secondary hover:bg-border-secondary border border-border-primary text-text-primary font-bold rounded-xl transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-border-primary text-sm text-text-secondary flex items-start gap-3 relative z-10">
                <CheckCircle className="w-5 h-5 text-text-primary shrink-0" />
                <p>
                  100% satisfaction guarantee. Secure payments and trusted
                  service delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Other Websites Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 relative z-20 border-t border-border-primary">
        <h2 className="text-3xl font-black text-text-primary mb-8 tracking-tight text-center md:text-left">
          Explore Our Network
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherWebsites.map((site) => (
            <a
              key={site.id}
              href={site.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col bg-surface-secondary border border-border-primary rounded-3xl p-6 hover:-translate-y-2 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <Globe className="w-24 h-24 text-text-primary" />
              </div>
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-surface-primary border border-border-primary flex items-center justify-center text-text-primary shadow-sm group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary group-hover:text-text-secondary transition-colors">
                    {site.name}
                  </h3>
                  <p className="text-xs font-semibold text-text-muted">
                    {site.domain}
                  </p>
                </div>
              </div>
              <p className="text-sm text-text-secondary font-medium leading-relaxed relative z-10 flex-grow">
                {site.description}
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-bold text-surface-dark relative z-10">
                Visit Site{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Global CSS for animations if not present in tailwind */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes slow-pan {
          0% { transform: scale(1.05) translate(0, 0); }
          50% { transform: scale(1.1) translate(-1%, -1%); }
          100% { transform: scale(1.05) translate(0, 0); }
        }
        .animate-slow-pan {
          animation: slow-pan 20s ease-in-out infinite;
        }
      `,
        }}
      />
    </div>
  );
};

export default Demo;

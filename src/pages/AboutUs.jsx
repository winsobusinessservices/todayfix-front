import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const AboutUs = () => {
  // Mock Data
  const stats = [
    { label: "Cities Covered", value: "15+" },
    { label: "Verified Professionals", value: "10,000+" },
    { label: "Happy Customers", value: "2M+" },
    { label: "Years of Trust", value: "5" },
  ];

  const values = [
    {
      title: "Quality First",
      desc: "Every professional undergoes a rigorous 5-step background check and skills verification before joining our platform.",
      icon: (
        <svg
          className="w-6 h-6 text-text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Absolute Transparency",
      desc: "No hidden fees. Upfront pricing, genuine customer reviews, and clear service scopes right from the start.",
      icon: (
        <svg
          className="w-6 h-6 text-text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
    },
    {
      title: "Speed & Reliability",
      desc: "Book a service instantly and get an expert at your doorstep in as little as 60 minutes. We respect your time.",
      icon: (
        <svg
          className="w-6 h-6 text-text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-surface-secondary font-sans selection:bg-surface-dark selection:text-white pb-20 relative z-0">
      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-24 px-6 overflow-hidden flex items-center justify-center bg-surface-primary border-b border-border-primary">
        <div
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, black 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        ></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-surface-secondary border border-border-primary text-xs font-bold uppercase tracking-widest text-text-secondary mb-6 shadow-sm">
              Our Mission
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-text-primary tracking-tighter leading-tight mb-6">
              Fixing the way the world <br className="hidden md:block" /> finds{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-900">
                local expertise.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary font-medium max-w-2xl mx-auto leading-relaxed">
              We started Todayfix with a simple idea: finding a reliable
              professional shouldn't be harder than the actual job. We're
              bridging the gap between exceptional local talent and the homes
              that need them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-12 z-20 max-w-6xl mx-auto px-6">
        <div className="bg-surface-dark rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-black/10 flex flex-col md:flex-row items-center justify-between gap-8 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="w-full md:w-1/4 text-center flex flex-col items-center pt-6 md:pt-0"
            >
              <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
                {stat.value}
              </h3>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Story Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden bg-zinc-200 shadow-xl shadow-black/5"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Team working"
                className="w-full h-full object-cover grayscale opacity-90 mix-blend-multiply"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <p className="font-bold tracking-widest uppercase text-xs mb-1 opacity-80 text-zinc-300">
                  Founded 2021
                </p>
                <p className="text-2xl font-black tracking-tight">
                  Built for the future.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-text-primary tracking-tight mb-6 leading-tight">
                Redefining the standard of home services.
              </h2>
              <div className="space-y-6 text-text-secondary text-lg leading-relaxed font-medium">
                <p>
                  Before Todayfix, the home services industry was fragmented,
                  opaque, and highly unpredictable. Customers spent hours
                  vetting strangers, and highly skilled professionals struggled
                  to find consistent work without paying exorbitant lead fees.
                </p>
                <p>
                  We built a platform that removes the friction. By leveraging
                  smart matching algorithms and strict quality control, we
                  ensure that every interaction on our platform is seamless,
                  transparent, and mutually beneficial.
                </p>
                <p>
                  Today, we are proud to be the infrastructure that powers
                  thousands of local micro-economies, helping professionals grow
                  their businesses while providing homeowners with absolute
                  peace of mind.
                </p>
              </div>

              <div className="mt-10">
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center px-8 py-4 bg-surface-dark text-white rounded-full font-bold transition-transform active:scale-95 shadow-lg shadow-black/10 group"
                >
                  Explore Services
                  <svg
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-surface-primary border-y border-border-primary py-24 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight mb-4">
              Our Core Values
            </h2>
            <p className="text-text-secondary text-lg font-medium">
              The principles that guide every decision we make and every line of
              code we write.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-surface-secondary p-8 rounded-[2rem] border border-border-primary hover:border-black transition-colors shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] group"
              >
                <div className="w-14 h-14 bg-surface-primary border border-border-secondary rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3 tracking-tight">
                  {val.title}
                </h3>
                <p className="text-text-secondary leading-relaxed font-medium">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

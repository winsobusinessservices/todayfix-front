import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import SEO from "../components/seo/SEO";

const Careers = () => {
  const jobs = [
    {
      title: "Senior Full Stack Engineer",
      department: "Engineering",
      location: "Bengaluru, India (Hybrid)",
      type: "Full-time",
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "City Operations Manager",
      department: "Operations",
      location: "Mumbai, India",
      type: "Full-time",
    },
    {
      title: "Customer Success Associate",
      department: "Support",
      location: "Bengaluru, India",
      type: "Full-time",
    },
  ];

  return (
    <main className="min-h-screen bg-surface-secondary font-sans selection:bg-surface-dark selection:text-white pb-20">
      <SEO 
        title="Careers | TodayFix"
        description="Join TodayFix and help us redefine the home services industry. Explore open positions in engineering, design, operations, and more."
      />
      
      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-24 px-6 overflow-hidden bg-surface-primary border-b border-border-primary">
        <div
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, black 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        ></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-surface-secondary border border-border-primary text-xs font-bold uppercase tracking-widest text-text-secondary mb-6">
              Join Our Team
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-text-primary tracking-tighter leading-tight mb-6">
              Build the future of <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-900">
                local services.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary font-medium max-w-2xl mx-auto leading-relaxed">
              We are a team of builders, designers, and operators passionate about creating economic opportunities for professionals and peace of mind for customers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Impact at Scale",
              desc: "Your work will directly improve the livelihoods of thousands of small businesses and professionals.",
            },
            {
              title: "Remote & Flexible",
              desc: "We care about what you deliver, not when or where you work. Enjoy a flexible, remote-friendly culture.",
            },
            {
              title: "Continuous Growth",
              desc: "Access to premium learning resources, mentorship programs, and a culture that celebrates curiosity.",
            },
          ].map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-surface-primary p-8 rounded-[2rem] border border-border-primary shadow-sm hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold text-text-primary mb-3">{benefit.title}</h3>
              <p className="text-text-secondary leading-relaxed font-medium">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Open Positions */}
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-text-primary tracking-tight mb-8">
            Open Positions
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {jobs.map((job, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-surface-primary p-6 md:p-8 rounded-[2rem] border border-border-primary flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-black transition-colors shadow-sm hover:shadow-md group"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-text-secondary bg-surface-secondary px-3 py-1 rounded-full">
                      {job.department}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                      {job.type}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary group-hover:text-text-muted transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-2 text-text-secondary mt-2 text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                  </div>
                </div>
                <Link
                  to="#"
                  className="px-6 py-3 bg-surface-dark text-text-inverted rounded-xl font-bold hover:bg-zinc-800 transition-colors shadow-sm flex items-center justify-center gap-2 shrink-0"
                >
                  Apply Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Careers;

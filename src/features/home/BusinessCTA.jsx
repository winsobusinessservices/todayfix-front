import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const BusinessCTA = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#211833] px-6 py-20 font-sans text-white md:px-12 lg:px-24">
      {/* Background Subtle Gradient Glow */}
      <div className="pointer-events-none absolute -right-40 -top-52 h-[34rem] w-[34rem] rounded-full bg-[#7c3aed]/20 blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-56 -left-36 h-[30rem] w-[30rem] rounded-full bg-[#a78bfa]/10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-20 items-center relative z-10">
        {/* Left Column: Text & CTA */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-6 inline-block rounded-full border border-[#c4b5fd]/25 bg-[#c4b5fd]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[#ddd6fe] backdrop-blur-sm">
              For Business Owners & Suppliers
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[56px]"
          >
            Grow Your Business & <br className="hidden lg:block" />
            <span className="text-[#c4b5fd]">Receive Local Leads Daily.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl"
          >
            Join 2.4L+ verified suppliers across 50+ Indian cities. Showcase
            your services, receive direct customer calls, and increase your
            revenue.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link
              to="/list-business"
              className="flex items-center justify-center rounded-full bg-[#8b5cf6] px-8 py-4 text-base font-bold tracking-wide text-white shadow-[0_16px_35px_rgba(124,58,237,0.3)] transition-all duration-300 hover:scale-105 hover:bg-[#a78bfa]"
            >
              List Your Business Now
            </Link>
            <Link
              to="/list-business"
              className="rounded-full border border-white/20 bg-white/[0.06] px-8 py-4 text-base font-bold tracking-wide text-white transition-all duration-300 hover:border-white/35 hover:bg-white/10"
            >
              Grow Business
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Features List */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8 lg:pl-10">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group flex gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.045] p-5 transition-colors hover:bg-white/[0.075]"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-[#c4b5fd]/20 bg-[#c4b5fd]/10 text-[#c4b5fd] transition-colors duration-300 group-hover:bg-[#8b5cf6] group-hover:text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h4 className="mb-2 text-xl font-bold tracking-tight text-white">
                High-Converting Local Leads
              </h4>
              <p className="text-sm leading-relaxed text-white/65">
                Get instant customer enquiries directly on your mobile via SMS
                and WhatsApp.
              </p>
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group flex gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.045] p-5 transition-colors hover:bg-white/[0.075]"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-[#c4b5fd]/20 bg-[#c4b5fd]/10 text-[#c4b5fd] transition-colors duration-300 group-hover:bg-[#8b5cf6] group-hover:text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h4 className="mb-2 text-xl font-bold tracking-tight text-white">
                Verified Business Trust Seal
              </h4>
              <p className="text-sm leading-relaxed text-white/65">
                Build customer trust with our official GST & Address
                Verification badge.
              </p>
            </div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="group flex gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.045] p-5 transition-colors hover:bg-white/[0.075]"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-[#c4b5fd]/20 bg-[#c4b5fd]/10 text-[#c4b5fd] transition-colors duration-300 group-hover:bg-[#8b5cf6] group-hover:text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div>
              <h4 className="mb-2 text-xl font-bold tracking-tight text-white">
                Top Google & Search Visibility
              </h4>
              <p className="text-sm leading-relaxed text-white/65">
                Rank high in city-specific searches and attract high-intent
                buyers.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BusinessCTA;


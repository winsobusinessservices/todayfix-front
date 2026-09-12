import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqCategories, faqData } from "../../data/collectedData";
import { Link } from "react-router";

const FAQSection = () => {
  // State for active category and active FAQ accordion
  const [activeCategory, setActiveCategory] = useState(faqCategories[0]);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Get FAQs dynamically based on the selected category
  const activeFaqs = faqData[activeCategory] || [];

  return (
    <div className="bg-surface-secondary text-text-primary font-sans relative overflow-hidden py-24 border-t border-border-secondary">
      {/* --- Main Content --- */}
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center px-4 py-1.5 bg-surface-dark text-text-inverted text-xs font-bold rounded-full mb-6 tracking-widest uppercase shadow-sm"
          >
            Support & Resources
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight text-text-primary mb-6 leading-[1.15]"
          >
            Frequently Asked <span className="text-text-muted">Questions.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg max-w-xl"
          >
            Find answers to common questions about Sirona and how our trusted
            platform works.
          </motion.p>
        </div>

        {/* Grid Layout (Sidebar + FAQs) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left Sidebar: Categories */}
          <div className="lg:col-span-4 flex flex-col">
            <h3 className="text-text-muted text-xs font-bold uppercase tracking-widest mb-6 px-4">
              Categories
            </h3>
            <ul className="flex flex-col space-y-2">
              {faqCategories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => {
                      setActiveCategory(category);
                      setOpenFaqIndex(0); // Reset accordion when switching category
                    }}
                    className={`w-full text-left px-5 py-3 text-[15px] transition-all duration-300 rounded-xl font-semibold ${
                      activeCategory === category
                        ? "btn-primary shadow-md"
                        : "bg-transparent text-text-secondary hover:bg-zinc-200/50 hover:text-text-primary"
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Main Area: FAQ Accordion & CTA */}
          <div className="lg:col-span-8 flex flex-col w-full max-w-3xl mx-auto lg:mx-0">
            {/* Accordion List */}
            <div className="flex flex-col space-y-4 mb-12">
              <AnimatePresence mode="popLayout">
                {activeFaqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;

                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      key={`${activeCategory}-${index}`} // Force re-render on category change
                      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                        isOpen
                          ? "border-brand-primary bg-surface-primary shadow-xl shadow-black/5"
                          : "border-border-primary bg-surface-primary hover:border-border-tertiary hover:shadow-md"
                      }`}
                    >
                      {/* Question Header */}
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full flex justify-between items-center p-6 text-left focus:outline-none group"
                      >
                        <span
                          className={`text-lg font-bold pr-8 transition-colors duration-300 ${
                            isOpen
                              ? "text-text-primary"
                              : "text-text-secondary group-hover:text-text-primary"
                          }`}
                        >
                          {faq.question}
                        </span>
                        {/* Plus/Minus Icon */}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 flex-shrink-0 ${
                            isOpen
                              ? "bg-brand-primary border-brand-primary text-white rotate-180"
                              : "bg-surface-primary border-border-primary text-text-muted group-hover:border-zinc-400 group-hover:text-zinc-600"
                          }`}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            {isOpen ? (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20 12H4"
                              />
                            ) : (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v16m8-8H4"
                              />
                            )}
                          </svg>
                        </div>
                      </button>

                      {/* Answer Body */}
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="px-6 pb-6 text-base leading-relaxed text-text-secondary font-medium">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Bottom CTA Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl border border-brand-soft bg-gradient-to-br from-white to-[#f0eaff] p-8 shadow-[0_16px_45px_rgba(76,29,149,0.10)] sm:flex-row sm:items-center dark:border-white/10 dark:from-[#221b2e] dark:to-[#2a2140]"
            >
              {/* Subtle Background Glow */}
              <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/4 rounded-full bg-brand-primary/15 blur-3xl"></div>

              {/* Info Text */}
              <div className="flex gap-5 items-start relative z-10">
                <div className="mt-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-brand-soft bg-surface-accent text-brand-primary shadow-sm dark:bg-brand-background dark:text-brand-accent">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="mb-2 text-xl font-bold text-text-primary">
                    Still have a question?
                  </h4>
                  <p className="max-w-sm text-sm leading-relaxed text-text-secondary">
                    If you didn't find your answer, feel free to reach out to
                    our dedicated support team.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="self-end sm:self-auto relative z-10">
                <Link
                  to="/contact"
                  className="btn-primary whitespace-nowrap rounded-full px-6 py-3 font-bold shadow-lg shadow-brand-primary/20 transition-all duration-300 hover:scale-105"
                >
                  Contact Support
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;

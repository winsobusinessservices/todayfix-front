import React, { useState } from "react";
import SEO from "../components/seo/SEO";
import { Link } from "react-router";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I book a service?",
      answer: "You can book a service by searching for what you need on the homepage, browsing our categories, or selecting a specific professional. Follow the checkout process to secure your booking."
    },
    {
      question: "How are the professionals verified?",
      answer: "Every professional on TodayFix undergoes a strict 5-step background check, including identity verification, criminal background checks, and skills assessments."
    },
    {
      question: "What if I am not satisfied with the service?",
      answer: "If you are not satisfied with the quality of the work, you can report an issue within 48 hours of completion. Our support team will review the case under our Refund Policy guarantee."
    },
    {
      question: "When is my card charged?",
      answer: "A hold is placed on your card when you book. The actual charge is processed only after the professional has completed the service."
    },
    {
      question: "Can I reschedule a booking?",
      answer: "Yes, you can reschedule for free up to 24 hours before the service time from your Dashboard."
    }
  ];

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <main className="min-h-screen bg-surface-secondary font-sans pb-24">
      <SEO 
        title="Frequently Asked Questions | TodayFix"
        description="Find answers to common questions about booking services, payments, and our verified professionals."
      />
      
      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-surface-primary border-b border-border-primary text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-text-primary tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-text-secondary font-medium">
            Everything you need to know about using TodayFix.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-surface-primary border border-border-primary rounded-2xl overflow-hidden shadow-sm transition-all"
            >
              <button 
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFaq(idx)}
              >
                <span className="font-bold text-text-primary pr-4">{faq.question}</span>
                <svg 
                  className={`w-5 h-5 text-text-muted transform transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-text-secondary font-medium leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-12 text-center">
          <p className="text-text-secondary font-medium mb-4">Still have questions?</p>
          <Link to="/contact" className="inline-block px-6 py-3 bg-surface-dark text-text-inverted rounded-xl font-bold shadow-md hover:scale-[0.98] transition-transform">
            Contact Support
          </Link>
        </div>
      </section>
    </main>
  );
};

export default FAQPage;

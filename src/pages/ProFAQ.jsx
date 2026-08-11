import React, { useState } from "react";
import SEO from "../components/seo/SEO";
import { Link } from "react-router";

const ProFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I get paid?",
      answer: "Payments are processed securely through our platform and deposited directly into your linked bank account every week. No invoicing required."
    },
    {
      question: "Are there any upfront fees to join?",
      answer: "No, joining TodayFix is completely free. We only charge a small platform commission on the jobs you successfully complete through us."
    },
    {
      question: "How does the matching process work?",
      answer: "When a customer requests a service in your area that matches your skills, you will receive a notification. You can review the job details and decide if you want to accept it based on your availability."
    },
    {
      question: "What documents do I need to register?",
      answer: "You will need a government-issued ID, proof of address, and any relevant trade licenses or certifications required for your specific profession."
    },
    {
      question: "How do ratings affect my profile?",
      answer: "Higher ratings from customers improve your visibility on the platform, leading to more job requests. Top-rated pros also qualify for lower commission tiers."
    }
  ];

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <main className="min-h-screen bg-surface-secondary font-sans pb-24">
      <SEO 
        title="Professional FAQs | TodayFix"
        description="Got questions about partnering with TodayFix? Find answers about payments, scheduling, and growing your business."
      />
      
      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-surface-primary border-b border-border-primary text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-surface-secondary border border-border-primary text-xs font-bold uppercase tracking-widest text-text-secondary mb-6 shadow-sm">
            For Professionals
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-text-primary tracking-tight mb-4">
            Professional FAQ
          </h1>
          <p className="text-lg text-text-secondary font-medium">
            Everything you need to know about working with us.
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
          <Link to="/become-a-professional" className="inline-block px-8 py-4 bg-surface-dark text-text-inverted rounded-xl font-bold shadow-md hover:scale-[0.98] transition-transform">
            Start Earning Today
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ProFAQ;

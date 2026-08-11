import React from "react";
import SEO from "../components/seo/SEO";
import { Link } from "react-router";

const Terms = () => {
  return (
    <main className="min-h-screen bg-surface-secondary font-sans pb-24">
      <SEO 
        title="Terms of Service | TodayFix"
        description="Read the TodayFix Terms of Service. Understand your rights and responsibilities when using our premium home services platform."
      />
      
      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-surface-primary border-b border-border-primary">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-text-secondary font-medium">
            Last Updated: August 11, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto bg-surface-primary rounded-[2rem] border border-border-primary p-8 md:p-12 shadow-sm">
          <div className="space-y-8 text-text-secondary leading-relaxed font-medium">
            
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to TodayFix. By accessing or using our website, mobile application, or any of our services (collectively, the "Platform"), you agree to be bound by these Terms of Service. Please read them carefully before using our Platform.
              </p>
              <p>
                If you do not agree with any part of these terms, you must not use our Platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">2. The TodayFix Service</h2>
              <p className="mb-4">
                TodayFix operates as a technology platform connecting independent service professionals ("Professionals") with individuals or businesses seeking those services ("Customers"). 
              </p>
              <p>
                TodayFix does not provide the services directly, nor do we employ the Professionals. While we conduct background checks and verify credentials, the contract for the service is directly between the Customer and the Professional.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">3. User Accounts</h2>
              <p className="mb-4">
                To access most features of the Platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You are responsible for safeguarding your password.</li>
                <li>You must immediately notify us of any unauthorized use of your account.</li>
                <li>You may not transfer your account to another party without our consent.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">4. Payments and Billing</h2>
              <p className="mb-4">
                Customers agree to pay the prices established by the Professionals or the standard rates displayed on the Platform. All payments must be made through our secure third-party payment processors. Cash transactions outside the platform are strictly prohibited and violate these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">5. Professional Obligations</h2>
              <p className="mb-4">
                If you are registered as a Professional, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Perform services safely, lawfully, and competently.</li>
                <li>Maintain all necessary licenses and insurance required in your jurisdiction.</li>
                <li>Communicate professionally and respectfully with Customers.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">6. Limitation of Liability</h2>
              <p className="mb-4">
                To the maximum extent permitted by applicable law, TodayFix shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Platform.
              </p>
            </div>

            <hr className="border-border-secondary my-8" />

            <div className="text-sm">
              <p>
                If you have any questions about these Terms, please <Link to="/contact" className="text-text-primary font-bold hover:underline">contact us</Link>.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Terms;

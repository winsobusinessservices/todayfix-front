import { Link } from "react-router";
import React from "react";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import Logo from "../brand/Logo";
import { footerData as footerLinkColumns } from "../../data/footerData";

const Footer = () => {
  return (
    <footer className="w-full bg-surface-secondary pt-16 pb-10 px-6 md:px-12 lg:px-24 font-sans border-t border-border-primary">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 mb-16">
        {/* Left Section: Brand & Newsletter */}
        <div className="flex-shrink-0 w-full lg:w-1/3 flex flex-col gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-extrabold text-text-primary tracking-tight">
              <Logo />
            </span>
          </div>

          <p className="text-text-secondary text-sm max-w-xs leading-relaxed">
            Subscribe for home maintenance tips, seasonal guides, and exclusive
            local offers.
          </p>

          {/* Email Input Group */}
          <form
            className="relative flex max-w-sm mt-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="w-full bg-surface-primary border border-border-primary text-text-primary text-sm rounded-full py-3 pl-5 pr-32 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all shadow-sm"
              required
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 bg-surface-dark text-text-inverted px-6 rounded-full text-sm font-bold tracking-wide hover:bg-zinc-800 transition-colors"
            >
              Subscribe
            </button>
          </form>

          {/* Disclaimer */}
          <p className="text-[11px] text-text-muted leading-relaxed max-w-[320px] mt-1">
            By subscribing you agree to our Privacy Policy and consent to
            receive updates from Sirona.
          </p>
        </div>

        {/* Right Section: Links Grid */}
        <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 lg:gap-6 pt-2">
          {footerLinkColumns.map((column, index) => (
            <div key={index} className="flex flex-col gap-5">
              <h4 className="font-bold text-text-primary text-sm tracking-widest uppercase">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {column.links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.path}
                      className="text-text-secondary hover:text-text-primary transition-colors text-[15px] font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Extra Info & Social Media column */}
          <div className="flex flex-col gap-5">
            <h4 className="font-bold text-text-primary text-sm tracking-widest uppercase">
              Connect
            </h4>
            <p className="text-[15px] font-medium text-text-secondary leading-relaxed">
              India's most trusted home services marketplace.
            </p>
            {/* Social Media links */}
            <div className="flex items-center gap-4 mt-1">
              <Link
                to="#"
                className="text-text-muted hover:text-text-primary hover:scale-110 transition-all duration-300"
              >
                <IconBrandFacebook size={24} stroke={2} />
              </Link>
              <Link
                to="#"
                className="text-text-muted hover:text-text-primary hover:scale-110 transition-all duration-300"
              >
                <IconBrandTwitter size={24} stroke={2} />
              </Link>
              <Link
                to="#"
                className="text-text-muted hover:text-text-primary hover:scale-110 transition-all duration-300"
              >
                <IconBrandInstagram size={24} stroke={2} />
              </Link>
              <Link
                to="#"
                className="text-text-muted hover:text-text-primary hover:scale-110 transition-all duration-300"
              >
                <IconBrandLinkedin size={24} stroke={2} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center border-t border-border-primary pt-8 mt-8 gap-4">
        <p className="text-sm text-text-secondary font-medium">
          © 2026 Todayfix. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-text-muted font-medium">
          <Link
            to="#terms"
            className="hover:text-text-primary transition-colors"
          >
            Terms
          </Link>
          <Link
            to="#privacy"
            className="hover:text-text-primary transition-colors"
          >
            Privacy
          </Link>
          <Link
            to="#cookies"
            className="hover:text-text-primary transition-colors"
          >
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

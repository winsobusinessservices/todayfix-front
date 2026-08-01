import React from "react";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import Logo from "./logo/Logo";
import { footerData as footerLinkColumns } from "../data/footerData";

const Footer = () => {
  return (
    <footer className="w-full bg-surface-secondary pt-16 pb-10 px-6 md:px-12 lg:px-24 font-sans border-t border-zinc-200">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 mb-16">
        {/* Left Section: Brand & Newsletter */}
        <div className="flex-shrink-0 w-full lg:w-1/3 flex flex-col gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-extrabold text-black tracking-tight">
              <Logo />
            </span>
          </div>

          <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
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
              className="w-full bg-white border border-zinc-200 text-black text-sm rounded-full py-3 pl-5 pr-32 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all shadow-sm"
              required
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 bg-black text-white px-6 rounded-full text-sm font-bold tracking-wide hover:bg-zinc-800 transition-colors"
            >
              Subscribe
            </button>
          </form>

          {/* Disclaimer */}
          <p className="text-[11px] text-zinc-400 leading-relaxed max-w-[320px] mt-1">
            By subscribing you agree to our Privacy Policy and consent to
            receive updates from Sirona.
          </p>
        </div>

        {/* Right Section: Links Grid */}
        <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 lg:gap-6 pt-2">
          {footerLinkColumns.map((column) => (
            <div key={column.title} className="flex flex-col gap-5">
              <h4 className="font-bold text-black text-sm tracking-widest uppercase">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                      className="text-zinc-500 hover:text-black transition-colors text-[15px] font-medium"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Extra Info & Social Media column */}
          <div className="flex flex-col gap-5">
            <h4 className="font-bold text-black text-sm tracking-widest uppercase">
              Connect
            </h4>
            <p className="text-[15px] font-medium text-zinc-500 leading-relaxed">
              India's most trusted home services marketplace.
            </p>
            {/* Social Media links */}
            <div className="flex items-center gap-4 mt-1">
              <a
                href="#"
                className="text-zinc-400 hover:text-black hover:scale-110 transition-all duration-300"
              >
                <IconBrandFacebook size={24} stroke={2} />
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-black hover:scale-110 transition-all duration-300"
              >
                <IconBrandTwitter size={24} stroke={2} />
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-black hover:scale-110 transition-all duration-300"
              >
                <IconBrandInstagram size={24} stroke={2} />
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-black hover:scale-110 transition-all duration-300"
              >
                <IconBrandLinkedin size={24} stroke={2} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center border-t border-zinc-200 pt-8 mt-8 gap-4">
        <p className="text-sm text-zinc-500 font-medium">
          © 2026 Todayfix. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-zinc-400 font-medium">
          <a href="#terms" className="hover:text-black transition-colors">
            Terms
          </a>
          <a href="#privacy" className="hover:text-black transition-colors">
            Privacy
          </a>
          <a href="#cookies" className="hover:text-black transition-colors">
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";

import { Briefcase, Grid, Home, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Safe fallback if usePathname isn't ready
  const pathname = usePathname() || "/";

  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: <Home className="w-5 h-5 mr-1.5" />, // replace svg with Lucide icon
    },
    {
      name: "About",
      path: "/about",
      icon: <Info className="w-5 h-5 mr-1.5" />,
    },
    {
      name: "Services",
      path: "/services",
      icon: <Briefcase className="w-5 h-5 mr-1.5" />,
    },
    {
      name: "Portfolio",
      path: "/portfolio",
      icon: <Grid className="w-5 h-5 mr-1.5" />,
    },
  ];

  return (
    <header className="relative w-full z-50 bg-transparent py-4 border-b border-border text-primary">
      <div className="flex justify-between items-center px-10 md:px-16 mx-auto w-full max-w-[1280px]">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center space-x-2 z-50 relative group"
        >
          <Image
            src="/logo.png"
            alt="NibleTech Logo"
            width={65}
            height={65}
            priority
            className="w-[65px] h-[65px] object-contain transition-transform group-hover:scale-105"
          />
          <span className="flex items-center justify-center font-bold text-xl tracking-wide">
            <span>Nible</span>
            <span className="text-primary-light ml-1">Tech</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-4">
          <ul className="flex items-center space-x-8 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className={`group relative flex items-center py-2 transition-colors duration-300 font-semibold hover:text-primary-dark ${isActive ? "text-primary-dark" : "text-primary"}`}
                  >
                    {link.icon}
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[2px] bg-primary origin-left transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Login Button */}
            <Link
              href="/login"
              className="border border-primary text-primary hover:bg-primary hover:text-white hover:-translate-y-0.5 transition-all duration-300 py-2.5 px-6 rounded-lg font-semibold active:scale-95"
            >
              Login
            </Link>

            {/* Contact Button */}
            <Link
              href="/contact"
              className="bg-primary hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-300 py-2.5 px-6 rounded-lg font-semibold shadow-md active:scale-95 text-white"
            >
              Contact Us
            </Link>
          </div>
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="lg:hidden z-50 p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={
            isMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"
          }
          aria-expanded={isMenuOpen}
        >
          <div className="w-6 flex flex-col items-end gap-1.5 relative">
            <span
              className={`block h-[2px] w-full bg-primary rounded-lg transition-transform duration-300 ease-in-out origin-right ${isMenuOpen ? "-rotate-45 -translate-y-[1px]" : ""}`}
            />
            <span
              className={`block h-[2px] bg-primary rounded-lg transition-all duration-200 ease-in-out ${isMenuOpen ? "w-0 opacity-0" : "w-full opacity-100"}`}
            />
            <span
              className={`block h-[2px] w-full bg-primary rounded-lg transition-transform duration-300 ease-in-out origin-right ${isMenuOpen ? "rotate-45 translate-y-[1px]" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-500 ease-in-out bg-white border-b border-gray-200 shadow-2xl ${
          isMenuOpen
            ? "max-h-screen opacity-100 py-6"
            : "max-h-0 opacity-0 py-0 border-none"
        }`}
      >
        <ul className="flex flex-col space-y-4 px-6 mb-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <li key={link.name}>
                <Link
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center py-3 px-4 rounded-lg text-lg transition-all duration-300
                    ${isActive ? "bg-primary/10 text-primary-dark font-semibold" : "text-primary hover:bg-primary/5 hover:text-primary-dark font-medium"}
                  `}
                >
                  <span className="mr-1">{link.icon}</span>
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="px-6 pb-2 flex flex-col gap-3">
          {/* Login Button */}
          <Link
            href="/login"
            className="w-full text-center border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 py-3 rounded-lg font-semibold active:scale-95 text-lg"
          >
            Login
          </Link>

          {/* Contact Button */}
          <Link
            href="/contact"
            className="w-full text-center bg-primary hover:bg-primary-dark transition-colors duration-300 py-3 rounded-lg font-semibold shadow-lg active:scale-95 text-lg text-white"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

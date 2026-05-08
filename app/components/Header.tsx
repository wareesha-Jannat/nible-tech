"use client";

import {  ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useServices } from "@/hooks/useServices";
import { groupServicesByCategory } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  const { data: services = []} = useServices();

  const groupedServices = groupServicesByCategory(services ?? []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data: session } = useSession();
  const pathname = usePathname() || "/";

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "SEO",
      path: "/services/seo",
      dropdown: groupedServices.seo,
    },
    {
      name: "Web",
      path: "/services/web",
      dropdown: groupedServices.web,
    },
    {
      name: "Marketing",
      path: "/services/marketing",
      dropdown: groupedServices.marketing,
    },
    {
      name: "Portfolio",
      path: "/portfolio",
    },
    {
      name: "Blogs",
      path: "/blogs",
    },
  ];

  return (
    <header className="relative w-full z-50 bg-transparent py-2 border-b border-border text-primary">
      <div
        ref={navRef}
        className=" flex items-center justify-between px-10 md:px-16 mx-auto w-full max-w-[1280px]"
      >
        {/* Logo */}
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
          <span className="flex items-center font-bold text-xl tracking-wide">
            <span>Nible</span>
            <span className="text-primary-light ml-1">Tech</span>
          </span>
        </Link>

        {/* Hamburger */}
        <button
          className="min-[1230px]:hidden ml-auto z-50 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 flex flex-col items-end gap-1.5">
            <span
              className={`h-[2px] w-full bg-primary transition ${
                isMenuOpen ? "-rotate-45 -translate-y-[1px]" : ""
              }`}
            />
            <span
              className={`h-[2px] bg-primary transition ${
                isMenuOpen ? "w-0 opacity-0" : "w-full"
              }`}
            />
            <span
              className={`h-[2px] w-full bg-primary transition ${
                isMenuOpen ? "rotate-45 translate-y-[1px]" : ""
              }`}
            />
          </div>
        </button>

        {/* NAV (Unified) */}
        <nav className="min-[1230px]:ml-auto ">
          <div
            className={`
              min-[1230px]:flex min-[1230px]:items-center min-[1230px]:space-x-4
              ${isMenuOpen ? "block  " : "hidden"} min-[1230px]:block
              absolute min-[1230px]:static top-full left-0 w-full min-[1230px]:w-auto
              bg-white min-[1230px]:bg-transparent shadow-lg min-[1230px]:shadow-none
              px-6 min-[1230px]:px-0 py-6 
            `}
          >
            {/* Links */}
            <ul className="flex flex-col min-[1230px]:flex-row min-[1230px]:items-center gap-4 min-[1230px]:gap-6">
              {navLinks.map((link) => {
                const isActive =
                  link.path === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.path);
                const isOpen = openDropdown === link.name;

                return (
                  <li key={link.name} className="relative">
                    {link.dropdown ? (
                     <button
  onClick={() => setOpenDropdown(isOpen ? null : link.name)}
  className={`flex items-center gap-2 py-2 font-semibold ${
    isActive
      ? "text-primary-dark"
      : "text-primary hover:text-primary-dark"
  }`}
>
  <span>{link.name}</span>
  <ChevronDown
    className={`w-4 h-4 transition-transform ${
      isOpen ? "rotate-180" : ""
    }`}
  />
</button>
                    ) : (
                      <Link
                        href={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`font-semibold ${
                          isActive
                            ? "text-primary-dark"
                            : "text-primary hover:text-primary-dark"
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}

                    {/* Dropdown */}
                    {link.dropdown && (
                      <div
                        className={`
      ${isOpen ? "block" : "hidden"}
      min-[1230px]:absolute min-[1230px]:top-full min-[1230px]:left-0 min-[1230px]:mt-2
      min-[1230px]:w-56 bg-white min-[1230px]:shadow-lg rounded-lg
    `}
                      >
                        <ul className="py-2">
                          {link.dropdown.length === 0
                            ? // 🔥 Skeleton UI
                              Array.from({ length: 3 }).map((_, i) => (
                                <li key={i} className="px-4 py-2">
                                  <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
                                </li>
                              ))
                            : // 🔥 Normal menu
                              link.dropdown.map((item) => (
                                <li key={item.name}>
                                  <Link
                                    href={item.path}
                                    onClick={() => {
                                      setIsMenuOpen(false);
                                      setOpenDropdown(null);
                                    }}
                                    className="block px-4 py-2 text-sm text-primary hover:bg-primary/10"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Buttons (UNCHANGED as requested) */}
            <div className="flex flex-col min-[1230px]:flex-row gap-3 min-[1230px]:gap-4 mt-6 min-[1230px]:mt-0">
              {session ? (
                <Link
                  href="/admin/dashboard"
                  className="bg-primary text-center hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-300 py-2.5 px-6 rounded-lg font-semibold shadow-md active:scale-95 text-white"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="border border-primary text-primary hover:bg-primary hover:text-white hover:-translate-y-0.5 transition-all duration-300 py-2.5 px-6 rounded-lg font-semibold active:scale-95 text-center"
                >
                  Login
                </Link>
              )}

              <Link
                href="/contact"
                className="bg-primary hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-300 py-2.5 px-6 rounded-lg font-semibold shadow-md active:scale-95 text-white text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

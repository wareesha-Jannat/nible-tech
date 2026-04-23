"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Mail, Layers, User } from "lucide-react";

const AdminHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname() || "/";

  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5 mr-1.5" />,
    },
    {
      name: "Queries",
      path: "/queries",
      icon: <Mail className="w-5 h-5 mr-1.5" />,
    },
    {
      name: "Content",
      path: "/content",
      icon: <Layers className="w-5 h-5 mr-1.5" />,
    },
  ];

  return (
    <header className="w-full  z-50 bg-transparent backdrop-blur-md py-5 border-b border-border text-primary">
      <div className="flex justify-between items-center px-10 md:px-16 mx-auto w-full max-w-[1280px]">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <Image
            src="/logo.png"
            alt="NibleTech Logo"
            width={60}
            height={65}
            className="object-contain transition-transform group-hover:scale-105 duration-500 ease-in-out"
          />
          <span className="font-bold text-lg">
            Nible <span className="text-primary-light">Tech</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8 items-center text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className={`group relative flex items-center py-2 transition-colors duration-300 font-semibold ${
                      isActive ? "text-primary-dark" : "text-primary"
                    }`}
                  >
                    {link.icon}
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[2px] bg-primary origin-left transition-transform duration-300 ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Admin Profile */}
          <div className="flex cursor-pointer group">
            <Link href="/profile" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>

              <span className="font-medium group-hover:text-primary-dark">
                Admin
              </span>
            </Link>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 flex flex-col items-end gap-1.5">
            <span
              className={`block h-[2px] w-full bg-primary transition ${
                isMenuOpen ? "-rotate-45 -translate-y-[1px]" : ""
              }`}
            />
            <span
              className={`block h-[2px] bg-primary transition ${
                isMenuOpen ? "w-0 opacity-0" : "w-full opacity-100"
              }`}
            />
            <span
              className={`block h-[2px] w-full bg-primary transition ${
                isMenuOpen ? "rotate-45 translate-y-[1px]" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl transition-all duration-500 ${
          isMenuOpen ? "max-h-screen py-6" : "max-h-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col space-y-4 px-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <li key={link.name}>
                <Link
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center py-3 px-4 rounded-lg text-lg ${
                    isActive
                      ? "bg-primary/10 text-primary-dark"
                      : "text-primary"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Admin */}
        <div className="px-6 mt-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <span className="font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

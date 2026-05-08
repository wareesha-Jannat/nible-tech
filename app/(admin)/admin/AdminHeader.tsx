"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { User, LogOut } from "lucide-react";
import { SessionUser } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

const AdminHeader = ({ user }: { user: SessionUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname() || "/";
  const queryClient = useQueryClient();
  const handleLogout = async () => {
    await queryClient.clear();
    await signOut({ callbackUrl: "/" });
  };

  const navLinks = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      name: "Queries",
      path: "/admin/queries",

    },
    {
      name: "Content",
      path: "/admin/content",
    },
  ];

  return (
    <header className="w-full  z-50 bg-transparent backdrop-blur-md py-6 border-b border-border text-primary">
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
        <nav className="hidden min-[900px]:flex items-center space-x-10">
          <ul className="flex space-x-10 items-center text-sm font-medium">
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
            <Link href="/admin/profile" className="flex items-center gap-2">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt="User"
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
              )}

              <span className="font-medium text-sm group-hover:text-primary-dark">
                {user?.name || "Admin"}
              </span>
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center font-bold gap-2 text-sm  text-primary-light hover:text-primary-dark transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="min-[900px]:hidden z-50 p-2"
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
        className={`min-[900px]:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl transition-all duration-500 ${
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
                  className={`flex items-center rounded-lg p-2 text-lg ${
                    isActive
                      ? "bg-primary/10 text-primary-dark"
                      : "text-primary"
                  }`}
                >
              
                  {link.name}
                </Link>
              </li>
            );
          })}
          {/* Mobile Admin */}
          <div className="flex cursor-pointer group">
            <Link href="/admin/profile" className="flex items-center gap-3">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt="User"
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
              )}

              <span className="font-medium group-hover:text-primary-dark">
                {user?.name || "Admin"}
              </span>
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 p-2 text-primary-light hover:text-primary-dark transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </ul>
      </div>
    </header>
  );
};

export default AdminHeader;

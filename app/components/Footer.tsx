import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 pt-20 pb-8 border-t border-gray-200 text-gray-600">
      <div className="w-full max-w-[1280px] mx-auto px-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-16">

          {/* Brand Col */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 z-50 relative group">
              <Image src="/logo.png" alt="NibleTech Logo" width={40} height={40} className="object-contain transition-transform group-hover:scale-105" />
              <span className="flex items-center justify-center font-bold text-xl tracking-wide">
                <span>Nibble</span>
                <span className="text-primary-light ml-1">Tech</span>
              </span>
            </Link>
            <p className="max-w-sm leading-relaxed mb-8 mt-2 text-gray-500 font-light">
              A modern IT startup delivering high-end digital transformation through bespoke software, web development, and cloud solutions.
            </p>
            <div className="flex space-x-4">
              {/* Dummy Social Icons */}
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 hover:-translate-y-1 text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 hover:-translate-y-1 text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-primary-dark font-semibold mb-6 tracking-wide uppercase text-sm">Quick Links</h4>
            <ul className="space-y-4 font-light">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="col-span-1">
            <h4 className="text-primary-dark font-semibold mb-6 tracking-wide uppercase text-sm">Our Services</h4>
            <ul className="space-y-4 font-light">
              <li><Link href="/services" className="hover:text-primary transition-colors">Web Development</Link></li>

              <li><Link href="/services" className="hover:text-primary transition-colors">Custom IT Solutions</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Consultation</Link></li>
              <li className="pt-2"><Link href="/services" className="hover:text-primary-dark text-gray-500 font-medium transition-colors">All Services &rarr;</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h4 className="text-primary-dark font-semibold mb-6 tracking-wide uppercase text-sm">Contact</h4>
            <ul className="space-y-4 font-light">
              <li className="hover:text-primary transition-colors cursor-pointer">contact@nibbletech.com</li>
              <li className="hover:text-primary transition-colors cursor-pointer">+1 (555) 123-4567</li>
              <li>123 Digital Way<br />Tech District, NY 10001</li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-light">
          <p>&copy; {new Date().getFullYear()} NibleTech. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect } from 'react';
import { Mail, Youtube, Menu, X } from 'lucide-react';

export function Navbar({ onOpenContact }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#portfolio' },
    { label: 'About', href: '#about' },
   // { label: 'Static Graphics', href: '#static-graphics' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      id="top-navbar" 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'py-3.5 bg-[#FAF4EE]/80 backdrop-blur-xl border-b border-white/60 shadow-[0_4px_20px_-4px_rgba(92,60,40,0.05)]' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Brand Name */}
          <a 
            id="nav-brand-logo"
            href="#" 
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C86D51] to-[#A84E32] flex items-center justify-center text-white shadow-sm font-semibold tracking-wider text-sm transition-transform duration-300 group-hover:scale-105">
              AR
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-[#2A211D]">
                  ANUSHKA RAI
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#C86D51]/10 text-[#C86D51] border border-[#C86D51]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C86D51] animate-pulse mr-1.5"></span>
                  Available
                </span>
              </div>
              <p className="text-[11px] text-[#7A675B] hidden md:block font-normal">
                Video Editor • AI Video Creator
              </p>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/50 backdrop-blur-md border border-white/80 shadow-sm">
            {navLinks.map((link) => (
              <a
                key={link.label}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                href={link.href}
                className="px-4 py-1.5 rounded-full text-xs font-medium text-[#45362E] hover:text-[#C86D51] hover:bg-white/80 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              id="nav-youtube-link"
              href="https://youtube.com/@Explorersx2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium text-[#45362E] bg-white/60 hover:bg-white border border-white/80 transition-all duration-200 hover:text-[#C86D51] shadow-xs"
            >
              <Youtube className="w-3.5 h-3.5 text-[#C86D51]" />
              <span>@Explorersx2</span>
            </a>

            <button
              id="nav-contact-cta"
              onClick={onOpenContact}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#C86D51] to-[#A84E32] hover:from-[#B85D41] hover:to-[#964026] shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/60 border border-white/80 text-[#2A211D]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-4 p-4 rounded-2xl bg-[#FAF4EE]/95 backdrop-blur-2xl border border-white/80 shadow-xl space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-[#2A211D] hover:bg-white/80 hover:text-[#C86D51] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-2 border-t border-[#DFCEBE]/60 flex flex-col gap-2">
            <a
              href="https://youtube.com/@Explorersx2"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-medium bg-white/70 text-[#2A211D] border border-white"
            >
              <Youtube className="w-4 h-4 text-[#C86D51]" />
              <span>YouTube: @Explorersx2</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-[#C86D51]"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Anushka</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

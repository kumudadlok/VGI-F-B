import React, { useState } from 'react';
import { ShoppingBag, Bell, Menu, X } from 'lucide-react';
import { CartItem } from '../types';
import Logo from './Logo';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  trackedOrderId: string | null;
  onOpenTracker: () => void;
  onOpenHistory: () => void;
}

export default function Header({
  cart,
  onOpenCart,
  activeSection,
  setActiveSection,
  trackedOrderId,
  onOpenTracker,
  onOpenHistory,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Exact customized navigation tabs requested by the user
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Our Services' },
    { id: 'features', label: 'Why Choose Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <header id="site-header" className="sticky top-0 z-40 w-full border-b border-stone-100 bg-white/95 backdrop-blur-md transition-all duration-300 shadow-[0_2px_15px_-3px_rgba(93,62,26,0.06)]">
      
      {/* Luxury Grand Restaurant Top Bar - Dark Chocolate & Saffron Toast theme */}
      <div className="bg-[#2D1C0C] text-[#EADED2] text-[10px] sm:text-[11px] font-sans font-bold uppercase py-2 px-4 text-center tracking-[0.2em] flex items-center justify-center gap-2">
        <span>Cakey &amp; Cookie Bakers (Vardhaman Group Alliance)</span>
        <span className="opacity-40 hidden sm:inline">•</span>
        <span className="text-[#E89543] hidden sm:inline">Pune MIDC Standardized Sterile Baking Plant</span>
      </div>

      <div className="w-full flex h-24 sm:h-32 px-4 sm:px-8 lg:px-14 items-center justify-between">
        
        {/* Brand Vector Logo integrated beautifully with custom sizes */}
        <a
          id="brand-logo-link"
          href="https://cakeyandcookiebackers.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 text-left focus:outline-none transition-all hover:opacity-90 shrink-0"
          aria-label="Cakey and Cookie Bakers Home"
        >
          <Logo className="w-28 sm:w-36 md:w-40 lg:w-[156px] h-auto transition-transform duration-300 group-hover:rotate-1" />
        </a>

        {/* Desktop Navigation - Inspired by ThemeGoods Grand Restaurant minimalist luxury look */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => {
                  setActiveSection(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative py-2 font-serif text-[15px] font-bold tracking-tight transition-all duration-350 focus:outline-none ${
                  isActive 
                    ? 'text-[#C2612A] scale-[1.03]' 
                    : 'text-[#5D3E1A]/80 hover:text-[#C2612A]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C2612A] rounded-full animate-fade-in" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls Panel */}
        <div id="header-actions" className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Real-time Logistics Tracker Link */}
          {trackedOrderId && (
            <button
              id="header-track-btn"
              onClick={() => {
                setActiveSection('tracker');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group relative hidden sm:flex h-10 items-center gap-2 rounded-full border border-[#C2612A]/30 bg-[#FAFAF8] px-4 py-2 font-sans text-xs font-bold text-[#C2612A] hover:bg-[#E89543]/10 transition-all focus:outline-none shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Track Dispatch</span>
              <Bell className="h-3.5 w-3.5 stroke-[2] animate-bounce text-[#C2612A] group-hover:scale-110" />
            </button>
          )}

          {/* B2B Client Portal Trigger */}
          <button
            id="header-b2b-portal-btn"
            onClick={onOpenHistory}
            className="hidden sm:flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-2 font-sans text-xs font-bold text-[#5D3E1A] hover:border-[#C2612A] hover:bg-stone-50 transition focus:outline-none cursor-pointer"
          >
            <span>B2B Portal</span>
          </button>

          {/* Elegant Cart bag */}
          <button
            id="header-cart-btn"
            onClick={onOpenCart}
            className="group relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-stone-200 hover:border-[#C2612A] bg-stone-50/50 hover:bg-[#FAFAF8] transition-all focus:outline-none"
            title="Consignment Bag"
          >
            <ShoppingBag className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-[#5D3E1A] group-hover:text-[#C2612A] transition-colors stroke-[1.8]" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#C2612A] font-sans text-[10px] font-bold text-white shadow-sm ring-2 ring-white animate-scale">
                {totalCartItems}
              </span>
            )}
          </button>

          {/* Premium Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-stone-200 hover:border-[#C2612A] bg-white text-[#5D3E1A] hover:bg-stone-50 transition lg:hidden focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-4.5 w-4.5 text-[#C2612A] transition-transform" />
            ) : (
              <Menu className="h-4.5 w-4.5 transition-transform" />
            )}
          </button>
        </div>

      </div>

      {/* Mobile & Tablet Dropdown Navigation Overlay */}
      {isMobileMenuOpen && (
        <div id="mobile-nav-panel" className="lg:hidden bg-white border-t border-stone-100 px-4 py-5 shadow-xl animate-fade-in divide-y divide-stone-100 max-h-[80vh] overflow-y-auto">
          {/* Navigation Links */}
          <div className="space-y-2 pb-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full text-left py-3 px-4 font-serif text-[15px] sm:text-[16px] font-bold rounded-xl transition ${
                    isActive
                      ? 'bg-[#C2612A]/10 text-[#C2612A] translate-x-1'
                      : 'text-[#5D3E1A] hover:bg-stone-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Action Links for Tablet & Mobile devices */}
          <div className="space-y-3 pt-4">
            {/* Display "Track Dispatch" inside mobile menu overlay regardless of screen size if active */}
            {trackedOrderId && (
              <button
                id="mobile-track-btn"
                onClick={() => {
                  setActiveSection('tracker');
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex w-full items-center justify-between rounded-xl border border-[#C2612A]/30 bg-[#FAFAF8] px-4 py-3 font-sans text-xs font-bold text-[#C2612A] hover:bg-[#E89543]/10 transition-all focus:outline-none"
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Track Live Consignment Dispatch</span>
                </div>
                <Bell className="h-4 w-4 stroke-[2] text-[#C2612A]" />
              </button>
            )}

            <button
              id="mobile-b2b-portal-btn"
              onClick={() => {
                onOpenHistory();
                setIsMobileMenuOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-xl border border-stone-200 bg-[#FAF8F5] px-4 py-3 font-sans text-xs font-bold text-[#5D3E1A] hover:border-[#C2612A] hover:bg-white transition focus:outline-none"
            >
              <span>Access B2B Client Portal</span>
              <span className="text-[10px] uppercase font-bold text-stone-400">Past Orders</span>
            </button>

            {/* Quick Contact hotline inside dropdown */}
            <div className="rounded-xl border border-dashed border-stone-200 p-3 bg-stone-50/50 flex items-center justify-between text-xs font-sans text-stone-500">
              <span className="font-bold text-[#5D3E1A]">Hotline:</span>
              <a href="tel:+919112230606" className="font-semibold text-[#C2612A] hover:underline">+91 91122 30606</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

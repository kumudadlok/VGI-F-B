import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Sparkles, 
  Calendar, 
  Briefcase, 
  Layers, 
  BookOpen, 
  Eye, 
  Target, 
  ShieldCheck, 
  TrendingUp, 
  Award,
  Maximize2,
  FileText
} from 'lucide-react';

interface BusinessProfileProps {
  onExploreCatalog: () => void;
  onPartnerInquiry: () => void;
}

export default function BusinessProfile({ onExploreCatalog, onPartnerInquiry }: BusinessProfileProps) {
  const [layoutMode, setLayoutMode] = useState<'interactive' | 'editorial'>('interactive');

  return (
    <section id="business-profile-hub" className="py-16 sm:py-24 bg-[#FAFAF8] relative border-b border-stone-200/50">
      <div className="w-full px-4 sm:px-8 lg:px-14">
        
        {/* Vardhaman Header Announcement */}
        <div className="flex flex-wrap items-center justify-between border-b border-stone-200 pb-5 mb-8 sm:mb-12 gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#C2612A] animate-ping" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#C2612A]">
              A Proud Member of Vardhaman Group, India
            </span>
          </div>
          
          {/* Layout Quick Selector */}
          <div className="flex items-center gap-2 p-1.5 bg-stone-100 rounded-full border border-stone-200">
            <button
              id="layout-mode-interactive"
              onClick={() => setLayoutMode('interactive')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-sans text-xs font-bold transition-all ${
                layoutMode === 'interactive'
                  ? 'bg-[#5D3E1A] text-white shadow-sm'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Interactive Portal</span>
            </button>
            <button
              id="layout-mode-editorial"
              onClick={() => setLayoutMode('editorial')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-sans text-xs font-bold transition-all ${
                layoutMode === 'editorial'
                  ? 'bg-[#5D3E1A] text-white shadow-sm'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Classic Editorial Layout</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 1. INTERACTIVE MODERN PORTAL LAYOUT */}
        {/* ========================================================= */}
        {layoutMode === 'interactive' && (
          <div className="space-y-12 animate-fade-in">
            
            {/* Top Hero Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-sm">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#5D3E1A] leading-tight tracking-tight uppercase">
                    Cakey &amp; Cookie
                    <span className="block font-sans text-xs sm:text-sm font-bold tracking-[0.24em] text-[#C2612A] uppercase mt-2.5">
                      Business Hub Profile
                    </span>
                  </h1>
                  <div className="h-[2px] w-20 bg-[#C2612A] mt-4" />
                </div>

                <div className="prose prose-neutral max-w-none text-stone-600 leading-relaxed text-sm sm:text-base space-y-4 font-sans font-medium">
                  <p>
                    <strong>Cakey and Cookie Bakers</strong> is a premier large-scale bakery supplying beautiful, delicious baked commodities to other corporate clients. We are part of the highly-reputable, well-known <strong>Vardhaman Group</strong> alliance, India.
                  </p>
                  <p>
                    We do not just bake; we deliver a structured, certified <span className="text-[#C2612A] font-bold italic">"bakery solution"</span> for cafes, franchises, supermarkets, and hoteliers who need high-security supply chains for high-volume confectionery bakes.
                  </p>
                </div>

                {/* Micro Metrics Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans bg-[#FAF8F5] border border-stone-200/50 p-4 rounded-2xl">
                  <div className="space-y-1 p-2">
                    <span className="flex items-center gap-1.5 text-xs text-[#C2612A] font-bold uppercase tracking-wider">
                      <Calendar className="h-3.5 w-3.5" /> Established
                    </span>
                    <p className="text-sm font-bold text-[#5D3E1A]">October 9, 2022</p>
                  </div>
                  <div className="space-y-1 p-2 border-t sm:border-t-0 sm:border-l border-stone-200">
                    <span className="flex items-center gap-1.5 text-xs text-[#C2612A] font-bold uppercase tracking-wider">
                      <Briefcase className="h-3.5 w-3.5" /> Core Domain
                    </span>
                    <p className="text-sm font-bold text-[#5D3E1A]">Industrial Bulk Supply</p>
                  </div>
                  <div className="space-y-1 p-2 border-t sm:border-t-0 sm:border-l border-stone-200">
                    <span className="flex items-center gap-1.5 text-xs text-[#C2612A] font-bold uppercase tracking-wider">
                      <Layers className="h-3.5 w-3.5" /> Theme Style
                    </span>
                    <p className="text-sm font-bold text-[#5D3E1A]">"Premium Cream"</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={onExploreCatalog}
                    className="flex-1 sm:flex-none justify-center rounded-full bg-[#5D3E1A] hover:bg-[#442C12] text-white font-sans text-xs font-bold uppercase tracking-wider px-7 py-3.5 transition-all text-center flex items-center gap-2 shadow-sm"
                  >
                    <span>View Wholesale Catalog</span>
                  </button>
                  <button
                    onClick={onPartnerInquiry}
                    className="flex-1 sm:flex-none justify-center rounded-full border-2 border-[#C2612A] hover:bg-[#C2612A]/5 text-[#C2612A] font-sans text-xs font-bold uppercase tracking-wider px-7 py-3.5 transition-all text-center flex items-center gap-2"
                  >
                    <span>Join B2B Partnership</span>
                  </button>
                </div>
              </div>

              {/* Graphical brand element */}
              <div className="lg:col-span-5 relative">
                <div className="rounded-3xl overflow-hidden shadow-md aspect-[4/3] relative border border-stone-200 p-1 bg-white">
                  <img
                    src="/src/assets/images/cream_roll_box_1780047413276.png"
                    alt="Artisanal Baking Plant Solution"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#5D3E1A]/90 via-[#5D3E1A]/30 to-transparent flex flex-col justify-end p-6 m-1 rounded-2xl">
                    <p className="text-[#E89543] font-sans text-[10px] uppercase font-bold tracking-widest">Saffron Toast &amp; Cream Rolls</p>
                    <h4 className="text-white font-serif text-lg font-bold">100% Premium Ingredient Integrity</h4>
                  </div>
                </div>
                {/* Accent frames */}
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#C2612A]/5 rounded-2xl -z-10" />
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-stone-105 rounded-2xl -z-10" />
              </div>
            </div>

            {/* Brand Story & Vision Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Brand Story */}
              <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 space-y-5 shadow-sm">
                <span className="inline-flex items-center gap-1.5 text-xs text-[#C2612A] font-bold uppercase tracking-widest">
                  <BookOpen className="h-4 w-4" /> Brand Narrative
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#5D3E1A] tracking-tight whitespace-normal">
                  Rooted in the "Made in India" Initiative
                </h3>
                <p className="font-sans text-[13px] text-stone-600 leading-relaxed font-medium">
                  The story of Cakey and Cookie Bakers is deeply rooted in the iconic "Made in India" initiative. It was born from a desire to provide local businesses—ranging from roadside kiosks to high-end restaurants—with bakery products that do not compromise on ingredients.
                </p>
                <p className="font-sans text-[13px] text-stone-600 leading-relaxed font-medium">
                  While many mass-production bakeries focus solely on minimizing cost, we focus on the <strong>science of baking</strong>. By utilizing organic butter, premium farm-direct mill flour, and maintaining absolute quality control, we are a "Quality-First" wholesale partner.
                </p>
              </div>

              {/* Vision Block */}
              <div className="bg-gradient-to-br from-[#40270F] to-[#251508] text-[#FAF8F5] rounded-3xl p-6 sm:p-10 space-y-6 flex flex-col justify-between shadow-md border border-[#5d3e1a]">
                <div className="space-y-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#E89543] font-bold uppercase tracking-widest">
                    <Eye className="h-4 w-4" /> Vision Formulation
                  </span>
                  <blockquote className="font-serif text-lg sm:text-xl font-medium leading-relaxed text-[#ECE3D5] italic border-l-4 border-[#C2612A] pl-5">
                    "To set the gold standard for wholesale confectionery in India by blending traditional warmth with modern efficiency and sterile baking science."
                  </blockquote>
                </div>
                <div className="space-y-3 font-sans text-xs sm:text-sm text-stone-300 leading-relaxed pt-5 border-t border-white/10 font-medium">
                  <p>
                    Our vision is to act as the <strong>unshakable backbone</strong> of the Indian café food ecosystem.
                  </p>
                  <p>
                    We guarantee that the 1,000th biscuit inside a dispatch matches the raw, unrefined high quality of the first sample bake.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission & Product Pillars & Value Pros Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-4">
              
              {/* Mission */}
              <div className="bg-white border border-stone-250 rounded-3xl p-6 shadow-sm space-y-5">
                <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                  <Target className="h-5 w-5 text-[#C2612A]" />
                  <h3 className="font-serif font-bold text-lg text-[#5D3E1A] tracking-tight">Mission Directives</h3>
                </div>
                
                <ul className="space-y-4 font-sans text-xs sm:text-[13px] text-stone-605">
                  <li className="space-y-1">
                    <span className="font-extrabold text-[#5D3E1A] flex items-center gap-1.5 uppercase tracking-wide">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C2612A]" />
                      Empowerment
                    </span>
                    <p className="text-[12px] text-stone-500 pl-3 leading-relaxed font-medium">
                      Providing cafeterias with customized baked goods that decrease operational morning baking stress completely.
                    </p>
                  </li>
                  <li className="space-y-1">
                    <span className="font-extrabold text-[#5D3E1A] flex items-center gap-1.5 uppercase tracking-wide">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C2612A]" />
                      Strict Consistency
                    </span>
                    <p className="text-[12px] text-stone-500 pl-3 leading-relaxed font-medium">
                      Ensuring every bulk cookies carton or display slab delivers 100% identical dimensions, moisture and taste.
                    </p>
                  </li>
                  <li className="space-y-1">
                    <span className="font-extrabold text-[#5D3E1A] flex items-center gap-1.5 uppercase tracking-wide">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C2612A]" />
                      Real Ingredients
                    </span>
                    <p className="text-[12px] text-stone-500 pl-3 leading-relaxed font-medium">
                      Strictly pure milk fat, organic cocoa, Kashmiri saffron, and premium flour with zero chemical flavor extenders.
                    </p>
                  </li>
                </ul>
              </div>

              {/* Product & Service Pillars */}
              <div className="bg-white border border-stone-250 rounded-3xl p-6 shadow-sm space-y-5">
                <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                  <Layers className="h-5 w-5 text-[#C2612A]" />
                  <h3 className="font-serif font-bold text-lg text-[#5D3E1A] tracking-tight">Service Pillars</h3>
                </div>
                <p className="font-sans text-xs text-stone-400 font-medium italic">
                  Organizing logistics across three essential commerce sectors:
                </p>
                
                <ul className="space-y-4 font-sans text-xs sm:text-[13px] text-stone-605">
                  <li className="space-y-1">
                    <span className="font-extrabold text-[#5D3E1A] flex items-center gap-1.5 uppercase tracking-wide">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#5D3E1A]" />
                      Wholesale Distribution
                    </span>
                    <p className="text-[12px] text-stone-500 pl-3 leading-relaxed font-medium">
                      Supplying scheduled, bulk crates of high-demand vanilla cream rolls, saffron toast packs, and cookies to major supermarkets.
                    </p>
                  </li>
                  <li className="space-y-1">
                    <span className="font-extrabold text-[#5D3E1A] flex items-center gap-1.5 uppercase tracking-wide">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#5D3E1A]" />
                      B2B Formulation
                    </span>
                    <p className="text-[12px] text-stone-500 pl-3 leading-relaxed font-medium">
                      Serving as the primary secret contract kitchen for franchise brands that prefer unbranded white-label desserts.
                    </p>
                  </li>
                  <li className="space-y-1">
                    <span className="font-extrabold text-[#5D3E1A] flex items-center gap-1.5 uppercase tracking-wide">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#5D3E1A]" />
                      DTC Flagships
                    </span>
                    <p className="text-[12px] text-stone-500 pl-3 leading-relaxed font-medium">
                      Interacting directly with local communities through designated brand outlets to gather valuable product feedback loops.
                    </p>
                  </li>
                </ul>
              </div>

              {/* Value Proposition */}
              <div className="bg-white border border-stone-250 rounded-3xl p-6 shadow-sm space-y-5">
                <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                  <Award className="h-5 w-5 text-[#C2612A]" />
                  <h3 className="font-serif font-bold text-lg text-[#5D3E1A] tracking-tight">Our Value Proposition</h3>
                </div>
                <p className="font-sans text-xs text-stone-400 font-medium italic">
                  Why retail networks select and respect our operations:
                </p>
                
                <ul className="space-y-4 font-sans text-xs sm:text-[13px] text-stone-605">
                  <li className="space-y-1">
                    <span className="font-bold text-stone-900 flex items-center gap-1.5">
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                      Scale Integration
                    </span>
                    <p className="text-[12px] text-stone-500 pl-5 leading-relaxed font-medium">
                      Built specifically for extreme scale. No supply drops, even on massive dynamic orders or festival peaks.
                    </p>
                  </li>
                  <li className="space-y-1">
                    <span className="font-bold text-stone-900 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-[#C2612A]" />
                      Recipe Tailoring
                    </span>
                    <p className="text-[12px] text-stone-500 pl-5 leading-relaxed font-medium">
                      Adaptable ingredient bakes (e.g. eggless, gluten-reduced, natural sweeteners) to meet custom specifications.
                    </p>
                  </li>
                  <li className="space-y-1">
                    <span className="font-bold text-stone-900 flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#5D3E1A]" />
                      Corporate Governance
                    </span>
                    <p className="text-[12px] text-stone-500 pl-5 leading-relaxed font-medium">
                      Fully accredited under the Vardhaman Group, ensuring high-standard compliance, invoices, and audit protocols.
                    </p>
                  </li>
                </ul>
              </div>

            </div>

            {/* Custom Interactive Contact Footer */}
            <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-4 space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#C2612A]">Vardhaman Group Desk</span>
                  <h4 className="font-serif text-2xl font-bold text-[#5D3E1A] tracking-tight uppercase">Pune Corporate HQ</h4>
                  <div className="h-[2px] w-14 bg-[#C2612A] mt-2" />
                  <p className="font-sans text-xs text-stone-500 leading-relaxed pt-3 font-medium">
                    Connect with our procurement relations desk to establish automated cargo routing, custom recipe formulations, or pricing schedules.
                  </p>
                </div>

                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Address */}
                  <a 
                    href="https://maps.app.goo.gl/dJz4wx3LB28382n78"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FAF8F5] p-5 rounded-2xl border border-stone-200 flex gap-3.5 hover:shadow-md hover:border-[#C2612A]/40 transition group cursor-pointer block text-left"
                    id="map-address-link"
                  >
                    <MapPin className="h-5 w-5 text-[#C2612A] shrink-0 mt-0.5 group-hover:scale-110 transition" />
                    <div className="font-sans text-xs font-medium">
                      <p className="font-bold text-[#5D3E1A] text-sm uppercase tracking-wider group-hover:text-[#C2612A] transition">
                        Industrial Plant Complex
                      </p>
                      <p className="text-stone-500 mt-2 leading-relaxed">
                        Survey No. 173/2, Pandharkar Nagar, near Beena English School, MIDC, Pune, Maharashtra, Pin 411035
                      </p>
                      <span className="text-[#C2612A] text-[10px] font-bold mt-2.5 inline-flex items-center gap-1 group-hover:underline">
                        View Address on Google Maps →
                      </span>
                    </div>
                  </a>

                  {/* Connect details */}
                  <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-stone-200 flex flex-col justify-center">
                    <div className="space-y-3 font-sans text-xs font-medium">
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-[#C2612A] shrink-0" />
                        <span className="text-stone-500">Phone lines:</span>
                        <a href="tel:+919112230606" className="font-bold text-[#5D3E1A] hover:text-[#C2612A] transition">
                          +91 91122 30606
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-[#C2612A] shrink-0" />
                        <span className="text-stone-500">Enterprise:</span>
                        <a href="mailto:sales@vardhaman.group" className="font-bold text-[#5D3E1A] hover:text-[#C2612A] transition">
                          sales@vardhaman.group
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="h-4 w-4 text-[#C2612A] shrink-0" />
                        <span className="text-stone-500">Corporate Portal:</span>
                        <a href="https://www.vardhaman.group" target="_blank" rel="noreferrer" className="font-bold text-[#C2612A] hover:underline transition">
                          www.vardhaman.group
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* 2. CLASSIC EDITORIAL PRINT LAYOUT (HIFI MATCH TO SCREENSHOT) */}
        {/* ========================================================= */}
        {layoutMode === 'editorial' && (
          <div className="bg-white border-2 border-stone-200 rounded-3xl p-8 sm:p-14 text-stone-800 font-sans shadow-md animate-fade-in">
            
            {/* Top Double column layout wrapper */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* LEFT MAJOR PANEL */}
              <div className="lg:col-span-7 space-y-8 pr-4">
                
                {/* Title */}
                <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#5D3E1A] tracking-tight uppercase hover:opacity-90 leading-tight">
                  Cakey and Cookie Bakers Business Profile
                </h1>

                {/* Brand Overview Block */}
                <div className="space-y-4">
                  <h2 className="font-sans text-sm sm:text-base font-extrabold text-[#C2612A] uppercase tracking-widest">
                    Brand Overview
                  </h2>
                  <p className="font-sans text-sm sm:text-base leading-relaxed text-stone-600 font-medium">
                    <strong>Cakey and Cookie Bakers</strong> is a large-scale bakery that sells delicious treats to other businesses. We are part of the <strong>Vardhaman Group</strong>, a well-known company in India. We do not just bake; we provide a professional "bakery solution" for cafes, shops, and restaurants that need high-quality snacks to sell to their own customers.
                  </p>
                  
                  {/* Overview Bullets */}
                  <ul className="list-disc pl-5 font-sans text-sm sm:text-base space-y-2 text-stone-700 font-medium">
                    <li>
                      <strong>Started on:</strong> October 9, 2022.
                    </li>
                    <li>
                      <strong>What we do:</strong> We make cakes and cookies in large amounts (wholesale).
                    </li>
                    <li>
                      <strong>Our Style:</strong> We focus on making things look and taste "premium" and "aesthetic."
                    </li>
                  </ul>
                </div>

                {/* Brand Story Block */}
                <div className="space-y-4 pt-1">
                  <h2 className="font-sans text-sm sm:text-base font-extrabold text-[#C2612A] uppercase tracking-widest">
                    Brand Story
                  </h2>
                  <p className="font-sans text-sm leading-relaxed text-stone-600 font-medium">
                    The story of Cakey and Cookie Bakers is rooted in the "Made in India" initiative. It was born from a desire to provide local businesses—ranging from roadside kiosks to high-end restaurants—with bakery products that do not compromise on ingredients.
                  </p>
                  <p className="font-sans text-sm leading-relaxed text-stone-600 font-medium">
                    While many wholesale bakeries focus solely on volume, Cakey and Cookie Bakers focuses on the <strong>science of baking</strong>. By using fresh farm ingredients and maintaining strict quality control, the brand has carved out a niche as a "Quality-First" wholesaler. The journey is defined by a commitment to helping other entrepreneurs grow their businesses by providing them with products they are proud to sell.
                  </p>
                </div>

                {/* Vision block */}
                <div className="space-y-3 pt-1 border-t border-dashed border-stone-200">
                  <h2 className="font-sans text-sm sm:text-base font-extrabold text-[#C2612A] uppercase tracking-widest">
                    Vision
                  </h2>
                  <p className="font-serif text-md sm:text-lg font-extrabold leading-relaxed text-stone-900 border-l-4 border-[#C2612A] pl-4 italic">
                    "To set the gold standard for wholesale confectionery in India by blending traditional warmth with modern efficiency."
                  </p>
                  <p className="font-sans text-xs sm:text-sm leading-relaxed text-stone-600 font-medium">
                    The vision is to become the "backbone" of the Indian café and retail industry. The goal is to ensure that no matter where a customer is—a small town or a metro city—they have access to the same high-standard cookies and cakes through the brand's vast distribution network.
                  </p>
                </div>

              </div>

              {/* RIGHT MINOR PANEL & CONTACT LISTINGS */}
              <div className="lg:col-span-5 space-y-8 pl-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-stone-200 pt-8 lg:pt-0">
                
                {/* Contact List right aligned top preview */}
                <div className="font-sans text-xs text-stone-605 space-y-2 border-b border-stone-200 pb-5 max-w-sm font-medium">
                  <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
                    <li>
                      <strong>Phone line:</strong> +91 91122 30606
                    </li>
                    <li>
                      <strong>Email info:</strong> sales@vardhaman.group
                    </li>
                    <li>
                      <strong>Brand URL:</strong> www.vardhaman.group
                    </li>
                  </ul>
                </div>

                {/* Mission Block */}
                <div className="space-y-4">
                  <h2 className="font-sans text-sm sm:text-base font-extrabold text-[#C2612A] uppercase tracking-widest col-span-1">
                    Mission
                  </h2>
                  <ul className="list-disc pl-5 font-sans text-xs sm:text-sm space-y-3.5 text-stone-600 font-medium">
                    <li>
                      <strong>Empowerment:</strong> To provide businesses with reliable, customizable bakery solutions that reduce their operational stress.
                    </li>
                    <li>
                      <strong>Quality Consistency:</strong> To ensure that the thousandth cookie tastes exactly as good as the first one.
                    </li>
                    <li>
                      <strong>Ingredient Integrity:</strong> To strictly use premium ingredients, high-quality flour, ensuring a "premium bakery standard" across all product lines.
                    </li>
                  </ul>
                </div>

                {/* Product & Service Pillars Block */}
                <div className="space-y-4">
                  <h2 className="font-sans text-sm sm:text-base font-extrabold text-[#C2612A] uppercase tracking-widest">
                    Product &amp; Service Pillars
                  </h2>
                  <p className="font-sans text-xs leading-relaxed text-stone-500 font-medium italic">
                    Our operations are divided into three core divisions:
                  </p>
                  <ul className="list-disc pl-5 font-sans text-xs sm:text-sm space-y-3.5 text-stone-600 font-medium">
                    <li>
                      <strong>Wholesale Distribution:</strong> Supplying bulk quantities of signature items like <strong>Cookies, Cakes, Cream Rolls and Toast</strong> to retail outlets and supermarkets.
                    </li>
                    <li>
                      <strong>B2B Partnerships:</strong> Acting as a "white-label" or primary supplier for cafés and restaurants that want to serve high-quality desserts without managing an in-house bakery.
                    </li>
                    <li>
                      <strong>Direct-to-Consumer (Factory Outlets):</strong> While primarily wholesale, the brand maintains a presence through factory outlets where customers can experience the "warmth" of the brand directly from the source.
                    </li>
                  </ul>
                </div>

                {/* Value Proposition */}
                <div className="space-y-4">
                  <h2 className="font-sans text-sm sm:text-base font-extrabold text-[#C2612A] uppercase tracking-widest">
                    Value Proposition
                  </h2>
                  <ul className="list-disc pl-5 font-sans text-xs sm:text-sm space-y-3.5 text-stone-600 font-medium">
                    <li>
                      <strong>Scalability:</strong> Built to handle massive orders without a drop in quality, making it ideal for franchise models.
                    </li>
                    <li>
                      <strong>Customization:</strong> Offering "Custom Bakery Solutions", tailoring ingredients, bakes, and specialized wrap-marking.
                    </li>
                    <li>
                      <strong>Legacy of Trust:</strong> Under the trusted Vardhaman framework, we deliver certified corporate billing and absolute quality security.
                    </li>
                  </ul>
                </div>

                {/* Contact Information Bottom with office details */}
                <div className="space-y-4 p-5 bg-stone-50 rounded-xl border border-stone-200">
                  <h2 className="font-sans text-xs sm:text-sm font-extrabold text-[#C2612A] uppercase tracking-wider">
                    Official Headquarters
                  </h2>
                  <div className="font-sans text-xs space-y-3 font-medium text-stone-600">
                    <p>
                      <strong>Corporate address:</strong> Survey No. 173/2, Pandharkar Nagar, near Beena English School, MIDC, Pune, Maharashtra 411035
                    </p>
                    <ul className="space-y-1 border-t border-stone-200 pt-2.5 text-[11px] text-stone-500">
                      <li>• Hotline: +91 91122 30606</li>
                      <li>• Inbox: sales@vardhaman.group</li>
                      <li>• Link: www.vardhaman.group</li>
                    </ul>
                  </div>
                </div>

              </div>

            </div>

            {/* Simulated Print Stamp Signature */}
            <div className="mt-12 pt-6 border-t border-dashed border-stone-300 text-center font-mono text-[9px] text-[#5D3E1A]/40 uppercase tracking-widest">
              * SECURE COOPERATIVE BUSINESS DOCUMENT // POWERED BY VARDHAMAN INDUSTRIAL GROUP // PUNE INDUSTRIAL ZONE *
            </div>

          </div>
        )}

      </div>
    </section>
  );
}

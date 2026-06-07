import React from 'react';
import { ArrowRight, Sparkles, ChefHat, ShieldCheck, Heart, Building, Award } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onDesignBespoke: () => void;
}

export default function Hero({ onExploreMenu, onDesignBespoke }: HeroProps) {
  return (
    <section id="hero-section" className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4EFEA]/60 to-white py-16 sm:py-24 lg:py-28">
      
      {/* Absolute decorative background layout element inspired by Grand Restaurant v6 */}
      <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-[#E89543]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-[#5D3E1A]/5 blur-3xl pointer-events-none" />

      {/* Decorative vertical restaurant line elements in borders */}
      <div className="absolute left-[3%] top-1/4 h-32 w-[1px] bg-[#C2612A]/20 hidden xl:block" />
      <div className="absolute right-[3%] bottom-1/4 h-32 w-[1px] bg-[#C2612A]/20 hidden xl:block" />

      <div className="w-full px-4 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          
          {/* Left copy column - Grand Restaurant luxury typography */}
          <div className="text-center lg:col-span-7 lg:text-left space-y-7">
            
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-[#C2612A]/20 px-4 py-2 font-sans text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#C2612A] shadow-sm">
              <Building className="h-3.5 w-3.5 text-[#C2612A] animate-pulse" />
              <span>Vardhaman Group Enterprise Partner Alliance</span>
            </div>
            
            <h2 className="font-serif text-4xl font-black leading-[1.15] tracking-tight text-[#5D3E1A] sm:text-5xl lg:text-5xl xl:text-6xl">
              A Highly Professional <br className="hidden sm:block" />
              <span className="font-serif italic text-[#C2612A] font-normal lowercase tracking-tight">"bakery solution"</span> <br className="hidden sm:block" />
              for Fine Cafés &amp; Delis
            </h2>
            
            <p className="font-sans text-sm leading-relaxed text-stone-600 max-w-2xl mx-auto lg:mx-0 font-medium pb-2">
              Cakey and Cookie Bakers delivers elite B2B confectionery distribution services. Supplying prestige catering houses, boutique hotel banquets, and supermarket chains across Pune, Mumbai, and India with our strictly consistent cookies, flaky cream rolls, saffron toast packs, and beautiful display cake foundations.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start pt-2">
              <button
                id="hero-order-online-btn"
                onClick={onExploreMenu}
                className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#5D3E1A] hover:bg-[#442C12] px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.16em] text-white shadow-xl transition-all hover:translate-y-[-1px] focus:outline-none"
              >
                <span>Browse Wholesale Catalog</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-white" />
              </button>
              
              <button
                id="hero-bespoke-btn"
                onClick={onDesignBespoke}
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border-2 border-[#C2612A] bg-white hover:bg-[#C2612A]/5 px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.16em] text-[#C2612A] transition-all focus:outline-none"
              >
                <span>B2B Contract Panel</span>
                <Sparkles className="h-4 w-4 text-[#C2612A]" />
              </button>
            </div>

            {/* Visual metrics panel in Fine-Dining aesthetic */}
            <div className="grid grid-cols-3 gap-4 border-t border-stone-200/80 pt-8 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5D3E1A]/5 text-[#C2612A] mb-2.5">
                  <ChefHat className="h-4 w-4 text-[#C2612A]" />
                </div>
                <h4 className="font-serif text-sm font-bold text-[#5D3E1A] uppercase tracking-wider">The 1000th Cookie Rule</h4>
                <p className="font-sans text-xs text-stone-400 mt-1 font-medium italic">Our strict mathematical baking consistency</p>
              </div>
              
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left border-l border-stone-200 pl-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C2612A]/5 text-[#C2612A] mb-2.5">
                  <ShieldCheck className="h-4 w-4 text-[#C2612A]" />
                </div>
                <h4 className="font-serif text-sm font-bold text-[#5D3E1A] uppercase tracking-wider">Sterile Baking Plant</h4>
                <p className="font-sans text-xs text-stone-400 mt-1 font-medium italic">Highest certifications of pure safety</p>
              </div>

              <div className="flex flex-col items-center lg:items-start text-center lg:text-left border-l border-stone-200 pl-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E89543]/10 text-[#5D3E1A] mb-2.5">
                  <Award className="h-4 w-4 text-[#C2612A]" />
                </div>
                <h4 className="font-serif text-sm font-bold text-[#5D3E1A] uppercase tracking-wider">Legacy of Trust</h4>
                <p className="font-sans text-xs text-stone-400 mt-1 font-medium italic">Backed by Vardhaman Group governance</p>
              </div>
            </div>
          </div>

          {/* Right graphics column - Fine-Dining overlapping framing representation */}
          <div className="relative flex justify-center lg:col-span-5 col-span-1">
            <div className="relative w-full max-w-md">
              
              {/* Elegant Grand Restaurant frame style with gold border card */}
              <div className="overflow-hidden rounded-[32px] bg-white p-3.5 shadow-[0_15px_40px_-15px_rgba(93,62,26,0.15)] transition-all duration-500 hover:scale-[1.01] border border-stone-250">
                <div className="relative h-72 sm:h-96 w-full overflow-hidden rounded-[24px]">
                  <img
                    src="/src/assets/images/almond_slice_cake_1780047322967.png"
                    alt="Wholesale Cake Presentation"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover pr-0 bg-stone-100 transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 rounded-full bg-[#5D3E1A]/80 backdrop-blur-md px-4 py-1.5 font-sans text-[9px] font-extrabold uppercase tracking-[0.16em] text-white">
                    Vardhaman Confectionery Lab
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[10px] font-bold text-[#C2612A] uppercase tracking-[0.18em]">Prime Selection Highlight</span>
                    <div className="flex items-center gap-1 text-[11px] text-[#E89543] font-bold">
                      <span>★ 5.0 Global Rating</span>
                    </div>
                  </div>
                  <h3 className="mt-2.5 font-serif text-lg font-bold text-[#5D3E1A] tracking-tight">Elite Display Cake Slabs</h3>
                  <p className="mt-1.5 font-sans text-xs text-stone-500 leading-relaxed italic">
                    Lovingly pre-sliced to perfection, ready for display counter integration at premium coffeehouses.
                  </p>
                </div>
              </div>

              {/* Decorative overlapping geometric card elements */}
              <div className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-[28px] bg-[#E89543]/20 shadow-lg blur-md opacity-50" />
              <div className="absolute -top-6 -right-6 -z-10 h-32 w-32 rounded-[28px] bg-[#5D3E1A]/10 shadow-lg blur-md opacity-50" />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

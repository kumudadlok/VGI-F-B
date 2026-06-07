import React, { useState, useEffect } from 'react';
import { Sparkles, Star, Plus, Minus, Check, ShoppingBag, X, Package, ShieldCheck, HelpCircle } from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { MENU_ITEMS } from '../data';
import B2BProductSpecTable from './B2BProductSpecTable';

interface MenuSectionProps {
  onAddToCart: (item: CartItem) => void;
}

export default function MenuSection({ onAddToCart }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cakes' | 'cookies'>('all');
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Customization choices state
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [selectedIcing, setSelectedIcing] = useState('');
  const [decorationText, setDecorationText] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showAddedToast, setShowAddedToast] = useState(false);
  const [lastAddedName, setLastAddedName] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (cat: typeof selectedCategory) => {
    setIsLoading(true);
    setSelectedCategory(cat);
    setTimeout(() => {
      setIsLoading(false);
    }, 450);
  };

  const filteredItems = selectedCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  const handleOpenCustomizer = (item: MenuItem) => {
    setActiveItem(item);
    setSelectedSize(item.options?.sizes?.[0] || '');
    setSelectedFlavor(item.options?.flavors?.[0] || '');
    setSelectedIcing(item.options?.icings?.[0] || '');
    setDecorationText('');
    setSpecialRequests('');
    setQuantity(1);
  };

  const handleCloseCustomizer = () => {
    setActiveItem(null);
  };

  const handleConfirmAdd = () => {
    if (!activeItem) return;

    const cartItem: CartItem = {
      id: `${activeItem.id}-${selectedSize}-${selectedFlavor}-${selectedIcing}`,
      menuItem: activeItem,
      quantity,
      selectedSize,
      selectedFlavor,
      selectedIcing,
      decorationText: decorationText.trim() || undefined,
      specialRequests: specialRequests.trim() || undefined
    };

    onAddToCart(cartItem);
    setLastAddedName(activeItem.name);
    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 3000);
    handleCloseCustomizer();
  };

  return (
    <section id="online-menu" className="py-20 sm:py-28 bg-[#FAFAF8] border-b border-stone-150">
      <div className="w-full px-4 sm:px-8 lg:px-14">
        
        {/* Grand Restaurant Section Headings */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-serif italic text-sm text-[#C2612A] tracking-wider block mb-2">Our Wholesale Selections</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#5D3E1A] tracking-tight uppercase">
            Signature <span className="font-serif italic block font-normal lowercase mt-1 text-[#C2612A]">bakery menu lines</span>
          </h2>
          <div className="h-[1px] w-20 bg-[#C2612A] mx-auto my-6" />
          <p className="font-sans text-xs sm:text-sm text-stone-605 max-w-lg mx-auto text-stone-500 leading-relaxed font-medium">
            Formulated at our centralized Pune MIDC production facility with absolute consistency rules. Supplying elite tea lounges, cafe franchises, and retail supermarket shelves nationwide.
          </p>
        </div>

        {/* Dynamic Add Success Floating Toast */}
        {showAddedToast && (
          <div id="item-added-badge" className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-[#5D3E1A] text-white px-5 py-4 shadow-2xl animate-fade-in font-sans text-sm font-medium border border-[#442C12]">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E89543]/20 text-[#E89543]">
              <Check className="h-4 w-4 stroke-[3]" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#E89543] font-bold leading-none">Catalog Order Added</p>
              <p className="mt-1 font-semibold text-neutral-50">{lastAddedName} selected for consignment details!</p>
            </div>
          </div>
        )}

        {/* Premium Tab Bar Filters in Minimalist Style */}
        <div id="category-filter-tabs" className="flex flex-wrap items-center justify-center gap-3 mb-16 pb-8 border-b border-stone-200/60">
          {(['all', 'cookies', 'cakes'] as const).map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`cat-btn-${cat}`}
                onClick={() => handleCategoryChange(cat)}
                className={`rounded-full px-7 py-2.5 font-sans text-xs font-bold transition-all uppercase tracking-[0.14em] focus:outline-none cursor-pointer ${
                  isActive
                    ? 'bg-[#5D3E1A] text-white shadow-md'
                    : 'bg-white text-stone-600 hover:bg-stone-50 hover:text-stone-900 border border-stone-200'
                }`}
              >
                {cat === 'all' ? 'All B2B Lines' : cat === 'cookies' ? 'Cookies, Rolls & Toast' : 'Celebration Cakes'}
              </button>
            );
          })}
        </div>

        {/* Grand Restaurant Demo 5 Replica Dotted Menu List Layout */}
        <div id="products-list-replica" className="space-y-12">
          {isLoading ? (
            <div id="menu-skeletons" className="space-y-12">
              {Array.from({ length: 4 }).map((_, i) => (
                <div 
                  key={i} 
                  className="flex flex-col sm:flex-row gap-6 items-start pb-8 border-b border-dashed border-stone-200"
                >
                  <div className="h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 rounded-2xl bg-stone-100 shimmer-bg border border-stone-200" />
                  <div className="flex-1 w-full space-y-3.5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="h-5 rounded-md shimmer-bg w-1/3" />
                      <div className="h-5 rounded-md shimmer-bg w-14" />
                    </div>
                    <div className="h-3.5 rounded-md shimmer-bg w-1/4" />
                    <div className="h-3.5 rounded-md shimmer-bg w-3/4" />
                    <div className="pt-2 flex justify-between items-center">
                      <div className="h-3.5 rounded-md shimmer-bg w-1/3" />
                      <div className="h-8 rounded-lg shimmer-bg w-36" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                id={`product-card-${item.id}`}
                className="group flex flex-col sm:flex-row gap-6 items-start pb-8 border-b border-dashed border-stone-200 last:border-0"
              >
              {/* Image thumbnail with perfect high-end curves and shadows */}
              <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 overflow-hidden rounded-2xl bg-[#FAFAF8] border border-stone-200 shadow-sm">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-1 right-1 rounded bg-[#E89543] text-white px-1 py-0.5 text-[8px] font-bold uppercase tracking-wider">
                  ★ {item.rating}
                </span>
              </div>

              {/* Item details + Dot Leader + Interactive Trigger */}
              <div className="flex-1 w-full">
                
                {/* Header Line without Price / Dot Leaders */}
                <div className="flex items-end justify-between w-full">
                  <h3 className="font-serif text-lg font-bold text-[#5D3E1A] tracking-tight group-hover:text-[#C2612A] transition-colors leading-tight">
                    {item.name}
                  </h3>
                </div>

                {/* Subheading line with B2B highlights */}
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-stone-400">
                    {item.category === 'cookies' ? 'Vardhaman Bakery Line' : 'Exquisite Banquet Solution'}
                  </span>
                  <span className="text-stone-300 text-xs">•</span>
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-sans font-bold uppercase tracking-wider text-[#C2612A]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Item description */}
                <p className="mt-2.5 font-sans text-xs leading-relaxed text-stone-500 max-w-3xl italic">
                  {item.description}
                </p>

                {/* Bottom configuring action */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[11px] font-sans text-stone-400 font-medium">
                    White-label ready • Custom recipe configurations allowed
                  </span>
                  
                  <button
                    id={`customize-add-${item.id}`}
                    onClick={() => handleOpenCustomizer(item)}
                    className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#5D3E1A]/5 hover:bg-[#5D3E1A]/10 text-[#5D3E1A] border border-[#5D3E1A]/10 font-sans text-xs font-extrabold leading-none px-4.5 transition-all focus:outline-none"
                  >
                    <Plus className="h-3.5 w-3.5 text-[#5D3E1A]" />
                    <span>Configure Consignment Crate</span>
                  </button>
                </div>

              </div>
            </div>
          )))}
        </div>

        {/* B2B Sizing & Specifications Table integrated on Services page */}
        <div id="services-b2b-specs-block" className="mt-20 border-t border-stone-200/60 pt-16">
          <B2BProductSpecTable />
        </div>

      </div>

      {/* --- CUSTOMIZATION DIALOG / MODAL (B2B SPECIFIC) --- */}
      {activeItem && (
        <div id="customizer-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div
            id="customizer-dialog"
            className="relative w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-stone-100 animate-scale"
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-100 bg-white/95 px-6 py-4">
              <div>
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#C2612A]">Vardhaman Group • Contract Formulator</span>
                <h3 className="font-serif text-xl font-bold text-[#5D3E1A] mt-0.5">{activeItem.name}</h3>
              </div>
              <button
                id="close-customizer-btn"
                onClick={handleCloseCustomizer}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-50 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
              
              {/* Product Visual */}
              <div className="md:col-span-5">
                <div className="overflow-hidden rounded-xl bg-stone-50 border border-stone-150 shadow-sm">
                  <img
                    src={activeItem.image}
                    alt={activeItem.name}
                    referrerPolicy="no-referrer"
                    className="h-48 w-full object-cover md:h-64"
                  />
                  <div className="p-4 bg-stone-50 text-stone-600 font-sans text-xs">
                    <p className="font-bold text-[#C2612A] uppercase text-[10px] tracking-wider">Solution Specification</p>
                    <p className="mt-1 leading-relaxed text-stone-550 italic">{activeItem.description}</p>
                    <p className="font-bold text-stone-800 mt-3 flex items-center gap-1">
                      <ShieldCheck className="h-4 w-4 text-emerald-650" />
                      Sterile baking certification rules
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Options */}
              <div className="md:col-span-7 flex flex-col gap-4">
                
                {/* Size Selection (Container case rates) */}
                {activeItem.options?.sizes && (
                  <div id="size-options-container">
                    <label className="font-sans text-xs font-bold uppercase tracking-wider text-stone-500">Select Crate / Carton Size</label>
                    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {activeItem.options.sizes.map((sz) => (
                        <button
                          key={sz}
                          id={`size-choice-${sz}`}
                          onClick={() => setSelectedSize(sz)}
                          className={`rounded-xl border p-3 font-sans text-xs text-left transition-all ${
                            selectedSize === sz
                              ? 'border-[#C2612A] bg-[#C2612A]/5 text-[#C2612A] font-bold shadow-sm'
                              : 'border-stone-100 bg-stone-50 text-stone-600 hover:bg-stone-100'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`block h-3 w-3 rounded-full border ${selectedSize === sz ? 'bg-[#C2612A] border-[#C2612A]' : 'bg-white border-stone-300'}`} />
                            <span>{sz}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Flavor Selection (Formulation specs) */}
                {activeItem.options?.flavors && (
                  <div id="flavor-options-container">
                    <label className="font-sans text-xs font-bold uppercase tracking-wider text-stone-500">Pick Formulation / Special Ingredients</label>
                    <div className="mt-2 grid grid-cols-1 gap-2">
                      {activeItem.options.flavors.map((fl) => (
                        <button
                          key={fl}
                          id={`flavor-choice-${fl}`}
                          onClick={() => setSelectedFlavor(fl)}
                          className={`rounded-xl border p-3 font-sans text-xs text-left transition-all ${
                            selectedFlavor === fl
                              ? 'border-[#C2612A] bg-[#C2612A]/5 text-[#C2612A] font-bold shadow-sm'
                              : 'border-stone-100 bg-stone-50 text-stone-600 hover:bg-stone-100'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`block h-3 w-3 rounded-full border ${selectedFlavor === fl ? 'bg-[#C2612A] border-[#C2612A]' : 'bg-white border-stone-300'}`} />
                            <span>{fl}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Icing/frosting Selection (Packaging rules branding) */}
                {activeItem.options?.icings && (
                  <div id="icing-options-container">
                    <label className="font-sans text-xs font-bold uppercase tracking-wider text-stone-500">Packaging &amp; Presentation Rule</label>
                    <div className="mt-2 grid grid-cols-1 gap-2">
                      {activeItem.options.icings.map((ic) => (
                        <button
                          key={ic}
                          id={`icing-choice-${ic}`}
                          onClick={() => setSelectedIcing(ic)}
                          className={`rounded-xl border p-3 font-sans text-xs text-left transition-all ${
                            selectedIcing === ic
                              ? 'border-[#C2612A] bg-[#C2612A]/5 text-[#C2612A] font-bold shadow-sm'
                              : 'border-stone-100 bg-stone-50 text-stone-600 hover:bg-stone-100'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`block h-3 w-3 rounded-full border ${selectedIcing === ic ? 'bg-[#C2612A] border-[#C2612A]' : 'bg-white border-stone-300'}`} />
                            <span>{ic}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Special requests textbox */}
                <div id="other-requests-container">
                  <label className="font-sans text-xs font-bold uppercase tracking-wider text-stone-500">Consignment Marking / Special Baker Guidelines</label>
                  <textarea
                    id="other-requests-input"
                    rows={2}
                    placeholder="E.g., print specific barcode labels, 100% pure eggless formula required, etc."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 p-3 text-xs outline-none focus:border-[#C2612A] focus:bg-white transition-all resize-none"
                  />
                </div>

              </div>
            </div>

            {/* Modal Footer with pricing and button details */}
            <div className="sticky bottom-0 z-10 border-t border-stone-100 bg-[#FAFAF8]/95 backdrop-blur-md px-6 py-5 flex flex-wrap items-center justify-between gap-4">
              {/* Quantity Selector */}
              <div id="qty-selector" className="flex items-center gap-3">
                <button
                  id="qty-minus"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 transition"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-sans text-sm font-bold text-[#5D3E1A] w-12 text-center">{quantity} Crate{quantity > 1 ? 's' : ''}</span>
                <button
                  id="qty-plus"
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 transition"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Valuation details */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-sans text-[9px] uppercase font-bold tracking-wider text-stone-400">Dispatch Valuation</p>
                  <p className="font-serif text-sm font-bold text-[#C2612A] uppercase tracking-wider">
                    Quote on Request
                  </p>
                </div>
                
                <button
                  id="submit-customizer-btn"
                  onClick={handleConfirmAdd}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#5D3E1A] hover:bg-[#442C12] px-6 py-3 font-sans text-xs font-bold text-white shadow-md transition"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Add Consignment</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

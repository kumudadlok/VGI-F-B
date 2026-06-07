import React, { useState, useEffect } from 'react';
import { Sparkles, X, Star, Heart, ZoomIn, Grid } from 'lucide-react';
import B2BProductSpecTable from './B2BProductSpecTable';

interface GalleryItem {
  id: string;
  title: string;
  category: 'cookies' | 'cakes' | 'rolls' | 'toast';
  image: string;
  description: string;
  client: string;
  stars: number;
  unit: string;
  master: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-prod-1',
    title: 'Chocolate Crunch / Jaggery Oats / Almond Coconut Cookies',
    category: 'cookies',
    image: '/src/assets/images/choco_crunch_1780047370556.png',
    description: 'Elite gourmet cafe biscuit cookies baked freshly in Chocolate Crunch, Jaggery Oats, and Almond Coconut profiles.',
    client: 'The Bean Haven Cafés, Pune & Mumbai',
    stars: 5,
    unit: '75 Pcs',
    master: '1 Box'
  },
  {
    id: 'gal-prod-2',
    title: 'Finger Cake (Box Pack & Jar Pack)',
    category: 'cakes',
    image: '/src/assets/images/vardhaman_finger_cakes_1780047956346.png',
    description: 'Perfectly baked golden sponge finger cakes by Vardhaman Foods. Configured for maximum freshness and long shelf-life in both retail boxes and protective jars.',
    client: 'Vardhaman Foods Alliance',
    stars: 5,
    unit: '50 Pcs / 24 Pcs',
    master: '1 Box'
  },
  {
    id: 'gal-prod-3',
    title: 'Cream Roll',
    category: 'rolls',
    image: '/src/assets/images/cream_roll_box_1780047413276.png',
    description: 'Flaky multi-layered golden pastry horns generously piping whipped organic Madagascar vanilla bean sweet cream.',
    client: 'Taj Gateway Banquets & Cafe Chains',
    stars: 5,
    unit: '24 Pcs',
    master: '1 Box'
  },
  {
    id: 'gal-prod-4',
    title: 'Almond Slice Cake',
    category: 'cakes',
    image: '/src/assets/images/almond_slice_cake_1780047322967.png',
    description: 'Moist golden tea cake slices loaded with sliced Californian almonds. Standardized texture for hospitality counters.',
    client: 'Highway Treats & Grand Banquets',
    stars: 5,
    unit: '40 Pcs * 6 Jar',
    master: '1 Box'
  },
  {
    id: 'gal-prod-5',
    title: 'Cookies (Choco Crunch / Jaggery Oats / Almond Coconut)',
    category: 'cookies',
    image: '/src/assets/images/jaggery_oats_1780047395262.png',
    description: 'Crisp cookie selections packed directly inside professional-tier airtight transparent display jars to grab retail customer focus.',
    client: 'Vardhaman Supermarkets Group',
    stars: 5,
    unit: '40 Pcs * 6 Jar',
    master: '1 Box'
  },
  {
    id: 'gal-prod-6',
    title: 'Karela Cookies / Pista Cookies / Makkhan Tost',
    category: 'toast',
    image: '/src/assets/images/pistachio_cookies_1780047447191.png',
    description: 'Salty-sweet Karela-shaped biscuits, buttery crunch Pistachio cookies, and crispy traditional milk-butter Makkhan Tost rusks.',
    client: 'Vardhaman Supermarkets Group',
    stars: 5,
    unit: '40 Pcs * 6 Jar',
    master: '1 Box'
  },
  {
    id: 'gal-prod-7',
    title: 'Butter Khari / Usmania Cookies',
    category: 'toast',
    image: '/src/assets/images/teatime_cookies_1780047351747.png',
    description: 'Hyper-flaky Indian Butter Khari puffed tea-pastries alongside crumbly Hyderabad style Usmania sweet-salt cookies.',
    client: 'Vardhaman Supermarkets Group',
    stars: 5,
    unit: '40 Pcs * 6 Jar',
    master: '1 Box'
  }
];

export default function GallerySection() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'cookies' | 'cakes' | 'rolls' | 'toast'>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (filter: typeof selectedFilter) => {
    setIsLoading(true);
    setSelectedFilter(filter);
    setTimeout(() => {
      setIsLoading(false);
    }, 450);
  };

  const filteredItems = selectedFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedFilter);

  const filterTabs = [
    { id: 'all', label: 'All B2B Showcase' },
    { id: 'cookies', label: 'Cookies' },
    { id: 'cakes', label: 'Cakes' },
    { id: 'rolls', label: 'Cream Rolls' },
    { id: 'toast', label: 'Toast & Khari' }
  ];

  return (
    <section id="past-creations-gallery" className="py-16 sm:py-24 bg-neutral-50/50 border-b border-neutral-100">
      <div className="w-full px-4 sm:px-8 lg:px-14">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-full border border-amber-100 text-[#c2612a] text-[10px] font-bold uppercase tracking-wider mb-2">
            <Grid className="h-3.5 w-3.5 text-[#c2612a]" />
            <span>Active Partner Showroom</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#5D3E1A] tracking-tight">
            Wholesale <span className="font-serif italic text-[#c2612a] font-normal">Solutions Gallery</span>
          </h2>
          <p className="mt-4 font-sans text-sm text-neutral-500">
            Real photos and standard packaging configurations of our signature Cookies, Cakes, Cream Rolls, and Toast supplied directly to leading commercial retail networks.
          </p>
        </div>

        {/* Filter Bar */}
        <div id="gallery-filters" className="flex flex-wrap items-center justify-center gap-2 mb-10 border-b border-stone-150 pb-6">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                id={`filter-${tab.id}`}
                onClick={() => handleFilterChange(tab.id as any)}
                className={`rounded-xl px-5 py-2.5 font-sans text-xs sm:text-sm font-bold transition-all uppercase tracking-wider focus:outline-none cursor-pointer ${
                  isActive
                    ? 'bg-[#5D3E1A] text-white shadow-md'
                    : 'bg-white text-neutral-500 hover:bg-neutral-50 border border-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid or Skeleton */}
        {isLoading ? (
          <div id="gallery-skeletons" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div 
                key={i} 
                className="aspect-[4/3] rounded-3xl border border-neutral-150 bg-white p-6 flex flex-col justify-end space-y-3 shadow-xs"
              >
                <div className="h-4 rounded-md shimmer-bg w-1/4" />
                <div className="h-6 rounded-md shimmer-bg w-2/3" />
                <div className="h-4 rounded-md shimmer-bg w-1/2" />
                <div className="pt-3 border-t border-neutral-100 flex justify-between items-center">
                  <div className="h-3.5 rounded-md shimmer-bg w-1/3" />
                  <div className="h-3.5 rounded-md shimmer-bg w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div id="gallery-grid" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                id={`gallery-card-${item.id}`}
                onClick={() => setLightboxItem(item)}
                className="text-left group relative aspect-[4/3] overflow-hidden rounded-3xl bg-neutral-200 border border-neutral-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5D3E1A] cursor-pointer animate-fade-in"
              >
                {/* Image with zoom */}
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Soft overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/25 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                {/* Magnifying glass overlay */}
                <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="h-4.5 w-4.5 text-white" />
                </div>

                {/* Text details */}
                <div className="absolute bottom-0 left-0 w-full p-5 text-white">
                  <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#E89543]">
                    {item.category.toUpperCase()} LINE
                  </span>
                  <h3 className="mt-1 font-serif text-sm sm:text-md font-bold text-neutral-50 leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-1 font-sans text-[10px] text-neutral-300 line-clamp-1 italic">
                    Partner: {item.client}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between border-t border-white/10 pt-2 text-[10px] font-medium font-sans text-amber-200">
                    <span>Unit: {item.unit} • Master: {item.master}</span>
                    <span className="flex text-amber-400">★ ★ ★ ★ ★</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Home page integrated specs table - showing the products given in the reference image */}
        <div id="home-b2b-specs-table-block" className="mt-20 border-t border-neutral-200/60 pt-16">
          <B2BProductSpecTable />
        </div>

      </div>

      {/* --- GALLERY LIGHTBOX MODAL --- */}
      {lightboxItem && (
        <div id="lightbox-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div
            id="lightbox-dialog"
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 text-white shadow-2xl animate-scale"
          >
            {/* Close button */}
            <button
              id="close-lightbox"
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-xl bg-black/40 backdrop-blur-md text-neutral-300 hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Visual */}
              <div className="relative h-64 md:h-[420px]">
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Details Body */}
              <div className="flex flex-col justify-between p-6 sm:p-8 bg-neutral-950">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-3">
                    <span className="rounded-lg bg-[#E89543]/10 border border-[#E89543]/30 px-3 py-1 font-sans text-[9px] uppercase font-bold tracking-wider text-[#E89543]">
                      {lightboxItem.category.toUpperCase()} SOLUTION
                    </span>
                    <span className="font-sans text-[10px] text-neutral-400 italic">
                      {lightboxItem.client}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
                    {lightboxItem.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-amber-400 text-sm">
                    {Array.from({ length: lightboxItem.stars }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                    <span className="font-sans text-[11px] text-neutral-400 ml-1">(5.0/5.0 B2B consistency approved)</span>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 mt-4">
                    <h4 className="font-sans text-[10px] font-bold uppercase tracking-wider text-amber-300">Specifications &amp; Quality Metrics</h4>
                    <p className="mt-1.5 font-sans text-xs leading-relaxed text-neutral-350 mb-3">
                      {lightboxItem.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px]">
                      <div>
                        <span className="text-neutral-400 font-sans block text-[9px] uppercase">Unit Packaging</span>
                        <span className="font-bold text-white">{lightboxItem.unit}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 font-sans block text-[9px] uppercase">Master Case Shipment</span>
                        <span className="font-bold text-white">{lightboxItem.master}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-emerald-400">Active Supply line</span>
                  </div>
                  
                  <button
                    id="contact-lightbox-btn"
                    onClick={() => {
                      setLightboxItem(null);
                      // Scroll to or open custom inquiries
                      const btn = document.getElementById('hero-bespoke-btn');
                      if (btn) btn.click();
                    }}
                    className="rounded-lg bg-[#5D3E1A] px-4 py-2 font-sans text-xs font-bold text-white hover:bg-[#442C12] transition"
                  >
                    Request Partner Solutions
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BusinessProfile from './components/BusinessProfile';
import MenuSection from './components/MenuSection';
import BespokeForm from './components/BespokeForm';
import GallerySection from './components/GallerySection';
import ReviewsSection from './components/ReviewsSection';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import TrackerDashboard from './components/TrackerDashboard';
import Logo from './components/Logo';
import OrderHistory from './components/OrderHistory';
import { CartItem, Review, Order, OrderStatus } from './types';
import { INITIAL_REVIEWS } from './data';
import { Phone, Mail, MapPin, Clock, Heart, Sparkles, Star, ChevronUp, Bell, ShieldCheck, Award, Instagram, Facebook } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync state with local storage on loading
  useEffect(() => {
    const storedCart = localStorage.getItem('ccb_cart');
    const storedReviews = localStorage.getItem('ccb_reviews');
    const storedOrder = localStorage.getItem('ccb_last_order');

    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedReviews) setReviews(JSON.parse(storedReviews));
    if (storedOrder) setLastPlacedOrder(JSON.parse(storedOrder));
  }, []);

  // Save changes to localStorage helper
  const updateCartState = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('ccb_cart', JSON.stringify(newCart));
  };

  const handleAddToCart = (newItem: CartItem) => {
    const existingIdx = cart.findIndex((i) => i.id === newItem.id);
    if (existingIdx > -1) {
      const copy = [...cart];
      copy[existingIdx].quantity += newItem.quantity;
      updateCartState(copy);
    } else {
      updateCartState([...cart, newItem]);
    }
  };

  const handleUpdateCartQty = (id: string, newQty: number) => {
    const copy = cart.map((item) => (item.id === id ? { ...item, quantity: newQty } : item));
    updateCartState(copy);
  };

  const handleRemoveCartItem = (id: string) => {
    const copy = cart.filter((item) => item.id !== id);
    updateCartState(copy);
  };

  const handleAddReview = (newRev: Review) => {
    const updatedReviews = [newRev, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('ccb_reviews', JSON.stringify(updatedReviews));
  };

  const handleOrderCreated = (order: Order) => {
    setLastPlacedOrder(order);
    localStorage.setItem('ccb_last_order', JSON.stringify(order));
    updateCartState([]); // Wipe cart on checkout success
    setIsCheckoutOpen(false);
    setActiveSection('tracker'); // Jump straight into tracking view

    // Trigger instant scroll to focal top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSimulateStatusChange = (status: OrderStatus) => {
    if (!lastPlacedOrder) return;

    const updatedTimeline = lastPlacedOrder.timeline.map((evt) => {
      let completed = false;
      let time = evt.time;

      if (status === 'placed' && evt.status === 'placed') completed = true;
      if (status === 'baking' && (evt.status === 'placed' || evt.status === 'baking')) {
        completed = true;
        if (evt.status === 'baking') time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      }
      if (status === 'decorating' && (evt.status === 'placed' || evt.status === 'baking' || evt.status === 'decorating')) {
        completed = true;
        if (evt.status === 'decorating') time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      }
      if (status === 'out_for_delivery' && (evt.status !== 'delivered')) {
        completed = true;
        if (evt.status === 'out_for_delivery') time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      }
      if (status === 'delivered') {
        completed = true;
        time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      }

      return { ...evt, completed, time };
    });

    const updatedOrder: Order = {
      ...lastPlacedOrder,
      status,
      timeline: updatedTimeline
    };

    setLastPlacedOrder(updatedOrder);
    localStorage.setItem('ccb_last_order', JSON.stringify(updatedOrder));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="application-layout" className="min-h-screen w-full max-w-[1360px] mx-auto bg-white relative flex flex-col justify-between selection:bg-[#FAF8F5] selection:text-[#5D3E1A] shadow-2xl border-x border-stone-200/50">
      
      {/* Scroll to Top Arrow Button styled in chocolate brown */}
      {showScrollTop && (
        <button
          id="scroll-to-top-button"
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 flex h-11 w-11 items-center justify-center rounded-xl bg-[#5D3E1A] hover:bg-[#442C12] text-white shadow-xl transition focus:outline-none border border-stone-200"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}

      {/* Main Header with Exact Customized 5 Tabs and Custom Vector Logo */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        setActiveSection={(sec) => {
          setActiveSection(sec);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        trackedOrderId={lastPlacedOrder?.id || null}
        onOpenTracker={() => {
          setActiveSection('tracker');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenHistory={() => setIsHistoryOpen(true)}
      />

      {/* Primary Context body switcher mapping exactly to the 5 requested tabs */}
      <main className="flex-1">
        
        {/* TAB 1: HOME SECTION (Hero + Selected Highlights + Creative Gallery Intro) */}
        {activeSection === 'home' && (
          <div id="home-viewport" className="space-y-0 animate-fade-in">
            <Hero
              onExploreMenu={() => {
                setActiveSection('services');
                scrollToTop();
              }}
              onDesignBespoke={() => {
                setActiveSection('contact');
                scrollToTop();
              }}
            />
            
            {/* Grand Restaurant Demo Chef's Statement Quote block */}
            <section className="bg-[#5c3d1a] py-20 text-white">
              <div className="w-full px-4 sm:px-8 lg:px-14 text-center">
                <span className="font-serif italic text-[#E89543] text-sm tracking-wider">A Tradition of Sterile Baking Science</span>
                <h3 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight uppercase leading-tight">
                  Where Baking Consistency <br />
                  <span className="font-serif italic text-[#E89543] font-normal lowercase tracking-tight">meets absolute pure scale</span>
                </h3>
                <div className="h-[2px] w-12 bg-[#E89543] mx-auto my-6" />
                <p className="font-sans text-xs sm:text-sm text-[#F4EFEA] leading-relaxed max-w-2xl mx-auto font-medium opacity-90">
                  We implement mathematical formulas across our Pune MIDC confectionery facility to guarantee that the thousandth cookie or cream roll inside a consignment carton delivers the precise moisture, texture, and buttery flake of the verified master bake.
                </p>
                <div className="mt-10 flex justify-center gap-6 sm:gap-10 flex-wrap font-sans text-stone-300 text-[11px] font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-2 text-[#EADED2]"><Award className="h-4 w-4 text-[#E89543]" /> Standardized Dimensions</span>
                  <span className="flex items-center gap-2 text-[#EADED2]"><ShieldCheck className="h-4 w-4 text-[#E89543]" /> Direct Carrier Routing</span>
                  <span className="flex items-center gap-2 text-[#EADED2]"><Sparkles className="h-4 w-4 text-[#E89543]" /> FSSAI Certified Plant</span>
                </div>
              </div>
            </section>

            {/* Quick Gallery showcase on Home page */}
            <div id="home-gallery-showcase">
              <GallerySection />
            </div>

            {/* Interactive Custom Map Section Separately Above the Footer on Home page */}
            <section id="home-map-section" className="py-20 bg-stone-50 border-t border-stone-200">
              <div className="w-full px-4 sm:px-8 lg:px-14 text-center">
                <span className="font-serif italic text-sm text-[#C2612A] tracking-wider block mb-2">Our Plant Location</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#5D3E1A] uppercase tracking-tight mb-4">
                  Pune MIDC Confectionery Manufacturing Plant
                </h3>
                <p className="font-sans text-xs sm:text-sm text-stone-500 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
                  Located in Pune's major manufacturing cluster (MIDC), our plant is equipped with state-of-the-art sterile baking automation. Navigate utilizing the live interactive map below:
                </p>
                <div className="overflow-hidden rounded-3xl border border-stone-250 p-2.5 bg-white shadow-xl w-full mx-auto">
                  <div className="rounded-2xl overflow-hidden h-96 sm:h-[450px] bg-stone-100 border border-stone-150">
                    <iframe
                      title="Cakey and Cookie Bakers Location Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.4091161113465!2d73.77976407595867!3d18.64562856534071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9ecf62695e5%3A0xb07327c56a739da7!2sVardhaman%20Group%20Of%20India!5e0!3m2!1sen!2sin!4v1780044775096!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: ABOUT US SECTION (Official Editorial Profile View) */}
        {activeSection === 'about' && (
          <div id="about-viewport" className="animate-fade-in">
            <BusinessProfile 
              onExploreCatalog={() => {
                setActiveSection('services');
                scrollToTop();
              }} 
              onPartnerInquiry={() => {
                setActiveSection('contact');
                scrollToTop();
              }} 
            />
          </div>
        )}

        {/* TAB 3: OUR SERVICES SECTION (Wholesale Menu listings with dot leader pricing format) */}
        {activeSection === 'services' && (
          <div id="services-viewport" className="animate-fade-in">
            <MenuSection onAddToCart={handleAddToCart} />
          </div>
        )}

        {/* TAB 4: WHY CHOOSE US SECTION (Pillars + Client FeedbacksBoard) */}
        {activeSection === 'features' && (
          <div id="features-viewport" className="animate-fade-in">
            
            {/* Features highlight */}
            <section className="py-20 bg-white border-b border-stone-200/60">
              <div className="w-full px-4 sm:px-8 lg:px-14">
                
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <span className="font-serif italic text-[#C2612A] text-sm tracking-wider block mb-2">Why Corporate Partners Choose Us</span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#5D3E1A] tracking-tight uppercase">
                    The Vardhaman <span className="font-serif italic block font-normal lowercase mt-1 text-[#C2612A]">bakery science protocol</span>
                  </h2>
                  <div className="h-[1px] w-20 bg-[#C2612A] mx-auto my-6" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="p-6.5 rounded-2xl bg-[#FAFAF8] border border-stone-200">
                    <span className="font-serif italic text-2xl text-[#C2612A] font-bold block mb-3">01</span>
                    <h4 className="font-serif text-base font-bold text-[#5D3E1A] uppercase tracking-wider">Unshakable Scalability</h4>
                    <p className="font-sans text-xs text-stone-500 leading-relaxed mt-2 font-medium">
                      Built to supply cafe franchises and supermarkets with secure weekly cargo consignments, irrespective of peak seasonal peaks or logistical shifts.
                    </p>
                  </div>

                  <div className="p-6.5 rounded-2xl bg-[#FAFAF8] border border-stone-200">
                    <span className="font-serif italic text-2xl text-[#C2612A] font-bold block mb-3">02</span>
                    <h4 className="font-serif text-base font-bold text-[#5D3E1A] uppercase tracking-wider">Tailorable Formulations</h4>
                    <p className="font-sans text-xs text-stone-500 leading-relaxed mt-2 font-medium">
                      Adaptable master recipes (including pure-vegetarian 100% eggless specifications, sugar-free infusions, and multi-grain fibers).
                    </p>
                  </div>

                  <div className="p-6.5 rounded-2xl bg-[#FAFAF8] border border-stone-200">
                    <span className="font-serif italic text-2xl text-[#C2612A] font-bold block mb-3">03</span>
                    <h4 className="font-serif text-base font-bold text-[#5D3E1A] uppercase tracking-wider">Sterile Facility Rules</h4>
                    <p className="font-sans text-xs text-stone-500 leading-relaxed mt-2 font-medium">
                      Baked entirely inside our advanced Pune plant operating strictly under FSSAI cleanliness protocols with automated cooling tunnels.
                    </p>
                  </div>
                </div>

              </div>
            </section>

            {/* Client Reviews Section integrated elegantly */}
            <div id="reviews-board">
              <ReviewsSection reviews={reviews} onAddReview={handleAddReview} />
            </div>
          </div>
        )}

        {/* TAB 5: CONTACT US SECTION (Address Map details AND Bespoke corporate inquiry form) */}
        {activeSection === 'contact' && (
          <div id="contact-viewport" className="animate-fade-in">
            
            {/* Elegant Map & Details Segment */}
            <section className="py-20 bg-white border-b border-stone-200/50">
              <div className="w-full px-4 sm:px-8 lg:px-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Info block */}
                  <div className="lg:col-span-5 space-y-6">
                    <span className="font-serif italic text-sm text-[#C2612A] tracking-wider block">Get In Touch</span>
                    <h3 className="font-serif text-3xl font-extrabold text-[#5D3E1A] tracking-tight uppercase leading-none">Our Pune MIDC Plant</h3>
                    <div className="h-[1px] w-20 bg-[#C2612A]" />
                    
                    <p className="font-sans text-xs sm:text-sm text-stone-500 font-medium leading-relaxed italic">
                      Visit our industrial baking complex to inspect food safety workflows, lock in commercial supply contracts, or schedule trial sample cargo deliveries.
                    </p>

                    <div className="space-y-4 pt-2 font-sans text-xs">
                      <div className="flex gap-3.5">
                        <MapPin className="h-5 w-5 text-[#C2612A] shrink-0" />
                        <div>
                          <p className="font-bold text-[#5D3E1A]">Industrial Headquarters</p>
                          <a 
                            href="https://maps.app.goo.gl/DKdJvZXqGZte87Qs9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-stone-500 hover:text-[#C2612A] hover:underline transition font-medium mt-1 block"
                          >
                            Survey No. 173/2, Pandharkar Nagar, near Beena English School, MIDC, Pune, Maharashtra 411035
                          </a>
                        </div>
                      </div>

                      <div className="flex gap-3.5">
                        <Phone className="h-4 w-4 text-[#C2612A] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-[#5D3E1A]">Direct Phone Line</p>
                          <a href="tel:+919112230606" className="text-stone-500 hover:text-[#C2612A] transition font-medium mt-1 block">
                            +91 91122 30606
                          </a>
                        </div>
                      </div>

                      <div className="flex gap-3.5">
                        <Mail className="h-4 w-4 text-[#C2612A] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-[#5D3E1A]">Corporate Inboxes</p>
                          <a href="mailto:sales@vardhaman.group" className="text-stone-500 hover:text-[#C2612A] transition font-medium mt-1 block">
                            sales@vardhaman.group
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Real interactive live Map on Contact Us page */}
                  <div className="lg:col-span-7">
                    <div className="overflow-hidden rounded-3xl border border-stone-250 p-2.5 bg-white shadow-xl">
                      <div className="relative h-80 sm:h-[420px] rounded-2xl overflow-hidden bg-stone-100 border border-stone-150">
                        <iframe
                          title="Cakey and Cookie Bakers Location Map"
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.4091161113465!2d73.77976407595867!3d18.64562856534071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9ecf62695e5%3A0xb07327c56a739da7!2sVardhaman%20Group%20Of%20India!5e0!3m2!1sen!2sin!4v1780044775096!5m2!1sen!2sin"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen={true}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Elegant Bespoke Custom Form for Inquiry */}
            <div id="custom-inquiry-builder">
              <BespokeForm onSubmitInquiry={() => {}} />
            </div>
          </div>
        )}

        {/* LOGISTICS STATUS TRACKER DASHBOARD SECTION */}
        {activeSection === 'tracker' && (
          <div id="tracker-viewport" className="animate-fade-in">
            <TrackerDashboard
              order={lastPlacedOrder}
              onSimulateStatusChange={handleSimulateStatusChange}
            />
          </div>
        )}

      </main>

      {/* Sliding Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Secure Checkout gateway billing Processing Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onOrderCreated={handleOrderCreated}
      />

      {/* B2B Client Portal Drawer */}
      <OrderHistory
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectOrder={(order) => {
          setLastPlacedOrder(order);
          setActiveSection('tracker');
          setIsHistoryOpen(false);
        }}
        lastOrder={lastPlacedOrder}
      />

      {/* Corporate B2B Footer Section redesigned to mirror Grand Restaurant exact 5 tabs */}
      <footer id="site-footer" className="bg-[#1C120B] text-stone-100 border-t border-stone-900">
        <div className="w-full px-4 py-16 sm:px-8 lg:px-14">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Branding Column with proper Logo and Socials */}
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center justify-center gap-3 w-full">
                <a
                  href="https://cakeyandcookiebackers.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-95 transition"
                  id="footer-logo-link"
                >
                  <Logo size={170} className="bg-white rounded-full p-3 shadow-md" />
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 pt-2 w-full">
                <a
                  href="https://www.instagram.com/cakeyandcookiebakers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-[#5D3E1A]/40 hover:bg-[#C2612A] text-stone-200 hover:text-white transition-all duration-250 border border-stone-800 hover:border-[#C2612A]"
                  id="instagram-link"
                  aria-label="Instagram Link"
                >
                  <Instagram className="h-4.5 w-4.5" />
                </a>
                <a
                  href="https://www.facebook.com/cakeyandcookiebakersofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-[#5D3E1A]/40 hover:bg-[#C2612A] text-stone-200 hover:text-white transition-all duration-250 border border-stone-800 hover:border-[#C2612A]"
                  id="facebook-link"
                  aria-label="Facebook Link"
                >
                  <Facebook className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>

            {/* Quick navigators mapping exactly to the 5 requested tabs */}
            <div className="space-y-3 font-sans text-xs">
              <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider">Navigation Directory</h4>
              <ul className="space-y-2 font-medium">
                <li>
                  <button onClick={() => { setActiveSection('home'); scrollToTop(); }} className="hover:text-[#FA9A55] transition text-stone-200 hover:underline cursor-pointer text-left">
                    Home Navigation
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveSection('about'); scrollToTop(); }} className="hover:text-[#FA9A55] transition text-stone-200 hover:underline cursor-pointer text-left">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveSection('services'); scrollToTop(); }} className="hover:text-[#FA9A55] transition text-stone-200 hover:underline cursor-pointer text-left">
                    Our Services
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveSection('features'); scrollToTop(); }} className="hover:text-[#FA9A55] transition text-stone-200 hover:underline cursor-pointer text-left">
                    Why Choose Us
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveSection('contact'); scrollToTop(); }} className="hover:text-[#FA9A55] transition text-stone-200 hover:underline cursor-pointer text-left">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact details WITH ACTIVE LINKS for phone, email, and address */}
            <div className="space-y-3.5 font-sans text-xs">
              <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider">Plant Contacts</h4>
              <ul className="space-y-3 text-stone-200 font-medium">
                <li className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-[#C2612A] shrink-0 mt-0.5" />
                  <a 
                    href="https://maps.google.com/?q=Survey+No.+173/2,+Pandharkar+Nagar,+MIDC,+Pune,+Maharashtra+411035" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="leading-normal hover:text-[#FA9A55] hover:underline"
                  >
                    Survey No. 173/2, Pandharkar Nagar, near Beena English School, MIDC, Pune, Maharashtra 411035
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-[#C2612A] shrink-0" />
                  <a href="tel:+919112230606" className="hover:text-[#FA9A55] hover:underline">+91 91122 30606</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-[#C2612A] shrink-0" />
                  <a href="mailto:sales@vardhaman.group" className="hover:text-[#FA9A55] hover:underline">sales@vardhaman.group</a>
                </li>
              </ul>
            </div>

            {/* Plant Operations & Hours Section replacing the redundant map */}
            <div className="space-y-3.5 font-sans text-xs">
              <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider">Plant Operations</h4>
              <ul className="space-y-3 text-stone-200 font-medium">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#C2612A] shrink-0" />
                  <span>Mon - Sat: 10:00 AM - 08:00 PM</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#C2612A] shrink-0" />
                  <span>Sunday: Dispatch Only (Emergency Orders)</span>
                </li>
                <li className="pt-2 border-t border-stone-850 text-[11px] text-stone-400 leading-relaxed italic">
                  * Operates under complete FSSAI sterile food safety guidelines.
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright signature - Keep ONLY the copyright details */}
          <div className="mt-12 border-t border-stone-700 pt-8 text-center font-sans text-xs text-white">
            <p>&copy; {new Date().getFullYear()} Cakey and Cookie Bakers (Vardhaman Group). All rights reserved.</p>
          </div>

        </div>
      </footer>

    </div>
  );
}

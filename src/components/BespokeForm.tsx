import React, { useState } from 'react';
import { Sparkles, Calendar, Users, Heart, Shapes, ChefHat, Check, Mail, Info, Building2, TrendingUp, ShieldCheck } from 'lucide-react';
import { CustomInquiry } from '../types';

interface BespokeFormProps {
  onSubmitInquiry: (inquiry: CustomInquiry) => void;
}

export default function BespokeForm({ onSubmitInquiry }: BespokeFormProps) {
  const [step, setStep] = useState(1);
  const [submittedInquiries, setSubmittedInquiries] = useState<CustomInquiry[]>([]);

  // Form Field States
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [eventDate, setEventDate] = useState(''); // Target partnership launch date
  const [guestCount, setGuestCount] = useState(100); // Estimated weekly volume
  const [cakeType, setCakeType] = useState<CustomInquiry['cakeType']>('corporate'); // mapping 'corporate' or 'other'
  const [customSolutionType, setCustomSolutionType] = useState('Bulk Wholesale Supply');
  const [tiers, setTiers] = useState(1); // Standard delivery frequency
  const [shape, setShape] = useState<CustomInquiry['shape']>('round');
  const [flavor, setFlavor] = useState('Standard Vanilla and Cookie Cases');
  const [icing, setIcing] = useState('With Custom Retail Band Packaging');
  const [description, setDescription] = useState('');

  const [formIncompleteMessage, setFormIncompleteMessage] = useState('');

  const currentYear = new Date().getFullYear();
  const minDate = `${currentYear}-01-01`;

  const handleNextStep = () => {
    if (step === 1) {
      if (!companyName.trim()) {
        setFormIncompleteMessage('Please input your Company / Enterprise name.');
        return;
      }
      if (!eventDate) {
        setFormIncompleteMessage('Please input your target launch date.');
        return;
      }
      setFormIncompleteMessage('');
    }
    if (step === 3) {
      if (!description.trim() || description.length < 10) {
        setFormIncompleteMessage('Please share a few detail sentences about your café or retail chain concept.');
        return;
      }
      setFormIncompleteMessage('');
    }
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setFormIncompleteMessage('');
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName || !customerEmail || !customerPhone) {
      setFormIncompleteMessage('Please complete all contact representative details fields.');
      return;
    }

    const newInquiry: CustomInquiry = {
      id: `VARD-B2B-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: `${customerName} (${companyName})`,
      customerEmail,
      customerPhone,
      eventDate,
      guestCount,
      cakeType: 'corporate',
      tiers,
      shape: 'round',
      flavor,
      icing,
      description: `[Company Type: ${customSolutionType}] ${description}`,
      status: 'pending',
      createdAt: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    onSubmitInquiry(newInquiry);
    setSubmittedInquiries((prev) => [newInquiry, ...prev]);
    setStep(5); // Success confirmation
    setFormIncompleteMessage('');
  };

  const handleResetForm = () => {
    setStep(1);
    setCustomerName('');
    setCompanyName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setEventDate('');
    setGuestCount(100);
    setDescription('');
  };

  const solutions = [
    { value: 'Bulk Wholesale Supply', label: 'Wholesale Cookies & Toast Supply' },
    { value: 'White-Label Desserts', label: 'White-Label Café Displays (Cream Rolls/Cakes)' },
    { value: 'Custom Formulation Contract', label: 'Custom Formulation (Private Recipes)' },
    { value: 'Supermarket Distribution', label: 'Supermarket Bulk Retail Packaging' }
  ];

  return (
    <section id="custom-inquiry" className="py-20 sm:py-28 bg-[#FAFAF8] border-b border-stone-150">
      <div className="w-full px-4 sm:px-8 lg:px-14">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 border border-stone-200 px-4 py-1.5 font-sans text-[10px] font-extrabold text-[#C2612A] uppercase tracking-[0.16em] mb-3">
            <TrendingUp className="h-3.5 w-3.5 text-[#C2612A]" />
            <span>Enterprise Franchise Solutions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#5D3E1A] tracking-tight uppercase">
            Consult a Custom <span className="font-serif italic text-[#C2612A] block font-normal lowercase mt-1 text-4xl">b2b partnership solution</span>
          </h2>
          <div className="h-[1px] w-20 bg-[#C2612A] mx-auto my-6" />
          <p className="font-sans text-xs sm:text-sm text-stone-500 font-medium max-w-xl mx-auto leading-relaxed">
            Establish a white-label contract, secure automated cookie distribution, or schedule recurring display bakes directly from our high-end Pune MIDC plant.
          </p>
        </div>

        {/* Builder Panel Card with Grand Restaurant Styling border details */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl border border-stone-200">
          
          {/* Progress Indicators */}
          {step <= 4 && (
            <div className="border-b border-stone-200 bg-stone-50/50 px-6 py-4.5 flex items-center justify-between">
              <span className="font-sans text-[11px] font-bold text-stone-400 uppercase tracking-widest">Step {step} of 4 • B2B Partnership Builder</span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <span
                    key={num}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      step === num
                        ? 'w-6 bg-[#5D3E1A]'
                        : step > num
                        ? 'w-2 bg-emerald-500'
                        : 'w-2 bg-stone-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Error Message */}
          {formIncompleteMessage && (
            <div id="builder-error-alert" className="mx-6 mt-6 flex items-center gap-2 rounded-xl bg-orange-50 border border-orange-200 px-4 py-3 text-orange-950 font-sans text-xs font-semibold">
              <Info className="h-3.5 w-3.5 text-orange-700 font-bold" />
              <span>{formIncompleteMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 sm:p-10">
            
            {/* STEP 1: EVENT / PARTNERSHIP DETAILS */}
            {step === 1 && (
              <div id="step-1-event" className="space-y-6 animate-fade-in font-sans">
                <div className="border-b border-stone-100 pb-4">
                  <h3 className="font-serif text-lg font-bold text-[#5D3E1A]">1. Partner Enterprise &amp; Logistics</h3>
                  <p className="font-sans text-xs text-stone-400 font-medium mt-1">Specify your company details and expected cargo launch timelines.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="font-sans text-xs font-extrabold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-[#C2612A]" />
                      <span>Company / Brand Corporate Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. The Bean Haven Cafe Chain"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="mt-2.5 w-full rounded-xl border border-stone-200 bg-stone-50 p-3.5 font-sans text-xs sm:text-sm focus:border-[#C2612A] focus:bg-white outline-none transition-all placeholder-stone-400 font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-sans text-xs font-extrabold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-[#C2612A]" />
                      <span>Target Food Supply Launch Date</span>
                    </label>
                    <input
                      type="date"
                      id="event-date-input"
                      value={eventDate}
                      min={minDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="mt-2.5 w-full rounded-xl border border-stone-200 bg-stone-50 p-3.5 font-sans text-xs sm:text-sm focus:border-[#C2612A] focus:bg-white outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Range bar */}
                <div>
                  <label className="font-sans text-xs font-extrabold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-[#C2612A]" />
                    <span>Estimated Weekly Volume Standard ({guestCount} Units/Week)</span>
                  </label>
                  <input
                    type="range"
                    id="guest-count-range"
                    min={50}
                    max={2000}
                    step={50}
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="mt-4 w-full accent-[#C2612A]"
                  />
                  <div className="mt-2 flex items-center justify-between font-sans text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                    <span>50 Units (Trial Carton)</span>
                    <span className="text-[#C2612A] text-xs px-3 py-1 rounded-full bg-stone-100 border border-stone-200">
                      Drops: {tiers === 1 ? 'Weekly' : tiers === 2 ? 'Bi-Daily' : 'Every morning'} rotation
                    </span>
                    <span>2,000+ Units (Bulk Supermarket Scale)</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: SOLUTIONS SELECTION */}
            {step === 2 && (
              <div id="step-2-geometry" className="space-y-6 animate-fade-in font-sans">
                <div className="border-b border-stone-100 pb-4">
                  <h3 className="font-serif text-lg font-bold text-[#5D3E1A]">2. Service Category &amp; Cadence</h3>
                  <p className="font-sans text-xs text-stone-400 font-medium mt-1">Pick the exact commercial category matching your cafe model.</p>
                </div>

                {/* Solution Category */}
                <div>
                  <label className="font-sans text-xs font-extrabold uppercase tracking-wider text-stone-500">Proposed Partnership Framework</label>
                  <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {solutions.map((sol) => (
                      <button
                        key={sol.value}
                        type="button"
                        onClick={() => setCustomSolutionType(sol.value)}
                        className={`rounded-2xl border p-4.5 font-sans text-left transition-all ${
                          customSolutionType === sol.value
                            ? 'border-[#C2612A] bg-[#C2612A]/5 text-[#5D3E1A] font-bold shadow-sm'
                            : 'border-stone-100 bg-stone-50 text-stone-500 hover:bg-stone-100/60'
                        }`}
                      >
                        <span className="block text-xs sm:text-sm uppercase tracking-wider font-extrabold text-[#5D3E1A]">{sol.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Delivery Drop cadence */}
                <div>
                  <label className="font-sans text-xs font-extrabold uppercase tracking-wider text-stone-500">Standard Delivery Cadence</label>
                  <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { val: 1, text: 'Weekly Deliveries', desc: 'Single cargo drop every Monday morning' },
                      { val: 2, text: 'Bi-Weekly Drops', desc: 'Fresh batches delivered Mondays & Thursdays' },
                      { val: 3, text: 'Daily Rotations', desc: 'Morning dispatch rotation direct to counters' }
                    ].map((cad) => (
                      <button
                        key={cad.val}
                        type="button"
                        onClick={() => setTiers(cad.val)}
                        className={`rounded-2xl border p-4.5 font-sans text-left transition-all flex flex-col justify-between h-24 ${
                          tiers === cad.val
                            ? 'border-[#C2612A] bg-[#C2612A]/5 text-[#5D3E1A] font-bold shadow-sm'
                            : 'border-stone-100 bg-stone-50 text-stone-500 hover:bg-stone-100/60'
                        }`}
                      >
                        <span className="block text-xs font-extrabold uppercase text-[#C2612A] tracking-wider">{cad.text}</span>
                        <span className="block text-[10px] text-stone-400 font-medium leading-relaxed mt-1.5">{cad.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: CUSTOMIZATION OPTIONS */}
            {step === 3 && (
              <div id="step-3-flavors" className="space-y-6 animate-fade-in font-sans">
                <div className="border-b border-stone-100 pb-4">
                  <h3 className="font-serif text-lg font-bold text-[#5D3E1A]">3. Custom Ingredient Formula &amp; Branding</h3>
                  <p className="font-sans text-xs text-stone-400 font-medium mt-1">We tailor baker recipes and sterile wrap labels to your specific guidelines.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="font-sans text-xs font-extrabold uppercase tracking-wider text-stone-500">Core Sponge / Cookie Formulation</label>
                    <select
                      value={flavor}
                      onChange={(e) => setFlavor(e.target.value)}
                      className="mt-2.5 w-full rounded-xl border border-stone-200 bg-stone-50 p-3.5 font-sans text-xs sm:text-sm focus:border-[#C2612A] focus:bg-white outline-none transition-all font-bold text-[#5D3E1A]"
                    >
                      <option value="Standard Vanilla and Cookie Cases">Standard Consistent Recipe Lines</option>
                      <option value="100% Eggless Pure Vegetarian Formula">100% Eggless / Pure-Vegetarian Formulation</option>
                      <option value="Organic Flour & Sugar-Free Sweeteners">Organic Premium Flour &amp; Health Sweeteners</option>
                      <option value="High-Fiber Multi-Grain Infused Rusks">High-Fiber Multi-Grain Special (For Toasts)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-sans text-xs font-extrabold uppercase tracking-wider text-stone-500">Retail Packaging &amp; Label Branding</label>
                    <select
                      value={icing}
                      onChange={(e) => setIcing(e.target.value)}
                      className="mt-2.5 w-full rounded-xl border border-stone-200 bg-stone-50 p-3.5 font-sans text-xs sm:text-sm focus:border-[#C2612A] focus:bg-white outline-none transition-all font-bold text-[#5D3E1A]"
                    >
                      <option value="With Custom Retail Band Packaging">Private White-Label (Unbranded Cases for Cafés)</option>
                      <option value="With Vardhaman Group Logo Seal">Cakey &amp; Cookie Branded Retail Cartons</option>
                      <option value="Raw Crate Delivery (Eco trays for bulk jars)">Raw Foodservice Crates (No wrapping)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-sans text-xs font-extrabold uppercase tracking-wider text-stone-500">Enterprise Concept &amp; Special Criteria Description</label>
                  <textarea
                    id="design-description-input"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="E.g., Our gourmet café requires daily unbranded cookies drops and fully vegetarian formulations..."
                    className="mt-2.5 w-full rounded-2xl border border-stone-200 bg-stone-50 p-3.5 font-sans text-xs outline-none focus:border-[#C2612A] focus:bg-white transition-all resize-none placeholder-stone-405 font-medium"
                  />
                  <p className="mt-1.5 font-sans text-[10px] text-stone-400 font-medium">Share your business model, target cities, and monthly consignment needs. Minimum 10 characters.</p>
                </div>
              </div>
            )}

            {/* STEP 4: CONTACT INFORMATION */}
            {step === 4 && (
              <div id="step-4-contact" className="space-y-6 animate-fade-in font-sans">
                <div className="border-b border-stone-100 pb-4">
                  <h3 className="font-serif text-lg font-bold text-[#5D3E1A]">4. Representative Contact Profile</h3>
                  <p className="font-sans text-xs text-stone-400 font-medium mt-1">Our B2B corporate relations desk in Pune MIDC will review and write partnership proposals.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="font-sans text-xs font-extrabold uppercase tracking-wider text-stone-500">Representative Officer Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Aarav Mehta"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 p-3.5 font-sans text-xs sm:text-sm focus:border-[#C2612A] focus:bg-white transition-all font-bold text-[#5D3E1A]"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="font-sans text-xs font-extrabold uppercase tracking-wider text-stone-500">Corporate Email Address</label>
                      <input
                        type="email"
                        placeholder="purchasing@coffeelounge.in"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 p-3.5 font-sans text-xs sm:text-sm focus:border-[#C2612A] focus:bg-white transition-all font-bold text-[#5D3E1A]"
                      />
                    </div>
                    <div>
                      <label className="font-sans text-xs font-extrabold uppercase tracking-wider text-stone-500">Direct Telephone Number</label>
                      <input
                        type="tel"
                        placeholder="+91 91122 30606"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 p-3.5 font-sans text-xs sm:text-sm focus:border-[#C2612A] focus:bg-white transition-all font-bold text-[#5D3E1A]"
                      />
                    </div>
                  </div>
                </div>

                {/* Recap review segment */}
                <div className="rounded-2xl bg-[#C2612A]/5 border border-[#C2612A]/10 p-5 font-sans text-xs text-stone-705 leading-relaxed font-medium">
                  <h4 className="font-extrabold text-[#5D3E1A] flex items-center gap-1.5 mb-2 uppercase tracking-wider">
                    <Sparkles className="h-4 w-4 text-[#C2612A] animate-pulse" />
                    <span>Inquiry Specification Check</span>
                  </h4>
                  <p>
                    A <span className="font-bold">{customSolutionType}</span> partnership for <span className="font-bold">{companyName || 'Your Brand'}</span>, aiming to launch on <span className="font-bold">{eventDate || 'TBD'}</span> with a weekly volume of <span className="font-bold">{guestCount} units</span>. Recipe formulation: <span className="font-bold">{flavor}</span> under guidelines: <span className="font-bold">{icing}</span>.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 5: SUCCESS BLOCK */}
            {step === 5 && (
              <div id="step-5-success" className="text-center py-8 space-y-6 animate-scale font-sans">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 shadow-sm">
                  <Check className="h-8 w-8 stroke-[3]" />
                </div>
                
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#5D3E1A] uppercase tracking-tight">Corporate Proposal Submitted</h3>
                  <div className="h-[1px] w-12 bg-[#C2612A] mx-auto my-4" />
                  <p className="font-sans text-xs sm:text-sm text-stone-550 max-w-md mx-auto leading-relaxed font-medium">
                    Thank you, <strong>{customerName}</strong> from <strong>{companyName}</strong>! Our B2B relations team at Pune MIDC is examining your target specifications.
                  </p>
                  <p className="mt-3 font-sans text-xs text-stone-400 max-w-sm mx-auto leading-relaxed font-medium">
                    We will send a formal contract proposal draft and termsheet copy immediately to <span className="text-[#C2612A] font-bold">{customerEmail}</span> within 24 business hours.
                  </p>
                </div>

                {/* Display active inquiries */}
                <div className="max-w-md mx-auto pt-4 text-left space-y-3">
                  <p className="font-sans text-[10px] font-extrabold uppercase tracking-[0.16em] text-stone-400 text-center">Active Venture Proposals</p>
                  {submittedInquiries.map((inq) => (
                    <div key={inq.id} className="rounded-xl border border-stone-200 p-4 bg-stone-50 flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-sans text-[10px] font-bold text-stone-400">{inq.id}</span>
                          <span className="h-1.5 w-1.5 bg-[#C2612A] rounded-full" />
                          <span className="font-sans text-xs font-bold text-[#5D3E1A]">{customSolutionType}</span>
                        </div>
                        <p className="font-sans text-[11px] text-stone-500 mt-1 font-medium">Weekly Drops: {inq.guestCount} Units • Drops: {tiers === 1 ? 'Weekly' : tiers === 2 ? 'Bi-Daily' : 'Daily'}</p>
                      </div>
                      <span className="rounded-full bg-orange-50 border border-orange-100 text-orange-800 px-3 py-1 font-sans text-[9px] font-extrabold uppercase tracking-wide leading-none">
                        Plant Review
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                  <button
                    id="register-another-btn"
                    type="button"
                    onClick={handleResetForm}
                    className="rounded-full bg-[#5D3E1A] hover:bg-[#442C12] text-white font-sans text-xs font-bold px-7 py-3 shadow transition-all uppercase tracking-wider"
                  >
                    Register Another Specification
                  </button>
                </div>
              </div>
            )}

            {/* Navigation buttons line */}
            {step <= 4 && (
              <div id="builder-nav-footer" className="mt-8 flex items-center justify-between border-t border-stone-150 pt-6 font-sans">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 font-sans text-xs font-bold px-6 py-3 transition focus:outline-none uppercase tracking-wider"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="rounded-full bg-stone-900 hover:bg-stone-800 text-white font-sans text-xs font-bold px-6 py-3 transition focus:outline-none uppercase tracking-wider"
                  >
                    Continue Builder
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-full bg-[#5D3E1A] hover:bg-[#442C12] text-white font-sans text-xs font-bold px-7 py-3 shadow transition focus:outline-none uppercase tracking-wider"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Launch B2B Proposition</span>
                  </button>
                )}
              </div>
            )}

          </form>

        </div>

      </div>
    </section>
  );
}

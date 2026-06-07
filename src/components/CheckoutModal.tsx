import React, { useState } from 'react';
import { X, Lock, ShieldCheck, CreditCard, Sparkles, AlertCircle, Building, Receipt, FileText } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onOrderCreated: (order: Order) => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  onOrderCreated
}: CheckoutModalProps) {
  if (!isOpen) return null;

  // B2B Enterprise Fields
  const [name, setName] = useState(''); // Corporate Representative Name
  const [companyName, setCompanyName] = useState(''); // Registered Business Title
  const [gstin, setGstin] = useState(''); // Indian Business Tax Registration ID
  const [email, setEmail] = useState(''); // Corporate communications email
  const [phone, setPhone] = useState(''); // Registered Mobile (Courier notifications)
  const [address, setAddress] = useState(''); // Survey No, Industrial zone, Ward
  const [city, setCity] = useState('Pune');
  const [zipCode, setZipCode] = useState('411035');

  // Payment Selection Type
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank_invoice' | 'credit_line'>('bank_invoice');

  // Standard CC card credentials
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // Status feedback
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [errorField, setErrorField] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  const deliveryFee = subtotal > 10000 ? 0 : 500;
  const tax = subtotal * 0.18; // 18% standard Indian GST for wholesale food items
  const total = subtotal + deliveryFee + tax;

  // Format credit card with spaces
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 16) val = val.slice(0, 16);
    let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 4) val = val.slice(0, 4);
    if (val.length >= 2) {
      val = val.slice(0, 2) + '/' + val.slice(2);
    }
    setExpiry(val);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 3) val = val.slice(0, 3);
    setCvv(val);
  };

  const handlePaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validations check
    if (!name.trim() || !companyName.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      setErrorField('Please complete all representative, corporate details, and routing address fields.');
      return;
    }

    if (paymentMethod === 'card') {
      if (!cardNumber.trim() || !expiry.trim() || !cvv.trim()) {
        setErrorField('Please fill out card credentials to authorize standard instant payment.');
        return;
      }
      if (cardNumber.replace(/\s/g, '').length < 16) {
        setErrorField('Instant Payment Card Number must contain exactly 16 digits.');
        return;
      }
    }

    setErrorField('');
    setIsProcessing(true);

    // Step-by-step B2B gateway validation simulation
    const steps = [
      'Establishing secure SSL tunnel protocols to Vardhaman servers...',
      'Validating Indian Corporate registration credentials...',
      'Matching GSTIN with taxation records...',
      'Securing credit authorization node escrow...',
      'Drafting official corporate invoice catalog...',
      'Order dispatch parameters generated!'
    ];

    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(steps[i]);
      await new Promise((r) => setTimeout(r, 1000));
    }

    // Creating tracked order object
    const finalOrder: Order = {
      id: `VARD-${Math.floor(10000 + Math.random() * 90000).toString()}`,
      items: [...cart],
      subtotal,
      deliveryFee,
      tax,
      total,
      customer: { 
        name: `${name} (${companyName})`, 
        email, 
        phone, 
        address: `${address}, GSTIN: ${gstin || 'NOT PROVIDED'}`, 
        city, 
        zipCode 
      },
      payment: {
        cardBrand: paymentMethod === 'bank_invoice' ? 'Bank Transfer' : paymentMethod === 'credit_line' ? 'Terms Credit Line' : 'Direct corporate visa',
        last4: paymentMethod === 'card' ? cardNumber.substring(cardNumber.length - 4) : 'B2B Invoice Net-15',
        transactionId: `TXN-B2B-${Math.floor(100000 + Math.random() * 900000)}`
      },
      status: 'placed',
      estimatedDelivery: 'Next business day by 10:00 AM',
      timeline: [
        { status: 'placed', title: 'Dispatch Placed', description: 'Your secure B2B transaction has been authorized with Vardhaman Bakery network.', completed: true, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) },
        { status: 'baking', title: 'Flours Folded (Baking)', description: 'Wholesale dough mixers weighting cargo, baking consistent cookie bakes.', completed: false },
        { status: 'decorating', title: 'Artisan Slicing & Wrapping', description: 'Confectionery experts preparing display slabs, wrapping crispy bakes.', completed: false },
        { status: 'out_for_delivery', title: 'Loading Cargo Truck', description: 'Transferred to temperature-controlled logistics vehicle departing MIDC Pune plant.', completed: false },
        { status: 'delivered', title: 'Received at Storehouse', description: 'Cargo received and signed off with official delivery challan copies.', completed: false }
      ],
      createdAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setIsProcessing(false);
    onOrderCreated(finalOrder);
    onClose();
  };

  return (
    <div id="checkout-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in font-sans">
      <div
        id="checkout-dialog"
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white text-stone-800 shadow-2xl border border-stone-105 animate-scale"
      >
        {/* Loading overlay for processing checkout payment in brand colors */}
        {isProcessing && (
          <div id="payment-gateway-loader" className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 text-center p-8 rounded-3xl">
            <div className="relative flex h-16 w-16 items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#C2612A]/20 opacity-25 animate-ping"></span>
              <Lock className="h-8 w-8 text-[#5D3E1A] animate-pulse stroke-[2]" />
            </div>
            
            <h3 className="mt-6 font-serif text-xl font-bold text-[#5D3E1A] uppercase tracking-wider">Contacting B2B Gateway</h3>
            <p className="mt-2.5 font-mono text-xs text-[#C2612A] uppercase tracking-widest">{processingStep}</p>
            
            <div className="mt-8 flex items-center gap-1.5 rounded-full bg-[#C2612A]/5 border border-[#C2612A]/10 px-4 py-1.5 font-sans text-[10px] text-[#C2612A] font-bold uppercase tracking-wider leading-none">
              <ShieldCheck className="h-4 w-4 text-[#C2612A]" />
              <span>Cooperative Enterprise Escrow Active</span>
            </div>
          </div>
        )}

        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-100 bg-white/95 px-6 py-4.5">
          <div className="flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-[#C2612A]" />
            <h3 className="font-serif text-lg font-bold text-[#5D3E1A] uppercase tracking-wider">Secure Consignment Checkout</h3>
          </div>
          <button
            id="close-checkout"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-50 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Grid Body layout */}
        <form onSubmit={handlePaySubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
          
          {/* Left Inputs Columns */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Validation Alerts */}
            {errorField && (
              <div id="checkout-validation-alert" className="flex items-center gap-2 rounded-xl bg-orange-50 border border-orange-200 p-3.5 text-orange-950 font-sans text-xs font-bold">
                <AlertCircle className="h-4 w-4 text-orange-700 shrink-0" />
                <span>{errorField}</span>
              </div>
            )}

            {/* B2B Corporate Identity */}
            <div className="space-y-4">
              <h4 className="font-serif text-md font-bold text-[#5D3E1A] border-b border-stone-100 pb-2 flex items-center gap-2 uppercase tracking-tight">
                <Building className="h-4.5 w-4.5 text-[#C2612A]" />
                <span>1. Legal Corporate Entity Details</span>
              </h4>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="font-sans text-[10px] font-extrabold uppercase tracking-wider text-stone-500">Registered Corporate / Brand Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The Bean Haven Cafés Ltd"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-stone-200 bg-stone-50 p-3.5 font-sans text-xs outline-none focus:border-[#C2612A] focus:bg-white transition font-medium"
                  />
                </div>
                <div>
                  <label className="font-sans text-[10px] font-extrabold uppercase tracking-wider text-stone-500">Corporate GSTIN (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 27AAAAA1111A1Z1"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-stone-200 bg-stone-50 p-3.5 font-sans text-xs outline-none focus:border-[#C2612A] focus:bg-white transition font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="font-sans text-[10px] font-extrabold uppercase tracking-wider text-stone-500">Representative Officer Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Mehta"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-stone-200 bg-stone-50 p-3.5 font-sans text-xs outline-none focus:border-[#C2612A] focus:bg-white transition font-medium"
                  />
                </div>
                <div>
                  <label className="font-sans text-[10px] font-extrabold uppercase tracking-wider text-stone-500">Representative Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. a.mehta@thebeanhavengroup.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-stone-200 bg-stone-50 p-3.5 font-sans text-xs outline-none focus:border-[#C2612A] focus:bg-white transition font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Warehouse Routing Delivery address */}
            <div className="space-y-4">
              <h4 className="font-serif text-md font-bold text-[#5D3E1A] border-b border-stone-100 pb-2 uppercase tracking-tight">2. Store / Warehouse Delivery Location</h4>
              
              <div>
                <label className="font-sans text-[10px] font-extrabold uppercase tracking-wider text-stone-500">Warehouse Delivery Street Address</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Survey No. 12/A, Corporate Distribution Center, MIDC Area"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-stone-200 bg-stone-50 p-3.5 font-sans text-xs outline-none focus:border-[#C2612A] focus:bg-white transition font-medium"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label className="font-sans text-[10px] font-extrabold uppercase tracking-wider text-stone-500">City / District Zone</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-stone-200 bg-stone-50 p-3.5 font-sans text-xs outline-none focus:border-[#C2612A] focus:bg-white transition font-bold text-[#5D3E1A]"
                  />
                </div>
                <div>
                  <label className="font-sans text-[10px] font-extrabold uppercase tracking-wider text-stone-500">PIN Code</label>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-stone-200 bg-stone-50 p-3.5 font-sans text-xs outline-none focus:border-[#C2612A] focus:bg-white transition font-bold text-[#5D3E1A]"
                  />
                </div>
              </div>

              <div>
                <label className="font-sans text-[10px] font-extrabold uppercase tracking-wider text-stone-500">Direct Delivery Contact Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 91122 30606"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-stone-200 bg-stone-50 p-3.5 font-sans text-xs outline-none focus:border-[#C2612A] focus:bg-white transition font-medium"
                />
              </div>
            </div>

            {/* B2B Payment Authorization Channel selection in brand style */}
            <div className="space-y-4">
              <h4 className="font-serif text-md font-bold text-[#5D3E1A] border-b border-stone-100 pb-2 uppercase tracking-tight">3. Select B2B Clearing Channel</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank_invoice')}
                  className={`rounded-2xl border p-4.5 font-sans text-left flex flex-col justify-between h-28 transition-all ${
                    paymentMethod === 'bank_invoice'
                      ? 'border-[#C2612A] bg-[#C2612A]/5 text-[#5D3E1A] font-bold shadow-sm'
                      : 'border-stone-100 bg-stone-50 text-stone-500 hover:bg-stone-100/60'
                  }`}
                >
                  <FileText className="h-5 w-5 text-[#C2612A]" />
                  <div className="text-[10px] mt-2">
                    <p className="font-extrabold uppercase tracking-wide">Bank Transfer &amp; Invoice</p>
                    <p className="text-[9px] text-stone-400 font-medium mt-0.5">Pay Net-15 terms on credit</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_line')}
                  className={`rounded-2xl border p-4.5 font-sans text-left flex flex-col justify-between h-28 transition-all ${
                    paymentMethod === 'credit_line'
                      ? 'border-[#C2612A] bg-[#C2612A]/5 text-[#5D3E1A] font-bold shadow-sm'
                      : 'border-stone-100 bg-stone-50 text-stone-500 hover:bg-stone-100/60'
                  }`}
                >
                  <Receipt className="h-5 w-5 text-[#C2612A]" />
                  <div className="text-[10px] mt-2">
                    <p className="font-extrabold uppercase tracking-wide">Vardhaman Credit Line</p>
                    <p className="text-[9px] text-stone-400 font-medium mt-0.5">Pre-arranged contract clearance</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`rounded-2xl border p-4.5 font-sans text-left flex flex-col justify-between h-28 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#C2612A] bg-[#C2612A]/5 text-[#5D3E1A] font-bold shadow-sm'
                      : 'border-stone-100 bg-stone-50 text-stone-500 hover:bg-stone-100/60'
                  }`}
                >
                  <CreditCard className="h-5 w-5 text-stone-600" />
                  <div className="text-[10px] mt-2">
                    <p className="font-extrabold uppercase tracking-wide">Corporate Credit Card</p>
                    <p className="text-[9px] text-stone-400 font-medium mt-0.5">Instant online processing</p>
                  </div>
                </button>
              </div>

              {/* standard Credit Card inputs shown selectively */}
              {paymentMethod === 'card' && (
                <div className="mt-4 p-4.5 bg-stone-50 border border-stone-200 rounded-2xl space-y-3.5 animate-fade-in">
                  <div>
                    <label className="font-sans text-[10px] font-extrabold uppercase tracking-wider text-stone-500">Corporate Card Number</label>
                    <input
                      type="text"
                      placeholder="4000 1234 5678 9010"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white p-3.5 font-sans text-xs outline-none focus:border-[#C2612A] transition font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-sans text-[10px] font-extrabold uppercase tracking-wider text-stone-500">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        placeholder="12/28"
                        value={expiry}
                        onChange={handleExpiryChange}
                        className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white p-3.5 font-sans text-xs outline-none focus:border-[#C2612A] transition text-center font-bold"
                      />
                    </div>
                    <div>
                      <label className="font-sans text-[10px] font-extrabold uppercase tracking-wider text-stone-500">Card CVV / CVC Code</label>
                      <input
                        type="password"
                        placeholder="•••"
                        value={cvv}
                        onChange={handleCvvChange}
                        className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white p-3.5 font-sans text-xs outline-none focus:border-[#C2612A] transition text-center font-bold"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Summary Columns in beautiful cream framing */}
          <div className="lg:col-span-12 xl:col-span-5 bg-[#FAF8F5] rounded-3xl p-6 border border-stone-200 h-fit space-y-6">
            <h4 className="font-serif text-md font-bold text-[#5D3E1A] border-b border-stone-200 pb-2 uppercase tracking-wide">Consignment Valuation Invoice</h4>
            
            {/* Compact items list check */}
            <div className="max-h-48 overflow-y-auto space-y-3.5 pb-4 border-b border-stone-200">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-2.5 text-xs text-stone-600">
                  <span className="font-sans font-bold text-[#5D3E1A]">{item.quantity}x</span>
                  <div className="flex-1 font-sans">
                    <p className="font-serif text-xs font-bold text-stone-800 leading-tight">{item.menuItem.name}</p>
                    {item.selectedSize && <p className="text-[10px] text-stone-400 mt-0.5 font-medium">{item.selectedSize}</p>}
                  </div>
                  <span className="font-sans italic font-bold">₹{(item.menuItem.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            {/* Calculations lines */}
            <div className="space-y-2.5 font-sans text-xs text-stone-500 font-medium pb-2 border-b border-stone-200">
              <div className="flex justify-between">
                <span>Items Subtotal Value</span>
                <span className="text-stone-800 font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Consignment Freight Cargo delivery</span>
                <span>{deliveryFee === 0 ? <span className="text-emerald-700 font-bold uppercase text-[10px]">FRЕE</span> : `₹${deliveryFee.toLocaleString('en-IN')}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Wholesale Central GST (18%)</span>
                <span>₹{tax.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex justify-between pt-1 font-serif text-lg font-extrabold text-[#5D3E1A]">
              <span>Cargo Total (INR)</span>
              <span className="text-[#C2612A]">₹{total.toLocaleString('en-IN')}</span>
            </div>

            {/* Secure Badges check */}
            <div className="rounded-2xl bg-white border border-stone-200 p-4 font-sans text-[11px] text-stone-400 leading-relaxed font-medium">
              <div className="flex items-start gap-1.5">
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-stone-500 font-extrabold font-sans uppercase text-[9px] tracking-wider">PCI-DSS Regulatory Compliance</p>
                  <p className="mt-0.5 leading-relaxed">Clearing is powered by accredited bank channels. An audit invoice will instantly be shared on corporate registry emails.</p>
                </div>
              </div>
            </div>

            {/* Submit checkout CTA */}
            <button
              id="pay-submit-btn"
              type="submit"
              className="w-full rounded-2xl bg-[#5D3E1A] hover:bg-[#442C12] py-4 text-white font-sans text-xs font-bold shadow-xl transition focus:outline-none uppercase tracking-wider"
            >
              Confirm consignment: ₹{total.toLocaleString('en-IN')}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

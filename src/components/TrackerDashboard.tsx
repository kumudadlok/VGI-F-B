import React, { useState, useEffect } from 'react';
import { Bell, ChefHat, Truck, Check, HelpCircle, ArrowRight, ShieldCheck, PlayCircle, Clock, Download, Loader2 } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { jsPDF } from 'jspdf';

interface TrackerDashboardProps {
  order: Order | null;
  onSimulateStatusChange: (status: OrderStatus) => void;
}

export default function TrackerDashboard({ order, onSimulateStatusChange }: TrackerDashboardProps) {
  const [typedOrderId, setTypedOrderId] = useState('');
  const [searchError, setSearchError] = useState('');
  const [dummyOrder, setDummyOrder] = useState<Order | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  
  // Slide-in push alert system state
  const [activeAlert, setActiveAlert] = useState<{ title: string; message: string; type: string } | null>(null);

  // Auto fallback B2B order generator if the user has not placed one yet
  useEffect(() => {
    if (!order && !dummyOrder) {
      const defaultOrder: Order = {
        id: 'VARD-7901',
        items: [
          {
            id: 'default-cookie-item',
            menuItem: {
              id: 'bulk-cookies-luxury',
              name: 'Wholesale Gourmet Cookies Case (100 Pcs)',
              description: 'A bulk curated premium case of crisp-edge, chewy-center cookies.',
              category: 'cookies',
              price: 4500,
              image: '/src/assets/images/choco_crunch_1780047370556.png',
              rating: 4.9,
              reviewsCount: 312,
              tags: ['Quality Verified', 'Top Seller', '100 Pcs Case']
            },
            quantity: 2,
            selectedSize: 'Standard Case (100 Pcs)',
            selectedFlavor: 'Classic Choco Pools',
            selectedIcing: 'Aesthetic Bulk Catering Box'
          }
        ],
        subtotal: 9000,
        deliveryFee: 500,
        tax: 1620, // 18% GST of subtotal
        total: 11120,
        customer: {
          name: 'Chef Kabir Roy',
          email: 'pastry.director@tajgateway.in',
          phone: '+91 91122 30606',
          address: 'Taj Gateway Banquets, South Division',
          city: 'Pune',
          zipCode: '411035'
        },
        payment: {
          cardBrand: 'Terms Credit Line',
          last4: 'B2B Invoice Net-15',
          transactionId: 'TXN-B2B-019283'
        },
        status: 'placed',
        estimatedDelivery: 'Next business day by 10:00 AM',
        timeline: [
          { status: 'placed', title: 'Dispatch Placed', description: 'Your secure B2B transaction has been authorized with Vardhaman Bakery network.', completed: true, time: '12:00 PM' },
          { status: 'baking', title: 'Flours Folded (Baking)', description: 'Wholesale dough mixers weighting cargo, baking consistent cookie batches.', completed: false },
          { status: 'decorating', title: 'Artisan Decorating / Slicing', description: 'Confectionery experts preparing slab slices, packing saffron toasts.', completed: false },
          { status: 'out_for_delivery', title: 'Loading Distribution Truck', description: 'Transferred to temperature-controlled logistics truck heading toward Pune/Mumbai.', completed: false },
          { status: 'delivered', title: 'Received at Warehouse', description: 'Delivered at target commercial warehouse with delivery challan copy signed.', completed: false }
        ],
        createdAt: '12:00 PM'
      };
      setDummyOrder(defaultOrder);
    }
  }, [order, dummyOrder]);

  const activeOrder = order || dummyOrder;

  // Invoice PDF generator
  const exportPDFInvoice = async (order: Order) => {
    setIsExporting(true);
    await new Promise((r) => setTimeout(r, 1200));

    try {
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      doc.setFont("Helvetica", "bold");
      doc.setFillColor(93, 62, 26);
      doc.rect(0, 0, 210, 15, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text("CAKEY & COOKIE BAKERS  |  VARDHAMAN GROUP ALLIANCE", 15, 10);
      doc.text("GST REGISTRATION TAX INVOICE", 145, 10);

      doc.setTextColor(30, 30, 30);
      doc.setFontSize(22);
      doc.text("Cakey & Cookie Bakers", 15, 30);
      
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text("Industrial Plant Complex, Survey No. 173/2,", 15, 36);
      doc.text("Pandharkar Nagar, near Beena School, MIDC, Pune, MH 411035", 15, 41);
      doc.text("Corporate Inquiries: sales@vardhaman.group  |  +91 91122 30606", 15, 46);

      doc.setFillColor(250, 248, 245);
      doc.rect(130, 24, 65, 25, 'F');
      
      doc.setTextColor(93, 62, 26);
      doc.setFont("Georgia", "italic");
      doc.setFontSize(15);
      doc.text(`Invoice #${order.id}`, 135, 31);
      
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(`Date of Issue: ${order.createdAt || "Current Date"}`, 135, 37);
      doc.text(`Payment Basis: ${order.payment.cardBrand}`, 135, 42);
      doc.text(`Transaction ID: ${order.payment.transactionId}`, 135, 46);

      doc.setDrawColor(220, 215, 210);
      doc.line(15, 52, 195, 52);

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(93, 62, 26);
      doc.text("CONSIGNMENT BILL TO:", 15, 61);
      doc.text("ROUTE SHIPMENT TO:", 110, 61);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(30, 30, 30);
      doc.text(order.customer.name, 15, 67);
      doc.text(`Attn: Representative Officer`, 15, 72);
      doc.text(`Email: ${order.customer.email}`, 15, 77);
      doc.text(`GSTIN Registration: 27AAACT2912D1Z4`, 15, 82);

      doc.text(order.customer.name, 110, 67);
      doc.text(order.customer.address || "Main Distribution Hub", 110, 72);
      doc.text(`${order.customer.city || "Pune"}, MH ${order.customer.zipCode || "411035"}`, 110, 77);
      doc.text(`Courier Tel: ${order.customer.phone}`, 110, 82);

      let tableY = 93;
      doc.setFillColor(93, 62, 26);
      doc.rect(15, tableY, 180, 8, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8.5);
      doc.text("PRODUCT / CONSIGNMENT SPECIFICATION DESCRIPTION", 18, tableY + 5.5);
      doc.text("QTY", 125, tableY + 5.5);
      doc.text("RATE (INR)", 143, tableY + 5.5);
      doc.text("TOTAL (INR)", 172, tableY + 5.5);

      let currentY = tableY + 8;
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(30, 30, 30);

      order.items.forEach((item, index) => {
        if (index % 2 === 1) {
          doc.setFillColor(252, 251, 249);
          doc.rect(15, currentY, 180, 11, 'F');
        } else {
          doc.setFillColor(255, 255, 255);
          doc.rect(15, currentY, 180, 11, 'F');
        }

        doc.setFont("Helvetica", "bold");
        doc.text(item.menuItem.name, 18, currentY + 4.5);
        doc.setFont("Helvetica", "normal");
        
        let customizationText = `${item.selectedSize || "Standard"} | ${item.selectedFlavor || "Classic"} | ${item.selectedIcing || "Standard Box"}`;
        doc.setFontSize(7.5);
        doc.setTextColor(110, 110, 110);
        doc.text(customizationText, 18, currentY + 8.5);
        
        doc.setFontSize(8.5);
        doc.setTextColor(30, 30, 30);
        doc.text(item.quantity.toString(), 127, currentY + 6.5);
        doc.text(`Rs. ${item.menuItem.price.toLocaleString('en-IN')}`, 143, currentY + 6.5);
        doc.text(`Rs. ${(item.menuItem.price * item.quantity).toLocaleString('en-IN')}`, 172, currentY + 6.5);

        doc.setDrawColor(240, 235, 230);
        doc.line(15, currentY + 11, 195, currentY + 11);
        currentY += 11;
      });

      currentY += 5;
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(100, 100, 100);

      doc.text("Items Subtotal:", 135, currentY);
      doc.text(`Rs. ${order.subtotal.toLocaleString('en-IN')}`, 172, currentY);
      
      doc.text("MIDC Delivery Freight Free:", 135, currentY + 4.5);
      doc.text(`Rs. ${order.deliveryFee.toLocaleString('en-IN')}`, 172, currentY + 4.5);
      
      doc.text("Wholesale GST (18.0%):", 135, currentY + 9);
      doc.text(`Rs. ${order.tax.toLocaleString('en-IN')}`, 172, currentY + 9);

      doc.setDrawColor(194, 97, 42); 
      doc.setLineWidth(0.5);
      doc.line(130, currentY + 12, 195, currentY + 12);
      
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(93, 62, 26);
      doc.text("Total Certified Invoice:", 130, currentY + 17);
      doc.text(`Rs. ${order.total.toLocaleString('en-IN')}`, 168, currentY + 17);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(130, 130, 130);
      doc.text("TERMS AND CONTRACT CONDITIONS:", 15, currentY + 8);
      doc.text("1. Strictly Net-15 or Net-30 credit from date of certified delivery challan release.", 15, currentY + 12);
      doc.text("2. Manufactured inside completely FSSAI sterile food safety plant conditions in Pune MIDC.", 15, currentY + 16);
      doc.text("3. This serves as a formal certified digital electronic tax receipt document under Vardhaman Alliance.", 15, currentY + 20);

      let stampY = currentY + 32;
      doc.setDrawColor(220, 215, 210);
      doc.setLineWidth(0.2);
      doc.line(15, stampY, 195, stampY);

      doc.setFont("Georgia", "italic");
      doc.setFontSize(10);
      doc.setTextColor(93, 62, 26);
      doc.text("Certified Baker Plant Stamp:", 15, stampY + 9);
      
      doc.setFillColor(250, 248, 245);
      doc.rect(145, stampY + 2, 45, 12, 'F');
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(194, 97, 42);
      doc.text("FSSAI APPROVED NO: 11521035000591", 147, stampY + 7);
      doc.text("VARDHAMAN MIDC BAKERY SECURITY", 147, stampY + 11);

      doc.save(`Invoice_CakeyAndCookie_${order.id}.pdf`);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  // Handle status simulations and show alerts
  const triggerPushAlert = (status: OrderStatus) => {
    let alertDetails = { title: '', message: '', type: 'info' };

    switch (status) {
      case 'baking':
        alertDetails = {
          title: '🔥 Oven Preheated!',
          message: 'The plant team has started mixing flour and rolling dough for consignment ' + activeOrder?.id,
          type: 'baking'
        };
        break;
      case 'decorating':
        alertDetails = {
          title: '🎨 Decors / Slicing!',
          message: 'Confectionery technicians are slicing the white-label slab cakes and sorting packaging partitions!',
          type: 'decorating'
        };
        break;
      case 'out_for_delivery':
        alertDetails = {
          title: '🚀 Logistics Truck Dispatched!',
          message: 'Consignment is securely loaded onto a temperature-controlled Vardhaman cargo container heading to your city!',
          type: 'delivery'
        };
        break;
      case 'delivered':
        alertDetails = {
          title: '🎁 Consignment Delivered!',
          message: 'The delivery challan has been signed. Check the boxes for freshness seals and GST invoice sheets!',
          type: 'delivered'
        };
        break;
      default:
        alertDetails = {
          title: '💖 Dispatch Authorized',
          message: 'Transactional credit clearing verified, baking queue slot locked!',
          type: 'placed'
        };
    }

    setActiveAlert(alertDetails);
    
    // Automatically fade out after 5 seconds
    setTimeout(() => {
      setActiveAlert(null);
    }, 5000);
  };

  const executeStatusChange = (status: OrderStatus) => {
    if (!activeOrder) return;
    
    // Call props tracker trigger
    onSimulateStatusChange(status);
    
    // If we are simulating on the fallback dummy order:
    if (!order && dummyOrder) {
      const updatedTimeline = dummyOrder.timeline.map((evt) => {
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

      setDummyOrder({
        ...dummyOrder,
        status,
        timeline: updatedTimeline
      });
    }

    triggerPushAlert(status);
  };

  const handleIdSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedOrderId.trim()) {
      setSearchError('Please fill out an Order ID to search.');
      return;
    }

    if (activeOrder && typedOrderId.trim().toUpperCase() === activeOrder.id.toUpperCase()) {
      setSearchError('');
    } else {
      setSearchError('Consignment not found. Try searching with VARD-7901.');
    }
  };

  if (!activeOrder) return null;

  const statusIndexes: Record<OrderStatus, number> = {
    placed: 0,
    baking: 1,
    decorating: 2,
    out_for_delivery: 3,
    delivered: 4
  };
  const activeIdx = statusIndexes[activeOrder.status];

  return (
    <section id="tracker-dashboard" className="py-16 sm:py-24 bg-[#FAFAF8] border-b border-stone-150">
      <div className="w-full px-4 sm:px-8 lg:px-14 relative">
        
        {/* DYNAMIC OVERLAY PUSH ALERT SYSTEM */}
        {activeAlert && (
          <div id="status-push-notification" className="fixed top-24 right-6 z-50 overflow-hidden rounded-2xl bg-[#1C140C] border border-[#5D3E1A] text-white p-5 shadow-2xl max-w-sm animate-slide-in font-sans">
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C2612A]/15 text-[#C2612A] ring-4 ring-[#C2612A]/5 animate-bounce">
                <Bell className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-sm font-bold text-white">{activeAlert.title}</h4>
                  <span className="font-sans text-[8px] uppercase font-bold tracking-widest text-stone-400">Just Now</span>
                </div>
                <p className="mt-1 text-xs text-stone-300 leading-relaxed font-medium">{activeAlert.message}</p>
                <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[9px] font-bold tracking-wide uppercase text-[#C2612A]">
                  <span>Push Delivery Alerts</span>
                  <span>Auto dismiss</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-serif italic text-sm text-[#C2612A] tracking-wider block">Real-Time Dispatch Logistics</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#5D3E1A] tracking-tight mt-2 uppercase">
            Track your <span className="font-serif italic block font-normal text-4xl text-[#C2612A] lowercase mt-1">consignment status</span>
          </h2>
          <div className="h-[2px] w-12 bg-[#C2612A] mx-auto my-5" />
          <p className="font-sans text-xs sm:text-sm text-stone-500 max-w-xl mx-auto leading-relaxed font-medium">
            Monitor baking milestones, sterile packaging status, and transport temperatures direct from our Pune MIDC baking facility.
          </p>
        </div>

        {/* Search Bar query */}
        <div className="max-w-md mx-auto mb-10">
          <form onSubmit={handleIdSearchSubmit} className="flex gap-2 p-1 bg-white border border-stone-200 rounded-2xl shadow-sm">
            <input
              type="text"
              id="order-search-input"
              value={typedOrderId}
              onChange={(e) => setTypedOrderId(e.target.value)}
              placeholder="e.g. VARD-7901"
              className="flex-1 bg-transparent px-4 py-3 font-sans text-xs outline-none transition uppercase font-bold text-[#5D3E1A] placeholder-stone-400"
            />
            <button
              id="order-search-btn"
              type="submit"
              className="rounded-xl bg-[#5D3E1A] px-5 py-3 font-sans text-[11px] font-bold text-white hover:bg-[#442C12] transition uppercase tracking-wider"
            >
              Verify
            </button>
          </form>
          {searchError && <p className="mt-2 text-xs text-[#C2612A] font-sans font-bold pl-2">{searchError}</p>}
        </div>

        {/* Interactive Simulation Dashboard (B2B Demonstration mode) */}
        <div className="rounded-3xl bg-[#C2612A]/5 border border-[#C2612A]/10 p-6 mb-10 flex flex-wrap items-center justify-between gap-5 text-[#5D3E1A]">
          <div className="flex items-start gap-3.5 max-w-lg">
            <PlayCircle className="h-8 w-8 text-[#C2612A] shrink-0 mt-0.5 animate-pulse" />
            <div className="font-sans">
              <h4 className="font-serif text-sm font-extrabold text-[#5D3E1A] uppercase tracking-wider">Logistics Alert System Demonstration</h4>
              <p className="text-stone-550 text-xs leading-relaxed mt-1 font-medium text-stone-600">
                This simulator showcases how our client push message alerts trigger live updates. Click a stage node below to update the simulated carrier truck status.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {(['placed', 'baking', 'decorating', 'out_for_delivery', 'delivered'] as OrderStatus[]).map((st) => (
              <button
                key={st}
                id={`sim-btn-${st}`}
                onClick={() => executeStatusChange(st)}
                className={`rounded-xl px-3.5 py-2 font-sans text-[9px] font-extrabold uppercase tracking-widest transition ${
                  activeOrder.status === st
                    ? 'bg-[#5D3E1A] text-white shadow-md'
                    : 'bg-white text-stone-600 hover:bg-[#C2612A]/10 border border-stone-200 shadow-sm'
                }`}
              >
                {st.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Tracker Panel Card Layout */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl border border-stone-200 flex flex-col md:flex-row">
          
          {/* Tracking Step progress */}
          <div className="flex-1 p-6 sm:p-10 space-y-8">
            <div className="flex items-center justify-between border-b border-stone-100 pb-5">
              <div>
                <span className="font-sans text-[10px] font-extrabold uppercase tracking-widest text-[#C2612A]">Consignment Tracker ID</span>
                <h3 className="font-serif text-xl font-bold text-[#5D3E1A] mt-1">{activeOrder.id}</h3>
              </div>
              <div className="text-right">
                <span className="font-sans text-[10px] font-extrabold uppercase tracking-widest text-stone-400 font-sans">Estimated Target arrival</span>
                <p className="font-serif text-lg font-bold text-emerald-700 mt-1 flex items-center justify-end gap-1">
                  <Clock className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider">{activeOrder.status === 'delivered' ? 'Completed & Confirmed' : activeOrder.estimatedDelivery}</span>
                </p>
              </div>
            </div>

            {/* Timelines list */}
            <div className="relative border-l border-stone-150 ml-5.5 space-y-8 pl-8 select-none">
              {activeOrder.timeline.map((evt, idx) => {
                const isCompleted = idx <= activeIdx;
                const isCurrent = idx === activeIdx;

                return (
                  <div key={evt.status} id={`timeline-row-${evt.status}`} className="relative">
                    
                    {/* Circle Node Icon */}
                    <span className={`absolute -left-[45px] top-0 flex h-8 w-8 items-center justify-center rounded-full border transition ${
                      isCompleted ? 'bg-[#5D3E1A] border-[#5D3E1A] text-white' : 'bg-white border-stone-200 text-stone-300'
                    }`}>
                      {isCompleted ? <Check className="h-4.5 w-4.5 stroke-[3]" /> : idx + 1}
                    </span>

                    {/* Content text */}
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <h4 className={`font-serif text-sm font-bold uppercase tracking-wide ${isCurrent ? 'text-[#C2612A] text-base' : isCompleted ? 'text-stone-800' : 'text-stone-400'}`}>
                          {evt.title}
                        </h4>
                        {evt.time && <span className="font-sans text-[10px] font-bold text-stone-400">{evt.time}</span>}
                      </div>
                      <p className={`mt-1 font-sans text-xs leading-relaxed max-w-lg font-medium ${isCurrent ? 'text-stone-605' : 'text-stone-400'}`}>
                        {evt.description}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer & Billing Recap Side columns */}
          <div className="w-full md:w-80 bg-[#FAF8F5] border-t md:border-t-0 md:border-l border-stone-200 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="space-y-2.5">
                <h4 className="font-serif text-[10px] font-bold uppercase tracking-wider text-stone-400">Consignment Recipient</h4>
                <div className="font-sans text-xs leading-relaxed font-medium">
                  <p className="font-bold text-[#5D3E1A] text-sm">{activeOrder.customer.name}</p>
                  <p className="text-stone-500 mt-1">{activeOrder.customer.address}, {activeOrder.customer.city}</p>
                  <p className="text-stone-400 mt-0.5">{activeOrder.customer.phone}</p>
                </div>
              </div>

              <div className="space-y-2.5 border-t border-stone-150 pt-4">
                <h4 className="font-serif text-[10px] font-bold uppercase tracking-wider text-stone-400">Transit Mode</h4>
                <p className="font-sans text-xs text-stone-600 font-bold uppercase tracking-wide">Vardhaman Logistical Fleet</p>
              </div>

              <div className="space-y-2.5 border-t border-stone-150 pt-4">
                <h4 className="font-serif text-[10px] font-bold uppercase tracking-wider text-stone-400">Crates Included</h4>
                <div className="space-y-2 font-medium">
                  {activeOrder.items.map((item) => (
                    <div key={item.id} className="text-xs text-stone-600 font-sans flex justify-between pr-2 border-b border-dashed border-stone-200 pb-1.5">
                      <span className="font-bold text-[#5D3E1A]">{item.quantity}x {item.menuItem.name}</span>
                      <span className="font-sans italic text-stone-400">₹{(item.menuItem.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="border-t border-stone-150 pt-5 text-center font-sans">
              <span className="font-sans text-[9px] font-extrabold uppercase tracking-widest text-[#C2612A]">Total Invoice (INR)</span>
              <p className="font-serif text-xl font-bold text-[#5D3E1A] mt-1">₹{activeOrder.total.toLocaleString('en-IN')}</p>
              
              <div className="mt-4 flex items-center justify-center gap-1.5 text-[9px] font-extrabold text-[#C2612A] uppercase tracking-widest bg-white border border-stone-200 rounded-full px-3 py-1 shadow-sm">
                <ShieldCheck className="h-4.5 w-4.5 text-[#C2612A]" />
                <span>Cleared: {activeOrder.payment.cardBrand}</span>
              </div>

              {/* Direct PDF exporter trigger */}
              <button
                id="tracker-invoice-pdf-btn"
                onClick={() => exportPDFInvoice(activeOrder)}
                disabled={isExporting}
                className="mt-3.5 w-full flex items-center justify-center gap-1.5 rounded-xl border border-stone-300 hover:border-[#C2612A] bg-white hover:bg-[#C2612A]/5 text-stone-600 hover:text-[#C2612A] py-2.5 font-sans text-xs font-bold uppercase tracking-wider transition disabled:opacity-50 select-none cursor-pointer"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-[#C2612A]" />
                    <span>Generating PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 text-[#C2612A]" />
                    <span>Download GST Invoice</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

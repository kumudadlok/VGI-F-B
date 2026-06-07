import React, { useState, useEffect } from 'react';
import { ShieldCheck, UserCheck, Calendar, FileText, Check, ArrowRight, X, Loader2, Award, Download, Building, AlertCircle } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { MenuItem, CartItem, Order, CustomInquiry } from '../types';

interface OrderHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOrder: (order: Order) => void;
  lastOrder: Order | null;
}

interface MockCorporateUser {
  id: string;
  representative: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  gstin: string;
  orders: Order[];
  inquiries: CustomInquiry[];
}

export default function OrderHistory({ isOpen, onClose, onSelectOrder, lastOrder }: OrderHistoryProps) {
  const [isLogged, setIsLogged] = useState(false);
  const [selectedUser, setSelectedUser] = useState<MockCorporateUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState<string | null>(null);

  const mockUsers: MockCorporateUser[] = [
    {
      id: "CORP-BEAN-HAVEN",
      representative: "Aarav Mehta",
      companyName: "The Bean Haven Cafés Ltd",
      email: "purchasing@coffeelounge.in",
      phone: "+91 91122 30606",
      address: "Survey No. 42-B, Koregaon Park Plaza, Sector 4, Pune, MH",
      gstin: "27AAACT2912D1Z4",
      orders: [
        {
          id: "VARD-7901",
          items: [
            {
              id: "bulk-cookies-luxury-opt",
              menuItem: {
                id: "bulk-cookies-luxury",
                name: "Wholesale Gourmet Cookies Case (100 Pcs)",
                description: "A bulk curated premium case of crisp-edge, chewy-center cookies.",
                category: "cookies",
                price: 4500,
                image: "/src/assets/images/choco_crunch_1780047370556.png",
                rating: 4.9,
                reviewsCount: 312,
                tags: ["Quality Verified", "Top Seller"]
              },
              quantity: 2,
              selectedSize: "Standard Case (100 Pcs)",
              selectedFlavor: "Classic Choco Pools",
              selectedIcing: "Aesthetic Bulk Catering Box"
            }
          ],
          subtotal: 9000,
          deliveryFee: 500,
          tax: 1620,
          total: 11120,
          customer: {
            name: "Aarav Mehta",
            email: "purchasing@coffeelounge.in",
            phone: "+91 91122 30606",
            address: "Survey No. 42-B, Koregaon Park Plaza",
            city: "Pune",
            zipCode: "411035"
          },
          payment: {
            cardBrand: "Terms Credit Line",
            last4: "B2B Invoice Net-15",
            transactionId: "TXN-B2B-019283"
          },
          status: "baking",
          estimatedDelivery: "Next business day by 10:00 AM",
          timeline: [],
          createdAt: "May 25, 2026"
        },
        {
          id: "VARD-3861",
          items: [
            {
              id: "bulk-rolls-vanilla-opt",
              menuItem: {
                id: "bulk-rolls-vanilla",
                name: "Madagascar Vanilla Cream Rolls (80 Pcs)",
                description: "Crisp flaky pastry horns filled with organic Madagascar vanilla custard.",
                category: "cookies",
                price: 2400,
                image: "/src/assets/images/cream_roll_box_1780047413276.png",
                rating: 5.0,
                reviewsCount: 198,
                tags: ["Freshly Filled", "Top Seller"]
              },
              quantity: 3,
              selectedSize: "Bulk Carton (80 Pcs)",
              selectedFlavor: "Madagascar Vanilla Cream",
              selectedIcing: "Pristine Sugar Dusting"
            }
          ],
          subtotal: 7200,
          deliveryFee: 500,
          tax: 1296,
          total: 8996,
          customer: {
            name: "Aarav Mehta",
            email: "purchasing@coffeelounge.in",
            phone: "+91 91122 30606",
            address: "Survey No. 42-B, Koregaon Park Plaza",
            city: "Pune",
            zipCode: "411035"
          },
          payment: {
            cardBrand: "Direct Corporate Visa",
            last4: "9812",
            transactionId: "TXN-B2B-010594"
          },
          status: "delivered",
          estimatedDelivery: "Delivered on May 18, 2026",
          timeline: [],
          createdAt: "May 18, 2026"
        }
      ],
      inquiries: [
        {
          id: "VARD-B2B-1841",
          customerName: "Aarav Mehta",
          customerEmail: "purchasing@coffeelounge.in",
          customerPhone: "+91 91122 30606",
          eventDate: "June 15, 2026",
          guestCount: 500,
          cakeType: "corporate",
          tiers: 3,
          shape: "square",
          flavor: "Eggless Caramel Walnut",
          icing: "With Custom Coffee-Bean Chocolate Print Shavings",
          description: "Required for our Koregaon Park outlet launch ceremony. Standardized tiers with customized white-label logos on top of the frosting.",
          status: "approved",
          createdAt: "May 20, 2026"
        }
      ]
    },
    {
      id: "CORP-VARDHAMAN-SM",
      representative: "Priya Sharma",
      companyName: "Vardhaman Supermarkets Group",
      email: "procurement@vardhamansm.co.in",
      phone: "+91 95521 02910",
      address: "Building A-1, Industrial Park, Chinchwad, Pune, MH",
      gstin: "27VARDM8291A1ZB",
      orders: [
        {
          id: "VARD-5921",
          items: [
            {
              id: "bulk-toast-saffron-opt",
              menuItem: {
                id: "bulk-toast-saffron",
                name: "Saffron Milk Butter Toast Carton (50 Packs)",
                description: "Double-baked traditional Kashmiri Saffron milk rusk toasts.",
                category: "cookies",
                price: 1800,
                image: "/src/assets/images/teatime_cookies_1780047351747.png",
                rating: 4.9,
                reviewsCount: 220,
                tags: ["Fragrant Kashmiri Saffron"]
              },
              quantity: 10,
              selectedSize: "Standard Carton (50 Packs)",
              selectedFlavor: "Sweet Saffron Butter",
              selectedIcing: "Retail Hanging Packs"
            }
          ],
          subtotal: 18000,
          deliveryFee: 0,
          tax: 3240,
          total: 21240,
          customer: {
            name: "Priya Sharma",
            email: "procurement@vardhamansm.co.in",
            phone: "+91 95521 02910",
            address: "Building A-1, Chinchwad Warehouse",
            city: "Pune",
            zipCode: "411019"
          },
          payment: {
            cardBrand: "Terms Credit Line",
            last4: "B2B Billing NET-30",
            transactionId: "TXN-VARD-981293"
          },
          status: "delivered",
          estimatedDelivery: "Delivered on May 22, 2026",
          timeline: [],
          createdAt: "May 22, 2026"
        }
      ],
      inquiries: [
        {
          id: "VARD-B2B-9023",
          customerName: "Priya Sharma",
          customerEmail: "procurement@vardhamansm.co.in",
          customerPhone: "+91 95521 02910",
          eventDate: "June 20, 2026",
          guestCount: 1500,
          cakeType: "corporate",
          tiers: 1,
          shape: "round",
          flavor: "Saffron Milk Cardamom Blend",
          icing: "Individually Barcoded Retail Wrap",
          description: "Developing customized premium saffron toast packaging for supermarkets chain trial. Need pre-labeled trays with custom branding barcodes.",
          status: "reviewed",
          createdAt: "May 24, 2026"
        }
      ]
    }
  ];

  // If a last placed order exists in context, append it dynamically to Bean Haven mock records for demo
  useEffect(() => {
    if (lastOrder && lastOrder.id) {
      const alreadyHas = mockUsers[0].orders.some(o => o.id === lastOrder.id);
      if (!alreadyHas) {
        mockUsers[0].orders.unshift(lastOrder);
      }
    }
  }, [lastOrder]);

  const handleLogin = (user: MockCorporateUser) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedUser(user);
      setIsLogged(true);
      setIsLoading(false);
    }, 900); // Sleek loading time to show skeleton loaders
  };

  const handleLogout = () => {
    setIsLogged(false);
    setSelectedUser(null);
  };

  // Professional PDF Export generator using jsPDF
  const exportPDFInvoice = async (order: Order) => {
    setIsExporting(order.id);
    
    // Tiny delay to simulate generating
    await new Promise((r) => setTimeout(r, 1200));

    try {
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      // Colors definitions
      const primaryColor = [93, 62, 26]; // #5D3E1A (Choco Brown)
      const accentColor = [194, 97, 42]; // #C2612A (Warm Orange)
      const darkColor = [30, 30, 30];
      const lightBgColor = [250, 248, 245];

      // Document font mappings
      doc.setFont("Helvetica", "bold");
      
      // Top luxury header stripe
      doc.setFillColor(93, 62, 26);
      doc.rect(0, 0, 210, 15, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text("CAKEY & COOKIE BAKERS  |  VARDHAMAN GROUP ALLIANCE", 15, 10);
      doc.text("GST REGISTRATION TAX INVOICE", 145, 10);

      // Company Info details
      doc.setTextColor(30, 30, 30);
      doc.setFontSize(22);
      doc.text("Cakey & Cookie Bakers", 15, 30);
      
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text("Industrial Plant Complex, Survey No. 173/2,", 15, 36);
      doc.text("Pandharkar Nagar, near Beena School, MIDC, Pune, MH 411035", 15, 41);
      doc.text("Corporate Inquiries: sales@vardhaman.group  |  +91 91122 30606", 15, 46);

      // Invoice Details Block
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

      // Divider line
      doc.setDrawColor(220, 215, 210);
      doc.line(15, 52, 195, 52);

      // Bill To & Ship To
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(93, 62, 26);
      doc.text("CONSIGNMENT BILL TO:", 15, 61);
      doc.text("ROUTE SHIPMENT TO:", 110, 61);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(30, 30, 30);
      doc.text(selectedUser?.companyName || "The Bean Haven Cafés Ltd", 15, 67);
      doc.text(`Attn: ${order.customer.name}`, 15, 72);
      doc.text(`Email: ${selectedUser?.email || "purchasing@coffeelounge.in"}`, 15, 77);
      doc.text(`GSTIN Registration: ${selectedUser?.gstin || "27AAACT2912D1Z4"}`, 15, 82);

      doc.text(selectedUser?.companyName || "The Bean Haven Cafés Ltd", 110, 67);
      doc.text(order.customer.address || "Koregaon Park Plaza Main Warehouse", 110, 72);
      doc.text(`${order.customer.city || "Pune"}, MH ${order.customer.zipCode || "411035"}`, 110, 77);
      doc.text(`Courier Tel: ${order.customer.phone}`, 110, 82);

      // Items Table header
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

      // Table rows items
      let currentY = tableY + 8;
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(30, 30, 30);

      order.items.forEach((item, index) => {
        // Alternating row backgrounds
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

        // Border row lines
        doc.setDrawColor(240, 235, 230);
        doc.line(15, currentY + 11, 195, currentY + 11);
        currentY += 11;
      });

      // Bottom sums block
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

      // Total invoice value
      doc.setDrawColor(194, 97, 42); // Orange / Rust accent
      doc.setLineWidth(0.5);
      doc.line(130, currentY + 12, 195, currentY + 12);
      
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(93, 62, 26);
      doc.text("Total Certified Invoice:", 130, currentY + 17);
      doc.text(`Rs. ${order.total.toLocaleString('en-IN')}`, 168, currentY + 17);

      // Terms of credit
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(130, 130, 130);
      doc.text("TERMS AND CONTRACT CONDITIONS:", 15, currentY + 8);
      doc.text("1. Strictly Net-15 or Net-30 credit from date of certified delivery challan release.", 15, currentY + 12);
      doc.text("2. Manufactured inside completely FSSAI sterile food safety plant conditions in Pune MIDC.", 15, currentY + 16);
      doc.text("3. This serves as a formal certified digital electronic tax receipt document under Vardhaman Alliance.", 15, currentY + 20);

      // Plant Authorization Stamps / Signature
      let stampY = currentY + 32;
      doc.setDrawColor(220, 215, 210);
      doc.setLineWidth(0.2);
      doc.line(15, stampY, 195, stampY);

      doc.setFont("Georgia", "italic");
      doc.setFontSize(10);
      doc.setTextColor(93, 62, 26);
      doc.text("Certified Baker Plant Authorization Stamp:", 15, stampY + 9);
      
      doc.setFillColor(250, 248, 245);
      doc.rect(145, stampY + 2, 45, 12, 'F');
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(194, 97, 42);
      doc.text("FSSAI APPROVED NO: 11521035000591", 147, stampY + 7);
      doc.text("VARDHAMAN MIDC BAKERY SECURITY", 147, stampY + 11);

      // Trigger automatic browser download
      doc.save(`Invoice_CakeyAndCookie_${order.id}.pdf`);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div id="history-drawer-backdrop" className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in font-sans">
      <div id="history-drawer-tap-out" onClick={onClose} className="absolute inset-0" />

      {/* Corporate Center Drawer container */}
      <div
        id="history-drawer-panel"
        className="relative z-10 flex h-full w-full max-w-lg flex-col bg-white shadow-2xl animate-slide-in border-l border-neutral-100"
      >
        {/* Drawer Header */}
        <div className="flex h-20 items-center justify-between border-b border-stone-200 px-6 bg-stone-50/50">
          <div className="flex items-center gap-2.5">
            <Building className="h-5 w-5 text-[#C2612A]" />
            <div>
              <h3 className="font-serif text-lg font-bold text-[#5D3E1A] uppercase tracking-wide">B2B Corporate Portal</h3>
              <p className="font-sans text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-0.5">Vardhaman Client Accounts Registry</p>
            </div>
          </div>
          <button
            id="close-history-btn"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100/50 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Drawer Content */}
        {!isLogged ? (
          /* CORPORATE GATEWAY LOGIN SCREEN */
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col justify-center space-y-8">
            <div className="text-center space-y-3 max-w-sm mx-auto">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C2612A]/5 text-[#C2612A] border border-[#C2612A]/10 shadow-sm mb-2">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#5D3E1A] uppercase tracking-wide">Client Portal Entry</h4>
              <p className="font-sans text-xs text-stone-500 leading-relaxed font-medium">
                Select an active pre-authorized corporate partner representative below to load purchase histories, custom inquiries, and secure Net-15 tax invoices.
              </p>
            </div>

            {/* Simulated Accounts Buttons */}
            <div className="space-y-4 max-w-sm mx-auto w-full">
              {isLoading ? (
                /* Sleek Database Fetch skeleton loader representation */
                <div className="space-y-3.5 py-6">
                  <div className="flex items-center gap-2 text-stone-400 text-xs font-mono justify-center mb-2">
                    <Loader2 className="h-4.5 w-4.5 animate-spin text-[#C2612A]" />
                    <span>FETCHING VARDHAMAN DB REPOSITORY...</span>
                  </div>
                  <div className="h-14 rounded-2xl shimmer-bg w-full" />
                  <div className="h-14 rounded-2xl shimmer-bg w-full" />
                </div>
              ) : (
                mockUsers.map((user) => (
                  <button
                    key={user.id}
                    id={`login-${user.id}`}
                    onClick={() => handleLogin(user)}
                    className="flex w-full items-center justify-between gap-4 border border-stone-200 hover:border-[#C2612A] rounded-2xl p-4 text-left hover:bg-stone-50/55 transition-all shadow-sm group focus:outline-none"
                  >
                    <div>
                      <span className="font-serif text-sm font-bold text-[#5D3E1A] group-hover:text-[#C2612A] transition-colors">{user.representative}</span>
                      <p className="font-sans text-[11px] text-stone-400 font-bold uppercase tracking-wider mt-1">{user.companyName}</p>
                    </div>
                    <ArrowRight className="h-4.5 w-4.5 text-stone-300 group-hover:translate-x-1 transition-all group-hover:text-[#C2612A]" />
                  </button>
                ))
              )}
            </div>

            <div className="rounded-2xl bg-[#C2612A]/5 border border-[#C2612A]/10 p-4.5 font-sans text-[11px] text-stone-550 leading-relaxed text-stone-500 text-center max-w-sm mx-auto">
              <p className="font-bold text-[#5D3E1A] uppercase text-[9px] tracking-wider mb-1">Corporate Relations Desk Notice</p>
              To pre-authorize a new café franchise account or modify credit line terms, consult with our Relations Manager at <a href="mailto:sales@vardhaman.group" className="text-[#C2612A] font-bold">sales@vardhaman.group</a>.
            </div>
          </div>
        ) : (
          /* --- LOGGED IN CORPORATE VIEWPORT --- */
          <div className="flex-1 overflow-y-auto flex flex-col font-sans">
            
            {/* Account Card Banner */}
            <div className="bg-[#FAF8F5] border-b border-stone-200/85 p-6 flex items-center justify-between gap-4">
              <div>
                <span className="font-sans text-[9px] font-bold uppercase tracking-wider text-[#C2612A] flex items-center gap-1">
                  <UserCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Authorized Representative Profile</span>
                </span>
                <h4 className="font-serif text-base font-black text-[#5D3E1A] mt-1 pr-2">{selectedUser?.companyName}</h4>
                <p className="font-sans text-[11px] text-stone-400 font-medium mt-0.5">{selectedUser?.representative} &bull; {selectedUser?.email}</p>
              </div>
              
              <button
                id="portal-logout-btn"
                onClick={handleLogout}
                className="rounded-lg border border-stone-300 px-3 py-1.5 font-sans text-[10px] font-bold text-stone-500 hover:bg-stone-100 uppercase tracking-widest transition shrink-0"
              >
                Log Out
              </button>
            </div>

            <div className="p-6 space-y-8 flex-1">
              
              {/* SECTION A: COMMITTED WHOLESALE SHIPMENTS HISTORY */}
              <div className="space-y-4">
                <span className="font-serif text-sm font-extrabold text-[#5D3E1A] flex items-center gap-1.5 uppercase tracking-tight">
                  <FileText className="h-4.5 w-4.5 text-[#C2612A]" />
                  <span>Wholesale Purchase Cargo Orders ({selectedUser?.orders.length})</span>
                </span>

                <div className="space-y-3.5">
                  {selectedUser?.orders.map((or) => (
                    <div
                      key={or.id}
                      className="rounded-2xl border border-stone-200 bg-white p-4.5 hover:shadow-md transition space-y-3.5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-sans text-xs font-bold text-stone-700">Order ID: {or.id}</span>
                            <span className="text-stone-300 text-[10px]">&bull;</span>
                            <span className="font-sans text-[11px] text-stone-400 font-medium">{or.createdAt}</span>
                          </div>
                          {or.items.map((item, index) => (
                            <p key={index} className="font-serif text-sm font-semibold text-[#5D3E1A] mt-1 pr-2">
                              {item.quantity}x {item.menuItem.name}
                            </p>
                          ))}
                        </div>

                        {/* Order status indicators */}
                        <span className={`rounded-xl px-2.5 py-1 font-sans text-[9px] font-bold uppercase tracking-wider leading-none shrink-0 ${
                          or.status === 'delivered'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            : 'bg-orange-50 text-orange-850 border border-orange-100'
                        }`}>
                          {or.status === 'delivered' ? 'Completed' : 'In Production'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-t border-stone-100 pt-3 text-xs">
                        <div>
                          <p className="font-sans text-[9px] uppercase font-bold text-stone-400">Dispatch Valuation</p>
                          <p className="font-sans font-extrabold text-[#5D3E1A] mt-0.5">₹{or.total.toLocaleString('en-IN')}</p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            id={`pdf-export-${or.id}`}
                            onClick={() => exportPDFInvoice(or)}
                            disabled={isExporting !== null}
                            className="flex items-center gap-1 rounded-xl border border-stone-250 hover:border-[#C2612A] bg-stone-50 hover:bg-stone-100/40 text-stone-600 hover:text-[#C2612A] px-3.5 py-2 font-sans text-[10px] font-bold transition disabled:opacity-40 select-none cursor-pointer"
                          >
                            {isExporting === or.id ? (
                              <>
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                <span>Generating PDF...</span>
                              </>
                            ) : (
                              <>
                                <Download className="h-3.5 w-3.5" />
                                <span>Invoice PDF</span>
                              </>
                            )}
                          </button>

                          <button
                            id={`track-order-${or.id}`}
                            onClick={() => {
                              onSelectOrder(or);
                              onClose();
                            }}
                            className="flex items-center gap-1 rounded-xl bg-[#5D3E1A] hover:bg-[#442C12] text-white px-3.5 py-2 font-sans text-[10px] font-bold transition select-none cursor-pointer"
                          >
                            <span>Live Track</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {selectedUser?.orders.length === 0 && (
                    <p className="font-sans text-xs text-stone-400 py-3 italic text-center">No historic cargo dispatches found on credit line.</p>
                  )}
                </div>
              </div>

              {/* SECTION B: BESPOKE CREATIVE CUSTOM CAKE INQUIRIES WORKFLOW */}
              <div className="space-y-4 pt-4 border-t border-stone-150">
                <span className="font-serif text-sm font-extrabold text-[#5D3E1A] flex items-center gap-1.5 uppercase tracking-tight">
                  <Award className="h-4.5 w-4.5 text-[#C2612A]" />
                  <span>Bespoke Custom Cake Inquiries ({selectedUser?.inquiries.length})</span>
                </span>

                <div className="space-y-3.5">
                  {selectedUser?.inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="rounded-2xl border border-stone-200 bg-stone-50/15 p-4 bg-[#FCFAFA] space-y-3.5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-sans text-xs font-bold text-stone-400">{inq.id}</span>
                            <span className="h-1 w-1 bg-stone-300 rounded-full" />
                            <span className="font-sans text-[10px] font-bold text-[#C2612A] uppercase tracking-wider">{inq.eventDate} launch</span>
                          </div>
                          <h5 className="font-serif text-md font-bold text-[#5D3E1A] mt-1">{inq.flavor}</h5>
                          <p className="font-sans text-[11px] text-stone-500 mt-1.5 leading-relaxed font-semibold italic">"{inq.description}"</p>
                        </div>

                        <span className={`rounded-xl px-2.5 py-1 font-sans text-[9px] font-bold uppercase tracking-wider leading-none shrink-0 ${
                          inq.status === 'approved'
                            ? 'bg-emerald-50 text-emerald-850 border border-emerald-100'
                            : 'bg-amber-50 text-amber-850 border border-amber-100'
                        }`}>
                          {inq.status === 'approved' ? 'Active Venture Approved' : 'Plant Review'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-t border-stone-150/70 pt-2.5 font-sans text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                        <span>Frequency: {inq.tiers === 1 ? 'Weekly' : 'Morning'} rotations</span>
                        {inq.status === 'approved' ? (
                          <span className="text-emerald-700 flex items-center gap-1 font-extrabold">
                            <Check className="h-3.5 w-3.5 stroke-[3]" /> Contract Quoted
                          </span>
                        ) : (
                          <span className="text-[#C2612A]">Contract Pending</span>
                        )}
                      </div>
                    </div>
                  ))}

                  {selectedUser?.inquiries.length === 0 && (
                    <p className="font-sans text-xs text-stone-400 py-3 italic text-center">No bespoke custom cake designs registered.</p>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

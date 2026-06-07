import React from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, Sparkles, ChefHat, Heart, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onCheckout
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  const deliveryFee = subtotal > 10000 ? 0 : 500; // Free above ₹10,000 INR
  const tax = subtotal * 0.18; // 18% standard Indian GST for wholesale food items
  const total = subtotal + deliveryFee + tax;

  return (
    <div id="cart-drawer-backdrop" className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in font-sans">
      <div id="cart-drawer-overlay-tap" onClick={onClose} className="absolute inset-0" />

      {/* Cart Tray Container */}
      <div
        id="cart-drawer-panel"
        className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl animate-slide-in border-l border-neutral-100"
      >
        {/* Drawer Header */}
        <div className="flex h-20 items-center justify-between border-b border-neutral-100 px-6 bg-amber-50/20">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-[#C2612A] stroke-[2]" />
            <h3 className="font-serif text-lg font-bold text-neutral-800">Your Dispatch Crate</h3>
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 font-sans text-xs font-bold text-[#5D3E1A]">
              {cart.reduce((a, b) => a + b.quantity, 0)} Case{cart.reduce((a, b) => a + b.quantity, 0) > 1 ? 's' : ''}
            </span>
          </div>
          <button
            id="close-cart-btn"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-50 text-neutral-400 hover:bg-neutral-150 hover:text-neutral-700 transition"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Drawer Body (Items lists) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              id={`cart-item-row-${item.id}`}
              className="flex gap-4 border-b border-neutral-50 pb-5 items-start"
            >
              {/* Product Tiny image */}
              <img
                src={item.menuItem.image}
                alt={item.menuItem.name}
                referrerPolicy="no-referrer"
                className="h-16 w-16 rounded-xl object-cover border border-neutral-100 bg-neutral-50"
              />

              {/* Item Info columns */}
              <div className="flex-1 font-sans text-xs">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-serif text-sm font-bold text-neutral-850 leading-tight">{item.menuItem.name}</h4>
                  <span className="font-serif text-sm font-bold text-neutral-900">₹{(item.menuItem.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>

                {/* Customized Selections Check Recap */}
                <div className="mt-2 space-y-1 bg-amber-50/30 rounded-xl p-2.5 border border-amber-100/20 text-[10px] leading-relaxed text-neutral-600">
                  {item.selectedSize && (
                    <p>
                      <span className="font-bold text-neutral-500 uppercase tracking-wide">Crate Size:</span> {item.selectedSize}
                    </p>
                  )}
                  {item.selectedFlavor && (
                    <p>
                      <span className="font-bold text-neutral-500 uppercase tracking-wide">Formulation:</span> {item.selectedFlavor}
                    </p>
                  )}
                  {item.selectedIcing && (
                    <p>
                      <span className="font-bold text-neutral-500 uppercase tracking-wide font-sans">Branding Box:</span> {item.selectedIcing}
                    </p>
                  )}
                  {item.specialRequests && (
                    <p className="text-amber-900">
                      <span className="font-bold text-neutral-500 uppercase tracking-wide">B2B Constraints:</span> "{item.specialRequests}"
                    </p>
                  )}
                </div>

                {/* Pricing & quantity modifier line */}
                <div className="mt-4 flex items-center justify-between">
                  {/* Quantity Modifier */}
                  <div className="flex items-center gap-2 border border-neutral-100 bg-neutral-50 rounded-lg p-1">
                    <button
                      onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                      className="h-6 w-6 font-bold flex items-center justify-center rounded bg-white text-xs text-neutral-500 hover:text-neutral-800 hover:shadow-sm"
                    >
                      -
                    </button>
                    <span className="font-sans text-xs font-bold w-5 text-center text-neutral-700">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                      className="h-6 w-6 font-bold flex items-center justify-center rounded bg-white text-xs text-neutral-500 hover:text-neutral-800 hover:shadow-sm"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove action */}
                  <button
                    id={`remove-item-${item.id}`}
                    onClick={() => onRemoveItem(item.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-neutral-50 text-neutral-400 hover:text-red-600 transition"
                  >
                    <Trash2 className="h-4 w-4 stroke-[1.85]" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {cart.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <ShoppingBag className="h-12 w-12 text-neutral-300 stroke-[1.5] mb-4 animate-bounce" />
              <h3 className="font-serif text-lg font-bold text-neutral-700">Dispatch crate is empty</h3>
              <p className="font-sans text-xs text-neutral-400 mt-1 max-w-xs leading-relaxed">
                Add premium wholesale cases of cookies or vanilla cream horns to formulate your corporate consignment package!
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer (Summaries check) */}
        {cart.length > 0 && (
          <div className="border-t border-neutral-100 bg-amber-50/25 p-6 space-y-4">
            <div className="space-y-2 font-sans text-xs sm:text-sm">
              <div className="flex items-center justify-between text-neutral-500">
                <span>Subtotal Value</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between text-neutral-500">
                <span>MIDC Corporate Delivery</span>
                <span>{deliveryFee === 0 ? <span className="text-emerald-600 font-bold">FRЕE (Over ₹10k)</span> : `₹${deliveryFee.toLocaleString('en-IN')}`}</span>
              </div>
              <div className="flex items-center justify-between text-neutral-500 border-b border-neutral-105 pb-2">
                <span>Wholesale GST (18%)</span>
                <span>₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between text-neutral-900 font-serif text-base font-bold pt-1">
                <span>Estimated Contract Value</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Micro warning */}
            <div className="flex items-start gap-1.5 rounded-xl bg-white border border-neutral-100 p-2.5 font-sans text-[10px] text-neutral-400">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>We pack bulk pastries in thermal multi-layer insulated crates with sanitization certificate tags included in dispatch.</span>
            </div>

            {/* CTA checkout button */}
            <button
              id="proceed-checkout-btn"
              onClick={onCheckout}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#5D3E1A] py-3.5 font-sans text-xs sm:text-sm font-bold text-white shadow-xl hover:bg-[#442C12] transition"
            >
              <span>Initialize Consignment Checkout</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

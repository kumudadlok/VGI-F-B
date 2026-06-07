import React, { useState } from 'react';
import { Star, MessageSquare, Plus, ChevronUp, CheckCircle, HelpCircle } from 'lucide-react';
import { Review } from '../types';

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export default function ReviewsSection({ reviews, onAddReview }: ReviewsSectionProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [newCategory, setNewCategory] = useState('Café Partner');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim() || !newCompany.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name: `${newName} (${newCompany})`,
      rating: newRating,
      text: newText,
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      verified: true,
      category: newCategory
    };

    onAddReview(newReview);
    setNewName('');
    setNewCompany('');
    setNewText('');
    setNewRating(5);
    setShowAddForm(false);
  };

  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <section id="partner-reviews" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="w-full px-4 sm:px-8 lg:px-14">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C2612A]/5 rounded-full border border-[#C2612A]/10 text-[#C2612A] text-[10px] font-bold uppercase tracking-wider">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Cooperative Success Testimonials</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#5D3E1A] tracking-tight uppercase leading-tight">
              Testimonials from Our <span className="font-serif italic text-[#C2612A] font-normal lowercase">network partners</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-stone-500 max-w-xl font-medium leading-relaxed">
              Hear from café owners, bakery distributors, and Vardhaman supermarkets who depend daily on our quality consistency and science of baking.
            </p>
          </div>

          {/* Aggregated Score Panel */}
          <div className="lg:col-span-5 bg-[#C2612A]/5 border border-[#C2612A]/10 rounded-3xl p-6 sm:p-8 flex items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1">
              <p className="font-sans text-[10px] font-bold text-stone-400 uppercase tracking-widest">Quality Assurance Score</p>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#5D3E1A]">{averageRating}</span>
                <span className="font-sans text-xs text-stone-400">/ 5.0</span>
              </div>
              <div className="flex text-amber-500 text-xs mt-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="font-sans text-[10px] text-stone-400 font-bold uppercase tracking-wider mt-1.5">Verified partner scores</p>
            </div>

            <button
              id="add-review-trigger-btn"
              onClick={() => setShowAddForm(!showAddForm)}
              className="rounded-xl bg-[#5D3E1A] hover:bg-[#442C12] text-white font-sans text-xs font-bold uppercase tracking-wider px-5 py-3.5 transition flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="h-4 w-4 stroke-[2.5]" />
              <span>Submit Testimonial</span>
            </button>
          </div>

        </div>

        {/* Submit Review Dialogue Block */}
        {showAddForm && (
          <div id="review-form-block" className="bg-[#FAF8F5] border border-stone-200 rounded-3xl p-6 sm:p-8 mb-12 animate-fade-in max-w-xl mx-auto shadow-md">
            <h3 className="font-serif text-md font-bold text-[#5D3E1A] border-b border-stone-200 pb-3 mb-5 uppercase tracking-wide">
              Submit Partner Testimonial
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs font-medium">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-605 block mb-1 uppercase tracking-wide text-[10px]">Corporate Representative Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Mehta"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 p-3.5 bg-white outline-none focus:border-[#C2612A]"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-605 block mb-1 uppercase tracking-wide text-[10px]">Company / Enterprise</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The Coffee Lounge Pune"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 p-3.5 bg-white outline-none focus:border-[#C2612A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-605 block mb-1 uppercase tracking-wide text-[10px]">Partner Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 p-3.5 bg-white outline-none focus:border-[#C2612A] font-bold text-[#5D3E1A]"
                  >
                    <option value="Café Chain Partner">Café Line Partner</option>
                    <option value="Supermarket Buyer">Supermarket Buyer</option>
                    <option value="Direct Franchisee">Direct Franchisee Outlet</option>
                    <option value="Hotel Banqueting">Hotel / Event Sponsor</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-stone-605 block mb-1 uppercase tracking-wide text-[10px]">Consistency Rating</label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full rounded-xl border border-stone-200 p-3.5 bg-white outline-none focus:border-[#C2612A] font-bold text-[#5D3E1A]"
                  >
                    <option value={5}>5 Stars ★★★★★ (Exceptional)</option>
                    <option value={4}>4 Stars ★★★★☆ (Consistent)</option>
                    <option value={3}>3 Stars ★★★☆☆ (Satisfactory)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-605 block mb-1 uppercase tracking-wide text-[10px]">Testimonial Context</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Share details of delivery punctuality, ingredient freshness, or customer reception..."
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full rounded-2xl border border-stone-200 p-3.5 bg-white outline-none focus:border-[#C2612A] resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="rounded-full border border-stone-200 px-6 py-2.5 font-bold uppercase tracking-wider text-[11px] text-stone-650 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#5D3E1A] hover:bg-[#442C12] text-white font-bold px-7 py-2.5 uppercase tracking-wider text-[11px]"
                >
                  Confirm Testimonial
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews List Grid */}
        <div id="reviews-list-grid" className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              id={`review-card-${rev.id}`}
              className="bg-white border border-stone-200 hover:border-[#C2612A]/30 rounded-3xl p-6.5 shadow-sm space-y-4 flex flex-col justify-between transition-all"
            >
              <div className="space-y-4">
                {/* Score */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500 text-xs gap-0.5">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="font-sans text-[10px] text-stone-400 font-bold uppercase">
                    {rev.date}
                  </span>
                </div>

                {/* Body Text */}
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-stone-600 italic font-medium">
                  "{rev.text}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3.5 border-t border-stone-105 pt-4 mt-auto">
                {rev.avatar ? (
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    referrerPolicy="no-referrer"
                    className="h-10 w-10 rounded-full object-cover border border-stone-200"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C2612A]/5 text-[#C2612A] font-sans text-sm font-bold border border-[#C2612A]/10">
                    {rev.name.charAt(0)}
                  </div>
                )}
                <div className="font-sans text-xs font-medium">
                  <h4 className="font-bold text-stone-800 flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    {rev.verified && (
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-600 fill-emerald-50 text-white" />
                    )}
                  </h4>
                  <p className="text-stone-400 text-[10px] uppercase tracking-wider font-bold">{rev.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { ShieldCheck, Package, Info } from 'lucide-react';

export interface B2BProductSpec {
  productName: string;
  unit: string;
  master: string;
}

export const B2B_PRODUCTS_SPEC: B2BProductSpec[] = [
  {
    productName: 'Chocolate Crunch / Jaggery Oats / Almond Coconut Cookies',
    unit: '75 Pcs',
    master: '1 Box'
  },
  {
    productName: 'Finger Cake (Box Pack & Jar Pack)',
    unit: '50 Pcs / 24 Pcs',
    master: '1 Box'
  },
  {
    productName: 'Cream Roll',
    unit: '24 Pcs',
    master: '1 Box'
  },
  {
    productName: 'Almond Slice Cake',
    unit: '40 Pcs * 6 Jar',
    master: '1 Box'
  },
  {
    productName: 'Cookies (Choco Crunch / Jaggery Oats / Almond Coconut)',
    unit: '40 Pcs * 6 Jar',
    master: '1 Box'
  },
  {
    productName: 'Karela Cookies / Pista Cookies / Makkhan Tost',
    unit: '40 Pcs * 6 Jar',
    master: '1 Box'
  },
  {
    productName: 'Butter Khari / Usmania Cookies',
    unit: '40 Pcs * 6 Jar',
    master: '1 Box'
  }
];

export default function B2BProductSpecTable() {
  return (
    <div id="b2b-product-spec-container" className="w-full my-12 px-4 md:px-8 lg:px-14">
      {/* Table Label / Meta Title */}
      <div className="mb-6 text-center md:text-left flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="font-serif text-xl font-bold text-[#5D3E1A] flex items-center justify-center md:justify-start gap-2">
            <Package className="h-5 w-5 text-[#C2612A]" />
            B2B Product Packaging Specifications
          </h4>
          <p className="font-sans text-xs text-stone-500 font-medium">
            Standard unit and master-box specifications for bulk commercial shipments and dealership allocations.
          </p>
        </div>
        <div className="inline-flex self-center md:self-auto items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-full text-xs font-bold font-sans">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>FSSAI Certified Shipping Standards</span>
        </div>
      </div>

      {/* Styled Grid/Table strictly matching the visual look of the screenshot */}
      <div className="overflow-hidden rounded-2xl border border-[#0B2545] shadow-lg bg-white">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse font-sans text-left">
            <thead>
              <tr className="bg-[#0B2545] text-white">
                <th className="py-4.5 px-6 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider border-r border-[#081E38] w-[55%]">
                  Product
                </th>
                <th className="py-4.5 px-6 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider border-r border-[#081E38] text-center w-[25%] border-l border-white/10">
                  Unit
                </th>
                <th className="py-4.5 px-6 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-center w-[20%] border-l border-white/10">
                  Master
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0B2545]">
              {B2B_PRODUCTS_SPEC.map((spec, idx) => (
                <tr 
                  key={idx} 
                  className={`hover:bg-[#FAF8F5]/70 transition-colors ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'
                  }`}
                >
                  <td className="py-4 px-6 text-xs sm:text-sm font-bold text-stone-850 leading-relaxed border-r border-[#0B2545] align-middle">
                    {spec.productName}
                  </td>
                  <td className="py-4 px-6 text-xs sm:text-sm font-semibold text-stone-700 text-center border-r border-[#0B2545] align-middle whitespace-nowrap">
                    {spec.unit}
                  </td>
                  <td className="py-4 px-6 text-xs sm:text-sm font-semibold text-stone-750 text-center align-middle whitespace-nowrap">
                    {spec.master}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer hint */}
      <div className="mt-4 flex items-start gap-2 px-4 py-3 bg-stone-50 rounded-xl border border-stone-150">
        <Info className="h-4 w-4 text-[#C2612A] shrink-0 mt-0.5" />
        <p className="font-sans text-[11px] text-stone-500 leading-normal font-medium">
          Note: Products can be requested under customized unbranded white-label containers, personalized retail brands, or standard Vardhaman Group wholesale packaging. Volume discounts apply on contracts exceeding 10 master cases weekly.
        </p>
      </div>
    </div>
  );
}

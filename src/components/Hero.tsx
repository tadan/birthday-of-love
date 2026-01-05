import imgEaf26Ddd2D3C455F936BF59A6A0D83441 from "figma:asset/fbc77f4658200efd2d384f5c483254426dd6d7ad.png";
import { PhotoDecoration } from "./PhotoDecoration";

export function Hero() {
  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center px-4 py-12 md:py-20 pb-80 md:pb-96">
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img 
          alt="" 
          className="absolute max-w-none object-cover size-full" 
          src={imgEaf26Ddd2D3C455F936BF59A6A0D83441} 
        />
        <div className="absolute bg-[rgba(24,41,92,0.2)] inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">
        <p className="font-['ABC_Favorit_Condensed_Unlicensed_Trial:Bold',sans-serif] text-[#f2ebd5] text-xl md:text-[32px] mb-8 md:mb-12 whitespace-nowrap">
          29 August 2026 — Abruzzo
        </p>
        
        <h1 style={{ fontFamily: 'Gyst, Georgia, serif' }} className="font-bold text-[#fdc840] text-6xl md:text-[120px] lg:text-[180px] leading-[0.9]">
          Birthday of Love
        </h1>
      </div>
    </section>
  );
}
"use client";
import Image from "next/image";

export default function DefaultBanner() {
  return (
    <div className="relative h-[174px] w-full border-b">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-black to-emerald-600" />

      {/* same artwork & offset as your error-page snippet */}
      <Image
        src="/login/roadmap.png"
        alt=""
        width={350}
        height={250}
        className="absolute -right-10 -top-[63px] hidden md:block pointer-events-none select-none mix-blend-soft-light"
        priority
      />
    </div>
  );
}

"use client";
import Image from "next/image";

export default function DashboardBanner() {
  return (
    <div className="relative h-[306px] w-full border-b">
      {/* gradient strip */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-black to-emerald-600" />

      {/* dashboard illustration pushed up 63 px */}
      <Image
        src="/login/roadmap.png"
        alt=""
        width={448}
        height={335}
        className="absolute -right-10 -top-[63px] hidden md:block pointer-events-none select-none mix-blend-soft-light"
        priority
      />
    </div>
  );
}

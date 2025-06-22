"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * ErrorShell
 *  - children   : JSX inside the white card
 *  - showBanner : toggle the top banner
 */
export default function ErrorShell({ children, showBanner = true }) {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* ---------- top banner ---------- */}
      {showBanner && (
        <div className="bg-black relative h-[174px] w-full border-b">
          {/* gradient strip */}
          <div className="h-full w-full bg-gradient-to-r from-emerald-600 via-black to-emerald-600" />

          {/* illustration pushed far right */}
          <Image
            src="/login/roadmap.png"          /* change path if needed */
            alt=""
            width={448}
            height={335}
            className="absolute -right-10 -top-[63px] hidden md:block pointer-events-none select-none mix-blend-soft-light"
            priority
          />
        </div>
      )}

      {/* ---------- centered card ---------- */}
      <div
        /* negative top margin on md+ so it overlaps the banner */
        className="relative z-10 mx-auto -mt-0 w-full max-w-[1320px] rounded-[15px] bg-white p-6 shadow-sm md:-mt-14 md:p-12"
      >
        {children}

        <div className="mt-10 flex justify-center">
          <Link
            href="/"
            className="inline-block rounded-md bg-emerald-400 px-8 py-3 font-semibold text-textHead hover:opacity-90"
          >
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
}

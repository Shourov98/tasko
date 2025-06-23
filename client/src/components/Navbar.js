"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdStopwatch } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa6";
import { PiSpinnerBallBold } from "react-icons/pi";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const firstName = user?.fullName?.split(" ")[0] ?? "Guest";

  /* ----- tiny dropdown (click-outside to close) ----- */
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) setOpen(false);
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  const linkClass = (path) =>
    pathname.startsWith(path)
      ? "flex items-center gap-2 text-emerald-400"
      : "flex items-center gap-2 text-white/90 hover:text-emerald-300";

  return (
    <header className="fixed inset-x-0 top-0 z-20 flex items-center justify-between bg-transparent px-12 py-6">
      {/* logo */}
      <div className="flex items-center gap-2 text-white">
        <IoMdStopwatch size={28} />
        <span className="text-xl font-semibold">Tasko</span>
      </div>

      {/* nav links */}
      <nav className="hidden md:flex items-center gap-8 font-medium">
        <Link href="/dashboard" className={linkClass("/dashboard")}>
          <FaClipboardList size={22} />
          Task List
        </Link>
        <Link href="/spin" className={linkClass("/spin")}>
          <PiSpinnerBallBold size={22} />
          Spin
        </Link>
      </nav>

      {/* user dropdown */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-full bg-emerald-600 px-4 py-1 text-sm font-semibold text-black hover:opacity-90"
        >
          {firstName}
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-36 rounded-md bg-white py-2 text-sm shadow-lg">
            <button
              onClick={logout}
              className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CongratulationsModal({ open, onClose }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[90%] max-w-md rounded-xl bg-white p-8 text-center shadow-lg md:max-w-lg"
      >
        {/* fireworks illustration */}
        <Image
          src="/congratulation.png" 
          alt="Congratulations"
          width={300}
          height={180}
          className="mx-auto mb-6 w-[70%] max-w-[260px]"
        />

        <h3 className="mb-2 text-2xl font-bold text-brandMint">Congratulations</h3>
        <p className="mb-6 text-sm text-gray-600">
          Successfully completed the task and earned 20 points!
        </p>

        <button
          onClick={onClose}
          className="rounded bg-brandMint px-6 py-2 font-medium text-textHead hover:opacity-90"
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
}

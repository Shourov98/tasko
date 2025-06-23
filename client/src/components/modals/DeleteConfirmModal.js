"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function DeleteConfirmModal({ open, onCancel, onConfirm }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[90%] max-w-sm rounded-xl bg-white p-8 text-center shadow-lg md:max-w-md"
      >
        <Image
          src="/modals/delete-warning.png" // place your illustration
          alt="Warning"
          width={220}
          height={150}
          className="mx-auto mb-6 w-[60%] max-w-[220px]"
        />

        <h3 className="mb-2 text-2xl font-bold text-textHead">Are you sure ?</h3>
        <p className="mb-8 text-sm text-gray-600">
          Do you want to delete this task from the app?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="rounded bg-brandMint px-6 py-2 font-medium text-textHead hover:opacity-90"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="rounded bg-red-500/10 px-6 py-2 font-medium text-red-600 hover:bg-red-500/20"
          >
            No
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

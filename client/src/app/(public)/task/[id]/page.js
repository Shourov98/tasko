"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, Calendar, Trash2, Pencil } from "lucide-react";   // hero icons
import TopBanner from "@/components/TopBanner";

export default function TaskDetails() {
  const router = useRouter();

  /* ─── demo state – replace with real fetch ─── */
  const [status, setStatus] = useState("InProgress");
  const [points] = useState(20);
  /* ------------------------------------------- */

  const statuses = ["Pending", "InProgress", "Done"];

  /* colour map for status pill */
  const pill = {
    Pending: "text-fuchsia-600",
    InProgress: "text-amber-500",
    Done: "text-emerald-600",
  };

  return (
    <>
      {/* banner (smaller 174 px) */}
      <TopBanner variant="default" />

      {/* details card */}
      <section className="relative z-10 mx-auto -mt-8 w-full max-w-[1320px] rounded-[15px] bg-white px-8 py-10 md:px-14 md:py-12 shadow">
        {/* header row */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Task Details</h2>

          <div className="flex items-center gap-4">
            {/* points chip */}
            {points > 0 && (
              <span className="rounded-full bg-fuchsia-500/10 px-4 py-1 text-sm font-semibold text-fuchsia-600">
                {points} Points
              </span>
            )}

            {/* Edit / Back */}
            <button className="inline-flex items-center gap-2 rounded bg-amber-50 px-4 py-2 text-sm font-medium text-amber-600 hover:bg-amber-100">
              <Pencil size={16} /> Edit Task
            </button>
            <button
              onClick={() => router.back()}
              className="rounded bg-brandMint px-4 py-2 text-sm font-medium text-textHead hover:opacity-90"
            >
              Back
            </button>
          </div>
        </div>

        <hr className="mb-8 border-t" />

        {/* main content row */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* left icon */}
          <div className="flex-shrink-0">
            <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-brandMint text-4xl font-bold text-textHead">
              {/* placeholder icon / initials */}
              <span className="-translate-y-[2px]">🗂️</span>
            </div>
          </div>

          {/* details column */}
          <div className="flex flex-1 flex-col gap-6">
            {/* title + description */}
            <div>
              <h3 className="mb-1 text-2xl font-semibold">Art and Craft</h3>
              <p className="max-w-3xl text-sm leading-relaxed text-textBody">
                Select the role that you want to candidates for and upload your
                job description. Select the role that you want to candidates
                for and upload your job description. Select the role that you
                want to candidates for and upload your job description.
              </p>
            </div>

            {/* date & status pill */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>Friday, April 19 – 2024</span>
              </div>

              <span className={`flex items-center gap-2 ${pill[status]}`}>
                • {status}
              </span>
            </div>

            {/* change status select */}
            <div className="flex max-w-xs flex-col gap-2">
              <label className="text-sm font-medium text-textHead">
                Change Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-11 rounded border px-3 text-sm"
              >
                {statuses.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* bottom action row */}
        <div className="mt-12 flex flex-col gap-4 md:flex-row md:justify-end">
          <button className="inline-flex items-center justify-center gap-2 rounded bg-red-500/10 px-10 py-3 text-sm font-medium text-red-600 hover:bg-red-500/20">
            <Trash2 size={16} /> Delete Task
          </button>

          <button className="rounded bg-brandMint px-10 py-3 text-sm font-medium text-textHead hover:opacity-90">
            Submit
          </button>
        </div>
      </section>
    </>
  );
}

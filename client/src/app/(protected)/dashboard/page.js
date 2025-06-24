"use client";
import { useState } from "react";
import DashboardBanner from "@/components/DashboardBanner";
import { useTasks } from "@/context/TaskContext";
import TaskCard from "@/components/TaskCard";
import Image from "next/image";

export default function Dashboard() {
  const { list } = useTasks();          // ← replace with props you exposed
  const [catFilter, setCat] = useState("");
  const [statusFilter, setStat] = useState("");

  const categories = [
    "Arts & Crafts",
    "Nature",
    "Family",
    "Sport",
    "Friends",
    "Meditation",
  ];

  const filtered = list.filter((t) => {
    const catOk = catFilter ? t.category === catFilter : true;
    const stOk = statusFilter ? t.status === statusFilter : true;
    return catOk && stOk;
  });

  return (
    <>
      <DashboardBanner />

      <section className="relative z-10 mx-auto -mt-16 w-full max-w-[1320px] rounded-[15px] bg-white p-6 md:p-10 shadow-lg">
        {/* greeting (over banner) */}
        <h2 className="absolute -top-12 left-8 text-2xl font-semibold text-white">
          Hi&nbsp;Thomas, Welcome to Dashboard
        </h2>

        {/* sticky filter bar */}
        <div className="sticky top-0 z-10 flex flex-wrap items-center gap-4 bg-white py-4">
          <h3 className="text-lg font-semibold">All Task List</h3>

          <select
            value={catFilter}
            onChange={(e) => setCat(e.target.value)}
            className="h-10 rounded border px-3 text-sm"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStat(e.target.value)}
            className="h-10 rounded border px-3 text-sm"
          >
            <option value="">All Tasks</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          <button
            onClick={() => {/* open create modal */}}
            className="ml-auto rounded bg-brandMint px-6 py-2 font-medium text-textHead hover:opacity-90"
          >
            + Add New Task
          </button>
        </div>

        {/* task grid */}
        <div className="mt-4 h-[540px] overflow-y-auto">
          {filtered.length ? (
            <div className="grid auto-rows-[1fr] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((t) => (
                <TaskCard key={t.id} task={t} />
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <Image 
              src="/emptyPage.png"
              alt="No tasks illustration"
              width={460}
              height={400}
              className="justify-center items-center"
              priority
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

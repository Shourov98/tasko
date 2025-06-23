"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DefaultBanner from "@/components/DefaultBanner";
import { useTasks } from "@/context/TaskContext";

const CATEGORIES = [
  "Arts & Crafts",
  "Nature",
  "Family",
  "Sport",
  "Friends",
  "Meditation",
];

export default function SpinPage() {
  const router = useRouter();
  const { setFilter } = useTasks();          // <-- add this setter in TaskContext
  const [selected, setSelected] = useState("Arts & Crafts");
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null); // null until first spin

  /* pick random segment when Spin clicked */
  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    const index = Math.floor(Math.random() * CATEGORIES.length);
    const picked = CATEGORIES[index];
    const turns = 5 + index / CATEGORIES.length; // 5 full spins + land
    setSelected(picked);

    const wheel = document.getElementById("wheel");
    wheel.style.transition = "transform 4s cubic-bezier(0.33, 1, 0.68, 1)";
    wheel.style.transform = `rotate(${turns}turn)`;

    setTimeout(() => {
      setSpinning(false);
      setResult(picked);
    }, 4000);
  };

  const goToTask = () => {
    setFilter({ category: result });   // you add this action in context
    router.push("/dashboard");
  };

  return (
    <>
      <DefaultBanner />

      <section className="relative z-10 mx-auto -mt-8 w-full max-w-[1320px] rounded-[15px] bg-white p-8 md:p-14 shadow">
        <h2 className="mb-6 text-xl font-semibold">Spin Wheel</h2>

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* ---------- Wheel ---------- */}
          <div className="mx-auto md:mx-0">
            <div className="relative h-[360px] w-[360px]">
              {/* pointer */}
              <div className="absolute left-1/2 top-[calc(100%+6px)] -translate-x-1/2">
                <div className="h-0 w-0 border-x-[25px] border-b-[50px] border-x-transparent border-b-green-600 drop-shadow-lg" />
              </div>

              {/* wheel svg */}
              <svg
                id="wheel"
                viewBox="0 0 100 100"
                className="h-full w-full origin-center"
              >
                {CATEGORIES.map((cat, i) => {
                  const start = (i / CATEGORIES.length) * 360;
                  const end = ((i + 1) / CATEGORIES.length) * 360;
                  const large = end - start > 180 ? 1 : 0;
                  const x1 = 50 + 50 * Math.cos((Math.PI * start) / 180);
                  const y1 = 50 + 50 * Math.sin((Math.PI * start) / 180);
                  const x2 = 50 + 50 * Math.cos((Math.PI * end) / 180);
                  const y2 = 50 + 50 * Math.sin((Math.PI * end) / 180);
                  const fill =
                    ["#a4e2a0", "#008f39", "#6dd28a", "#1273be", "#c2d4f6", "#ff8a1d"][i];
                  return (
                    <g key={cat}>
                      <path
                        d={`M50 50 L ${x1} ${y1} A 50 50 0 ${large} 1 ${x2} ${y2} Z`}
                        fill={fill}
                        stroke="white"
                        strokeWidth="0.5"
                      />
                      {/* label */}
                      <text
                        x="50"
                        y="50"
                        transform={`rotate(${start + (end - start) / 2} 50 50) translate(25 0) rotate(90 0 0)`}
                        fontSize="3"
                        textAnchor="middle"
                      >
                        {cat}
                      </text>
                    </g>
                  );
                })}
                {/* center cap */}
                <circle cx="50" cy="50" r="6" fill="white" />
              </svg>
            </div>

            <p className="mt-6 text-center text-sm text-textBody">
              Spin Wheel to pick your task
            </p>
          </div>

          {/* ---------- Category selector ---------- */}
          <div className="mx-auto w-full max-w-xs md:mx-0">
            <label className="mb-2 block text-sm font-medium text-textHead">
              Select Task Category
            </label>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="h-11 w-full rounded border px-3 text-sm"
              disabled={spinning}
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ---------- Buttons ---------- */}
        <div className="mt-10 flex flex-col items-center gap-4 md:flex-row md:justify-center">
          <button
            onClick={handleSpin}
            disabled={spinning}
            className="w-48 rounded bg-brandMint px-6 py-3 font-medium text-textHead hover:opacity-90 disabled:opacity-50"
          >
            {spinning ? "Spinning…" : "Spin"}
          </button>

          {result && (
            <button
              onClick={goToTask}
              className="w-48 rounded bg-brandMint px-6 py-3 font-medium text-textHead hover:opacity-90"
            >
              Go to Task
            </button>
          )}
        </div>
      </section>
    </>
  );
}

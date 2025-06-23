"use client";
import TaskCard from "@/components/TaskCard";
import TopBanner from "@/components/TopBanner";

export default function Dashboard() {
  return (

    <>
    <TopBanner variant="dashboard" />
    <section className="relative mx-auto w-full shadow-2xl max-w-[1320px] bg-white p-6 md:p-10 rounded-[15px]">
      {/* --- Greeting (overlapping banner) --- */}
      <div className="absolute -top-[90px] left-0 w-full z-10 px-8">
        <h2 className="text-2xl font-semibold text-white">
          Hi Thomas, Welcome to Dashboard
        </h2>
      </div>

      {/* --- All-Task List card content --- */}
      

      {/* filter bar (sticky inside card) */}
      <div className="sticky top-0 z-10 flex flex-wrap justify-between items-center gap-4 px-6 bg-white py-3">
        <h3 className="mb-4 text-lg font-semibold">All Task List</h3>
        <div className="flex items-center gap-4">
          <select className="h-10 rounded border px-3 text-sm">
            <option>Select Task Category</option>
            <option>Arts and Craft</option>
            <option>Nature</option>
            <option>Sport</option>
            <option>Friends</option>
            <option>Family</option>
            <option>Meditation</option>
          </select>

          <select className="h-10 rounded border px-3 text-sm">
            <option>All Tasks</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          <button className="ml-auto rounded bg-emerald-400 px-6 py-2 font-medium text-textHead hover:bg-emerald-300">
            + Add New Task
          </button>
        </div>
      </div>

      {/* task grid — scrolls inside the card only */}
      <div className="mt-4 h-[540px] overflow-y-auto">
        <div className="grid auto-rows-[1fr] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <TaskCard key={i} />
          ))}
        </div>
      </div>
    </section>
    </>
  );
}

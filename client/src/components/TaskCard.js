"use client";

import { useRouter } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuCalendarDays } from "react-icons/lu";
import { useTasks } from "@/context/TaskContext";
import { GrTasks } from "react-icons/gr";


const statusPill = {
  Pending:  "text-fuchsia-500",
  "In Progress": "text-amber-500",
  Done:     "text-emerald-500",
};

export default function TaskCard({ task }) {
  const router = useRouter();
  const { deleteTask } = useTasks();

  const handleDelete = async (e) => {
    e.stopPropagation();          // don’t trigger card click
    await deleteTask(task._id);
  };

  const dateStr = new Date(task.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article
      onClick={() => router.push(`/task/${task._id}`)}
      className="flex cursor-pointer flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow transition hover:shadow-md"
    >
      {/* top row: category + trash */}
      <div className="flex items-start justify-between">
        {/* colored circle w/ placeholder icon */}
        <div className="flex items-center justify-between gap-3 rounded-full text-2xl text-black/70">
          <GrTasks size={22} />
          <h3 className="text-xl font-bold">{task.category}</h3>
        </div>

        <button onClick={handleDelete} className="text-red-500 hover:text-red-600">
          <RiDeleteBin6Line size={22} />
        </button>
      </div>

      {/* title / desc */}
      <p className="line-clamp-2 text-sm text-gray-600">{task.description}</p>

      {/* bottom row: date + status pill */}
      <div className="mt-auto flex items-center justify-between pt-2 text-sm">
        <span className="flex items-center gap-2 font-medium text-gray-900">
          <LuCalendarDays size={16} />
          {dateStr}
        </span>

        <span className={`flex items-center gap-1 font-semibold ${statusPill[task.status]}`}>
          • {task.status}
        </span>
      </div>
    </article>
  );
}

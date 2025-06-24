"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Check, Calendar, Trash2, Pencil } from "lucide-react";
import { GrTasks } from "react-icons/gr";
import { toast } from "sonner";
import TopBanner from "@/components/TopBanner";
import { useTasks } from "@/context/TaskContext";
import { useAuth } from "@/context/AuthContext";
import CongratulationsModal from "@/components/modals/CongratulationsModal";
import DeleteConfirmModal from "@/components/modals/DeleteConfirmModal";

export default function TaskDetails() {
  const { id } = useParams();              // /task/[id]
  const router   = useRouter();
  const { getTask, updateTask, deleteTask } = useTasks();
  const { updatePoints } = useAuth();

  const [task, setTask]   = useState(null);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showCongrets, setShowCongrets] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  /* 1️⃣  load from context (or 404) */
  useEffect(() => {
    const t = getTask(id);
    console.log(id);
    if (t) {
      setTask(t);
      setStatus(t.status);
    } else {
      toast.error("Task not found");     // could also fetch-on-demand
      router.push("/dashboard");
    }
  }, [id]);

  if (!task) return null;                // (or a spinner)

  /* colour map for status pill */
  const pill = {
    Pending: "text-fuchsia-600",
    "In Progress": "text-amber-500",
    Done: "text-emerald-600",
  };

  /* 🗑 delete */
  async function handleDelete(e) {
    e.stopPropagation();
    await deleteTask(task._id);
    toast.success("Task deleted");
    router.push("/dashboard");
  }

  /* ✅ submit status change */
  async function handleSubmit() {
    try {
      setSubmitting(true);
      await updateTask(task._id, { status });

      // award points exactly once
      if (status === "Done" && task.status !== "Done" && !task.pointsAwarded) {
        updatePoints((task.points ?? 0) + 20);
        setShowCongrets(true);
      }

      toast.success("Task updated!");
      router.refresh();          // revalidate if you use server component
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <TopBanner variant="default" />

      <section className="relative z-10 mx-auto -mt-8 w-full max-w-[1320px] rounded-[15px] bg-white px-8 py-10 md:px-14 md:py-12 shadow">
        {/* header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Task Details</h2>

          <div className="flex items-center gap-4">
            {task.pointsAwarded && (
              <span className="rounded-full bg-fuchsia-500/10 px-4 py-1 text-sm font-semibold text-fuchsia-600">
                {task.points} Points
              </span>
            )}

            <button
              onClick={() => router.push(`/task/${task._id}/edit`)}
              className="inline-flex items-center gap-2 rounded bg-amber-50 px-4 py-2 text-sm font-medium text-amber-600 hover:bg-amber-100"
            >
              <Pencil size={16} /> Edit Task
            </button>

            <button
              onClick={() => router.back()}
              className="rounded bg-emerald-500 px-4 py-2 text-sm font-medium text-textHead hover:bg-emerald-300"
            >
              Back
            </button>
          </div>
        </div>

        <hr className="mb-8 border-t" />

        {/* body */}
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-shrink-0">
            <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-emerald-200 text-4xl text-textHead">
              <GrTasks size={35} />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-6">
            <div>
              <h3 className="mb-1 text-2xl font-semibold">{task.category}</h3>
              <p className="max-w-3xl text-lg pt-3 leading-relaxed text-textBody">
                {task.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center px-2 gap-2">
                <Calendar size={25} />
                <span className="text-lg">
                  {new Date(task.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <span className={`flex items-center text-lg gap-2 ${pill[status]}`}>
                • {status}
              </span>
            </div>

            {/* status select */}
            <div className="flex max-w-xs flex-col gap-2">
              <label className="text-sm font-medium text-textHead">
                Change Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-11 rounded border px-3 text-sm"
              >
                {["Pending", "In Progress", "Done"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* footer buttons */}
        <div className="mt-12 flex flex-col gap-4 md:flex-row md:justify-end">
          <button
            onClick={() => setDeleteConfirm(true)}
            className="inline-flex items-center justify-center gap-2 rounded bg-red-500/10 px-10 py-3 text-sm font-medium text-red-600 hover:bg-red-500/20"
          >
            <Trash2 size={16} /> Delete Task
          </button>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="rounded bg-emerald-500 px-10 py-3 text-sm font-medium text-textHead hover:bg-emerald-300 disabled:opacity-50"
          >
            {submitting ? "Saving…" : "Submit"}
          </button>
        </div>
      </section>


      {/* Modals */}
      <CongratulationsModal
        open={showCongrets}
        onClose={() => setShowCongrets(false)}
      />

      <DeleteConfirmModal
        open={deleteConfirm}
        onCancel={() => setDeleteConfirm(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}

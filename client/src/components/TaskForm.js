"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema, editTaskSchema } from "@/schemas/taskSchema";
import { toast } from "sonner";

const CATEGORIES = [
  "Arts & Crafts",
  "Nature",
  "Family",
  "Sport",
  "Friends",
  "Meditation",
];

const STATUSES = ["Pending", "In Progress", "Done"];

export default function TaskForm({ mode = "create", initial = {}, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(mode === "create" ? createTaskSchema : editTaskSchema),
    defaultValues: {
      category: initial.category || "",
      description: initial.description || "",
      date: initial.date ? initial.date.slice(0, 10) : "", // ISO → yyyy-mm-dd
      status: initial.status || "Pending",
    },
  });

  const desc = watch("description", "");

  const submit = async (values) => {
    try {
      await onSubmit(values);
      toast.success(mode === "create" ? "Task created!" : "Task updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-8">
      {/* Category */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-textHead">Category</label>
        <select
          {...register("category")}
          disabled={mode === "edit"} /* category immutable when editing */
          className="h-11 rounded border px-3 text-sm disabled:bg-gray-50"
        >
          <option value="">Select category</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        {errors.category && (
          <p className="text-sm text-red-500">{errors.category.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-textHead">Description</label>
        <textarea
          {...register("description")}
          rows={3}
          maxLength={100}
          className="rounded border px-3 py-2 text-sm"
          placeholder="Describe the task (max 100 chars)…"
        />
        <div className="flex justify-between text-xs text-textBody">
          {errors.description ? (
            <span className="text-red-500">{errors.description.message}</span>
          ) : (
            <span />
          )}
          <span>{desc.length}/100</span>
        </div>
      </div>

      {/* End date */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-textHead">End date</label>
        <input
          type="date"
          {...register("date")}
          className="h-11 rounded border px-3 text-sm"
        />
        {errors.date && (
          <p className="text-sm text-red-500">{errors.date.message}</p>
        )}
      </div>

      {/* Status (editable in edit mode only) */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-textHead">Status</label>
        <select
          {...register("status")}
          disabled={mode === "create"} // start as Pending
          className="h-11 rounded border px-3 text-sm disabled:bg-gray-50"
        >
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex justify-end gap-4">
        {mode === "edit" && (
          <button
            type="button"
            className="rounded bg-red-500/10 px-6 py-2 text-sm font-medium text-red-600 hover:bg-red-500/20"
            onClick={() => toast("Open delete modal here")}
          >
            Delete
          </button>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-brandMint px-8 py-2 text-sm font-medium text-textHead hover:opacity-90 disabled:opacity-60"
        >
          {isSubmitting ? "Saving…" : mode === "create" ? "Create Task" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

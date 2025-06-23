"use client";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTasks } from "@/context/TaskContext";
import DefaultBanner from "@/components/DefaultBanner";
import TaskFormClient from "@/components/TaskFormClient";

export default function EditTask({ params }) {
  const { getTask } = useTasks();
  const [task, setTask] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const t = getTask(params.id);
    if (!t) notFound(); // could also fetch on-demand if not in cache
    setTask(t);
  }, [params.id]);

  if (!task) return null; // or a spinner

  return (
    <>
      <DefaultBanner />
      <section className="relative z-10 mx-auto -mt-8 w-full max-w-[1320px] rounded-[15px] bg-white p-8 md:p-14 shadow">
        <h2 className="mb-6 text-xl font-semibold">Edit Task</h2>
        <TaskFormClient mode="edit" initial={task} />
      </section>
    </>
  );
}

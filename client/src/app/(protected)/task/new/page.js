"use client";
import DefaultBanner from "@/components/DefaultBanner";
import TaskFormClient from "@/components/TaskFormClient";

export default function NewTask() {
  return (
    <>
      <DefaultBanner />
      <section className="relative z-10 mx-auto -mt-8 w-full max-w-[1320px] rounded-[15px] bg-white p-8 md:p-14 shadow">
        <h2 className="mb-6 text-xl font-semibold">Create New Task</h2>
        <TaskFormClient mode="create" initial={{}} />
      </section>
    </>
  );
}

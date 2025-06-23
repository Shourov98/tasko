import { notFound } from "next/navigation";
import TopBanner from "@/components/TopBanner";
import TaskFormClient from "@/components/TaskFormClient";
import api from "@/lib/api";

export async function generateMetadata({ params }) {
  return { title: `Edit Task • ${params.id}` };
}

export default async function EditTask({ params }) {
  // server-side fetch
  const { data: task } = await api.get(`/api/tasks/${params.id}`).catch(() => ({ data: null }));
  if (!task) notFound();

  return (
    <>
      <TopBanner variant="default" />

      <section className="relative z-10 mx-auto -mt-8 w-full max-w-[1320px] rounded-[15px] bg-white px-8 py-10 md:px-14 md:py-12 shadow">
        <h2 className="mb-6 text-xl font-semibold">Edit Task</h2>

        <TaskFormClient mode="edit" initial={task} />
      </section>
    </>
  );
}

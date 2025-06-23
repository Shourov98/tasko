import { notFound } from "next/navigation";
import TopBanner from "@/components/TopBanner";
import TaskForm from "@/components/TaskForm";

export async function generateMetadata({ params }) {
  return { title: `Edit Task • ${params.id}` };
}

export default async function EditTask({ params }) {
  const task = await fetchTaskById(params.id);     // server fetch (you’ll implement)
  if (!task) notFound();

  return (
    <>
      <TopBanner variant="default" />

      <section className="relative z-10 mx-auto -mt-8 w-full max-w-[1320px] rounded-[15px] bg-white px-8 py-10 md:px-14 md:py-12 shadow">
        <h2 className="mb-6 text-xl font-semibold">Edit Task</h2>

        <TaskForm
          mode="edit"
          initial={task}             // pre-fills all inputs
          onSubmit={(data) => {
            // PATCH /api/tasks/:id  then router.back() or push details page
          }}
        />
      </section>
    </>
  );
}

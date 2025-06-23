import TopBanner from "@/components/TopBanner";
import TaskFormClient from "@/components/TaskFormClient";

export const metadata = { title: "Create Task" };

export default function NewTask() {
  return (
    <>
      <TopBanner variant="default" />

      <section className="relative z-10 mx-auto -mt-8 w-full max-w-[1320px] rounded-[15px] bg-white px-8 py-10 md:px-14 md:py-12 shadow">
        <h2 className="mb-6 text-xl font-semibold">Create New Task</h2>

        <TaskFormClient mode="create" initial={{}} />
      </section>
    </>
  );
}

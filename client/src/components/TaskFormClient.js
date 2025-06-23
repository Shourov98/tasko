"use client";
import { useRouter } from "next/navigation";
import { useTasks } from "@/context/TaskContext";
import TaskForm from "./TaskForm";

export default function TaskFormClient({ mode, initial }) {
  const router = useRouter();
  const { createTask, updateTask } = useTasks();

  const handleSubmit = async (data) => {
    if (mode === "create") {
      const task = await createTask(data);
      router.push(`/task/${task.id}`);
    } else {
      await updateTask(initial.id, data);
      router.push(`/task/${initial.id}`);
    }
  };

  return <TaskForm mode={mode} initial={initial} onSubmit={handleSubmit} />;
}

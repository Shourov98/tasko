import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { TaskProvider } from "@/context/TaskContext";


/** every protected page (dashboard, spin, etc.) goes through here */
export default function ProtectedLayout({ children }) {
  return (
    <AuthProvider>
      <Navbar />
      {/* banner variant can be swapped per page using cookies, context, etc. */}
      <TaskProvider>
        <main className="relative top-[-70px] z-10 pt-6 md:pt-10">{children}</main>
      </TaskProvider>
    </AuthProvider>
  );
}

"use client";

import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { TaskProvider } from "@/context/TaskContext";

/**
 * Every protected page (dashboard, spin, task-details, etc.) is rendered
 * inside this layout.  AuthProvider → TaskProvider → Navbar sit once at
 * the top of the client tree.
 */
export default function ProtectedLayout({ children }) {
  return (
    <AuthProvider>
      <TaskProvider>
        {/* transparent navbar over banners */}
        <Navbar />

        {/* push page content below the fixed navbar + banner overlap */}
        <main className="relative top-[-70px] z-10 pt-6 md:pt-10">{children}</main>
      </TaskProvider>
    </AuthProvider>
  );
}




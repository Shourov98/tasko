import Navbar from "@/components/Navbar";

/** every protected page (dashboard, spin, etc.) goes through here */
export default function ProtectedLayout({ children }) {
  return (
    <div>
      <Navbar />
      {/* banner variant can be swapped per page using cookies, context, etc. */}
      <main className="relative top-[-70px] z-10 pt-6 md:pt-10">{children}</main>
    </div>
  );
}

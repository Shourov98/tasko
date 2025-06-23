import Link from "next/link";
import { IoMdStopwatch } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa6";
import { PiSpinnerBallBold } from "react-icons/pi";
import { useAuthContext } from "@/context/AuthContext";

export default function Navbar() {
  //const { user } = useAuthContext();

  return (
    <header className="fixed inset-x-0 top-0 z-20 flex items-center justify-between px-12 py-10">
      {/* logo + name */}
      <div className="flex items-center gap-2 text-white">
        <IoMdStopwatch size={28} />
        <span className="text-xl font-semibold">Tasko</span>
      </div>

      {/* nav links */}
      <nav className="hidden md:flex items-center gap-8 text-white/90 font-medium">
        <span className="flex items-center gap-2">
          <FaClipboardList size={24}/>
          <Link href="/dashboard">Task List</Link>
        </span>
        <span className="flex items-center gap-2">
          <PiSpinnerBallBold size={24}/>
          <Link href="/spin">Spin</Link>
        </span>
      </nav>

      {/* user pill */}
      <div className="flex items-center gap-2 text-white font-medium">
        {/* <span>{user?.fullName ?? "Guest"}</span> */}
        {/* avatar could go here later */}
      </div>
    </header>
  );
}

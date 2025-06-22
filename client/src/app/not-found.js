import Image from "next/image";
import ErrorShell from "@/components/ErrorShell";

export const metadata = { title: "404 – Page not found" };

export default function NotFound() {
  return (
    <ErrorShell>
      <div className="flex flex-col items-center">
        <Image
          src="/404error.png"
          alt="404 – not found"
          width={584}
          height={520}
          className="mb-6 w-[75%] max-w-[584px]"
          priority
        />
        {/* small “Oops” copy is baked into the PNG per your mock-up */}
      </div>
    </ErrorShell>
  );
}

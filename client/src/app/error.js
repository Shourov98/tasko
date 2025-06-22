"use client";

import { useEffect } from "react";
import ErrorShell from "@/components/ErrorShell";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorShell>
      <div className="py-24 text-center">
        <h2 className="mb-4 text-3xl font-semibold text-textHead">
          Something went wrong
        </h2>
        <p className="mb-6 max-w-md text-center text-textBody">
          {error?.message || "An unexpected error has occurred. Please try refreshing the page."}
        </p>
        <button
          onClick={reset}
          className="rounded-md bg-brandMint px-6 py-2 font-medium text-textHead hover:opacity-90"
        >
          Try Again
        </button>
      </div>
    </ErrorShell>
  );
}

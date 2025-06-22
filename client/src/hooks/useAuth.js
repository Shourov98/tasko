"use client";
import { useAuthContext } from "@/context/AuthContext";

export default function useAuth() {
  return useAuthContext();           // simple re-export for brevity
}

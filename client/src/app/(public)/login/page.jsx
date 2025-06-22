"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/authSchema";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit = async (vals) => {
    try {
      await login(vals);
      toast.success("Logged in!");
      window.location.href = "/dashboard";
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="flex min-h-screen bg-[#FAFAFA]">
      {/* ----------  left Illustration panel (hidden below lg) ---------- */}
      <aside className="bg-black relative hidden w-1/2 overflow-hidden lg:block">
        {/* base dark background */}
        <div className="absolute inset-0 bg-brandDark" />

        {/* mint blurs */}
        <div className="absolute -left-32 -top-14 h-60 w-66 rounded-full bg-teal-600 blur-[150px] opacity-70" />
        <div className="absolute left-20 bottom-24 h-24 w-[40rem] rounded-full bg-teal-600 blur-[200px] opacity-70" />
        <div className="absolute left-96 bottom-10 h-64 w-70 rounded-full bg-teal-600 blur-[150px] opacity-70" />

        {/* roadmap illustration */}
        <Image
          src="/login/roadmap.png"
          alt="task illustration"
          width={638}
          height={477}
          className="absolute left-10 top-1/2 -translate-y-1/2 select-none"
          priority
        />
      </aside>

      {/* ----------  right form panel ---------- */}
      <section className="mx-auto flex w-full max-w-[558px] flex-col justify-center px-6">
        <h1 className="mb-2 text-center text-4xl font-semibold text-textHead">Login</h1>
        <p className="mb-10 text-center text-gray-500 text-[14px] font-medium leading-[164%] text-textBody">
          Welcome&nbsp;Back, Please Enter your Details to Log&nbsp;In.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* email */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-textHead">
              Email Address
            </label>
            <Input
              placeholder="m32220@gmail.com"
              type="email"
              {...register("email")}
              className="h-12 border border-[#E1E1E1] shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* password */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-textHead">
              Password
            </label>
            <Input
              type="password"
              placeholder="••••••"
              {...register("password")}
              className="h-12 border border-[#E1E1E1] shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* remember / forgot row */}
          <div className="flex justify-between text-sm text-textBody">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="h-[18px] w-[18px] rounded border-textBody accent-brandMint"
              />
              Remember me
            </label>
            <a href="/reset-password" className="hover:underline">
              Forgot password&nbsp;?
            </a>
          </div>

          {/* submit */}
          <Button
            type="submit"
            className="h-[60px] w-full rounded-[8px] bg-emerald-400 font-semibold text-textHead hover:bg-emerald-300"
          >
            Log In
          </Button>
        </form>

        {/* OR divider */}
        <div className="mt-12 flex items-center gap-3 text-sm text-textBody">
          <span className="h-px flex-1 bg-textBody" />
          Or
          <span className="h-px flex-1 bg-textBody" />
        </div>

        {/* footer link */}
        <p className="mt-6 text-center text-sm text-textBody">
          Don’t have an account?{" "}
          <a href="/signup" className="font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </section>
    </main>
  );
}

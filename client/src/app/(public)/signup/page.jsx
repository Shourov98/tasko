"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/schemas/authSchema";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  const { signup } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  const onSubmit = async (vals) => {
    try {
      await signup(vals);
      toast.success("Account created!");
      window.location.href = "/dashboard";
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <main className="flex min-h-screen bg-[#FAFAFA]">
      {/* ---------------- Left illustration (desktop only) ------------- */}
      <aside className="bg-black relative hidden w-1/2 overflow-hidden lg:block">
        <div className="absolute inset-0 bg-brandDark" />

        {/* Mint blurs */}
        <div className="absolute -left-32 -top-14 h-60 w-70 rounded-full bg-teal-500 blur-[150px] opacity-70 pointer-events-none" />
        <div className="absolute left-20 bottom-24 h-24 w-[40rem] rounded-full bg-teal-500 blur-[200px] opacity-70 pointer-events-none" />
        <div className="absolute left-96 bottom-10 h-64 w-70 rounded-full bg-teal-500 blur-[150px] opacity-70 pointer-events-none" />

        {/* Illustration PNG */}
        <Image
          src="/signup/roadmap.png"
          alt="daily to-do illustration"
          width={638}
          height={477}
          className="absolute left-10 top-1/2 -translate-y-1/2 select-none pointer-events-none"
          priority
        />
      </aside>

      {/* ---------------- Right form panel ---------------- */}
      <section className="mx-auto flex w-full max-w-[558px] flex-col justify-center px-6">
        {/* Headings */}
        <h1 className="mb-2 text-center text-4xl font-semibold text-textHead">
          Sign Up
        </h1>
        <p className="mb-10 text-center text-gray-500 text-[14px] font-medium leading-[164%] text-textBody">
          To Create Account, Please Fill in the Form Below.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* full name */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-textHead">
              Full Name
            </label>
            <Input
              placeholder="Enter your full name"
              {...register("fullName")}
              className="h-12 border border-[#E1E1E1] shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          {/* email */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-textHead">
              Email Address
            </label>
            <Input
              placeholder="Enter your email address"
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
              placeholder="****************"
              {...register("password")}
              className="h-12 border border-[#E1E1E1] shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* confirm */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-textHead">
              Confirm Password
            </label>
            <Input
              type="password"
              placeholder="Retype password"
              {...register("confirm")}
              className="h-12 border border-[#E1E1E1] shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
            />
            {errors.confirm && (
              <p className="text-sm text-red-500">{errors.confirm.message}</p>
            )}
          </div>

          {/* submit */}
          <Button
            type="submit"
            className="h-[60px] w-full rounded-[8px] bg-teal-500 font-semibold text-textHead hover:bg-teal-400"
          >
            Sign Up
          </Button>
        </form>

        {/* OR divider */}
        <div className="mt-12 flex items-center gap-3 text-sm text-textBody">
          <span className="h-px flex-1 bg-textBody" />
          Or
          <span className="h-px flex-1 bg-textBody" />
        </div>

        <p className="mt-6 text-center text-sm text-textBody">
          Already have an account?{" "}
          <a href="/login" className="font-semibold hover:underline">
            Log In
          </a>
        </p>
      </section>
    </main>
  );
}

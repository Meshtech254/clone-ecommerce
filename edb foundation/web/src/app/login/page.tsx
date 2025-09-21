"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabaseBrowser } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type Input = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const redirect = search.get("redirect") || "/admin";
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, formState: { errors } } = useForm<Input>({ resolver: zodResolver(schema) });

  const onSubmit = (data: Input) => {
    setError(null);
    startTransition(async () => {
      const { error: signInError } = await supabaseBrowser.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (signInError) {
        setError(signInError.message);
        return;
      }
      router.push(redirect);
    });
  };

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-2xl font-semibold">Admin Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm">Email</label>
          <input type="email" className="mt-1 w-full rounded-md border px-3 py-2 bg-transparent" {...register("email")} />
          {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input type="password" className="mt-1 w-full rounded-md border px-3 py-2 bg-transparent" {...register("password")} />
          {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={isPending} className="w-full rounded-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-700">
          {isPending ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}


"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { feedbackSchema, type FeedbackInput } from "@/lib/validators";
import { supabaseBrowser } from "@/lib/supabase/client";
import { useState } from "react";

export default function FeedbackPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FeedbackInput>({ resolver: zodResolver(feedbackSchema) });
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit = async (data: FeedbackInput) => {
    setStatus(null);
    const { error } = await supabaseBrowser.from("feedback").insert({
      name: data.name,
      email: data.email,
      message: data.message,
    });
    if (error) {
      setStatus(error.message);
      return;
    }
    setStatus("Thank you for your feedback!");
    reset();
  };

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Feedback</h1>
      <p className="mt-2 text-sm text-[color:var(--foreground)]/80">We value your thoughts and suggestions.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm">Name</label>
          <input className="mt-1 w-full rounded-md border px-3 py-2 bg-transparent" {...register("name")} />
          {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <input type="email" className="mt-1 w-full rounded-md border px-3 py-2 bg-transparent" {...register("email")} />
          {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm">Message</label>
          <textarea rows={5} className="mt-1 w-full rounded-md border px-3 py-2 bg-transparent" {...register("message")} />
          {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>}
        </div>
        {status && <p className="text-sm text-blue-700">{status}</p>}
        <button disabled={isSubmitting} className="rounded-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-700">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}


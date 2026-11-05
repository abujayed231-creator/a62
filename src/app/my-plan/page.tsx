"use client";
import Link from "next/link";
import { useState } from "react";
import { usePlan, type Workout } from "@/app/component/PlanContext";

export default function MyPlan() {
  const { loading, plan, saved, completed, removeFromPlan, removeFromSaved, toggleDone } = usePlan();
  const [tab, setTab] = useState<"plan" | "saved">("plan");

  const items: Workout[] = tab === "plan" ? plan : saved;

  const stats: [string, number][] = [
    ["Exercises", plan.length],
    ["Minutes", plan.reduce((a: number, w: Workout) => a + w.duration, 0)],
    ["Calories", plan.reduce((a: number, w: Workout) => a + w.caloriesBurned, 0)],
  ];


  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-4xl font-bold uppercase">My Plan</h1>
      <p className="mb-6 text-gray-400">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="mb-8 grid grid-cols-3 gap-3">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-xl border border-white/10 bg-[#141414] p-4 text-center">
            <p className="font-display text-3xl font-bold text-[#ccff00]">{value}</p>
            <p className="text-xs uppercase text-gray-400">{label}</p>
          </div>
        ))}
      </div>

      <div className="mb-6 flex gap-2">
        {(["plan", "saved"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-md px-5 py-2 text-sm font-bold uppercase ${
              tab === t ? "bg-[#ccff00] text-black" : "border border-white/20 text-gray-300"
            }`}
          >
            {t === "plan" ? "Today's Plan" : "Saved"}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="py-12 text-center text-gray-400">Loading workouts…</p>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/20 py-16 text-center">
          <h2 className="font-display text-2xl uppercase">Nothing here yet</h2>
          <p className="mb-5 mt-2 text-gray-400">Browse the library and add a lift to get today moving.</p>
          <Link href="/" className="rounded-md bg-[#ccff00] px-6 py-3 font-bold uppercase text-black">
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((w: Workout) => (
            <div
              key={w.id}
              className="flex flex-col gap-4 rounded-xl border border-white/10 bg-[#141414] p-4 sm:flex-row sm:items-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={w.image} alt={w.name} className="h-24 w-full rounded-lg object-cover sm:w-28" />

              <div className="flex-1">
                <h3 className={`font-display text-xl uppercase ${completed.includes(w.id) ? "line-through opacity-50" : ""}`}>
                  {w.name}
                </h3>
                <p className="text-sm text-gray-400">{w.equipment}</p>
                <p className="mt-1 text-sm text-gray-300">
                  ⏱ {w.duration} min · 🔥 {w.caloriesBurned} kcal · ⭐ {w.rating}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link href={`/detail/${w.id}`} className="rounded-md border border-white/30 px-3 py-2 text-sm">
                  View Details
                </Link>

                {tab === "plan" && (
                  <button
                    onClick={() => toggleDone(w.id)}
                    className="rounded-md bg-[#ccff00] px-3 py-2 text-sm font-bold text-black"
                  >
                    {completed.includes(w.id) ? "↺ Undo" : "✓ Mark as Done"}
                  </button>
                )}

                <button
                  onClick={() => (tab === "plan" ? removeFromPlan(w.id) : removeFromSaved(w.id))}
                  className="rounded-md border border-red-500/50 px-3 py-2 text-sm text-red-400"
                  aria-label="Remove"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
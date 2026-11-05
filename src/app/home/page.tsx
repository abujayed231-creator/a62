
"use client";
import { useMemo, useState } from "react";
import Banner from "@/app/component/banner";
import WorkoutCard from "@/app/component/WorkoutCard";
import { usePlan, type Workout } from "../component/PlanContext";

type SortKey = "duration" | "caloriesBurned" | "rating";

export default function Home() {
  const { workouts, loading } = usePlan();
  const [sort, setSort] = useState<SortKey>("duration");

  const sorted = useMemo(
    () => [...workouts].sort((a, b) => b[sort] - a[sort]),
    [workouts, sort]
  );

  return (
    <>
      <Banner />
      <section id="library" className="mx-auto max-w-7xl scroll-mt-20 px-4">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase">The Library</h2>
            <p className="text-gray-400">Twelve lifts covering every major muscle group.</p>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-300">
            Sort By
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-md border border-white/20 bg-[#141414] px-3 py-2 text-white"
            >
              <option value="duration">Duration</option>
              <option value="caloriesBurned">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </label>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <span className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-[#ccff00]" />
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((w) => (
              <WorkoutCard key={w.id} w={w} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
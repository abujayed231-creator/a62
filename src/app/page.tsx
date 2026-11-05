"use client";
import { useMemo, useState } from "react";
import Banner from "@/app/component/banner";
import WorkoutCard from "@/app/component/WorkoutCard";
import { usePlan, type Workout } from "@/app/component/PlanContext";

type SortKey = "duration" | "caloriesBurned" | "rating";

export default function Home() {
  const { workouts, loading } = usePlan();
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  const sorted = useMemo(
    () => [...workouts].sort((a: Workout, b: Workout) => b[sortBy] - a[sortBy]),
    [workouts, sortBy]
  );

  return (
    <>
      <Banner />
      <section id="library" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl font-bold uppercase">The Library</h2>
            <p className="text-gray-400">Twelve lifts covering every major muscle group.</p>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="rounded-md border border-white/20 bg-[#141414] px-3 py-2 text-white"
          >
            <option value="duration">Sort By: Duration</option>
            <option value="caloriesBurned">Sort By: Calories</option>
            <option value="rating">Sort By: Rating</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <span className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-[#ccff00]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((w: Workout) => (
              <WorkoutCard key={w.id} w={w} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
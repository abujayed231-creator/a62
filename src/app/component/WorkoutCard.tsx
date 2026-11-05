
"use client";

import Link from "next/link";
import { type Workout } from "@/app/component/PlanContext";


export default function WorkoutCard({ w }: { w: Workout }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#141414]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={w.image}
        alt={w.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-display text-xl font-bold uppercase">
          {w.name}
        </h3>

        <p className="text-sm text-gray-400">
          {w.equipment} · {w.difficulty}
        </p>

        <p className="mt-1 text-sm text-gray-300">
          ⏱ {w.duration} min · 🔥 {w.caloriesBurned} kcal · ⭐ {w.rating}
        </p>

        <div className="mt-4">
          <Link
            href={`/detail/${w.id}`}
            className="block rounded-md bg-[#ccff00] px-4 py-2 text-center text-sm font-bold text-black hover:bg-lime-400"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}


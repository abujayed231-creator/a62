
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { usePlan } from "@/app/component/PlanContext";

export default function WorkoutDetails() {
  const params = useParams();
  const id = Number(params.id);

  const {
    workouts,
    loading,
    plan,
    saved,
    addToPlan,
    addToSaved,
  } = usePlan();

  if (loading) {
    return <p className="p-10 text-white">Loading workout...</p>;
  }

  const workout = workouts.find((w) => w.id === id);

  if (!workout) {
    return <p className="p-10 text-white">Workout not found!</p>;
  }

  const isAdded = plan.some((w) => w.id === id);
  const isSaved = saved.some((w) => w.id === id);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 text-white">

      {/* Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={workout.image}
        alt={workout.name}
        className="h-72 w-full rounded-xl object-cover"
      />

      {/* Details */}
      <div className="mt-6">
        <h1 className="font-display text-4xl font-bold uppercase">
          {workout.name}
        </h1>

        <p className="mt-3 text-gray-400">
          {workout.description}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <p>⏱ {workout.duration} min</p>
          <p>🔥 {workout.caloriesBurned} kcal</p>
          <p>⭐ {workout.rating}</p>
          <p>{workout.difficulty}</p>
        </div>

        <p className="mt-4">
          Equipment: {workout.equipment}
        </p>

        <p className="mt-2">
          Muscle Groups: {workout.muscleGroups.join(", ")}
        </p>

        {/* Instructions */}
        <h2 className="mt-8 text-2xl font-bold">
          Instructions
        </h2>

        <ol className="mt-3 list-inside list-decimal space-y-2 text-gray-300">
          {workout.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-3">

          <button
            onClick={() => addToPlan(workout)}
            disabled={isAdded || plan.length >= 5}
            className="rounded-md bg-[#ccff00] px-6 py-3 font-bold text-black disabled:opacity-50"
          >
            {isAdded ? "Added to Plan" : "+ Add to Plan"}
          </button>

          <button
            onClick={() => addToSaved(workout)}
            disabled={isSaved}
            className="rounded-md border border-white/30 px-6 py-3 font-bold disabled:opacity-50"
          >
            {isSaved ? "Saved" : "♡ Save Workout"}
          </button>

          <Link
            href="/"
            className="rounded-md border border-white/30 px-6 py-3"
          >
            Back to Workouts
          </Link>

        </div>
      </div>
    </div>
  );
}

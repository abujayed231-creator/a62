"use client";
import { usePlan, type Workout } from "@/app/component/PlanContext";

export default function SaveForLater({ workout }: { workout: Workout }) {
  const { addToSaved } = usePlan();

  return (
    <button
      onClick={() => addToSaved(workout)}
      className="rounded-md border border-white/40 px-6 py-3 font-bold uppercase hover:border-[#ccff00] hover:text-[#ccff00]"
    >
      🔖 Save for later
    </button>
  );
}
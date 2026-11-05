
"use client";
import { usePlan, type Workout } from "@/app/component/PlanContext";

export default function PlanButton({ workout }: { workout: Workout }) {
  const { plan, addToPlan } = usePlan();
  const full = plan.length >= 5 && !plan.some((w) => w.id === workout.id);

  return (
    <button
      onClick={() => addToPlan(workout)}
      disabled={full}
      className="rounded-md bg-[#ccff00] px-6 py-3 font-bold uppercase text-black hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
    >
      ＋ Add to today&apos;s plan
    </button>
  );
}
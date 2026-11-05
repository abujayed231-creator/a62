"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import workoutData from "@/data/workoutData.json";

export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

interface Toast {
  id: number;
  message: string;
  type?: "info" | "success" | "warning";
}

interface PlanContextType {
  workouts: Workout[];
  loading: boolean;
  plan: Workout[];
  saved: Workout[];
  completed: number[];
  toasts: Toast[];
  addToPlan: (workout: Workout) => boolean;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  toggleDone: (id: number) => void;
  showToast: (message: string, type?: "info" | "success" | "warning") => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // data load + localStorage থেকে আগের state ফিরিয়ে আনা
  useEffect(() => {
    setWorkouts(workoutData as Workout[]);
    setLoading(false);

    try {
      const localPlan = localStorage.getItem("fitlog_plan");
      const localSaved = localStorage.getItem("fitlog_saved");
      const localCompleted = localStorage.getItem("fitlog_completed");

      if (localPlan) setPlan(JSON.parse(localPlan));
      if (localSaved) setSaved(JSON.parse(localSaved));
      if (localCompleted) setCompleted(JSON.parse(localCompleted));
    } catch {}
  }, []);

  // পরিবর্তন হলে localStorage-এ সেভ
  useEffect(() => {
    localStorage.setItem("fitlog_plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    localStorage.setItem("fitlog_completed", JSON.stringify(completed));
  }, [completed]);

  const showToast = (message: string, type: "info" | "success" | "warning" = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const addToPlan = (workout: Workout) => {
    if (plan.some((w) => w.id === workout.id)) {
      showToast(`${workout.name} is already in today's plan`, "warning");
      return false;
    }
    if (plan.length >= 5) {
      showToast("Plan limit reached (max 5 lifts)!", "warning");
      return false;
    }
    setPlan((prev) => [...prev, workout]);
    showToast(`Added ${workout.name} to today's plan`, "success");
    return true;
  };

  const addToSaved = (workout: Workout) => {
    if (saved.some((w) => w.id === workout.id)) {
      showToast(`${workout.name} is already in saved lifts`, "info");
      return;
    }
    setSaved((prev) => [...prev, workout]);
    showToast(`Saved ${workout.name} for later`, "success");
  };

  const removeFromPlan = (id: number) => {
    const workout = plan.find((w) => w.id === id);
    setPlan((prev) => prev.filter((w) => w.id !== id));
    setCompleted((prev) => prev.filter((item) => item !== id));
    if (workout) showToast(`Removed ${workout.name} from plan`, "info");
  };

  const removeFromSaved = (id: number) => {
    const workout = saved.find((w) => w.id === id);
    setSaved((prev) => prev.filter((w) => w.id !== id));
    if (workout) showToast(`Removed ${workout.name} from saved`, "info");
  };

  const toggleDone = (id: number) => {
    const workout = plan.find((w) => w.id === id);
    if (completed.includes(id)) {
      setCompleted((prev) => prev.filter((item) => item !== id));
      if (workout) showToast(`Marked ${workout.name} as incomplete`, "info");
    } else {
      setCompleted((prev) => [...prev, id]);
      if (workout) showToast(`Completed ${workout.name}! Great work! 💪`, "success");
    }
  };

  return (
    <PlanContext.Provider
      value={{
        workouts,
        loading,
        plan,
        saved,
        completed,
        toasts,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        toggleDone,
        showToast,
      }}
    >
      {children}
      {/* Global Toast Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-2 rounded-md border px-4 py-3 text-sm font-semibold shadow-lg ${
              toast.type === "warning"
                ? "border-red-500 bg-red-950 text-red-200"
                : toast.type === "success"
                ? "border-[#ccff00] bg-zinc-900 text-[#ccff00]"
                : "border-zinc-700 bg-zinc-900 text-white"
            }`}
          >
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </PlanContext.Provider>
  );
}

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used within a PlanProvider");
  return context;
};
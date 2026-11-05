"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { usePlan } from "@/app/component/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan(); // নিশ্চিত করুন এখানে usePlan ব্যবহার করা হয়েছে

  return (
    <nav className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 relative bg-[#ccff00] rounded-sm flex items-center justify-center font-extrabold text-black">
            F
          </div>
          <span className="font-extrabold tracking-wider text-xl text-white uppercase">
            Fit<span className="text-[#ccff00]">Log</span>
          </span>
        </Link>

        {/* Middle: Links */}
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className={`text-sm font-semibold uppercase tracking-wider transition-colors ${
              pathname === "/" ? "text-[#ccff00]" : "text-zinc-400 hover:text-white"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`text-sm font-semibold uppercase tracking-wider transition-colors ${
              pathname === "/my-plan" ? "text-[#ccff00]" : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Right: Badges */}
        <div className="flex items-center space-x-3">
          <Link
            href="/my-plan"
            className="bg-[#ccff00] text-black font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-[#b8e600] transition"
          >
            <span>Plan</span>
            <span className="bg-black text-[#ccff00] w-4 h-4 rounded-full text-[10px] flex items-center justify-center">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="border border-zinc-700 text-zinc-300 font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:border-zinc-500 hover:text-white transition"
          >
            <span>Saved</span>
            <span className="bg-zinc-800 text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "@/app/component/PlanContext";
import Navbar from "@/app/component/shared/nav";
import Footer from "@/app/component/shared/Footer";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "FitLog — Workout Library & Routine Planner",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} ${inter.variable} min-h-screen bg-[#0b0b0b] text-white`}
      >
        <PlanProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}
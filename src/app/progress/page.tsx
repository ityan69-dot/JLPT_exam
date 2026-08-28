import type { Metadata } from "next";
import { ProgressDashboard } from "@/components/progress/progress-dashboard";

export const metadata: Metadata = {
  title: "Learning Progress",
  description: "Review your JLPT weakness practice progress on this device.",
};

export default function ProgressPage() {
  return <ProgressDashboard />;
}

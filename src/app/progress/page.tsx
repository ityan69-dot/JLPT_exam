import type { Metadata } from "next";
import { CourseProgressOverview } from "@/components/progress/course-progress-overview";

export const metadata: Metadata = {
  title: "Learning Progress",
  description: "Review N5 and N4 course progress saved on this device.",
};

export default function ProgressPage() {
  return <CourseProgressOverview />;
}

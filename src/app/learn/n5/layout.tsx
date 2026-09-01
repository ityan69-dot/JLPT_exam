import type { ReactNode } from "react";
import { CourseProgressDock } from "@/components/learning/course-progress-dock";

export default function N5Layout({ children }: { children: ReactNode }) {
  return <>{children}<CourseProgressDock /></>;
}

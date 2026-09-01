"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { n5CourseSteps } from "@/data/n5-course-registry";
import { markLessonComplete } from "@/services/course-progress-service";

const trackedRoutes = new Set(n5CourseSteps.map((step) => step.href));

export function useAutoCompleteLesson(finished: boolean) {
  const pathname = usePathname();

  useEffect(() => {
    if (finished && trackedRoutes.has(pathname)) {
      markLessonComplete(pathname);
    }
  }, [finished, pathname]);
}

import { notFound } from "next/navigation";
import { N4LessonSession } from "@/components/learning/n4-lesson-session";
import { n4LessonHref, n4Lessons } from "@/data/n4-course";

export function generateStaticParams() {
  return n4Lessons.map((item) => ({ module: item.module.toLowerCase(), slug: item.slug }));
}

export default async function N4LessonPage({ params }: PageProps<"/learn/n4/[module]/[slug]">) {
  const { module, slug } = await params;
  const index = n4Lessons.findIndex((item) => item.module.toLowerCase() === module && item.slug === slug);
  if (index < 0) notFound();
  const item = n4Lessons[index];
  return <N4LessonSession lesson={item} href={n4LessonHref(item)} previousHref={index > 0 ? n4LessonHref(n4Lessons[index - 1]) : undefined} nextHref={index < n4Lessons.length - 1 ? n4LessonHref(n4Lessons[index + 1]) : undefined} />;
}

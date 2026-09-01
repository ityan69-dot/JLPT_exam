export type CourseProgressState = { completed: Record<string, string>; lastVisited: string | null };

const storageKey = "manabu:n5-course-progress:v1";
const eventName = "manabu:n5-course-progress-change";
const emptyState: CourseProgressState = { completed: {}, lastVisited: null };
let cache: CourseProgressState = emptyState;
let loaded = false;

function load() {
  if (loaded || typeof window === "undefined") return cache;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<CourseProgressState>;
      cache = { completed: parsed.completed ?? {}, lastVisited: parsed.lastVisited ?? null };
    }
  } catch { cache = emptyState; }
  return cache;
}

function save(next: CourseProgressState) {
  cache = next; loaded = true;
  window.localStorage.setItem(storageKey, JSON.stringify(next));
  window.dispatchEvent(new Event(eventName));
}

export function getCourseProgressSnapshot() { return load(); }
export function getCourseProgressServerSnapshot() { return emptyState; }
export function subscribeCourseProgress(listener: () => void) {
  const onStorage = (event: StorageEvent) => { if (event.key === storageKey) { loaded = false; load(); listener(); } };
  window.addEventListener(eventName, listener); window.addEventListener("storage", onStorage);
  return () => { window.removeEventListener(eventName, listener); window.removeEventListener("storage", onStorage); };
}
export function setLessonVisited(href: string) {
  const current = load(); if (current.lastVisited === href) return;
  save({ ...current, lastVisited: href });
}
export function toggleLessonComplete(href: string) {
  const current = load(); const completed = { ...current.completed };
  if (completed[href]) delete completed[href]; else completed[href] = new Date().toISOString();
  save({ completed, lastVisited: href });
}

export function markLessonComplete(href: string) {
  const current = load();
  if (current.completed[href]) return;
  save({
    completed: { ...current.completed, [href]: new Date().toISOString() },
    lastVisited: href,
  });
}

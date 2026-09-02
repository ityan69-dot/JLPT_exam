export type N4Progress = { completed: Record<string, string>; lastVisited: string | null };

const key = "manabu:n4-course-progress:v1";
const eventName = "manabu:n4-course-progress-change";
const empty: N4Progress = { completed: {}, lastVisited: null };
let cache = empty;
let loaded = false;

function load() {
  if (loaded || typeof window === "undefined") return cache;
  loaded = true;
  try {
    const saved = window.localStorage.getItem(key);
    if (saved) {
      const value = JSON.parse(saved) as Partial<N4Progress>;
      cache = { completed: value.completed ?? {}, lastVisited: value.lastVisited ?? null };
    }
  } catch { cache = empty; }
  return cache;
}

function save(value: N4Progress) {
  cache = value;
  loaded = true;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(eventName));
}

export const getN4ProgressSnapshot = () => load();
export const getN4ProgressServerSnapshot = () => empty;
export function subscribeN4Progress(listener: () => void) {
  const storage = (event: StorageEvent) => { if (event.key === key) { loaded = false; load(); listener(); } };
  window.addEventListener(eventName, listener);
  window.addEventListener("storage", storage);
  return () => { window.removeEventListener(eventName, listener); window.removeEventListener("storage", storage); };
}
export function visitN4Lesson(href: string) {
  const value = load();
  if (value.lastVisited !== href) save({ ...value, lastVisited: href });
}
export function completeN4Lesson(href: string) {
  const value = load();
  if (!value.completed[href]) save({ completed: { ...value.completed, [href]: new Date().toISOString() }, lastVisited: href });
}
export function toggleN4Lesson(href: string) {
  const value = load();
  const completed = { ...value.completed };
  if (completed[href]) delete completed[href]; else completed[href] = new Date().toISOString();
  save({ completed, lastVisited: href });
}

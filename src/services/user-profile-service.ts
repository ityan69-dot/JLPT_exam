import type { JLPTLevel, UserProfile } from "@/types/jlpt";

const storageKey = "jlpt-mock:user-profile:v1";
const levels: JLPTLevel[] = ["N5", "N4"];

export const defaultUserProfile: UserProfile = {
  id: "local-user",
  displayName: "",
  targetLevel: "N5",
  dailyStudyMinutes: 30,
  examDate: null,
  pastScores: [],
  updatedAt: new Date(0).toISOString(),
};

export function isUserProfile(value: unknown): value is UserProfile {
  if (!value || typeof value !== "object") return false;
  const profile = value as Partial<UserProfile>;
  return typeof profile.id === "string" && typeof profile.displayName === "string" &&
    levels.includes(profile.targetLevel as JLPTLevel) &&
    typeof profile.dailyStudyMinutes === "number" && Number.isFinite(profile.dailyStudyMinutes) &&
    profile.dailyStudyMinutes >= 5 && profile.dailyStudyMinutes <= 240 &&
    (profile.examDate === null || typeof profile.examDate === "string") &&
    Array.isArray(profile.pastScores) && typeof profile.updatedAt === "string";
}

export function getUserProfile(): UserProfile {
  try {
    const savedValue = window.localStorage.getItem(storageKey);
    if (!savedValue) return defaultUserProfile;
    const parsed: unknown = JSON.parse(savedValue);
    return isUserProfile(parsed) ? parsed : defaultUserProfile;
  } catch {
    return defaultUserProfile;
  }
}

export function saveUserProfile(profile: UserProfile) {
  if (!isUserProfile(profile)) throw new Error("Profile အချက်အလက် မမှန်ပါ။");
  window.localStorage.setItem(storageKey, JSON.stringify(profile));
  return profile;
}

import type { Metadata } from "next";
import { ProfileSettings } from "@/components/profile/profile-settings";

export const metadata: Metadata = {
  title: "Study Profile",
  description: "Set your JLPT target level and daily study goal.",
};

export default function ProfilePage() {
  return <ProfileSettings />;
}

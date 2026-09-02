import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Manabu Japanese Learning",
    template: "%s | Manabu Japanese",
  },
  description:
    "မြန်မာဘာသာရှင်းပြချက်များဖြင့် JLPT N5 နှင့် N4 ဂျပန်စာကို အဆင့်ဆင့်လေ့လာနိုင်သော learning platform။",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="my" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

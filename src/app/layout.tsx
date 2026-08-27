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
    default: "JLPT စမ်းသပ်စာမေးပွဲ",
    template: "%s | JLPT စမ်းသပ်စာမေးပွဲ",
  },
  description:
    "JLPT စာမေးပွဲပုံစံအတိုင်း လေ့ကျင့်ပြီး မိမိအားနည်းချက်များကို ရှာဖွေနိုင်သောနေရာ။",
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

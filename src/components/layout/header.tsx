import Link from "next/link";
import { Container } from "@/components/ui/container";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-bold tracking-tight text-slate-950">
          JLPT စမ်းသပ်စာမေးပွဲ
        </Link>
        <span className="text-sm text-slate-500">ဂျပန်ဘာသာ အရည်အချင်းစစ်</span>
      </Container>
    </header>
  );
}

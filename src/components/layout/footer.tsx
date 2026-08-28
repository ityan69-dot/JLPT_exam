import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-[#fffdf8] py-6">
      <Container className="flex flex-col gap-2 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
        <p>JLPT ကို ယုံကြည်မှုရှိရှိ လေ့ကျင့်နိုင်ဖို့ ဖန်တီးထားပါတယ်။</p>
        <p lang="ja" className="font-serif tracking-[0.12em] text-stone-400">模擬試験 ・ 弱点分析</p>
      </Container>
    </footer>
  );
}

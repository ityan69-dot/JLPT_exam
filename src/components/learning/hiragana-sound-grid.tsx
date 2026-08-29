import { SoundButton } from "@/components/learning/sound-button";

export type SoundKana = { kana: string; romaji: string; audioKey?: string; note?: string };
export type SoundGroup = { title: string; subtitle: string; items: SoundKana[] };

export function HiraganaSoundGrid({ groups, audioBasePath = "/audio/n5/hiragana/variants" }: { groups: SoundGroup[]; audioBasePath?: string }) {
  return <div className="space-y-10">{groups.map((group) => <section key={group.title}>
    <div className="mb-4"><h2 className="text-xl font-black text-[#172033]">{group.title}</h2><p className="mt-1 text-sm text-[#746c60]">{group.subtitle}</p></div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{group.items.map((item) => <article key={`${group.title}-${item.kana}`} className="rounded-[1.5rem] border border-[#ded8ca] bg-[#fffdf8] p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3"><div><p lang="ja" className="text-5xl font-medium text-[#172033]">{item.kana}</p><p className="mt-2 text-lg font-black text-[#a33a32]">{item.romaji}</p></div><SoundButton audioUrl={`${audioBasePath}/${item.audioKey ?? item.romaji}.mp3`} label={item.kana} /></div>
      {item.note && <p className="mt-4 border-t border-[#eee8dc] pt-3 text-xs leading-6 text-[#746c60]">{item.note}</p>}
    </article>)}</div>
  </section>)}</div>;
}

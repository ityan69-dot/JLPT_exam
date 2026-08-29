import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KatakanaRowLesson } from "@/components/learning/katakana-row-lesson";
import { getKatakanaRow,katakanaRows } from "@/data/katakana-course";
export function generateStaticParams(){return katakanaRows.map(({slug})=>({row:slug}));}
export async function generateMetadata({params}:PageProps<"/learn/n5/katakana/[row]">):Promise<Metadata>{const {row}=await params;const lesson=getKatakanaRow(row);return {title:lesson?`Katakana ${lesson.label}`:"Katakana Lesson"};}
export default async function Page({params}:PageProps<"/learn/n5/katakana/[row]">){const {row}=await params;const lesson=getKatakanaRow(row);if(!lesson)notFound();const index=katakanaRows.indexOf(lesson);return <KatakanaRowLesson row={lesson} previous={katakanaRows[index-1]} next={katakanaRows[index+1]}/>;}

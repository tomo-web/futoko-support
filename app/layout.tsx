import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "きもちの地図｜不登校・行きづらさの気持ちを整理するアプリ",
  description: "学校に行きづらさを感じている子どもと保護者のための、気持ちを整理するアプリです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#faf8f3]">{children}</body>
    </html>
  );
}

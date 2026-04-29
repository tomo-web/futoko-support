import Link from "next/link";

export default function StartPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      <div className="max-w-sm w-full text-center space-y-10">

        <div className="space-y-4">
          <p className="text-[11px] tracking-[0.3em] text-stone-400 uppercase">
            kimochi no chizu
          </p>
          <h1 className="text-4xl font-bold text-stone-700 tracking-tight">
            きもちの地図
          </h1>
          <p className="text-sm text-stone-500 leading-relaxed">
            学校に行きづらさを感じている
            <br />
            子どもと保護者のために
          </p>
          <p className="text-stone-400 text-sm leading-[2]">
            モヤモヤした気持ちを、
            <br />
            少しずつ整理するためのアプリです。
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Link href="/child">
            <div className="block w-full bg-[#8aab84] hover:bg-[#7a9b74] text-white rounded-2xl px-8 py-5 transition-colors cursor-pointer shadow-sm">
              <div className="text-lg font-semibold">子どもとして使う</div>
              <div className="text-white/70 text-xs mt-1">
                今の気持ちを、少しずつ言葉にしてみよう
              </div>
            </div>
          </Link>

          <Link href="/parent">
            <div className="block w-full bg-white border border-stone-200 hover:border-[#8aab84] hover:bg-[#f3f7f0] text-stone-700 rounded-2xl px-8 py-5 transition-colors cursor-pointer shadow-sm">
              <div className="text-lg font-semibold">保護者として使う</div>
              <div className="text-stone-400 text-xs mt-1">
                子どもの気持ちを、一緒に整理する
              </div>
            </div>
          </Link>
        </div>

        <p className="text-stone-400 text-xs">
          入力した内容は外部に送信されません
        </p>

        <Link href="/kimoti-map" className="text-stone-400 hover:text-stone-600 text-xs transition-colors">
          このアプリについて
        </Link>
      </div>
    </main>
  );
}

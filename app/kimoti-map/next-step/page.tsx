import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "居場所という選択肢について — きもちの地図",
  description:
    "無理にどこかへ行く必要はありません。でも、「こういう場所もある」と知っておくことが、少し気持ちを軽くすることもあります。",
};

function Ring({ className }: { className?: string }) {
  return (
    <div
      className={`rounded-full border border-[#8aab84]/20 pointer-events-none ${className}`}
    />
  );
}

function Divider() {
  return <div className="w-10 h-px bg-stone-200 mx-auto" />;
}

// ① タイトル
function TitleSection() {
  return (
    <section className="relative px-6 pt-28 pb-20 text-center bg-gradient-to-b from-[#faf8f3] to-white overflow-hidden">
      <Ring className="absolute top-10 right-4 w-40 h-40 opacity-60" />
      <Ring className="absolute top-8 right-2 w-60 h-60 opacity-30" />
      <Ring className="absolute bottom-0 left-0 w-32 h-32 opacity-40" />

      <div className="relative max-w-sm mx-auto space-y-6">
        <Link
          href="/kimoti-map"
          className="inline-block text-xs text-stone-400 hover:text-stone-500 tracking-wide transition-colors"
        >
          ← きもちの地図にもどる
        </Link>
        <div className="space-y-4 pt-2">
          <p className="text-[11px] tracking-[0.3em] text-stone-400 uppercase">
            a place to be
          </p>
          <h1 className="text-3xl font-bold text-stone-700 leading-snug tracking-tight">
            居場所という
            <br />
            選択肢について
          </h1>
        </div>
      </div>
    </section>
  );
}

// ② 導入（安心をつくる）
function IntroSection() {
  return (
    <section className="px-6 py-20 bg-white">
      <div className="max-w-sm mx-auto space-y-6 text-stone-500 text-base leading-[2.3]">
        <p>
          無理にどこかへ行く必要は、ありません。
        </p>
        <p>
          でも、「こういう場所もある」と知っておくことが、
          少し気持ちを軽くすることもあります。
        </p>
        <p>
          情報を集めること自体が、
          すでに一歩だと思っています。
        </p>
      </div>
    </section>
  );
}

// ③ 選択肢の存在（広げる）
function OptionsSection() {
  return (
    <section className="relative px-6 py-20 bg-[#f3f7f0] overflow-hidden">
      <Ring className="absolute -right-12 top-8 w-48 h-48 opacity-50" />

      <div className="relative max-w-sm mx-auto space-y-8">
        <h2 className="text-xl font-semibold text-stone-600 leading-relaxed">
          学校だけが、
          <br />
          学びの場ではない
        </h2>
        <div className="space-y-5 text-stone-500 text-base leading-[2.3]">
          <p>
            学校以外にも、学ぶ場所はあります。
            フリースクール、オンラインの学び場、
            地域の居場所、家での時間。
            どれが正解ということはありません。
          </p>
          <p>
            ひとつに決める必要もなく、
            試してみて、合わなければ変えていい。
            その子のペースで、その子が安心できる場所が、
            その子にとっての居場所になります。
          </p>
          <p>
            まずは「どんな場所があるか」を
            知っておくだけでも、
            十分だと思っています。
          </p>
        </div>
      </div>
    </section>
  );
}

// ④ Sasabase へのつなぎ（自然に）
function BridgeSection() {
  return (
    <section className="px-6 py-20 bg-white">
      <div className="max-w-sm mx-auto space-y-6 text-stone-500 text-base leading-[2.3]">
        <Divider />
        <p className="pt-4">
          私たちが関わっている場所も、
          そのうちのひとつです。
        </p>
        <p>
          特別な場所ではありません。
          ただ、「ここにいていい」と感じられるような
          雰囲気を大切にしています。
        </p>
        <p>
          一度来たら、ずっとここにいなければならない
          ということもありません。
          来たいときに来て、離れたいときは離れていい。
          そのくらいの距離感でいいと思っています。
        </p>
      </div>
    </section>
  );
}

// ⑤ Sasabase の紹介（軽く）
function SasabaseIntroSection() {
  return (
    <section className="px-6 py-20 bg-[#faf8f3]">
      <div className="max-w-sm mx-auto space-y-8">
        <h2 className="text-xl font-semibold text-stone-600 text-center leading-relaxed">
          Sasabase について
        </h2>
        <div className="bg-white rounded-3xl px-6 py-8 space-y-5 text-stone-500 text-base leading-[2.3]">
          <p>
            急いで来なくていい。
            準備ができていなくてもいい。
          </p>
          <p>
            子どもも大人も、それぞれのペースで関われる場所として、
            Sasabaseは存在しています。
          </p>
          <p>
            異なる年代の人がいて、
            いろんな経験を持つ人がいる。
            そのなかで、「学びってなんだろう」を
            一緒に考えていくような場所です。
          </p>
          <p>
            何かを教えてもらうというより、
            一緒に見つけていく感覚。
            そういう場所にしたいと思っています。
          </p>
        </div>
      </div>
    </section>
  );
}

// ⑥ 締め（安心＋余韻）
function ClosingSection() {
  return (
    <section className="relative px-6 py-20 bg-white overflow-hidden">
      <Ring className="absolute -left-14 bottom-4 w-56 h-56 opacity-40" />
      <Ring className="absolute -left-6 bottom-2 w-36 h-36 opacity-30" />

      <div className="relative max-w-sm mx-auto space-y-6 text-stone-500 text-base leading-[2.3]">
        <Divider />
        <div className="pt-4 space-y-5">
          <p>
            来なくてもいいです。
          </p>
          <p>
            でも、知っておくだけでいい。
            「こういう場所がある」ということを。
          </p>
          <p className="text-stone-600">
            それが、いつかの一歩になることもあります。
          </p>
        </div>
        <Divider />
      </div>
    </section>
  );
}

// ⑦ CTA
function CTASection() {
  return (
    <section className="relative px-6 py-24 bg-gradient-to-b from-white to-[#f3f7f0] overflow-hidden">
      <div className="max-w-sm mx-auto space-y-6 text-center">
        <p className="text-stone-400 text-sm leading-relaxed">
          もう少し知りたいと思ったら
        </p>
        <a href="https://www.sasabase.com/support" target="_blank" rel="noopener noreferrer">
          <span className="block w-full bg-[#8aab84] hover:bg-[#7a9b74] text-white rounded-full px-8 py-5 text-lg font-medium transition-colors shadow-sm cursor-pointer">
            Sasabase について見る
          </span>
        </a>
        <Link
          href="/kimoti-map"
          className="block text-sm text-stone-400 hover:text-stone-500 transition-colors pt-2"
        >
          きもちの地図にもどる
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 py-12 bg-[#f3f7f0] text-center space-y-2">
      <p className="text-stone-600 font-medium text-base">きもちの地図</p>
      <p className="text-stone-400 text-sm leading-relaxed">
        入力した内容は外部に送信されません
        <br />© 2024 きもちの地図
      </p>
    </footer>
  );
}

export default function NextStepPage() {
  return (
    <main>
      <TitleSection />
      <IntroSection />
      <OptionsSection />
      <BridgeSection />
      <SasabaseIntroSection />
      <ClosingSection />
      <CTASection />
      <Footer />
    </main>
  );
}

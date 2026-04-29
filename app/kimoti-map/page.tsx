import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "きもちの地図 — 学校に行きづらさを感じている子と親のために",
  description:
    "モヤモヤしてるのに、理由がよくわからない。そんな気持ちを少しずつ整理するためのアプリです。",
};

function Ring({ className }: { className?: string }) {
  return (
    <div
      className={`rounded-full border border-[#8aab84]/20 pointer-events-none ${className}`}
    />
  );
}

// ① ファーストビュー
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-28 text-center overflow-hidden bg-gradient-to-br from-[#faf8f3] to-[#eef5eb]">
      <Ring className="absolute top-12 right-6 w-36 h-36 opacity-70" />
      <Ring className="absolute top-10 right-4 w-52 h-52 opacity-40" />
      <Ring className="absolute bottom-24 left-2 w-28 h-28 opacity-50" />
      <Ring className="absolute top-1/2 -left-10 w-56 h-56 opacity-20" />

      <div className="relative max-w-sm w-full space-y-10">
        <div className="space-y-5">
          <p className="text-[11px] tracking-[0.3em] text-stone-400 uppercase">
            kimochi no chizu
          </p>
          <h1 className="text-[4rem] font-bold text-stone-700 leading-tight tracking-tight">
            きもちの地図
          </h1>
          <p className="text-base text-stone-500 leading-relaxed">
            学校に行きづらさを感じている
            <br />
            子どもと保護者のために
          </p>
        </div>

        <p className="text-stone-600 text-xl leading-[2.4]">
          モヤモヤしてるのに、
          <br />
          理由がよくわからない。
          <br />
          そんなこと、ありませんか。
        </p>
      </div>
    </section>
  );
}

// ② 共感セクション
function EmpathySection() {
  const feelings = [
    { who: "子", text: "朝になると、なんとなく体がしんどくなる" },
    { who: "子", text: "何が嫌なのか、自分でもよくわからない" },
    { who: "子", text: "学校のことを考えると、気持ちが重くなる" },
    { who: "親", text: "どう声をかければいいのか、わからない" },
    { who: "親", text: "「がんばれ」って言えない。でも、何も言えない" },
  ];

  return (
    <section className="px-6 py-28 bg-white">
      <div className="max-w-sm mx-auto space-y-12">
        <h2 className="text-2xl font-semibold text-stone-600 text-center leading-relaxed">
          こんな気持ち、
          <br />
          ありませんか
        </h2>
        <div className="space-y-4">
          {feelings.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-[#faf8f3] rounded-2xl px-5 py-5"
            >
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${
                  f.who === "子"
                    ? "bg-sky-100 text-sky-600"
                    : "bg-amber-100 text-amber-600"
                }`}
              >
                {f.who}
              </span>
              <p className="text-stone-600 text-base leading-relaxed">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ③ 考え方セクション
function PerspectiveSection() {
  return (
    <section className="relative px-6 py-28 bg-[#f3f7f0] overflow-hidden">
      <Ring className="absolute -right-14 top-6 w-52 h-52 opacity-60" />
      <Ring className="absolute -right-8 top-2 w-36 h-36 opacity-40" />

      <div className="relative max-w-sm mx-auto space-y-8">
        <h2 className="text-2xl font-semibold text-stone-600 text-center leading-relaxed">
          それは「問題」じゃない
          <br />
          かもしれない
        </h2>
        <div className="space-y-6 text-stone-500 text-base leading-[2.2]">
          <p>
            学校に行きづらい理由は、ひとつじゃありません。
            <br />
            クラスの雰囲気、先生との相性、
            <br />
            自分の感じ方や特性が関係することもある。
          </p>
          <div className="h-px bg-stone-200" />
          <p>
            「おかしい」わけでも、
            <br />
            「弱い」わけでも、ない。
            <br />
            <span className="text-stone-700 font-semibold">
              その子の感じ方が、そこにあるだけ。
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

// ④ アプリ紹介
function AppIntroSection() {
  const features = [
    {
      label: "気持ちを言葉にする",
      desc: "うまく話せなくても大丈夫。選ぶだけでいい。",
    },
    {
      label: "少しずつ整理する",
      desc: "一度でわかろうとしない。少しずつでいい。",
    },
    {
      label: "親と子、それぞれで使える",
      desc: "同じ画面を見なくていい。それぞれのペースで。",
    },
  ];

  return (
    <section className="px-6 py-28 bg-white">
      <div className="max-w-sm mx-auto space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-stone-600">
            「きもちの地図」でできること
          </h2>
          <p className="text-stone-400 text-sm">
            答えじゃなく、気持ちの地図を描く
          </p>
        </div>

        <div className="space-y-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="border border-stone-100 rounded-2xl px-5 py-6 space-y-2"
            >
              <p className="text-stone-700 font-semibold text-base">
                {f.label}
              </p>
              <p className="text-stone-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <Link href="/" className="block">
          <span className="block w-full bg-[#8aab84] hover:bg-[#7a9b74] text-white rounded-full px-8 py-5 text-lg font-medium transition-colors shadow-sm text-center cursor-pointer">
            アプリを使ってみる
          </span>
        </Link>
      </div>
    </section>
  );
}

// ⑤ ストーリー（開発者）
function StorySection() {
  return (
    <section className="px-6 py-28 bg-[#faf8f3]">
      <div className="max-w-sm mx-auto space-y-8">
        <h2 className="text-2xl font-semibold text-stone-600 text-center">
          なぜ作ったのか
        </h2>
        <div className="space-y-5 text-stone-500 text-base leading-[2.2]">
          <p>正直に言うと、私自身、学校にうまく馴染めない子どもでした。</p>
          <p>
            自分の子どももまた、日本の一般的な学校になじめず、
            学校以外の場で学んでいたこともあります。
          </p>
          <p>
            「普通でいい」と言われるけれど、
            それは、どこか型にはめようとしているようにも感じていました。
          </p>
          <p>
            本当は、それぞれに違う成長のペースや、
            その子なりの道があるはずなのに。
          </p>
          <p>
            自分にできることを考えながら、
            少しずつ学んできました。
          </p>
          <div className="h-px bg-stone-200" />
          <p>
            「どうしてあげるか」ではなく、
            「一緒に探していくこと」。
          </p>
          <p>
            学びは、与えるものではなく、
            ともに見つけていくものかもしれません。
          </p>
          <div className="h-px bg-stone-200" />
          <p>
            「正しい答え」を求める前に、まずは
            <span className="text-stone-700 font-semibold">
              「今、どんな気持ちか」
            </span>
            から始めたい。
            <br />
            そんな想いで、このアプリを作りました。
          </p>
        </div>
        <p className="text-right text-sm text-stone-400">開発者より</p>
      </div>
    </section>
  );
}

// ⑥ ビジネスパートナー紹介
function PartnerSection() {
  return (
    <section className="px-6 py-28 bg-white">
      <div className="max-w-sm mx-auto space-y-8">
        <h2 className="text-2xl font-semibold text-stone-600 text-center">
          多様な視点で支えています
        </h2>
        <div className="bg-[#f3f7f0] rounded-3xl px-6 py-8 space-y-5 text-stone-500 text-base leading-[2.2]">
          <p>
            もうひとりのメンバーも、私と同じくシングルマザーです。
          </p>
          <p>
            それぞれの環境の中で子どもを育てながら、
            「学びとは何か」に向き合ってきました。
          </p>
          <p>
            高校時代にニュージーランドへ留学した彼女と、
            40代で海外で現地就労を経験した私。
            外から日本を見ることで、
            その良さと、これから変えていける部分の両方を感じてきました。
          </p>
          <p>
            彼女は中学校という教育現場で、
            私は一般企業や地域のフィールドで、
            学びを軸に試行錯誤を重ねてきました。
          </p>
          <p>
            彼女自身の子どもたちもまた、
            学校や集団の中で生きづらさを感じてきました。
            現在は、発達支援の現場でマネジメントにも携わっています。
          </p>
          <div className="h-px bg-stone-300" />
          <p className="text-stone-700 font-semibold">
            当事者として。支援者として。
            <br />
            どちらか一方ではなく、
            両方の視点から、届けたいと思っています。
          </p>
        </div>
      </div>
    </section>
  );
}

// ⑦ Sasabase 導線
function SasabaseSection() {
  return (
    <section className="relative px-6 py-28 bg-[#f3f7f0] overflow-hidden">
      <Ring className="absolute -left-16 -bottom-16 w-72 h-72 opacity-50" />
      <Ring className="absolute -left-8 -bottom-8 w-48 h-48 opacity-40" />

      <div className="relative max-w-sm mx-auto space-y-8 text-center">
        <div className="space-y-3">
          <p className="text-[11px] tracking-[0.3em] text-stone-400 uppercase">
            next step
          </p>
          <h2 className="text-2xl font-semibold text-stone-600 leading-relaxed">
            リアルな居場所も、
            <br />
            選択肢のひとつに
          </h2>
        </div>

        <div className="text-stone-500 text-base leading-[2.2] text-left space-y-4">
          <p>このアプリは、入口にすぎません。</p>
          <p>
            気持ちが少し整理できたら、
            実際に会える場所や、
            学べる場につながることもできます。
          </p>
          <p>
            無理に来なくていい。
            <br />
            でも、そういう場所が「ある」と知っておくことが、
            きっと力になると思っています。
          </p>
        </div>

        <a
          href="/kimoti-map/next-step"
          className="block w-full border-2 border-[#8aab84] text-[#8aab84] hover:bg-[#8aab84] hover:text-white rounded-full px-8 py-5 text-lg font-medium transition-colors"
        >
          居場所について知る
        </a>
      </div>
    </section>
  );
}

// ⑧ 年齢幅（追加）
function AgeRangeNote() {
  return (
    <section className="px-6 py-16 bg-white">
      <div className="max-w-sm mx-auto text-center space-y-5">
        <div className="w-10 h-px bg-stone-200 mx-auto" />
        <p className="text-stone-400 text-sm leading-[2.2]">
          小学生から高校生まで、
          <br />
          それぞれのペースで使えるように設計しています。
        </p>
        <div className="w-10 h-px bg-stone-200 mx-auto" />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 py-14 bg-[#faf8f3] text-center space-y-2">
      <p className="text-stone-600 font-medium text-base">きもちの地図</p>
      <p className="text-stone-400 text-sm leading-relaxed">
        入力した内容は外部に送信されません
        <br />© 2024 きもちの地図
      </p>
    </footer>
  );
}

export default function KimotiMapLP() {
  return (
    <main>
      <Hero />
      <EmpathySection />
      <PerspectiveSection />
      <AppIntroSection />
      <StorySection />
      <PartnerSection />
      <SasabaseSection />
      <AgeRangeNote />
      <Footer />
    </main>
  );
}

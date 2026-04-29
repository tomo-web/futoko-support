"use client";

import { useState } from "react";
import Link from "next/link";

type CategoryKey = "school" | "relationship" | "family" | "health" | "feeling";

type Item = {
  id: string;
  text: string;
  shortText: string;
};

type Category = {
  key: CategoryKey;
  label: string;
  intro?: string;
  items: Item[];
};

const questions: Category[] = [
  {
    key: "school",
    label: "学校の環境",
    items: [
      { id: "q1", text: "先生との関係がうまくいっていない様子がある", shortText: "先生との関係" },
      { id: "q2", text: "クラスの雰囲気や学校のルールが合っていないようだ", shortText: "クラスの雰囲気" },
      { id: "q3", text: "授業についていけていないと感じている", shortText: "授業のこと" },
      { id: "q4", text: "学校に行く前後で、明らかに様子が変わる", shortText: "学校前後の様子" },
    ],
  },
  {
    key: "relationship",
    label: "友だち関係",
    items: [
      { id: "q5", text: "特定の子との関係が難しくなっている", shortText: "友だちとの関係" },
      { id: "q6", text: "グループから外されている様子がある", shortText: "グループからの孤立" },
      { id: "q7", text: "学校の話題になると急に黙る", shortText: "学校の話を避ける" },
      { id: "q8", text: "SNSや連絡のやりとりを避けている", shortText: "連絡のやりとり" },
    ],
  },
  {
    key: "family",
    label: "家庭・生活",
    items: [
      { id: "q9", text: "家庭内で大きな変化（引越・家族構成の変化など）があった", shortText: "家庭の変化" },
      { id: "q10", text: "きょうだいとの関係にストレスがある", shortText: "きょうだいとの関係" },
      { id: "q11", text: "子どもとゆっくり話す時間が減っている", shortText: "話す時間の減少" },
      { id: "q12", text: "家が安心できる場所になっていない可能性がある", shortText: "家での安心感" },
    ],
  },
  {
    key: "health",
    label: "心と体の状態",
    items: [
      { id: "q13", text: "朝になると頭痛や腹痛など、体の不調を訴える", shortText: "朝の体調" },
      { id: "q14", text: "眠れない・起きられないなど、睡眠が乱れている", shortText: "睡眠の乱れ" },
      { id: "q15", text: "食欲に変化がある（食べない・食べすぎ）", shortText: "食欲の変化" },
      { id: "q16", text: "以前より元気がなく、表情が乏しい", shortText: "元気・表情の変化" },
    ],
  },
  {
    key: "feeling",
    label: "感じ方・ペース",
    intro:
      "感じ方やペースは、人それぞれ違います。いわゆる「特性」と呼ばれるものが、影響していることもあります。",
    items: [
      { id: "q17", text: "音やにおい、人の多さなどに強いストレスを感じている様子がある", shortText: "感覚のストレス" },
      { id: "q18", text: "学校に行くと極端に疲れてしまう", shortText: "極端な疲れ" },
      { id: "q19", text: "集団の中でどう振る舞えばいいか分からない様子がある", shortText: "集団での振る舞い" },
      { id: "q20", text: "空気を読むことや、暗黙のルールが負担になっている", shortText: "暗黙のルール" },
      { id: "q21", text: "好きなことには集中できるが、そうでないと難しい", shortText: "集中のムラ" },
      { id: "q22", text: "授業の進め方が合っていないと感じている", shortText: "授業の進め方" },
      { id: "q23", text: "予定の変更や急な指示に強いストレスを感じる", shortText: "予定変更のストレス" },
      { id: "q24", text: "自分なりのやり方や順序に強いこだわりがある", shortText: "こだわり" },
      { id: "q25", text: "失敗や注意に対して、強く落ち込む", shortText: "落ち込みやすさ" },
      { id: "q26", text: "自分を責めている様子がある", shortText: "自責の様子" },
    ],
  },
];

// 状態フォーカス・原因帰属なし・親の自責を避ける表現
const categoryInfo: Record<CategoryKey, { label: string; multiLabel: string; desc: string }> = {
  school: {
    label: "学校の環境",
    multiLabel: "学校の環境との相性",
    desc: "学校という場が、今その子にとって負荷になっている状態かもしれません。これはその子の問題ではなく、「その子とその環境の間にある摩擦」として見ていくことができます。環境や関係性が変わると、状態が変わることもあります。",
  },
  relationship: {
    label: "人との関係",
    multiLabel: "人との関係",
    desc: "人とのつながりの中で、今エネルギーを消耗している状態かもしれません。「うまくやれていない」のではなく、「今その関係が負荷になっている」というとらえ方が、次の手がかりになることがあります。",
  },
  family: {
    label: "家庭・生活の変化",
    multiLabel: "生活環境の変化",
    desc: "生活リズムや環境の変化が、じわじわと影響している可能性があります。大きな出来事でなくても、小さな変化の積み重ねが、心のバランスに影響することはよくあります。",
  },
  health: {
    label: "心と体のサイン",
    multiLabel: "心と体のサイン",
    desc: "体と気持ちが「もう休んで」というサインを出している状態かもしれません。まず「そうか、しんどいんだね」と受け取ることが、最初の一歩になることがあります。サインは、弱さではありません。",
  },
  feeling: {
    label: "感じ方・ペース",
    multiLabel: "感じ方やペース",
    desc: "その子なりの感じ方や刺激への感度が、学校や集団という場所の中で、負荷として現れている可能性があります。感じ方のちがいは、その子の状態が「悪い」のではなく、「環境との間に合わない部分がある」ということかもしれません。",
  },
};

// 親を承認する・複合性を伝える
const empathyTextMap: Record<CategoryKey, string> = {
  school: "学校のことを、ずっと気にかけていたんですね。気づいていることを言葉にしてくれて、ありがとうございます。",
  relationship: "人との関係のことで、心配されていたんですね。その気持ち、ちゃんと受け取りました。",
  family: "家のことも含めて、いろいろと考えてきたんですね。一人で抱えてきた部分もあったかもしれません。",
  health: "体や気持ちのサインが気になっていたんですね。そこに気づいていること自体、とても大切なことです。",
  feeling: "その子の感じ方やペースを、ちゃんと見てきたんですね。その観察が、一番の手がかりになります。",
};

function getEmpathyText(byCategory: Array<{ key: CategoryKey }>): string {
  if (byCategory.length === 0) return "";
  if (byCategory.length === 1) return empathyTextMap[byCategory[0].key];
  if (byCategory.length === 2)
    return "ふたつのことが重なっているんですね。不登校の背景に複数の要素があることはよくあります。「どちらかが原因」というより、それぞれが影響し合っている状態かもしれません。こうして向き合おうとしていること自体が、子どもにとっての力になっています。";
  return "複数のことが絡み合っている状態かもしれません。理由をひとつに絞ろうとしなくて大丈夫です。「こんな状態にある」と知ることができた、それだけで十分な一歩です。";
}

export default function ParentPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checkedCount = Object.values(checked).filter(Boolean).length;

  const byCategory = questions
    .map((cat) => ({
      key: cat.key,
      checkedItems: cat.items.filter((item) => checked[item.id]),
      count: cat.items.filter((item) => checked[item.id]).length,
    }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);

  const sampleItems: string[] = [];
  for (const cat of byCategory) {
    for (const item of cat.checkedItems) {
      if (sampleItems.length >= 3) break;
      sampleItems.push(item.shortText);
    }
    if (sampleItems.length >= 3) break;
  }
  const hasMore = checkedCount > sampleItems.length;

  // 「感じ方」と他カテゴリが重なっているか
  const hasFeelingAndOther =
    byCategory.some((c) => c.key === "feeling") && byCategory.length > 1;

  return (
    <main className="max-w-lg mx-auto px-5 py-10 space-y-8">
      <div className="space-y-3">
        <a href="https://kimoti.sasabase.com/start" className="text-stone-400 hover:text-stone-600 text-sm transition-colors">
          ← もどる
        </a>
        <div>
          <h1 className="text-2xl font-bold text-stone-700">親として使う</h1>
          <p className="text-stone-400 text-xs mt-1">気づきと整理のためのチェックリスト</p>
        </div>
      </div>

      {!showResult ? (
        <>
          <div className="bg-[#faf8f3] rounded-2xl px-5 py-4 space-y-1">
            <p className="text-stone-600 text-sm leading-relaxed font-medium">
              当てはまると思う項目にチェックを入れてください
            </p>
            <p className="text-stone-400 text-xs">複数選んでも大丈夫です</p>
          </div>

          <div className="space-y-8">
            {questions.map((cat) => (
              <div key={cat.key} className="space-y-3">
                <h2 className="text-sm font-semibold text-stone-500 tracking-wide px-1">
                  {cat.label}
                </h2>
                {cat.intro && (
                  <p className="text-stone-400 text-xs leading-relaxed bg-[#f3f7f0] rounded-xl px-4 py-3">
                    {cat.intro}
                  </p>
                )}
                <div className="rounded-2xl overflow-hidden border border-stone-100 bg-white divide-y divide-stone-50">
                  {cat.items.map((item) => (
                    <label
                      key={item.id}
                      className={`flex items-start gap-3 px-4 py-4 cursor-pointer transition-colors ${
                        checked[item.id] ? "bg-[#f3f7f0]" : "hover:bg-stone-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="mt-0.5 w-5 h-5 rounded accent-[#8aab84] cursor-pointer shrink-0"
                        checked={!!checked[item.id]}
                        onChange={() => toggle(item.id)}
                      />
                      <span className={`text-sm leading-relaxed ${checked[item.id] ? "text-stone-700" : "text-stone-500"}`}>
                        {item.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowResult(true)}
            disabled={checkedCount === 0}
            className="w-full bg-[#8aab84] hover:bg-[#7a9b74] disabled:bg-stone-200 disabled:text-stone-400 text-white rounded-full py-4 font-medium transition-colors text-base"
          >
            {checkedCount === 0 ? "項目を選んでください" : "気持ちを整理してみる"}
          </button>
        </>
      ) : (
        <div className="space-y-8">
          {/* ① 共感・承認 */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-stone-700">チェックした内容から</h2>
            <p className="text-stone-500 text-base leading-[2.2]">
              {getEmpathyText(byCategory)}
            </p>
          </div>

          {/* 気になっていること */}
          {sampleItems.length > 0 && (
            <div className="bg-[#faf8f3] rounded-2xl px-5 py-4 space-y-2">
              <p className="text-stone-400 text-xs">気になっていること</p>
              <ul className="space-y-1.5">
                {sampleItems.map((text, i) => (
                  <li key={i} className="text-stone-600 text-sm">・{text}</li>
                ))}
                {hasMore && <li className="text-stone-400 text-xs">など</li>}
              </ul>
            </div>
          )}

          {/* ② 複合性・状態の整理 */}
          <div className="space-y-4">
            {byCategory.length === 2 && (
              <p className="text-stone-500 text-sm leading-relaxed">
                {categoryInfo[byCategory[0].key].multiLabel}と
                {categoryInfo[byCategory[1].key].multiLabel}が、
                影響し合っている可能性があります。どちらかを「解決」しようとするより、
                まず状態を知ることが先になることがあります。
              </p>
            )}
            {byCategory.length >= 3 && (
              <p className="text-stone-500 text-sm leading-relaxed">
                {byCategory.map((c) => categoryInfo[c.key].multiLabel).join("、")}など、
                複数の要素が重なっている状態かもしれません。
                不登校の背景が複合的なことは、珍しくありません。
              </p>
            )}

            {/* 特性×環境の相互作用についての補足 */}
            {hasFeelingAndOther && (
              <div className="bg-[#faf8f3] rounded-xl px-4 py-4">
                <p className="text-stone-400 text-xs leading-relaxed">
                  感じ方や刺激への感度は、それ単独で現れるより、
                  環境や関係との組み合わせの中で負荷として見えてくることがよくあります。
                </p>
              </div>
            )}

            <div className="space-y-3">
              {byCategory.map((cat) => (
                <div key={cat.key} className="bg-[#f3f7f0] rounded-2xl px-5 py-5 space-y-2">
                  <p className="text-stone-700 font-semibold text-sm">{categoryInfo[cat.key].label}</p>
                  <p className="text-stone-500 text-sm leading-relaxed">{categoryInfo[cat.key].desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ③ 見方のヒント */}
          <div className="bg-white border border-stone-100 rounded-2xl px-5 py-5 space-y-2">
            <p className="text-stone-600 text-sm font-semibold">見ていくときのヒント</p>
            <p className="text-stone-500 text-sm leading-[2.1]">
              「なぜ行けないのか」ではなく、
              「どんな状態のときにしんどそうか」から見ていくことが、
              手がかりになることがあります。行動よりも、その子の状態に注目することで、
              見えてくるものが変わることがあります。
            </p>
          </div>

          {/* ④ 次の一歩 */}
          <div className="space-y-5">
            <p className="text-stone-500 text-sm leading-[2.1]">
              無理に何かを変える必要はありません。
              まずは気持ちを整理することからでも大丈夫です。
            </p>
            <div className="space-y-3">
              <Link href="/child">
                <span className="block w-full bg-[#8aab84] hover:bg-[#7a9b74] text-white rounded-full px-6 py-4 text-base font-medium transition-colors text-center cursor-pointer">
                  子どもモードを使う
                </span>
              </Link>
              <Link href="/kimoti-map/next-step">
                <span className="block w-full border-2 border-[#8aab84] text-[#8aab84] hover:bg-[#8aab84] hover:text-white rounded-full px-6 py-4 text-base font-medium transition-colors text-center cursor-pointer">
                  居場所について知る
                </span>
              </Link>
            </div>
          </div>

          <button
            onClick={() => { setShowResult(false); setChecked({}); }}
            className="w-full text-stone-400 hover:text-stone-600 text-sm py-2 transition-colors"
          >
            もう一度チェックする
          </button>
        </div>
      )}
    </main>
  );
}

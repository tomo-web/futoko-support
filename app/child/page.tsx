"use client";

import { useState } from "react";
import Link from "next/link";

type MoodId = "happy" | "okay" | "tired" | "sad" | "scared" | "angry";
type FeelingGroup = "body" | "school" | "connection";
type FeelingItem = { id: string; text: string };

const moods: { id: MoodId; emoji: string; label: string }[] = [
  { id: "happy", emoji: "😊", label: "元気" },
  { id: "okay", emoji: "😐", label: "ふつう" },
  { id: "tired", emoji: "😔", label: "つかれた" },
  { id: "sad", emoji: "😢", label: "かなしい" },
  { id: "scared", emoji: "😨", label: "こわい" },
  { id: "angry", emoji: "😠", label: "イライラ" },
];

const baseFeelings: FeelingItem[] = [
  { id: "f1", text: "学校のことを考えるとお腹や頭が痛くなる" },
  { id: "f2", text: "朝、起きるのがつらい" },
  { id: "f3", text: "学校に行きたくない理由がうまく言えない" },
  { id: "f4", text: "クラスや友達のことが心配" },
  { id: "f5", text: "先生のことが気になっている" },
  { id: "f6", text: "勉強がわからなくて不安" },
  { id: "f7", text: "家にいると少し安心できる" },
  { id: "f8", text: "誰かに気持ちをわかってほしい" },
];

const moodContext: Record<MoodId, string> = {
  happy: "元気なとき、こんなこともあるかな？",
  okay: "ふつうって感じのとき、どんなことかな？",
  tired: "疲れているとき、こんなことはある？",
  sad: "悲しい気持ちのとき、どんなことがある？",
  scared: "こわいって感じるとき、こんなことはある？",
  angry: "イライラするとき、どんなことがあるかな？",
};

const moodExtraFeelings: Record<MoodId, FeelingItem[]> = {
  happy: [
    { id: "fh1", text: "元気なのに、なんとなく明日のことが頭にある" },
  ],
  okay: [
    { id: "fo1", text: "なんとなくモヤモヤした気持ちがある" },
    { id: "fo2", text: "どうしてこんな気持ちなのかよくわからない" },
  ],
  tired: [
    { id: "ft1", text: "何もしたくない気持ちになる" },
    { id: "ft2", text: "外に出るのがしんどく感じる" },
  ],
  sad: [
    { id: "fs1", text: "泣きたい気持ちになることがある" },
    { id: "fs2", text: "一人でいたくなる" },
  ],
  scared: [
    { id: "fsc1", text: "なんとなくドキドキして、落ち着かない" },
    { id: "fsc2", text: "一人でいるのがこわくなる" },
  ],
  angry: [
    { id: "fa1", text: "自分でもなぜイライラしているかわからない" },
    { id: "fa2", text: "誰かに当たってしまうことがある" },
  ],
};

const feelingGroupMap: Record<string, FeelingGroup> = {
  f1: "body",  f2: "body",
  f3: "school", f4: "school", f5: "school", f6: "school",
  f7: "connection", f8: "connection",
  fh1: "school",
  fo1: "body", fo2: "body",
  ft1: "body", ft2: "body",
  fs1: "body", fs2: "connection",
  fsc1: "body", fsc2: "connection",
  fa1: "body", fa2: "connection",
};

const moodResponse: Record<MoodId, string> = {
  happy: "今日は元気なんだね。それはよかった。",
  okay: "ふつうな感じか。正直に教えてくれてありがとう。",
  tired: "つかれているんだね。無理しなくていいよ。",
  sad: "かなしい気持ち、教えてくれてありがとう。一人じゃないよ。",
  scared: "こわい気持ちがあるんだね。ゆっくり話してくれると嬉しいな。",
  angry: "イライラしてるんだね。それはつらいね。",
};

// ① 共感（気分ごとに変える）
const empathyFirst: Record<MoodId, string> = {
  happy: "今日は元気でいたんだね。",
  okay: "ふつうかな、という気持ちだったんだね。",
  tired: "つかれているんだね。",
  sad: "かなしい気持ちでいたんだね。",
  scared: "こわいって感じていたんだね。",
  angry: "イライラしていたんだね。",
};

// ② 意味づけ（グループ組み合わせ × 場面の具体化）
function getMeaningText(mood: MoodId, groups: Set<FeelingGroup>): string {
  const hasBody = groups.has("body");
  const hasSchool = groups.has("school");
  const hasConnection = groups.has("connection");

  if (groups.size === 0) {
    const fallback: Partial<Record<MoodId, string>> = {
      tired: "うまく言葉にできなくても、疲れているのはちゃんとした気持ちだよ。",
      sad: "うまく言葉にできなくても、かなしい気持ちは、ちゃんとここにあるよ。",
      scared: "こわいって感じているだけで、それはちゃんとした気持ちだよ。",
      angry: "イライラの理由がわからなくても、それはちゃんとした気持ちだよ。",
    };
    return fallback[mood] ?? "";
  }

  if (hasBody && hasSchool && hasConnection)
    return "学校のことを考えたときや、朝起きるとき、人と関わるとき——そんな場面でしんどさを感じることがあって、いろんなことが重なっているのかもしれないね。";

  if (hasBody && hasSchool)
    return "学校のことを考えたときや、朝起きるときに、体や気持ちがしんどくなることがあったのかもしれないね。";

  if (hasBody && hasConnection)
    return "人と関わるときや、朝起きるときに、体がおもくなる感じがあったのかもしれないね。";

  if (hasSchool && hasConnection)
    return "学校のことを考えたときや、誰かと話そうとするとき、気持ちが重くなることがあったのかもしれないね。";

  if (hasBody)
    return "朝起きるときや、何かしようとするとき、体が「もう少し休ませて」って言っていたのかもしれないね。";

  if (hasSchool)
    return "学校のことを考えたときや、授業や友だちのことが頭に浮かんだとき、気持ちがざわざわしていたのかもしれないね。";

  if (hasConnection)
    return "誰かと関わるときや、一人でいるとき、もやもやした気持ちがあったのかもしれないね。";

  return "";
}

// ③ 整理（選択項目を自然な言葉に言い換え）
const paraphraseMap: Record<string, string> = {
  f1: "学校のことを考えるとしんどくなること",
  f2: "朝、起きるのがつらいこと",
  f3: "うまく言葉にできない気持ち",
  f4: "クラスや友だちのこと",
  f5: "先生との関係のこと",
  f6: "勉強への不安",
  f7: "家にいると少し楽になれること",
  f8: "誰かにわかってほしい気持ち",
  fh1: "なんとなく明日のことが気になること",
  fo1: "モヤモヤした気持ち",
  fo2: "うまく言葉にできない感じ",
  ft1: "何もしたくない気持ち",
  ft2: "外に出るのがしんどい感じ",
  fs1: "泣きたくなる気持ち",
  fs2: "一人でいたくなる気持ち",
  fsc1: "落ち着かない、ドキドキする感じ",
  fsc2: "一人でいるのがこわい気持ち",
  fa1: "なぜイライラしているかわからない感じ",
  fa2: "誰かに当たってしまいそうな気持ち",
};

function FeelingLabel({ item, checked, onToggle }: {
  item: FeelingItem;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label
      className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors ${
        checked ? "bg-sky-50" : "hover:bg-sky-50"
      }`}
    >
      <input
        type="checkbox"
        className="mt-0.5 w-5 h-5 rounded accent-sky-500 cursor-pointer shrink-0"
        checked={checked}
        onChange={onToggle}
      />
      <span className={`text-sm leading-relaxed ${checked ? "text-sky-800" : "text-stone-500"}`}>
        {item.text}
      </span>
    </label>
  );
}

export default function ChildPage() {
  const [step, setStep] = useState<"mood" | "feelings" | "result">("mood");
  const [selectedMood, setSelectedMood] = useState<MoodId>("happy");
  const [checkedFeelings, setCheckedFeelings] = useState<Record<string, boolean>>({});

  const toggleFeeling = (id: string) => {
    setCheckedFeelings((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const extraFeelings = moodExtraFeelings[selectedMood] ?? [];
  const allFeelings = [...extraFeelings, ...baseFeelings];
  const checkedIds = allFeelings.filter((f) => checkedFeelings[f.id]).map((f) => f.id);

  const groups = new Set(
    checkedIds.map((id) => feelingGroupMap[id]).filter((g): g is FeelingGroup => !!g)
  );
  const meaningText = getMeaningText(selectedMood, groups);
  const paraphrasedItems = checkedIds
    .map((id) => paraphraseMap[id])
    .filter(Boolean)
    .slice(0, 3);

  return (
    <main className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-3">
        {step === "mood" ? (
          <Link href="/" className="text-sky-600 hover:text-sky-800 text-sm">
            ← もどる
          </Link>
        ) : (
          <button
            onClick={() => setStep("mood")}
            className="text-sky-600 hover:text-sky-800 text-sm"
          >
            ← もどる
          </button>
        )}
        <h1 className="text-2xl font-bold text-sky-700">気持ちを教えてね</h1>
      </div>

      {/* ステップ①：気分選択 */}
      {step === "mood" && (
        <div className="space-y-5">
          <p className="text-stone-500 text-sm leading-relaxed">
            今、どんな気持ちかな？<br />
            一番近いものをえらんでね。
          </p>
          <div className="grid grid-cols-3 gap-3">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => {
                  setSelectedMood(mood.id);
                  setCheckedFeelings({});
                  setStep("feelings");
                }}
                className="flex flex-col items-center bg-white rounded-2xl border border-gray-100 py-5 shadow-sm hover:border-sky-300 hover:bg-sky-50 transition-colors"
              >
                <span className="text-4xl">{mood.emoji}</span>
                <span className="text-stone-500 text-sm mt-2">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ステップ②：気持ちチェック */}
      {step === "feelings" && (
        <div className="space-y-5">
          <div className="bg-sky-50 border border-sky-100 rounded-2xl px-4 py-3 text-sky-700 text-sm">
            {moodResponse[selectedMood]}
          </div>

          <p className="text-stone-500 text-sm leading-relaxed">
            もう少し教えて。当てはまるものがあったらチェックしてね。<br />
            なくてもいいよ。
          </p>

          {extraFeelings.length > 0 && (
            <div className="space-y-2">
              <p className="text-sky-600 text-sm px-1">{moodContext[selectedMood]}</p>
              <div className="bg-white rounded-2xl border border-sky-100 divide-y divide-sky-50">
                {extraFeelings.map((feeling) => (
                  <FeelingLabel
                    key={feeling.id}
                    item={feeling}
                    checked={!!checkedFeelings[feeling.id]}
                    onToggle={() => toggleFeeling(feeling.id)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            {extraFeelings.length > 0 && (
              <p className="text-stone-400 text-xs px-1">そのほかにも、こんなことはある？</p>
            )}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
              {baseFeelings.map((feeling) => (
                <FeelingLabel
                  key={feeling.id}
                  item={feeling}
                  checked={!!checkedFeelings[feeling.id]}
                  onToggle={() => toggleFeeling(feeling.id)}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => setStep("result")}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-full py-4 font-medium transition-colors"
          >
            これで送る
          </button>
        </div>
      )}

      {/* ステップ③：結果 */}
      {step === "result" && (
        <div className="space-y-8">

          {/* ① 共感 */}
          <div className="space-y-1">
            <p className="text-sky-700 text-lg font-medium leading-[2]">
              {empathyFirst[selectedMood]}
              <br />
              教えてくれてありがとう。
            </p>
          </div>

          {/* ② 意味づけ */}
          {meaningText && (
            <p className="text-stone-500 text-sm leading-[2.2]">
              {meaningText}
            </p>
          )}

          {/* ③ 整理（言い換え） */}
          {paraphrasedItems.length > 0 && (
            <div className="space-y-3">
              <p className="text-stone-400 text-xs">たとえば、</p>
              <ul className="space-y-2">
                {paraphrasedItems.map((text, i) => (
                  <li key={i} className="text-stone-600 text-sm leading-relaxed">
                    ・{text}
                  </li>
                ))}
              </ul>
              <p className="text-stone-400 text-xs">
                {checkedIds.length > 3 ? "などの気持ちがあったんだね。" : "そんな気持ちがあったんだね。"}
              </p>
            </div>
          )}

          {/* ④ 安心 */}
          <div className="space-y-3 pt-1">
            <p className="text-stone-500 text-sm leading-[2.2]">
              今つらい時間だとしても、<br />
              あなたが感じていることは、ぜんぶ大事な気持ちだよ。
            </p>
            <p className="text-stone-500 text-sm leading-[2.2]">
              ゆっくりでいい。休んでもいい。
            </p>
          </div>

          {/* ⑤ 小さな一歩 */}
          <div className="bg-[#f3f7f0] rounded-2xl px-5 py-5">
            <p className="text-stone-500 text-sm leading-[2.2]">
              よかったら、<br />
              どれが一番近い気持ちだったか、<br />
              少し考えてみてもいいよ。
            </p>
          </div>

          <p className="text-stone-400 text-xs text-center">
            信頼できる大人に、このページを見せてもいいよ。
          </p>

          <button
            onClick={() => {
              setStep("mood");
              setCheckedFeelings({});
            }}
            className="w-full border border-sky-200 text-sky-600 rounded-full py-3 text-sm hover:bg-sky-50 transition-colors"
          >
            もう一度やってみる
          </button>
        </div>
      )}
    </main>
  );
}

"use client";

import { useState } from "react";

type PersonalityId = "BA" | "SE" | "HN" | "AS";

const personalities: Record<PersonalityId, { name: string; coffee: string; tagline: string }> = {
  BA: { name: "Bold Adventurer", coffee: "Double Espresso", tagline: "You live for intensity" },
  SE: { name: "Sweet Enthusiast", coffee: "Caramel Latte", tagline: "Life's too short for bitter" },
  HN: { name: "Health Nut", coffee: "Oat Milk Americano", tagline: "Wellness in every sip" },
  AS: { name: "Artisan Snob", coffee: "Pour-Over, Single Origin", tagline: "You know what you like" },
};

const questions = [
  {
    question: "It's Friday night. You're…",
    options: [
      { emoji: "🏋️", text: "Crushing a workout then meal prepping", personality: "HN" as PersonalityId },
      { emoji: "🎬", text: "Rewatching a comfort show with snacks", personality: "SE" as PersonalityId },
      { emoji: "🌍", text: "Out somewhere new — you hate staying in", personality: "BA" as PersonalityId },
      { emoji: "📖", text: "Deep in a book or documentary about something obscure", personality: "AS" as PersonalityId },
    ],
  },
  {
    question: "Pick a Netflix genre:",
    options: [
      { emoji: "💪", text: "True crime or nature documentaries", personality: "HN" as PersonalityId },
      { emoji: "🧁", text: "Romantic comedies or baking competitions", personality: "SE" as PersonalityId },
      { emoji: "🔥", text: "Action thrillers or survival shows", personality: "BA" as PersonalityId },
      { emoji: "🎭", text: "Indie films or foreign language dramas", personality: "AS" as PersonalityId },
    ],
  },
  {
    question: "Your ideal vacation looks like…",
    options: [
      { emoji: "🧘", text: "A wellness retreat — yoga, clean eating, early mornings", personality: "HN" as PersonalityId },
      { emoji: "🏡", text: "A cozy cottage with good food and zero agenda", personality: "SE" as PersonalityId },
      { emoji: "🏔️", text: "Backpacking with no plan and a one-way ticket", personality: "BA" as PersonalityId },
      { emoji: "🎨", text: "An artsy city with hidden cafés and galleries", personality: "AS" as PersonalityId },
    ],
  },
  {
    question: "Someone hands you an unmarked drink. You…",
    options: [
      { emoji: "🔍", text: "Ask what's in it — ingredients matter", personality: "HN" as PersonalityId },
      { emoji: "😋", text: "Take a sip — it smells sweet, you're in", personality: "SE" as PersonalityId },
      { emoji: "😏", text: "Drink it without asking — you live dangerously", personality: "BA" as PersonalityId },
      { emoji: "🤨", text: "Smell it first, then ask where it's sourced from", personality: "AS" as PersonalityId },
    ],
  },
  {
    question: "Your go-to morning is…",
    options: [
      { emoji: "🌅", text: "Up at 6am, run, smoothie, journaling", personality: "HN" as PersonalityId },
      { emoji: "🛌", text: "Slow start, cozy blanket, something sweet", personality: "SE" as PersonalityId },
      { emoji: "⚡", text: "Up early, straight into it — no warmup needed", personality: "BA" as PersonalityId },
      { emoji: "☕", text: "Deliberate ritual — grind the beans, pour slowly, savor it", personality: "AS" as PersonalityId },
    ],
  },
  {
    question: "Pick a color that speaks to you:",
    options: [
      { emoji: "🌿", text: "Forest green", personality: "HN" as PersonalityId },
      { emoji: "🌸", text: "Dusty rose", personality: "SE" as PersonalityId },
      { emoji: "🔴", text: "Deep red", personality: "BA" as PersonalityId },
      { emoji: "🤍", text: "Off-white / cream", personality: "AS" as PersonalityId },
    ],
  },
];

function getResult(answers: PersonalityId[]): PersonalityId {
  const counts: Record<PersonalityId, number> = { BA: 0, SE: 0, HN: 0, AS: 0 };
  for (const a of answers) counts[a]++;
  const max = Math.max(...Object.values(counts));
  // Tie-break: first occurrence
  for (const a of answers) {
    if (counts[a] === max) return a;
  }
  return answers[0];
}

export default function Home() {
  const [screen, setScreen] = useState<"intro" | "quiz" | "result">("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<PersonalityId[]>([]);

  function handleAnswer(personality: PersonalityId) {
    const newAnswers = [...answers, personality];
    setAnswers(newAnswers);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScreen("result");
    }
  }

  function retake() {
    setScreen("intro");
    setCurrentQuestion(0);
    setAnswers([]);
  }

  if (screen === "intro") {
    return (
      <div className="min-h-screen bg-[#2C1A0E] flex items-center justify-center px-4">
        <div className="bg-[#F5ECD7] rounded-2xl shadow-xl max-w-lg w-full p-10 text-center">
          <h1 className="font-[family-name:var(--font-lora)] text-3xl font-bold text-[#2C1A0E] mb-4">
            What&apos;s Your Coffee Personality?
          </h1>
          <p className="text-[#5C3D2E] text-lg mb-8">
            Answer 6 quick questions and we&apos;ll match you with your perfect brew.
          </p>
          <button
            onClick={() => setScreen("quiz")}
            className="bg-[#6B3A2A] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#5a2f21] transition-colors"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (screen === "quiz") {
    const q = questions[currentQuestion];
    return (
      <div className="min-h-screen bg-[#2C1A0E] flex items-center justify-center px-4">
        <div className="bg-[#F5ECD7] rounded-2xl shadow-xl max-w-lg w-full p-8">
          <p className="text-[#8B5E3C] text-sm font-semibold mb-4 tracking-wide">
            {currentQuestion + 1} of {questions.length}
          </p>
          <h2 className="font-[family-name:var(--font-lora)] text-2xl font-bold text-[#2C1A0E] mb-6">
            {q.question}
          </h2>
          <div className="flex flex-col gap-3">
            {q.options.map((opt) => (
              <button
                key={opt.personality}
                onClick={() => handleAnswer(opt.personality)}
                className="flex items-center gap-3 bg-[#F5ECD7] border-2 border-[#C9956B] text-[#2C1A0E] rounded-xl px-4 py-3 text-left hover:bg-[#EDD9B8] hover:border-[#6B3A2A] transition-colors"
              >
                <span className="text-2xl">{opt.emoji}</span>
                <span className="text-base">{opt.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Result screen
  const resultId = getResult(answers);
  const result = personalities[resultId];
  return (
    <div className="min-h-screen bg-[#2C1A0E] flex items-center justify-center px-4">
      <div className="bg-[#F5ECD7] rounded-2xl shadow-xl max-w-lg w-full p-10 text-center">
        <p className="text-[#8B5E3C] text-sm font-semibold mb-2 tracking-wide uppercase">Your result</p>
        <h2 className="font-[family-name:var(--font-lora)] text-3xl font-bold text-[#2C1A0E] mb-2">
          You&apos;re a {result.name}!
        </h2>
        <p className="text-[#5C3D2E] text-xl mb-1">
          Your coffee: <span className="font-semibold">{result.coffee}</span>
        </p>
        <p className="text-[#8B5E3C] italic text-lg mb-8">&ldquo;{result.tagline}&rdquo;</p>
        <button
          onClick={retake}
          className="bg-[#6B3A2A] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#5a2f21] transition-colors"
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
}

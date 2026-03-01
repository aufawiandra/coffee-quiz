"use client";

import { useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";

type PersonalityId = "BA" | "SE" | "HN" | "AS" | "NO" | "SB";

const personalities: Record<PersonalityId, { name: string; coffee: string; tagline: string }> = {
  BA: { name: "Bold Adventurer", coffee: "Double Espresso", tagline: "You live for intensity" },
  SE: { name: "Sweet Enthusiast", coffee: "Caramel Latte", tagline: "Life's too short for bitter" },
  HN: { name: "Health Nut", coffee: "Oat Milk Americano", tagline: "Wellness in every sip" },
  AS: { name: "Artisan Snob", coffee: "Pour-Over, Single Origin", tagline: "You know what you like" },
  NO: { name: "Night Owl", coffee: "Cold Brew", tagline: "You run on dark and late" },
  SB: { name: "Social Butterfly", coffee: "Flat White", tagline: "Life's better shared" },
};

const questions = [
  {
    question: "It's Friday night. You're…",
    options: [
      { emoji: "🏋️", text: "Crushing a workout then meal prepping", personality: "HN" as PersonalityId },
      { emoji: "🎬", text: "Rewatching a comfort show with snacks", personality: "SE" as PersonalityId },
      { emoji: "🌍", text: "Out somewhere new — you hate staying in", personality: "BA" as PersonalityId },
      { emoji: "📖", text: "Deep in a book or documentary about something obscure", personality: "AS" as PersonalityId },
      { emoji: "🌙", text: "Still up at 2am doing who knows what", personality: "NO" as PersonalityId },
      { emoji: "🎉", text: "Out with a big group, the more the merrier", personality: "SB" as PersonalityId },
    ],
  },
  {
    question: "Pick a Netflix genre:",
    options: [
      { emoji: "💪", text: "True crime or nature documentaries", personality: "HN" as PersonalityId },
      { emoji: "🧁", text: "Romantic comedies or baking competitions", personality: "SE" as PersonalityId },
      { emoji: "🔥", text: "Action thrillers or survival shows", personality: "BA" as PersonalityId },
      { emoji: "🎭", text: "Indie films or foreign language dramas", personality: "AS" as PersonalityId },
      { emoji: "😴", text: "Whatever keeps you up until 4am", personality: "NO" as PersonalityId },
      { emoji: "🍿", text: "Something to watch with a crowd", personality: "SB" as PersonalityId },
    ],
  },
  {
    question: "Your ideal vacation looks like…",
    options: [
      { emoji: "🧘", text: "A wellness retreat — yoga, clean eating, early mornings", personality: "HN" as PersonalityId },
      { emoji: "🏡", text: "A cozy cottage with good food and zero agenda", personality: "SE" as PersonalityId },
      { emoji: "🏔️", text: "Backpacking with no plan and a one-way ticket", personality: "BA" as PersonalityId },
      { emoji: "🎨", text: "An artsy city with hidden cafés and galleries", personality: "AS" as PersonalityId },
      { emoji: "🌃", text: "A city that never sleeps — nightlife, late eats", personality: "NO" as PersonalityId },
      { emoji: "🗺️", text: "A group trip, the bigger the squad the better", personality: "SB" as PersonalityId },
    ],
  },
  {
    question: "Someone hands you an unmarked drink. You…",
    options: [
      { emoji: "🔍", text: "Ask what's in it — ingredients matter", personality: "HN" as PersonalityId },
      { emoji: "😋", text: "Take a sip — it smells sweet, you're in", personality: "SE" as PersonalityId },
      { emoji: "😏", text: "Drink it without asking — you live dangerously", personality: "BA" as PersonalityId },
      { emoji: "🤨", text: "Smell it first, then ask where it's sourced from", personality: "AS" as PersonalityId },
      { emoji: "🌚", text: "Drink it — you're wide awake anyway", personality: "NO" as PersonalityId },
      { emoji: "👯", text: "Pass it around and let everyone try it first", personality: "SB" as PersonalityId },
    ],
  },
  {
    question: "Your go-to morning is…",
    options: [
      { emoji: "🌅", text: "Up at 6am, run, smoothie, journaling", personality: "HN" as PersonalityId },
      { emoji: "🛌", text: "Slow start, cozy blanket, something sweet", personality: "SE" as PersonalityId },
      { emoji: "⚡", text: "Up early, straight into it — no warmup needed", personality: "BA" as PersonalityId },
      { emoji: "☕", text: "Deliberate ritual — grind the beans, pour slowly, savor it", personality: "AS" as PersonalityId },
      { emoji: "🛏️", text: "What morning? You're still asleep", personality: "NO" as PersonalityId },
      { emoji: "📱", text: "Check all your messages before getting up", personality: "SB" as PersonalityId },
    ],
  },
  {
    question: "Pick a color that speaks to you:",
    options: [
      { emoji: "🌿", text: "Forest green", personality: "HN" as PersonalityId },
      { emoji: "🌸", text: "Dusty rose", personality: "SE" as PersonalityId },
      { emoji: "🔴", text: "Deep red", personality: "BA" as PersonalityId },
      { emoji: "🤍", text: "Off-white / cream", personality: "AS" as PersonalityId },
      { emoji: "🖤", text: "Midnight black", personality: "NO" as PersonalityId },
      { emoji: "🧡", text: "Warm orange", personality: "SB" as PersonalityId },
    ],
  },
  {
    question: "How do you recharge after a long day?",
    options: [
      { emoji: "🧘", text: "Stretch, journal, early bed", personality: "HN" as PersonalityId },
      { emoji: "🍿", text: "Netflix and snacks on the couch", personality: "SE" as PersonalityId },
      { emoji: "🏍️", text: "Spontaneous drive or night out", personality: "BA" as PersonalityId },
      { emoji: "🎧", text: "Deep dive into an obscure hobby", personality: "AS" as PersonalityId },
      { emoji: "🌙", text: "Stay up late — your brain wakes up at night", personality: "NO" as PersonalityId },
      { emoji: "📲", text: "Call or hang out with friends", personality: "SB" as PersonalityId },
    ],
  },
  {
    question: "Pick a weekend morning vibe:",
    options: [
      { emoji: "🥗", text: "Farmer's market then meal prep", personality: "HN" as PersonalityId },
      { emoji: "🛌", text: "Sleep in, slow brunch, no plans", personality: "SE" as PersonalityId },
      { emoji: "🏄", text: "Up early for an adventure", personality: "BA" as PersonalityId },
      { emoji: "☕", text: "Coffee ritual, reading, intentional quiet", personality: "AS" as PersonalityId },
      { emoji: "😴", text: "Awake at noon, no regrets", personality: "NO" as PersonalityId },
      { emoji: "🥂", text: "Brunch with the whole crew", personality: "SB" as PersonalityId },
    ],
  },
];

function getResult(answers: PersonalityId[]): PersonalityId {
  const counts: Record<PersonalityId, number> = { BA: 0, SE: 0, HN: 0, AS: 0, NO: 0, SB: 0 };
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
  const [selectedAnswer, setSelectedAnswer] = useState<PersonalityId | null>(null);
  const resultCardRef = useRef<HTMLDivElement>(null);

  const shuffledQuestions = useMemo(() =>
    questions.map(q => ({
      ...q,
      options: [...q.options].sort(() => Math.random() - 0.5),
    }))
  , []);

  async function downloadResult() {
    if (!resultCardRef.current) return;
    const buttons = resultCardRef.current.querySelector<HTMLElement>(".no-snap");
    if (buttons) buttons.style.display = "none";
    const png = await toPng(resultCardRef.current, { cacheBust: true });
    if (buttons) buttons.style.display = "";
    const link = document.createElement("a");
    link.download = "my-coffee-personality.png";
    link.href = png;
    link.click();
  }

  function handleAnswer(personality: PersonalityId) {
    const newAnswers = [...answers, personality];
    setAnswers(newAnswers);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScreen("result");
    }
  }

  function handleBack() {
    setSelectedAnswer(null);
    if (currentQuestion === 0) {
      setScreen("intro");
    } else {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  }

  function retake() {
    setScreen("intro");
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer(null);
  }

  if (screen === "intro") {
    return (
      <div className="min-h-screen bg-[#2C1A0E] flex items-center justify-center px-4">
        <div className="bg-[#F5ECD7] rounded-2xl shadow-xl max-w-lg w-full p-10 text-center">
          <h1 className="font-[family-name:var(--font-lora)] text-3xl font-bold text-[#2C1A0E] mb-4">
            What&apos;s Your Coffee Personality?
          </h1>
          <p className="text-[#5C3D2E] text-lg mb-8">
            Answer 8 quick questions and we&apos;ll match you with your perfect brew.
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
    const q = shuffledQuestions[currentQuestion];
    const isFinal = currentQuestion === shuffledQuestions.length - 1;
    return (
      <div className="min-h-screen bg-[#2C1A0E] flex items-center justify-center px-4 py-8">
        <div className="bg-[#F5ECD7] rounded-2xl shadow-xl max-w-lg w-full p-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBack}
              className="text-[#8B5E3C] text-sm font-semibold hover:text-[#6B3A2A] transition-colors"
            >
              ← Back
            </button>
            <p className="text-[#8B5E3C] text-sm font-semibold tracking-wide">
              {currentQuestion + 1} of {shuffledQuestions.length}
            </p>
          </div>
          <h2 className="font-[family-name:var(--font-lora)] text-2xl font-bold text-[#2C1A0E] mb-6">
            {q.question}
          </h2>
          <div className="flex flex-col gap-3">
            {q.options.map((opt) => {
              const isSelected = selectedAnswer === opt.personality;
              return (
                <button
                  key={opt.personality}
                  onClick={() =>
                    isFinal ? setSelectedAnswer(opt.personality) : handleAnswer(opt.personality)
                  }
                  className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 text-left transition-colors text-[#2C1A0E] ${
                    isSelected
                      ? "bg-[#6B3A2A] border-[#6B3A2A] text-white"
                      : "bg-[#F5ECD7] border-[#C9956B] hover:bg-[#EDD9B8] hover:border-[#6B3A2A]"
                  }`}
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <span className="text-base">{opt.text}</span>
                </button>
              );
            })}
          </div>
          {isFinal && (
            <button
              onClick={() => selectedAnswer && handleAnswer(selectedAnswer)}
              disabled={!selectedAnswer}
              className="mt-6 w-full bg-[#6B3A2A] text-white py-3 rounded-full text-lg font-semibold hover:bg-[#5a2f21] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              See My Result →
            </button>
          )}
        </div>
      </div>
    );
  }

  // Result screen
  const resultId = getResult(answers);
  const result = personalities[resultId];
  return (
    <div className="min-h-screen bg-[#2C1A0E] flex items-center justify-center px-4">
      <div ref={resultCardRef} className="bg-[#F5ECD7] rounded-2xl shadow-xl max-w-lg w-full p-10 text-center">
        <p className="font-[family-name:var(--font-lora)] text-[#6B3A2A] text-lg font-semibold">What&apos;s Your Coffee Personality?</p>
        <hr className="border-[#C9956B] my-6" />
        <p className="text-[#8B5E3C] text-xs font-semibold tracking-widest uppercase mb-3">Your result</p>
        <h2 className="font-[family-name:var(--font-lora)] text-3xl font-bold text-[#2C1A0E] mb-4">
          You&apos;re a {result.name}!
        </h2>
        <p className="text-[#5C3D2E] text-xl mb-2">
          Your coffee: <span className="font-semibold">{result.coffee}</span>
        </p>
        <p className="text-[#8B5E3C] italic text-lg">&ldquo;{result.tagline}&rdquo;</p>
        <div className="no-snap flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <button
            onClick={retake}
            className="bg-[#6B3A2A] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#5a2f21] transition-colors"
          >
            Retake Quiz
          </button>
          <button
            onClick={downloadResult}
            className="border-2 border-[#6B3A2A] text-[#6B3A2A] px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#6B3A2A] hover:text-white transition-colors"
          >
            Save as PNG
          </button>
        </div>
      </div>
    </div>
  );
}

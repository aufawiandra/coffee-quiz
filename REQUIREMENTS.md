# Quiz Project Requirements

## Overview
A personality quiz that matches users to a coffee drink based on their lifestyle and preferences.

---

## Personality → Coffee Pairings

| Personality | Coffee | Tagline |
|-------------|--------|---------|
| Bold Adventurer | Double Espresso | "You live for intensity" |
| Sweet Enthusiast | Caramel Latte | "Life's too short for bitter" |
| Health Nut | Oat Milk Americano | "Wellness in every sip" |
| Artisan Snob | Pour-Over, Single Origin | "You know what you like" |

---

## Result Display Style

**Option A — Single recommendation:**
> "You're a [Personality]! Your coffee: [Drink]."

---

## Visual Style

- **Theme:** Warm & cozy with coffee tones
- **Background:** Deep espresso brown
- **Card:** Cream
- **Accents:** Rich brown
- **Headings font:** Lora (serif)
- **Body font:** Source Sans 3
- **UI:** Rounded cards, subtle shadows

---

## Images
None for now (can add later during iteration)

---

## Icons
Emoji icons next to each answer option ✓

---

## Quiz Questions

**6 questions total — mix of question styles**

Each answer maps to one of four personalities:
- **BA** = Bold Adventurer
- **SE** = Sweet Enthusiast
- **HN** = Health Nut
- **AS** = Artisan Snob

---

### Q1: It's Friday night. You're…
- 🏋️ Crushing a workout then meal prepping → **HN**
- 🎬 Rewatching a comfort show with snacks → **SE**
- 🌍 Out somewhere new - you hate staying in → **BA**
- 📖 Deep in a book or documentary about something obscure → **AS**

### Q2: Pick a Netflix genre:
- 💪 True crime or nature documentaries → **HN**
- 🧁 Romantic comedies or baking competitions → **SE**
- 🔥 Action thrillers or survival shows → **BA**
- 🎭 Indie films or foreign language dramas → **AS**

### Q3: Your ideal vacation looks like…
- 🧘 A wellness retreat - yoga, clean eating, early mornings → **HN**
- 🏡 A cozy cottage with good food and zero agenda → **SE**
- 🏔️ Backpacking with no plan and a one-way ticket → **BA**
- 🎨 An artsy city with hidden cafés and galleries → **AS**

### Q4: Someone hands you an unmarked drink. You…
- 🔍 Ask what's in it - ingredients matter → **HN**
- 😋 Take a sip - it smells sweet, you're in → **SE**
- 😏 Drink it without asking - you live dangerously → **BA**
- 🤨 Smell it first, then ask where it's sourced from → **AS**

### Q5: Your go-to morning is…
- 🌅 Up at 6am, run, smoothie, journaling → **HN**
- 🛌 Slow start, cozy blanket, something sweet → **SE**
- ⚡ Up early, straight into it - no warmup needed → **BA**
- ☕ Deliberate ritual - grind the beans, pour slowly, savor it → **AS**

### Q6: Pick a color that speaks to you:
- 🌿 Forest green → **HN**
- 🌸 Dusty rose → **SE**
- 🔴 Deep red → **BA**
- 🤍 Off-white / cream → **AS**

---

## Scoring Logic
Count the most frequent personality letter across all 6 answers. Display the matching coffee result. In the event of a tie, use the result from the earliest question with that personality.

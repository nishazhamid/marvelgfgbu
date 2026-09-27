// Centralized Event Data with clearly marked editable placeholders
// As required: No invented dates, prices, prize pools, or venue details.

export interface EventChapterData {
  id: string;
  chapterNumber: string;
  phaseTag: string;
  comicCallout: string;
  statusBadge: string;
  title: string;
  eventName: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  ctaText: string;
  spidermanSide: "left" | "right";
  spidermanVariant: "hanging" | "inverted" | "drop";
  bgImage: string;
  themeColor: string;
}

export const EVENT_CHAPTERS: EventChapterData[] = [
  {
    id: "chapter-1",
    chapterNumber: "CHAPTER 01",
    phaseTag: "PHASE 01",
    comicCallout: "DIMENSIONAL AWAKENING...",
    statusBadge: "REGISTRATION OPENING SOON",
    title: "THE AWAKENING",
    eventName: "EVENT TITLE [CODE HUNT / ALGORITHM SPRINT]",
    description:
      "EVENT DESCRIPTION: Student developers enter an immersive algorithmic challenge, deciphering multiversal comic logic, tackling optimized data structure trials, and establishing synchronized timeline nodes.",
    date: "DATE [TBA]",
    time: "TIME [TBA]",
    venue: "VENUE [BENNETT UNIVERSITY - AUDITORIUM / LAB]",
    ctaText: "RESERVE HUNT SLOT",
    spidermanSide: "right", // Chapter 1: Panel on LEFT, Spider-Man on RIGHT
    spidermanVariant: "hanging",
    bgImage: "/assets/comic-bg-1.png",
    themeColor: "#e23636",
  },
  {
    id: "chapter-2",
    chapterNumber: "CHAPTER 02",
    phaseTag: "PHASE 02",
    comicCallout: "MULTIVERSE EXPANSION...",
    statusBadge: "24-HOUR SPRINT [TBA]",
    title: "THE MULTIVERSE HACK",
    eventName: "EVENT TITLE [24-HOUR BUILDATHON]",
    description:
      "EVENT DESCRIPTION: An adrenaline-fueled collaborative marathon where teams construct next-generation web applications, interactive interfaces, and intelligent engineering prototypes under continuous mentor evaluation.",
    date: "DATE [TBA]",
    time: "TIME [24-HOUR CONTINUOUS HACK - TBA]",
    venue: "VENUE [BENNETT UNIVERSITY - TECH LABS]",
    ctaText: "ENROLL BUILD TEAM",
    spidermanSide: "left", // Chapter 2: Spider-Man on LEFT, Panel on RIGHT
    spidermanVariant: "inverted",
    bgImage: "/assets/comic-bg-2.png",
    themeColor: "#f5c518",
  },
  {
    id: "chapter-3",
    chapterNumber: "CHAPTER 03",
    phaseTag: "PHASE 03",
    comicCallout: "THE GRAND FINALE...",
    statusBadge: "PRIZE POOL [TBA]",
    title: "CLASH OF CODES",
    eventName: "EVENT TITLE [ENDGAME CODE ARENA & FINALS]",
    description:
      "EVENT DESCRIPTION: Top collegiate teams compete in the central arena with rapid live debugging showdowns, project presentations before guest evaluators, and the grand award ceremony.",
    date: "DATE [TBA]",
    time: "TIME [TBA]",
    venue: "VENUE [BENNETT UNIVERSITY - MAIN STAGE]",
    ctaText: "CLAIM FINALS PASS",
    spidermanSide: "right", // Chapter 3: Panel on LEFT, Spider-Man web drop on RIGHT
    spidermanVariant: "drop",
    bgImage: "/assets/comic-bg-3.png",
    themeColor: "#ff4d4d",
  },
];

// About Section placeholders
export const CHAPTER_STATS = [
  {
    label: "ACTIVE MEMBERS",
    value: "[MEMBER COUNT]",
    subtext: "Bennett University community",
  },
  {
    label: "SPRINT TRACKS",
    value: "[3 TIERS]",
    subtext: "Web, AI & Algorithmic",
  },
  {
    label: "COMMUNITY MENTORS",
    value: "[MENTOR POOL]",
    subtext: "Student & Alumni Leads",
  },
  {
    label: "MULTIVERSE HORIZONS",
    value: "∞",
    subtext: "Across infinite code paths",
  },
];

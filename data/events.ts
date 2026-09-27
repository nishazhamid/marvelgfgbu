// Centralized Event Data with clearly marked editable placeholders
// As required: No invented dates, prices, prize pools, or venue details.

export type ArtifactType = "spiderman" | "mjolnir" | "shield";

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
  visualSide: "left" | "right";
  artifactType: ArtifactType;
  spidermanSide?: "left" | "right";
  spidermanVariant?: "hanging" | "inverted" | "drop";
  bgImage: string;
  themeColor: string;
}

export const EVENT_CHAPTERS: EventChapterData[] = [
  {
    id: "chapter-1",
    chapterNumber: "CHAPTER 01",
    phaseTag: "PHASE 01",
    comicCallout: "MEANWHILE IN NYC DIMENSION...",
    statusBadge: "REGISTRATION OPENING SOON",
    title: "THE AWAKENING",
    eventName: "EVENT TITLE [MULTIVERSE CODE HUNT]",
    description:
      "EVENT DESCRIPTION: Student developers enter an algorithmic challenge navigating across dimensional comic grids. Decrypt anomalous matrix patterns, solve high-stakes data structure dilemmas, and activate node towers before time runs out.",
    date: "DATE [TBA]",
    time: "TIME [TBA]",
    venue: "VENUE [BENNETT UNIVERSITY - AUDITORIUM / LAB]",
    ctaText: "RESERVE HUNT SLOT",
    visualSide: "right", // Chapter 1: Info Card on LEFT, Spider-Man on RIGHT
    artifactType: "spiderman",
    spidermanSide: "right",
    spidermanVariant: "hanging",
    bgImage: "/assets/comic-bg-1.png",
    themeColor: "#e23636",
  },
  {
    id: "chapter-2",
    chapterNumber: "CHAPTER 02",
    phaseTag: "PHASE 02",
    comicCallout: "MULTIVERSE SPRINT",
    statusBadge: "24-HOUR SPRINT [TBA]",
    title: "THE SYMBIOTE HACK",
    eventName: "EVENT TITLE [WEB OF SHADOWS BUILDATHON]",
    description:
      "EVENT DESCRIPTION: 24-hour sprint crafting next-generation heroic web applications. Engineer scalable Web3 & AI integrations, build real-time interactive canvases, and channel Asgardian lightning to purge symbiote memory leaks under continuous judging rounds.",
    date: "DATE [TBA]",
    time: "TIME [24-HOUR CONTINUOUS HACK - TBA]",
    venue: "VENUE [BENNETT UNIVERSITY - TECH LABS]",
    ctaText: "ENROLL BUILD TEAM",
    visualSide: "left", // Chapter 2: Thor's Mjolnir on LEFT, Info Card on RIGHT
    artifactType: "mjolnir",
    spidermanSide: "left",
    spidermanVariant: "inverted",
    bgImage: "/assets/comic-bg-2.png",
    themeColor: "#38bdf8",
  },
  {
    id: "chapter-3",
    chapterNumber: "CHAPTER 03",
    phaseTag: "PHASE 03",
    comicCallout: "GRAND FINALE ARENA",
    statusBadge: "PRIZE POOL [TBA]",
    title: "CLASH OF CODES",
    eventName: "EVENT TITLE [ENDGAME CODE ARENA]",
    description:
      "EVENT DESCRIPTION: Final competitive face-off between top collegiate engineers. Live 1v1 speed debugging in the central arena, lightning pitch rounds before industry venture leads, and grand prize coronation ceremony.",
    date: "DATE [TBA]",
    time: "TIME [TBA]",
    venue: "VENUE [BENNETT UNIVERSITY - MAIN STAGE]",
    ctaText: "CLAIM FINALS SPECTATOR PASS",
    visualSide: "right", // Chapter 3: Info Card on LEFT, Vibranium Shield on RIGHT
    artifactType: "shield",
    spidermanSide: "right",
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

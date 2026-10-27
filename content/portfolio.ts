export type FlowStep = { node: string; detail?: string; via?: string };

export type Project = {
  slug: string;
  name: string;
  kind: string;
  tagline: string;
  summary?: string;
  metric?: { value: string; label: string };
  points: string[];
  flow?: FlowStep[];
  stack: string[];
  demo?: string;
  demoLabel?: string; // text for the demo link, defaults to "live"
  links?: { label: string; href: string }[];
  runs?: string; // where it runs when it isn't a hosted web app
  source?: string; // omitted for private repos

  note?: string;
};

export const profile = {
  name: "Ojas Sharma",
  handle: "TheNobady",
  role: "Backend Engineer",
  meta: "CS @ SRM IST · class of '28",
  headline: "I build backends that stay correct under load.",
  intro:
    "Java and Spring Boot engineer who likes the hard part under the hood: state that stays consistent across clients, data that's modelled right, and systems that keep working when the edge cases show up.",
  about: [
    "I'm a third-year Computer Science student at SRM IST. Most of what I build is Java and Spring Boot on PostgreSQL, and most of it is about the parts users never see.",
    "That has meant real-time playback sync over WebSockets, identity resolution across noisy camera data with PostGIS and pgvector, and offline graph routing on a phone. I build past the tutorial on purpose, because the edge cases are where I learn the most.",
    "As a founding engineer at BroPay, I shipped BroCred and am building our core Spring Boot backend. As Tech Lead for ISTE and Rangeen Pixels, I ship software that runs real events and mentor the developers who come after me.",
  ],
  philosophy: ["Make it work.", "Know why it works.", "Make it better."],
  email: "sojas4459@gmail.com",
  github: "https://github.com/TheNobady",
  linkedin: "https://www.linkedin.com/in/ojas-sharma-2048a8315/",
  resume: "/OjasResume.pdf",
  openTo: "backend roles & internships",
};

export const metrics = [
  { value: "12+", label: "projects shipped, from web to on-chain" },
  { value: "5", label: "platforms shipped to: web · chrome · android · solana · terminal" },
  { value: "2×", label: "tech lead across campus communities" },
  { value: "3rd", label: "of 35+ teams at Ideathon 3.0" },
];

export const core = ["Java", "Spring Boot", "PostgreSQL", "REST & WebSockets", "Docker"];

export const stack = {
  languages: ["Java", "Kotlin", "SQL", "TypeScript", "Rust", "C/C++"],
  backend: ["Spring Boot", "Spring Security", "JWT", "REST", "WebSockets / STOMP"],
  data: ["PostgreSQL", "PostGIS", "pgvector", "MySQL", "SQLite", "Flyway"],
  infra: ["Docker", "Linux", "Git", "Vercel", "Render", "Maven"],
  also: ["Android", "GraphHopper", "Solana / Anchor", "Next.js", "React"],
};

export const focus = [
  "Going deeper on Spring internals",
  "System design and distributed-systems fundamentals",
  "DSA and SQL practice, every day",
  "Designing the database for our next product",
];

export const featured: Project[] = [
  {
    slug: "brocred",
    name: "BroCred",
    kind: "browser extension",
    tagline: "Tells you which credit card to pay with, right at checkout.",
    summary:
      "A Chrome extension that recognises the site you're on, works out what each card in your wallet would earn there, and points to the best one among the cards saved at checkout.",
    metric: { value: "277", label: "merchant domains mapped to reward categories" },
    points: [
      "Ranks your cards by effective return per merchant category, honouring EMI, UPI and international payments",
      "Detects real checkout pages and overlays the tip in a shadow root, matching the card among your saved cards",
      "Card catalogue syncs daily from our card-data API; banking sites are skipped entirely",
      "Prediction audit log that measures recommendations against the rewards actually earned",
    ],
    flow: [
      { node: "Site you're on", detail: "domain · page signals · amount" },
      { via: "categorize", node: "Merchant + category", detail: "277 mapped domains" },
      { via: "rank", node: "Rewards engine", detail: "your cards × category rules" },
      { via: "render", node: "Badge + checkout tip", detail: "best card · % back" },
    ],
    stack: ["JavaScript", "Chrome MV3", "Service Worker", "Shadow DOM", "chrome.storage"],
    demo: "https://chromewebstore.google.com/detail/brocred-%E2%80%94-best-card-to-pa/mchkebgkmmfkpomlpenlffggcdbghacd",
    demoLabel: "chrome web store",
    links: [{ label: "website", href: "https://brocred-website.vercel.app" }],
    note: "shipped",
  },
  {
    slug: "tubesync",
    name: "TubeSync",
    kind: "real-time systems",
    tagline: "Watch YouTube together, in perfect sync.",
    summary:
      "A watch-party service where the server, not the clients, owns playback state. Every play, pause and seek goes through Spring over STOMP and fans out to the room. Clients correct their own drift.",
    metric: { value: "4 roles", label: "host, mod, participant, viewer, all checked server-side" },
    points: [
      "Server-authoritative playback with client-side drift correction",
      "Role-based permissions enforced on the server, not trusted from the UI",
      "Reconnect handling and automatic host handover when a host drops",
      "Persistent chat and room state in PostgreSQL",
    ],
    flow: [
      { node: "Next.js client", detail: "player · chat" },
      { via: "STOMP / WebSocket", node: "Spring Boot room service", detail: "state · roles · handover" },
      { via: "JDBC", node: "PostgreSQL", detail: "rooms · chat history" },
    ],
    stack: ["Java 17", "Spring Boot 3.5", "STOMP", "WebSockets", "PostgreSQL", "Next.js", "Docker"],
    demo: "https://tube-sync-gamma.vercel.app/",
    source: "https://github.com/TheNobady/TubeSync",
  },
  {
    slug: "anpr",
    name: "ANPR City Engine",
    kind: "backend · geospatial",
    tagline: "Turning plate sightings into road-aware journeys.",
    summary:
      "A backend that links Automatic Number Plate Recognition observations into vehicle trajectories and alerts, including when the plate itself can't be read.",
    metric: { value: "803/803", label: "null-plate links recovered with 30% of plates unreadable (simulated)" },
    points: [
      "Identity resolution that fuses plate similarity, road travel time and visual embeddings",
      "Ingestion decoupled from asynchronous identity processing",
      "Camera-health analytics, inferred road hops and suspicious-activity alerts",
      "Simulator for OCR errors, missing plates and cloned vehicles",
    ],
    flow: [
      { node: "Camera observations", detail: "plate · time · location" },
      { via: "ingest", node: "Spring Boot API", detail: "Flyway-managed schema" },
      { via: "async", node: "Identity resolver", detail: "plate · OSRM travel time · embeddings" },
      { via: "SQL", node: "PostGIS + pgvector", detail: "geometry · vectors · journeys" },
    ],
    stack: ["Java 21", "Spring Boot 3.3", "PostgreSQL 16", "PostGIS", "pgvector", "Flyway", "OSRM", "Docker"],
    runs: "runs via docker compose",
    source: "https://github.com/TheNobady/ANPR-Backend",
    note: "simulated benchmark",
  },
  {
    slug: "pavo",
    name: "Pavo",
    kind: "full-stack · edtech",
    tagline: "College and career discovery for students.",
    summary:
      "Helps students across India discover colleges, courses, scholarships and career paths. Built for a college hackathon on a Spring Boot API designed to outlive its first data layer.",
    metric: { value: "4 tiers", label: "Controller → Manager → DAO → DataStore, ready to swap in a real database" },
    points: [
      "Layered Spring Boot REST API with controllers, business logic, data access and entities kept apart",
      "Data access behind a DAO, so a real database can replace the in-memory store without touching business logic",
      "Next.js frontend with real-time search, multi-filter and sort over backend data",
      "Multi-stage Docker build (Maven + slim JRE) deployed on Render; frontend on Vercel",
    ],
    flow: [
      { node: "Next.js client", detail: "search · filter · sort" },
      { via: "REST", node: "Controller", detail: "Spring Boot API" },
      { via: "calls", node: "Manager", detail: "business logic" },
      { via: "DAO", node: "DataStore", detail: "in-memory · swappable" },
    ],
    stack: ["Java 17", "Spring Boot 3.2", "Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Docker", "Render"],
    demo: "https://pavo-flaunt-your-academic-feathers.vercel.app/",
    source: "https://github.com/TheNobady/Pavo-Flaunt-Your-Academic-Feathers",
    note: "in-memory data",
  },
];

export const more: Project[] = [
  {
    slug: "atlasforge",
    name: "AtlasForge",
    kind: "android · algorithms",
    tagline: "Turn-by-turn navigation with no internet at all.",
    summary:
      "Offline navigation for Android. It parses OpenStreetMap data stored on the device into an in-memory road graph and routes across it locally.",
    metric: { value: "< 1s", label: "routing on city-scale maps, fully on-device" },
    points: [
      "Builds an in-memory road graph from local .osm.pbf files and routes with zero network dependency",
      "Sub-second routing on city-scale maps; turn instructions derived from bearing deltas",
    ],
    flow: [
      { node: ".osm.pbf on device", detail: "OpenStreetMap extract" },
      { via: "parse", node: "GraphHopper road graph", detail: "in-memory" },
      { via: "route", node: "Turn-by-turn engine", detail: "bearing deltas → instructions" },
    ],
    stack: ["Kotlin", "Android", "GraphHopper", "OpenStreetMap", "osmdroid", "Play Services"],
    runs: "runs on android",
    source: "https://github.com/TheNobady/AtlasForge",
  },
  {
    slug: "kashi-sites",
    name: "Product sites",
    kind: "web design",
    tagline: "Designed and built the sites for BroCred, BroSubs and BroPay.",
    points: [
      "Landing, privacy and terms pages for three BroPay products",
      "Responsive layouts with a mobile-first overhaul for BroSubs",
    ],
    stack: ["Next.js", "HTML/CSS", "Vercel"],
    links: [
      { label: "brocred", href: "https://brocred-website.vercel.app" },
      { label: "brosubs", href: "https://brosubs.vercel.app" },
    ],
  },
  {
    slug: "blockharvest",
    name: "BlockHarvest",
    kind: "smart contracts",
    tagline: "Crop insurance as an on-chain program.",
    points: [
      "4-instruction Anchor program: register, pay premium, file claim, approve claim",
      "PDA accounts for farmer and vault; admin-gated approval releases SOL atomically",
    ],
    stack: ["Rust", "Anchor", "Solana", "Next.js", "Supabase"],
    demo: "https://block-harvest-qk3j.vercel.app/",
    source: "https://github.com/TheNobady/blockHarvest",
    note: "devnet",
  },
  {
    slug: "akshara",
    name: "Akshara",
    kind: "systems",
    tagline: "A terminal text editor, from raw mode up.",
    points: [
      "Raw terminal mode through JNA on Unix and Kernel32 console APIs on Windows",
      "Cursor movement, editing, scrolling, search and save, all hand-rolled",
    ],
    stack: ["Java 21", "JNA", "Native APIs"],
    runs: "runs in your terminal",
    source: "https://github.com/TheNobady/Akshara",
  },
];

export const experience = [
  {
    org: "BroPay",
    role: "Founding Engineer",
    tags: ["product", "backend", "databases"],
    lines: [
      "Shipped BroCred, a card-recommendation Chrome extension, to the Chrome Web Store.",
      "Building BroPay's Spring Boot backend: Gmail OAuth, statement ingestion and a layered Postgres schema.",
      "Designed and built the websites for BroCred, BroSubs and BroPay.",
      "Designing the database for our next product.",
    ],
  },
  {
    org: "ISTE, SRM IST",
    role: "Tech Lead",
    tags: ["leadership", "web", "automation"],
    lines: [
      "Built the Techescape Room platform (auth, interactive challenges, live leaderboard) used by 300+ participants.",
      "Shipped OTP-based validation and a custom QR system for event entry and attendance.",
      "Automated registrations and scheduled participant comms with Google Apps Script over Forms and Sheets.",
      "Own the Contentful-powered CMS and website, delegate work and mentor junior developers.",
    ],
  },
  {
    org: "Rangeen Pixels, SRM IST",
    role: "Tech Lead",
    tags: ["coordination", "events"],
    lines: [
      "Lead the club's technical side: building the website from scratch and running forms, tooling and internal operations.",
      "Turn event requirements into implementation decisions and deliver them on event timelines.",
    ],
  },
];

export const earlier = [
  { org: "Genesis SRMIST", what: "Web3 club: website improvements and CMS bug fixes" },
  { org: "AEGIS", what: "Cybersecurity club: website development" },
];

export const wins = [
  { what: "Ideathon 3.0", result: "3rd place", detail: "out of 35+ teams" },
  { what: "Adobe University Hackathon", result: "Round 1 cleared", detail: "amongst top ~8%" },
  { what: "Smart India Hackathon", result: "Qualified", detail: "college selection round" },
  { what: "Hyperthon 2.0", result: "Top 5", detail: "honourable mention" },
];

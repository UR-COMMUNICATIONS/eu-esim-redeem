import fs from "fs";

const MARIN = {
  heroTitle: "Connectivity Built for Life at Sea",
  heroSubtitle:
    "Affordable, high-speed connectivity for seafarers, ship crews, and overseas workers, anywhere your journey takes you.",
  // Intentionally non-existent (or can be swapped later). The UI will fall back to the shared placeholder image.
  heroImage: "marine-captain.webp",

  maritimeSection: {
    heading: "Smarter Internet for Maritime Life",
    subheading:
      "No roaming shocks. No SIM swapping. Just seamless connectivity.",
    items: [
      {
        title: "Instant Digital Activation",
        description:
          "Activate your connection digitally in minutes. No paperwork. No waiting.",
        image: "",
      },
      {
        title: "One Network, Everywhere",
        description:
          "Use the same connection across ships, ports, and countries without swapping SIMs.",
        image: "",
      },
      {
        title: "Optimized for Life at Sea",
        description:
          "Designed for maritime conditions, delivering stable performance even on long routes.",
        image: "",
      },
    ],
  },

  smarterInternet: {
    heading: "Want a personalized data Customized for you?",
    description:
      "Let us navigate your internet needs on the high seas. We can keep your crew connected and business afloat with our solutions. Therefore, no matter where the vessel roams, you can enjoy broadband without borders.",
    bullets: [
      "Single or Multiple Countries",
      "Fast deployment",
      "Customized solution to keep your team globally connected",
    ],
    enquireCta: "Enquire Today",
  },
};

const FILES = [
  "public/assets/langs/en/translation.json",
  "public/assets/langs/id/translation.json",
  "public/assets/langs/es/translation.json",
  "public/assets/langs/fr/translation.json",
  "public/assets/langs/gm/translation.json",
  "public/assets/langs/jp/translation.json",
  "public/assets/langs/ko/translation.json",
  "public/assets/langs/ms/translation.json",
  "public/assets/langs/ph/translation.json",
  "public/assets/langs/th/translation.json",
  "public/assets/langs/vi/translation.json",
  "public/assets/langs/zhcn/translation.json",
  "public/assets/langs/zhhk/translation.json",
  "public/assets/langs/countries/my/en/translation.json",
  "public/assets/langs/countries/my/ms/translation.json",
  "public/assets/langs/countries/hk/en/translation.json",
  "public/assets/langs/countries/hk/zhhk/translation.json",
  "public/assets/langs/countries/jp/en/translation.json",
  "public/assets/langs/countries/jp/jp/translation.json",
  "public/assets/langs/countries/id/en/translation.json",
  "public/assets/langs/countries/id/id/translation.json",
];

for (const relPath of FILES) {
  const path = new URL(relPath, `file://${process.cwd()}/`).pathname;

  if (!fs.existsSync(path)) {
    console.warn(`[marin] Missing file: ${relPath}`);
    continue;
  }

  const raw = fs.readFileSync(path, "utf8");
  const json = JSON.parse(raw);

  json.marin = {
    ...(json.marin || {}),
    ...MARIN,
    maritimeSection: {
      ...(json.marin?.maritimeSection || {}),
      ...(MARIN.maritimeSection || {}),
    },
    smarterInternet: {
      ...(json.marin?.smarterInternet || {}),
      ...(MARIN.smarterInternet || {}),
    },
  };

  fs.writeFileSync(path, JSON.stringify(json, null, 2) + "\n", "utf8");
  console.log(`[marin] Updated: ${relPath}`);
}


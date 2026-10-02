// Official Products Catalog - PAGANI DESIGN, BENYAR & NAVIFORCE
const PRODUCTS_DATA = [
  {
    id: "pagani-classic-dive",
    brand: "PAGANI DESIGN",
    brandTagline: "Timeless Style Since 2008",
    name: "Pagani Design Classic Dive Style 100M Automatic",
    headline: "Classic Dive Style • Men's Automatic Watch",
    tagline: "More Than Just a Watch • Built for Adventure | Designed for You",
    category: "dive",
    collection: "Automatic Dive",
    price: 24999.00,
    originalPrice: 34999.00,
    rating: 4.95,
    reviewsCount: 842,
    badge: "BESTSELLER • AUTOMATIC",
    featured: true,
    poster: "assets/pagani_dive_poster.jpg",
    mainImage: "assets/pagani_dive_poster.jpg",
    secondaryImage: "assets/pagani_dive_macro.jpg",
    lumeImage: "assets/lume_night_glow.jpg",
    description: "The Pagani Design Classic Dive Style is engineered for maritime adventure and executive distinction. Featuring an authentic Japanese Seiko NH35A automatic self-winding caliber that never needs a battery. Encased in solid 316L stainless steel with a scratch-proof synthetic sapphire crystal, ceramic 120-click unidirectional dive bezel, and a 100M water-resistant screw-down crown.",
    specs: {
      movement: "Japanese Seiko NH35A Automatic (No Battery Needed)",
      caseMaterial: "316L Solid Stainless Steel with Mirror & Satin Finish",
      caseDiameter: "40 mm",
      caseThickness: "13 mm",
      lugToLug: "47.5 mm",
      waterResistance: "100M / 10 BAR (Swim • Shower • Scuba Safe)",
      glass: "Synthetic Sapphire Crystal (Anti-Reflective, Scratch Resistant)",
      bezel: "120-Click Sintered Ceramic Rotating Bezel",
      powerReserve: "41 Hours Self-Winding Kinetic Power",
      strap: "Solid 316L Stainless Steel Oyster Bracelet (20mm)",
      lume: "Super-LumiNova BGW9 Vivid Luminous Glow",
      features: ["Screw-Down Crown", "Date Display with Magnifier", "Exhibition Transparent Back", "Hacking Seconds"]
    },
    keyHighlights: [
      { icon: "fa-cog", title: "Automatic Movement", desc: "Kinetic self-winding rotor. No battery required ever." },
      { icon: "fa-water", title: "100M Water Resistant", desc: "Swim • Shower • More. Hermetically sealed screw-down crown." },
      { icon: "fa-shield-halved", title: "Durable Stainless Steel", desc: "Marine-grade 316L steel built to last a lifetime." },
      { icon: "fa-gem", title: "Sapphire Crystal", desc: "9 Mohs hardness scratch-resistant synthetic sapphire lens." },
      { icon: "fa-calendar-days", title: "Date Display", desc: "Instant date window with cyclops magnifier lens." }
    ],
    featureTiles: [
      { img: "assets/pagani_dive_macro.jpg", title: "Elegant Dial", subtitle: "Bold Markers | Clear Display" },
      { img: "assets/pagani_dive_macro.jpg", title: "Screw-Down Crown", subtitle: "Secure | Reliable | Waterproof" },
      { img: "assets/pagani_dive_macro.jpg", title: "Stainless Steel Strap", subtitle: "Comfort | Strong | Stylish" },
      { img: "assets/craftsmanship_atelier.jpg", title: "Premium Movement", subtitle: "Precision | Smooth | Durable" }
    ],
    occasions: [
      { icon: "fa-mountain-sun", title: "Outdoor Adventures" },
      { icon: "fa-briefcase", title: "Business Meetings" },
      { icon: "fa-champagne-glasses", title: "Social Events" },
      { icon: "fa-gift", title: "Perfect Gift Idea" }
    ],
    stockCount: 18,
    sku: "PD-1661-BKGD"
  },
  {
    id: "benyar-lifestyle-chrono",
    brand: "BENYAR",
    brandTagline: "Time Elevates You",
    name: "Benyar Classic Bold Timeless Chronograph",
    headline: "Premium Chronograph Watch • It's a Lifestyle",
    tagline: "More Than A Watch, It's A Lifestyle • Built for Men Who Make It Happen",
    category: "chronograph",
    collection: "Luxury Chronograph",
    price: 16999.00,
    originalPrice: 24999.00,
    rating: 4.9,
    reviewsCount: 624,
    badge: "TOP TREND • CHRONO",
    featured: true,
    poster: "assets/benyar_lifestyle_poster.jpg",
    mainImage: "assets/benyar_lifestyle_poster.jpg",
    secondaryImage: "assets/benyar_blue_macro.jpg",
    lumeImage: "assets/lume_night_glow.jpg",
    description: "The Benyar Master Chronograph is designed for the modern gentleman who demands athletic precision and boardroom elegance. Features a sunburst royal blue dial with rose gold polished casing, three active chronograph sub-dials (1/10s, 60s, 60min), 400-unit tachymeter scale, and a premium ergonomic blue silicone and leather sport strap.",
    specs: {
      movement: "High-Precision Japanese Quartz Chronograph Movement",
      caseMaterial: "Rose Gold PVD Alloy & Stainless Steel Back",
      caseDiameter: "43 mm",
      caseThickness: "15 mm",
      lugToLug: "50 mm",
      waterResistance: "30M / 3 ATM (Rain & Splash Proof)",
      glass: "Hardened Anti-Scratch Mineral Crystal",
      bezel: "Fixed Tachymeter Speed Scale (400 Units)",
      powerReserve: "3-Year Long Life Battery (Sony SR920SW)",
      strap: "Royal Blue High-Grade Silicone & Leather Strap (22mm)",
      lume: "Phosphorescent Luminous Hands & Hour Markers",
      features: ["Chronograph Split-Second Timing", "Durable Tang Buckle", "Date Window at 4:30", "Tactile Pushers"]
    },
    keyHighlights: [
      { icon: "fa-stopwatch", title: "Chronograph Function", desc: "Sub-second precision split timing with tactile start/reset pushers." },
      { icon: "fa-bolt", title: "Quartz Movement", desc: "High-precision Japanese quartz caliber accurate to ±10s/month." },
      { icon: "fa-shield-halved", title: "Durable Buckle", desc: "Reinforced rose gold engraved stainless steel buckle." },
      { icon: "fa-droplet", title: "3ATM Waterproof", desc: "Daily sealed gasket for rain, hand-washing, and humidity." }
    ],
    featureTiles: [
      { img: "assets/benyar_blue_macro.jpg", title: "Sunburst Blue Dial", subtitle: "Multi-Subdial Chronograph" },
      { img: "assets/benyar_lifestyle_poster.jpg", title: "Rose Gold Bezel", subtitle: "Polished Luxury Accent" },
      { img: "assets/benyar_blue_macro.jpg", title: "Silicone Leather Strap", subtitle: "Breathable & Ergonomic" },
      { img: "assets/benyar_lifestyle_poster.jpg", title: "Tachymeter Scale", subtitle: "Speed & Distance Timing" }
    ],
    occasions: [
      { icon: "fa-briefcase", title: "Executive Work" },
      { icon: "fa-heart", title: "Dates & Romance" },
      { icon: "fa-calendar-day", title: "Everyday Luxury" }
    ],
    stockCount: 26,
    sku: "BY-5140-BLRG"
  },
  {
    id: "naviforce-tactical-military",
    brand: "NAVIFORCE",
    brandTagline: "For a Better Tomorrow",
    name: "Naviforce Tactical Commander Dual-Time Sport Watch",
    headline: "Men's Sport Watch • Built for Real Men",
    tagline: "More Than Just a Watch • Style / Durability / Performance • Adventure Awaits",
    category: "military",
    collection: "Military Sport",
    price: 12999.00,
    originalPrice: 18999.00,
    rating: 4.88,
    reviewsCount: 712,
    badge: "MILITARY TACTICAL",
    featured: true,
    poster: "assets/naviforce_military_poster.jpg",
    mainImage: "assets/naviforce_military_poster.jpg",
    secondaryImage: "assets/naviforce_green_macro.jpg",
    lumeImage: "assets/lume_night_glow.jpg",
    description: "Engineered for rugged terrain and tactical endurance. The Naviforce Tactical Sport Watch combines a military olive green dial with gold-accented armored casing. Equipped with dual analog and digital back-lit LCD displays, multi-function alarms, stopwatch, day-date calendar, luminous hands, and genuine green suede leather strap.",
    specs: {
      movement: "Dual-Display Analog & Digital Japanese Caliber",
      caseMaterial: "High-Density Zinc Alloy Armor with 18K Gold Plating",
      caseDiameter: "46 mm",
      caseThickness: "16 mm",
      lugToLug: "52 mm",
      waterResistance: "30M / 3 ATM (Shock & Dust Resistant)",
      glass: "Hardened Anti-Impact Mineral Crystal",
      bezel: "Tactical Compass Markings Outer Bezel",
      powerReserve: "2-Year Dual Japanese Battery System",
      strap: "Genuine Olive Green Tactical Suede Leather (24mm)",
      lume: "High-Intensity Phosphor Luminous Hands + Backlit LCD",
      features: ["Multi-Function LCD Display", "Shock-Resistant Skeleton Body", "Stylish Gold Details", "Dual-Time Zones"]
    },
    keyHighlights: [
      { icon: "fa-droplet", title: "3ATM Waterproof", desc: "Sealed against rain, splashing, and outdoor moisture." },
      { icon: "fa-shield", title: "Shock Resistant", desc: "Reinforced chassis dampens heavy impacts and drops." },
      { icon: "fa-clock", title: "Multi-Function Display", desc: "Digital alarm, stopwatch, hourly chime & calendar." },
      { icon: "fa-sun", title: "Luminous Hands", desc: "High-intensity night glow for tactical vision." }
    ],
    featureTiles: [
      { img: "assets/naviforce_green_macro.jpg", title: "Multi-Function Display", subtitle: "Dual Analog & Digital LCD" },
      { img: "assets/naviforce_military_poster.jpg", title: "Premium Leather Strap", subtitle: "Tactical Green Suede" },
      { img: "assets/naviforce_green_macro.jpg", title: "Stylish Gold Details", subtitle: "Armored Casing & Pushers" },
      { img: "assets/lume_night_glow.jpg", title: "Luminous Hands", subtitle: "Night Tactical Visibility" }
    ],
    occasions: [
      { icon: "fa-compass", title: "Tactical Missions" },
      { icon: "fa-person-hiking", title: "Outdoor Survival" },
      { icon: "fa-dumbbell", title: "Sports & Fitness" },
      { icon: "fa-motorcycle", title: "Adventure Riding" }
    ],
    stockCount: 30,
    sku: "NF-9189-GRGD"
  }
];

// Currencies support
const CURRENCIES = {
  PKR: { symbol: "₨ ", rate: 1.0, name: "PKR (₨)" },
  USD: { symbol: "$", rate: 0.0036, name: "USD ($)" },
  EUR: { symbol: "€", rate: 0.0033, name: "EUR (€)" },
  GBP: { symbol: "£", rate: 0.0028, name: "GBP (£)" },
  AED: { symbol: "AED ", rate: 0.0132, name: "AED (د.إ)" },
  JPY: { symbol: "¥", rate: 0.55, name: "JPY (¥)" }
};

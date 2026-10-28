/**
 * Single source of truth for all portfolio content.
 * Edit this file to update text, projects, skills and links across the whole site.
 */

export const siteConfig = {
  name: "Jaya Arora",
  shortName: "Jaya",
  title: "Full-Stack Developer & Freelancer",
  location: "Amritsar, Punjab, India",
  timezone: "Asia/Kolkata",
  email: "jaya.arora.tech@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  description:
    "Jaya Arora is a full-stack developer and freelancer from Amritsar, India, building fast, scalable websites, SaaS platforms, ecommerce stores and Android & iOS apps with Next.js, NestJS, React Native and PostgreSQL.",
  keywords: [
    "Jaya Arora",
    "Full-Stack Developer",
    "Freelance Developer",
    "Next.js Developer",
    "React Developer",
    "NestJS",
    "React Native Developer",
    "WordPress Developer",
    "PHP Plugin Development",
    "Ecommerce Development",
    "Web Developer Amritsar",
    "Freelance Web Developer India",
  ],
  socials: {
    github: "https://github.com/jaya0011",
    linkedin: "https://www.linkedin.com/in/jaya-arora-81b96a376/",
    instagram: "https://www.instagram.com/jayaonloop",
  },
} as const;

/** Anchors on every browse page (`/browse/[profile]`). */
export type SectionId = "projects" | "skills" | "about" | "services" | "process" | "contact";

export const navLinks: { id: SectionId; label: string }[] = [
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Hire Me" },
];

export type ProfileId = "recruiter" | "client" | "developer" | "explorer";

export type RowId = "picks" | "top" | "continue" | "web" | "commerce" | "mobile-ai" | "skills" | "about" | "services" | "process";

export type Profile = {
  id: ProfileId;
  name: string;
  color: string;
  face: "smile" | "wink" | "shades" | "grin";
  /** Billboard copy at the top of this profile's browse page. */
  description: string;
  /** Section shortcuts in the "Today's Top Picks" row. */
  picks: SectionId[];
  /** Order of the rows below the billboard — every profile shows every row, just curated differently. */
  rows: RowId[];
};

export const profiles: Profile[] = [
  {
    id: "recruiter",
    name: "Recruiter",
    color: "#2f6fed",
    face: "smile",
    description:
      "Full-stack developer who owns the whole lifecycle — requirements, UI, APIs, databases and deployment. 9+ products shipped across web, iOS and Android, now pursuing an MSc in Computer Science.",
    picks: ["about", "skills", "projects", "services", "contact"],
    rows: ["picks", "top", "about", "skills", "continue", "web", "commerce", "mobile-ai", "services", "process"],
  },
  {
    id: "client",
    name: "Client",
    color: "#e50914",
    face: "grin",
    description:
      "I design, build and ship production-grade web platforms, ecommerce stores and Android & iOS apps — from the first wireframe to the final deploy. Clean architecture, fast interfaces, and backends that scale with your business.",
    picks: ["services", "projects", "process", "about", "contact"],
    rows: ["picks", "services", "top", "commerce", "web", "process", "mobile-ai", "continue", "about", "skills"],
  },
  {
    id: "developer",
    name: "Developer",
    color: "#2ea043",
    face: "shades",
    description:
      "Next.js · NestJS · PostgreSQL · Drizzle · React Native. Multi-tenant, role-aware, type-safe systems — and code the next developer will thank me for.",
    picks: ["skills", "projects", "about", "process", "contact"],
    rows: ["picks", "skills", "web", "continue", "top", "mobile-ai", "commerce", "about", "process", "services"],
  },
  {
    id: "explorer",
    name: "Explorer",
    color: "#e5b80b",
    face: "wink",
    description:
      "Welcome in! I'm Jaya — I build websites, online stores and mobile apps from Amritsar, India. Grab some popcorn and browse around.",
    picks: ["projects", "about", "services", "skills", "contact"],
    rows: ["picks", "continue", "top", "mobile-ai", "web", "commerce", "about", "services", "skills", "process"],
  },
];

export const faqs = [
  {
    q: "What can you build for me?",
    a: "Full-stack web apps and SaaS platforms, Android & iOS apps, ecommerce stores, WordPress websites with custom PHP plugins, APIs and databases — plus maintenance and new features for products you already have.",
  },
  {
    q: "Which tech stack do you use?",
    a: "Mostly Next.js, React and TypeScript on the frontend; NestJS, Node.js and PHP on the backend; PostgreSQL with Drizzle ORM for data; React Native & Expo for mobile; and WordPress for content-driven sites. I pick what fits your project.",
  },
  {
    q: "How does a project with you work?",
    a: "Four steps — Discover, Design, Build, and Launch & Support. You get regular previews while I build, and I stay on for maintenance and new features after launch.",
  },
  {
    q: "Do you handle both frontend and backend?",
    a: "Yes. I own the full lifecycle: requirements, UI, APIs, databases, integrations and deployment — all under one roof.",
  },
  {
    q: "Where are you based?",
    a: "Amritsar, Punjab, India — and I work remotely with clients.",
  },
  {
    q: "How quickly will you reply?",
    a: "Usually within 24–48 hours. Use the form below, or email me directly.",
  },
];

export const about = {
  heading: "Engineer by craft, problem-solver by nature.",
  paragraphs: [
    "I'm Jaya — a full-stack developer and freelancer based in Amritsar, Punjab. I hold a Bachelor of Computer Applications and I'm currently pursuing an MSc in Computer Science at Guru Nanak Dev University.",
    "As a freelancer, I partner with businesses, startups and founders to ship real products: a headless jewellery store with 3D product views, a multi-role HR platform with 20+ modules, a therapy booking system, an education SaaS and cross-platform mobile apps. I own the full lifecycle — requirements, UI, APIs, databases, integrations and deployment.",
    "I care about software that is reliable, fast and genuinely easy to use — and about writing code the next developer will thank me for.",
  ],
  strengths: [
    "Full-stack architecture",
    "Problem-solving & debugging",
    "Responsive, accessible UI",
    "APIs & databases",
    "Custom business solutions",
    "Requirements → features",
    "Independent delivery",
    "Always learning",
  ],
};

export type SkillGroup = {
  title: string;
  icon: "frontend" | "backend" | "database" | "mobile" | "cms" | "tooling";
  blurb: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: "frontend",
    blurb: "Pixel-perfect, responsive interfaces with modern React.",
    items: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion", "Three.js", "HTML5 & CSS3"],
  },
  {
    title: "Backend",
    icon: "backend",
    blurb: "Robust APIs and server logic that stay maintainable.",
    items: ["Node.js", "NestJS", "PHP", "REST APIs", "Auth & RBAC", "Nodemailer"],
  },
  {
    title: "Database",
    icon: "database",
    blurb: "Well-modelled data with type-safe access.",
    items: ["PostgreSQL", "Drizzle ORM", "Schema design", "Data integration"],
  },
  {
    title: "Mobile",
    icon: "mobile",
    blurb: "One codebase, native-feeling apps on iOS & Android.",
    items: ["React Native", "Expo", "Android", "iOS"],
  },
  {
    title: "CMS & Ecommerce",
    icon: "cms",
    blurb: "Content-driven sites and stores that convert.",
    items: ["WordPress", "Headless WordPress", "Custom PHP plugins", "Cart & checkout", "Order management"],
  },
  {
    title: "Integrations & Tooling",
    icon: "tooling",
    blurb: "The glue that turns a site into a product.",
    items: ["Payment gateways", "Third-party APIs", "Email & notifications", "PDF generation", "Git & GitHub", "Vite"],
  },
];

export type Service = {
  title: string;
  icon: "web" | "mobile" | "ecommerce" | "wordpress" | "api" | "maintenance";
  description: string;
  points: string[];
};

export const services: Service[] = [
  {
    title: "Full-Stack Web Apps",
    icon: "web",
    description: "Custom web applications, dashboards and SaaS platforms built end-to-end with a modern, type-safe stack.",
    points: ["Next.js + NestJS / Node", "Role-based access", "Admin dashboards"],
  },
  {
    title: "Android & iOS Apps",
    icon: "mobile",
    description: "Cross-platform mobile apps with React Native & Expo that share logic and APIs with your web product.",
    points: ["React Native + Expo", "Shared backend APIs", "Store-ready builds"],
  },
  {
    title: "Ecommerce Development",
    icon: "ecommerce",
    description: "High-converting online stores with product discovery, cart, checkout, payments, shipping and order tracking.",
    points: ["Headless storefronts", "Payment gateways", "Shipping integrations"],
  },
  {
    title: "WordPress & Custom PHP Plugins",
    icon: "wordpress",
    description: "Business websites on WordPress, extended with custom PHP plugins built precisely for your workflow.",
    points: ["Custom plugins", "Headless WordPress", "Easy content editing"],
  },
  {
    title: "API & Database Engineering",
    icon: "api",
    description: "Clean REST APIs, third-party integrations and well-designed PostgreSQL schemas that scale with you.",
    points: ["REST API design", "PostgreSQL + Drizzle", "Auth, email & PDFs"],
  },
  {
    title: "Maintenance & Growth",
    icon: "maintenance",
    description: "Ongoing improvements, new features, performance tuning and bug fixes for websites and apps you already have.",
    points: ["Feature upgrades", "Performance fixes", "Reliable support"],
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    description:
      "We talk goals, users and constraints. I translate your idea into clear requirements, scope and a realistic plan.",
  },
  {
    step: "02",
    title: "Design",
    description: "Information architecture, data models and UI flows — so every screen and endpoint has a reason to exist.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Iterative development with regular previews. Frontend, backend, database and integrations — all under one roof.",
  },
  {
    step: "04",
    title: "Launch & Support",
    description: "Testing, deployment and handover — followed by maintenance and new features as your product grows.",
  },
];

export const journey = [
  {
    period: "Present",
    title: "Freelance Full-Stack Developer",
    org: "Self-employed · Remote",
    description:
      "Building websites, web apps, ecommerce platforms and Android/iOS apps for businesses — from WordPress sites and custom PHP plugins to multi-tenant SaaS on Next.js, NestJS and PostgreSQL.",
    type: "work" as const,
  },
  {
    period: "Pursuing",
    title: "MSc in Computer Science",
    org: "Guru Nanak Dev University (GNDU)",
    description: "Deepening my foundations in computer science while applying them to real-world client projects.",
    type: "education" as const,
  },
  {
    period: "Completed",
    title: "Bachelor of Computer Applications (BCA)",
    org: "Undergraduate degree",
    description: "Built a strong base in programming, databases, web technologies and software engineering.",
    type: "education" as const,
  },
];

export type ProjectFilter = "web-app" | "ecommerce" | "wordpress" | "mobile" | "ai";

export type PreviewVariant =
  "ecommerce" | "dashboard" | "booking" | "education" | "tryon" | "storefront" | "network" | "clinic" | "film";

export type Project = {
  slug: string;
  title: string;
  type: string;
  tagline: string;
  overview: string;
  url?: string;
  status: "Live" | "In development" | "Private build";
  featured: boolean;
  filters: ProjectFilter[];
  features: string[];
  stack: string[];
  highlights?: { value: string; label: string }[];
  /** Your contribution. Leave undefined to hide the "My role" block on the case-study page. */
  role?: string;
  note?: string;
  accent: { from: string; to: string };
  preview: PreviewVariant;
};

export const projectFilters: { id: "all" | ProjectFilter; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "web-app", label: "Web apps & SaaS" },
  { id: "ecommerce", label: "Ecommerce" },
  { id: "mobile", label: "Mobile" },
  { id: "wordpress", label: "WordPress" },
  { id: "ai", label: "AI" },
];

export const projects: Project[] = [
  {
    slug: "dhawada-jewellery",
    title: "Dhawada Jewellery",
    type: "Headless Jewellery Ecommerce",
    tagline: "A luxury jewellery store with 3D product views, gemstone filters and global DHL shipping.",
    overview:
      "Dhawada is a premium online jewellery store. I paired a fast Next.js 15 + React 19 storefront with a WordPress backend, and wrote a custom PHP plugin for project-specific business logic. Shoppers can explore products in 3D, filter by gemstone, switch language and currency, and check out with integrated payments and DHL Express shipping.",
    url: "https://dhawada.com/",
    status: "Live",
    featured: true,
    filters: ["ecommerce", "web-app", "wordpress"],
    features: [
      "Product categories, search & gemstone filters",
      "Product pages with image zoom & 3D viewer",
      "Cart, wishlist, coupons & promotions",
      "Checkout with payment integration",
      "Customer accounts, saved addresses & order history",
      "DHL Express shipping & live tracking",
      "Transactional email notifications",
      "Quote requests & call booking",
      "Language & currency switching",
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
      "WordPress",
      "PHP",
      "Nodemailer",
      "DHL Express API",
    ],
    highlights: [
      { value: "3D", label: "Product viewer" },
      { value: "Headless", label: "WordPress + Next.js" },
      { value: "Global", label: "DHL shipping & multi-currency" },
    ],
    role: "Built the headless Next.js storefront, connected it to the WordPress backend and developed a custom PHP plugin for project-specific features, payments, emails and DHL shipping.",
    accent: { from: "#f5c16c", to: "#c0841a" },
    preview: "ecommerce",
  },
  {
    slug: "global-hrbook",
    title: "Global HRBook",
    type: "HR Management SaaS (Web + Mobile)",
    tagline: "A multi-role HRMS with 20+ modules — attendance, leave, payroll and expenses on web and mobile.",
    overview:
      "Global HRBook helps organisations run everyday HR operations from one place. It ships 20+ HR modules behind a NestJS API with PostgreSQL and Drizzle ORM, a Next.js admin dashboard, and an Expo React Native app for employees on the go — with role-based access and subscription-plan gating throughout.",
    url: "https://app.globalhrbook.com/",
    status: "Live",
    featured: true,
    filters: ["web-app", "mobile"],
    features: [
      "20+ HR modules in one platform",
      "Employee management & profiles",
      "Attendance tracking",
      "Leave & holiday management",
      "Payroll workflows",
      "Expense management",
      "Roles: company admin, HR, manager, employee",
      "Admin dashboards & backend APIs",
      "Subscription-plan-based access control",
      "Companion mobile app",
    ],
    stack: ["NestJS", "Next.js", "Expo", "React Native", "Drizzle ORM", "PostgreSQL", "TypeScript"],
    highlights: [
      { value: "20+", label: "HR modules" },
      { value: "4", label: "Access roles" },
      { value: "Web + App", label: "Shared API" },
    ],
    role: "Full-stack development across the NestJS API, PostgreSQL schema with Drizzle ORM, the Next.js admin dashboard and the Expo React Native mobile app.",
    accent: { from: "#60a5fa", to: "#6366f1" },
    preview: "dashboard",
  },
  {
    slug: "mendingminds",
    title: "MendingMinds",
    type: "Therapy & Mental Wellness Platform",
    tagline: "Connecting clients and therapists with bookings, therapy plans, check-ins and PDF reports.",
    overview:
      "MendingMinds brings clients, therapists and administrators into one calm, secure digital space. Clients book sessions and check in; therapists manage availability, notes and personalised therapy plans that export to PDF; admins manage pricing across sessions and packages.",
    url: "https://mendingmind.in/",
    status: "Live",
    featured: true,
    filters: ["web-app"],
    features: [
      "Appointment booking",
      "Therapist availability & leave management",
      "Client check-ins & session notes",
      "Individual & couple therapy plans",
      "Therapy plan PDF generation",
      "Session & package-based pricing",
      "Client & therapist management",
      "Authentication & payment services",
      "Email and file uploads",
    ],
    stack: ["Node.js", "JavaScript", "Vite", "Tailwind CSS", "jsPDF", "Payment & messaging integrations"],
    highlights: [
      { value: "3", label: "User roles" },
      { value: "PDF", label: "Therapy plans" },
      { value: "Flexible", label: "Session & package pricing" },
    ],
    role: "Full-stack development of booking, therapist and client workflows, PDF therapy plans, authentication and payment-related backend services.",
    accent: { from: "#34d399", to: "#0d9488" },
    preview: "booking",
  },
  {
    slug: "first-rank",
    title: "First Rank",
    type: "Education & School Management SaaS",
    tagline: "A multi-tenant edtech platform for schools, teachers and parents — with AI on the roadmap.",
    overview:
      "First Rank is a multi-tenant school management platform with role-aware workspaces for teachers and parents, school discovery, and academic workflows for lesson plans, question papers and homework. Subscription billing is built in, and AI-assisted features powered by OCR and retrieval-augmented generation (RAG) are part of the product roadmap.",
    url: "https://firstrank.zlaark.com/",
    status: "In development",
    featured: true,
    filters: ["web-app", "ai"],
    features: [
      "School management",
      "Multi-tenant architecture",
      "Role-aware teacher & parent workspaces",
      "School discovery",
      "Subscription & billing workflows",
      "Lesson plans, question papers & homework",
      "AI-assisted education tools (roadmap)",
      "OCR & RAG pipelines (roadmap)",
    ],
    stack: ["TypeScript", "React", "Next.js", "AI / OCR / RAG (planned)"],
    highlights: [
      { value: "Multi", label: "Tenant SaaS" },
      { value: "2", label: "Role workspaces" },
      { value: "AI", label: "On the roadmap" },
    ],
    note: "Some AI, OCR/RAG and mobile billing features are in active development and part of the planned scope.",
    role: "Building the multi-tenant platform, role-aware workspaces and academic workflows in TypeScript and Next.js.",
    accent: { from: "#f472b6", to: "#a855f7" },
    preview: "education",
  },
  {
    slug: "brobuzz",
    title: "BroBuzz",
    type: "AI Hairstyle & Beard Try-On App",
    tagline: "Preview new hairstyles and beard styles on yourself before the barber ever picks up the clippers.",
    overview:
      "BroBuzz is an AI-powered grooming app that lets users explore hairstyles and beard styles virtually. The focus is a friendly, fast preview experience that makes trying a new look feel effortless.",
    status: "Private build",
    featured: false,
    filters: ["ai", "web-app"],
    features: [
      "Virtual hairstyle exploration",
      "Beard-style try-on",
      "Friendly appearance-preview interface",
      "Digital grooming discovery",
    ],
    stack: ["Next.js", "AI image processing"],
    role: "Designed and developed the try-on experience and user interface in Next.js.",
    accent: { from: "#fb923c", to: "#ef4444" },
    preview: "tryon",
  },
  {
    slug: "gessure",
    title: "Gessure",
    type: "Professional Networking Platform",
    tagline: "A career-focused network for professional profiles and meaningful connections.",
    overview:
      "Gessure is a professional networking platform centred on careers, professional profiles and engagement between people who want to grow together.",
    url: "https://app.gessure.in/@",
    status: "Live",
    featured: false,
    filters: ["web-app"],
    features: ["Professional profiles", "Networking-oriented experiences", "Career connections & engagement"],
    stack: ["Web application"],
    accent: { from: "#38bdf8", to: "#2563eb" },
    preview: "network",
  },
  {
    slug: "mr-veg",
    title: "Mr.Veg",
    type: "Food Brand & Franchise Website",
    tagline: "A WordPress site for a spice brand and its smart vending-machine franchise.",
    overview:
      "Mr.Veg presents a range of food products and spices alongside a smart vending-machine franchise offering. Built on WordPress so the team can manage products and franchise content on their own.",
    url: "https://mrveg.in/",
    status: "Live",
    featured: false,
    filters: ["wordpress"],
    features: [
      "Product-focused pages",
      "Spice & food product information",
      "Product category presentation",
      "Smart vending-machine showcase",
      "Franchise information",
      "Easy WordPress content management",
    ],
    stack: ["WordPress"],
    role: "WordPress website development — product, category and franchise pages that the client can manage themselves.",
    accent: { from: "#a3e635", to: "#16a34a" },
    preview: "storefront",
  },
  {
    slug: "dentist-pitampura",
    title: "Dentist Pitampura",
    type: "Dental Clinic Website",
    tagline: "A trustworthy clinic website that turns visitors into booked appointments.",
    overview:
      "A WordPress website for a dental clinic in Pitampura, Delhi. It introduces the dentists, explains treatments in plain language, shares patient testimonials and dental-health articles, and makes it easy for visitors to request an appointment.",
    url: "https://dentistpitampura.com/",
    status: "Live",
    featured: false,
    filters: ["wordpress"],
    features: [
      "Treatment & service pages",
      "Doctor profiles",
      "Appointment enquiry form",
      "Patient testimonials",
      "Dental health articles",
      "Clinic contact & location details",
    ],
    stack: ["WordPress"],
    role: "Website development using WordPress, including the presentation of clinic services, doctor information and patient-facing content.",
    accent: { from: "#5eead4", to: "#0891b2" },
    preview: "clinic",
  },
  {
    slug: "electric-marshmallow",
    title: "Electric Marshmallow",
    type: "Film Production Studio Website",
    tagline: "A cinematic home for an independent film studio, its productions and its values.",
    overview:
      "Electric Marshmallow Productions is an independent film production studio. The website showcases the studio's creative portfolio, founders, mission and values, inclusivity commitments, news, press and production announcements.",
    url: "https://electricmarshmallow.com/",
    status: "Live",
    featured: false,
    filters: ["web-app"],
    features: [
      "Film & production portfolio",
      "Company profile & founders",
      "Mission & values",
      "Inclusivity information",
      "News, press & announcements",
      "Contact & enquiries",
    ],
    stack: ["Responsive web"],
    accent: { from: "#e879f9", to: "#7c3aed" },
    preview: "film",
  },
];

export const contactProjectTypes = [
  "Web application / SaaS",
  "Mobile app (Android / iOS)",
  "Ecommerce store",
  "WordPress website / plugin",
  "API / backend work",
  "Maintenance & improvements",
  "Something else",
] as const;

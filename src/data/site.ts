import type { StaticImageData } from "next/image";
import sonaPunjab from "../../public/projects/sona-punjab.png";
import propertyHub from "../../public/projects/propertyhub.png";
import codeVault from "../../public/projects/codevault.png";
import tinyCouture from "../../public/projects/tinycouture.png";
import chatApp from "../../public/projects/chat-app.webp";
import techify from "../../public/projects/techify.webp";
import windowsAndDoors from "../../public/projects/windows-and-doors.webp";
import realEstate from "../../public/projects/realestate.webp";

/**
 * All content of the site lives in this file.
 * To change text, links, projects or skills, edit here; no component needs to change.
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://umair-portfolio-cyan-phi.vercel.app";

export const profile = {
  name: "Umair Tahir",
  role: "Full Stack Developer",
  stackLine: "MERN · Next.js · TypeScript",
  location: "Lahore, Pakistan",
  timezone: "PKT (UTC+5)",
  email: "umairii2207@gmail.com",
  phone: "+92 314 4549954",
  phoneHref: "tel:+923144549954",
  whatsapp: "923144549954",
  resume: "/Umair-Tahir-Resume.pdf",
  availability: "Open to full-time roles and freelance projects",
  headline: "Full stack developer who builds role-based web platforms, end to end.",
  intro:
    "I'm Umair, a MERN and Next.js developer in Lahore with 1+ year of professional experience. I design MongoDB schemas, build secure REST APIs with JWT authentication, and ship responsive React front ends for products where every role gets its own dashboard.",
  about: [
    "I trained in the MERN stack at PNY Trainings and have spent a little over a year in software houses, working on role-based web applications. Most of that work followed one pattern: one login, several dashboards, and a backend that has to decide who is allowed to see and change what.",
    "That is the kind of problem I enjoy. I like owning a feature from the database schema and the API to the screen the user touches, and I care about the unglamorous parts: validation, access checks, loading and error states.",
    "I also use AI in my daily work, both inside products through the OpenAI API and as a coding assistant. I read and test what it writes, because the code I commit is my responsibility.",
  ],
} as const;

export const socials = {
  github: "https://github.com/Mern-Umair",
  linkedin: "https://www.linkedin.com/in/umair-tahir-136743283",
  whatsapp: `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
    "Hi Umair, I saw your portfolio and would like to talk.",
  )}`,
  email: `mailto:${profile.email}`,
} as const;

export const navItems = [
  { id: "work", label: "Work" },
  { id: "access", label: "Access demo" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export const quickFacts = [
  { label: "Role", value: "Full Stack Developer" },
  { label: "Experience", value: "1+ year, 2 companies" },
  { label: "Core stack", value: "React, Next.js, Node.js, MongoDB" },
  { label: "Based in", value: "Lahore, PK · UTC+5" },
  { label: "Open to", value: "On-site, hybrid, remote" },
] as const;

export const strengths = [
  {
    icon: "layers",
    title: "End-to-end ownership",
    body: "Schema, API, UI and deployment. I take a feature from the first model to the last loading state, so nothing falls between frontend and backend.",
  },
  {
    icon: "shield",
    title: "Access control done properly",
    body: "JWT authentication, role-based authorization and ownership checks on the server, with route guards on the client. Hiding a button is not security.",
  },
  {
    icon: "dashboard",
    title: "Multi-dashboard products",
    body: "Platforms where an admin, a manager and a customer each see a different app, built on one codebase and one API.",
  },
  {
    icon: "bot",
    title: "AI where it helps",
    body: "OpenAI API integrations and AI coding tools in the workflow, with the key on the server and every generated line reviewed and tested.",
  },
] as const;

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  kind: "fullstack" | "frontend";
  year: string;
  summary: string;
  roles?: string[];
  highlights: string[];
  stack: string[];
  /** The parts of the project, shown as a numbered list (and as the cover when there is no screenshot). */
  structure: { layer: string; detail: string }[];
  image?: StaticImageData;
  imageAlt?: string;
  links: { label: string; href: string; live?: boolean }[];
};

export const projects: Project[] = [
  {
    slug: "sona-punjab",
    name: "Sona Punjab",
    tagline: "Tournament platform for pigeon racing clubs",
    kind: "fullstack",
    year: "2026",
    summary:
      "Three apps in one repository: an admin panel for running tournaments, a public site that shows clubs and results, and the REST API behind both.",
    roles: ["Admin", "Sub-admin"],
    highlights: [
      "Admin dashboard with totals for tournaments, pigeon owners and users, plus the most recent tournaments.",
      "Tournament creation and day-by-day result entry, with clubs and pigeon owners managed from the same panel.",
      "A public site where anyone can follow a tournament: lofts, pigeons landed and remaining, and results per day.",
      "Sub-admin accounts, so an admin can hand out limited access instead of sharing one login.",
      "Banner and headline management for the public site, with image uploads stored on AWS S3.",
      "API documented with Swagger, so every endpoint can be tried from the browser.",
    ],
    stack: [
      "React.js",
      "Redux Toolkit",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "AWS S3",
      "Swagger",
    ],
    structure: [
      { layer: "Admin panel", detail: "React, Redux Toolkit, Tailwind CSS" },
      { layer: "Public site", detail: "React, Redux Toolkit, Swiper" },
      { layer: "API", detail: "Express, JWT auth, Multer + S3 uploads, Swagger docs" },
      { layer: "Data", detail: "MongoDB: tournaments, clubs, pigeon owners, users" },
    ],
    image: sonaPunjab,
    imageAlt: "Sona Punjab admin dashboard showing tournament, pigeon owner and user totals",
    links: [
      { label: "Live site", href: "https://sona-punjab-dhunni.onrender.com", live: true },
      { label: "Admin panel", href: "https://sona-punjab-admin.onrender.com", live: true },
      { label: "Source code", href: "https://github.com/Mern-Umair/sona-punjab" },
    ],
  },
  {
    slug: "propertyhub",
    name: "PropertyHub",
    tagline: "Rental platform with an AI assistant",
    kind: "fullstack",
    year: "2026",
    summary:
      "A rental platform where tenants browse listings and book a home, with a scroll-driven 3D front end and an AI service that sits next to the main API.",
    highlights: [
      "Next.js and TypeScript front end with a scroll-driven, room-by-room experience built with Three.js and GSAP.",
      "Listings, bookings, payments and reviews, each with its own model, controller and route in the Node API.",
      "Forms built with React Hook Form and validated with Zod, on shadcn/ui components.",
      "A separate Python service (Flask and PyTorch) for the AI assistant, called from the Node backend.",
      "JWT authentication with hashed passwords.",
      "Built on my own, from the database models to the 3D front end.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Three.js",
      "GSAP",
      "Node.js",
      "Express.js",
      "Sequelize",
      "MySQL",
      "Python",
      "Flask",
    ],
    structure: [
      { layer: "Client", detail: "Next.js App Router, TypeScript, Redux Toolkit, Zustand" },
      { layer: "API", detail: "Express: users, properties, bookings, payments, reviews" },
      { layer: "AI service", detail: "Python, Flask, PyTorch" },
      { layer: "Data", detail: "MySQL through Sequelize" },
    ],
    image: propertyHub,
    imageAlt: "PropertyHub landing page with the headline Find Your Dream Home",
    links: [
      { label: "Live site", href: "https://rental-hub-2tta.onrender.com", live: true },
      { label: "Source code", href: "https://github.com/Mern-Umair/rental-hub-api" },
    ],
  },
  {
    slug: "codevault",
    name: "CodeVault",
    tagline: "Community platform for sharing code assets",
    kind: "fullstack",
    year: "2026",
    summary:
      "A platform where developers publish and organise reusable code assets, review each other's work, post in a community feed and enter contests.",
    highlights: [
      "Sign up and sign in with JWT authentication kept in cookies.",
      "Assets organised by category, with reviews from other users.",
      "Community posts with comments.",
      "Contests with entries, and subscription plans tied to user accounts.",
      "React front end with Redux Toolkit and Axios, talking to an Express API.",
    ],
    stack: ["React.js", "Redux Toolkit", "Axios", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT"],
    structure: [
      { layer: "Client", detail: "React, Redux Toolkit, Axios" },
      { layer: "API", detail: "Express: assets, categories, reviews, community, contests" },
      { layer: "Data", detail: "MongoDB with eleven Mongoose models" },
    ],
    image: codeVault,
    imageAlt: "CodeVault sign-in screen",
    links: [
      { label: "Live app", href: "https://codevault-frontend.onrender.com", live: true },
      { label: "Frontend code", href: "https://github.com/Mern-Umair/CodeVault-frontend" },
      { label: "Backend code", href: "https://github.com/Mern-Umair/CodeVault-backend" },
    ],
  },
  {
    slug: "chat-app",
    name: "Chat App",
    tagline: "Real-time one-to-one messaging",
    kind: "fullstack",
    year: "2026",
    summary:
      "A messaging app where two users talk in real time over WebSockets, with accounts, profiles and a persistent message history.",
    highlights: [
      "Real-time messaging with Socket.io on both the server and the client.",
      "Sign up and login with JWT stored in cookies and passwords hashed with bcrypt.",
      "Profile page with image upload to Cloudinary.",
      "Client state managed with Redux Toolkit; UI built with Tailwind CSS and daisyUI.",
    ],
    stack: [
      "React.js",
      "Redux Toolkit",
      "Socket.io",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Cloudinary",
    ],
    structure: [
      { layer: "Client", detail: "React, Redux Toolkit, socket.io-client" },
      { layer: "API", detail: "Express REST routes for auth and messages" },
      { layer: "Real-time", detail: "Socket.io server for live delivery" },
      { layer: "Data", detail: "MongoDB: users and messages" },
    ],
    image: chatApp,
    imageAlt: "Chat App sign-in screen",
    links: [
      { label: "Live app", href: "https://chat-app-ii5b.onrender.com", live: true },
      { label: "Source code", href: "https://github.com/Mern-Umair/Chat-App" },
    ],
  },
  {
    slug: "tinycouture",
    name: "TinyCouture",
    tagline: "Storefront for a kids' clothing brand",
    kind: "frontend",
    year: "2026",
    summary:
      "A responsive storefront with a hero carousel, collections, new arrivals with sale prices, and separate pages for the girls' and boys' ranges.",
    highlights: [
      "Home page with a full-width carousel, shop-by-collection tiles and a new arrivals grid.",
      "Product cards with sale and regular prices and a quick-add action.",
      "Girls and Boys category pages on client-side routes.",
      "Video sections and sliders built with Swiper.",
    ],
    stack: ["React.js", "React Router", "Tailwind CSS", "Swiper"],
    structure: [
      { layer: "Pages", detail: "Home, Girls, Boys" },
      { layer: "Components", detail: "Carousel, banners, product cards, video players" },
      { layer: "Styling", detail: "Tailwind CSS, responsive from mobile up" },
    ],
    image: tinyCouture,
    imageAlt: "TinyCouture home page with the navigation bar and a collection banner",
    links: [
      { label: "Live site", href: "https://tinycouture.onrender.com", live: true },
      { label: "Source code", href: "https://github.com/Mern-Umair/TinyCouture" },
    ],
  },
  {
    slug: "techify",
    name: "Techify",
    tagline: "Website for an IT services company",
    kind: "frontend",
    year: "2026",
    summary:
      "A multi-page company website: services, industries, a portfolio with a case study, team and values pages, testimonials and an enquiry form.",
    highlights: [
      "Home page with hero, services, industries, stats, testimonials and FAQ sections.",
      "About section split into company, team, values and vision.",
      "Portfolio page with a detailed case study page.",
      "Contact page with an enquiry form, and scroll animations with AOS.",
    ],
    stack: ["React.js", "React Router", "Tailwind CSS", "AOS"],
    structure: [
      { layer: "Pages", detail: "Home, About, Services, Portfolio, Case study, Contact" },
      { layer: "Components", detail: "Hero, services, industries, stats, testimonials, FAQ" },
      { layer: "Styling", detail: "Tailwind CSS with AOS scroll animations" },
    ],
    image: techify,
    imageAlt: "Techify home page with the headline Crafting Digital Excellence",
    links: [
      { label: "Live site", href: "https://techify-xr2e.onrender.com", live: true },
      { label: "Source code", href: "https://github.com/Mern-Umair/Techify" },
    ],
  },
  {
    slug: "windows-and-doors",
    name: "Windows & Doors",
    tagline: "Website for a window and door installation service",
    kind: "frontend",
    year: "2026",
    summary:
      "A service website with a booking call to action, galleries for windows and doors, and pages for services, the company and contact.",
    highlights: [
      "Hero with booking and contact calls to action.",
      "Separate galleries for windows and for doors.",
      "Services, About and Contact pages on client-side routes.",
      "Scroll animations with AOS on a responsive Tailwind layout.",
    ],
    stack: ["React.js", "React Router", "Tailwind CSS", "AOS"],
    structure: [
      { layer: "Pages", detail: "Home, Services, About, Contact" },
      { layer: "Components", detail: "Hero, windows gallery, doors gallery, system section" },
      { layer: "Styling", detail: "Tailwind CSS with AOS scroll animations" },
    ],
    image: windowsAndDoors,
    imageAlt: "Windows and Doors home page with booking and contact buttons",
    links: [
      { label: "Live site", href: "https://windows-nfr3.onrender.com", live: true },
      { label: "Source code", href: "https://github.com/Mern-Umair/Windows" },
    ],
  },
  {
    slug: "realestate",
    name: "RealEstate",
    tagline: "Landing page for a property business",
    kind: "frontend",
    year: "2026",
    summary:
      "A single-page site with an announcement bar, hero, animated stats, location cards, a booking section, articles and an FAQ.",
    highlights: [
      "Animated counters that start when the stats scroll into view.",
      "Location and article cards in Swiper carousels.",
      "Booking section and FAQ accordion.",
      "Entrance animations with Framer Motion and AOS.",
    ],
    stack: ["React.js", "Tailwind CSS", "Framer Motion", "Swiper", "AOS"],
    structure: [
      { layer: "Sections", detail: "Hero, stats, locations, booking, articles, FAQ" },
      { layer: "Motion", detail: "Framer Motion, AOS, count-up on scroll" },
      { layer: "Styling", detail: "Tailwind CSS, responsive from mobile up" },
    ],
    image: realEstate,
    imageAlt: "RealEstate property cards with location and price",
    links: [
      { label: "Live site", href: "https://realestate-92rw.onrender.com", live: true },
      { label: "Source code", href: "https://github.com/Mern-Umair/RealEstate" },
    ],
  },
];

export const experience = [
  {
    company: "IT Extension",
    title: "MERN Stack Developer",
    period: "Sep 2025 – Jul 2026",
    points: [
      "Worked as a full stack developer on role-based, multi-dashboard web applications built on the MERN stack.",
      "Designed MongoDB schemas and built secure RESTful APIs with Node.js and Express.js.",
      "Implemented JWT-based authentication and authorization for the different user roles.",
      "Built responsive React.js front ends for each dashboard.",
      "Worked closely with the product and design teams to get features ready for production.",
    ],
  },
  {
    company: "7 Sky Solutions",
    title: "MERN Stack Developer",
    period: "Jan 2025 – Mar 2025",
    points: [
      "Built and maintained full stack features across the MERN stack as part of the development team.",
      "Built responsive React.js interfaces and the Node.js/Express.js backend services behind them.",
      "Managed MongoDB data models and secured API endpoints with authentication and authorization.",
      "Worked with teammates to refine the UI/UX and improve application performance.",
    ],
  },
] as const;

export const education = [
  {
    title: "Bachelor of Science in Computer Science (BSCS)",
    place: "Superior University",
    detail: "CGPA 3.2",
  },
  {
    title: "Full Stack Web Development (MERN Stack) Certification",
    place: "PNY Trainings, Arfa Tower, Lahore",
    detail: "Professional training",
  },
] as const;

export const skillGroups = [
  {
    label: "Frontend",
    items: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "Redux Toolkit", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "RESTful APIs", "JWT authentication", "Role-based access control", "Socket.io"],
  },
  {
    label: "Data",
    items: ["MongoDB", "Mongoose", "Schema design", "MySQL", "Sequelize"],
  },
  {
    label: "AI and tooling",
    items: ["OpenAI API", "AI chatbots", "Git", "GitHub", "Swagger", "AWS S3", "Cloudinary"],
  },
] as const;

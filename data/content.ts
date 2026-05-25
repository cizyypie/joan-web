export const heroContent = {
  headline: "HI, JOAN HERE!",
  subheadline: "FULLSTACK WEB DEV LEARNER.",
  buttons: [
    { label: "View Projects", href: "#builds" },
    { label: "Contact Me", href: "#contact" },
  ],
  photo: {
    src: "/images/frontside.png",
    alt: "Joanita profile photo",
    label: "WEB DEVELOPER",
    sub: "Learning by building.",
  },
};

// ABOUT SECTION
export const aboutContent = {
  label: "ABOUT",
  headline: "GET TO KNOW ME",
  paragraphs: [
    "I started with backend development, learning how APIs, databases, authentication, and server-side logic work behind the screen.",
    "Now I’m expanding toward frontend development by building real interfaces and understanding how structure, data, and user experience come together on the screen.",
  ],
  badges: ["Backend Foundation", "Frontend Growth", "Fullstack Direction"],
  photo: {
    src: "/images/leftside.png",
    alt: "Joanita profile photo",
    label: "ABOUT",
    caption: "Web Developer Learner",
  },
};

// SKILLS ECTION
export const skillSplitContent = {
  headline: "TECH STACK.",
  photo: {
    src: "/images/rightside.png",
    alt: "Joanita right side profile photo",
    label: "RIGHT SIDE",
    caption: "Still building.",
    sub: "Moving forward.",
  },
  sides: [
    {
      id: "backend",
      icon: "</>",
      title: "Backend",
      description: "Tools I use to build server-side features.",
      skills: [
        "Node.js",
        "Express.js",
        "TypeScript",
        "PostgreSQL",
        "MySQL",
        "REST API",
        "WebSocket",
      ],
    },
    {
      id: "frontend",
      icon: "✦",
      title: "Frontend",
      description: "Tools I’m learning to build user interfaces.",
      skills: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "Responsive UI",
        "API Integration",
        "GSAP",
      ],
    },
  ],
};

// BUILD LOG SECTION
export type Project = {
  title: string;
  label: string;
  image: string;
  description: string;
  tags: string[];
  type: string;
  github: string;
  github2?:string;
  live: string;
};

export const buildLogsContent = {
  headline: "BUILDS.",
  subtext: "Small builds that show how I learn and practice web development.",
};

export const projects: Project[] = [
  {
    title: "Inventory System",
    label: "Backend Project",
    image: "/projects/inventory-system.png",
    description:
      "REST API for managing inventory, products, categories, orders, users, authentication, validation, and database relations.",
    tags: ["Node.js", "Express", "Prisma", "PostgreSQL", "JWT", "Zod", "Jest"],
    type: "Backend",
    github: "https://github.com/cizyypie/inventory-system",
    live: "",
  },
  {
  title: "elliptiCheck",
  label: "Web3 Project",
  image: "/projects/ellipticheck.png",
  description:
    "Blockchain-based NFT ticket verification system with a React frontend and Solidity smart contracts for NFT ticket minting, QR verification, ECDSA signatures, EIP-712 typed data, and replay attack prevention.",
  tags: ["React", "Vite", "Solidity", "Foundry", "Ethers.js", "Wagmi"],
  type: "Web3",
  github: "https://github.com/cizyypie/elliptic-fe",
  github2: "https://github.com/cizyypie/ellipticheck-smartcontract",
  live: "",
},
  {
    title: "Real-Time Chat Application",
    label: "Realtime Project",
    image: "/projects/ws-chat.png",
    description:
      "Realtime chat app where users can sign up, log in, create or join chat rooms, send instant messages, edit/delete messages, and see join/leave activity.",
    tags: ["Bun", "Elysia", "WebSockets", "PostgreSQL", "Drizzle"],
    type: "Realtime",
    github: "https://github.com/cizyypie/ws-chat",
    live: "",
  },

  {
  title: "Command-Line Chess",
  label: "CLI Project",
  image: "/projects/command-line-chess.png",
  description:
    "Two-player terminal chess game built from scratch with standard coordinate input, custom move validation, turn management, and checkmate detection.",
  tags: ["JavaScript", "Node.js", "OOP", "CLI", "Readline"],
  type: "CLI",
  github: "https://github.com/cizyypie/command-line-chess",
  live: "",
},
{
  title: "Mofii Streaming Platform Prototype",
  label: "UI/UX Project",
  image: "/projects/mofii.png",
  description:
    "UI/UX prototype for a streaming platform concept, designed in Figma with focus on content discovery, visual hierarchy, user flow, and modern entertainment platform layout.",
  tags: ["Figma", "UI Design", "UX Design", "Prototype", "Wireframing", "Team Collaboration"],
  type: "UI/UX",
  github: "",
  live: "https://www.figma.com/design/GDeZzhqIkATLi42KhuoV9A/Mofii.?node-id=373-665&t=lEIjrgk8w1s3IiJL-1",
},
{
  title: "Hackathon Web3 Project",
  label: "Team Project",
  image: "/projects/hackathon-project.png",
  description:
    "Team-based hackathon project where I contributed to frontend development, wallet integration, UI polishing, product presentation, and social media content support.",
  tags: [
    "Frontend",
    "Wallet Integration",
    "Web3",
    "Team Collaboration",
    "Product Presentation",
  ],
  type: "Team Project",
  github: "",
  live: "https://devfolio.co/projects/lummy-9a9c",
},
 {
  title: "Personal Website",
  label: "Frontend Project",
  image: "/projects/joan-web.png",
  description:
    "Personal portfolio website built to showcase projects, technical skills, design taste, and frontend animation practice.",
  tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"],
  type: "Frontend",
  github: "https://github.com/cizyypie/joan-web",
  live: "",
}
];

// API DEMO SECTION
export const unlockModeContent = {
  label: "API DEMO",
  headline: "Frontend meets API.",
  subtext:
    "A small login demo using fetch, React state, and API response handling.",
  technote: "Built with fetch(), React state, and a provided Postman API.",
  poweredby: "Powered by fetch() and API response handling.",
};

// CONTACT
export const finalCTAContent = {
  headline: "LET'S CONNECT.",
  paragraph:
    "Open to frontend opportunities, web projects, and learning-focused collaborations.",
  buttons: [
    {
      label: "See My GitHub",
      href: "https://github.com/cizyypie",
      primary: true,
    },
    {
      label: "Contact Me",
      href: "mailto:joanitatimbinp@gmail.com",
      primary: false,
    },
  ],
  socials: [
    {
      label: "GitHub",
      handle: "github-joan",
      href: "https://github.com/cizyypie",
      icon: "◈",
    },
    {
      label: "LinkedIn",
      handle: "linkedin.com/in/joanita",
      href: "https://www.linkedin.com/in/joanitapanggalo?",
      icon: "⬡",
    },
    {
      label: "Instagram",
      handle: "@yjjoan",
      href: "https://instagram.com/yjjoan",
      icon: "◎",
    },
    {
      label: "Email",
      handle: "joanitatimbinp@gmail.com",
      href: "mailto:joanitatimbinp@gmail.com",
      icon: "✦",
    },
  ],
  footer: {
    builtWith: "Built with Next.js, TypeScript, Tailwind CSS, and GSAP.",
    copyright: "© 2026 Joanita. All rights reserved.",
  },
};

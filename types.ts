
export type Theme = 'light' | 'dark';

export interface SocialLink {
  id: string;
  name: string;
  icon: string;
  unicode: string; 
  url: string;
  darkColor: string; 
  lightColor: string; 
  description: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { 
    id: 'li', 
    name: 'LinkedIn', 
    icon: 'fa-brands fa-linkedin-in', 
    unicode: '\uf0e1',
    url: 'https://id.linkedin.com/in/raihan-guntur-327b5616a', 
    darkColor: '#00a0dc', 
    lightColor: '#0077b5',
    description: 'Professional networking and career highlights.' 
  },
  { 
    id: 'gh', 
    name: 'GitHub', 
    icon: 'fa-brands fa-github', 
    unicode: '\uf09b',
    url: 'https://github.com/raihang7913', 
    darkColor: '#ffffff', 
    lightColor: '#1b1f23',
    description: 'Open source projects and code repositories.' 
  },
  { 
    id: 'ig', 
    name: 'Instagram', 
    icon: 'fa-brands fa-instagram', 
    unicode: '\uf16d',
    url: 'https://www.instagram.com/raihanramadhaa', 
    darkColor: '#ff304f', 
    lightColor: '#c13584',
    description: 'Personal journey and tech insights.' 
  },
  { 
    id: 'wa', 
    name: 'WhatsApp', 
    icon: 'fa-brands fa-whatsapp', 
    unicode: '\uf232', 
    url: 'https://wa.me/6281290668329', 
    darkColor: '#25D366', 
    lightColor: '#128C7E',
    description: 'Direct message for fast responses.' 
  },
  { 
    id: 'em', 
    name: 'Email', 
    icon: 'fa-solid fa-envelope', 
    unicode: '\uf0e0',
    url: 'mailto:raihan7913@gmail.com?subject=Hello%20Raihan&body=Hi%20Raihan,%0A%0AI%20would%20like%20to%20connect%20with%20you.%0A%0ABest%20regards,', 
    darkColor: '#ff6b6b', 
    lightColor: '#d93025',
    description: 'Direct contact for opportunities.' 
  }
];

export interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Sinfomik",
    category: "Full-Stack Web App",
    description: "Sistem Informasi Akademik Sekolah. Fitur meliputi manajemen data siswa, guru, kelas, mata pelajaran, dan penginputan nilai pelajar.",
    image: "/sinfomik.jpg",
    link: "https://sinfokas.online"
  },
  {
    title: "Minigame",
    category: "Game Development",
    description: "An interactive JavaScript-based minigame showcasing game logic and web programming skills.",
    image: "/minigame-thumb.jpg",
    link: "https://minigame-tau-two.vercel.app/"  },
  {
    title: "Fishit",
    category: "Lua Scripting",
    description: "Auto Fishing Script. A custom Lua automation tool with RNG detection and data processing capabilities.",
    image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com/raihang7913/fishit"  },
  {
    title: "MT5 AI Trader",
    category: "AI Trading Bot",
    description: "Institutional-grade algorithmic trading bot for MetaTrader 5 (MT5). Leverages Google Gemini API, Machine Learning (XGBoost/LightGBM), and Smart Money Concepts for automated execution.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com/raihang7913/MT5-AI-Trader"
  }
];

export const SERVICES = [
  { title: "Web Development", description: "Modern, responsive websites using React, Next.js, and TypeScript." },
  { title: "Blockchain Development", description: "Smart contracts and dApps on Solana blockchain network." },
  { title: "Full-Stack Solutions", description: "End-to-end development from frontend to backend architecture." }
];

export const ACHIEVEMENTS = [
  { metric: "7+", label: "Repositories", icon: "fa-rocket", detail: "Diverse open-source projects encompassing web, scripts, and applications." },
  { metric: "380+", label: "Contributions", icon: "fa-code-commit", detail: "Active GitHub contributions and code commits over the past year." },
  { metric: "5+", label: "Languages", icon: "fa-laptop-code", detail: "Familiar with Python, C#, JavaScript, Lua, and Web Technologies." },
  { metric: "100%", label: "Dedication", icon: "fa-heart", detail: "Committed to continuous learning and solving complex problems." }
];

export const PHILOSOPHY = [
  { title: "Innovation", text: "Embracing cutting-edge technologies and modern frameworks to scale ideas into functional products." },
  { title: "Quality", text: "Writing clean, maintainable code with best practices and performance optimization." },
  { title: "Impact", text: "Building robust software solutions that solve real-world problems and deliver tangible value." }
];

/* ─────────────────────────────────────────────────────────────────────────
   PORTFOLIO CONSTANTS
   Edit this file to update your portfolio — changes reflect instantly.
   ──────────────────────────────────────────────────────────────────────── */

/* ── TYPEWRITER ROLES ── */
export const ROLES = [
  "SOC Analyst",
  "Threat Hunter",
  "Incident Responder",
  "Blue Team Defender",
  "Security Researcher",
];

/* ── NAVBAR LINKS ── */
export const NAV_ITEMS = [
  { label: "About",      id: "about" },
  { label: "Skills",     id: "skills" },
  { label: "Education",  id: "education" },
  { label: "Experience", id: "experience" },
  { label: "Projects",   id: "projects" },
  { label: "Certs",      id: "certs" },
  { label: "Contact",    id: "contact" },
];

/* ── RESUME LINK ── */
export const RESUME_URL =
  "https://drive.google.com/file/d/1uXPipbplMNvSRy67olJzTWVWdvJSgHgp/view";

/* ── HERO STATS BAR ── */
export const HERO_STATS = [
  { n: "Top 1%",  l: "TryHackMe Rank" },
  { n: "149+",    l: "Rooms Completed" },
  { n: "5",       l: "Projects Built" },
  { n: "4",       l: "Certifications" },
];

/* ── HERO FLOATING BADGES ── */
export const HERO_BADGE_TOP    = { value: "Top 1%", label: "TryHackMe" };
export const HERO_BADGE_BOTTOM = { value: "149+",   label: "Rooms Done" };

/* ── BIO ── */
export const BIO = {
  name:        "Chandraprakash",
  college:     "GTN Arts College, Dindigul",
  cgpa:        "8.01",
  period:      "2023 – 2026",
  degree:      "B.Sc Computer Science",
  email:       "cyberchandru87@gmail.com",
  available:   "Available for SOC Analyst Roles",
  location:    "Dindigul, India",
  profileImg:  "/images/profile.webp",
  collegeImg:  "/images/edu-gtn.png",
};

/* ── ABOUT HIGHLIGHTS ── */
export const ABOUT_HIGHLIGHTS = [
  {
    icon: "⚡", color: "#7c3aed",
    title: "TryHackMe — Top 1% Global",
    desc:  "SOC Level 1 certified. 149 rooms, 28 badges, 17,374 points. Level 2 in progress.",
  },
  {
    icon: "🔧", color: "#2563eb",
    title: "Real Security Tools Built",
    desc:  "SenSIEM, honeypot, log analyzer, AI phishing detector — all shipped and documented.",
  },
  {
    icon: "📜", color: "#06b6d4",
    title: "4 Verified Certifications",
    desc:  "IBM, Google, TryHackMe SOC Level 1, and Ethical Hacking — all with credential links.",
  },
];

/* ── SKILLS ── */
export const SKILLS = [
  {
    cat:   "SOC Core Tools",
    color: "#7c3aed",
    bg:    "rgba(124,58,237,0.11)",
    items: ["Splunk", "Microsoft Sentinel", "ELK Stack", "Wazuh", "Zeek", "Suricata IDS"],
  },
  {
    cat:   "Incident Response",
    color: "#2563eb",
    bg:    "rgba(37,99,235,0.11)",
    items: ["Alert Triage", "MITRE ATT&CK", "Phishing Analysis", "IOC Analysis", "EDR Tools", "NIST IR Lifecycle"],
  },
  {
    cat:   "Network Defense",
    color: "#0891b2",
    bg:    "rgba(8,145,178,0.11)",
    items: ["Wireshark", "TCP/IP Analysis", "Firewall Logs", "NetFlow", "VPN Monitoring", "Nmap"],
  },
  {
    cat:   "Threat Detection",
    color: "#059669",
    bg:    "rgba(5,150,105,0.11)",
    items: ["Sigma Rules", "YARA Rules", "SIEM Querying", "OSINT", "Log Analysis", "Regex"],
  },
  {
    cat:   "Automation & Scripting",
    color: "#d97706",
    bg:    "rgba(217,119,6,0.11)",
    items: ["Python", "Bash", "PowerShell", "SOAR Basics", "API Integration", "Git"],
  },
  {
    cat:   "Security Fundamentals",
    color: "#dc2626",
    bg:    "rgba(220,38,38,0.11)",
    items: ["Windows Event Logs", "Linux Auditing", "Active Directory", "OWASP Top 10", "Encryption", "CTF"],
  },
];

/* ── EDUCATION ── */
export const EDUCATION = {
  degree:     "B.Sc Computer Science",
  college:    "GTN Arts College, Dindigul",
  period:     "2023 – 2026",
  cgpa:       "8.01",
  status:     "Completed",
  img:        "/images/edu-gtn.png",
  coursework: [
    "Computer Networks",
    "Cryptography",
    "Operating Systems",
    "Data Structures",
    "DBMS",
    "Web Technologies",
    "Software Engineering",
  ],
};

/* ── EXPERIENCE ── */
export const EXPERIENCE = {
  badge:       "LAB TRAINING",
  title:       "TryHackMe Cybersecurity Training",
  org:         "TryHackMe · Hands-on Cybersecurity Platform",
  status:      "Active",
  stats: [
    { v: "Top 1%",  l: "Global Rank", c: "#a78bfa" },
    { v: "149",     l: "Rooms Done",  c: "#60a5fa" },
    { v: "28",      l: "Badges",      c: "#34d399" },
    { v: "17,374",  l: "Points",      c: "#fbbf24" },
  ],
  points: [
    "Completed SOC Level 1 — mastering SIEM, alert triage, log analysis, and full SOC workflows",
    "SOC Level 2 in progress — advancing into threat hunting, detection engineering, and IR procedures",
    "Investigated phishing, ransomware, network intrusion, and credential attack scenarios",
    "Top 1% globally — 149+ rooms, 28 badges across Cyber Defense, Forensics, and OSINT paths",
  ],
  tags: [
    "SOC Level 1 ✓",
    "SOC Level 2 (Active)",
    "Cyber Defense",
    "Incident Response",
    "Threat Hunting",
    "Digital Forensics",
  ],
};

/* ── PROJECTS ── */
export const PROJECTS = [
  {
    title:    "SenSIEM",
    subtitle: "Open-Source SIEM & Alerting Platform",
    img:      "/images/sensiem.webp",
    tags:     ["FastAPI", "SQLite", "Next.js", "WebSockets"],
    metrics:  [{ v: "35+", l: "Detection Rules" }, { v: "3", l: "Alert Channels" }],
    cat:      "Defensive",
    catC:     "#7c3aed",
    github:   "https://github.com/0xchandru/SenSIEM",
    desc:     "Lightweight SIEM with real-time log ingestion, 35+ detection rules, and multi-channel alerting.",
  },
  {
    title:    "AI Phishing Detector",
    subtitle: "NLP-Powered Email Threat Classifier",
    img:      "/images/phishing-detector.webp",
    tags:     ["Python", "Google Gemini", "NLP", "Email Security"],
    metrics:  [{ v: "90%", l: "Accuracy" }, { v: "20%", l: "Fewer FP" }],
    cat:      "AI / ML",
    catC:     "#2563eb",
    github:   "https://github.com/0xchandru/phishing-email-detector",
    desc:     "Uses Gemini AI to classify phishing emails with 90% accuracy on 100+ real samples.",
  },
  {
    title:    "Log Analysis Tool",
    subtitle: "CLI Threat Detection from Raw Logs",
    img:      "/images/log-parser.webp",
    tags:     ["Python", "Pandas", "Regex", "Log Analysis"],
    metrics:  [{ v: "60%", l: "Faster" }, { v: "90%", l: "Detection Rate" }],
    cat:      "Tools",
    catC:     "#059669",
    github:   "https://github.com/0xchandru/log-parser",
    desc:     "Auto-detects Apache, Nginx, SSH, syslog formats and flags brute-force and geo-anomalies.",
  },
  {
    title:    "HoneyAuth",
    subtitle: "Decoy Login Honeypot for Attacker Intel",
    img:      "/images/honeypot.webp",
    tags:     ["Python", "Flask", "GeoIP", "Deception"],
    metrics:  [{ v: "200+", l: "Attacks Caught" }, { v: "12", l: "Countries" }],
    cat:      "Defensive",
    catC:     "#7c3aed",
    github:   "https://github.com/0xchandru/honeypot",
    desc:     "Flask-based decoy portal capturing 200+ malicious attempts from 12 countries over 14 days.",
  },
  {
    title:    "Password Strength Checker",
    subtitle: "Real-time Credential Security Analyzer",
    img:      "/images/password-checker.webp",
    tags:     ["JavaScript", "HTML/CSS", "Entropy Analysis"],
    metrics:  [{ v: "100%", l: "Weak Detection" }, { v: "100+", l: "Samples" }],
    cat:      "Tools",
    catC:     "#059669",
    github:   "https://github.com/0xchandru/password-strength-checker",
    desc:     "Client-side entropy scoring with real-time feedback on weak patterns and dictionary words.",
  },
];

/* ── CERTIFICATES ── */
export const CERTS = [
  {
    img:    "/images/cert-tryhackme.webp",
    issuer: "TryHackMe",
    title:  "SOC Level 1",
    date:   "June 2026",
    link:   "https://tryhackme.com/certificate/THM-WUPYOBHE0K",
    accent: "#06b6d4",
  },
  {
    img:    "/images/cert-ibm.webp",
    issuer: "IBM",
    title:  "Cybersecurity Professional Analyst",
    date:   "June 2026",
    link:   "https://www.coursera.org/account/accomplishments/specialization/US4R3ZXUCFTD",
    accent: "#7c3aed",
  },
  {
    img:    "/images/cert-google.webp",
    issuer: "Google",
    title:  "Cybersecurity Professional Certificate",
    date:   "April 2025",
    link:   "https://www.coursera.org/account/accomplishments/professional-cert/TGJE3FRTFS2N",
    accent: "#2563eb",
  },
  {
    img:    "/images/cert-internshala.webp",
    issuer: "Internshala / NSDC",
    title:  "Ethical Hacking",
    date:   "November 2024",
    link:   "https://trainings.internshala.com/certificate/view/nsdc/1gvfiyruzvc/fj2c4mq927_/",
    accent: "#059669",
  },
];

/* ── SOCIAL LINKS ── */
export const SOCIALS = [
  { icon: "✉️", label: "Email",       val: "cyberchandru87@gmail.com",       href: "mailto:cyberchandru87@gmail.com",                         c: "#7c3aed" },
  { icon: "💼", label: "LinkedIn",    val: "chandraprakash-soc",              href: "https://www.linkedin.com/in/chandraprakash-soc/",          c: "#2563eb" },
  { icon: "⬡",  label: "GitHub",      val: "0xchandru",                       href: "https://github.com/0xchandru",                            c: "#6b7280" },
  { icon: "🎯", label: "TryHackMe",   val: "0xchandru",                       href: "https://tryhackme.com/p/0xchandru",                       c: "#06b6d4" },
  { icon: "🐦", label: "Twitter / X", val: "@0xchandru",                      href: "https://x.com/0xchandru",                                 c: "#0ea5e9" },
];

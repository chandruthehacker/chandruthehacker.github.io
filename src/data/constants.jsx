/* ─────────────────────────────────────────────────────────────────────────
   PORTFOLIO CONSTANTS
   Edit this file to update your portfolio — changes reflect instantly.
   ──────────────────────────────────────────────────────────────────────── */

/* ── TYPEWRITER ROLES ── */
export const ROLES = [
  "SOC Analyst",
  "Threat Hunter",
  "Incident Responder",
  "Detection Engineer",
  "Blue Team Defender",
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
  { n: "Top 1%",  l: "TryHackMe — 3M+ Users" },
  { n: "149+",    l: "Rooms Completed" },
  { n: "7+",      l: "Security Tools Built" },
  { n: "4",       l: "Industry Certifications" },
];

/* ── HERO FLOATING BADGES ── */
export const HERO_BADGE_TOP    = { value: "Top 1%", label: "TryHackMe" };
export const HERO_BADGE_BOTTOM = { value: "149+",   label: "Rooms Solved" };

/* ── BIO ── */
export const BIO = {
  name:        "Chandraprakash",
  college:     "GTN Arts College, Dindigul",
  cgpa:        "8.01",
  period:      "2023 – 2026",
  degree:      "B.Sc Computer Science",
  email:       "cyberchandru87@gmail.com",
  available:   "Actively Seeking SOC Analyst & Security Analyst Roles",
  location:    "Dindigul, India",
  profileImg:  "/images/profile.webp",
  collegeImg:  "/images/edu-gtn.png",
};

/* ── ABOUT HIGHLIGHTS ── */
export const ABOUT_HIGHLIGHTS = [
  {
    icon: "⚡", color: "#7c3aed",
    title: "TryHackMe — Ranked Top 1% Globally",
    desc:  "Positioned in the top 1% of 3M+ global users. Earned SOC Level 1 certification with 149 rooms completed, 28 badges, and 17,374+ points — consistently outranking 99% of the platform's security practitioners worldwide.",
  },
  {
    icon: "🔧", color: "#2563eb",
    title: "7 Production-Grade Security Tools Built",
    desc:  "Engineered and shipped real tools — ThreatLens (5-source threat intel aggregator with MITRE mapping), SecOps Console (full SIEM + analyst dashboard), HoneyAuth (captured 200+ live attacks), and more. All documented and live on GitHub.",
  },
  {
    icon: "📜", color: "#06b6d4",
    title: "4 Verified Industry Certifications",
    desc:  "Certified by IBM, Google, TryHackMe (SOC Level 1), and NSDC — covering SOC operations, threat analysis, network security, and ethical hacking. Every credential is independently verifiable with a direct link.",
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
    items: ["Alert Triage", "MITRE ATT&CK", "Phishing Analysis", "IOC Analysis", "Velociraptor EDR", "NIST IR Lifecycle"],
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
    items: ["Sigma Rules", "YARA Rules", "SPL / KQL Querying", "OSINT", "Log Forensics", "IOC Enrichment"],
  },
  {
    cat:   "Automation & Scripting",
    color: "#d97706",
    bg:    "rgba(217,119,6,0.11)",
    items: ["Python", "Bash", "PowerShell", "Shuffle SOAR", "API Integration", "Git"],
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
    "DBMS",
    "Operating Systems",
    "Data Structures",
  ],
};

/* ── EXPERIENCE ── */
export const EXPERIENCE = {
  badge:       "HANDS-ON TRAINING",
  title:       "TryHackMe SOC Training & Certification",
  org:         "TryHackMe · Global Cybersecurity Training Platform",
  status:      "Active",
  stats: [
    { v: "Top 1%",  l: "Global Rank",   c: "#a78bfa" },
    { v: "149",     l: "Rooms Solved",  c: "#60a5fa" },
    { v: "28",      l: "Badges Earned", c: "#34d399" },
    { v: "17,374",  l: "Points",        c: "#fbbf24" },
  ],
  points: [
    "Earned SOC Level 1 certification — mastered SIEM operations, alert triage, phishing analysis, network log forensics, and end-to-end incident workflows across real-world attack simulations",
    "Advancing through SOC Level 2 — deepening expertise in threat hunting methodologies, detection engineering, adversary emulation, and formal NIST-aligned incident response procedures",
    "Investigated 10+ high-fidelity attack scenarios covering phishing campaigns, ransomware delivery, network intrusions, lateral movement, and credential-based attacks — each with documented triage reports",
    "Ranked Top 1% globally out of 3M+ users — earned 28 badges across Cyber Defense, Digital Forensics, OSINT, and Network Security paths, completing 149+ rooms",
  ],
  tags: [
    "SOC Level 1 ✓ Certified",
    "SOC Level 2 — In Progress",
    "Cyber Defense",
    "Incident Response",
    "Threat Hunting",
    "Digital Forensics",
  ],
};

/* ── PROJECTS ── */
export const PROJECTS = [
  {
    title:    "SOC Home Lab",
    subtitle: "Fully Operational Tier 1 SOC — Real Telemetry, Real Investigations",
    img:      "/images/homelab.webp",
    tags:     ["Splunk", "Sysmon", "Zeek", "Velociraptor", "MITRE ATT&CK", "Ubuntu Server", "Windows VM"],
    metrics:  [{ v: "10+", l: "Investigations" }, { v: "3", l: "Attack Scenarios" }],
    cat:      "Defensive",
    catC:     "#7c3aed",
    github:   "https://github.com/0xchandru/secops",
    desc:     "A fully operational home SOC built from scratch — ingesting real Windows and Linux telemetry via Sysmon, Zeek, and Splunk Forwarder, mapping every detection to MITRE ATT&CK, and documenting 10+ complete analyst investigations with triage timelines, IOC artifacts, and kill chain breakdowns. Purpose-built to mirror real Tier 1 analyst workflows from day one.",
  },
  {
    title:    "ThreatLens",
    subtitle: "Multi-Source Threat Intelligence Aggregation Platform",
    img:      "/images/threatlens.webp",
    tags:     ["Python", "FastAPI", "React", "asyncio", "VirusTotal", "AbuseIPDB", "AlienVault OTX"],
    metrics:  [{ v: "5", l: "Intel Sources" }, { v: "<2s", l: "Response Time" }],
    cat:      "Defensive",
    catC:     "#7c3aed",
    github:   "https://github.com/0xchandru/secops",
    desc:     "Production-ready threat intelligence platform that queries VirusTotal, AbuseIPDB, AlienVault OTX, URLhaus, and GreyNoise simultaneously via asyncio — returning composite risk scores, MITRE ATT&CK tactic mappings, and exportable PDF threat reports. Built with FastAPI + React; delivers enriched IOC analysis in under 2 seconds across all five sources.",
  },
  {
    title:    "SecOps Console",
    subtitle: "Full-Stack SIEM with Live Detection Engine & Analyst Dashboard",
    img:      "/images/secops.webp",
    tags:     ["TypeScript", "React", "Node.js", "PostgreSQL", "Next.js", "WebSockets"],
    metrics:  [{ v: "15+", l: "Detection Rules" }, { v: "Real-time", l: "Alert Streaming" }],
    cat:      "Defensive",
    catC:     "#7c3aed",
    github:   "https://github.com/0xchandru/secops",
    desc:     "Full-stack SIEM platform built from the ground up — ingests raw logs from any source, normalizes them through a pluggable parser registry, enriches events with GeoIP and asset context, and evaluates 15+ MITRE-mapped detection rules via a custom correlation engine. Streams live alerts into a real-time analyst dashboard via WebSockets — self-hosted, production-grade, and built for real SOC workflows.",
  },
  {
    title:    "SenSIEM",
    subtitle: "Lightweight SIEM Prototype — 35+ Detection Rules",
    img:      "/images/sensiem.webp",
    tags:     ["FastAPI", "SQLite", "Next.js", "WebSockets"],
    metrics:  [{ v: "35+", l: "Detection Rules" }, { v: "3", l: "Alert Channels" }],
    cat:      "Defensive",
    catC:     "#7c3aed",
    github:   "https://github.com/0xchandru/SenSIEM",
    desc:     "Lightweight SIEM prototype featuring real-time log ingestion via FastAPI, 35+ detection rules covering brute-force, privilege escalation, and anomalous access patterns, and multi-channel alerting to Slack, email, and webhooks. The foundational architecture that directly evolved into the full SecOps Console platform.",
  },
  {
    title:    "AI Phishing Detector",
    subtitle: "NLP-Powered Email Threat Classifier",
    img:      "/images/phishing-detector.webp",
    tags:     ["Python", "Google Gemini", "NLP", "Email Security"],
    metrics:  [{ v: "90%", l: "Accuracy" }, { v: "20%", l: "Fewer False Positives" }],
    cat:      "AI / ML",
    catC:     "#2563eb",
    github:   "https://github.com/0xchandru/phishing-email-detector",
    desc:     "NLP-powered email classifier using Google Gemini AI — achieves 90% classification accuracy on 100+ real-world phishing samples, reducing false positives by 20% over baseline keyword filtering. Analyzes sender behavior, URL patterns, and linguistic cues to deliver a verdict with confidence scoring.",
  },
  {
    title:    "Log Analysis Tool",
    subtitle: "Automated Log Forensics & Threat Detection CLI",
    img:      "/images/log-parser.webp",
    tags:     ["Python", "Pandas", "Regex", "Log Analysis"],
    metrics:  [{ v: "60%", l: "Faster Analysis" }, { v: "90%", l: "Detection Rate" }],
    cat:      "Tools",
    catC:     "#059669",
    github:   "https://github.com/0xchandru/log-parser",
    desc:     "CLI threat detection tool that auto-identifies Apache, Nginx, SSH, and syslog log formats — then applies pattern-matching and regex-based detection logic to surface brute-force attacks, geo-anomalies, and unauthorized access attempts. Processes large log files 60% faster than manual review, achieving a 90% detection rate on simulated attack datasets.",
  },
  {
    title:    "HoneyAuth",
    subtitle: "Decoy Honeypot — 200+ Real Attacks Captured Live",
    img:      "/images/honeypot.webp",
    tags:     ["Python", "Flask", "GeoIP", "Deception"],
    metrics:  [{ v: "200+", l: "Attacks Captured" }, { v: "12", l: "Countries" }],
    cat:      "Defensive",
    catC:     "#7c3aed",
    github:   "https://github.com/0xchandru/honeypot",
    desc:     "Flask-based deception honeypot deployed as a realistic login portal — captured 200+ malicious login attempts from 12 countries over 14 days of live exposure. Logs attacker IPs, credential attempts, GeoIP location, and browser fingerprints in real time, producing genuine threat actor intelligence for IOC enrichment and attack pattern analysis.",
  },
  {
    title:    "Password Strength Checker",
    subtitle: "Real-Time Credential Security Analyzer",
    img:      "/images/password-checker.webp",
    tags:     ["JavaScript", "HTML/CSS", "Entropy Analysis"],
    metrics:  [{ v: "100%", l: "Weak Detection" }, { v: "100+", l: "Samples Validated" }],
    cat:      "Tools",
    catC:     "#059669",
    github:   "https://github.com/0xchandru/password-strength-checker",
    desc:     "Client-side password security analyzer using entropy scoring algorithms — delivers real-time feedback on password strength, detects weak patterns, dictionary words, and common credential formats instantly in the browser. Zero-dependency, privacy-safe implementation validated against 100+ sample credentials.",
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
    title:  "Cybersecurity Analyst Professional",
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
  { icon: "✉️", label: "Email",       val: "cyberchandru87@gmail.com",  href: "mailto:cyberchandru87@gmail.com",                   c: "#7c3aed" },
  { icon: "💼", label: "LinkedIn",    val: "chandraprakash-soc",         href: "https://www.linkedin.com/in/chandraprakash-soc/",   c: "#2563eb" },
  { icon: "⬡",  label: "GitHub",      val: "0xchandru",                  href: "https://github.com/0xchandru",                     c: "#6b7280" },
  { icon: "🎯", label: "TryHackMe",   val: "0xchandru",                  href: "https://tryhackme.com/p/0xchandru",                 c: "#06b6d4" },
  { icon: "🐦", label: "Twitter / X", val: "@0xchandru",                 href: "https://x.com/0xchandru",                          c: "#0ea5e9" },
];
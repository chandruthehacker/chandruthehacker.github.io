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

/* ── HERO STATS BAR ──
   Rule: Every number must survive a recruiter asking "how?" in an interview.
   ──────────────────────────────────────────────────────────────────────── */
export const HERO_STATS = [
  { n: "Top 1%",  l: "TryHackMe — 3M+ Users" },
  { n: "149+",    l: "Rooms Completed" },
  { n: "7+",      l: "Security Projects Built" },   // all GitHub repos, honest count
  { n: "3",       l: "Industry Certifications" },   // TryHackMe SOC L1, IBM, Google only
];

/* ── HERO FLOATING BADGES ── */
export const HERO_BADGE_TOP    = { value: "Top 1%", label: "TryHackMe" };
export const HERO_BADGE_BOTTOM = { value: "149+",   label: "Rooms Solved" };

/* ── BIO ── */
export const BIO = {
  name:        "Chandraprakash",
  college:     "GTN Arts College, Dindigul",
  cgpa:        "8.01",
  period:      "2020 – 2023",                        // FIXED: actual degree years
  degree:      "B.Sc Computer Science",
  email:       "chandraprakash.soc@gmail.com",
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
    title: "7+ Security Projects Built & Documented",
    desc:  "Built real, working security tools from scratch — ThreatLens (5-source threat intel aggregator with MITRE mapping), SecOps Console (full SIEM + analyst dashboard), a deployed honeypot, a log parser, and more. All open-source and live on GitHub.",
  },
  {
    icon: "📜", color: "#06b6d4",
    title: "3 Verified Industry Certifications",
    desc:  "Certified by IBM, Google, and TryHackMe (SOC Level 1) — covering SOC operations, threat analysis, network security, and incident response workflows. Every credential is independently verifiable with a direct link.",
  },
];

/* ── SKILLS ──
   Guideline: List a tool only if you can answer "how did you use it?"
   Primary lab tools (Splunk, Zeek, Velociraptor) come first.
   Tools learned via courses/reading are grouped lower or noted as "learning".
   ──────────────────────────────────────────────────────────────────────── */
export const SKILLS = [
  {
    cat:   "SOC Core Tools",
    color: "#7c3aed",
    bg:    "rgba(124,58,237,0.11)",
    items: ["Splunk", "Zeek", "Velociraptor EDR", "Suricata IDS", "Wazuh", "ELK Stack"],
    // NOTE: Put Splunk/Zeek/Velociraptor first — these are your actual hands-on tools.
    // Sentinel is a learning target; move it here once you've built a lab rule in it.
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
    items: ["Wireshark", "TCP/IP Analysis", "Zeek / NSM", "Firewall Log Analysis", "NetFlow", "Nmap"],
  },
  {
    cat:   "Threat Detection",
    color: "#059669",
    bg:    "rgba(5,150,105,0.11)",
    items: ["Sigma Rules", "YARA Rules", "SPL Querying", "OSINT", "Log Forensics", "IOC Enrichment"],
  },
  {
    cat:   "Automation & Scripting",
    color: "#d97706",
    bg:    "rgba(217,119,6,0.11)",
    items: ["Python", "Bash", "PowerShell", "Shuffle SOAR", "FastAPI", "Git"],
  },
  {
    cat:   "Security Fundamentals",
    color: "#dc2626",
    bg:    "rgba(220,38,38,0.11)",
    items: ["Windows Event Logs", "Linux Auditing", "Sysmon", "Active Directory", "OWASP Top 10", "CTF"],
  },
];

/* ── EDUCATION ── */
export const EDUCATION = {
  degree:     "B.Sc Computer Science",
  college:    "GTN Arts College, Dindigul",
  university: "Madurai Kamaraj University",
  period:     "2020 – 2023",                         // FIXED
  cgpa:       "8.01",
  status:     "Completed",
  img:        "/images/edu-gtn.png",
  coursework: [
    "Computer Networks",
    "Cryptography",
    "Operating Systems",
    "Data Structures",
    "DBMS",
  ],
};

/* ── EXPERIENCE ── */
export const EXPERIENCE = [
  {
    badge:     "HOME LAB PROJECT",
    title:     "Self-Built SOC Home Lab — Full Detection & Response Stack",
    org:       "Personal Project · Home Lab Infrastructure",
    startDate: "May 2024",                            // adjust to actual start date
    endDate:   "Present",
    link:      "https://github.com/0xchandru/SOC-Home-Lab",
    linkLabel: "View Lab",

    stats: [
      { v: "20",       l: "Total investigations planned", c: "#a78bfa" },
      { v: "3",        l: "Completed",                    c: "#34d399" },
      { v: "17",       l: "In queue",                     c: "#fbbf24" },
      { v: "Med→Crit", l: "Severity escalation",          c: "#60a5fa" },
    ],

    stack: [
      "Windows 10 (victim VM)",
      "Ubuntu Server (SIEM host)",
      "Splunk",
      "Velociraptor",
      "Zeek",
      "Shuffle SOAR",
      "Slack",
      "Jira",
    ],

    investigations: [
      { name: "Suspicious outbound connection", severity: "Medium", status: "Completed" },
      { name: "Brute-force attack via SMB",     severity: "Medium", status: "Completed" },
      { name: "Malware hash analysis",          severity: "Medium", status: "Completed" },
    ],

    points: [
      "Architected a multi-VM SOC from scratch — Windows 10 victim machine feeding real telemetry via Sysmon and Splunk Universal Forwarder into an Ubuntu-hosted Splunk SIEM, with Zeek for network capture and Velociraptor for endpoint visibility.",
      "Built a full end-to-end analyst workflow: Shuffle SOAR for automated alert routing, Slack for notifications, and Jira for case tracking and ticket lifecycle management — replicating a real Tier 1 SOC environment.",
      "Completed 3 documented investigations — suspicious outbound connection, SMB brute-force, and malware hash analysis — each with structured triage reports covering detection logic, containment steps, and root cause analysis.",
      "Running a progressive 20-investigation programme sequenced from Medium to Critical severity, building detection and response capability across escalating threat scenarios mapped to MITRE ATT&CK.",
    ],

    tags: [
      "SIEM Engineering",
      "Splunk",
      "Velociraptor",
      "Zeek / NSM",
      "Sysmon",
      "Shuffle SOAR",
      "Incident Response",
      "MITRE ATT&CK",
      "Jira Case Management",
      "Virtualisation",
    ],
  },

  {
    badge:     "PLATFORM TRAINING",
    title:     "TryHackMe — SOC Analyst Certification Track",
    org:       "TryHackMe · Global Cybersecurity Training Platform",
    startDate: "Apr 2026",                                // adjust to actual start
    endDate:   "Present",
    link:      "https://tryhackme.com/p/0xchandru",
    linkLabel: "View Profile",

    stats: [
      { v: "Top 1%",  l: "Global rank (3M+ users)", c: "#a78bfa" },
      { v: "149+",    l: "Rooms completed",          c: "#60a5fa" },
      { v: "28",      l: "Badges earned",            c: "#34d399" },
      { v: "17,374",  l: "Points",                   c: "#fbbf24" },
    ],

    points: [
      "Earned SOC Level 1 certification — demonstrated proficiency in SIEM operations, alert triage, phishing analysis, network log forensics, and end-to-end incident handling across simulated real-world attack scenarios.",
      "Ranked top 1% globally out of 3M+ users — driven by consistent room completion across both offensive and defensive domains, reflecting sustained effort over an extended period rather than short-burst study.",
      "Completed 149+ rooms and earned 28 badges across four structured paths — Cyber Defense, Digital Forensics, OSINT, and Network Security — building validated, hands-on depth in each area.",
      "Currently advancing through SOC Level 2 — deepening expertise in threat hunting, detection engineering, adversary emulation, and NIST-aligned incident response at a senior analyst level.",
    ],

    tags: [
      "SOC Level 1 — Certified",
      "SOC Level 2 — In Progress",
      "Cyber Defense",
      "Digital Forensics",
      "OSINT",
      "Network Security",
      "Threat Hunting",
      "Incident Response",
      "Detection Engineering",
    ],
  },
];

/* ── PROJECTS ──
   Honesty rules applied:
   - Log parser → described accurately as a raw log → JSON conversion tool
   - HoneyAuth → described as a decoy login honeypot that captures credential attempts
   - Password Checker → described as a lightweight client-side utility
   - AI Phishing Detector → framed around what it does, not unverified accuracy benchmarks
   - SenSIEM clearly positioned as SecOps Console's prototype predecessor
   ──────────────────────────────────────────────────────────────────────── */
export const PROJECTS = [
  {
    title:    "SOC Home Lab",
    subtitle: "Fully Operational Tier 1 SOC — Real Telemetry, Real Investigations",
    img:      "/images/homelab.webp",
    tags:     ["Splunk", "Sysmon", "Zeek", "Velociraptor", "MITRE ATT&CK", "Ubuntu Server", "Windows VM"],
    metrics:  [{ v: "20", l: "Investigations Planned" }, { v: "3", l: "Completed" }],
    cat:      "Defensive",
    catC:     "#7c3aed",
    github:   "https://github.com/0xchandru/SOC-Home-Lab",
    desc:     "A fully operational home SOC built from scratch across multiple VMs — Windows 10 victim machine with Sysmon and Splunk Forwarder feeding telemetry into an Ubuntu-hosted Splunk SIEM, Zeek for network traffic capture, and Velociraptor for endpoint forensics. Three investigations completed (suspicious outbound connection, SMB brute-force, malware hash analysis), with 17 more queued in a progressive severity roadmap from Medium to Critical.",
  },
  {
    title:    "ThreatLens",
    subtitle: "Multi-Source Threat Intelligence Aggregation Platform",
    img:      "/images/threatlens.webp",
    tags:     ["Python", "FastAPI", "React", "asyncio", "VirusTotal", "AbuseIPDB", "AlienVault OTX"],
    metrics:  [{ v: "5", l: "Intel Sources" }, { v: "<2s", l: "Response Time" }],
    cat:      "Defensive",
    catC:     "#7c3aed",
    github:   "https://github.com/0xchandru/threatlens",
    desc:     "Threat intelligence aggregation platform that queries VirusTotal, AbuseIPDB, AlienVault OTX, URLhaus, and GreyNoise in parallel via asyncio — returning composite risk scores, MITRE ATT&CK tactic mappings, and exportable PDF threat reports. Built with FastAPI and React, delivering enriched IOC analysis across all five sources in under 2 seconds.",
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
    desc:     "Full-stack SIEM platform — ingests raw logs from any source, normalizes them through a pluggable parser registry, enriches events with GeoIP and asset context, and evaluates 15+ MITRE-mapped detection rules via a custom correlation engine. Streams live alerts into a real-time analyst dashboard via WebSockets. Built as the full production evolution of the SenSIEM prototype.",
  },
  {
    title:    "SenSIEM",
    subtitle: "Lightweight SIEM Prototype — Foundation for SecOps Console",
    img:      "/images/sensiem.webp",
    tags:     ["FastAPI", "SQLite", "Next.js", "WebSockets"],
    metrics:  [{ v: "35+", l: "Detection Rules" }, { v: "3", l: "Alert Channels" }],
    cat:      "Defensive",
    catC:     "#7c3aed",
    github:   "https://github.com/0xchandru/SenSIEM",
    desc:     "Lightweight SIEM prototype featuring real-time log ingestion via FastAPI, 35+ detection rules covering brute-force, privilege escalation, and anomalous access patterns, and multi-channel alerting to Slack, email, and webhooks. Built as an early-stage proof of concept that directly evolved into the full SecOps Console platform.",
  },
  {
    title:    "AI Phishing Detector",
    subtitle: "LLM-Powered Email Threat Classifier",
    img:      "/images/phishing-detector.webp",
    tags:     ["Python", "Google Gemini API", "NLP", "Email Security"],
    metrics:  [{ v: "Gemini", l: "Powered" }, { v: "Real-time", l: "Classification" }],
    cat:      "AI / ML",
    catC:     "#2563eb",
    github:   "https://github.com/0xchandru/phishing-email-detector",
    desc:     "Email threat classifier powered by the Google Gemini API — takes raw email content as input and returns a detailed verdict on phishing indicators including sender behaviour, URL patterns, urgency cues, and impersonation tactics. Designed to demonstrate LLM-assisted threat analysis in a SOC triage workflow.",
  },
  {
    title:    "Log Parser",
    subtitle: "Raw Log to JSON Converter — Structured Format for SIEM Ingestion",
    img:      "/images/log-parser.webp",
    tags:     ["Python", "Pandas", "Regex", "Log Parsing"],
    metrics:  [{ v: "4+", l: "Log Formats" }, { v: "JSON", l: "Output Format" }],
    cat:      "Tools",
    catC:     "#059669",
    github:   "https://github.com/0xchandru/log-parser",
    // TITLE ALSO CHANGED above from "Log Analysis Tool" to "Log Parser" — update your project
    // title and subtitle in the actual app to match if needed.
    desc:     "CLI tool that parses raw Apache, Nginx, SSH, and syslog log files into structured JSON — normalizing unstructured log data into a consistent format ready for SIEM ingestion or further analysis. Built to understand log formats at a low level, which directly informed detection rule writing and SPL query development in the home lab.",
  },
  {
    title:    "HoneyAuth",
    subtitle: "Decoy Login Honeypot — Credential Attempt Logger",
    img:      "/images/honeypot.webp",
    tags:     ["Python", "Flask", "Deception", "Threat Intelligence"],
    metrics:  [{ v: "200+", l: "Attempts Logged" }, { v: "Live", l: "Deployment" }],
    cat:      "Defensive",
    catC:     "#7c3aed",
    github:   "https://github.com/0xchandru/honeypot",
    desc:     "Flask-based decoy login portal deployed to capture real-world credential stuffing and brute-force attempts. Logged 200+ unauthorized login attempts during live deployment — recording attacker IPs, submitted credentials, timestamps, and user agents. Built to understand attacker behaviour patterns and generate real IOC data for threat intelligence practice.",
  },
];

/* ── CERTIFICATES ──
   Removed NSDC/Internshala from the "industry certifications" count in HERO_STATS.
   It can stay here as an additional credential, but don't lead with it as a top-tier cert.
   ──────────────────────────────────────────────────────────────────────── */
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
  { icon: "✉️", label: "Email",       val: "chandraprakash.soc@gmail.com",  href: "mailto:chandraprakash.soc@gmail.com",                   c: "#7c3aed" },
  { icon: "💼", label: "LinkedIn",    val: "chandraprakash-soc",         href: "https://www.linkedin.com/in/chandraprakash-soc/",   c: "#2563eb" },
  { icon: "⬡",  label: "GitHub",      val: "0xchandru",                  href: "https://github.com/0xchandru",                     c: "#6b7280" },
  { icon: "🎯", label: "TryHackMe",   val: "0xchandru",                  href: "https://tryhackme.com/p/0xchandru",                 c: "#06b6d4" },
  { icon: "🐦", label: "Twitter / X", val: "@0xchandru",                 href: "https://x.com/0xchandru",                          c: "#0ea5e9" },
];
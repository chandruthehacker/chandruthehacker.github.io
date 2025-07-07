import {
  Search, Monitor, Zap, Shield, Database, Network,
  FileText, BellRing, CircleAlert, Code, Sigma, MailWarning, Bug,
  Target, FileSearch2, Box, Cable, Siren, Activity, GlobeLock, BrickWallFire,
  Globe, ChevronsLeftRightEllipsis, Repeat, Terminal, Layers,
  Eye, ClipboardList, Command, Regex,
  Users2, FileCode, Wrench, BrainCircuit, Share2,
  ScrollText, Package, GitBranch, Table2, BookOpen,
  Repeat2, Link, AlertTriangle, UserX, Lock, Brain,
  Microscope, ListOrdered, ShieldCheck, Book, Trophy, Triangle
} from 'lucide-react';


import projectDeveloperImg from "../assets/icons/project.png";
import labImg from "../assets/icons/lab.png";
import honeypotImg from "../assets/projects/honeypot.webp";
import logParserImg from "../assets/projects/log-parser.webp";
import phishingDetectorImg from "../assets/projects/phishing-detector.webp";
import passwordCheckerImg from "../assets/projects/password-strength-checker.webp";
import collegeImg from "../assets/education/gtn.png";
import googleCyb from "../assets/certificates/google_cybersecurity.webp";
import internshalaEth from "../assets/certificates/internshala_nsdc.webp";
import splunkUdemy from "../assets/certificates/Udemy_Splunk.webp";

export const blogPortfolio = "portfolio-website-old";

export const Bio = {
  name: "Chandrapraksh",
  roles: [
    "B.Sc CS Student",
    "Aspiring SOC Analyst",
    "Threat Hunter",
    "Security Researcher",
  ],
  description:
    "Passionate about threat detection, log analysis, and incident response. Constantly sharpening my skills through CTF challenges (TryHackMe, Hack The Box), malware analysis labs, and SIEM tools (Splunk, Wazuh). Eager to contribute to a security team by detecting and mitigating threats effectively.",
  github: "https://github.com/chandruthehacker",
  resume:
    "https://drive.google.com/file/d/196OdIh1lw6hbcEAXE_4krVPaAUl2J75B/view?usp=sharing",
  gmail: "cyberchandru87@gmail.com",
  phone: "+919786475035",
  linkedin: "https://www.linkedin.com/in/chandraprakash87/",
  twitter: "https://x.com/cyberchandru",
  telegram: "https://t.me/chandruthehacker",
  insta: "https://www.instagram.com/cyberchandru",
  facebook: "https://www.facebook.com/chandru87125",
  whatsapp: "https://wa.me/919786475035",
};

export const skills = [
  {
    title: "SIEM & Monitoring",
    skills: [
      { name: "Splunk", icon: <Search color="#29bd00" /> },
      { name: "SIEM", icon: <Monitor color="#00bcd4" /> },
      { name: "SOAR", icon: <Zap color="#ff9800" /> },
      { name: "Wazuh", icon: <Shield color="#9c27b0" /> },
      { name: "ELK", icon: <Database color="#673ab7" /> },
      { name: "Zeek", icon: <Network color="#3f51b5" /> },
      { name: "Sentinel", icon: <Shield color="#4caf50" /> },
      { name: "Log Monitoring", icon: <FileText color="#ff5722" /> },
      { name: "Alert Triage", icon: <BellRing color="#f44336" /> }
    ]
  },
  {
    title: "Threat Operations",
    skills: [
      { name: "Incident Response", icon: <CircleAlert color="#e91e63" /> },
      { name: "Threat Hunting", icon: <Search color="#00bcd4" /> },
      { name: "YARA", icon: <Code color="#ff9800" /> },
      { name: "Sigma", icon: <Sigma color="#3f51b5" /> },
      { name: "Phishing", icon: <MailWarning color="#009688" /> },
      { name: "Malware Analysis", icon: <Bug color="#f44336" /> },
      { name: "MITRE ATT&CK", icon: <Target color="#cddc39" /> },
      { name: "IOC Analysis", icon: <FileSearch2 color="#4caf50" /> },
      { name: "Sandboxing", icon: <Box color="#9e9e9e" /> }
    ]
  },
  {
    title: "Network Defense",
    skills: [
      { name: "TCP/IP", icon: <Cable color="#00acc1" /> },
      { name: "Firewalls", icon: <BrickWallFire color="#ef6c00" /> },
      { name: "IDS/IPS", icon: <Siren color="#ff1744" /> },
      { name: "Wireshark", icon: <Activity color="#00e676" /> },
      { name: "VPNs", icon: <GlobeLock color="#7c4dff" /> },
      { name: "DNS", icon: <Globe color="#2196f3" /> },
      { name: "NetFlow", icon: <ChevronsLeftRightEllipsis color="#c2185b" /> },
      { name: "Proxy", icon: <Repeat color="#607d8b" /> },
      { name: "Nmap", icon: <Eye color="#26a69a" /> },
      { name: "SSH", icon: <Terminal color="#fbc02d" /> },
      { name: "Network Layers", icon: <Layers color="#6d4c41" /> }
    ]
  },
  {
    title: "Endpoint Security",
    skills: [
      { name: "Windows Security", icon: <Lock color="#2962ff" /> },
      { name: "Linux Hardening", icon: <ShieldCheck color="#c51162" /> },
      { name: "EDR", icon: <Eye color="#2e7d32" /> },
      { name: "FIM", icon: <ClipboardList color="#5e35b1" /> },
      { name: "PowerShell", icon: <Command color="#00838f" /> },
      { name: "Bash", icon: <Terminal color="#455a64" /> },
      { name: "Active Directory", icon: <Users2 color="#00c853" /> },
      { name: "Sysmon", icon: <FileCode color="#8e24aa" /> },
      { name: "Patch Management", icon: <Wrench color="#fdd835" /> }
    ]
  },
  {
    title: "Automation",
    skills: [
      { name: "Python", icon: <BrainCircuit color="#ffd600" /> },
      { name: "Regex", icon: <Regex color="#ff7043" /> },
      { name: "APIs", icon: <Share2 color="#00b0ff" /> },
      { name: "Bash Scripting", icon: <ScrollText color="#607d8b" /> },
      { name: "Ansible", icon: <Package color="#ab47bc" /> },
      { name: "Git", icon: <GitBranch color="#e64a19" /> },
      { name: "SQL", icon: <Table2 color="#4db6ac" /> },
      { name: "Log Parsing", icon: <FileText color="#dce775" /> },
      { name: "PlayBooks", icon: <BookOpen color="#8bc34a" /> },
      { name: "Task Automation", icon: <Repeat2 color="#78909c" /> },
      { name: "API Integration", icon: <Link color="#90a4ae" /> }
    ]
  },
  {
    title: "Security Foundations",
    skills: [
      { name: "Risk Assessment", icon: <AlertTriangle color="#f44336" /> },
      { name: "Zero Trust", icon: <UserX color="#e53935" /> },
      { name: "Encryption", icon: <Lock color="#1e88e5" /> },
      { name: "Threat Intel", icon: <Brain color="#43a047" /> },
      { name: "Forensics", icon: <Microscope color="#ffca28" /> },
      { name: "OWASP Top 10", icon: <ListOrdered color="#5c6bc0" /> },
      { name: "CIA Triad", icon: <Triangle color="#00acc1" /> },
      { name: "NIST CSF", icon: <Book color="#3949ab" /> },
      { name: "CTFs", icon: <Trophy color="#fdd835" /> }
    ]
  }
];

export const projects = [
  {
    id: 0,
    title: "AI Phishing Email Detector",
    date: "2025",
    description: `Detects malicious emails using Google Generative AI
## 🛠️ Features  
✅ Scans email headers, subject, and body for phishing indicators.  
✅ Uses NLP to detect urgency/scare tactics (e.g., "Your account is locked!").  
✅ Returns a risk like (Legitimate/Phishing).  

## ⚙️ How It Works  
Extracts email text (Gmail API/IMAP).  
Sends content to Google Generative AI for analysis.  
Flags suspicious patterns (fake links, impersonation).  

## 🧪 Testing & Results  
Tested on **100+ phishing samples** (Accuracy: 90%).  
Reduced false positives by **20%** with keyword filtering.
`,
    image: phishingDetectorImg,
    tags: ["Python", "Email Security", "AI Phishing Detector"],
    category: "detection",
    github: `https://github.com/chandruthehacker/phishing-email-detector`,
    blog: `https://chandruthehacker.github.io/${blogPortfolio}/projects/all-projects/phising-email-detector/phising-email-detector.html`,
  },
  {
    id: 1,
    title: "Log Analysis Tool",
    date: "2025",
    description: `A CLI tool to parse, analyze, and visualize security logs with threat detection.
## 🛠️ Features
✅ Automatically detects log types (Apache/Nginx/Syslog/auth.log)
✅ Parses logs using regex to extract IPs, timestamps, and events
✅ Detects brute-force SSH attacks (>5 failed logins in 5 mins)
✅ Flags suspicious sudo activity and odd-hour logins
✅ Identifies geo-based anomalies (unexpected country logins)
✅ Outputs results as CSV, Excel, or Matplotlib charts

## ⚙️ How It Works
Ingests raw log files via CLI path or drag-and-drop
Classifies log type and extracts key data using Pandas
Applies threat detection rules (customizable thresholds)
Generates reports in multiple formats:
CSV/Excel for SIEM integration
Interactive charts for attack visualization

## 🧪 Testing & Results
Tested on **100+ real-world logs** (AWS/on-prem servers)
Detected **90%** of simulated attacks vs manual review's 70%
Reduced analysis time by **60%** compared to manual processes

`,
    image: logParserImg,
    tags: ["Python", "Regex", "Pandas", "Log Analysis", "matplotlib"],
    category: "automation",
    github: "https://github.com/chandruthehacker/log-parser",
    blog: `https://chandruthehacker.github.io/${blogPortfolio}/projects/all-projects/log-analysis/log-analysis.html`,
  },
  {
    id: 2,
    title: "HoneyAuth: Decoy Login",
    date: "2025",
    description: `Deployed a honeypot in a VM to log attacker behavior by simulating vulnerable services.
## 🛠️ Features
✅ Simulates realistic login pages (Fake admin portals/OAuth)
✅ Logs attacker IPs, user agents, and timestamps
✅ Records brute-force patterns and password attempts
✅ Tracks geographical locations of malicious visitors
✅ Generates threat reports with access heatmaps

## ⚙️ How It Works
Hosts fake login interface (HTML/CSS indistinguishable from real systems)
Captures all submitted credentials (never stored/used)
Logs detailed metadata:
Browser fingerprints
Attack timing patterns
GeoIP data (via free API)

## 🔍 Outputs analysis:
Top attacker IPs
Common brute-force dictionaries
Geographic threat map

## 🧪 Testing & Results
Collected **200+ malicious** attempts during 2-week deployment
Identified **3 distinct** attack patterns (credential stuffing, dictionary attacks)
Mapped threats from **12 countries** (85% from unexpected regions)
`,
    image: honeypotImg,
    tags: ["Python", "Flask", "Security"],
    category: "detection",
    github: "https://github.com/chandruthehacker/honeypot",
    blog: `https://chandruthehacker.github.io/${blogPortfolio}/projects/all-projects/honeypot/honeypot.html`,
  },
  {
    id: 3,
    title: "Password Strength Checker",
    date: "2025",
    description: `
A responsive and interactive web tool that evaluates the strength of user-entered passwords in real time and provides actionable feedback for stronger credentials.

## 🔐 Key Features
🧠 Analyzes passwords for length, character variety, and patterns  
⚠️ Detects common weaknesses (e.g., all lowercase, repetitive chars, dictionary words)  
✅ Provides live feedback with strength levels (Weak, Moderate, Strong)  
🎨 Modern UI with animated indicators and color-coded messages  
📱 Fully responsive and optimized for both desktop and mobile

## ⚙️ How It Works
- Captures user input and evaluates against defined security rules  
- Uses JavaScript logic to calculate entropy and strength  
- Displays dynamic visual feedback using progress bars and tips  
- Built with clean HTML/CSS and efficient JS for speed and responsiveness

## 🧪 Testing & Results
🔍 Tested with **100+ real-world password samples**  
🛡️ Identified **100% weak passwords** accurately  
🚀 Enhanced user awareness about password hygiene during demos

`,
    image: passwordCheckerImg,
    tags: ["JavaScript", "HTML", "CSS", "Security", "Frontend"],
    category: "awareness",
    github: "https://github.com/chandruthehacker/password-strength-checker",
    blog: "https://chandruthehacker.github.io/portfolio-website-old/projects/all-projects/password-checker/password-checker.html",
  },
];

export const certificates = [
  {
    id: 0,
    title: "Google",
    date: "April 2025",
    description: "Cybersecurity Proffessional",
    image: googleCyb,
    link: "https://www.coursera.org/account/accomplishments/professional-cert/TGJE3FRTFS2N",
  },
  {
    id: 1,
    title: "Internshala",
    date: "November 2025",
    description: "Ethical Hacking",
    image: internshalaEth,
    link: "https://trainings.internshala.com/certificate/view/nsdc/1gvfiyruzvc/fj2c4mq927_/",
  },
  {
    id: 2,
    title: "Udemy",
    date: "June 2025",
    description: "Splunk Core User",
    image: splunkUdemy,
    link: "https://www.udemy.com/certificate/UC-d1611f48-8dbb-4c43-9bde-9c0bfd0cf47c/",
  },
];

export const journey = [
  {
    id: 1,
    img: collegeImg,
    heading: "B.Sc Computer Science",
    sub_heading: "GTN Arts College, Dindigul",
    date: "2023–2026",
    desc: "Pursuing my final year with a strong focus on cybersecurity. Learned core concepts in networking, Linux, and Python while applying them in log analysis, SIEM basics, and SOC-related workflows through academic and self-driven learning.",
    skills: ["Networking", "Log Analysis", "Linux", "Python"],
  },
  {
    id: 2,
    img: labImg,
    heading: "SOC Labs & CTF Practice",
    sub_heading: "TryHackMe & Hack The Box",
    date: "2024–Present",
    desc: "Practicing blue team skills daily through SOC simulations, defensive CTFs, and hands-on labs. Focused on log correlation, threat detection, packet inspection, and using Splunk and ELK to understand and respond to real-world attack patterns.",
    skills: ["Splunk", "Wireshark", "Nmap", "MITRE"],
  },
  {
    id: 3,
    img: projectDeveloperImg,
    heading: "Cybersecurity Projects",
    sub_heading: "Self‑Driven Labs & Tools",
    date: "2024–Present",
    desc: "Built projects like phishing email detectors, honeypots, and a mini-SIEM using ELK. Automated alerting and log parsing with Python and Bash to simulate incident response scenarios and improve detection capabilities in small-scale environments.",
    skills: ["ELK Stack", "YARA", "Honeypots", "Automation"],
  },
];

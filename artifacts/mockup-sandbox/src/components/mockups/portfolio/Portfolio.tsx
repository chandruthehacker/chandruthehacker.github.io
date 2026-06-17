import { useEffect, useRef, useState } from "react";

const ACCENT = "#00D4FF";
const GREEN = "#00FF88";
const BG = "#0A0E1A";
const CARD = "#111827";
const BORDER = "#1e2d45";

const styles = `
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes fadeInUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(0,255,136,0.4)} 70%{box-shadow:0 0 0 10px rgba(0,255,136,0)} }
  @keyframes hexDrift { 0%{transform:translateY(0)} 100%{transform:translateY(-60px)} }
  @keyframes glowPulse { 0%,100%{text-shadow:0 0 8px #00D4FF40} 50%{text-shadow:0 0 20px #00D4FF} }
  @keyframes scanline { 0%{top:0} 100%{top:100%} }

  .cursor::after { content:'_'; animation:blink 1s step-end infinite; color:${ACCENT}; }
  .fade-in-up { animation:fadeInUp 0.6s ease forwards; }
  .section-hidden { opacity:0; transform:translateY(28px); transition:opacity 0.6s ease, transform 0.6s ease; }
  .section-visible { opacity:1; transform:translateY(0); }
  .glow-card:hover { box-shadow:0 0 0 1px ${ACCENT}40, 0 4px 32px ${ACCENT}20 !important; }
  .skill-pill:hover { background:${ACCENT}22; border-color:${ACCENT}; color:${ACCENT}; transform:translateY(-1px); }
  .nav-link:hover { color:${ACCENT}; }
  .nav-link.active { color:${ACCENT}; }
  .cert-card:hover { border-color:${ACCENT}80; box-shadow:0 0 24px ${ACCENT}15; }
  .proj-card:hover { border-color:${ACCENT}60; box-shadow:0 0 32px ${ACCENT}18; transform:translateY(-3px); }
  .back-top:hover { background:${ACCENT}; color:${BG}; }

  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-track { background:${BG}; }
  ::-webkit-scrollbar-thumb { background:${ACCENT}60; border-radius:2px; }
`;

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certs", label: "Certs" },
  { id: "contact", label: "Contact" },
];

const ROLES = ["SOC Analyst", "Threat Hunter", "Incident Responder", "Blue Team Defender"];

const SKILLS_DATA = [
  {
    icon: "⚡",
    title: "SIEM & Monitoring",
    skills: ["Splunk", "Wazuh", "ELK Stack", "Microsoft Sentinel", "Zeek", "Suricata IDS"],
  },
  {
    icon: "🌐",
    title: "Network Security",
    skills: ["Wireshark", "Nmap", "TCP/IP Analysis", "NetFlow", "Firewall Logs", "VPN Monitoring"],
  },
  {
    icon: "🎯",
    title: "Threat Intelligence",
    skills: ["MITRE ATT&CK", "OSINT", "YARA Rules", "Sigma Rules", "IOC Analysis", "VirusTotal"],
  },
  {
    icon: "🖥️",
    title: "Endpoint Security",
    skills: ["Windows Event Logs", "Sysmon", "EDR Tools", "Linux Auditing", "Active Directory", "Phishing Analysis"],
  },
  {
    icon: "⚙️",
    title: "Scripting & Automation",
    skills: ["Python", "Bash", "PowerShell", "SOAR Basics", "API Integration", "Git"],
  },
  {
    icon: "📋",
    title: "Frameworks & Standards",
    skills: ["NIST IR Lifecycle", "OWASP Top 10", "Cyber Kill Chain", "ISO 27001", "Alert Triage", "CTF Experience"],
  },
];

const PROJECTS_DATA = [
  {
    title: "SenSIEM",
    subtitle: "Open-Source SIEM & Alerting Platform",
    desc: "Lightweight SIEM with FastAPI + Next.js. Real-time log ingestion, 35+ detection rules, Splunk-style search, multi-channel alerting via Email, Slack, Telegram.",
    tags: ["FastAPI", "SQLite", "Next.js", "WebSockets", "SIEM"],
    metrics: [{ v: "35+", l: "Detection Rules" }, { v: "3", l: "Alert Channels" }],
    github: "https://github.com/0xchandru/SenSIEM",
    cat: "defensive",
  },
  {
    title: "AI Phishing Detector",
    subtitle: "NLP-powered Email Threat Classification",
    desc: "Python tool using Google Gemini to classify phishing emails. Analyzes headers, subject, body. 90% accuracy on 100+ real phishing samples.",
    tags: ["Python", "Google Gemini", "NLP", "Email Security"],
    metrics: [{ v: "90%", l: "Detection Accuracy" }, { v: "20%", l: "Fewer False Positives" }],
    github: "https://github.com/0xchandru/phishing-email-detector",
    cat: "forensics",
  },
  {
    title: "Log Analysis Tool",
    subtitle: "CLI Threat Detection from Raw Logs",
    desc: "CLI tool that auto-detects Apache, Nginx, SSH, syslog formats. Identifies brute-force, geo-anomalies, suspicious sudo. 90% detection, 60% faster than manual.",
    tags: ["Python", "Pandas", "Regex", "Log Analysis"],
    metrics: [{ v: "60%", l: "Faster Analysis" }, { v: "90%", l: "Detection Rate" }],
    github: "https://github.com/0xchandru/log-parser",
    cat: "tools",
  },
  {
    title: "HoneyAuth",
    subtitle: "Decoy Login Honeypot for Attacker Intel",
    desc: "Flask-based decoy login portal deployed in a VM. Captured 200+ malicious attempts over 2 weeks, mapped threats from 12 countries.",
    tags: ["Python", "Flask", "GeoIP", "Deception Tech"],
    metrics: [{ v: "200+", l: "Attacks Captured" }, { v: "12", l: "Countries Tracked" }],
    github: "https://github.com/0xchandru/honeypot",
    cat: "defensive",
  },
  {
    title: "Password Strength Checker",
    subtitle: "Real-time Credential Security Analyzer",
    desc: "Browser-based entropy scoring tool with real-time feedback. Detects weak patterns, dictionary words, character gaps. 100% accuracy on 100+ test samples.",
    tags: ["JavaScript", "HTML/CSS", "Entropy Analysis"],
    metrics: [{ v: "100%", l: "Weak Detection Rate" }, { v: "100+", l: "Samples Tested" }],
    github: "https://github.com/0xchandru/password-strength-checker",
    cat: "tools",
  },
];

const CERTS_DATA = [
  {
    issuer: "TryHackMe",
    title: "SOC Level 1",
    date: "June 2026",
    skills: ["SOC Workflows", "Log Analysis", "Threat Investigation", "SIEM Fundamentals"],
    status: "VERIFIED",
    link: "https://tryhackme.com/certificate/THM-WUPYOBHE0K",
    color: "#00D4FF",
  },
  {
    issuer: "IBM",
    title: "Cybersecurity Professional Analyst",
    date: "June 2026",
    skills: ["Threat Detection", "Incident Response", "Security Analysis", "SOC Foundations"],
    status: "VERIFIED",
    link: "https://www.coursera.org/account/accomplishments/specialization/US4R3ZXUCFTD",
    color: "#00D4FF",
  },
  {
    issuer: "Google",
    title: "Cybersecurity Professional Certificate",
    date: "April 2025",
    skills: ["SIEM Tools", "Incident Response", "Python Automation", "Network Analysis"],
    status: "VERIFIED",
    link: "https://www.coursera.org/account/accomplishments/professional-cert/TGJE3FRTFS2N",
    color: "#00FF88",
  },
  {
    issuer: "Internshala / NSDC",
    title: "Ethical Hacking",
    date: "November 2024",
    skills: ["Penetration Testing", "Vulnerability Assessment", "Kali Linux", "Network Attacks"],
    status: "VERIFIED",
    link: "https://trainings.internshala.com/certificate/view/nsdc/1gvfiyruzvc/fj2c4mq927_/",
    color: "#00FF88",
  },
];

function HexGrid() {
  return (
    <div style={{
      position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0,
    }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.06 }}>
        <defs>
          <pattern id="hex" x="0" y="0" width="56" height="48" patternUnits="userSpaceOnUse">
            <polygon points="28,4 52,18 52,30 28,44 4,30 4,18" fill="none" stroke={ACCENT} strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex)" />
      </svg>
      {/* Scanline overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(180deg, transparent 0%, ${ACCENT}04 50%, transparent 100%)`,
        backgroundSize: "100% 4px",
      }} />
    </div>
  );
}

function Navbar({ activeSection }: { activeSection: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const el = document.getElementById("portfolio-root");
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 60);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100, width: "100%",
      background: scrolled ? `${BG}e8` : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${BORDER}` : "1px solid transparent",
      transition: "all 0.3s ease",
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo */}
        <div style={{ fontSize: 18, fontWeight: 700, color: ACCENT, letterSpacing: "0.05em" }}>
          &gt; 0xchandru
        </div>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <button key={l.id} className={`nav-link ${activeSection === l.id ? "active" : ""}`}
              onClick={() => scrollTo(l.id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: activeSection === l.id ? ACCENT : "#9ca3af",
                fontSize: 13, letterSpacing: "0.05em", transition: "color 0.2s", padding: 0,
                fontFamily: "inherit",
              }}>
              {l.label}
            </button>
          ))}
          <a href="https://drive.google.com/file/d/1uXPipbplMNvSRy67olJzTWVWdvJSgHgp/view" target="_blank" rel="noreferrer"
            style={{
              background: "none", border: `1px solid ${ACCENT}`, color: ACCENT,
              padding: "7px 18px", borderRadius: 6, fontSize: 13, cursor: "pointer",
              textDecoration: "none", letterSpacing: "0.05em", transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              (e.target as HTMLElement).style.background = ACCENT;
              (e.target as HTMLElement).style.color = BG;
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.background = "none";
              (e.target as HTMLElement).style.color = ACCENT;
            }}>
            Resume ↗
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const role = ROLES[roleIdx];
    if (typing) {
      if (displayed.length < role.length) {
        const t = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1400);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
        return () => clearTimeout(t);
      } else {
        setRoleIdx((roleIdx + 1) % ROLES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIdx]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" style={{
      position: "relative", minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", textAlign: "center", padding: "80px 24px",
      overflow: "hidden",
    }}>
      <HexGrid />

      {/* Glow orbs */}
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${ACCENT}10 0%, transparent 70%)`, top: "10%", left: "20%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${GREEN}08 0%, transparent 70%)`, bottom: "15%", right: "15%", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: `${GREEN}15`, border: `1px solid ${GREEN}40`,
          borderRadius: 100, padding: "6px 16px", marginBottom: 32,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: GREEN, letterSpacing: "0.1em",
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: GREEN, display: "inline-block", animation: "pulse 2s infinite" }} />
          AVAILABLE FOR OPPORTUNITIES
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "clamp(40px, 7vw, 76px)",
          fontWeight: 700, color: "#f0f6ff",
          lineHeight: 1.1, marginBottom: 20,
          letterSpacing: "-0.02em",
        }}>
          Chandraprakash<span className="cursor" />
        </h1>

        {/* Typewriter */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(18px, 3vw, 28px)",
          color: ACCENT, marginBottom: 24, minHeight: "1.4em",
          letterSpacing: "0.02em",
        }}>
          &gt; {displayed}<span style={{ borderRight: `2px solid ${ACCENT}`, animation: "blink 1s step-end infinite", marginLeft: 2 }} />
        </div>

        {/* Tagline */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 18, color: "#6b7280", marginBottom: 48, lineHeight: 1.6,
          letterSpacing: "0.01em",
        }}>
          Monitoring threats. Defending systems. Staying one step ahead.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => scrollTo("projects")}
            style={{
              background: ACCENT, color: BG, border: "none",
              padding: "14px 32px", borderRadius: 8, fontWeight: 700,
              fontSize: 15, cursor: "pointer", letterSpacing: "0.05em",
              fontFamily: "'JetBrains Mono', monospace",
              transition: "all 0.2s", boxShadow: `0 0 24px ${ACCENT}40`,
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 40px ${ACCENT}70`)}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 24px ${ACCENT}40`)}>
            View My Work ↓
          </button>
          <a href="https://drive.google.com/file/d/1uXPipbplMNvSRy67olJzTWVWdvJSgHgp/view" target="_blank" rel="noreferrer"
            style={{
              background: "transparent", color: "#f0f6ff", border: `1px solid ${BORDER}`,
              padding: "14px 32px", borderRadius: 8, fontWeight: 600,
              fontSize: 15, cursor: "pointer", textDecoration: "none",
              fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = ACCENT; (e.currentTarget as HTMLElement).style.color = ACCENT; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; (e.currentTarget as HTMLElement).style.color = "#f0f6ff"; }}>
            Download Resume ↗
          </a>
        </div>

        {/* Scroll hint */}
        <div style={{ marginTop: 80, color: "#374151", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em" }}>
          ↓ scroll to explore
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ marginBottom: 12, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: ACCENT, letterSpacing: "0.15em" }}>
      // {text}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, color: "#f0f6ff", marginBottom: 16, lineHeight: 1.2 }}>
      {children}
    </h2>
  );
}

function About() {
  return (
    <section id="about" className="section-hidden" style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <SectionLabel text="about_me" />
      <SectionTitle>Who I Am</SectionTitle>
      <p style={{ color: "#6b7280", marginBottom: 60, fontFamily: "Inter, sans-serif", maxWidth: 520, lineHeight: 1.7 }}>
        A threat-aware security professional with hands-on SOC training and a passion for blue team operations.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 64, alignItems: "start" }}>
        {/* Profile photo */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div style={{
            width: 200, height: 200, borderRadius: "50%",
            background: `linear-gradient(135deg, ${ACCENT}60, ${GREEN}40)`,
            padding: 3,
          }}>
            <div style={{
              width: "100%", height: "100%", borderRadius: "50%",
              background: CARD, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 72, overflow: "hidden",
            }}>
              <img src="https://avatars.githubusercontent.com/u/136049027?v=4" alt="Chandraprakash"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
          </div>
          {/* Status dot */}
          <div style={{
            position: "absolute", bottom: 12, right: 12,
            background: CARD, border: `2px solid ${BG}`,
            borderRadius: "50%", padding: 3,
          }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: GREEN, animation: "pulse 2s infinite" }} />
          </div>
        </div>

        {/* Bio + stats */}
        <div>
          <p style={{ color: "#d1d5db", fontFamily: "Inter, sans-serif", fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>
            B.Sc Computer Science graduate from <span style={{ color: ACCENT }}>GTN Arts College, Dindigul</span>, with a strong focus on
            cybersecurity, SOC operations, threat detection, and incident response. I build hands-on skills through TryHackMe's
            SOC Level 1 & Level 2 learning paths and real security projects — from SIEM platforms to honeypots.
          </p>
          <p style={{ color: "#9ca3af", fontFamily: "Inter, sans-serif", fontSize: 15, lineHeight: 1.7, marginBottom: 40 }}>
            I'm drawn to the analytical side of security: log analysis, alert triage, threat hunting, and building automated detection pipelines.
            My goal is to land an <span style={{ color: GREEN }}>L1 SOC Analyst</span> role and grow into threat intelligence and incident response.
          </p>

          {/* Quick stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { value: "Top 1%", label: "TryHackMe Rank", color: GREEN },
              { value: "149+", label: "Rooms Completed", color: ACCENT },
              { value: "500+", label: "Hours in SIEM", color: "#a78bfa" },
            ].map(s => (
              <div key={s.label} className="glow-card" style={{
                background: CARD, border: `1px solid ${BORDER}`,
                borderRadius: 12, padding: "20px 16px", textAlign: "center",
                transition: "all 0.3s",
              }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 26, fontWeight: 700, color: s.color, marginBottom: 6 }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#6b7280", letterSpacing: "0.05em" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-hidden" style={{ padding: "100px 24px", background: `${CARD}50` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionLabel text="technical_skills" />
        <SectionTitle>What I Work With</SectionTitle>
        <p style={{ color: "#6b7280", marginBottom: 60, fontFamily: "Inter, sans-serif", maxWidth: 480, lineHeight: 1.7 }}>
          Organized by domain — no progress bars, just real tools I've used in labs, CTFs, and projects.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
          {SKILLS_DATA.map(cat => (
            <div key={cat.title} className="glow-card" style={{
              background: CARD, border: `1px solid ${BORDER}`,
              borderRadius: 14, padding: 24, transition: "all 0.3s",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <span style={{ fontSize: 22 }}>{cat.icon}</span>
                <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: ACCENT, fontWeight: 600, letterSpacing: "0.05em" }}>
                  {cat.title}
                </h3>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cat.skills.map(sk => (
                  <span key={sk} className="skill-pill" style={{
                    background: `${ACCENT}10`, border: `1px solid ${ACCENT}30`,
                    borderRadius: 6, padding: "5px 12px",
                    fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9ca3af",
                    cursor: "default", transition: "all 0.2s", letterSpacing: "0.02em",
                  }}>
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section-hidden" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <SectionLabel text="education" />
        <SectionTitle>Academic Background</SectionTitle>

        <div style={{ position: "relative", marginTop: 48 }}>
          {/* Timeline line */}
          <div style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${ACCENT}60, transparent)` }} />

          <div style={{ paddingLeft: 56, position: "relative" }}>
            {/* Dot */}
            <div style={{
              position: "absolute", left: 12, top: 24,
              width: 18, height: 18, borderRadius: "50%",
              background: ACCENT, border: `3px solid ${BG}`,
              boxShadow: `0 0 12px ${ACCENT}`,
            }} />

            <div className="glow-card" style={{
              background: CARD, border: `1px solid ${BORDER}`,
              borderRadius: 16, padding: 32, transition: "all 0.3s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                <div>
                  <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: 20, color: "#f0f6ff", fontWeight: 700, marginBottom: 6 }}>
                    B.Sc Computer Science
                  </h3>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: ACCENT }}>
                    GTN Arts College, Dindigul
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{
                    background: `${GREEN}20`, border: `1px solid ${GREEN}50`,
                    borderRadius: 6, padding: "4px 12px", fontSize: 12,
                    color: GREEN, fontFamily: "'JetBrains Mono', monospace",
                    marginBottom: 8,
                  }}>
                    COMPLETED
                  </div>
                  <div style={{ color: "#6b7280", fontFamily: "Inter, sans-serif", fontSize: 13 }}>2023 – 2026</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
                <div style={{ color: "#9ca3af", fontFamily: "Inter, sans-serif", fontSize: 14 }}>
                  CGPA: <span style={{ color: ACCENT, fontFamily: "'JetBrains Mono', monospace" }}>8.01</span>
                </div>
              </div>

              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#4b5563", letterSpacing: "0.1em", marginBottom: 12 }}>
                  // RELEVANT COURSEWORK
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Computer Networks", "Cryptography & Network Security", "Operating Systems", "Data Structures & Algorithms", "Database Management Systems", "Web Technologies", "Software Engineering"].map(c => (
                    <span key={c} style={{
                      background: `${ACCENT}08`, border: `1px solid ${BORDER}`,
                      borderRadius: 6, padding: "4px 12px",
                      fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9ca3af",
                    }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section-hidden" style={{ padding: "100px 24px", background: `${CARD}50` }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <SectionLabel text="practical_exposure" />
        <SectionTitle>Hands-On Experience</SectionTitle>

        <div style={{ position: "relative", marginTop: 48 }}>
          <div style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${GREEN}60, transparent)` }} />

          <div style={{ paddingLeft: 56, position: "relative" }}>
            <div style={{ position: "absolute", left: 12, top: 24, width: 18, height: 18, borderRadius: "50%", background: GREEN, border: `3px solid ${BG}`, boxShadow: `0 0 12px ${GREEN}` }} />

            <div className="glow-card" style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 32, transition: "all 0.3s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
                <div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                    <span style={{ background: `${ACCENT}20`, border: `1px solid ${ACCENT}40`, borderRadius: 4, padding: "2px 10px", fontSize: 11, color: ACCENT, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em" }}>LAB</span>
                  </div>
                  <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: 18, color: "#f0f6ff", fontWeight: 700, marginBottom: 4 }}>
                    TryHackMe Cybersecurity Training
                  </h3>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: GREEN }}>TryHackMe · Hands-on Cybersecurity Training</p>
                </div>
                <div style={{ background: `${GREEN}15`, border: `1px solid ${GREEN}40`, borderRadius: 6, padding: "4px 12px", fontSize: 12, color: GREEN, fontFamily: "'JetBrains Mono', monospace" }}>
                  CURRENT
                </div>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "Completed SOC Level 1 path — mastering SIEM fundamentals, log analysis, and alert triage workflows",
                  "Currently progressing through SOC Level 2 — covering threat hunting, detection engineering, and IR procedures",
                  "Completed 149+ rooms achieving Top 1% global ranking with 17,374 points and 28 badges",
                  "Investigated real-world attack scenarios: phishing, ransomware, network intrusions, and credential attacks",
                ].map((pt, i) => (
                  <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ color: ACCENT, fontFamily: "'JetBrains Mono', monospace", fontSize: 14, flexShrink: 0, marginTop: 1 }}>›</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#9ca3af", lineHeight: 1.6 }}>{pt}</span>
                  </li>
                ))}
              </ul>

              {/* Stats row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
                {[{ v: "Top 1%", l: "THM Rank" }, { v: "149", l: "Rooms" }, { v: "28", l: "Badges" }, { v: "17,374", l: "Points" }].map(s => (
                  <div key={s.l} style={{ background: `${BG}80`, borderRadius: 8, padding: 12, textAlign: "center" }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, fontWeight: 700, color: GREEN }}>{s.v}</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#4b5563" }}>{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Focus areas */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["SOC Level 1", "SOC Level 2", "Cyber Defense", "Incident Response", "Threat Hunting", "Pre Security"].map(t => (
                  <span key={t} className="skill-pill" style={{ background: `${GREEN}10`, border: `1px solid ${GREEN}30`, borderRadius: 6, padding: "4px 12px", fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9ca3af", transition: "all 0.2s" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const CAT_COLORS: Record<string, string> = {
  defensive: "#00D4FF",
  forensics: "#a78bfa",
  tools: "#00FF88",
  labs: "#f59e0b",
};

function Projects() {
  const [filter, setFilter] = useState("all");
  const cats = ["all", "defensive", "forensics", "tools", "labs"];
  const filtered = filter === "all" ? PROJECTS_DATA : PROJECTS_DATA.filter(p => p.cat === filter);

  return (
    <section id="projects" className="section-hidden" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionLabel text="projects" />
        <SectionTitle>Security Projects</SectionTitle>
        <p style={{ color: "#6b7280", marginBottom: 40, fontFamily: "Inter, sans-serif", maxWidth: 480, lineHeight: 1.7 }}>
          Real tools I've built — SIEMs, honeypots, phishing detectors, log analyzers.
        </p>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              style={{
                background: filter === c ? ACCENT : "transparent",
                border: `1px solid ${filter === c ? ACCENT : BORDER}`,
                color: filter === c ? BG : "#9ca3af",
                borderRadius: 6, padding: "6px 16px", fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace", cursor: "pointer",
                letterSpacing: "0.05em", transition: "all 0.2s",
              }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
          {filtered.map(p => (
            <div key={p.title} className="proj-card" style={{
              background: CARD, border: `1px solid ${BORDER}`,
              borderRadius: 16, padding: 24, transition: "all 0.3s",
              display: "flex", flexDirection: "column",
            }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <span style={{
                    background: `${CAT_COLORS[p.cat] || ACCENT}20`,
                    border: `1px solid ${CAT_COLORS[p.cat] || ACCENT}40`,
                    borderRadius: 4, padding: "2px 10px", fontSize: 10,
                    color: CAT_COLORS[p.cat] || ACCENT, fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: "0.1em", marginBottom: 10, display: "inline-block",
                  }}>
                    {p.cat.toUpperCase()}
                  </span>
                  <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, color: "#f0f6ff", fontWeight: 700 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#4b5563", marginTop: 2 }}>
                    {p.subtitle}
                  </p>
                </div>
              </div>

              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#9ca3af", lineHeight: 1.7, marginBottom: 16, flexGrow: 1 }}>
                {p.desc}
              </p>

              {/* Metrics */}
              <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                {p.metrics.map(m => (
                  <div key={m.l} style={{ background: `${BG}80`, borderRadius: 8, padding: "8px 14px" }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, fontWeight: 700, color: CAT_COLORS[p.cat] || ACCENT }}>{m.v}</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "#4b5563" }}>{m.l}</div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                {p.tags.map(t => (
                  <span key={t} style={{ background: `${ACCENT}08`, border: `1px solid ${BORDER}`, borderRadius: 4, padding: "3px 10px", fontFamily: "Inter, sans-serif", fontSize: 11, color: "#6b7280" }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <a href={p.github} target="_blank" rel="noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  border: `1px solid ${BORDER}`, borderRadius: 8, padding: "10px",
                  color: "#9ca3af", fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                  textDecoration: "none", transition: "all 0.2s", letterSpacing: "0.05em",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = ACCENT; (e.currentTarget as HTMLElement).style.color = ACCENT; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; (e.currentTarget as HTMLElement).style.color = "#9ca3af"; }}>
                ⬡ View on GitHub ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certs" className="section-hidden" style={{ padding: "100px 24px", background: `${CARD}50` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionLabel text="certifications" />
        <SectionTitle>Credentials</SectionTitle>
        <p style={{ color: "#6b7280", marginBottom: 60, fontFamily: "Inter, sans-serif", maxWidth: 480, lineHeight: 1.7 }}>
          Verified certifications and completed courses in cybersecurity and SOC operations.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
          {CERTS_DATA.map(cert => (
            <div key={cert.title} className="cert-card" style={{
              background: CARD, border: `1px solid ${BORDER}`,
              borderRadius: 16, padding: 24, transition: "all 0.3s",
              display: "flex", flexDirection: "column",
            }}>
              {/* Status */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#4b5563", letterSpacing: "0.05em" }}>
                  {cert.issuer}
                </span>
                <span style={{
                  background: `${GREEN}15`, border: `1px solid ${GREEN}40`,
                  borderRadius: 4, padding: "2px 10px", fontSize: 10,
                  color: GREEN, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em",
                }}>
                  ✓ {cert.status}
                </span>
              </div>

              {/* Icon placeholder */}
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: `${cert.color}20`, border: `1px solid ${cert.color}40`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, marginBottom: 16,
              }}>
                🛡️
              </div>

              <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, color: "#f0f6ff", fontWeight: 700, marginBottom: 6, lineHeight: 1.4, flexGrow: 1 }}>
                {cert.title}
              </h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#4b5563", marginBottom: 16 }}>
                {cert.date}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                {cert.skills.slice(0, 3).map(s => (
                  <span key={s} style={{ background: `${cert.color}10`, border: `1px solid ${cert.color}25`, borderRadius: 4, padding: "3px 8px", fontSize: 10, color: "#6b7280", fontFamily: "Inter, sans-serif" }}>
                    {s}
                  </span>
                ))}
              </div>

              <a href={cert.link} target="_blank" rel="noreferrer"
                style={{
                  display: "block", textAlign: "center",
                  border: `1px solid ${BORDER}`, borderRadius: 8, padding: "8px",
                  color: "#6b7280", fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                  textDecoration: "none", transition: "all 0.2s", letterSpacing: "0.05em",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = cert.color; (e.currentTarget as HTMLElement).style.color = cert.color; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; (e.currentTarget as HTMLElement).style.color = "#6b7280"; }}>
                Verify Certificate ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="section-hidden" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <SectionLabel text="contact" />
        <SectionTitle>Get In Touch</SectionTitle>

        {/* Status indicator */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 48, background: `${GREEN}12`, border: `1px solid ${GREEN}30`, borderRadius: 8, padding: "10px 20px" }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: GREEN, animation: "pulse 2s infinite" }} />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: GREEN }}>
            Currently open to opportunities
          </span>
        </div>

        {/* Social links */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
          {[
            { icon: "✉", label: "cyberchandru87@gmail.com", href: "mailto:cyberchandru87@gmail.com" },
            { icon: "in", label: "LinkedIn", href: "https://www.linkedin.com/in/chandraprakash-soc/" },
            { icon: "⬡", label: "GitHub", href: "https://github.com/0xchandru" },
            { icon: "🎯", label: "TryHackMe", href: "https://tryhackme.com/p/0xchandru" },
          ].map(link => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 10,
                background: CARD, border: `1px solid ${BORDER}`,
                borderRadius: 10, padding: "12px 20px",
                color: "#9ca3af", fontFamily: "Inter, sans-serif", fontSize: 13,
                textDecoration: "none", transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = ACCENT; (e.currentTarget as HTMLElement).style.color = ACCENT; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; (e.currentTarget as HTMLElement).style.color = "#9ca3af"; }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: ACCENT }}>{link.icon}</span>
              {link.label}
            </a>
          ))}
        </div>

        {/* Contact form */}
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 32 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#4b5563", marginBottom: 24, letterSpacing: "0.1em" }}>
            // send_message.sh
          </div>

          {sent ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 18, color: GREEN, marginBottom: 8 }}>Message Sent!</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#6b7280" }}>I'll get back to you within 24 hours.</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { key: "name", label: "Name", type: "text", placeholder: "Your name" },
                { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: ACCENT, letterSpacing: "0.1em", display: "block", marginBottom: 8 }}>
                    {field.label}
                  </label>
                  <input type={field.type} placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                    style={{
                      width: "100%", background: `${BG}80`, border: `1px solid ${BORDER}`,
                      borderRadius: 8, padding: "12px 16px", color: "#f0f6ff",
                      fontFamily: "Inter, sans-serif", fontSize: 14,
                      outline: "none", transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                    onFocus={e => (e.target.style.borderColor = ACCENT)}
                    onBlur={e => (e.target.style.borderColor = BORDER)}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: ACCENT, letterSpacing: "0.1em", display: "block", marginBottom: 8 }}>
                  Message
                </label>
                <textarea placeholder="Tell me about the opportunity..." rows={4}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{
                    width: "100%", background: `${BG}80`, border: `1px solid ${BORDER}`,
                    borderRadius: 8, padding: "12px 16px", color: "#f0f6ff",
                    fontFamily: "Inter, sans-serif", fontSize: 14,
                    outline: "none", resize: "vertical", transition: "border-color 0.2s",
                    boxSizing: "border-box",
                  }}
                  onFocus={e => (e.target.style.borderColor = ACCENT)}
                  onBlur={e => (e.target.style.borderColor = BORDER)}
                />
              </div>
              <button onClick={() => setSent(true)}
                style={{
                  background: ACCENT, color: BG, border: "none",
                  borderRadius: 8, padding: "14px 32px", fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em",
                  transition: "all 0.2s", boxShadow: `0 0 24px ${ACCENT}30`,
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 40px ${ACCENT}60`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 24px ${ACCENT}30`)}>
                Send Message →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer style={{ borderTop: `1px solid ${BORDER}`, padding: "40px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: ACCENT }}>
          &gt; 0xchandru
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {NAV_LINKS.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)}
              style={{ background: "none", border: "none", color: "#4b5563", fontFamily: "Inter, sans-serif", fontSize: 12, cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
              onMouseLeave={e => (e.currentTarget.style.color = "#4b5563")}>
              {l.label}
            </button>
          ))}
        </div>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#374151" }}>
          Built for SOC. Designed to impress.
        </div>
      </div>
    </footer>
  );
}

export function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showBackTop, setShowBackTop] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Inject styles
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = styles;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  // Scroll tracking for navbar + back-to-top
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const onScroll = () => {
      setShowBackTop(root.scrollTop > 400);
      const sections = ["hero", "about", "skills", "education", "experience", "projects", "certs", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    root.addEventListener("scroll", onScroll);
    return () => root.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection Observer for fade-in
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("section-visible");
          e.target.classList.remove("section-hidden");
        }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".section-hidden").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={rootRef} id="portfolio-root" style={{
      background: BG, minHeight: "100vh", overflowY: "auto",
      fontFamily: "Inter, sans-serif", scrollBehavior: "smooth",
      position: "relative",
    }}>
      <Navbar activeSection={activeSection} />
      <Hero />
      <About />
      <Skills />
      <Education />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />

      {/* Back to top */}
      {showBackTop && (
        <button className="back-top"
          onClick={() => rootRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed", bottom: 32, right: 32,
            background: CARD, border: `1px solid ${BORDER}`,
            color: ACCENT, width: 44, height: 44, borderRadius: "50%",
            fontSize: 18, cursor: "pointer", transition: "all 0.2s",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)", zIndex: 200,
          }}>
          ↑
        </button>
      )}
    </div>
  );
}

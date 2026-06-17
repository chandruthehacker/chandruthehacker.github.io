import { useEffect, useRef, useState, useCallback } from "react";

/* ─── DESIGN TOKENS ─────────────────────────────────────────────── */
const CSS = `
  *{box-sizing:border-box;margin:0;padding:0;}
  @keyframes blob1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(60px,-40px) scale(1.15)}66%{transform:translate(-30px,30px) scale(0.9)}}
  @keyframes blob2{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-50px,60px) scale(0.85)}66%{transform:translate(70px,-20px) scale(1.1)}}
  @keyframes blob3{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(40px,50px) scale(1.1)}66%{transform:translate(-60px,-40px) scale(0.9)}}
  @keyframes float{0%,100%{transform:translateY(0px) rotate(0deg)}50%{transform:translateY(-18px) rotate(2deg)}}
  @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
  @keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
  @keyframes scaleIn{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}
  @keyframes glow{0%,100%{box-shadow:0 0 20px #7c3aed30}50%{box-shadow:0 0 50px #7c3aed60,0 0 80px #06b6d420}}
  @keyframes spin-slow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes pulse-ring{0%{transform:scale(0.9);opacity:0.7}100%{transform:scale(1.15);opacity:0}}
  @keyframes gradient-shift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}

  .reveal{opacity:0;transform:translateY(36px);transition:opacity 0.7s cubic-bezier(.16,1,.3,1),transform 0.7s cubic-bezier(.16,1,.3,1);}
  .reveal.visible{opacity:1;transform:none;}
  .reveal-left{opacity:0;transform:translateX(-40px);transition:opacity 0.7s cubic-bezier(.16,1,.3,1),transform 0.7s cubic-bezier(.16,1,.3,1);}
  .reveal-left.visible{opacity:1;transform:none;}
  .reveal-right{opacity:0;transform:translateX(40px);transition:opacity 0.7s cubic-bezier(.16,1,.3,1),transform 0.7s cubic-bezier(.16,1,.3,1);}
  .reveal-right.visible{opacity:1;transform:none;}
  .reveal-scale{opacity:0;transform:scale(0.9);transition:opacity 0.6s cubic-bezier(.16,1,.3,1),transform 0.6s cubic-bezier(.16,1,.3,1);}
  .reveal-scale.visible{opacity:1;transform:none;}

  .delay-1{transition-delay:0.1s!important;}
  .delay-2{transition-delay:0.2s!important;}
  .delay-3{transition-delay:0.3s!important;}
  .delay-4{transition-delay:0.4s!important;}
  .delay-5{transition-delay:0.5s!important;}

  .proj-card{position:relative;overflow:hidden;cursor:pointer;transition:transform 0.4s cubic-bezier(.16,1,.3,1),box-shadow 0.4s ease;}
  .proj-card:hover{transform:translateY(-8px);box-shadow:0 32px 80px rgba(124,58,237,0.25)!important;}
  .proj-card .proj-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(5,8,22,0.97) 0%,rgba(5,8,22,0.6) 50%,transparent 100%);opacity:0;transition:opacity 0.4s ease;}
  .proj-card:hover .proj-overlay{opacity:1;}
  .proj-card .proj-info{position:absolute;bottom:0;left:0;right:0;padding:24px;transform:translateY(16px);transition:transform 0.4s cubic-bezier(.16,1,.3,1);opacity:0;}
  .proj-card:hover .proj-info{transform:none;opacity:1;}
  .proj-card img{transition:transform 0.6s cubic-bezier(.16,1,.3,1);}
  .proj-card:hover img{transform:scale(1.06);}

  .skill-tag{transition:all 0.25s ease;cursor:default;}
  .skill-tag:hover{transform:translateY(-2px);}

  .cert-card{transition:transform 0.35s cubic-bezier(.16,1,.3,1),box-shadow 0.35s ease;}
  .cert-card:hover{transform:translateY(-6px);box-shadow:0 24px 60px rgba(124,58,237,0.2)!important;}
  .cert-card img{transition:transform 0.5s ease;}
  .cert-card:hover img{transform:scale(1.04);}

  .nav-link-item{position:relative;transition:color 0.2s;}
  .nav-link-item::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1.5px;background:linear-gradient(90deg,#7c3aed,#06b6d4);transition:width 0.3s ease;}
  .nav-link-item:hover::after,.nav-link-item.active::after{width:100%;}

  .btn-primary{transition:all 0.3s ease;background:linear-gradient(135deg,#7c3aed,#2563eb);}
  .btn-primary:hover{box-shadow:0 8px 32px rgba(124,58,237,0.5);transform:translateY(-2px);}

  .btn-outline{transition:all 0.3s ease;}
  .btn-outline:hover{background:rgba(255,255,255,0.06);transform:translateY(-2px);}

  .glass{background:rgba(255,255,255,0.03);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);}
  .grad-text{background:linear-gradient(135deg,#a78bfa 0%,#60a5fa 50%,#34d399 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite;}
  .grad-border{border:1px solid transparent;background-clip:padding-box;position:relative;}
  .grad-border::before{content:'';position:absolute;inset:-1px;border-radius:inherit;background:linear-gradient(135deg,rgba(124,58,237,0.5),rgba(6,182,212,0.3));z-index:-1;}

  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{background:transparent;}
  ::-webkit-scrollbar-thumb{background:linear-gradient(#7c3aed,#06b6d4);border-radius:4px;}

  .timeline-line{position:absolute;left:20px;top:0;bottom:0;width:2px;background:linear-gradient(to bottom,#7c3aed,#2563eb,#06b6d4,transparent);}
  .timeline-dot{position:absolute;left:12px;width:18px;height:18px;border-radius:50%;border:2px solid #050816;background:linear-gradient(135deg,#7c3aed,#06b6d4);box-shadow:0 0 16px #7c3aed80;}

  .stat-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:24px;text-align:center;transition:all 0.3s ease;}
  .stat-card:hover{background:rgba(255,255,255,0.06);border-color:rgba(124,58,237,0.4);transform:translateY(-4px);}

  input:focus,textarea:focus{outline:none;border-color:#7c3aed!important;box-shadow:0 0 0 3px rgba(124,58,237,0.15)!important;}
`;

/* ─── DATA ───────────────────────────────────────────────────────── */
const ROLES = ["SOC Analyst", "Threat Hunter", "Incident Responder", "Blue Team Defender"];

const NAV = ["About","Skills","Education","Experience","Projects","Certs","Contact"];

const SKILLS = [
  { cat: "SOC Core Tools", color: "#7c3aed", bg: "rgba(124,58,237,0.12)", items: ["Splunk","Microsoft Sentinel","ELK Stack","Wazuh","Zeek","Suricata IDS"] },
  { cat: "Incident Response", color: "#2563eb", bg: "rgba(37,99,235,0.12)", items: ["Alert Triage","MITRE ATT&CK","Phishing Analysis","IOC Analysis","EDR Tools","NIST IR Lifecycle"] },
  { cat: "Network Defense", color: "#0891b2", bg: "rgba(8,145,178,0.12)", items: ["Wireshark","TCP/IP Analysis","Firewall Logs","NetFlow","VPN Monitoring","Nmap"] },
  { cat: "Threat Detection", color: "#059669", bg: "rgba(5,150,105,0.12)", items: ["Sigma Rules","YARA Rules","SIEM Querying","OSINT","Log Analysis","Regex"] },
  { cat: "Automation & Scripting", color: "#d97706", bg: "rgba(217,119,6,0.12)", items: ["Python","Bash","PowerShell","SOAR Basics","API Integration","Git"] },
  { cat: "Security Fundamentals", color: "#dc2626", bg: "rgba(220,38,38,0.12)", items: ["Windows Event Logs","Linux Auditing","Active Directory","OWASP Top 10","Encryption","CTF Experience"] },
];

const PROJECTS = [
  { title:"SenSIEM", subtitle:"Open-Source SIEM & Alerting Platform", img:"/__mockup/images/sensiem.webp", tags:["FastAPI","SQLite","Next.js","WebSockets","SIEM"], metrics:[{v:"35+",l:"Detection Rules"},{v:"3",l:"Alert Channels"}], cat:"Defensive", catColor:"#7c3aed", github:"https://github.com/0xchandru/SenSIEM", desc:"Lightweight SIEM with real-time log ingestion, 35+ detection rules, Splunk-style search, and multi-channel alerting." },
  { title:"AI Phishing Detector", subtitle:"NLP-powered Email Threat Classification", img:"/__mockup/images/phishing-detector.webp", tags:["Python","Google Gemini","NLP","Email Security"], metrics:[{v:"90%",l:"Accuracy"},{v:"20%",l:"Fewer FP"}], cat:"AI / Forensics", catColor:"#2563eb", github:"https://github.com/0xchandru/phishing-email-detector", desc:"Uses Google Gemini AI to classify phishing emails with 90% accuracy on 100+ real samples." },
  { title:"Log Analysis Tool", subtitle:"CLI Threat Detection from Raw Logs", img:"/__mockup/images/log-parser.webp", tags:["Python","Pandas","Regex","Log Analysis"], metrics:[{v:"60%",l:"Faster"},{v:"90%",l:"Detection"}], cat:"Tools", catColor:"#059669", github:"https://github.com/0xchandru/log-parser", desc:"Auto-detects Apache, Nginx, SSH, syslog formats. Identifies brute-force, geo-anomalies, suspicious sudo." },
  { title:"HoneyAuth", subtitle:"Decoy Login Honeypot for Attacker Intel", img:"/__mockup/images/honeypot.webp", tags:["Python","Flask","GeoIP","Deception Tech"], metrics:[{v:"200+",l:"Attacks Caught"},{v:"12",l:"Countries"}], cat:"Defensive", catColor:"#7c3aed", github:"https://github.com/0xchandru/honeypot", desc:"Flask-based decoy portal capturing 200+ malicious attempts, mapped to 12 countries over 14 days." },
  { title:"Password Strength Checker", subtitle:"Real-time Credential Security Analyzer", img:"/__mockup/images/password-checker.webp", tags:["JavaScript","HTML/CSS","Entropy Analysis"], metrics:[{v:"100%",l:"Weak Detection"},{v:"100+",l:"Samples"}], cat:"Tools", catColor:"#059669", github:"https://github.com/0xchandru/password-strength-checker", desc:"Client-side entropy scoring with real-time feedback on weak patterns and dictionary words." },
];

const CERTS = [
  { img:"/__mockup/images/cert-tryhackme.webp", issuer:"TryHackMe", title:"SOC Level 1", date:"June 2026", verified:true, link:"https://tryhackme.com/certificate/THM-WUPYOBHE0K", accent:"#06b6d4" },
  { img:"/__mockup/images/cert-ibm.webp", issuer:"IBM", title:"Cybersecurity Professional Analyst", date:"June 2026", verified:true, link:"https://www.coursera.org/account/accomplishments/specialization/US4R3ZXUCFTD", accent:"#7c3aed" },
  { img:"/__mockup/images/cert-google.webp", issuer:"Google", title:"Cybersecurity Professional Certificate", date:"April 2025", verified:true, link:"https://www.coursera.org/account/accomplishments/professional-cert/TGJE3FRTFS2N", accent:"#2563eb" },
  { img:"/__mockup/images/cert-internshala.webp", issuer:"Internshala / NSDC", title:"Ethical Hacking", date:"November 2024", verified:true, link:"https://trainings.internshala.com/certificate/view/nsdc/1gvfiyruzvc/fj2c4mq927_/", accent:"#059669" },
];

/* ─── HOOKS ──────────────────────────────────────────────────────── */
function useTypewriter(words: string[]) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[idx];
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), 1800); return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false); setIdx((idx + 1) % words.length); return;
    }
    const speed = deleting ? 40 : 75;
    const t = setTimeout(() => setText(deleting ? text.slice(0, -1) : word.slice(0, text.length + 1)), speed);
    return () => clearTimeout(t);
  }, [text, deleting, idx, words]);
  return text;
}

function useCountUp(target: number, trigger: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0; const step = target / (duration / 16);
    const t = setInterval(() => { start += step; if (start >= target) { setVal(target); clearInterval(t); } else setVal(Math.floor(start)); }, 16);
    return () => clearInterval(t);
  }, [trigger, target, duration]);
  return val;
}

function useIntersection(ref: React.RefObject<Element>, opts = {}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15, ...opts });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

/* ─── BACKGROUND BLOBS ───────────────────────────────────────────── */
function Blobs() {
  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.18) 0%,transparent 70%)", top: "-100px", left: "-150px", animation: "blob1 18s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(6,182,212,0.14) 0%,transparent 70%)", top: "40%", right: "-100px", animation: "blob2 22s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,0.12) 0%,transparent 70%)", bottom: "10%", left: "30%", animation: "blob3 20s ease-in-out infinite" }} />
      {/* Grid overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize: "60px 60px", opacity: 0.4 }} />
    </div>
  );
}

/* ─── NAVBAR ─────────────────────────────────────────────────────── */
function Navbar({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const el = document.getElementById("root-scroll");
    if (!el) return;
    const h = () => setScrolled(el.scrollTop > 50);
    el.addEventListener("scroll", h);
    return () => el.removeEventListener("scroll", h);
  }, []);
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, transition: "all 0.3s", background: scrolled ? "rgba(5,8,22,0.85)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 28px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <div style={{ fontSize: 22, fontWeight: 800, background: "linear-gradient(135deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.5px" }}>
          Chandraprakash
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {NAV.map(n => (
            <button key={n} className={`nav-link-item ${active.toLowerCase() === n.toLowerCase() ? "active" : ""}`}
              onClick={() => go(n === "Certs" ? "certs" : n.toLowerCase())}
              style={{ background: "none", border: "none", color: active.toLowerCase() === n.toLowerCase() ? "#a78bfa" : "#94a3b8", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'Inter',sans-serif", letterSpacing: "0.01em", padding: "4px 0" }}>
              {n}
            </button>
          ))}
          <a href="https://drive.google.com/file/d/1uXPipbplMNvSRy67olJzTWVWdvJSgHgp/view" target="_blank" rel="noreferrer"
            className="btn-primary"
            style={{ color: "#fff", textDecoration: "none", padding: "9px 22px", borderRadius: 10, fontSize: 13, fontWeight: 600, fontFamily: "'Inter',sans-serif", border: "none", cursor: "pointer" }}>
            Resume ↗
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─── HERO ───────────────────────────────────────────────────────── */
function Hero() {
  const typed = useTypewriter(ROLES);
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 28px", position: "relative" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr auto", gap: 80, alignItems: "center" }}>
        {/* Left text */}
        <div style={{ animation: "slideUp 0.9s cubic-bezier(.16,1,.3,1) both" }}>
          {/* Status badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 100, padding: "6px 16px", marginBottom: 28, fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#a78bfa", letterSpacing: "0.08em", fontWeight: 500 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399", display: "inline-block", animation: "pulse-ring 1.5s ease-out infinite" }} />
            Available for SOC Analyst Roles
          </div>

          {/* Greeting */}
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: "#94a3b8", marginBottom: 12, fontWeight: 400 }}>
            Hey there, I'm
          </p>

          {/* Name */}
          <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(44px,6vw,80px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-2px", color: "#f1f5f9", marginBottom: 20 }}>
            Chandra&shy;<br />
            <span className="grad-text">prakash</span>
          </h1>

          {/* Typewriter */}
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(18px,2.5vw,26px)", color: "#94a3b8", marginBottom: 24, minHeight: "1.4em", display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ color: "#a78bfa", fontWeight: 600 }}>→</span>
            <span style={{ color: "#e2e8f0", fontWeight: 500 }}>{typed}</span>
            <span style={{ borderRight: "2px solid #7c3aed", height: "1.1em", animation: "blink 1s step-end infinite", display: "inline-block" }} />
          </div>

          {/* Bio */}
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "#64748b", lineHeight: 1.8, marginBottom: 40, maxWidth: 540 }}>
            B.Sc Computer Science graduate from <span style={{ color: "#a78bfa" }}>GTN Arts College, Dindigul</span> — passionate about cybersecurity, SOC operations, threat detection, and building tools that defend systems.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 56 }}>
            <button className="btn-primary" onClick={() => go("projects")}
              style={{ color: "#fff", border: "none", padding: "14px 32px", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif", letterSpacing: "0.01em" }}>
              View Projects ↓
            </button>
            <a href="https://drive.google.com/file/d/1uXPipbplMNvSRy67olJzTWVWdvJSgHgp/view" target="_blank" rel="noreferrer"
              className="btn-outline"
              style={{ color: "#e2e8f0", textDecoration: "none", padding: "14px 32px", borderRadius: 12, fontSize: 15, fontWeight: 500, border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", fontFamily: "'Inter',sans-serif", display: "inline-flex", alignItems: "center", gap: 8 }}>
              Download Resume ↗
            </a>
          </div>

          {/* Quick stats */}
          <div style={{ display: "flex", gap: 36 }}>
            {[{ n: "Top 1%", l: "TryHackMe" }, { n: "149+", l: "Rooms" }, { n: "5", l: "Projects" }, { n: "4", l: "Certs" }].map(s => (
              <div key={s.l}>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 24, fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.5px" }}>{s.n}</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#475569" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Profile photo */}
        <div style={{ position: "relative", width: 340, height: 340, flexShrink: 0, animation: "float 6s ease-in-out infinite" }}>
          {/* Outer glow ring */}
          <div style={{ position: "absolute", inset: -20, borderRadius: "50%", background: "conic-gradient(from 0deg,#7c3aed,#2563eb,#06b6d4,#7c3aed)", animation: "spin-slow 8s linear infinite", opacity: 0.6 }} />
          <div style={{ position: "absolute", inset: -16, borderRadius: "50%", background: "#050816" }} />
          {/* Image container */}
          <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", border: "3px solid rgba(124,58,237,0.4)", zIndex: 1 }}>
            <img src="/__mockup/images/profile.webp" alt="Chandraprakash"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
              onError={e => { const el = e.currentTarget as HTMLImageElement; el.src = ""; el.style.background = "linear-gradient(135deg,#7c3aed,#06b6d4)"; }} />
          </div>
          {/* Floating badges */}
          <div style={{ position: "absolute", top: 20, right: -50, background: "rgba(124,58,237,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 12, padding: "10px 16px", animation: "float 4s ease-in-out infinite", zIndex: 2 }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 800, color: "#a78bfa" }}>Top 1%</div>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#64748b" }}>TryHackMe</div>
          </div>
          <div style={{ position: "absolute", bottom: 30, left: -50, background: "rgba(6,182,212,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(6,182,212,0.3)", borderRadius: 12, padding: "10px 16px", animation: "float 5s ease-in-out infinite 1s", zIndex: 2 }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 800, color: "#67e8f9" }}>149+</div>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#64748b" }}>Rooms Done</div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "#334155", animation: "float 2.5s ease-in-out infinite" }}>
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</div>
        <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom,rgba(124,58,237,0.5),transparent)" }} />
      </div>
    </section>
  );
}

/* ─── SECTION WRAPPER ────────────────────────────────────────────── */
function SecHead({ label, title, sub }: { label: string; title: string; sub?: string }) {
  return (
    <div style={{ marginBottom: 64, textAlign: "center" }}>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#7c3aed", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>{label}</p>
      <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(30px,4vw,48px)", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-1px", lineHeight: 1.1, marginBottom: sub ? 16 : 0 }}>{title}</h2>
      {sub && <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "#64748b", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}

/* ─── ABOUT ──────────────────────────────────────────────────────── */
function About() {
  const ref = useRef<HTMLElement>(null!);
  const v = useIntersection(ref);
  return (
    <section id="about" ref={ref} style={{ padding: "120px 28px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className={`reveal ${v ? "visible" : ""}`}>
          <SecHead label="About Me" title="Who I Am" sub="A detail-oriented security professional building real-world skills through hands-on labs and projects." />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
          {/* Left: bio */}
          <div className={`reveal-left ${v ? "visible" : ""}`}>
            <div className="glass grad-border" style={{ borderRadius: 24, padding: 40 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg,#7c3aed,#2563eb)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 24 }}>🛡️</div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 22, fontWeight: 700, color: "#f1f5f9", marginBottom: 16 }}>Cybersecurity & SOC Operations</h3>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "#94a3b8", lineHeight: 1.8, marginBottom: 20 }}>
                B.Sc Computer Science graduate from <span style={{ color: "#a78bfa" }}>GTN Arts College, Dindigul</span>, with a strong focus on SOC operations, threat detection, SIEM, log analysis, and incident response.
              </p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "#64748b", lineHeight: 1.8 }}>
                Currently progressing through TryHackMe's SOC Level 1 & Level 2 paths while building real security tools — from custom SIEMs to honeypots and phishing detectors.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
                {[
                  { icon: "🎓", text: "B.Sc Computer Science" },
                  { icon: "📍", text: "Dindigul, India" },
                  { icon: "💼", text: "Open to Opportunities" },
                ].map(b => (
                  <div key={b.text} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "7px 14px", fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#94a3b8" }}>
                    {b.icon} {b.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: highlights + stats */}
          <div className={`reveal-right ${v ? "visible" : ""}`} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { icon: "⚡", color: "#7c3aed", title: "SOC Training", desc: "TryHackMe SOC Level 1 completed, Level 2 in progress. Top 1% globally with 17,374 points." },
              { icon: "🔧", color: "#2563eb", title: "Security Tools Built", desc: "Built a custom SIEM (SenSIEM), honeypot, log analyzer, and AI-powered phishing detector." },
              { icon: "📜", color: "#06b6d4", title: "4 Certifications", desc: "IBM, Google, TryHackMe SOC Level 1, and Ethical Hacking — all verified." },
            ].map((item, i) => (
              <div key={item.title} className="glass" style={{ borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 16, alignItems: "flex-start", transition: "all 0.3s", cursor: "default" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${item.color}50`; (e.currentTarget as HTMLElement).style.transform = "translateX(4px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${item.color}20`, border: `1px solid ${item.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: "#f1f5f9", marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}

            {/* CGPA card */}
            <div className="glass" style={{ borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#64748b" }}>CGPA — GTN Arts College</div>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 28, fontWeight: 800, background: "linear-gradient(135deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>8.01</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SKILLS ─────────────────────────────────────────────────────── */
function Skills() {
  const ref = useRef<HTMLElement>(null!);
  const v = useIntersection(ref);

  return (
    <section id="skills" ref={ref} style={{ padding: "120px 28px", background: "rgba(255,255,255,0.01)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className={`reveal ${v ? "visible" : ""}`}>
          <SecHead label="Technical Skills" title="What I Work With" sub="Tools and technologies I've used in labs, CTFs, and real security projects." />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(330px,1fr))", gap: 20 }}>
          {SKILLS.map((cat, i) => (
            <div key={cat.cat} className={`reveal ${v ? "visible" : ""} delay-${Math.min(i + 1, 5)}`}
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: 28, transition: "all 0.35s ease", cursor: "default" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${cat.color}40`; el.style.background = `${cat.color}08`; el.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.06)"; el.style.background = "rgba(255,255,255,0.02)"; el.style.transform = "none"; }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: cat.color, boxShadow: `0 0 10px ${cat.color}` }} />
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: "#f1f5f9" }}>{cat.cat}</h3>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cat.items.map(sk => (
                  <span key={sk} className="skill-tag" style={{ background: cat.bg, border: `1px solid ${cat.color}30`, borderRadius: 8, padding: "5px 12px", fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>
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

/* ─── EDUCATION ──────────────────────────────────────────────────── */
function Education() {
  const ref = useRef<HTMLElement>(null!);
  const v = useIntersection(ref);

  return (
    <section id="education" ref={ref} style={{ padding: "120px 28px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className={`reveal ${v ? "visible" : ""}`}>
          <SecHead label="Education" title="Academic Background" />
        </div>

        <div className={`reveal ${v ? "visible" : ""} delay-1`} style={{ position: "relative", paddingLeft: 52 }}>
          <div className="timeline-line" />
          <div className="timeline-dot" style={{ top: 32 }} />

          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 24, padding: 40, transition: "all 0.35s ease" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.4)"; (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.05)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"; }}>

            <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
              {/* College image */}
              <div style={{ width: 80, height: 80, borderRadius: 16, overflow: "hidden", flexShrink: 0, border: "1px solid rgba(255,255,255,0.08)" }}>
                <img src="/__mockup/images/edu-gtn.png" alt="GTN Arts College"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={e => { const el = e.currentTarget.parentElement!; el.style.background = "linear-gradient(135deg,#7c3aed20,#2563eb20)"; (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 22, fontWeight: 800, color: "#f1f5f9", marginBottom: 4, letterSpacing: "-0.5px" }}>B.Sc Computer Science</h3>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "#a78bfa", fontWeight: 500 }}>GTN Arts College, Dindigul</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: 8, padding: "4px 14px", fontSize: 12, color: "#34d399", fontFamily: "'Inter',sans-serif", fontWeight: 600, marginBottom: 6, display: "inline-block" }}>
                      ✓ Completed
                    </div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#475569" }}>2023 – 2026</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 24, margin: "20px 0 24px", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "16px 0" }}>
                  <div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 24, fontWeight: 800, background: "linear-gradient(135deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>8.01</div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#475569" }}>CGPA</div>
                  </div>
                </div>

                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#475569", marginBottom: 16 }}>Relevant Coursework</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Computer Networks","Cryptography & Network Security","Operating Systems","Data Structures & Algorithms","Database Management Systems","Web Technologies","Software Engineering"].map(c => (
                    <span key={c} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "4px 12px", fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#64748b" }}>{c}</span>
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

/* ─── EXPERIENCE ─────────────────────────────────────────────────── */
function Experience() {
  const ref = useRef<HTMLElement>(null!);
  const v = useIntersection(ref);

  return (
    <section id="experience" ref={ref} style={{ padding: "120px 28px", background: "rgba(255,255,255,0.01)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className={`reveal ${v ? "visible" : ""}`}>
          <SecHead label="Experience" title="Practical Exposure" sub="Hands-on cybersecurity training translated into real skills." />
        </div>

        <div style={{ position: "relative", paddingLeft: 52 }}>
          <div className="timeline-line" style={{ background: "linear-gradient(to bottom,#06b6d4,#2563eb,#7c3aed,transparent)" }} />
          <div className="timeline-dot" style={{ top: 32, background: "linear-gradient(135deg,#06b6d4,#2563eb)" }} />

          <div className={`reveal ${v ? "visible" : ""} delay-1`}
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 24, padding: 40 }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
              <div>
                <div style={{ display: "inline-flex", gap: 8, marginBottom: 10 }}>
                  <span style={{ background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.3)", borderRadius: 6, padding: "3px 12px", fontSize: 11, color: "#67e8f9", fontFamily: "'Inter',sans-serif", fontWeight: 600, letterSpacing: "0.05em" }}>LAB TRAINING</span>
                </div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 22, fontWeight: 800, color: "#f1f5f9", marginBottom: 4, letterSpacing: "-0.5px" }}>TryHackMe Cybersecurity Training</h3>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#67e8f9" }}>TryHackMe · Hands-on Cybersecurity Training</p>
              </div>
              <span style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: 8, padding: "5px 14px", fontSize: 12, color: "#34d399", fontFamily: "'Inter',sans-serif", fontWeight: 600 }}>
                ● Active
              </span>
            </div>

            {/* Stats grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
              {[{ v: "Top 1%", l: "Global Rank", c: "#a78bfa" }, { v: "149", l: "Rooms Done", c: "#60a5fa" }, { v: "28", l: "Badges Earned", c: "#34d399" }, { v: "17,374", l: "Total Points", c: "#fbbf24" }].map(s => (
                <div key={s.l} className="stat-card">
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 20, fontWeight: 800, color: s.c, marginBottom: 4 }}>{s.v}</div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#475569" }}>{s.l}</div>
                </div>
              ))}
            </div>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              {[
                "Completed SOC Level 1 certification — mastering SIEM fundamentals, alert triage, log analysis, and SOC workflows",
                "Currently in SOC Level 2 — advancing into threat hunting, detection engineering, and IR procedures",
                "Investigated real-world attack scenarios: phishing, ransomware, network intrusions, and credential attacks",
                "Achieved Top 1% global ranking through consistent 149+ room completions and 28 badges",
              ].map((pt, i) => (
                <li key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(6,182,212,0.15)", border: "1px solid rgba(6,182,212,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#67e8f9", flexShrink: 0, marginTop: 2 }}>✓</span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#94a3b8", lineHeight: 1.7 }}>{pt}</span>
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["SOC Level 1 ✓","SOC Level 2 (Active)","Cyber Defense","Incident Response","Threat Hunting","Network Analysis","Digital Forensics"].map(t => (
                <span key={t} style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)", borderRadius: 8, padding: "5px 12px", fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#67e8f9", fontWeight: 500 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ───────────────────────────────────────────────────── */
function Projects() {
  const ref = useRef<HTMLElement>(null!);
  const v = useIntersection(ref);
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Defensive", "AI / Forensics", "Tools"];
  const shown = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === filter);

  return (
    <section id="projects" ref={ref} style={{ padding: "120px 28px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className={`reveal ${v ? "visible" : ""}`}>
          <SecHead label="Projects" title="Security Projects" sub="Real tools I've built — from custom SIEMs to AI-powered threat detectors." />
        </div>

        {/* Filter tabs */}
        <div className={`reveal ${v ? "visible" : ""} delay-1`} style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 52, flexWrap: "wrap" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              style={{
                background: filter === c ? "linear-gradient(135deg,#7c3aed,#2563eb)" : "rgba(255,255,255,0.04)",
                border: filter === c ? "none" : "1px solid rgba(255,255,255,0.07)",
                color: filter === c ? "#fff" : "#64748b",
                borderRadius: 10, padding: "8px 20px", fontSize: 13, fontWeight: 500, cursor: "pointer",
                fontFamily: "'Inter',sans-serif", transition: "all 0.25s ease",
              }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 24 }}>
          {shown.map((p, i) => (
            <div key={p.title} className={`proj-card reveal ${v ? "visible" : ""} delay-${Math.min(i + 1, 5)}`}
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, overflow: "hidden" }}>
              {/* Image */}
              <div style={{ height: 200, overflow: "hidden", position: "relative", background: "#0f172a" }}>
                <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                <div className="proj-overlay" />
                <div className="proj-info">
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 16, fontWeight: 700, color: "#f1f5f9", marginBottom: 4 }}>{p.title}</div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#94a3b8" }}>{p.desc.slice(0, 80)}…</div>
                </div>
                {/* Cat badge */}
                <div style={{ position: "absolute", top: 12, left: 12, background: `${p.catColor}20`, border: `1px solid ${p.catColor}40`, backdropFilter: "blur(8px)", borderRadius: 8, padding: "4px 12px", fontSize: 11, color: p.catColor, fontFamily: "'Inter',sans-serif", fontWeight: 600 }}>
                  {p.cat}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: 24 }}>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 800, color: "#f1f5f9", marginBottom: 4, letterSpacing: "-0.3px" }}>{p.title}</h3>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#475569", marginBottom: 12 }}>{p.subtitle}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#64748b", lineHeight: 1.7, marginBottom: 16 }}>{p.desc}</p>

                {/* Metrics */}
                <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                  {p.metrics.map(m => (
                    <div key={m.l} style={{ background: `${p.catColor}12`, border: `1px solid ${p.catColor}25`, borderRadius: 10, padding: "8px 14px", textAlign: "center" }}>
                      <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 17, fontWeight: 800, color: p.catColor }}>{m.v}</div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: "#475569" }}>{m.l}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 6, padding: "3px 10px", fontSize: 11, color: "#64748b", fontFamily: "'Inter',sans-serif" }}>{t}</span>
                  ))}
                </div>

                <a href={p.github} target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px", color: "#94a3b8", fontSize: 12, fontFamily: "'Inter',sans-serif", fontWeight: 500, textDecoration: "none", transition: "all 0.25s ease" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${p.catColor}50`; el.style.color = p.catColor; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.08)"; el.style.color = "#94a3b8"; }}>
                  ⬡ View on GitHub ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CERTIFICATIONS ─────────────────────────────────────────────── */
function Certs() {
  const ref = useRef<HTMLElement>(null!);
  const v = useIntersection(ref);

  return (
    <section id="certs" ref={ref} style={{ padding: "120px 28px", background: "rgba(255,255,255,0.01)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className={`reveal ${v ? "visible" : ""}`}>
          <SecHead label="Certifications" title="Credentials & Courses" sub="Verified certifications in cybersecurity, SOC operations, and ethical hacking." />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 24 }}>
          {CERTS.map((c, i) => (
            <div key={c.title} className={`cert-card reveal ${v ? "visible" : ""} delay-${Math.min(i + 1, 5)}`}
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, overflow: "hidden" }}>
              {/* Cert image */}
              <div style={{ height: 160, overflow: "hidden", background: "#0f172a", borderBottom: "1px solid rgba(255,255,255,0.05)", position: "relative" }}>
                <img src={c.img} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(5,8,22,0.8),transparent)" }} />
                {c.verified && (
                  <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.4)", backdropFilter: "blur(8px)", borderRadius: 8, padding: "3px 10px", fontSize: 10, color: "#34d399", fontFamily: "'Inter',sans-serif", fontWeight: 600 }}>
                    ✓ VERIFIED
                  </div>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: 20 }}>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: c.accent, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 6, textTransform: "uppercase" }}>{c.issuer}</p>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: "#f1f5f9", lineHeight: 1.4, marginBottom: 8 }}>{c.title}</h3>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#475569", marginBottom: 16 }}>{c.date}</p>
                <a href={c.link} target="_blank" rel="noreferrer"
                  style={{ display: "block", textAlign: "center", background: `${c.accent}10`, border: `1px solid ${c.accent}25`, borderRadius: 8, padding: "8px", fontSize: 12, color: c.accent, fontFamily: "'Inter',sans-serif", fontWeight: 500, textDecoration: "none", transition: "all 0.25s ease" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = `${c.accent}20`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = `${c.accent}10`; }}>
                  View Certificate ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ────────────────────────────────────────────────────── */
function Contact() {
  const ref = useRef<HTMLElement>(null!);
  const v = useIntersection(ref);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const socials = [
    { icon: "✉️", label: "Email", val: "cyberchandru87@gmail.com", href: "mailto:cyberchandru87@gmail.com", color: "#7c3aed" },
    { icon: "💼", label: "LinkedIn", val: "chandraprakash-soc", href: "https://www.linkedin.com/in/chandraprakash-soc/", color: "#2563eb" },
    { icon: "⬡", label: "GitHub", val: "0xchandru", href: "https://github.com/0xchandru", color: "#6b7280" },
    { icon: "🎯", label: "TryHackMe", val: "0xchandru", href: "https://tryhackme.com/p/0xchandru", color: "#06b6d4" },
  ];

  return (
    <section id="contact" ref={ref} style={{ padding: "120px 28px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div className={`reveal ${v ? "visible" : ""}`}>
          <SecHead label="Contact" title="Let's Connect" sub="Open to SOC Analyst, security analyst, and entry-level cybersecurity roles." />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          {/* Left */}
          <div className={`reveal-left ${v ? "visible" : ""}`}>
            {/* Status */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 12, padding: "16px 20px", marginBottom: 36 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#34d399", flexShrink: 0, boxShadow: "0 0 0 4px rgba(52,211,153,0.2)" }} />
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 600, color: "#34d399" }}>Open to Opportunities</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#475569" }}>SOC Analyst L1 & entry-level cybersecurity roles</div>
              </div>
            </div>

            <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 22, fontWeight: 800, color: "#f1f5f9", marginBottom: 12, letterSpacing: "-0.5px" }}>Get In Touch</h3>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "#64748b", lineHeight: 1.8, marginBottom: 32 }}>
              Whether you're looking to hire a SOC Analyst, collaborate on a security project, or just want to connect — I'd love to hear from you.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "14px 18px", textDecoration: "none", transition: "all 0.25s ease" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${s.color}40`; el.style.background = `${s.color}06`; el.style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.06)"; el.style.background = "rgba(255,255,255,0.02)"; el.style.transform = "none"; }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: `${s.color}15`, border: `1px solid ${s.color}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#475569", fontWeight: 500 }}>{s.label}</div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#94a3b8" }}>{s.val}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className={`reveal-right ${v ? "visible" : ""}`}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 24, padding: 36 }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <div style={{ fontSize: 52, marginBottom: 16 }}>🚀</div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 22, fontWeight: 800, color: "#34d399", marginBottom: 8 }}>Message Sent!</h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#64748b" }}>I'll respond within 24 hours.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 20, fontWeight: 700, color: "#f1f5f9", marginBottom: 4 }}>Send a Message</h3>
                  {[{ k: "name", l: "Your Name", t: "text", ph: "Chandraprakash" }, { k: "email", l: "Email Address", t: "email", ph: "your@email.com" }].map(f => (
                    <div key={f.k}>
                      <label style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#64748b", display: "block", marginBottom: 8, fontWeight: 500 }}>{f.l}</label>
                      <input type={f.t} placeholder={f.ph}
                        value={form[f.k as keyof typeof form]}
                        onChange={e => setForm({ ...form, [f.k]: e.target.value })}
                        style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 16px", color: "#f1f5f9", fontFamily: "'Inter',sans-serif", fontSize: 14, boxSizing: "border-box", transition: "all 0.25s ease" }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#64748b", display: "block", marginBottom: 8, fontWeight: 500 }}>Message</label>
                    <textarea placeholder="Tell me about the role or project..." rows={4}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 16px", color: "#f1f5f9", fontFamily: "'Inter',sans-serif", fontSize: 14, resize: "vertical", boxSizing: "border-box", transition: "all 0.25s ease" }} />
                  </div>
                  <button className="btn-primary" onClick={() => setSent(true)}
                    style={{ color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter',sans-serif", letterSpacing: "0.02em" }}>
                    Send Message →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────────── */
function Footer() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "40px 28px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 16, fontWeight: 800, background: "linear-gradient(135deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          Chandraprakash
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {NAV.map(n => (
            <button key={n} onClick={() => go(n === "Certs" ? "certs" : n.toLowerCase())}
              style={{ background: "none", border: "none", color: "#334155", fontSize: 13, cursor: "pointer", fontFamily: "'Inter',sans-serif", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#a78bfa")}
              onMouseLeave={e => (e.currentTarget.style.color = "#334155")}>
              {n}
            </button>
          ))}
        </div>
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#1e293b" }}>
          Built with passion. Designed to impress.
        </div>
      </div>
    </footer>
  );
}

/* ─── ROOT ───────────────────────────────────────────────────────── */
export function Portfolio() {
  const rootRef = useRef<HTMLDivElement>(null!);
  const [active, setActive] = useState("hero");
  const [showTop, setShowTop] = useState(false);

  // Inject CSS
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = CSS;
    document.head.appendChild(s);
    return () => s.remove();
  }, []);

  // Scroll tracking
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const handle = () => {
      setShowTop(el.scrollTop > 500);
      const secs = ["hero","about","skills","education","experience","projects","certs","contact"];
      for (const id of [...secs].reverse()) {
        const s = document.getElementById(id);
        if (s && s.getBoundingClientRect().top < 200) { setActive(id); break; }
      }
    };
    el.addEventListener("scroll", handle);
    return () => el.removeEventListener("scroll", handle);
  }, []);

  // IntersectionObserver — re-observe on mount
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={rootRef} id="root-scroll"
      style={{ background: "#050816", minHeight: "100vh", overflowY: "auto", overflowX: "hidden", position: "relative", fontFamily: "'Inter',sans-serif", scrollBehavior: "smooth" }}>
      <Blobs />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar active={active} />
        <Hero />
        <About />
        <Skills />
        <Education />
        <Experience />
        <Projects />
        <Certs />
        <Contact />
        <Footer />
      </div>

      {/* Back to top */}
      {showTop && (
        <button onClick={() => rootRef.current.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ position: "fixed", bottom: 32, right: 32, width: 46, height: 46, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#2563eb)", border: "none", color: "#fff", fontSize: 18, cursor: "pointer", zIndex: 200, boxShadow: "0 8px 32px rgba(124,58,237,0.5)", transition: "all 0.3s ease" }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "none")}>
          ↑
        </button>
      )}
    </div>
  );
}

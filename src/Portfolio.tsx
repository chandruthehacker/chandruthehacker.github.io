import { useEffect, useRef, useState } from "react";
import {
  ROLES, NAV_ITEMS, RESUME_URL, HERO_STATS,
  BIO, ABOUT_HIGHLIGHTS, SKILLS, EDUCATION, EXPERIENCE, PROJECTS, CERTS, SOCIALS,
} from "./data/constants";

/* ─── CSS ─────────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}

  :root {
    --bg:#050816;--bg2:#080d1f;--card:rgba(255,255,255,0.025);--card-h:rgba(255,255,255,0.055);
    --border:rgba(255,255,255,0.07);--border-h:rgba(255,255,255,0.16);--tp:#f1f5f9;--ts:#94a3b8;
    --tm:#475569;--nav-bg:rgba(5,8,22,0.72);--nav-border:rgba(255,255,255,0.10);
    --input-bg:rgba(255,255,255,0.05);--blob-o:1;--tag-bg:rgba(255,255,255,0.04);
    --tag-c:#64748b;--stat-bg:rgba(255,255,255,0.03);--grid-c:rgba(255,255,255,0.025);
    --exp-accent:#67e8f9;--exp-accent-bg:rgba(6,182,212,0.12);--exp-accent-border:rgba(6,182,212,0.3);
    --exp-accent-bg2:rgba(6,182,212,0.08);--exp-accent-border2:rgba(6,182,212,0.22);
  }
  :root.light {
    --bg:#f0f4ff;--bg2:#e8edf8;--card:rgba(255,255,255,0.75);--card-h:rgba(255,255,255,0.95);
    --border:rgba(0,0,0,0.08);--border-h:rgba(124,58,237,0.3);--tp:#0f172a;--ts:#334155;
    --tm:#64748b;--nav-bg:rgba(240,244,255,0.82);--nav-border:rgba(124,58,237,0.18);
    --input-bg:rgba(0,0,0,0.04);--blob-o:0.45;--tag-bg:rgba(124,58,237,0.07);
    --tag-c:#475569;--stat-bg:rgba(255,255,255,0.7);--grid-c:rgba(0,0,0,0.03);
    --exp-accent:#0369a1;--exp-accent-bg:rgba(3,105,161,0.1);--exp-accent-border:rgba(3,105,161,0.28);
    --exp-accent-bg2:rgba(3,105,161,0.07);--exp-accent-border2:rgba(3,105,161,0.2);
  }

  @keyframes blob1{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(70px,-50px) scale(1.15)}70%{transform:translate(-40px,40px) scale(0.9)}}
  @keyframes blob2{0%,100%{transform:translate(0,0) scale(1)}35%{transform:translate(-60px,70px) scale(0.85)}70%{transform:translate(80px,-30px) scale(1.1)}}
  @keyframes blob3{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(50px,60px) scale(1.1)}70%{transform:translate(-70px,-50px) scale(0.9)}}
  @keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-16px) rotate(1.5deg)}}
  @keyframes float2{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
  @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
  @keyframes spin-conic{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes fade-up{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
  @keyframes scale-in{from{opacity:0;transform:scale(0.93)}to{opacity:1;transform:scale(1)}}
  @keyframes pulse-dot{0%,100%{box-shadow:0 0 0 0 rgba(52,211,153,0.6)}70%{box-shadow:0 0 0 8px rgba(52,211,153,0)}}

  .rv{opacity:0;transform:translateY(34px);transition:opacity 0.72s cubic-bezier(.16,1,.3,1),transform 0.72s cubic-bezier(.16,1,.3,1);}
  .rv.on{opacity:1;transform:none;}
  .rl{opacity:0;transform:translateX(-36px);transition:opacity 0.7s cubic-bezier(.16,1,.3,1),transform 0.7s cubic-bezier(.16,1,.3,1);}
  .rl.on{opacity:1;transform:none;}
  .rr{opacity:0;transform:translateX(36px);transition:opacity 0.7s cubic-bezier(.16,1,.3,1),transform 0.7s cubic-bezier(.16,1,.3,1);}
  .rr.on{opacity:1;transform:none;}
  .d1{transition-delay:0.08s!important;}.d2{transition-delay:0.16s!important;}
  .d3{transition-delay:0.24s!important;}.d4{transition-delay:0.32s!important;}
  .d5{transition-delay:0.40s!important;}

  .gt{background:linear-gradient(135deg,#a78bfa 0%,#60a5fa 55%,#34d399 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite;}

  .gcard{background:var(--card);border:1px solid var(--border);transition:all 0.35s cubic-bezier(.16,1,.3,1);}
  .gcard:hover{background:var(--card-h);border-color:var(--border-h);transform:translateY(-4px);box-shadow:0 20px 60px rgba(124,58,237,0.12);}
  .proj-img{transition:transform 0.55s cubic-bezier(.16,1,.3,1);}
  .proj-wrap:hover .proj-img{transform:scale(1.06);}
  .proj-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(5,8,22,0.96) 0%,rgba(5,8,22,0.55) 50%,transparent 100%);opacity:0;transition:opacity 0.38s ease;}
  .proj-wrap:hover .proj-overlay{opacity:1;}
  .proj-reveal{position:absolute;bottom:0;left:0;right:0;padding:20px;opacity:0;transform:translateY(12px);transition:all 0.38s cubic-bezier(.16,1,.3,1);}
  .proj-wrap:hover .proj-reveal{opacity:1;transform:none;}

  .nl{position:relative;background:none;border:none;cursor:pointer;font-family:'Inter',sans-serif;font-size:13.5px;font-weight:500;transition:color 0.2s;padding:6px 10px;border-radius:8px;}
  .nl::after{content:'';position:absolute;bottom:3px;left:50%;transform:translateX(-50%);width:0;height:1.5px;background:linear-gradient(90deg,#7c3aed,#06b6d4);border-radius:2px;transition:width 0.25s ease;}
  .nl:hover::after,.nl.active::after{width:60%;}
  .nl:hover{background:rgba(124,58,237,0.07);}

  .tog-track{width:52px;height:28px;border-radius:100px;position:relative;cursor:pointer;border:none;transition:all 0.3s;outline:none;}
  .tog-thumb{position:absolute;top:3px;width:22px;height:22px;border-radius:50%;transition:transform 0.3s cubic-bezier(.34,1.56,.64,1),background 0.3s;display:flex;align-items:center;justify-content:center;font-size:11px;box-shadow:0 2px 8px rgba(0,0,0,0.25);}

  .soc-link{transition:all 0.25s ease;text-decoration:none;}
  .soc-link:hover{transform:translateX(4px);}

  .sp{transition:all 0.22s ease;cursor:default;}
  .sp:hover{transform:translateY(-2px);}

  .cc{transition:transform 0.35s cubic-bezier(.16,1,.3,1),box-shadow 0.35s ease;}
  .cc:hover{transform:translateY(-6px);box-shadow:0 24px 60px rgba(124,58,237,0.18)!important;}
  .cc:hover .cc-img{transform:scale(1.04);}
  .cc-img{transition:transform 0.5s ease;}

  .fi{width:100%;background:var(--input-bg);border:1px solid var(--border);border-radius:10px;padding:12px 16px;color:var(--tp);font-family:'Inter',sans-serif;font-size:14px;outline:none;transition:border-color 0.25s,box-shadow 0.25s;}
  .fi:focus{border-color:#7c3aed;box-shadow:0 0 0 3px rgba(124,58,237,0.15);}

  .tl-line{position:absolute;left:20px;top:0;bottom:0;width:2px;background:linear-gradient(to bottom,#7c3aed,#2563eb,#06b6d4,transparent);}
  .tl-dot{position:absolute;left:12px;width:18px;height:18px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#06b6d4);box-shadow:0 0 16px rgba(124,58,237,0.6);}

  ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:linear-gradient(#7c3aed,#06b6d4);border-radius:4px;}

  /* ── MOBILE BRAND (hidden on desktop) ── */
  .nav-brand{display:none;align-items:center;gap:6px;font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:800;letter-spacing:-0.3px;white-space:nowrap;}
  .nav-brand span{background:linear-gradient(135deg,#a78bfa,#60a5fa,#34d399);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .nav-brand em{color:var(--tm);font-style:normal;font-size:13px;}
  .nav-spacer{display:none;flex:1;}
  .nav-divider{width:1px;height:20px;background:var(--border);flex-shrink:0;}

  /* ── MOBILE DROPDOWN ── */
  .mob-menu{display:flex;flex-direction:column;gap:4px;position:fixed;top:72px;right:12px;width:auto;min-width:170px;background:var(--nav-bg);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid var(--nav-border);border-radius:20px;padding:10px;z-index:90;animation:scale-in 0.2s ease both;}

  @media(max-width:900px){
    /* Hero: image on top, text below — extra top padding clears the fixed navbar */
    .hero-section{padding:110px 20px 60px!important;}
    .hero-grid{grid-template-columns:1fr!important;justify-items:center;gap:28px!important;}
    .hero-photo{order:-1!important;width:min(76vw,320px)!important;height:min(76vw,320px)!important;margin:0 auto!important;}
    .about-grid{grid-template-columns:1fr!important;}
    .contact-grid{grid-template-columns:1fr!important;}
    .nav-links-desktop{display:none!important;}
    .nav-hamburger{display:flex!important;}
    .exp-stats{grid-template-columns:repeat(2,1fr)!important;}
    /* Full-width bar on mobile */
    .nav-pill{left:12px!important;right:12px!important;transform:none!important;border-radius:18px!important;padding:8px 14px!important;gap:10px!important;}
    .nav-brand{display:flex!important;}
    .nav-spacer{display:flex!important;}
    .nav-divider{display:none!important;}
    /* Timeline sections */
    .tl-wrap{padding-left:32px!important;}
    /* Education inner header — stack on mobile */
    .edu-meta{flex-direction:column!important;align-items:flex-start!important;gap:8px!important;}
    .edu-meta-right{text-align:left!important;}
    /* Education card compact padding */
    .edu-card{padding:20px!important;}
    /* Experience header stack */
    .exp-header{flex-direction:column!important;align-items:flex-start!important;}
  }
  @media(max-width:600px){
    .skills-grid{grid-template-columns:1fr!important;}
    .proj-grid{grid-template-columns:1fr!important;}
    .cert-grid{grid-template-columns:1fr!important;}
    .stat-row{gap:16px!important;flex-wrap:wrap!important;}
    .hero-text h1{font-size:clamp(36px,9vw,52px)!important;letter-spacing:-1.5px!important;}
    .hero-text{text-align:center!important;}
    .hero-text .stat-row{justify-content:center!important;}
    .exp-stats{grid-template-columns:repeat(2,1fr)!important;}
    /* Education: hide logo image on very small screens to give content more room */
    .edu-logo{display:none!important;}
  }
  /* ── TINY SCREENS ≤380px — hide Resume from navbar, tighten spacing ── */
  @media(max-width:380px){
    .nav-pill{left:8px!important;right:8px!important;padding:6px 10px!important;gap:6px!important;}
    .nav-brand{font-size:13px!important;}
    .nav-resume{display:none!important;}
    .mob-menu{right:8px!important;}
  }
  /* ── HERO RESUME BUTTON — only visible on ≤370px ── */
  .hero-resume-btn{display:none;}
  @media(max-width:370px){
    .hero-resume-btn{display:inline-flex!important;}
  }
`;

/* ─── REVEAL HOOK ─────────────────────────────────────────────────── */
let dark = true;
function useReveal(ref: React.RefObject<Element>) {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll(".rv,.rl,.rr").forEach(el => el.classList.add("on"));
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
}

/* ─── TYPEWRITER HOOK ─────────────────────────────────────────────── */
function useTypewriter(words: string[]) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[idx];
    if (!del && text === w) { const t = setTimeout(() => setDel(true), 1800); return () => clearTimeout(t); }
    if (del && text === "") { setDel(false); setIdx((idx + 1) % words.length); return; }
    const t = setTimeout(() => setText(del ? text.slice(0, -1) : w.slice(0, text.length + 1)), del ? 40 : 75);
    return () => clearTimeout(t);
  }, [text, del, idx, words]);
  return text;
}

/* ─── BACKGROUND ──────────────────────────────────────────────────── */
function Blobs() {
  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0, opacity: "var(--blob-o)" as any }}>
      <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.22) 0%,transparent 70%)", top: "-80px", left: "-120px", animation: "blob1 18s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 550, height: 550, borderRadius: "50%", background: "radial-gradient(circle,rgba(6,182,212,0.18) 0%,transparent 70%)", top: "45%", right: "-80px", animation: "blob2 22s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,0.15) 0%,transparent 70%)", bottom: "12%", left: "28%", animation: "blob3 20s ease-in-out infinite" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(var(--grid-c) 1px,transparent 1px),linear-gradient(90deg,var(--grid-c) 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />
    </div>
  );
}

/* ─── SECTION HEADING ─────────────────────────────────────────────── */
function SH({ label, title, sub }: { label: string; title: string; sub?: string }) {
  return (
    <div style={{ marginBottom: 64, textAlign: "center" }}>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#7c3aed", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 12 }}>{label}</p>
      <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(28px,4vw,46px)", fontWeight: 800, color: "var(--tp)", letterSpacing: "-1px", lineHeight: 1.1, marginBottom: sub ? 14 : 0 }}>{title}</h2>
      {sub && <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "var(--tm)", maxWidth: 490, margin: "0 auto", lineHeight: 1.75 }}>{sub}</p>}
    </div>
  );
}

/* ─── NAVBAR ──────────────────────────────────────────────────────── */
function Navbar({ dark: isDark, setDark, active }: { dark: boolean; setDark: (v: boolean) => void; active: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const rootEl = () => document.getElementById("ps");

  useEffect(() => {
    const el = rootEl();
    if (!el) return;
    const h = () => setScrolled(el.scrollTop > 80);
    el.addEventListener("scroll", h);
    return () => el.removeEventListener("scroll", h);
  }, []);

  const go = (id: string) => { rootEl()?.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const textC = isDark ? "#94a3b8" : "#475569";
  const activeC = "#a78bfa";

  return (
    <>
      <nav className="nav-pill" style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 100, background: "var(--nav-bg)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: "1px solid var(--nav-border)", borderRadius: 100, padding: "7px 14px", display: "flex", alignItems: "center", gap: 16, boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.3)" : "0 4px 24px rgba(0,0,0,0.15)", transition: "box-shadow 0.3s" }}>

        {/* ── MOBILE BRAND (hidden on desktop) ── */}
        <div className="nav-brand">
          <em style={{ color: "#a78bfa" }}>&gt;</em>
          <span>0xchandru</span>
        </div>

        {/* ── SPACER pushes right controls to far right on mobile ── */}
        <div className="nav-spacer" />

        {/* ── THEME TOGGLE ── */}
        <button className="tog-track" onClick={() => setDark(!isDark)} aria-label="Toggle theme"
          style={{ background: isDark ? "rgba(124,58,237,0.25)" : "rgba(255,200,0,0.18)", border: `1px solid ${isDark ? "rgba(124,58,237,0.4)" : "rgba(255,200,0,0.4)"}`, flexShrink: 0 }}>
          <div className="tog-thumb" style={{ transform: isDark ? "translateX(2px)" : "translateX(24px)", background: isDark ? "#7c3aed" : "#f59e0b" }}>
            {isDark ? "🌙" : "☀️"}
          </div>
        </button>

        {/* ── DIVIDER + NAV LINKS (desktop only) ── */}
        <div className="nav-divider" />
        <div className="nav-links-desktop" style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {NAV_ITEMS.map(n => (
            <button key={n.id} className={`nl ${active === n.id ? "active" : ""}`} onClick={() => go(n.id)} style={{ color: active === n.id ? activeC : textC }}>
              {n.label}
            </button>
          ))}
        </div>
        <div className="nav-divider" />

        {/* ── RESUME ── */}
        <a className="nav-resume" href={RESUME_URL} target="_blank" rel="noreferrer"
          style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)", color: "#fff", textDecoration: "none", padding: "8px 18px", borderRadius: 100, fontSize: 13, fontWeight: 700, fontFamily: "'Inter',sans-serif", whiteSpace: "nowrap", transition: "all 0.3s ease", boxShadow: "0 4px 20px rgba(124,58,237,0.4)", flexShrink: 0 }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 28px rgba(124,58,237,0.65)"; (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(124,58,237,0.4)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
          Resume ↗
        </a>

        {/* ── HAMBURGER (mobile only, far right) ── */}
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"
          style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "1px solid var(--border)", borderRadius: 10, cursor: "pointer", padding: "7px 8px", flexShrink: 0 }}>
          <span style={{ width: 18, height: 2, borderRadius: 2, background: "var(--ts)", display: "block", transition: "all 0.25s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
          <span style={{ width: 18, height: 2, borderRadius: 2, background: "var(--ts)", display: "block", opacity: menuOpen ? 0 : 1, transition: "all 0.25s" }} />
          <span style={{ width: 18, height: 2, borderRadius: 2, background: "var(--ts)", display: "block", transition: "all 0.25s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </button>
      </nav>

      {/* ── MOBILE DROPDOWN MENU ── */}
      {menuOpen && (
        <div className="mob-menu">
          {NAV_ITEMS.map(n => (
            <button key={n.id} onClick={() => go(n.id)}
              style={{ background: active === n.id ? "rgba(124,58,237,0.12)" : "transparent", border: active === n.id ? "1px solid rgba(124,58,237,0.25)" : "1px solid transparent", color: active === n.id ? activeC : textC, padding: "12px 16px", borderRadius: 12, textAlign: "left", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 500, transition: "all 0.18s", width: "100%" }}>
              {n.label}
            </button>
          ))}
          {/* Resume link — always visible in dropdown (critical on ≤380px where navbar Resume is hidden) */}
          <a href={RESUME_URL} target="_blank" rel="noreferrer"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 6, background: "linear-gradient(135deg,#7c3aed,#2563eb)", color: "#fff", textDecoration: "none", padding: "11px 16px", borderRadius: 12, fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 700 }}>
            Resume ↗
          </a>
        </div>
      )}
    </>
  );
}

/* ─── HERO ────────────────────────────────────────────────────────── */
function Hero({ dark: isDark }: { dark: boolean }) {
  const typed = useTypewriter(ROLES);
  const go = (id: string) => document.getElementById("ps")?.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="hero-section" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 28px 80px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr auto", gap: 64, alignItems: "center" }} className="hero-grid">
        <div className="hero-text" style={{ animation: "fade-up 0.9s cubic-bezier(.16,1,.3,1) both" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: 100, padding: "7px 18px", marginBottom: 28, fontSize: 12, color: "#34d399", fontFamily: "'Inter',sans-serif", fontWeight: 600, letterSpacing: "0.06em" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399", display: "inline-block", animation: "pulse-dot 1.8s infinite" }} />
            {BIO.available}
          </div>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: "var(--ts)", marginBottom: 10, fontWeight: 400 }}>Hey, I'm</p>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(48px,6.5vw,84px)", fontWeight: 800, lineHeight: 1.02, letterSpacing: "-2.5px", color: "var(--tp)", marginBottom: 18 }}>
            {BIO.name}
          </h1>
          <h2 className="gt" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(20px,3vw,32px)", fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 22, display: "block" }}>
            Cybersecurity Professional
          </h2>
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(16px,2vw,20px)", color: "var(--ts)", marginBottom: 28, minHeight: "1.5em", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#a78bfa", fontWeight: 700, fontSize: "1.2em" }}>→</span>
            <span style={{ color: "var(--tp)", fontWeight: 500 }}>{typed}</span>
            <span style={{ borderRight: "2.5px solid #7c3aed", height: "1.1em", animation: "blink 1s step-end infinite", display: "inline-block" }} />
          </div>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "var(--tm)", lineHeight: 1.8, marginBottom: 40, maxWidth: 540 }}>
            B.Sc Computer Science graduate from <span style={{ color: "#a78bfa", fontWeight: 600 }}>{BIO.college}</span> — specialising in SOC operations, threat detection, SIEM, incident response, and security automation.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 52 }}>
            <button onClick={() => go("projects")}
              style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)", color: "#fff", border: "none", padding: "14px 34px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter',sans-serif", boxShadow: "0 8px 28px rgba(124,58,237,0.38)", transition: "all 0.3s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 36px rgba(124,58,237,0.55)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(124,58,237,0.38)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
              View Projects ↓
            </button>
            <a href={`mailto:${BIO.email}`}
              style={{ color: "var(--tp)", textDecoration: "none", padding: "14px 32px", borderRadius: 12, fontSize: 15, fontWeight: 500, border: "1px solid var(--border)", cursor: "pointer", fontFamily: "'Inter',sans-serif", display: "inline-flex", alignItems: "center", gap: 8, transition: "all 0.3s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(124,58,237,0.08)"; el.style.borderColor = "rgba(124,58,237,0.4)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.borderColor = "var(--border)"; }}>
              ✉ Get in touch
            </a>
            {/* Resume button — only visible on ≤370px when navbar Resume is hidden */}
            <a className="hero-resume-btn" href={RESUME_URL} target="_blank" rel="noreferrer"
              style={{ alignItems: "center", gap: 6, background: "linear-gradient(135deg,#7c3aed,#2563eb)", color: "#fff", textDecoration: "none", padding: "14px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700, fontFamily: "'Inter',sans-serif", boxShadow: "0 8px 28px rgba(124,58,237,0.38)" }}>
              Resume ↗
            </a>
          </div>
          <div className="stat-row" style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
            {HERO_STATS.map(s => (
              <div key={s.l}>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 26, fontWeight: 800, color: "var(--tp)", letterSpacing: "-0.5px" }}>{s.n}</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "var(--tm)" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-photo" style={{ position: "relative", width: 320, height: 320, flexShrink: 0, animation: "float 6s ease-in-out infinite" }}>
          <div style={{ position: "absolute", inset: -22, borderRadius: "50%", background: "conic-gradient(from 0deg,#7c3aed,#2563eb,#06b6d4,#34d399,#7c3aed)", animation: "spin-conic 8s linear infinite", opacity: 0.7 }} />
          <div style={{ position: "absolute", inset: -16, borderRadius: "50%", background: "var(--bg)" }} />
          <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", border: "3px solid rgba(124,58,237,0.45)", zIndex: 1 }}>
            <img src={BIO.profileImg} alt={BIO.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT ───────────────────────────────────────────────────────── */
function About() {
  const ref = useRef<HTMLElement>(null!);
  useReveal(ref);
  return (
    <section id="about" ref={ref} style={{ padding: "120px 28px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className="rv"><SH label="About Me" title="Building a Defense-First Mindset" sub="Passionate about protecting digital infrastructure through hands-on research, real projects, and continuous learning." /></div>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div className="rl">
            <div className="gcard" style={{ borderRadius: 24, padding: 40 }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: "linear-gradient(135deg,#7c3aed,#2563eb)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 24 }}>🛡️</div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 20, fontWeight: 800, color: "var(--tp)", marginBottom: 14 }}>SOC & Security Operations</h3>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "var(--ts)", lineHeight: 1.8, marginBottom: 18 }}>
                B.Sc CS graduate from <span style={{ color: "#a78bfa", fontWeight: 600 }}>{BIO.college}</span> focused on SOC ops, threat detection, SIEM, log analysis, and incident response.
              </p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "var(--tm)", lineHeight: 1.8 }}>
                Building real experience through TryHackMe SOC Level 1 (completed) and Level 2 (in progress), plus self-built security tools deployed in real scenarios.
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 26, flexWrap: "wrap" }}>
                {[{ icon: "🎓", text: BIO.degree }, { icon: "📍", text: BIO.location }, { icon: "💼", text: "Open to Work" }].map(b => (
                  <div key={b.text} style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "var(--tag-bg)", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 14px", fontFamily: "'Inter',sans-serif", fontSize: 12, color: "var(--ts)" }}>
                    {b.icon} {b.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rr" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {ABOUT_HIGHLIGHTS.map(item => (
              <div key={item.title} className="gcard" style={{ borderRadius: 16, padding: 22, display: "flex", gap: 16, alignItems: "flex-start", cursor: "default" }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: `${item.color}18`, border: `1px solid ${item.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 700, color: "var(--tp)", marginBottom: 5 }}>{item.title}</div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "var(--tm)", lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
            <div className="gcard" style={{ borderRadius: 16, padding: 22, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "default" }}>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "var(--tm)" }}>CGPA — GTN Arts College</div>
              <div className="gt" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 30, fontWeight: 800 }}>{BIO.cgpa}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SKILLS ──────────────────────────────────────────────────────── */
function Skills() {
  const ref = useRef<HTMLElement>(null!);
  useReveal(ref);
  return (
    <section id="skills" ref={ref} style={{ padding: "120px 28px", background: dark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.015)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className="rv"><SH label="Technical Skills" title="Tools & Technologies" sub="Hands-on experience through labs, CTFs, projects, and TryHackMe training paths." /></div>
        <div className="skills-grid rv" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 18 }}>
          {SKILLS.map((cat, i) => (
            <div key={cat.cat} className={`gcard d${Math.min(i + 1, 5)}`} style={{ borderRadius: 18, padding: 26, cursor: "default" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${cat.color}45`; el.style.background = `${cat.color}09`; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.background = "var(--card)"; }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: cat.color, boxShadow: `0 0 10px ${cat.color}` }} />
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 700, color: "var(--tp)" }}>{cat.cat}</h3>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {cat.items.map(sk => (
                  <span key={sk} className="sp" style={{ background: cat.bg, border: `1px solid ${cat.color}28`, borderRadius: 8, padding: "5px 12px", fontFamily: "'Inter',sans-serif", fontSize: 12, color: cat.color, fontWeight: 500 }}>{sk}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── EDUCATION ───────────────────────────────────────────────────── */
function Education() {
  const ref = useRef<HTMLElement>(null!);
  useReveal(ref);
  return (
    <section id="education" ref={ref} style={{ padding: "120px 28px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="rv"><SH label="Education" title="Academic Background" /></div>
        <div className="rv d1 tl-wrap" style={{ position: "relative", paddingLeft: 52 }}>
          <div className="tl-line" />
          <div className="tl-dot" style={{ top: 28 }} />
          <div className="gcard edu-card" style={{ borderRadius: 24, padding: 36 }}>
            <div style={{ display: "flex", gap: 18, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div className="edu-logo" style={{ width: 52, height: 52, borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)", flexShrink: 0, background: "var(--tag-bg)" }}>
                <img src={EDUCATION.img} alt={EDUCATION.college} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="edu-meta" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 22, fontWeight: 800, color: "var(--tp)", letterSpacing: "-0.5px", marginBottom: 4 }}>{EDUCATION.degree}</h3>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#a78bfa", fontWeight: 600 }}>{EDUCATION.college}</p>
                  </div>
                  <div className="edu-meta-right" style={{ textAlign: "right" }}>
                    <div style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: 8, padding: "4px 14px", fontSize: 12, color: "#34d399", fontFamily: "'Inter',sans-serif", fontWeight: 600, marginBottom: 6, display: "inline-block" }}>✓ {EDUCATION.status}</div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "var(--tm)" }}>{EDUCATION.period}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 20, borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "14px 0", margin: "0 0 20px" }}>
                  <div>
                    <div className="gt" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 28, fontWeight: 800 }}>{EDUCATION.cgpa}</div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "var(--tm)" }}>CGPA</div>
                  </div>
                </div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "var(--tm)", marginBottom: 12, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Relevant Coursework</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {EDUCATION.coursework.map(c => (
                    <span key={c} style={{ background: "var(--tag-bg)", border: "1px solid var(--border)", borderRadius: 8, padding: "4px 12px", fontFamily: "'Inter',sans-serif", fontSize: 12, color: "var(--ts)" }}>{c}</span>
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

/* ─── EXPERIENCE ──────────────────────────────────────────────────── */
function Experience() {
  const ref = useRef<HTMLElement>(null!);
  useReveal(ref);
  return (
    <section id="experience" ref={ref} style={{ padding: "120px 28px", background: "rgba(255,255,255,0.01)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="rv"><SH label="Experience" title="Practical Exposure" sub="Hands-on security training through real labs, CTF competitions, and simulation exercises." /></div>
        <div className="rv d1 tl-wrap" style={{ position: "relative", paddingLeft: 52 }}>
          <div className="tl-line" style={{ background: "linear-gradient(to bottom,#06b6d4,#2563eb,#7c3aed,transparent)" }} />
          <div className="tl-dot" style={{ top: 28, background: "linear-gradient(135deg,#06b6d4,#2563eb)" }} />
          <div className="gcard" style={{ borderRadius: 24, padding: 36 }}>
            <div className="exp-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
              <div>
                <div style={{ display: "inline-flex", gap: 8, marginBottom: 10 }}>
                  <span style={{ background: "var(--exp-accent-bg)", border: "1px solid var(--exp-accent-border)", borderRadius: 6, padding: "3px 12px", fontSize: 11, color: "var(--exp-accent)", fontFamily: "'Inter',sans-serif", fontWeight: 700, letterSpacing: "0.06em" }}>{EXPERIENCE.badge}</span>
                </div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 20, fontWeight: 800, color: "var(--tp)", letterSpacing: "-0.5px", marginBottom: 4 }}>{EXPERIENCE.title}</h3>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "var(--exp-accent)" }}>{EXPERIENCE.org}</p>
              </div>
              <span style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: 8, padding: "5px 14px", fontSize: 12, color: "#34d399", fontFamily: "'Inter',sans-serif", fontWeight: 600 }}>● {EXPERIENCE.status}</span>
            </div>
            <div className="exp-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
              {EXPERIENCE.stats.map(s => (
                <div key={s.l} style={{ background: "var(--stat-bg)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 10px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 20, fontWeight: 800, color: s.c, marginBottom: 4 }}>{s.v}</div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "var(--tm)" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 11, marginBottom: 22 }}>
              {EXPERIENCE.points.map((pt, i) => (
                <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--exp-accent-bg)", border: "1px solid var(--exp-accent-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "var(--exp-accent)", flexShrink: 0, marginTop: 2 }}>✓</span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "var(--ts)", lineHeight: 1.7 }}>{pt}</span>
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {EXPERIENCE.tags.map(t => (
                <span key={t} style={{ background: "var(--exp-accent-bg2)", border: "1px solid var(--exp-accent-border2)", borderRadius: 8, padding: "5px 12px", fontFamily: "'Inter',sans-serif", fontSize: 12, color: "var(--exp-accent)", fontWeight: 500 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ────────────────────────────────────────────────────── */
function Projects() {
  const ref = useRef<HTMLElement>(null!);
  useReveal(ref);
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Defensive", "AI / ML", "Tools"];
  const shown = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === filter);

  return (
    <section id="projects" ref={ref} style={{ padding: "120px 28px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className="rv"><SH label="Projects" title="Security Projects" sub="Real tools built from scratch — from custom SIEMs to AI-powered threat detectors." /></div>
        <div className="rv d1" style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 48, flexWrap: "wrap" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              style={{ background: filter === c ? "linear-gradient(135deg,#7c3aed,#2563eb)" : "var(--card)", border: filter === c ? "none" : "1px solid var(--border)", color: filter === c ? "#fff" : "var(--ts)", borderRadius: 10, padding: "8px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif", transition: "all 0.25s ease" }}>
              {c}
            </button>
          ))}
        </div>
        <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 22 }}>
          {shown.map((p, i) => (
            <div key={p.title} className={`gcard rv proj-wrap d${Math.min(i + 1, 5)}`} style={{ borderRadius: 20, overflow: "hidden", cursor: "pointer" }}>
              <div style={{ height: 196, overflow: "hidden", position: "relative", background: dark ? "#0f172a" : "#e2e8f0" }}>
                <img src={p.img} alt={p.title} className="proj-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                <div className="proj-overlay" />
                <div className="proj-reveal">
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: "#f1f5f9", marginBottom: 4 }}>{p.title}</div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#94a3b8" }}>{p.desc.slice(0, 85)}…</div>
                </div>
                <div style={{ position: "absolute", top: 12, left: 12, background: `${p.catC}22`, border: `1px solid ${p.catC}44`, backdropFilter: "blur(8px)", borderRadius: 8, padding: "3px 12px", fontSize: 11, color: p.catC, fontFamily: "'Inter',sans-serif", fontWeight: 700 }}>{p.cat}</div>
              </div>
              <div style={{ padding: 22 }}>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 17, fontWeight: 800, color: "var(--tp)", marginBottom: 3, letterSpacing: "-0.3px" }}>{p.title}</h3>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "var(--tm)", marginBottom: 10 }}>{p.subtitle}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "var(--ts)", lineHeight: 1.7, marginBottom: 14 }}>{p.desc}</p>
                <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                  {p.metrics.map(m => (
                    <div key={m.l} style={{ background: `${p.catC}12`, border: `1px solid ${p.catC}25`, borderRadius: 10, padding: "8px 14px", textAlign: "center" }}>
                      <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 16, fontWeight: 800, color: p.catC }}>{m.v}</div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: "var(--tm)" }}>{m.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ background: "var(--tag-bg)", border: "1px solid var(--border)", borderRadius: 6, padding: "3px 10px", fontSize: 11, color: "var(--ts)", fontFamily: "'Inter',sans-serif" }}>{t}</span>
                  ))}
                </div>
                <a href={p.github} target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "var(--tag-bg)", border: "1px solid var(--border)", borderRadius: 10, padding: "9px", color: "var(--ts)", fontSize: 12, fontFamily: "'Inter',sans-serif", fontWeight: 500, textDecoration: "none", transition: "all 0.25s ease" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${p.catC}50`; el.style.color = p.catC; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.color = "var(--ts)"; }}>
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

/* ─── CERTIFICATES ────────────────────────────────────────────────── */
function Certs() {
  const ref = useRef<HTMLElement>(null!);
  useReveal(ref);
  return (
    <section id="certs" ref={ref} style={{ padding: "120px 28px", background: "rgba(255,255,255,0.01)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className="rv"><SH label="Certifications" title="Credentials & Courses" sub="Verified certifications across cybersecurity, SOC, and ethical hacking." /></div>
        <div className="cert-grid rv" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 22 }}>
          {CERTS.map((c, i) => (
            <div key={c.title} className={`cc gcard d${Math.min(i + 1, 4)}`} style={{ borderRadius: 20, overflow: "hidden" }}>
              <div style={{ height: 155, overflow: "hidden", background: dark ? "#0f172a" : "#e2e8f0", position: "relative" }}>
                <img src={c.img} alt={c.title} className="cc-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(5,8,22,0.75),transparent)" }} />
                <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.4)", backdropFilter: "blur(8px)", borderRadius: 8, padding: "3px 10px", fontSize: 10, color: "#34d399", fontFamily: "'Inter',sans-serif", fontWeight: 700 }}>✓ VERIFIED</div>
              </div>
              <div style={{ padding: 20 }}>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: c.accent, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 5, textTransform: "uppercase" }}>{c.issuer}</p>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 700, color: "var(--tp)", lineHeight: 1.4, marginBottom: 7 }}>{c.title}</h3>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "var(--tm)", marginBottom: 14 }}>{c.date}</p>
                <a href={c.link} target="_blank" rel="noreferrer"
                  style={{ display: "block", textAlign: "center", background: `${c.accent}10`, border: `1px solid ${c.accent}28`, borderRadius: 8, padding: "8px", fontSize: 12, color: c.accent, fontFamily: "'Inter',sans-serif", fontWeight: 600, textDecoration: "none", transition: "all 0.25s ease" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${c.accent}22`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${c.accent}10`; }}>
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

/* ─── CONTACT ─────────────────────────────────────────────────────── */
function Contact() {
  const ref = useRef<HTMLElement>(null!);
  useReveal(ref);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" ref={ref} style={{ padding: "120px 28px" }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>
        <div className="rv"><SH label="Contact" title="Let's Connect" sub="Open to SOC Analyst, security analyst, and entry-level cybersecurity roles globally." /></div>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 44 }}>
          <div className="rl">
            <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.22)", borderRadius: 12, padding: "16px 20px", marginBottom: 32 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#34d399", flexShrink: 0, animation: "pulse-dot 2s infinite" }} />
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, fontWeight: 700, color: "#34d399" }}>Open to Opportunities</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "var(--tm)" }}>SOC Analyst L1 & entry-level cybersecurity roles</div>
              </div>
            </div>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 20, fontWeight: 800, color: "var(--tp)", marginBottom: 10, letterSpacing: "-0.5px" }}>Get In Touch</h3>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "var(--tm)", lineHeight: 1.8, marginBottom: 28 }}>
              Looking to hire a SOC analyst? Want to collaborate on a security project? Or just connect with a fellow defender — I'd love to hear from you.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="soc-link gcard"
                  style={{ display: "flex", alignItems: "center", gap: 14, borderRadius: 12, padding: "13px 16px" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${s.c}40`; el.style.background = `${s.c}07`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.background = "var(--card)"; }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${s.c}15`, border: `1px solid ${s.c}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "var(--tm)", fontWeight: 500 }}>{s.label}</div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "var(--ts)" }}>{s.val}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="rr">
            <div className="gcard" style={{ borderRadius: 22, padding: 32 }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <div style={{ fontSize: 52, marginBottom: 14 }}>🚀</div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 20, fontWeight: 800, color: "#34d399", marginBottom: 8 }}>Message Sent!</h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "var(--tm)" }}>I'll respond within 24 hours.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 800, color: "var(--tp)", marginBottom: 4 }}>Send a Message</h3>
                  {[{ k: "name", l: "Your Name", t: "text", ph: "Your name" }, { k: "email", l: "Email Address", t: "email", ph: "your@email.com" }].map(f => (
                    <div key={f.k}>
                      <label style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "var(--tm)", display: "block", marginBottom: 7, fontWeight: 600 }}>{f.l}</label>
                      <input type={f.t} placeholder={f.ph} className="fi" value={form[f.k as keyof typeof form]} onChange={e => setForm({ ...form, [f.k]: e.target.value })} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "var(--tm)", display: "block", marginBottom: 7, fontWeight: 600 }}>Message</label>
                    <textarea placeholder="Tell me about the role or project…" rows={4} className="fi" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ resize: "vertical" }} />
                  </div>
                  <button onClick={() => setSent(true)}
                    style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)", color: "#fff", border: "none", borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter',sans-serif", boxShadow: "0 6px 24px rgba(124,58,237,0.35)", transition: "all 0.3s ease" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 32px rgba(124,58,237,0.55)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(124,58,237,0.35)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
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

/* ─── FOOTER ──────────────────────────────────────────────────────── */
function Footer() {
  const go = (id: string) => document.getElementById("ps")?.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "36px 28px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div className="gt" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 17, fontWeight: 800 }}>{BIO.name}</div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {NAV_ITEMS.map(n => (
            <button key={n.id} onClick={() => go(n.id)}
              style={{ background: "none", border: "none", color: "var(--tm)", fontSize: 13, cursor: "pointer", fontFamily: "'Inter',sans-serif", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#a78bfa")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--tm)")}>
              {n.label}
            </button>
          ))}
        </div>
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "var(--tm)" }}>
          © 2026 {BIO.name}
        </div>
      </div>
    </footer>
  );
}

/* ─── ROOT ────────────────────────────────────────────────────────── */
export function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const [active, setActive] = useState("hero");
  const [showTop, setShowTop] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null!);

  dark = isDark;

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = CSS;
    document.head.appendChild(s);
    return () => s.remove();
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) html.classList.remove("light");
    else html.classList.add("light");
    return () => html.classList.remove("light");
  }, [isDark]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const handle = () => {
      setShowTop(el.scrollTop > 500);
      const ids = ["hero", "about", "skills", "education", "experience", "projects", "certs", "contact"];
      for (const id of [...ids].reverse()) {
        const s = document.getElementById(id);
        if (s && el.getBoundingClientRect().top - s.getBoundingClientRect().top > -100) { setActive(id); break; }
      }
    };
    el.addEventListener("scroll", handle, { passive: true });
    return () => el.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("on"); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll(".rv,.rl,.rr").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const bg = isDark ? "#050816" : "#f0f4ff";

  return (
    <div ref={rootRef} id="ps"
      style={{ background: bg, minHeight: "100vh", overflowY: "auto", overflowX: "hidden", position: "relative", fontFamily: "'Inter',sans-serif", scrollBehavior: "smooth", transition: "background 0.4s ease" }}>
      <Blobs />
      <Navbar dark={isDark} setDark={setIsDark} active={active} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Hero dark={isDark} />
        <About />
        <Skills />
        <Education />
        <Experience />
        <Projects />
        <Certs />
        <Contact />
        <Footer />
      </div>
      {showTop && (
        <button onClick={() => rootRef.current.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ position: "fixed", bottom: 32, right: 32, width: 46, height: 46, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#2563eb)", border: "none", color: "#fff", fontSize: 18, cursor: "pointer", zIndex: 200, boxShadow: "0 8px 32px rgba(124,58,237,0.5)", transition: "all 0.3s ease" }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.12)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "none")}>↑</button>
      )}
    </div>
  );
}

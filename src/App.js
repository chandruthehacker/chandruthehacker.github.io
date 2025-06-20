import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Themes";
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import Hero from "./components/sections/Hero";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
// import { useInView } from "react-intersection-observer"; // No longer needed if not waiting for Hero to be in view

// Lazy-loaded sections
const Skills = React.lazy(() => import("./components/sections/Skills"));
const Journey = React.lazy(() => import("./components/sections/Journey"));
const Projects = React.lazy(() => import("./components/sections/Projects"));
const Contact = React.lazy(() => import("./components/sections/Contact"));
const Footer = React.lazy(() => import("./components/sections/Footer"));
const Certificates = React.lazy(() => import("./components/sections/Certificates"));
const ProjectDetails = React.lazy(() => import("./components/Dialog/ProjectDetails"));

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

const Wrapper = styled.div`
  padding-bottom: 100px;
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

function App() {
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  // Remove useInView and related state if you want all content to load immediately
  // const { ref: heroRef, inView: isHeroVisible } = useInView({ threshold: 0.8 });
  const [loadSections] = useState(true); // <--- CHANGE THIS LINE TO TRUE

  // Remove the useEffect that depends on isHeroVisible
  // useEffect(() => {
  //   if (isHeroVisible) setLoadSections(true);
  // }, [isHeroVisible]);

  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Helmet>
          {/* SEO Meta Tags */}
          <title>Chandraprakash | Cybersecurity Portfolio</title>
          <meta
            name="description"
            content="Explore real-world cybersecurity projects by Chandraprakash — phishing detection, threat hunting, log analysis, and SIEM implementation. Aiming to be a Security & SOC Analyst."
          />
          <meta
            name="keywords"
            content="Chandraprakash, Cybersecurity Portfolio, Security Analyst, SOC Analyst, SIEM, Splunk, Phishing Detection, Threat Hunting, Log Analysis, Blue Team, InfoSec, Network Security, TryHackMe, India"
          />
          <meta name="author" content="Chandraprakash C" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://chandruthehacker.github.io/" />
          <meta name="theme-color" content="#0f172a" />

          {/* Open Graph Tags */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://chandruthehacker.github.io/" />
          <meta property="og:title" content="Chandraprakash | Cybersecurity Portfolio" />
          <meta property="og:description" content="Real-world cybersecurity projects in threat detection, phishing analysis, and SIEM. Built by Chandraprakash — aspiring Security & SOC Analyst from India." />
          <meta property="og:image" content="https://chandruthehacker.github.io/og-image-cybersecurity.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@chandruthehacker" />
          <meta name="twitter:creator" content="@chandruthehacker" />
          <meta name="twitter:url" content="https://chandruthehacker.github.io/" />
          <meta name="twitter:title" content="Chandraprakash | Cybersecurity Portfolio" />
          <meta name="twitter:description" content="Projects in phishing detection, threat hunting, log monitoring, and SIEM tools. Portfolio of an aspiring Security & SOC Analyst." />
          <meta name="twitter:image" content="https://chandruthehacker.github.io/og-image-cybersecurity.png" />
        </Helmet>

        <Navbar />

        <Body>
          <AnimatePresence>
            <div>
              {/* Removed ref={heroRef} as we're not waiting for hero visibility */}
              <div>
                <Hero />
              </div>

              {/* The conditional rendering (loadSections &&) is still useful
                  if you want to ensure React.Suspense kicks in for
                  lazy-loaded components, but now it will be true from the start.
              */}
              {loadSections && (
                <React.Suspense fallback={<div style={{ textAlign: "center", color: "#ccc" }}>Loading portfolio...</div>}>
                  <Skills />
                  <Wrapper>
                    <Projects openModal={openModal} setOpenModal={setOpenModal} />
                    <Certificates openModal={openModal} setOpenModal={setOpenModal} />
                  </Wrapper>
                  <Wrapper>
                    <Journey />
                    <Contact />
                  </Wrapper>
                  <Footer />
                  {openModal.state && (
                    <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
                  )}
                </React.Suspense>
              )}
            </div>
          </AnimatePresence>
        </Body>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;